import { default as token } from "jsonwebtoken";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import userModel from "../dao/models/users.js";
import emailEnv from "../MaillingConfig.js";
import { createHash } from "../util.js";

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
  return token.sign({ email }, PRIVATE_KEY, { expiresIn: "1h" });
};

export const restorePass = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const data = jwt.decode(token);
    const email = data.email;

    const user = await userModel.findOne({ email });
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

export const changeUserRole = (req, res) => {
  try {
    const userId = req.params.uid;
    const updatedRole = req.body.role;

    if (["user", "premium"].includes(updatedRole)) {
      const updateUser = userModel.findByIdAndUpdate(
        userId,
        { userRole: updatedRole },
        { new: true }
      );

      if (updateUser) {
        res.status(200).json(updateUser);
      } else {
        res.status(404).send("usuario no encontrado");
      }
    } else {
      res
        .status(400)
        .send(
          "rol no fue aceptado, eliga entre las siguientes opciones: user o premium"
        );
    }
  } catch (error) {
    console.log(error.message);
  }
};
