import client from './client';

export function getUserById(id) {
    return client
        .get(`/api/users/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function getWatchedListByUserId(id, pageNumber, pageSize) {
    return client
        .get(`/api/users/${id}/watched?PageNumber=${pageNumber}&PageSize=${pageSize}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

