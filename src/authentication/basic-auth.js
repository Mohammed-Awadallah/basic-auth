'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { userCollection } = require('../models/index');
async function basicAuth(req, res, next) {
    try {
        let encodedHeaders = req.headers.authorization.split(' ')[1];
        let [userName, password] = base64.decode(encodedHeaders).split(':');;
        const user = await userCollection.read(userName);
        const correctPassword = await bcrypt.compare(password, user.password);
        if (correctPassword) {
            res.status(200).json(user);
            next();
        } else {
            res.status(403).json({ 'error': 'Incorrect username or password' })
        }
    }
    catch (error) {
        res.status(403).send("Error");
    }

}

module.exports = basicAuth;