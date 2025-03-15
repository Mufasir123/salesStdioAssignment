import Claimed from "@/models/claimedModel";
import { NextResponse } from "next/server";

const CLAIM_LIMIT_MS = 60 * 60 * 1000; // 1 hour

export async function GET(request) {
    const ip = request.headers.get("x-forwarded-for") || request.ip;

    const ipRecord = await Claimed.findOne({ ip, type: "ip" });

    if (ipRecord && Date.now() - ipRecord.timestamp < CLAIM_LIMIT_MS) {
        const remainingTime = CLAIM_LIMIT_MS - (Date.now() - ipRecord.timestamp);
        const remainingMinutes = Math.ceil(remainingTime / (1000 * 60));

        return NextResponse.json({
            status: "restricted",
            message: `You can claim a coupon in ${remainingMinutes} minutes.`,
        });
    }

    return NextResponse.json({ status: "eligible", message: "You can claim a coupon." });
}
