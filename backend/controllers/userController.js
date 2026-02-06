const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

exports.updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;
        user.avatarUrl = req.body.avatarUrl || user.avatarUrl;

        if (req.body.password) {
            user.password = req.body.password; 
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            avatarUrl: updatedUser.avatarUrl
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};