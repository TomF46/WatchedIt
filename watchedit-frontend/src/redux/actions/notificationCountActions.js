import { getUnreadNotificationCount } from "../../api/notificationApi";
import * as types from "./actionTypes";

export function loadNotificationCountSuccess(notificationCount) {
    return { type: types.LOAD_NOTIFICATION_COUNT_SUCCESS, notificationCount };
}

export function notificationCountDecrement() {
    return { type: types.NOTIFICATION_COUNT_DECREMENT };
}

export function loadNotificationCount() {
    return function (dispatch) {
        return getUnreadNotificationCount().then(res => {
            dispatch(loadNotificationCountSuccess(res.count));
        }).catch(err => {
            throw err;
        });
    };
}

export function decrementNotificationCount() {
    return function (dispatch) {
        dispatch(notificationCountDecrement());
    };
}