import { SelectOption } from '../components/Inputs/InputTypes';
import { PaginationResponse } from './PaginationResponse';
import { onSaveError } from './forms';

export type Tag = {
  id?: number;
  name: string;
  type?: number;
  typeText: string;
};

type Tags = {
  data: Tag[];
};

export type Tags = {
  languages: Tag[];
  ageRatings: Tag[];
  otherTags: Tag[];
};

export type TagsSelectOptions = {
  languages: SelectOption[];
  ageRatings: SelectOption[];
  otherTags: SelectOption[];
};

export type TagFormErrors = {
  name: string;
  type: string;
} & onSaveError;
