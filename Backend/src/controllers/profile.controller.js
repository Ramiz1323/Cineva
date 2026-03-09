const userModel = require('../models/user.model.js');
const bcrypt = require('bcryptjs');

const getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({
            username: user.username,
            email: user.email,
            role: user.role,
            bio: user.bio || '',
            favoritesCount: user.favorites.length,
            watchlistCount: user.watchlist.length,
            historyCount: user.watchHistory.length,
            createdAt: user._id.getTimestamp(),
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { username, bio, currentPassword, newPassword } = req.body;
        const user = await userModel.findById(req.user.id).select('+password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update username / bio
        if (username && username !== user.username) {
            const taken = await userModel.findOne({ username });
            if (taken) return res.status(400).json({ message: 'Username already taken' });
            user.username = username;
        }
        if (bio !== undefined) user.bio = bio;

        // Change password
        if (newPassword) {
            if (!currentPassword) return res.status(400).json({ message: 'Current password is required' });
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Current password is incorrect' });
            user.password = await bcrypt.hash(newPassword, 10);
        }

        await user.save();
        res.status(200).json({
            message: 'Profile updated successfully',
            user: { username: user.username, email: user.email, role: user.role, bio: user.bio || '' },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};

module.exports = { getProfile, updateProfile };
