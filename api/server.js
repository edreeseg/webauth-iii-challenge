const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');

server.use(cors());
server.use(helmet());
server.use(express.json());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

server.use('/', authRoutes);
server.use('/', userRoutes);

module.exports = server;