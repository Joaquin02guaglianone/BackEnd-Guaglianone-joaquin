import Router from 'express';
import passport from 'passport';


const Passportrouter = Router();

Passportrouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { });

Passportrouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: 'api/sessions/login' }), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

export default Passportrouter;