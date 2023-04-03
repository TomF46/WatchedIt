import client from './client';

export function saveFilm(film) {
    return film.id ? editFilm(film) : addFilm(film);
}

export function getFilmsPaginated(pageNumber, pageSize) {
    return client
        .get(`/api/films?PageNumber=${pageNumber}&PageSize=${pageSize}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}

export function searchFilmsPaginated(searchTerm, pageNumber, pageSize) {
    return client
        .get(`/api/films?SearchTerm=${searchTerm}&PageNumber=${pageNumber}&PageSize=${pageSize}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}

export function searchFilmsWithCategoryPaginated(searchTerm, category ,pageNumber, pageSize) {
    return client
        .get(`/api/films?SearchTerm=${searchTerm}&category=${category}&PageNumber=${pageNumber}&PageSize=${pageSize}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}


export function getFilmById(id) {
    return client
        .get(`/api/films/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}

export function addFilm(film){
    return client
        .post(`/api/films`, film)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}

export function editFilm(film){
    return client
        .put(`/api/films/${film.id}`, film)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}

export function removeFilm(film){
    return client
        .delete(`/api/films/${film.id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}