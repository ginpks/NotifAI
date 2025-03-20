const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login Request Received:", { email, password }); // Debug

        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log("User not found for email:", email); // Debug
            return res.status(401).json({ message: "Invalid username or password" });
        }

        console.log("User Found:", user.toJSON()); // Debug
        console.log(user.password)
        console.log(password)
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match Status:", isMatch); // Debug

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ error: "Failed to log in" });
    }
};

  module.exports = {
    loginUser: loginUserController,
  };