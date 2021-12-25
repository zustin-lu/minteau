import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import nc from 'next-connect';

import { connectDB, cloudinaryDelete, FeedModel } from 'database';
import { makeResponse } from 'helpers';

const route = nc();

route.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const newFeed = new FeedModel({ ...req.body });
  let response: ReturnType<typeof makeResponse>;

  try {
    await newFeed.save();
    response = makeResponse({
      code: StatusCodes.OK,
      payload: newFeed,
    });
  } catch (err) {
    const { pictures } = req.body;
    await Promise.all(
      pictures.map(({ public_id }) => cloudinaryDelete(public_id))
    );
    response = makeResponse({
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      reasonPhrase: ReasonPhrases.INTERNAL_SERVER_ERROR,
      payload: null,
    });
  }

  res.status(response.code).json(response);
  res.end();
});

route.get(async (req: NextApiRequest, res: NextApiResponse) => {
  let response: ReturnType<typeof makeResponse>;
  try {
    const docs = await FeedModel.find({})
      .sort({
        updatedAt: -1,
      })
      .lean();
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

route.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  let response: ReturnType<typeof makeResponse>;

  try {
    const deleted = await FeedModel.findByIdAndDelete(id).lean();
    await Promise.all(
      deleted.pictures.map((pic) => cloudinaryDelete(pic.public_id))
    );
    response = makeResponse({
      code: StatusCodes.OK,
      payload: deleted,
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
