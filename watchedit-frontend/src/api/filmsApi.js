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

