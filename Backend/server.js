const app = require('./src/app');
const PORT = process.env.PORT || 5000;
const connectDB = require('./src/config/database');
const { initRedis } = require('./src/services/redis.service');

const startServer = async () => {
    await connectDB();
    await initRedis();
    
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
