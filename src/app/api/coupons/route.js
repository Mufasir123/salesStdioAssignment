import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import Claimed from "@/models/claimedModel";
import Coupon from "@/models/couponModel";
import dbConnect from "@/lib/dbConnect";

const CLAIM_LIMIT_MS = 60 * 60 * 1000; // 1 hour

export async function POST(request) {
  try {
    await dbConnect(); // Connect to MongoDB
    // Get requested coupon code
    const {ip } = await request.json();
    console.log("Ip add", ip);
    

    if(!ip){
      return NextResponse.json({ error: "IP address is required" }, { status: 400 });
    }
    const cookieStore = await cookies();
    let sessionId = cookieStore.get("coupon_session")?.value || uuidv4()

    if (!sessionId) {
      return NextResponse.json({ error: "Accept Cookies first" }, { status: 400 });
    }

    // Check if the user has claimed within the time limit
    let ipRecord = await Claimed.findOne({ ip, type: "ip" });

    if (ipRecord && ipRecord.claimedCoupons.length > 0 && Date.now() - ipRecord.timestamp < CLAIM_LIMIT_MS) {
      const remainingTime = CLAIM_LIMIT_MS - (Date.now() - ipRecord.timestamp);
      const remainingMinutes = Math.ceil(remainingTime / (1000 * 60));

      return NextResponse.json(
        { error: `You can claim a coupon again in ${remainingMinutes} minutes` },
        { status: 429 }
      );
    }

    // Fetch and distribute coupon
    const coupon = await Coupon.findOneAndUpdate(
      {},
      { $inc: { distributionCount: 1 } },
      { new: true, sort: { distributionCount: 1 } }
    );

    if (!coupon) {
      return NextResponse.json({ error: "No coupons available" }, { status: 404 });
    }

    // ✅ Store the claimed coupon for IP-based tracking
    if (!ipRecord) {
      ipRecord = await Claimed.create({
        ip,
        type: "ip",
        claimedCoupons: [coupon.code],
        timestamp: Date.now(),
      });
    } else {
      await Claimed.findOneAndUpdate(
        { ip, type: "ip" },
        {
          $set: { timestamp: Date.now() },
          $addToSet: { claimedCoupons: coupon.code },
        },
        { new: true }
      );
    }

    // ✅ Store the claimed coupon for session (cookie-based tracking)
    let sessionRecord = await Claimed.findOne({ sessionId, type: "cookie" });

    if (!sessionRecord) {
      sessionRecord = await Claimed.create({
        sessionId,
        type: "cookie",
        claimedCoupons: [coupon.code],
        timestamp: Date.now(),
      });
    } else {
      await Claimed.findOneAndUpdate(
        { sessionId, type: "cookie" },
        {
          $set: { timestamp: Date.now() },
          $addToSet: { claimedCoupons: coupon.code },
        },
        { new: true }
      );
    }

    // Set the session cookie
    const response = NextResponse.json({ message: "Coupon claimed successfully", coupon: coupon.code });
    response.headers.set(
      "Set-Cookie",
      `coupon_session=${sessionId}; Path=/; HttpOnly; Max-Age=3600; Secure=${process.env.NODE_ENV === "production"}`
    );

    return response;
  } catch (error) {
    console.error("Error claiming coupon:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
