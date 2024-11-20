const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    origin: {
        type: String,
        required: true, // Este campo es requerido
    },
    destination: {
        type: String,
        required: true, // Este campo es requerido
    },
    departureTime: {
        type: Date,
        required: true, // Este campo es requerido
    },
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus', // Referencia al modelo de Bus
        required: true, // Este campo es requerido
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver', // Referencia al modelo de Driver
        required: true, // Este campo es requerido
    },
});

// Exporta el modelo de viaje
module.exports = mongoose.model('Trip', tripSchema);
