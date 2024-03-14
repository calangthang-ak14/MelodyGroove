const puppeteer = require('puppeteer');

async function searchYouTube(query) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`);
  
  const videos = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('#video-title').forEach(link => {
      results.push({
        title: link.textContent.trim(),
        link: 'https://www.youtube.com' + link.getAttribute('href')
      });
    });
    return results;
  });
  
  await browser.close();
  
  return videos;
}

searchYouTube('Chưa phải là yêu').then(results => {
  results.forEach(video => {
    console.log(video.title);
    console.log(video.link);
  });
}).catch(error => console.error(error));
