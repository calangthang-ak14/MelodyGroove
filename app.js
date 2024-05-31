
const initApi = require('./apps/api/api');

const cors = require('cors');
const express = require('express');
const requestIp = require('request-ip');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const connection = require('./apps/utils/connection/connection');

const app = express();

connection();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));
initApi(app);

let port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});