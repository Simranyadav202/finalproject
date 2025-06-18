const pool = require('../db');

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM roles');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add a new role
const addRole = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO roles (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding role:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllRoles,
  addRole,
};
