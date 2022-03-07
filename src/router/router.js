'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { userCollection } = require('../models/index');
const basicAuth = require('../authentication/basic-auth');
router.post('/signUp', signUpFunction);
router.post('/login', basicAuth, loginFunction);
router.get('/', homeRouteFunction)
async function signUpFunction(req, res) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 5);
        const object = req.body;
        const user = await userCollection.create(object)
        res.status(201).json(user);
    } catch (erorr) {
        res.status(403).send('Error!');
    }
}
async function loginFunction(req, res) {
    res.status(200).json(req.user);
}
function homeRouteFunction(req, res) {
    res.status(200).send("my Home Route")
}
module.exports = router;