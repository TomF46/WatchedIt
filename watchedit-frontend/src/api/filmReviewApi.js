import client from "./client";

export function saveReview(filmId, review) {
  return review.id ? updateReview(filmId, review) : addReview(filmId, review);
}

export function getReviewsByFilmId(filmId, pageNumber, pageSize) {
  return client
    .get(
      `/api/films/${filmId}/reviews?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getReviewById(filmId, reviewId) {
  return client
    .get(`/api/films/${filmId}/reviews/${reviewId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addReview(filmId, review) {
  return client
    .post(`/api/films/${filmId}/reviews`, review)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function updateReview(filmId, review) {
  return client
    .put(`/api/films/${filmId}/reviews/${review.id}`, review)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function removeReview(filmId, review) {
  return client
    .delete(`/api/films/${filmId}/reviews/${review.id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getReviewComments(reviewId, pageNumber, pageSize) {
  return client
    .get(
      `/api/reviews/${reviewId}/comments?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addReviewComment(reviewId, comment) {
  return client
    .post(`/api/reviews/${reviewId}/comments`, comment)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function updateReviewComment(reviewId, comment) {
  return client
    .put(`/api/reviews/${reviewId}/comments/${comment.id}`, comment)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function deleteReviewComment(reviewId, comment) {
  return client
    .delete(`/api/reviews/${reviewId}/comments/${comment.id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
