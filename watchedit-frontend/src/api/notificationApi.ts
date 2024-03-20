import {
  Notification,
  NotificationsPaginationResponse,
} from '../types/Notifications';
import client from './client';

export function getUnreadNotificationCount(): Promise<{ count: number }> {
  return client
    .get('/api/users/me/notifications/unread/count')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getUnreadNotifications(
  pageNumber: number,
  pageSize: number,
): Promise<NotificationsPaginationResponse> {
  return client
    .get(
      `/api/users/me/notifications/unread?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getAllNotifications(
  pageNumber: number,
  pageSize: number,
): Promise<NotificationsPaginationResponse> {
  return client
    .get(
      `/api/users/me/notifications?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function readNotification(
  notificationId: number,
): Promise<Notification> {
  return client
    .put(`/api/users/me/notifications/${notificationId}/read`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
