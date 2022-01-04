import mongoose, { Model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { MongoosePaginateModel } from 'database/types';

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

feedSchema.plugin(mongoosePaginate);
const FeedModel = mongoose.models.feed || mongoose.model('feed', feedSchema);

export default FeedModel as MongoosePaginateModel<{
  author: string;
  caption: string;
  pictures: {
    url: string;
    public_id: string;
  }[];
  createdAt: string;
}>;
