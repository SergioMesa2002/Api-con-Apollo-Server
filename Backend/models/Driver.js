const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
    cedula: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    license: { type: String, required: true },
});

module.exports = mongoose.model('Driver', DriverSchema);
