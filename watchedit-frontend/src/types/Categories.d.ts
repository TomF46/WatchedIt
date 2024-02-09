import { PaginationResponse } from "./PaginationResponse";
import { onSaveError } from "./forms";

export type Category = {
  id?: number;
  name: string;
};

type Categories = {
  data: Category[];
};

export type CategoriesPaginationResponse = Categories & PaginationResponse;

export type CategoryFormErrors = Category & onSaveError;
