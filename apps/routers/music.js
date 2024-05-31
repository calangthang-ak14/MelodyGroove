
const express = require("express"); 
const router = express.Router();

const LoadHomePageData = require("../controller/music/LoadHomePageData");
const PlayMusic = require("../controller/music/PlayMusic");
const SearchSongs = require("../controller/music/SearchSongs");
const DetailSong = require("../controller/music/DetailSong");

router.get("/", LoadHomePageData);
router.post("/song", DetailSong);
router.post("/search", SearchSongs);

router.get("/play/:id", PlayMusic);

module.exports = router;
