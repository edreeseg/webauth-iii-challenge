const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addUser, verifyUser, getUsers } = require('./data/helpers');
require('dotenv').config();

const port = process.env.PORT || 5000;

server.use(cors());
server.use(helmet());
server.use(express.json());

function checkToken(req, res, next){
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined'){
        const token = bearerHeader.split(' ')[1];
        req.token = token;
        next();
    } else {
        res.status(401).json({ error: 'Please register or sign in.' });
    }
}

server.post('/api/register', (req, res) => {
    const { username, password, department } = req.body;
    if (!username || !password || !department) 
        return res.status(400).json({ error: 'Request must include values for username, password, and department keys.' });
    const user = { username, password, department };
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    addUser(user)
        .then(id => {
            const token = jwt.sign({ id }, process.env.JWT_SECRET || 'Keep it secret, keep it safe', { expiresIn: '1 day' });
            res.status(201).json({ token });
        })
        .catch(error => {
            if (error.message.includes('UNIQUE')) res.status(400).json({ error: 'Username is unavailable.' });
            else res.status(500).json({ error: error.message });
        });
});

server.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) // Checking for correct user info and returning a 400 error if not.
        return res.status(400).json({ error: 'Request must includes values for username and password keys.' });
    const user = { username, password };
    // verifyUser will return user ID if user is found and password is correct, and null if user isn't found or password is incorrect.
    verifyUser(user)
        .then(id => {
            if(id){
                const token = jwt.sign({ id }, process.env.JWT_SECRET || 'Keep it secret, keep it safe', { expiresIn: '1 day' });
                res.json({ token });
            } else res.status(401).json({ error: 'You shall not pass!' });
        })
        .catch(error => {
            switch(error){
                case null:
                    return res.status(401).json({ error: 'You shall not pass!'})
                default:
                    return res.status(500).json({ error: error.message });
            }
        });
});

server.get('/api/users', checkToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_SECRET || 'Keep it secret, keep it safe', (err, authData) => {
        if (err) res.status(403).json({ error: 'Please register or sign in.' });
        else {
            getUsers()
                .then(users => res.json({ users }))
                .catch(error => res.status(500).json({ error: error.message }));
        }
    })
});

server.listen(port, () => console.log(`Server listening on port ${port}.`));