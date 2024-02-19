import client from "./client";

type PersonIsLikedResponse = {
  liked: boolean;
};

export function like(id: number): Promise<PersonIsLikedResponse> {
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

export function removeLike(id: number): Promise<PersonIsLikedResponse> {
  return client
    .delete(`/api/users/me/likes/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
