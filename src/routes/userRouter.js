import { Router } from 'express';
import userModel from '../dao/models/users.js';

const routerUser = Router();

routerUser.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
    
    let role = false;
    if (email.includes("admin")) {
        role = true;
    }
    
    const user = {
        first_name,
        last_name,
        email,
        age,
        password,
        role
    }
    
    await userModel.create(user);
    res.send({ status: "success", message: "User registered" });
});

routerUser.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) return res.status(400).send({ status: "error", error: "User does not exist" });

    if (user.password !== password) {
        return res.status(400).send({ status: "error", error: "User exists but password is incorrect" });
    }

    let userRole = false;

    if (email.includes("admin")) {
        userRole = true;
    }

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        role: userRole
    }

    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
});

routerUser.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "Couldn't logout" });
        res.redirect('/');
    });
});

export default routerUser; 
