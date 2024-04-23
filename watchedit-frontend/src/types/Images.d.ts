import { PaginationResponse } from './PaginationResponse';

export type Image = {
  url?: string;
};

export type FilmImage = {
  id?: number;
} & Image;

type FilmImages = {
  data: FilmImage[];
};

export type FilmImagePaginationResponse = FilmImages & PaginationResponse;
