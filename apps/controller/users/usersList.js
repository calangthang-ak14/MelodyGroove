require('dotenv').config();
const jwt = require('jsonwebtoken');
const Users = require('../../models/users/users');

const UsersList = async (req, res) => {
    try {
        const users = await Users.find();
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json({ message: "Sorry, there was a problem with the server. Please try again later!" });
    }
};

module.exports = UsersList;