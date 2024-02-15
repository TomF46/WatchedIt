import {
  Comment,
  CommentsPaginationResponse,
  EditableComment,
  EditableReview,
  Review,
  ReviewsPaginationResponse,
} from "../types/Reviews";
import client from "./client";

export function saveReview(
  filmId: number,
  review: EditableReview,
): Promise<Review> {
  //todo
  return review.id ? updateReview(filmId, review) : addReview(filmId, review);
}

export function getReviewsByFilmId(
  filmId: number,
  pageNumber: number,
  pageSize: number,
): Promise<ReviewsPaginationResponse> {
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

export function getReviewById(
  filmId: number,
  reviewId: number,
): Promise<Review> {
  return client
    .get(`/api/films/${filmId}/reviews/${reviewId}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addReview(
  filmId: number,
  review: EditableReview,
): Promise<Review> {
  return client
    .post(`/api/films/${filmId}/reviews`, review)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function updateReview(
  filmId: number,
  review: EditableReview,
): Promise<Review> {
  return client
    .put(`/api/films/${filmId}/reviews/${review.id}`, review)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function removeReview(filmId: number, review: Review): Promise<void> {
  return client
    .delete(`/api/films/${filmId}/reviews/${review.id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getReviewComments(
  reviewId: number,
  pageNumber: number,
  pageSize: number,
): Promise<CommentsPaginationResponse> {
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

export function addReviewComment(
  reviewId: number,
  comment: EditableComment,
): Promise<Comment> {
  return client
    .post(`/api/reviews/${reviewId}/comments`, comment)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function updateReviewComment(
  reviewId: number,
  comment: Comment,
): Promise<Comment> {
  return client
    .put(`/api/reviews/${reviewId}/comments/${comment.id}`, comment)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function deleteReviewComment(
  reviewId: number,
  comment: Comment,
): Promise<void> {
  return client
    .delete(`/api/reviews/${reviewId}/comments/${comment.id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
