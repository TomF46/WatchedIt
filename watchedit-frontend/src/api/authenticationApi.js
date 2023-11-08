import client from "./client";

export function login(userLoginDetails) {
  return client
    .post("/api/auth/login", userLoginDetails)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function register(userRegistrationDetails) {
  return client
    .post("/api/auth/register", userRegistrationDetails)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
