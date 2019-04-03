const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { addUser, verifyUser } = require('../../data/helpers');
const { generateToken } = require('../token-handlers');

router.post('/register', (req, res) => {
    const { username, password, department } = req.body;
    if (!username || !password || !department) 
        return res.status(400).json({ error: 'Request must include values for username, password, and department keys.' });
    const user = { username, password, department };
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    addUser(user)
        .then(id => {
            const token = generateToken({ id, ...user }); // Add ID to payload
            res.status(201).json({ token });
        })
        .catch(error => {
            if (error.message.includes('UNIQUE')) res.status(400).json({ error: 'Username is unavailable.' });
            else res.status(500).json({ error: error.message });
        });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) // Checking for correct user info and returning a 400 error if not.
        return res.status(400).json({ error: 'Request must includes values for username and password keys.' });
    const credentials = { username, password };
    // verifyUser will return user ID if user is found and password is correct, and null if user isn't found or password is incorrect.
    verifyUser(credentials)
        .then(user => {
            if(user){
                const { createdAt, ...userWithoutTimestamp } = user;
                const token = generateToken(userWithoutTimestamp);
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

module.exports = router;