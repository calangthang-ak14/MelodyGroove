const initApi = require('./apps/api/api');

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const connection = require('./apps/utils/connection/connection');

const app = express();

connection();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));
initApi(app);

let port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


// const { google } = require('googleapis');
// const express = require('express');
// const bodyParser = require('body-parser'); 
// const API_KEY = 'AIzaSyDWP5fLFGegEERs7uiKhnZUdy3ZIgbUJRk'; // Thay bằng API Key của bạn

// const youtube = google.youtube({
//   version: 'v3',
//   auth: API_KEY,
// });

// const app = express();
// const PORT = 3000;

// app.use(bodyParser.json());
// app.use(express.static('public'));

// app.get('/api/music', async (req, res) => {
//   try {
//     const [usResponse, vnResponse] = await Promise.all([
//       youtube.videos.list({
//         part: 'snippet,contentDetails',
//         chart: 'mostPopular',
//         regionCode: 'US', // Mã vùng Hoa Kỳ
//         videoCategoryId: '10', // Music category ID
//         maxResults: 5, // Số lượng video muốn lấy từ Hoa Kỳ
//       }),
//       youtube.videos.list({
//         part: 'snippet,contentDetails',
//         chart: 'mostPopular',
//         regionCode: 'VN', // Mã vùng Việt Nam
//         videoCategoryId: '10', // Music category ID
//         maxResults: 5, // Số lượng video muốn lấy từ Việt Nam
//       })
//     ]);

//     const combinedVideos = [...usResponse.data.items, ...vnResponse.data.items];
//     res.json(combinedVideos);
//   } catch (error) {
//     console.error('Error fetching music videos:', error);
//     res.status(500).send('Error fetching music videos');
//   }
// });


// async function searchSongs(query) {
//   try {
//     const response = await youtube.search.list({
//       part: 'snippet',
//       q: query,
//       type: 'video',
//       maxResults: 50,
//     });

//     const videos = response.data.items;
//     return videos;
//   } catch (error) {
//     console.error('Error searching for songs:', error);
//     return [];
//   }
// }

// app.post('/api/search', async (req, res) => {
//   try {
//     const query = req.body.query || '';
//     const videos = await searchSongs(query);
//     res.json(videos);
//   } catch (error) {
//     console.error('Error searching for songs:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
