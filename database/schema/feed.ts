import mongoose from 'mongoose';

const feedSchema = new mongoose.Schema(
  {
    author: String,
    caption: String,
    pictures: [
      {
        url: String,
        public_id: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const FeedModel = mongoose.models.feed || mongoose.model('feed', feedSchema);

export default FeedModel;
