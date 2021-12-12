import { NextApiRequest, NextApiResponse } from 'next';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { connectDB, LoveScoreModel } from 'database';
import { apiMethodStream } from 'helpers';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  apiMethodStream(req, {
    async GET({ makeResponse }) {
      let response: ReturnType<typeof makeResponse>;
      try {
        const [payload] = await LoveScoreModel.aggregate([
          { $group: { _id: null, totalScore: { $sum: '$score' } } },
        ]);
        response = makeResponse({
          code: StatusCodes.OK,
          payload,
        });
      } catch (err) {
        response = makeResponse({
          code: StatusCodes.INTERNAL_SERVER_ERROR,
          reasonPhrase: ReasonPhrases.INTERNAL_SERVER_ERROR,
          payload: null,
        });
      }

      res.status(response.code).json(response);
    },
    async POST({ makeResponse }) {
      const { score, reason } = req.body;
      const newScore = new LoveScoreModel({
        score: score,
        reason: reason || '',
      });

      let response: ReturnType<typeof makeResponse>;

      try {
        await newScore.save();
        response = makeResponse({
          code: StatusCodes.OK,
          payload: newScore,
        });
      } catch (err) {
        response = makeResponse({
          code: StatusCodes.INTERNAL_SERVER_ERROR,
          reasonPhrase: ReasonPhrases.INTERNAL_SERVER_ERROR,
          payload: null,
        });
      }

      res.status(response.code).json(response);
    },
  });
}

export const config = {
  api: {
    externalResolver: true,
  },
};

export default connectDB(handler);
