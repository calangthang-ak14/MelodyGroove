
const express = require("express");
const bodyParser = require("body-parser");

const api = new express.Router();

const initApi = (app) => {
    app.set("json spaces", 2);
    app.use("/api", api);
};

api.use(bodyParser.json());

api.use('/users', require('../routers/users'))
api.use('/music', require('../routers/music'))

module.exports = initApi;