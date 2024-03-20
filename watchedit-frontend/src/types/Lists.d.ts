import { User } from './Auth';
import { Film } from './Films';

export type List = {
  id?: number;
  name: string;
  description: string;
  createdBy: User;
  films: Film[];
  filmCount: number;
  thumbnails: string[];
};

type Lists = {
  data: List[];
};

export type ListsPaginationResponse = Lists & PaginationResponse;

export type EditableList = {
  id?: number;
  name: string;
  description: string;
};

export type ListFormErrors = {
  onSave?: string;
  name?: string;
  description?: string;
};
