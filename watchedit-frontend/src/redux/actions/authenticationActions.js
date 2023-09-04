import * as types from "./actionTypes";
import { saveTokens, removeTokens, attatchBearerToken } from "../../tools/localStorage";
import * as authenticationApi from "../../api/authenticationApi";

const userLoginSuccess = (tokens) => {
    return { type: types.USER_LOGIN_SUCCESS, tokens };
}

const userLogoutSuccess = () => {
    return { type: types.USER_LOGOUT_SUCCESS };
}

export const login = (userLoginDetails) => {
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

export const logout = () => {
    return function (dispatch) {
        removeTokens();
        dispatch(userLogoutSuccess());
    };
}
