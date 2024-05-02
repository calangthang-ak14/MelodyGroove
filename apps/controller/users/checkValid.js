const asyncHandler = require('express-async-handler');

const currentUser = asyncHandler(async (req, res) => {
    const user = req.user;
    return res.status(200).json(`Welcome ${user.username}`);
});

module.exports = currentUser;