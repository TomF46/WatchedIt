import { FilmImage, FilmImagePaginationResponse, Image } from '../types/Images';
import client from './client';

export function uploadImage(file: File, prefix: string): Promise<Image> {
  const data = new FormData();
  data.append('file', file);

  return client
    .post(`/api/files/upload?prefix=${prefix}`, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getFilmImages(
  filmId: number,
  pageNumber: number,
  pageSize: number,
): Promise<FilmImagePaginationResponse> {
  return client
    .get(
      `api/films/${filmId}/images?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addFilmImage(filmId: number, image: Image): Promise<FilmImage> {
  return client
    .post(`api/films/${filmId}/images`, image)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function removeFilmImage(
  filmId: number,
  imageId: number,
): Promise<FilmImage> {
  return client
    .delete(`api/films/${filmId}/images/${imageId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
