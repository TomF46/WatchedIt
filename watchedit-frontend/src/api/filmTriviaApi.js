import client from './client';

export function saveFilmTrivia(filmId, filmTrivia) {
    return filmTrivia.id ? updateFilmTrivia(filmId, filmTrivia) : addFilmTrivia(filmId, filmTrivia);
}

export function getFilmTriviasByFilmId(filmId, pageNumber, pageSize) {
    return client
        .get(`/api/films/${filmId}/trivia?PageNumber=${pageNumber}&PageSize=${pageSize}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        })
}

export function getFilmTriviaById(filmId, triviaId) {
    return client
        .get(`/api/films/${filmId}/trivia/${triviaId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        })
}

export function addFilmTrivia(filmId, filmTrivia){
    return client
        .post(`/api/films/${filmId}/trivia`, filmTrivia)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        })
}

export function updateFilmTrivia(filmId, filmTrivia){
    return client
        .put(`/api/films/${filmId}/trivia/${filmTrivia.id}`, filmTrivia)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        })
}

export function deleteFilmTrivia(filmId, filmTrivia){
    return client
        .delete(`/api/films/${filmId}/trivia/${filmTrivia.id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        })
}
