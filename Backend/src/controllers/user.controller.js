const userModel = require('../models/user.model.js');

const toggleFavorite = async (req, res) => {
    try {
        const { movieId } = req.body;
        const user = await userModel.findById(req.user.id);

        const isFavorite = user.favorites.some(id => String(id) === String(movieId));
        if (isFavorite) {
            user.favorites = user.favorites.filter(id => String(id) !== String(movieId));
        } else {
            user.favorites.push(String(movieId));
        }

        await user.save();
        res.status(200).json({ favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: "Error updating favorites", error: error.message });
    }
};

const getFavorites = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        res.status(200).json({ favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: "Error getting favorites", error: error.message });
    }
}

const addToHistory = async (req, res) => {
    try {
        const { movieId, title, posterPath, voteAverage } = req.body;
        const user = await userModel.findById(req.user.id);

        // move it to the top if exists, otherwise add new entry
        user.watchHistory = user.watchHistory.filter(item => String(item.movieId) !== String(movieId));
        
        user.watchHistory.unshift({ 
            movieId: String(movieId), 
            title, 
            posterPath,
            voteAverage: voteAverage || 0
        });
        
        // only last 20 items in history
        if (user.watchHistory.length > 20) user.watchHistory.pop();

        await user.save();
        res.status(200).json({ history: user.watchHistory });
    } catch (error) {
        res.status(500).json({ message: "Error updating history", error: error.message });
    }
};

const getHistory = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        res.status(200).json({ history: user.watchHistory });
    } catch (error) {
        res.status(500).json({ message: "Error getting history", error: error.message });
    }
};

module.exports = {
    toggleFavorite,
    addToHistory,
    getFavorites,
    getHistory
}