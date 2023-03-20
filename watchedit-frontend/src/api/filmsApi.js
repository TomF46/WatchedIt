import client from './client';

export function getAllFilms() {
    return client
        .get(`/api/films`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function getFilmById(id) {
    return client
        .get(`/api/films/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

