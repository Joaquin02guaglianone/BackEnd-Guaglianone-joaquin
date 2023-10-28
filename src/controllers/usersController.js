import { default as token } from "jsonwebtoken";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import userModel from "../dao/models/users.js";
import emailEnv from "../MaillingConfig.js";
import { createHash } from "../util.js";
import userDto from "../dto/userDto.js";

const PRIVATE_KEY = "CoderKeyFeliz";

const transport = nodemailer.createTransport(emailEnv.mailing);

export const sendEmail = (req, res) => {
  try {
    const email = req.params.email;
    const jwt = createJwt(email);
    console.log(jwt);

    transport.sendMail({
      from: `coder <${emailEnv.mailing.auth.user}>`,
      to: email,
      subject: "actualizar contraseña",
      html: `<h1>este mail es para que puedas recuperar tu cuenta y actualizar la contraseña </h1>
                        <hr>
                        <a href="http://localhost:8080/restore-pass/${jwt}">CLICK HERE</a>
                `,
    });

    res.send("correo enviando!");
  } catch (error) {
    console.log(error.message);
  }
};

const createJwt = (email) => {
  return token.sign({
    email
  }, PRIVATE_KEY, {
    expiresIn: "1h"
  });
};

export const restorePass = async (req, res) => {
  try {
    const {
      token
    } = req.params;
    const {
      newPassword
    } = req.body;

    const data = jwt.decode(token);
    const email = data.email;

    const user = await userModel.findOne({
      email
    });
    if (!user) {
      res.status(404).send("no se encontro el usuario");
    }

    if (Date.now() >= data.exp * 1000) {
      alert("el link expiro sera redirigido para obtener uno nuevo.");
      res.redirect(`http://localhost:8080/api/session/recover-mail/${email}`);
      return;
    }

    if (bcrypt.compareSync(newPassword, user.password)) {
      res
        .status(400)
        .send(
          "tu nueva contraseña no puede ser igual a la anterior"
        );
      return;
    }

    const hashedNewPassword = createHash(newPassword);
    user.password = hashedNewPassword;
    console.log(user);
    await user.save();

    res.status(200).send("Su contraseña se cambio con exito");
  } catch (error) {
    res.status(500).send(`error interno del server ${error}`);
  }
};

export const changeUserRole = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await userModel.findById(userId)

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    if (user.userRole === "user") {

      const requiredDocs = ['id', 'address', 'account']
      const userDocs = user.documents

      const hasAllDocuments = requiredDocs.every((requiredDocs) => {
        return userDocs.some((userDocs) =>
        userDocs.name.includes(requiredDocs)
        );
      });

      if (hasAllDocuments) {
        let newRole = user.updateOne({
          userRole: "premium"
        })
       await user.save();
      } else {
        return res.status(400).send("necesita cargar los documentos necesarios para ser un usuario premium")
      }
      return res.status(200).send("¡su cuanta es ahora premium, disfrute de sus nuevas opciones y funciones!")
    }

    if (user.userRole === "premium") {
      let newRole = user.updateOne({
        userRole: "user"
      })
      await user.save();
      return res.status(200).send("¡su cuanta es ahora de user, tendra menos funciones que un premium pero podra disfrutar de la pagina de todas maneras, disfrute!")
    }

    if (user.userRole === "admin") {
      return res.status(400).send("no puede cambiar su rol siendo administrador de la pagina, utilice su cuenta de usuario si desea comprar o poner en venta productos, muchas gracias!")
    }

  } catch (error) {
    console.log(error.message);
  }
};

export const createDocuments = async (req, res) => {
  try {
    const {
      uid
    } = req.params;
    const user = await userModel.findById(uid);
    const documents = user.documents || [];

    if (req.files && req.files.length > 0) {
      const newDocuments = [
        ...documents,
        ...req.files.map((file) => ({
          name: file.originalname,
          reference: file.path,
        })),
      ];

      await user.updateOne({
        documents: newDocuments
      });
    }

    res.status(200).send("se crearon los documentos satisfactoriamente");
  } catch (error) {
    console.error(`Interval server error ${error}`);
    res.status(500).send(`Interval server error ${error}`);
  }
};


export const deleteInactiveUsers = async (req, res) => {
  try {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const deletedUsers = await userModel.deleteMany({ last_connection: { $lt: twoDaysAgo } });

    if (deletedUsers.deletedCount > 0) {
      deletedUsers.forEach(async (user) => {
        const { email } = user;

        try {

          transport.sendMail({
            from: `Gaming Center ${emailEnv.mailing.auth.user}>`,
            to: email,
            subject: "Cuenta eliminada",
            html: `<h1>Tu cuenta ha sido eliminada</h1>
                   <p>Lamentamos informarte que tu cuenta ha sido eliminada debido a inactividad.</p>`,
          });

          console.log(`Correo enviado a ${email}`);
        } catch (error) {
          console.error(`Error al enviar correo a ${email}: ${error.message}`);
        }
      });

      return res.status(200).json({ message: `Se eliminaron ${deletedUsers.deletedCount} usuarios inactivos` });
    } else {
      return res.status(200).json({ message: 'No se encontraron usuarios inactivos para eliminar' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar usuarios inactivos' });
  }
};
