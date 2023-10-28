import { Router } from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import userModel from '../dao/models/users.js';
import { sendEmail, changeUserRole, restorePass, createDocuments, deleteInactiveUsers} from '../controllers/usersController.js';
import { validarToken } from '../util.js';
import { uploader } from '../util.js';

const routerUser = Router();
routerUser.use(cookieParser());

// Peticiones Get

routerUser.get('/failregister', (req, res) => {
    res.status(400).send({ status: "error", error: "Registry fail" });
});

routerUser.get('/current', passport.authenticate('current', { session: false }), async (req, res) => {
    res.send(req.user);
 });

routerUser.get('/logout', async (req, res) => {
    if (req.session) {
        const correo = req.session.user.email 
        const user = await userModel.findOne({email: correo})
        await user.updateOne({ last_connection: new Date() });

        req.session.destroy(err => {
            if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" });
            res.redirect('/');
        });
    }
});

routerUser.get('/faillogin', (req, res) => {
    res.status(400).send({ status: "error", error: "Login fail" });
});

routerUser.get('/recoverpassword/:email', sendEmail)

routerUser.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

routerUser.get('/githubcallback', passport.authenticate('github', { failureRedirect: 'api/sessions/login' }), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
});

// Peticiones Post

routerUser.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), async (req, res) => {
    res.send({ status: "success", message: "User registered" });
});

routerUser.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin'}), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: "error", error: "Incorrect credentials" });
    
    req.session.user = {
        id: req.user._id,
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        age: req.user.age,
        userRole: req.user.userRole,
        cart : req.user.cart
    }
    
    const token = jwt.sign(req.user, "CoderKeyFeliz", {expiresIn: "24h"});
    res.cookie('coderCookieToken', token, { httpOnly: true }).send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
});

routerUser.post("/premium/:uid", changeUserRole)

routerUser.post('/restore-pass/:token', validarToken, restorePass);

routerUser.post("/:uid/documents", uploader('documents').array('documents'), createDocuments)

// Peticiones Delete

routerUser.delete("/DeleteInactiveUsers", deleteInactiveUsers )


export default routerUser;
