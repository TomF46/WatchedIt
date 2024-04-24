import { ImagePaginationResponse, Image } from '../types/Images';
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
): Promise<ImagePaginationResponse> {
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

export function addFilmImage(filmId: number, image: Image): Promise<Image> {
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
): Promise<Image> {
  return client
    .delete(`api/films/${filmId}/images/${imageId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getPersonImages(
  personId: number,
  pageNumber: number,
  pageSize: number,
): Promise<ImagePaginationResponse> {
  return client
    .get(
      `api/people/${personId}/images?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addPersonImage(personId: number, image: Image): Promise<Image> {
  return client
    .post(`api/people/${personId}/images`, image)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function removePersonImage(
  personId: number,
  imageId: number,
): Promise<Image> {
  return client
    .delete(`api/people/${personId}/images/${imageId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
