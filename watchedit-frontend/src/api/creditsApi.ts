import { Credit, EditableCredit } from "../types/Credits";
import { FilmCredit, FilmCredits } from "../types/Films";
import { PersonCredit, PersonCredits } from "../types/People";
import client from "./client";

export function getCreditById(id: number): Promise<Credit> {
  return client
    .get(`/api/credits/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getCreditsForFilmById(id: number): Promise<FilmCredits> {
  return client
    .get(`/api/films/${id}/credits`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getCreditsForPersonById(id: number): Promise<PersonCredits> {
  return client
    .get(`/api/people/${id}/credits`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addCreditForFilm(
  id: number,
  credit: EditableCredit,
): Promise<FilmCredit> {
  return client
    .post(`/api/films/${id}/credits`, credit)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addCreditForPerson(
  id: number,
  credit: EditableCredit,
): Promise<PersonCredit> {
  return client
    .post(`/api/people/${id}/credits`, credit)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function removeCredit(credit: Credit): Promise<void> {
  return client
    .delete(`/api/credits/${credit.id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function updateCredit(
  id: number,
  credit: EditableCredit,
): Promise<Credit> {
  return client
    .put(`/api/credits/${id}`, credit)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
