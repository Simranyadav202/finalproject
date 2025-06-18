const express = require('express');
const router = express.Router();
const controller = require('../controllers/materialController');

// Get all materials
router.get('/', controller.getAllMaterials);

// Get one material by ID
router.get('/:id', controller.getMaterialById);

// Add new material
router.post('/', controller.createMaterial);

// Update material by ID
router.put('/:id', controller.updateMaterial);

// Delete material by ID
router.delete('/:id', controller.deleteMaterial);

module.exports = router;
