import * as types from "./actionTypes";
import { saveTokens, removeTokens, attatchBearerToken } from "../../tools/localStorage";
import * as authenticationApi from "../../api/authenticationApi";

export function userLoginSuccess(tokens) {
    return { type: types.USER_LOGIN_SUCCESS, tokens };
}

export function userLogoutSuccess() {
    return { type: types.USER_LOGOUT_SUCCESS };
}

export function login(userLoginDetails) {
    return function (dispatch) {
        return authenticationApi
            .login(userLoginDetails)
            .then(tokens => {
                saveTokens(tokens);
                attatchBearerToken(tokens.token);
                dispatch(userLoginSuccess(tokens));
            })
            .catch(err => {
                throw err;
            });
    };
}

export function logout() {
    return function (dispatch) {
        removeTokens();
        dispatch(userLogoutSuccess());
    };
}
