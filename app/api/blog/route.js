import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    await ConnectDB();

    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image");
    if (!image) throw new Error("No image provided");

    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);

    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);

    const imgUrl = `/${timestamp}_${image.name}`;

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
      authorImg: formData.get("authorImg"),
    };

    const blog = await BlogModel.create(blogData);
    console.log("✅ Blog Saved:", blog);

    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (err) {
    console.error("❌ POST /api/blog Error:", err);
    return NextResponse.json(
      { success: false, msg: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
