// ! ENUMS
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface MessageResponse {
  message: string;
}

export interface ActiveUser {
  id: number;
  email: string;
}
