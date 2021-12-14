import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

const connectDB = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
      return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    return handler(req, res);
  };

export default connectDB;
