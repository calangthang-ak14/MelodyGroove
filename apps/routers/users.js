const express = require("express");
const router = express.Router();

const register = require("../controller/users/register");
const login = require("../controller/users/login");

router.get("/", (req, res) => {
    res.status((200)).json({ message: "User API is working" });
});

router.post("/login", login);
router.post("/register", register)

module.exports = router;