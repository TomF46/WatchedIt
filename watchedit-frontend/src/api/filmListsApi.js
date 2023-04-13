import client from './client';

export function saveFilmList(filmList) {
    return filmList.id ? updateFilmList(filmList) : addFilmList(filmList);
}

export function getFilmListsPaginated(pageNumber, pageSize) {
    return client
        .get(`/api/filmLists?PageNumber=${pageNumber}&PageSize=${pageSize}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}

export function searchFilmListsPaginated(searchTerm, username, pageNumber, pageSize) {
    return client
        .get(`/api/filmLists?SearchTerm=${searchTerm}&Username=${username}&PageNumber=${pageNumber}&PageSize=${pageSize}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}

export function getFilmListById(id) {
    return client
        .get(`/api/filmLists/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}

export function addFilmList(filmList){
    return client
        .post('/api/filmLists', filmList)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        })
}

export function updateFilmList(filmList){
    return client
        .put(`/api/filmLists/${filmList.id}`, filmList)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        })
}

export function deleteFilmList(id){
    return client
        .delete(`/api/filmLists/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        })
}

export function addFilmToFilmList(id, film){
    return client
        .post(`/api/filmLists/${id}/films`, {filmId: film.id})
        .then(response => {
            response.data;
        })
        .catch(error => {
            throw error.response;
        })
}

export function removeFilmFromFilmList(id, film){
    return client
        .post(`/api/filmLists/${id}/films/remove`, {filmId: film.id})
        .then(response => {
            response.data;
        })
        .catch(error => {
            throw error.response;
        })
}

export function getUsersFilmListsPaginated(id, pageNumber, pageSize) {
    return client
        .get(`/api/users/${id}/filmLists?PageNumber=${pageNumber}&PageSize=${pageSize}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}