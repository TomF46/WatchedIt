import { Category } from "./Categories";
import { PaginationResponse } from "./PaginationResponse";

export type Film = {
  id?: number;
  name: string;
  shortDescription: string;
  fullDescription: string;
  runtime: number;
  releaseDate: Date;
  posterUrl: string;
  averageRating: string;
  trailerUrl: string;
  credits: FilmCredits;
  categories: Category[];
  watchedByCount: int;
  isWatchedByUser: boolean;
};

export type FilmCredits = {
  cast: FilmCredit[];
  crew: FilmCredit[];
};

export type FilmCredit = {
  id?: number;
  person: any; //todo
  film: Film;
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
  releasedBeforeDate?: Date;
  releasedAfterDate?: Date;
};
