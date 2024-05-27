const { google } = require('googleapis');

require('dotenv').config();
const API_KEY = process.env.YOUTUBE_API_KEY;

const youtube = google.youtube({
  version: 'v3',
  auth: API_KEY,
});

module.exports = { youtube };