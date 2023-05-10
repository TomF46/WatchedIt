import client from './client';

export function getUnreadNotificationCount() {
    return client
        .get("/api/users/me/notifications/unread/count")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        });
}

export function getUnreadNotifications(pageNumber, pageSize) {
    return client
        .get(`/api/users/me/notifications/unread?PageNumber=${pageNumber}&PageSize=${pageSize}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        });
}

export function getAllNotifications(pageNumber, pageSize) {
    return client
        .get(`/api/users/me/notifications?PageNumber=${pageNumber}&PageSize=${pageSize}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        });
}

export function readNotification(notificationId){
    return client
        .put(`/api/users/me/notifications/${notificationId}/read`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        });
}

