import mongoose from 'mongoose';

export async function mongoConfig(): Promise<void> {
  try {
    if (mongoose.connection.readyState === 1) return;

    console.log('Connecting to MongoDB...');

    await mongoose.connect(process.env.MONGO_URL as string);

    console.log('Connected to MongoDB');
  } catch (error) {
    throw new Error("Couldn't connect");
  }
}
