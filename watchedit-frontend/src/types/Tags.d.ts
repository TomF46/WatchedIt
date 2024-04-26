import { PaginationResponse } from './PaginationResponse';
import { onSaveError } from './forms';

export type Tag = {
  id?: number;
  name: string;
  type?: number;
};

type Tags = {
  data: Tag[];
};

export type TagsPaginationResponse = Tags & PaginationResponse;

export type TagFormErrors = {
  name: string;
  type: string;
} & onSaveError;
