import { Router } from 'express';
import passport from 'passport';

const routerUser = Router();

routerUser.post('/register', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }), async (req, res) => {
    res.send({ status: "success", message: "User registered" });
});

routerUser.get('/failregister', (req, res) => {
    res.status(400).send({ status: "error", error: "Registry fail" });
});

routerUser.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin'}), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: "error", error: "Incorrect credentials" });

    let role = false;
    if (email.includes("admin")) {
      role = true;
    }
    
    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email,
        age: req.user.age,
        userRole: role
    }
    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
});

routerUser.get('/faillogin', (req, res) => {
    res.status(400).send({ status: "error", error: "Login fail" });
});

routerUser.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" });
        res.redirect('/');
    });
});

routerUser.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

routerUser.get('/githubcallback', passport.authenticate('github', { failureRedirect: 'api/sessions/login' }), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
});

export default routerUser;