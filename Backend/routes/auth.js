const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Modelo de usuario
const router = express.Router();

// Registrar Administrador
router.post('/register-admin', async (req, res) => {
    const { cedula, nombre, fechaNacimiento, username, password } = req.body;

    try {
        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo administrador
        const newUser = new User({
            cedula,
            nombre,
            fecha_nacimiento: fechaNacimiento,
            username,
            password: hashedPassword,
            role: 'admin' // Rol de administrador
        });

        // Guardar el nuevo administrador en la base de datos
        await newUser.save();
        res.status(201).json({ message: 'Administrador registrado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el administrador', error });
    }
});

// Registrar Cliente
router.post('/register-client', async (req, res) => {
    const { cedula, nombre, fechaNacimiento, username, password } = req.body;

    try {
        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo cliente
        const newUser = new User({
            cedula,
            nombre,
            fecha_nacimiento: fechaNacimiento,
            username,
            password: hashedPassword,
            role: 'client' // Rol de cliente
        });

        // Guardar el nuevo cliente en la base de datos
        await newUser.save();
        res.status(201).json({ message: 'Cliente registrado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el cliente', error });
    }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar el usuario en la base de datos
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña ingresada con la almacenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Respuesta dependiendo del rol del usuario
        return res.status(200).json({ message: `Bienvenido ${user.role}`, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
});

module.exports = router;
