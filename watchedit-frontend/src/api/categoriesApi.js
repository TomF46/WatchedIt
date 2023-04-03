import client from './client';

export function saveCategory(category) {
    return category.id ? editCategory(category) : addCategory(category);
}

export function getCategories() {
    return client
        .get(`/api/categories`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}


export function getCategoryById(id) {
    return client
        .get(`/api/categories/${id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}

export function addCategory(category){
    return client
        .post(`/api/categories`, category)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}

export function editCategory(category){
    return client
        .put(`/api/categories/${category.id}`, category)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}

export function removeCategory(category){
    return client
        .delete(`/api/categories/${category.id}`)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error.response;
        });
}