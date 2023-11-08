import client from "./client";

export function like(id) {
  return client
    .post(`/api/users/me/likes`, {
      personId: id,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function removeLike(id) {
  return client
    .delete(`/api/users/me/likes/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
