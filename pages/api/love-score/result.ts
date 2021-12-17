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

const route = nc().get(async (req: NextApiRequest, res: NextApiResponse) => {
  let response: ReturnType<typeof makeResponse>;
  try {
    const docs = await LoveScoreModel.find({}).lean();
    response = makeResponse({
      code: StatusCodes.OK,
      payload: docs,
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
