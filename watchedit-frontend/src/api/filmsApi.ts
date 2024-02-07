import client from "./client";

export function saveFilm(film) {
  return film.id ? editFilm(film) : addFilm(film);
}

export function searchFilmsPaginated(parameters, pageNumber, pageSize) {
  let target = `/api/films?PageNumber=${pageNumber}&PageSize=${pageSize}`;
  if (parameters.searchTerm)
    target = `${target}&searchTerm=${parameters.searchTerm}`;
  if (parameters.category) target = `${target}&category=${parameters.category}`;
  if (parameters.sort) target = `${target}&sort=${parameters.sort}`;
  if (parameters.releasedBeforeDate)
    target = `${target}&releasedBeforeDate=${parameters.releasedBeforeDate}`;
  if (parameters.releasedAfterDate)
    target = `${target}&releasedAfterDate=${parameters.releasedAfterDate}`;
  if (parameters.minRating)
    target = `${target}&minRating=${parameters.minRating}`;
  if (parameters.maxRating)
    target = `${target}&maxRating=${parameters.maxRating}`;

  return client
    .get(target)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getFilmById(id) {
  return client
    .get(`/api/films/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addFilm(film) {
  return client
    .post(`/api/films`, film)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function editFilm(film) {
  return client
    .put(`/api/films/${film.id}`, film)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function removeFilm(film) {
  return client
    .delete(`/api/films/${film.id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getSimilarFilmsPaginated(id, pageNumber, pageSize) {
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
