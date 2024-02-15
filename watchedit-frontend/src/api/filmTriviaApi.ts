import {
  EditableTrivia,
  Trivia,
  TriviaPaginationResponse,
} from "../types/Trivia";
import client from "./client";

export function saveFilmTrivia(filmId: number, filmTrivia: EditableTrivia) {
  return filmTrivia.id
    ? updateFilmTrivia(filmId, filmTrivia)
    : addFilmTrivia(filmId, filmTrivia);
}

export function getFilmTriviasByFilmId(
  filmId: number,
  pageNumber: number,
  pageSize: number,
): Promise<TriviaPaginationResponse> {
  return client
    .get(
      `/api/films/${filmId}/trivia?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getFilmTriviaById(
  filmId: number,
  triviaId: number,
): Promise<Trivia> {
  return client
    .get(`/api/films/${filmId}/trivia/${triviaId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addFilmTrivia(
  filmId: number,
  filmTrivia: EditableTrivia,
): Promise<Trivia> {
  return client
    .post(`/api/films/${filmId}/trivia`, filmTrivia)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function updateFilmTrivia(
  filmId: number,
  filmTrivia: EditableTrivia,
): Promise<Trivia> {
  return client
    .put(`/api/films/${filmId}/trivia/${filmTrivia.id}`, filmTrivia)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function deleteFilmTrivia(
  filmId: number,
  filmTrivia: Trivia,
): Promise<void> {
  return client
    .delete(`/api/films/${filmId}/trivia/${filmTrivia.id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
