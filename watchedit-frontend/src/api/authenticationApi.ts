import { LoginCredentials, LoginResponse, Registration } from "../types/Auth";
import client from "./client";

export function login(
  userLoginDetails: LoginCredentials,
): Promise<LoginResponse> {
  return client
    .post("/api/auth/login", userLoginDetails)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function register(userRegistrationDetails: Registration): Promise<null> {
  return client
    .post("/api/auth/register", userRegistrationDetails)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
