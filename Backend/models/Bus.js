const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
    plate: { type: String, required: true, unique: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true }, // Referencia al conductor
    departureCity: { type: String, required: true },
    arrivalCity: { type: String, required: true },
});

module.exports = mongoose.model('Bus', BusSchema);
