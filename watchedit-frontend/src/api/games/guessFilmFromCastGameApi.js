import client from '../client';

export function getGuessFilmFromCastGames(pageNumber, pageSize) {
    return client
        .get(`/api/games/GuessFilmFromCastGame?PageNumber=${pageNumber}&PageSize=${pageSize}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        })
}

export function getGuessFilmFromCastGameById(id) {
    return client
        .get(`/api/games/GuessFilmFromCastGame/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        })
}

export function startGuessFilmFromCastGame(){
    return client.post(`/api/games/GuessFilmFromCastGame`,{})
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        })
}

export function makeGuessForGuessFilmFromCastGame(id, guess){
    return client.post(`/api/games/GuessFilmFromCastGame/${id}`, guess)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        })
}

export function forefeitGuessFilmFromCastGameById(id) {
    return client
        .delete(`/api/games/GuessFilmFromCastGame/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        })
}