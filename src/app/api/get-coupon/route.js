import Claimed from "@/models/claimedModel";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {

    try {
        
        const cookieStore = await cookies()
        const sessionId = cookieStore.get("coupon_session")?.value

        console.log("Session ID:", sessionId);

        if (!sessionId) {
            return NextResponse.json({ error: "SessionId is required" }, { status: 400 });
        }

        const coupons = await Claimed.findOne({ sessionId, type: "cookie" }, { claimedCoupons: 1, _id: 0 });


        if (!coupons || !coupons.claimedCoupons.length) {
            return NextResponse.json({ error: "No coupons found" }, { status: 404 });
        }


        return NextResponse.json({message:"Coupons retrieved successfully",claimedCoupons: coupons.claimedCoupons}, {status: 200})
    } catch (error) {
        console.error("Error getting coupons:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
    
}