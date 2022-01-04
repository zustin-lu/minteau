import { Model } from 'mongoose';

type Object = Record<string, any>;
type MongoosePaginateOptions = Partial<{
  sort: Object | string;
  lean: boolean;
  offset: number;
  page: number;
  limit: number;
  pagination: boolean;
}>;
export type MongoosePaginateModel<T> = Model<T> & {
  paginate: (
    query: Object,
    options: MongoosePaginateOptions
  ) => {
    docs: T[];
    totalDocs: number;
    limit: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    page: number;
    totalPages: number;
    offset: number;
    prevPage: number;
    nextPage: number;
  };
};
