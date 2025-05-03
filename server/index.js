const cors = require('cors');
const express = require('express');
const path = require('path'); // Añade esto
const routes = require('../routes');

const server = express();
server.use(cors());
server.options('*', cors());

server.use(express.json());

// Servir archivos estáticos del frontend (prioritario)
server.use(express.static(path.join(__dirname, '../public')));

// Rutas API
server.use('/api', routes);

// Elimina o comenta esta redirección:
// server.get('/', (req, res) => {
//   res.redirect('/api');
// });

// Ruta catch-all para SPA (opcional, si usas React/Vue/Angular)
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = server;
