import { generateFilmSearchUrl } from '../tools/apiUrlCreator';
import {
  Film,
  FilmForRequest,
  FilmFormErrors,
  FilmSearchParameters,
  FilmsPaginationResponse,
} from '../types/Films';
import client from './client';

export function saveFilm(film: FilmFormErrors): Promise<Film> {
  return film.id ? editFilm(film) : addFilm(film);
}

export function searchFilmsPaginated(
  parameters: FilmSearchParameters,
  pageNumber: number,
  pageSize: number,
): Promise<FilmsPaginationResponse> {
  const url = generateFilmSearchUrl(
    `/api/films?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    parameters,
  );

  return client
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getFilmById(id: number): Promise<Film> {
  return client
    .get(`/api/films/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addFilm(film: FilmForRequest): Promise<Film> {
  return client
    .post(`/api/films`, film)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function editFilm(film: FilmForRequest): Promise<Film> {
  return client
    .put(`/api/films/${film.id}`, film)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function removeFilm(film: Film): Promise<void> {
  return client
    .delete(`/api/films/${film.id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getSimilarFilmsPaginated(
  id: number,
  pageNumber: number,
  pageSize: number,
): Promise<FilmsPaginationResponse> {
  return client
    .get(
      `/api/films/${id}/similar?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
