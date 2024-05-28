const initApi = require('./apps/api/api');

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const connection = require('./apps/utils/connection/connection');

const app = express();

connection();

app.use((req, res, next) => {
  const clientIp = req.ip;
  const requestMethod = req.method;
  const requestUrl = req.originalUrl;

  console.log(`User: ${clientIp} have sent request: ${requestMethod} ${requestUrl}`);
  next();
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));
initApi(app);

let port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});