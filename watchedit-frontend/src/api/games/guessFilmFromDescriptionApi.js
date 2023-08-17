import client from '../client';

export function getGuessFilmFromDescriptionGames(pageNumber, pageSize) {
    return client
        .get(`/api/games/GuessFilmFromDescriptionGame?PageNumber=${pageNumber}&PageSize=${pageSize}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        })
}

export function getGuessFilmFromDescriptionGameById(id) {
    return client
        .get(`/api/games/GuessFilmFromDescriptionGame/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        })
}

export function startGuessFilmFromDescriptionGame(){
    return client.post(`/api/games/GuessFilmFromDescriptionGame`,{})
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        })
}

export function makeGuessForGuessFilmFromDescriptionGame(id, guess){
    return client.post(`/api/games/GuessFilmFromDescriptionGame/${id}`, guess)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        })
}

export function forefeitGuessFilmFromDescriptionGameById(id) {
    return client
        .delete(`/api/games/GuessFilmFromDescriptionGame/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response;
        })
}