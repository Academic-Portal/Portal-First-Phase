const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const MONGO_URI = "mongodb+srv://surya:NOYv0Tsb61spL87v@main.tnozm.mongodb.net/issues?retryWrites=true&w=majority"
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });

        console.log(`MONGODB connected: ${conn.connection.host}`);

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;