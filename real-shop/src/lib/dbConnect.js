import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "shop",
      bufferCommands: false, // ⭐ مهم
    });
  }
  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB REAL Connected");
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}
