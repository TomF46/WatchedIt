import client from "./client";

type FilmIsWatchedResponse = {
  watched: boolean;
};

export function setFilmWatchedById(id: number): Promise<FilmIsWatchedResponse> {
  return client
    .post(`/api/users/me/watchedFilms`, {
      filmId: id,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function setFilmNotWatchedById(
  id: number,
): Promise<FilmIsWatchedResponse> {
  return client
    .delete(`/api/users/me/watchedFilms/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
