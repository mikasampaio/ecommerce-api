import { Request } from 'express';

export type BodyRequest<T> = Request<unknown, unknown, T> & {
  userId?: string;
};

export type QueryRequest<T> = Request<unknown, unknown, unknown, T> & {
  userId?: string;
};
