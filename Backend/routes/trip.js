const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const fs = require('fs');
const path = require('path');

// Obtener la lista de viajes disponibles
router.get('/', async (req, res) => {
    try {
        const trips = await Trip.find();
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los viajes' });
    }
});

router.get('/', (req, res) => {
    res.json(trips); // Responder con la lista de viajes en formato JSON
});

const trips = [
    { _id: '1', destination: 'Bogotá', date: '2024-12-10', price: 150 },
    { _id: '2', destination: 'Medellín', date: '2024-12-15', price: 200 },
];

// Reservar un viaje
router.post('/reserve', async (req, res) => {
    const { tripId, userId } = req.body;
    try {
        // Lógica para reservar el viaje (actualizar base de datos, etc.)
        // Por simplicidad, asumimos que se guarda la reserva correctamente.

        // Obtener detalles del viaje
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ message: 'Viaje no encontrado' });
        }

        // Generar archivo TXT con el monto a pagar
        const amountDue = trip.price; // Suponiendo que el modelo Trip tiene un campo 'price'
        const content = `Detalles de la Reserva:\n\nUsuario ID: ${userId}\nViaje: ${trip.destination}\nMonto a Pagar: $${amountDue}\nGracias por su reserva.`;

        // Guardar el archivo en el servidor
        const fileName = `reserva_${userId}_${Date.now()}.txt`;
        const filePath = path.join(__dirname, '..', 'reservations', fileName);

        fs.writeFileSync(filePath, content);

        // Enviar la ruta del archivo al frontend
        res.json({ message: 'Reserva exitosa', file: `/reservations/${fileName}` });
    } catch (error) {
        res.status(500).json({ message: 'Error al reservar el viaje' });
    }
});

module.exports = router;
