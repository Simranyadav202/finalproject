const express = require('express');
const router = express.Router();
const { getAllRoles, addRole } = require('../controllers/roleController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', verifyToken, getAllRoles);
router.post('/', addRole);

module.exports = router;
