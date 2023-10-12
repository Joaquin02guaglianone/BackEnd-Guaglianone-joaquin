import { Router } from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import userModel from '../dao/models/users.js';
import { sendEmail, changeUserRole, restorePass } from '../controllers/usersController.js';
import { validarToken } from '../util.js';
import { uploader } from '../util.js';

const routerUser = Router();
routerUser.use(cookieParser());

routerUser.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), async (req, res) => {
    res.send({ status: "success", message: "User registered" });
});

routerUser.get('/failregister', (req, res) => {
    res.status(400).send({ status: "error", error: "Registry fail" });
});

routerUser.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin'}), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: "error", error: "Incorrect credentials" });
    
    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        age: req.user.age,
        userRole: req.user.userRole
    }
    
    const token = jwt.sign(req.user, "CoderKeyFeliz", {expiresIn: "24h"});
    res.cookie('coderCookieToken', token, { httpOnly: true }).send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
});

routerUser.get('/faillogin', (req, res) => {
    res.status(400).send({ status: "error", error: "Login fail" });
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

routerUser.post("/premium/:uid", changeUserRole)

routerUser.get('/recoverpassword/:email', sendEmail)

routerUser.post('/restore-pass/:token', validarToken, restorePass);

routerUser.post('/:uid/documents', uploader.documents('documents').array('documents'), async (req,res)=> {
    try {
        const { uid } = req.params;
        // const user = await usersController.updateUserDocuments(uid, req.files);
        res.send({ message: 'User documents updated!', user });
    } catch (e) {
        res.json({ error: e.message });
    }
})

routerUser.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

routerUser.get('/githubcallback', passport.authenticate('github', { failureRedirect: 'api/sessions/login' }), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
});

export default routerUser;

