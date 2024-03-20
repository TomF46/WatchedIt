import {
  GuessFilmFromCastGame,
  GuessFilmFromCastGamesPaginationResponse,
} from '../../types/Games';
import client from '../client';

export function getGuessFilmFromCastGames(
  pageNumber: number,
  pageSize: number,
): Promise<GuessFilmFromCastGamesPaginationResponse> {
  return client
    .get(
      `/api/games/GuessFilmFromCastGame?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getGuessFilmFromCastGameById(
  id: number,
): Promise<GuessFilmFromCastGame> {
  return client
    .get(`/api/games/GuessFilmFromCastGame/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function startGuessFilmFromCastGame(): Promise<GuessFilmFromCastGame> {
  return client
    .post(`/api/games/GuessFilmFromCastGame`, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function makeGuessForGuessFilmFromCastGame(
  id: number,
  guess: { filmId: number },
): Promise<GuessFilmFromCastGame> {
  return client
    .post(`/api/games/GuessFilmFromCastGame/${id}`, guess)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function forefeitGuessFilmFromCastGameById(
  id: number,
): Promise<GuessFilmFromCastGame> {
  return client
    .delete(`/api/games/GuessFilmFromCastGame/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
