import { connectDB } from "@/lib/dbConnect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();

  const { id } = await params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Invalid product ID" });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();

  const { id } = await params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    await Product.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid product ID" });
  }
}

export async function PATCH(req, { params }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
     returnDocument: "after",
      runValidators: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }
}
