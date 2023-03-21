import client from './client';

export function getPeoplePaginated(pageNumber, pageSize) {
    return client
        .get(`/api/people?PageNumber=${pageNumber}&PageSize=${pageSize}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function getPersonById(id) {
    return client
        .get(`/api/people/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

