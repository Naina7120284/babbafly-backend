const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const { listing, seller, totalPrice } = req.body;
        const newOrder = new Order({
            buyer: req.user._id, 
            listing,
            seller,
            totalPrice
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.params.userId }).populate('listing');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrderDetails = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('listing seller buyer');
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};