const cors = require('cors');
const express = require('express');
const path = require('path');  // Añadir este módulo
const routes = require('../routes');

const server = express();

// Configuración existente
server.use(cors());
server.options('*', cors());
server.use(express.json());

// Servir archivos estáticos del frontend
server.use(express.static(path.join(__dirname, '../public')));

// Tus rutas API
server.use('/api', routes);

// Redirección para SPA (Single Page Application)
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = server;
