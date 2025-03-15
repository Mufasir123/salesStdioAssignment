import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    discount: {
        type: Number,
        default: 0,
    },
    expiryDate:{
        type: Date,
    },
    distributionCount:{
        type: Number,
        default: 0,
    }
})

const Coupon =mongoose.models.Coupon ||  mongoose.model("Coupon", couponSchema);

export default Coupon;