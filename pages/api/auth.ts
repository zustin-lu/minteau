import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import { connectDB } from 'database';
import { apiMethodStream } from 'helpers';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  apiMethodStream(req, {
    POST({ makeResponse }) {
      const rootPwd = process.env.USER_PWD;
      const inputPwd = req.body.pwd;

      let response: ReturnType<typeof makeResponse>;

      if (rootPwd !== inputPwd) {
        response = makeResponse({
          code: StatusCodes.UNAUTHORIZED,
        });
      } else {
        response = makeResponse({});
      }

      res.status(response.code).json(response);
    },
  });
}

export default connectDB(handler);
