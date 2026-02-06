const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, getOrderDetails} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createOrder);
router.get('/detail/:id', protect, getOrderDetails);
router.get('/user/:userId', protect, getUserOrders);

module.exports = router;