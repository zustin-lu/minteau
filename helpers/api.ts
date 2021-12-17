import { StatusCodes, ReasonPhrases } from 'http-status-codes';

type Response = {
  code?: StatusCodes;
  reasonPhrase?: ReasonPhrases;
  payload?: null | unknown;
};

export function makeResponse(response: Response): Response {
  return {
    ...response,
    code: response.code || StatusCodes.OK,
    payload: response.payload || null,
  };
}
