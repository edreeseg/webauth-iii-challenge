const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secrets');
const { getUsers, getUsersByDept } = require('../../data/helpers');
const { checkForToken, verifyToken } = require('../token-handlers');

router.get('/users', checkForToken, async (req, res) => {
    try {
        const payload = await verifyToken(req.token); // Will throw an error and move to catch block if signature isn't valid.
        getUsersByDept(payload.department)
            .then(users => res.json({ users }))
            .catch(error => res.status(500).json({ error: error.message }));
    } catch(error){
        res.status(403).json({ error: 'Please register or sign in.' });
    }
});

module.exports = router;