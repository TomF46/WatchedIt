import client from "./client";

export function saveNewsArticle(article, publish) {
  return article.id
    ? editNewsArticle(article, publish)
    : addNewsArticle(article, publish);
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

export function addNewsArticle(article, publish) {
  article.publish = publish;
  return client
    .post(`/api/newsArticles`, article)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function editNewsArticle(article, publish) {
  article.publish = publish;
  return client
    .put(`/api/newsArticles/${article.id}`, article)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function setNewsArticlePublishedStatusById(id, publish) {
  return client
    .post(`/api/newsArticles/${id}/published`, { publish: publish })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response;
    });
}

export function getNewsByUserPaginated(id, pageNumber, pageSize) {
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
