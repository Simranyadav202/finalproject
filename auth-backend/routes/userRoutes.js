const express = require('express');
const router = express.Router();
const { getAllUsers, registerUser } = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', verifyToken, getAllUsers);
// userRoutes.js
router.post('/register', registerUser); 


module.exports = router;
