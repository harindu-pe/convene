import mongoose from "mongoose";

const MONOGODB_URI = process.env.MONOGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONOGODB_URI) throw new Error("MONOGDB_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONOGODB_URI, {
      dbName: "convene",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
