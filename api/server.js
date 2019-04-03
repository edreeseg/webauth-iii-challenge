const express = require('express');
const server = express();
const configureMiddleware = require('./middleware');

configureMiddleware(server);

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

server.use('/api', authRoutes);
server.use('/api', userRoutes);

module.exports = server;