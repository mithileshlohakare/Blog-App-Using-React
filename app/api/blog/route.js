import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
import fs from "fs";
import { NextResponse } from "next/server";

// ✅ GET all blogs or specific by ?id=
export async function GET(request) {
  try {
    await ConnectDB();

    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("id");

    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      if (!blog) {
        return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, blog });
    }

    const blogs = await BlogModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, blogs });
  } catch (err) {
    console.error("❌ GET /api/blog Error:", err);
    return NextResponse.json({ success: false, msg: "Failed to fetch blogs" }, { status: 500 });
  }
}

// ✅ POST a new blog
export async function POST(request) {
  try {
    await ConnectDB();

    const formData = await request.formData();
    const image = formData.get("image");
    if (!image) throw new Error("No image provided");

    const timestamp = Date.now();
    const imageBytes = await image.arrayBuffer();
    const buffer = Buffer.from(imageBytes);
    const imagePath = `./public/${timestamp}_${image.name}`;
    await writeFile(imagePath, buffer);

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      authorImg: formData.get("authorImg"),
      image: `/${timestamp}_${image.name}`,
    };

    const blog = await BlogModel.create(blogData);
    console.log("✅ Blog Saved:", blog);

    return NextResponse.json({ success: true, msg: "Blog Added Successfully" });
  } catch (err) {
    console.error("❌ POST /api/blog Error:", err);
    return NextResponse.json(
      { success: false, msg: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ DELETE a blog by ?id=
export async function DELETE(request) {
  try {
    await ConnectDB();

    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, msg: "Blog ID is required" }, { status: 400 });
    }

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json({ success: false, msg: "Blog not found" }, { status: 404 });
    }

    // safely delete image
    const imagePath = `./public${blog.image}`;
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) console.error("⚠️ Error deleting image:", err);
      });
    }

    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true, msg: "Blog Deleted Successfully" });
  } catch (err) {
    console.error("❌ DELETE /api/blog Error:", err);
    return NextResponse.json(
      { success: false, msg: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
