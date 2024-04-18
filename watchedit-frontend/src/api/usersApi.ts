import {
  generateFilmSearchUrl,
  generatePersonSearchUrl,
} from '../tools/apiUrlCreator';
import { EditableUser, User, UsersPaginationResponse } from '../types/Auth';
import { FilmSearchParameters, FilmsPaginationResponse } from '../types/Films';
import {
  PeoplePaginationResponse,
  PersonSearchParameters,
} from '../types/People';
import { ReviewsPaginationResponse } from '../types/Reviews';
import client from './client';

export function getUsersPaginated(
  pageNumber: number,
  pageSize: number,
  sort: string,
): Promise<UsersPaginationResponse> {
  return client
    .get(
      `/api/users?PageNumber=${pageNumber}&PageSize=${pageSize}&Sort=${sort}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getUserById(id: number): Promise<User> {
  return client
    .get(`/api/users/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getWatchedListByUserId(
  id: number,
  parameters: FilmSearchParameters,
  pageNumber: number,
  pageSize: number,
): Promise<FilmsPaginationResponse> {
  const url = generateFilmSearchUrl(
    `/api/users/${id}/watched?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    parameters,
  );
  return client
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getLikedPeopleByUserId(
  id: number,
  parameters: PersonSearchParameters,
  pageNumber: number,
  pageSize: number,
): Promise<PeoplePaginationResponse> {
  const url = generatePersonSearchUrl(
    `/api/users/${id}/likes?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    parameters,
  );
  return client
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getCurrentUserIsAdmin(): Promise<{ isAdmin: boolean }> {
  return client
    .get(`/api/users/me/admin`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getCurrentUserIsPublisher(): Promise<{ canPublish: boolean }> {
  return client
    .get(`/api/users/me/canPublish`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function updateCurrentUser(user: EditableUser): Promise<User> {
  return client
    .put(`/api/users/me`, user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getUsersReviewsPaginated(
  id: number,
  pageNumber: number,
  pageSize: number,
  sort: string,
): Promise<ReviewsPaginationResponse> {
  return client
    .get(
      `/api/users/${id}/reviews?PageNumber=${pageNumber}&PageSize=${pageSize}&Sort=${sort}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function searchUsersReviewsPaginated(
  id: number,
  pageNumber: number,
  pageSize: number,
  sort: string,
): Promise<ReviewsPaginationResponse> {
  return client
    .get(
      `/api/users/${id}/reviews?PageNumber=${pageNumber}&PageSize=${pageSize}&Sort=${sort}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function setUserCanPublishByUserId(
  id: number,
  canPublish: boolean,
): Promise<{ canPublish: boolean }> {
  return client
    .post(`/api/users/${id}/canPublish`, { userCanPublish: canPublish })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
