const uuid = require('uuid'); // Import the uuid module
const bcrypt = require('bcrypt'); // Import the bcrypt module
const User = require('../../models/users/users'); // Import the User model

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/; // Regular expression for phone number validation

const validateEmail = (email) => emailRegex.test(email); // Function to validate email
const validatePhone = (phone) => phoneRegex.test(phone); // Function to validate phone number

//@desc Register a new user
//@route POST /api/users/register
const register = async (req, res) => {
    const { username, password, email, phonenumber } = req.body;
    if (!username || !password || !email || !phonenumber) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email address" });
    }
    if (!validatePhone(phonenumber)) {
        return res.status(400).json({ message: "Invalid phone number" });
    }
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser){
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10); // generate ra một salt để mã hóa mật khẩu (salt là một chuỗi ngẫu nhiên được thêm vào mật khẩu trước khi mã hóa để tăng cường bảo mật)
        const hashedPassword = await bcrypt.hash(password, salt);
        const id = uuid.v4();
        const user = new User({ id, username, password: hashedPassword, email, phonenumber });
        await user.save();
        return res.status(201).json({message: `Create new user ${username}` });
    } catch (error) {
        return res.status(500).json({ message: "Sorry, there was a problem with the server. Please try again later!" });
    };
};

module.exports = register;