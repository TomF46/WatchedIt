import { User, UsersPaginationResponse } from "../types/AuthDefinitions";
import { FilmsPaginationResponse } from "../types/Films";
import client from "./client";

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
  pageNumber: number,
  pageSize: number,
): Promise<FilmsPaginationResponse> {
  return client
    .get(
      `/api/users/${id}/watched?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getLikedPeopleByUserId(id, pageNumber, pageSize) {
  return client
    .get(`/api/users/${id}/likes?PageNumber=${pageNumber}&PageSize=${pageSize}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getCurrentUserIsAdmin() {
  return client
    .get(`/api/users/me/admin`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getCurrentUserIsPublisher() {
  return client
    .get(`/api/users/me/canPublish`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function updateCurrentUser(user) {
  return client
    .put(`/api/users/me`, user)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getUsersReviewsPaginated(id, pageNumber, pageSize) {
  return client
    .get(
      `/api/users/${id}/reviews?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function searchUsersReviewsPaginated(id, pageNumber, pageSize, sort) {
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

export function setUserCanPublishByUserId(id, canPublish) {
  return client
    .post(`/api/users/${id}/canPublish`, { userCanPublish: canPublish })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
