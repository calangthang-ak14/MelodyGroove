const youtube = require('./helpers/LoadYoutube');

async function GetSongByName(query) {
  try {
    const response = await youtube.youtube.search.list({
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

const SearchSongs = async (req, res) => {
  try {
    const query = req.body.query || '';
    const videos = await GetSongByName(query);
    res.json(videos);
  } catch (error) {
    console.error('Error searching for songs:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = SearchSongs; 

