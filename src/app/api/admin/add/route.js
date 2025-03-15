import Coupon from "@/models/adminCouponModel";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const formData = await request.json();

        const title = formData.title?.trim();
        const description = formData.description?.trim();
        const code = formData.code?.trim();
        const discount = formData.discount ? Number(formData.discount) : null;
        const expiryDate = formData.expiryDate ? new Date(formData.expiryDate) : null;

        // console.log("Received Data:", { title, description, code, discount, expiryDate });

        if (!title || !description || !code || !discount || !expiryDate) {
            return NextResponse.json({ error: "Please fill all required fields" }, { status: 400 });
        }

        const existingCoupon = await Coupon.findOne({ code });
        if (existingCoupon) {
            return NextResponse.json({ error: "Coupon code already exists" }, { status: 409 });
        }

        const newCoupon = await Coupon.create({
            title,
            description,
            code,
            discount,
            expiryDate: expiryDate ? new Date(expiryDate) : null
        });

        return NextResponse.json({ message: "Coupon added successfully", coupon: newCoupon }, { status: 201 });

    } catch (error) {
        console.error("Error adding coupon:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}