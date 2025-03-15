import path from 'path';
import fs from 'fs';
import { NextResponse } from "next/server";


const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

export const POST = async (request) => {
    try {
        const formData = await request.formData();
        const file = formData.get('image');
        if (!file) {
            return { status: 400, body: { error: "Please upload an image" } };
        }

        const buffer = await file.arrayBuffer();
        const filePath = path.join(uploadDir,`${Date.now()}-${file.name}`);
        fs.writeFileSync(filePath, Buffer.from(new Uint8Array(buffer)));

        const imageUrl = `/upload/${file.name}` 
        return NextResponse.json({
            message:"File uploaded successfully",
            imageUrl
        })
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}