import mongoose from "mongoose";

const dbConnect = async () => {
    await mongoose.connect(process.env.NEXT_APP_DBCONNECT).then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        console.log("Database connection failed", err);
    });
};

export default dbConnect;