import { User } from './Auth';
import { PaginationResponse } from './PaginationResponse';

export type NewsArticle = {
  id?: number;
  author: User;
  authorName: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdDate: Date;
  updatedDate: Date;
  published: boolean;
};

type NewsArticles = {
  data: NewsArticle[];
};

export type NewsArticlesPaginationResponse = NewsArticles & PaginationResponse;

export type NewsArticleSearchParameters = {
  title?: string;
  publisher?: string;
};

export type EditableNewsArticle = {
  id?: number;
  title: string;
  content: string;
  thumbnailUrl?: string;
  published: boolean;
  createdDate?: Date;
  updatedDate?: Date;
};

export type NewsArticleFormErrors = {
  onSave?: string;
  title?: string;
  content?: string;
  thumbnailUrl?: string;
};

export type SaveNewsArticleRequest = {
  article: EditableNewsArticle;
  publish: boolean;
};
