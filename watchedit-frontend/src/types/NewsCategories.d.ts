import { PaginationResponse } from './PaginationResponse';
import { onSaveError } from './forms';

export type NewsCategory = {
  id?: number;
  name: string;
};

type NewsCategories = {
  data: Category[];
};

export type NewsCategoriesPaginationResponse = NewsCategories &
  PaginationResponse;

export type NewsCategoryFormErrors = NewsCategory & onSaveError;
