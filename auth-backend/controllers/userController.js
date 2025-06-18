const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Register a new user with hashed password
const registerUser = async (req, res) => {
  const { name, email, password, dob, role_id } = req.body;
  try {
    // Check if email already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const result = await pool.query(
      'INSERT INTO users (name, email, password, dob, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email',
      [name, email, hashedPassword, dob, role_id]
    );

    const newUser = result.rows[0];

    // Generate token
    const token = jwt.sign({ userId: newUser.id }, 'yourSecretKey', { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: newUser,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
};
