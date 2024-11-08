const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index.js"); // Adjust the import path according to your project structure

/* User Registration */
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    const profileImagePath = profileImage.path;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    res.status(200).json({
      message: "User registered successfully!",
      user: newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Registration failed!",
      error: err.message,
    });
  }
};

/* User Login */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(409).json({ message: "User doesn't exist!" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    // Exclude password from the user data
    const { password: _, ...userData } = user.toJSON();

    res.status(200).json({ token, user: userData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Export the functions for use in other files
module.exports = { registerUser, loginUser };
