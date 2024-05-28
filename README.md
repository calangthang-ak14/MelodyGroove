# Melody Groove 🎵
A open-source project dedicated to creating an immersive music streaming experience directly from YouTube

# Technologies Used 🚀
Web Application 🌐: ReactJs <br>
Mobile Application 📱: React Native <br>
Backend ⚙️: Node.js <br>
Database 📊: MongoDB <br>

# Project Starting ⏱
05/02/2024 💻

# ALERT FOR SANG NGU ⚠️⚠️⚠️

<b> USING: </b>

```
git pull
```

## API Reference

<b> Get songs for homepage: </b>
```http
GET /api/music/
```

---------------------------------------

<b> Detail song: </b>
```http
POST /api/music/song/
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Require**. id of song 

---------------------------------------

<b> Search songs: </b>
```http
POST /api/music/search
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`      | `string` | **Require**. Name of song 

---------------------------------------

<b> Play songs: </b>
```http
POST /api/music/play
```
| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Require**. id of song 
