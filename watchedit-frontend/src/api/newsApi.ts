import {
  EditableNewsArticle,
  NewsArticle,
  NewsArticleSearchParameters,
  NewsArticlesPaginationResponse,
} from "../types/News";
import client from "./client";

export function saveNewsArticle(
  article: EditableNewsArticle,
  publish: boolean,
): Promise<NewsArticle> {
  return article.id
    ? editNewsArticle(article, publish)
    : addNewsArticle(article, publish);
}

export function getNewsPaginated(
  pageNumber: number,
  pageSize: number,
): Promise<NewsArticlesPaginationResponse> {
  return client
    .get(`/api/newsArticles?PageNumber=${pageNumber}&PageSize=${pageSize}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function searchNewsPaginated(
  searchTerms: NewsArticleSearchParameters,
  pageNumber: number,
  pageSize: number,
  sort: string,
): Promise<NewsArticlesPaginationResponse> {
  return client
    .get(
      `/api/newsArticles?title=${searchTerms.title}&publisher=${searchTerms.publisher}&PageNumber=${pageNumber}&PageSize=${pageSize}&Sort=${sort}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getNewsArticlesById(id: number): Promise<NewsArticle> {
  return client
    .get(`/api/newsArticles/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addNewsArticle(
  article: EditableNewsArticle,
  publish: boolean,
): Promise<NewsArticle> {
  article.published = publish;
  return client
    .post(`/api/newsArticles`, article)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function editNewsArticle(
  article: EditableNewsArticle,
  publish: boolean,
): Promise<NewsArticle> {
  article.published = publish;
  return client
    .put(`/api/newsArticles/${article.id}`, article)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function setNewsArticlePublishedStatusById(
  id: number,
  publish: boolean,
): Promise<NewsArticle> {
  return client
    .post(`/api/newsArticles/${id}/published`, { publish: publish })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getNewsByUserPaginated(
  id: number,
  pageNumber: number,
  pageSize: number,
): Promise<NewsArticlesPaginationResponse> {
  return client
    .get(
      `/api/users/${id}/newsArticles?PageNumber=${pageNumber}&PageSize=${pageSize}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
