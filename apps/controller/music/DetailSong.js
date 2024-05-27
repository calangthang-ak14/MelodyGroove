const youtube = require('./helpers/LoadYoutube');

async function GetSongById(id) {
    try {
      const response = await youtube.youtube.videos.list({
        part: 'snippet,contentDetails',
        id: id,
      });
      const videos = response.data.items;
      return videos;
    } catch (error) {
      console.error('Error fetching song by ID:', error);
      return [];
    }
}

const DetailSong = async (req, res) => {
    try {
      const id = req.body.id || '';
      if (!id) {
        return res.status(400).json({ error: 'No video ID provided' });
      }
      const videos = await GetSongById(id);
      if (videos.length === 0) {
        return res.status(404).json({ error: 'No videos found for the provided ID' });
      }
      res.json(videos);
    } catch (error) {
      console.error('Error fetching song details:', error);
      res.status(500).json({ error: error.message });
    }
};

module.exports = DetailSong;