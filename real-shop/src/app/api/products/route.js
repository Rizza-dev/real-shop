import { NextResponse } from "next/server";
import {connectDB} from "@/lib/dbConnect";
import Product from "@/models/Product";

// Create a new product
export async function POST(req) {
  await connectDB();
  console.log("db is connected");
  
  const body = await req.json();
  const product = await Product.create(body);
  return NextResponse.json(product, { status: 201 });
}

// Get all products
export async function GET() {
  await connectDB();
  const products = await Product.find({ isActive: true });
  return NextResponse.json(products);
}
