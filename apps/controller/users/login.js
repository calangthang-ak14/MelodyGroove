require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../../models/users/users');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const accessToken = jwt.sign({ email: user.email, username: user.username, id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '120m' });
                return res.status(200).json({token: `${accessToken}`, message: `Welcome ${user.username}` });
            } else {
                return res.status(400).json({ message: "Invalid credentials" });
            }
        } else {
            return res.status(400).json({ message: "User not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Sorry, there was a problem with the server. Please try again later!" });
    }
};

module.exports = login;