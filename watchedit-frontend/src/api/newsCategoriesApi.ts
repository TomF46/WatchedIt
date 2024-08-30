import {
  NewsCategoriesPaginationResponse,
  NewsCategory,
} from '../types/newsCategories';
import client from './client';

export function saveNewsCategory(
  category: NewsCategory,
): Promise<NewsCategory> {
  return category.id ? editNewsCategory(category) : addNewsCategory(category);
}

export function getNewsCategories(): Promise<NewsCategoriesPaginationResponse> {
  return client
    .get(`/api/newsCategories`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getNewsCategoryById(id: number): Promise<NewsCategory> {
  return client
    .get(`/api/newsCategories/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addNewsCategory(category: NewsCategory): Promise<NewsCategory> {
  return client
    .post(`/api/newsCategories`, category)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function editNewsCategory(
  category: NewsCategory,
): Promise<NewsCategory> {
  return client
    .put(`/api/newsCategories/${category.id}`, category)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function removeNewsCategory(category: NewsCategory): Promise<null> {
  return client
    .delete(`/api/newsCategories/${category.id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
