import client from "./client";

export function saveNewsArticle(article) {
  return article.id ? editNewsArticle(article) : addNewsArticle(article);
}

export function getNewsPaginated(pageNumber, pageSize) {
  return client
    .get(`/api/newsArticles?PageNumber=${pageNumber}&PageSize=${pageSize}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getNewsArticlesById(id) {
  return client
    .get(`/api/newsArticles/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function addNewsArticle(article) {
  return client
    .post(`/api/newsArticles`, article)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function editNewsArticle(article) {
  return client
    .put(`/api/newsArticles/${article.id}`, article)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}
