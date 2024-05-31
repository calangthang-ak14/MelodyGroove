const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegPath);

async function PlayMusicById(id, res) {
  const MusicUrlBase = `https://www.youtube.com/watch?v=${id}`;

  try {
    const AudioStream = ytdl(MusicUrlBase, { filter: 'audioonly' });
    const ffmpegProcess = ffmpeg(AudioStream)
      .format('mp3')
      .on('error', (error) => {
        console.error('Error converting audio:', error);
        res.status(500).send('Error converting audio');
      });

    res.setHeader('Content-Type', 'audio/mpeg');
    ffmpegProcess.pipe(res, { end: true });
  } catch (error) {
    console.error('Error fetching song by ID:', error);
    res.status(500).send('Error fetching song by ID');
  }
}

const PlayMusic = async (req, res) => {
  try {
    const id = req.body.query || '';
    if (!id) {
      return res.status(400).json({ error: 'No video ID provided' });
    }
    await PlayMusicById(id, res);
  } catch (error) {
    console.error('Error fetching song details:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = PlayMusic ;