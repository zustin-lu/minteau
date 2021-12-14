import { NextApiRequest, NextApiResponse } from 'next';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { connectDB, LoveScoreModel } from 'database';
import { apiMethodStream } from 'helpers';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  apiMethodStream(req, {
    async GET({ makeResponse }) {
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
    },
  });
}

export const config = {
  api: {
    externalResolver: true,
  },
};

export default connectDB(handler);
