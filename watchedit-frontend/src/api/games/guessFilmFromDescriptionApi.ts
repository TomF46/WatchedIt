import {
  GuessFilmFromDescriptionGame,
  GuessFilmFromDescriptionGamesLeaderboardPaginationResponse,
  GuessFilmFromDescriptionGamesPaginationResponse,
} from '../../types/Games';
import client from '../client';

export function getGuessFilmFromDescriptionGames(
  pageNumber: number,
  pageSize: number,
): Promise<GuessFilmFromDescriptionGamesPaginationResponse> {
  return client
    .get(
      `/api/games/GuessFilmFromDescriptionGame?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getGuessFilmFromDescriptionGameById(
  id: number,
): Promise<GuessFilmFromDescriptionGame> {
  return client
    .get(`/api/games/GuessFilmFromDescriptionGame/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function startGuessFilmFromDescriptionGame(): Promise<GuessFilmFromDescriptionGame> {
  return client
    .post(`/api/games/GuessFilmFromDescriptionGame`, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function makeGuessForGuessFilmFromDescriptionGame(
  id: number,
  guess: { roundId: number; filmId: number },
): Promise<GuessFilmFromDescriptionGame> {
  return client
    .post(`/api/games/GuessFilmFromDescriptionGame/${id}`, guess)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function forefeitGuessFilmFromDescriptionGameById(
  id: number,
): Promise<GuessFilmFromDescriptionGame> {
  return client
    .delete(`/api/games/GuessFilmFromDescriptionGame/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getGuessFilmFromDescriptionLeaderboard(
  pageNumber: number,
  pageSize: number,
): Promise<GuessFilmFromDescriptionGamesLeaderboardPaginationResponse> {
  return client
    .get(
      `/api/games/GuessFilmFromDescriptionGame/leaderboard?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
