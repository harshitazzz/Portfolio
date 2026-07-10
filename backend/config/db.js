const mongoose = require('mongoose');

// Cache the connection across serverless invocations (Vercel reuses warm containers,
// but without this cache every cold start / re-import can open a fresh connection,
// which can hang and hit Mongoose's default 10s buffering timeout).
let cached = global._mongooseCache;
if (!cached) {
  cached = global._mongooseCache = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (!process.env.MONGO_URI) {
      console.warn('WARNING: MONGO_URI environment variable is not defined!');
    }

    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';

    cached.promise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 8000, // fail fast instead of hanging silently
      })
      .then((mongooseInstance) => {
        console.log(`MongoDB Connected: ${mongooseInstance.connection.host}`);
        return mongooseInstance;
      })
      .catch((error) => {
        cached.promise = null; // allow retry on next request instead of staying broken
        console.error(`Database Connection Error: ${error.message}`);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
