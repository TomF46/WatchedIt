import client from './client';

export function savePerson(person) {
    return person.id ? editPerson(person) : addPerson(person);
}

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

export function searchPeoplePaginated(searchTerm, pageNumber, pageSize) {
    return client
        .get(`/api/people?SearchTerm=${searchTerm}&PageNumber=${pageNumber}&PageSize=${pageSize}`)
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

export function addPerson(person){
    return client
        .post(`/api/people`, person)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function editPerson(person){
    return client
        .put(`/api/people/${person.id}`, person)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

export function removePerson(person){
    return client
        .delete(`/api/people/${person.id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}

