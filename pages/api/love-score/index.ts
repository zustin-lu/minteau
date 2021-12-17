import { NextApiRequest, NextApiResponse } from 'next';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import nc from 'next-connect';

import { connectDB, LoveScoreModel } from 'database';
import { makeResponse } from 'helpers';

export const config = {
  api: {
    externalResolver: true,
  },
};

const route = nc();
route.get(async (req: NextApiRequest, res: NextApiResponse) => {
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
});

route.post(async (req: NextApiRequest, res: NextApiResponse) => {
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
});

export default connectDB(route);
