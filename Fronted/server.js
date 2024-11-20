const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000; // Puedes cambiar el puerto si lo deseas

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Manejo de rutas para index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor frontend corriendo en http://localhost:${PORT}`);
});
