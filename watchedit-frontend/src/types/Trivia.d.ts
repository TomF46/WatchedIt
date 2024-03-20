import { User } from './Auth';
import { Film } from './Films';
import { PaginationResponse } from './PaginationResponse';

export type Trivia = {
  id?: number;
  text: string;
  user: User;
  film: Film;
};

export type EditableTrivia = {
  id?: number;
  text: string;
};

export type TriviaFormErrors = {
  text?: string;
  onSave?: string;
};

type Trivias = {
  data: Trivia[];
};
export type TriviaPaginationResponse = Trivias & PaginationResponse;
