import mongoose from 'mongoose';

let isConnected = false; //track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  if (isConnected) {
    console.log('MonoDB is already connected');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'prompter_ai',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MonoDB connected');
  } catch (error) {
    console.log('Error connecting', error);
  }
};
