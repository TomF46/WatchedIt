import client from './client';

export function login(userLoginDetails) {
    return client
        .post("/api/authentication/authenticate", userLoginDetails)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        });
}

export function register(userRegistrationDetails) {
    return client
        .post("/api/authentication/register", userRegistrationDetails)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        });
}
