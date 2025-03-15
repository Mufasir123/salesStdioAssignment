import dbConnect from "@/lib/dbConnect";
import Coupon from "@/models/adminCouponModel";
import { NextResponse } from "next/server";


export async function GET() {

    try {
        await dbConnect();
        const coupons = await Coupon.find()
        return NextResponse.json({coupons}, {status: 200})
    } catch (error) {
        console.error("Error getting coupons:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
    
}