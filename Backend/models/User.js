const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    cedula: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    fecha_nacimiento: { type: Date, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'client'], required: true }
});

module.exports = mongoose.model('User', userSchema);
