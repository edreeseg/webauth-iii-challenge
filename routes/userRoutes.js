const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets');
const { getUsers } = require('../data/helpers');

function checkForToken(req, res, next){
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined'){
        const token = bearerHeader.split(' ')[1];
        req.token = token;
        next();
    } else {
        res.status(401).json({ error: 'Please register or sign in.' });
    }
}

router.get('/api/users', checkForToken, (req, res) => {
    jwt.verify(req.token, jwtSecret, (err, authData) => {
        if (err) res.status(403).json({ error: 'Please register or sign in.' });
        else {
            getUsers()
                .then(users => res.json({ users }))
                .catch(error => res.status(500).json({ error: error.message }));
        }
    })
});

module.exports = router;