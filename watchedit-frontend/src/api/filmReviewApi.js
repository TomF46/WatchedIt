import client from './client';

export function saveReview(filmId, review) {
    return review.id ? updateReview(filmId, review) : addReview(filmId, review);
}

export function getReviewsByFilmId(filmId) {
    return client
        .get(`/api/films/${filmId}/reviews`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        })
}

export function getReviewById(filmId, reviewId) {
    return client
        .get(`/api/films/${filmId}/reviews/${reviewId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        })
}

export function addReview(filmId, review){
    return client
        .post(`/api/films/${filmId}/reviews`, review)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        })
}

export function updateReview(filmId, review){
    return client
        .put(`/api/films/${filmId}/reviews/${review.id}`, review)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        })
}

export function deleteReview(filmId, review){
    return client
        .delete(`/api/films/${filmId}/reviews/${review.id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        })
}

