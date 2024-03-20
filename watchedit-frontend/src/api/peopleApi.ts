import {
  EditablePerson,
  PeoplePaginationResponse,
  PeopleSearchTerms,
  Person,
} from '../types/People';
import client from './client';

export function savePerson(person: EditablePerson): Promise<Person> {
  return person.id ? editPerson(person) : addPerson(person);
}

export function getPeoplePaginated(
  pageNumber: number,
  pageSize: number,
  sort: string,
): Promise<PeoplePaginationResponse> {
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

export function searchPeoplePaginated(
  searchTerms: PeopleSearchTerms,
  pageNumber: number,
  pageSize: number,
  sort: string,
): Promise<PeoplePaginationResponse> {
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

export function getPersonById(id: number): Promise<Person> {
  return client
    .get(`/api/people/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addPerson(person: EditablePerson): Promise<Person> {
  return client
    .post(`/api/people`, person)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function editPerson(person: EditablePerson): Promise<Person> {
  return client
    .put(`/api/people/${person.id}`, person)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function removePerson(person: Person): Promise<void> {
  return client
    .delete(`/api/people/${person.id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
