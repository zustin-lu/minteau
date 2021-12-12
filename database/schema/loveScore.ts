import mongoose from 'mongoose';

const loveScoreSchema = new mongoose.Schema(
  {
    score: Number,
    reason: String,
  },
  {
    timestamps: true,
  }
);

const LoveScoreModel =
  mongoose.models.loveScore || mongoose.model('loveScore', loveScoreSchema);

export default LoveScoreModel;
