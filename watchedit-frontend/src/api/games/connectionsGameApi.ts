import {
  ConnectionsGame,
  ConnectionsGamesPaginationResponse,
} from "../../types/Games";
import client from "../client";

export function getConnectionsGames(
  pageNumber: number,
  pageSize: number,
): Promise<ConnectionsGamesPaginationResponse> {
  return client
    .get(
      `/api/games/ConnectionsGame?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getConnectionsGameById(id: number): Promise<ConnectionsGame> {
  return client
    .get(`/api/games/ConnectionsGame/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function startConnectionsGame(): Promise<ConnectionsGame> {
  return client
    .post(`/api/games/ConnectionsGame`, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function makeGuessForConnectionsGame(
  id: number,
  guess: { personId: number },
): Promise<ConnectionsGame> {
  return client
    .post(`/api/games/ConnectionsGame/${id}`, guess)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function forefeitConnectionsGameById(
  id: number,
): Promise<ConnectionsGame> {
  return client
    .delete(`/api/games/ConnectionsGame/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
