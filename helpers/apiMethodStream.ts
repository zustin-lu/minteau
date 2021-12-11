import { NextApiRequest } from 'next';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Response = {
  code?: StatusCodes;
  reasonPhrase?: ReasonPhrases;
  data?: null | unknown;
};
type ResolverHelpers = {
  makeResponse: (res: Response) => Response;
};
type Resolver = (helpers: ResolverHelpers) => void;
type Config = Partial<Record<Methods, Resolver>>;

function makeResponse(response: Response): Response {
  return {
    ...response,
    code: response.code || StatusCodes.OK,
    data: response.data || null,
  };
}

function apiMethodStream(req: NextApiRequest, config: Config = {}) {
  const action = config[req?.method];
  if (action) action({ makeResponse });
}

export default apiMethodStream;
