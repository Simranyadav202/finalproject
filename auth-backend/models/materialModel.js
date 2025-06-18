const pool = require('../db');

// Only use this version with correct table name
exports.getAllMaterials = () => pool.query('SELECT * FROM material_table');

exports.getMaterialById = (id) =>
  pool.query('SELECT * FROM material_table WHERE id = $1', [id]);

exports.createMaterial = ({ name, category, quantity, status, vendor }) =>
  pool.query(
    'INSERT INTO material_table (name, category, quantity, status, vendor) VALUES ($1, $2, $3, $4, $5)',
    [name, category, quantity, status, vendor]
  );

exports.updateMaterial = (id, { name, category, quantity, status, vendor }) =>
  pool.query(
    'UPDATE material_table SET name=$1, category=$2, quantity=$3, status=$4, vendor=$5 WHERE id=$6',
    [name, category, quantity, status, vendor, id]
  );

exports.deleteMaterial = (id) =>
  pool.query('DELETE FROM material_table WHERE id = $1', [id]);
