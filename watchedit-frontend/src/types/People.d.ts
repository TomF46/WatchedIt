import { Film } from './Films';

export type Person = {
  id?: number;
  firstName: string;
  lastName: string;
  middleNames?: string;
  stageName?: string;
  fullName: string;
  dateOfBirth: Date;
  description: string;
  imageUrl: string;
  credits: PersonCredits;
  isLikedByUser: boolean;
  likedByCount: number;
  creditCount: number;
};

export type EditablePerson = {
  id?: number;
  firstName: string;
  lastName: string;
  middleNames?: string;
  stageName?: string;
  dateOfBirth: Date;
  description: string;
  imageUrl?: string;
};

export type PersonCredits = {
  cast: PersonCredit[];
  crew: PersonCredit[];
};

export type PersonCredit = {
  id?: number;
  film: Film;
  role: string;
  type: string;
};

export type PersonSearchParameters = {
  firstName?: string;
  lastName?: string;
  stageName?: string;
  sort?: string;
};

type People = {
  data: Person[];
};

export type PeoplePaginationResponse = People & PaginationResponse;

export type PersonFormErrors = {
  onSave?: string;
  firstName?: string;
  lastName?: string;
  middleNames?: string;
  stageName?: string;
  dateOfBirth?: string;
  description?: string;
  imageUrl?: string;
};
