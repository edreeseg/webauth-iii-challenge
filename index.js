const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const port = process.env.PORT || 5000;

server.use(cors());
server.use(helmet());
server.use(express.json());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

server.use('/', authRoutes);
server.use('/', userRoutes);

server.listen(port, () => console.log(`Server listening on port ${port}.`));