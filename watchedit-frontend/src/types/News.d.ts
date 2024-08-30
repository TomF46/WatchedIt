import { SelectOption } from '../components/Inputs/InputTypes';
import { User } from './Auth';
import { NewsCategory } from './newsCategories';
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
  readCount: number;
  categories: NewsCategory[];
};

type NewsArticles = {
  data: NewsArticle[];
};

export type NewsArticlesPaginationResponse = NewsArticles & PaginationResponse;

export type NewsArticleSearchParameters = {
  title?: string;
  publisher?: string;
  sort?: string;
  category?: number | undefined;
};

export type EditableNewsArticle = {
  id?: number;
  title: string;
  content: string;
  thumbnailUrl?: string;
  published: boolean;
  createdDate?: Date;
  updatedDate?: Date;
  readCount: number;
  categories: SelectOption[];
};

export type NewsArticleForRequest = {
  id?: number;
  author: User;
  authorName: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdDate: Date;
  updatedDate: Date;
  published: boolean;
  readCount: number;
  categories: int[];
};

export type NewsArticleFormErrors = {
  onSave?: string;
  title?: string;
  content?: string;
  thumbnailUrl?: string;
  categories: string;
};

export type SaveNewsArticleRequest = {
  article: EditableNewsArticle;
  publish: boolean;
};
