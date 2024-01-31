const mongoose = require("mongoose");

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("Connected to MongoDB Atlas");
    } catch (err) {
        console.error(err);
    }
}

connectToDatabase();
