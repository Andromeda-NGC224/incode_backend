import { Request } from 'express';

// ! ENUMS

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

// ! TYPES
export type TypedRequest<
  T extends {
    params?: unknown;
    query?: unknown;
    body?: unknown;
  },
> = Request<
  T['params'] extends undefined ? unknown : T['params'],
  unknown,
  T['body'] extends undefined ? unknown : T['body'],
  T['query'] extends undefined ? unknown : T['query']
>;

export interface MessageResponse {
  message: string;
}

export type Nullable<T> = T | null;
