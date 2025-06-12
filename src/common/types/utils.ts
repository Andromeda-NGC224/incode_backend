import { Request } from 'express';

export type Nullable<T> = T | null;

export type Maybe<T> = T | undefined;

export type TypedRequest<
  T extends {
    params?: unknown;
    query?: unknown;
    body?: unknown;
    validatedQuery?: unknown;
  } = object,
> = Request<
  T['params'] extends undefined ? unknown : T['params'],
  unknown,
  T['body'] extends undefined ? unknown : T['body'],
  T['query'] extends undefined ? unknown : T['query']
> & {
  validatedQuery?: T['validatedQuery'] extends undefined
    ? unknown
    : T['validatedQuery'];
};
