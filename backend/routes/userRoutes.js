const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    getUserProfile, 
    updateUserProfile 
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');
const { validateRegister } = require('../middleware/validation');

router.post('/register', validateRegister, registerUser);
router.post('/login', loginUser);
router.route('/:id')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

module.exports = router;