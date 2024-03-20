import { SelectOption } from '../components/Inputs/InputTypes';
import { Category } from './Categories';
import { PaginationResponse } from './PaginationResponse';
import { Person } from './People';

export type Film = {
  id?: number;
  name: string;
  shortDescription: string;
  fullDescription: string;
  runtime: number;
  releaseDate: Date;
  posterUrl: string;
  averageRating: string;
  trailerUrl?: string;
  credits: FilmCredits;
  categories: Category[];
  watchedByCount: int;
  isWatchedByUser: boolean;
};

export type EditableFilm = {
  id?: number;
  name: string;
  shortDescription: string;
  fullDescription: string;
  runtime: number;
  releaseDate: Date;
  posterUrl?: string;
  trailerUrl?: string;
  categories: SelectOption[];
};

export type FilmForRequest = {
  id?: number;
  name: string;
  shortDescription: string;
  fullDescription: string;
  runtime: number;
  releaseDate: Date;
  posterUrl?: string;
  trailerUrl?: string;
  categories: int[];
};

export type FilmCredits = {
  cast: FilmCredit[];
  crew: FilmCredit[];
};

export type FilmCredit = {
  id?: number;
  person: Person;
  role: string;
  type: string;
};

type Films = {
  data: Film[];
};

export type FilmsPaginationResponse = Films & PaginationResponse;

export type FilmSearchParameters = {
  searchTerm?: string;
  category?: number;
  sort?: string;
  maxRating?: number;
  minRating?: number;
  releasedBeforeDate?: string;
  releasedAfterDate?: string;
};

export type FilmFormErrors = EditableFilm & onSaveError;
