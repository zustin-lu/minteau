import mongoose from 'mongoose';

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(process.env.MONGO_URL);
  return handler(req, res);
};

export default connectDB;
