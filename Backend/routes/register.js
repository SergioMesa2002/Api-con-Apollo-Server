const express = require('express');
const Admin = require('../models/Admin');
const Client = require('../models/Client');
const router = express.Router();

// Registrar administrador
router.post('/register/admin', async (req, res) => {
    const { cedula, name, dob, username, password } = req.body;

    try {
        const newAdmin = new Admin({ cedula, name, dob, username, password });
        await newAdmin.save();
        res.status(201).json({ msg: 'Administrador registrado correctamente' });
    } catch (error) {
        res.status(400).json({ msg: 'Error al registrar administrador', error });
    }
});

// Registrar cliente
router.post('/register/client', async (req, res) => {
    const { cedula, name, dob, username, password } = req.body;

    try {
        const newClient = new Client({ cedula, name, dob, username, password });
        await newClient.save();
        res.status(201).json({ msg: 'Cliente registrado correctamente' });
    } catch (error) {
        res.status(400).json({ msg: 'Error al registrar cliente', error });
    }
});

module.exports = router;
