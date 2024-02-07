import client from "../client";

export function getConnectionsGames(pageNumber, pageSize) {
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

export function getConnectionsGameById(id) {
  return client
    .get(`/api/games/ConnectionsGame/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function startConnectionsGame() {
  return client
    .post(`/api/games/ConnectionsGame`, {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function makeGuessForConnectionsGame(id, guess) {
  return client
    .post(`/api/games/ConnectionsGame/${id}`, guess)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function forefeitConnectionsGameById(id) {
  return client
    .delete(`/api/games/ConnectionsGame/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
