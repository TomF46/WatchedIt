import client from './client';


export function setFilmWatchedById(id){
    return client
        .post(`/api/users/me/watchedFilms`, {
            filmId: id
        })
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}

export function setFilmNotWatchedById(id){
    return client
        .delete(`/api/users/me/watchedFilms/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}