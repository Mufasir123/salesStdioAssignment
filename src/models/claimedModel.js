import mongoose from "mongoose";

const claimedSchema = new mongoose.Schema({
    claimedCoupons: [{type: String}],
    ip:{type: String},
    sessionId:{type: String},
    type:{type: String, enum:['ip', 'cookie'],required:true},
    timestamp:{type:Number, default: Date.now()}
},{timestamps:true})

claimedSchema.index({ip:1, type:1})
claimedSchema.index({sessionId:1, type:1})

const Claimed =mongoose.models.Claimed ||  mongoose.model('Claimed', claimedSchema);

export default Claimed;