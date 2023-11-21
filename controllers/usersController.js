const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {};

userController.register = async (req, res) => {
  try {
    const { username, password, role, organisation } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(`Registration failed. Username ${username} already exists.`);
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the specified role and organisation if provided
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      organisation: organisation || undefined, // Set to undefined if not provided
    });

    await newUser.save();

    console.log(`Registration successful. User ${username} registered with role ${role}.`);
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.log(`Error during registration: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

userController.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(username)
    console.log(password)
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      console.log(`Login failed. User ${username} not found.`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log(`Login failed. Invalid password for user ${username}.`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create and send a JWT token with user role
    const token = jwt.sign({ username: user.username, role: user.role }, 'your_secret_key');

    // Check the user's role and send additional information in the response if needed
    if (user.role === 'superadmin') {
      console.log(`Super Admin ${username} logged in.`);
      res.json({ token, message: 'Login successful for Super Admin' });
    } else if (user.role === 'admin') {
      console.log(`Admin ${username} logged in.`);
      res.json({ token, message: 'Login successful for Admin' });
    } else {
      console.log(`User ${username} logged in.`);
      res.json({ token, message: 'Login successful for User' });
    }
  } catch (error) {
    console.log(`Error during login: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add other user-related actions as needed

module.exports = userController;
