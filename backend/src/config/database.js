import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI?.trim();

    if (!uri) {
      throw new Error('MONGODB_URI is missing in .env');
    }

    const conn = await mongoose.connect(uri, {
      maxPoolSize: 10,
      minPoolSize: 2,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
      family: 4
    });

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      console.error(`✗ MongoDB Error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠ MongoDB Disconnected');
    });

  } catch (error) {
    console.error('✗ MongoDB Connection Error:', error.message);
    console.warn('⚠ Running without database — form submissions will fail');
  }
};

export default connectDB;
