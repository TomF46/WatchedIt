import { PaginationResponse } from './PaginationResponse';

export type Image = {
  id?: number;
  url?: string;
};

type Images = {
  data: Image[];
};

export type ImagePaginationResponse = Images & PaginationResponse;
