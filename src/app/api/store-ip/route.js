import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import Claimed from "@/models/claimedModel";
import dbConnect from "@/lib/dbConnect";

export async function POST(request) {
  try {
    await dbConnect(); // Connect to MongoDB

    // Fetch external IP using an API
    const ipRes = await fetch("https://api64.ipify.org?format=json");
    const { ip } = await ipRes.json();

    if (!ip) {
      return NextResponse.json({ error: "IP address not found" }, { status: 400 });
    }

    // Access cookies
    const cookieStore =await cookies();
    let sessionId = cookieStore.get("coupon_session")?.value;
    console.log("sessionId: " + sessionId);
    

    if (!sessionId) {
      sessionId = uuidv4(); // Generate a new session ID
    }

    // Check if IP already exists
    const existingIP = await Claimed.findOne({ ip, type: "ip" },{sessionId});

    if (!existingIP) {
      await Claimed.create({
        ip,
        type: "ip",
        timestamp: new Date(),
      });
    }

    // Check if session already exists
    const existingSession = await Claimed.findOne({ sessionId, type: "cookie" });

    if (!existingSession) {
      await Claimed.create({
        sessionId,
        type: "cookie",
        timestamp: new Date(),
      });
    }

    // Set the cookie in response
    const response = NextResponse.json({status:200 , message: "IP and session stored successfully", ip, sessionId});
    response.headers.set(
      "Set-Cookie",
      `coupon_session=${sessionId}; Path=/; HttpOnly; Max-Age=3600; Secure=${process.env.NODE_ENV === "production"}`
    );

    return response;
  } catch (error) {
    console.error("Error storing IP:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
