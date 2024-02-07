import client from "./client";

export function savePerson(person) {
  return person.id ? editPerson(person) : addPerson(person);
}

export function getPeoplePaginated(pageNumber, pageSize, sort) {
  return client
    .get(
      `/api/people?PageNumber=${pageNumber}&PageSize=${pageSize}&Sort=${sort}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function searchPeoplePaginated(searchTerms, pageNumber, pageSize, sort) {
  return client
    .get(
      `/api/people?firstName=${searchTerms.firstName}&lastName=${searchTerms.lastName}&stageName=${searchTerms.stageName}&PageNumber=${pageNumber}&PageSize=${pageSize}&Sort=${sort}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getPersonById(id) {
  return client
    .get(`/api/people/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addPerson(person) {
  return client
    .post(`/api/people`, person)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function editPerson(person) {
  return client
    .put(`/api/people/${person.id}`, person)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function removePerson(person) {
  return client
    .delete(`/api/people/${person.id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
