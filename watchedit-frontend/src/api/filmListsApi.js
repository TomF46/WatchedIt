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
            throw error;
        });
}

export function getFilmListById(id) {
    return client
        .get(`/api/filmLists/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function addFilmList(filmList){
    return client
        .post('/api/filmLists', filmList)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        })
}

export function updateFilmList(filmList){
    return client
        .put(`/api/filmLists/${filmList.id}`, filmList)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        })
}

export function deleteFilmList(id){
    return client
        .delete(`/api/filmLists/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error;
        })
}

export function addFilmToFilmList(id, film){
    return client
        .post(`/api/filmLists/${id}/films`, film)
        .then(response => {
            response.data;
        })
        .catch(error => {
            throw error;
        })
}

export function removeFilmFromFilmList(id, film){
    return client
        .post(`/api/filmLists/${id}/films/remove`, film)
        .then(response => {
            response.data;
        })
        .catch(error => {
            throw error;
        })
}