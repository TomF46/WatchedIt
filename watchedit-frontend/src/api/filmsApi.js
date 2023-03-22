import client from './client';

export function getFilmsPaginated(pageNumber, pageSize) {
    return client
        .get(`/api/films?PageNumber=${pageNumber}&PageSize=${pageSize}`)
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

export function getUserHasWatchedFilm(id){
    return client
        .get(`/api/films/${id}/watched`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function getCurrentUserHasWatchedFilmById(id){
    return client
        .get(`/api/films/watched/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function setWatchedFilmById(id){
    return client
        .post(`/api/films/watched`, {
            filmId: id
        })
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function setNotWatchedFilmById(id){
    return client
        .post(`/api/films/watched/delete`, {
            filmId: id
        })
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}