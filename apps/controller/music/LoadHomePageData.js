const youtube = require('./helpers/LoadYoutube');

const LoadHomePageData = async (req, res) => {
  try {
    const [usResponse, vnResponse] = await Promise.all([
      youtube.youtube.videos.list({
        part: 'snippet,contentDetails',
        chart: 'mostPopular',
        regionCode: 'US', // Mã vùng Hoa Kỳ
        videoCategoryId: '10', // Music category ID
        maxResults: 5, // Số lượng video muốn lấy từ Hoa Kỳ
      }),
      youtube.youtube.videos.list({
        part: 'snippet,contentDetails',
        chart: 'mostPopular',
        regionCode: 'VN', // Mã vùng Việt Nam
        videoCategoryId: '10', // Music category ID
        maxResults: 5, // Số lượng video muốn lấy từ Việt Nam
      })
    ]);

    const combinedVideos = [...usResponse.data.items, ...vnResponse.data.items];
    res.status(200).json(combinedVideos);
  } catch (error) {
    console.error('Error fetching music videos:', error);
    res.status(500).send('Error fetching music videos');
  }
};

module.exports = LoadHomePageData;