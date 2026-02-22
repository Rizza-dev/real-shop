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
  const category = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const inStock = searchParams.get("inStock");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");

  const page = parseInt(searchParams.get("page") || 1);
  const limit = parseInt(searchParams.get("limit") || 12);

  try {
    // ساخت Query داینامیک MongoDB

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (inStock) {
      filter.stock = { $gt: 0 };
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$gte = Number(maxPrice);
      }
    }

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    // Sorting داینامیک
    let sortOption = { createdAt: -1 };

    switch (sort) {
      case "price-asc":
        sortOption = { price: 1 };
        break;

      case "price-desc":
        sortOption = { price: -1 };
        break;

      case "newest":
        sortOption = { createdAt: -1 };
        break;
    }

    // Pagination واقعی

    const skip = (page - 1) * limit;

    // گرفتن دیتا از MongoDB

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    // گرفتن تعداد کل برای pagination UI
    const total = await Product.countDocuments(filter);

    // Response استاندارد

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return error(err.message);
  }
}
