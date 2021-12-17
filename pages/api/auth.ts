import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import dayjs from 'dayjs';
import nc from 'next-connect';

import { connectDB } from 'database';
import { makeResponse } from 'helpers';

const route = nc().post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { LMINT_PWD, MINTEAU_PWD } = process.env;
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
        avatarUrl: isMinteau ? '/images/minteau.jpeg' : '/images/lmint.jpeg',
      },
    });
  }

  res.status(response.code).json(response);
});

export default connectDB(route);
