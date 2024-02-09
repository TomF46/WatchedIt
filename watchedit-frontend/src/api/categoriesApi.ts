import { CategoriesPaginationResponse, Category } from "../types/Categories";
import client from "./client";

export function saveCategory(category: Category): Promise<Category> {
  return category.id ? editCategory(category) : addCategory(category);
}

export function getCategories(): Promise<CategoriesPaginationResponse> {
  return client
    .get(`/api/categories`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getCategoryById(id: string): Promise<Category> {
  return client
    .get(`/api/categories/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addCategory(category: Category): Promise<Category> {
  return client
    .post(`/api/categories`, category)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function editCategory(category: Category): Promise<Category> {
  return client
    .put(`/api/categories/${category.id}`, category)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function removeCategory(category: Category): Promise<null> {
  return client
    .delete(`/api/categories/${category.id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
