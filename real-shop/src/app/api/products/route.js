import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Product from "@/models/Product";
import { productSchema } from "@/utils/validators";

// Create a new product
export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const parsed = productSchema.parse(body); // Zod validation
    const existing = await Product.findOne({ slug: parsed.slug });
    if (existing) {
      return NextResponse.json(
        { error: "Product with this slug already exists" },
        { status: 400 },
      );
    }

    const newProduct = await Product.create(parsed);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    // اگر Zod error باشه، جزئیاتش رو برگردون
    if (error.name === "ZodError") {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

// Get all products
export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || 1);
  const limit = parseInt(searchParams.get("limit") || 10);
  const category = searchParams.get("category");

  try {
    const query = category ? { category } : {};
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Product.countDocuments(query);

    return NextResponse.json(
      {
        products,
        total,
        page,
        pages: Math.ceil(total / limit),
      },
      { status: 200 },
    );
  } catch (error) {
    return error(err.message);
  }
}
