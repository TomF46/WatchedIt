import { getCurrentUserIsAdmin } from "../../api/usersApi";
import * as types from "./actionTypes";
export function checkUserIsAdminSuccess(isAdmin) {
    return { type: types.CHECK_USER_IS_ADMIN_SUCCESS, isAdmin };
}


export function checkUserIsAdmin() {
    return function (dispatch) {
        return getCurrentUserIsAdmin().then(data => {
            dispatch(checkUserIsAdminSuccess(data.isAdmin));
        }).catch(err => {
            dispatch(checkUserIsAdminSuccess(false));
            throw err;
        });
    }
}
