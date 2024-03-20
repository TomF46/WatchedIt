import { Film } from '../types/Films';
import { EditableList, List, ListsPaginationResponse } from '../types/Lists';
import client from './client';

export function saveFilmList(filmList: EditableList): Promise<List> {
  return filmList.id ? updateFilmList(filmList) : addFilmList(filmList);
}

export function getFilmListsPaginated(
  pageNumber: number,
  pageSize: number,
): Promise<ListsPaginationResponse> {
  return client
    .get(`/api/filmLists?PageNumber=${pageNumber}&PageSize=${pageSize}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function searchFilmListsPaginated(
  searchTerm: string,
  username: string,
  pageNumber: number,
  pageSize: number,
): Promise<ListsPaginationResponse> {
  return client
    .get(
      `/api/filmLists?SearchTerm=${searchTerm}&Username=${username}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getFilmListById(id: number): Promise<List> {
  return client
    .get(`/api/filmLists/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addFilmList(filmList: EditableList): Promise<List> {
  return client
    .post('/api/filmLists', filmList)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function updateFilmList(filmList: EditableList): Promise<List> {
  return client
    .put(`/api/filmLists/${filmList.id}`, filmList)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function deleteFilmList(id: number) {
  return client
    .delete(`/api/filmLists/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addFilmToFilmList(id: number, film: Film): Promise<void> {
  return client
    .post(`/api/filmLists/${id}/films`, { filmId: film.id })
    .then((response) => {
      response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function removeFilmFromFilmList(id: number, film: Film): Promise<void> {
  return client
    .post(`/api/filmLists/${id}/films/remove`, { filmId: film.id })
    .then((response) => {
      response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getUsersFilmListsPaginated(
  id: number,
  pageNumber: number,
  pageSize: number,
): Promise<ListsPaginationResponse> {
  return client
    .get(
      `/api/users/${id}/filmLists?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
