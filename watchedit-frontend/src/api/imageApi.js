import client from './client';

export function uploadImage(file, prefix) {
    const data = new FormData();
    data.append('file', file);

    return client
        .post(`/api/files/upload?prefix=${prefix}`, data)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error;
        });
}