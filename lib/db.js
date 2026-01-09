import mongoose from "mongoose";
import '@/models/categoryModel'; // Ensure Category model is registered
import '@/models/productModel';
import '@/models/orderModel';
import '@/models/userModels';

// This pattern is to prevent Mongoose from creating new connections
// and re-registering models on every HMR reload in development.
// It uses a global object to store the cached connection.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectMongoDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!process.env.DB_URI) {
    console.error("FATAL ERROR: DB_URI environment variable is not defined.");
    process.exit(1);
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.DB_URI).then((m) => {
      return m;
    }).catch((error) => {
      console.error("!!! MONGODB CONNECTION FAILED !!!");

      // Log the URI for debugging, but redact credentials
      const uri = process.env.DB_URI || "";
      const redactedUri = uri.replace(/\/\/(.*):(.*)@/, "//REDACTED:REDACTED@");
      console.error("Attempted URI (redacted):", redactedUri);

      console.error("Error details:", error.message);
      cached.promise = null; // Reset promise on failure
      process.exit(1);
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectMongoDatabase;
