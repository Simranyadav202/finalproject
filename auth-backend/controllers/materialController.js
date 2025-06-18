const pool = require('../db');

// ✅ Get all materials
exports.getAllMaterials = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM material_table');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching materials:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Get one material
exports.getMaterialById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM material_table WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Create material
exports.createMaterial = async (req, res) => {
  const { name, category, quantity, status, vendor } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO material_table (name, category, quantity, status, vendor) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, category, quantity, status, vendor]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating material:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Update material
exports.updateMaterial = async (req, res) => {
  const id = req.params.id;
  const { name, category, quantity, status, vendor } = req.body;
  try {
    const result = await pool.query(
      'UPDATE material_table SET name=$1, category=$2, quantity=$3, status=$4, vendor=$5 WHERE id=$6 RETURNING *',
      [name, category, quantity, status, vendor, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Delete material
exports.deleteMaterial = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query('DELETE FROM material_table WHERE id = $1', [id]);
    res.status(204).send(); // No content
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
