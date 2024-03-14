const express = require('express');
const { google } = require('googleapis');

const bodyParser = require("body-parser");
const ytdl = require('ytdl-core');

const app = express();
const port = 3000;

const API_KEY = 'AIzaSyDWP5fLFGegEERs7uiKhnZUdy3ZIgbUJRk';
const youtube = google.youtube({
  version: 'v3',
  auth: API_KEY,
});

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function getTrendingMusicVideos() {
  try {
    const response = await youtube.videos.list({ 
      part: 'snippet',
      chart: 'mostPopular',
      regionCode: 'VN',
      videoCategoryId: '10',
      maxResults: 50,
    });

    const videos = response.data.items;
    return videos;
  } catch (error) {
    console.error('Error fetching trending music videos:', error);
    return [];
  }
}

async function searchSongs(query) {
  try {
    const response = await youtube.search.list({
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: 50,
    });

    const videos = response.data.items;
    return videos;
  } catch (error) {
    console.error('Error searching for songs:', error);
    return [];
  }
}

app.get('/', async (req, res) => {
  const query = req.query.query || '';
  let videos = [];

  if (query === '') {
    videos = await getTrendingMusicVideos();
  } else {
    videos = await searchSongs(query);
  }

  res.render('index', { videos });
});

app.post('/search', async (req, res) => {
  try {
    const query = req.body.query || '';
    const videos = await searchSongs(query);
    res.json(videos);
  } catch (error) {
    console.error('Error searching for songs:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/play', async (req, res) => {
  try {
      const url = req.query.url;
      if (!url || !ytdl.validateURL(url)) {
          return res.status(400).send('Invalid YouTube URL');
      }
      
      res.header('Content-Type', 'audio/mpeg');

      ytdl(url, { filter: 'audioonly' }).pipe(res);
  } catch (err) {
      console.error('Error:', err);
      res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
