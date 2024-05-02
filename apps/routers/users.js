const express = require("express");
const router = express.Router();

const register = require("../controller/users/register");
const check= require("../controller/users/checkValid");
const login = require("../controller/users/login");

const validToken = require("../utils/middleware/validUser");

router.get("/", (req, res) => {
    res.status((200)).json({ message: "User API is working" });
});

router.get("/check", validToken, check);
router.post("/login", login);
router.post("/register", register)

module.exports = router;