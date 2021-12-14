import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import dayjs from 'dayjs';

import { connectDB } from 'database';
import { apiMethodStream } from 'helpers';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { LMINT_PWD, MINTEAU_PWD } = process.env;
  apiMethodStream(req, {
    POST({ makeResponse }) {
      const { pwd: inputPwd, user } = req.body;
      const isMinteau = user === 'minteau';
      const rootPwd = isMinteau ? MINTEAU_PWD : LMINT_PWD;

      let response: ReturnType<typeof makeResponse>;

      if (rootPwd !== inputPwd) {
        response = makeResponse({
          code: StatusCodes.UNAUTHORIZED,
        });
      } else {
        response = makeResponse({
          payload: {
            expiredAt: dayjs().add(1, 'h').toISOString(),
            user,
            avatarUrl: isMinteau
              ? '/images/minteau.jpeg'
              : '/images/lmint.jpeg',
          },
        });
      }

      res.status(response.code).json(response);
    },
  });
}

export default connectDB(handler);
