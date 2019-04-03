const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const bcrypt = require('bcryptjs');

module.exports = {
    addUser,
    getUsers,
    verifyUser,
    getUsersByDept
};

function addUser(user){
    return new Promise(async (resolve, reject) => {
        try {
            const [ id ] = await db('users')
                .insert(user);
            resolve(id);
        } catch(err) {
            reject(err);
        }
    })
}

function verifyUser(user){
    return new Promise(async (resolve, reject) => {
        try {
            const { username, password } = user;
            const entry = await db('users')
                .where({ username })
                .first();
            if (!entry) reject(null);
            if (bcrypt.compareSync(password, entry.password)) resolve(entry);
            else reject(null);
        } catch(err) {
            reject(err);
        }
    });
}

function getUsers(){
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db('users');
            resolve(users.map(entry => {
                const { password, ...other } = entry; // Remove password for security reasons
                return other;
            }));
        } catch(err) {
            reject(err);
        }
    });
}

function getUsersByDept(department){
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db('users')
                .where({ department });
            resolve(users.map(entry => {
                const { password, ...other } = entry; // Remove password for security reasons
                return other;
            }));
        } catch(err) {
            reject(err);
        }
    })
}