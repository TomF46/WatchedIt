import { getUnreadNotificationCount } from "../../api/notificationApi";
import * as types from "./actionTypes";

const loadNotificationCountSuccess = (notificationCount) => {
    return { type: types.LOAD_NOTIFICATION_COUNT_SUCCESS, notificationCount };
}

const notificationCountDecrement = () => {
    return { type: types.NOTIFICATION_COUNT_DECREMENT };
}

export const loadNotificationCount = () => {
    return function (dispatch) {
        return getUnreadNotificationCount().then(res => {
            dispatch(loadNotificationCountSuccess(res.count));
        }).catch(err => {
            throw err;
        });
    };
}

export const decrementNotificationCount = () => {
    return function (dispatch) {
        dispatch(notificationCountDecrement());
    };
}