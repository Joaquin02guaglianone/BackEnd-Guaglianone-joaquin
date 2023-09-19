import { default as token } from 'jsonwebtoken';
import userModel from '../dao/models/users.js';
import nodemailer from 'nodemailer';
import emailEnv from "../config/MaillingConfig.js"

const PRIVATE_KEY = "CoderKeyFeliz";

const transport = nodemailer.createTransport(emailEnv.mailing);

export const sendEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const jwt = createJwt(email);
    console.log(jwt)

    transport.sendMail({
      from: `coder <${emailEnv.mailing.auth.user}>`,
      to: email,
      subject: "actualizar contraseña",
      html: `<h1>este mail es para que puedas recuperar tu cuenta y actualizar la contraseña </h1>
                        <hr>
                        <a href="http://localhost:8080/restore-pass/${jwt}">CLICK HERE</a>
                `,
    });

    res.send('correo enviando!')
  } catch (error) {
    console.log(error.message)
  }
};

   const createJwt = (email) => {
        return token.sign({ email }, PRIVATE_KEY, { expiresIn: '1h' })
    }

 export const changeUserRole = (req, res) => {
        try {
          const userId = req.params.uid;
          const updatedRole = req.body.role;
      
          if (["user", "premium"].includes(updatedRole)) {
            const updateUser = userModel.findByIdAndUpdate(
              userId,
              { role: updatedRole },
              { new: true }
            );
      
            if (updateUser) {
              res.status(200).json(updateUser);
            } else {
              res.status(404).send("usuario no encontrado");
            }
          }else{
            res.status(400).send("rol no fue aceptado, eliga entre las siguientes opciones: user o premium");
          }
        } catch (error) {
          console.log(error.message)
        }
      }
