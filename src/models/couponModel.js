import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    distributionCount: { type: Number, default: 0 },
});

export default mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);
