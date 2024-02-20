import { PaginationResponse } from "./PaginationResponse";
import { onSaveError } from "./forms";

export type LoginCredentials = {
  email: string;
  password: string;
  remember_me: boolean;
};

export type LoginErrors = {
  onSave: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  email: string;
  username: string;
  token: string;
  tokenExpiry: Date;
};

export type Registration = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  watchedFilmCount: number;
  imageUrl: string;
  biography: string;
  canPublish: boolean;
  reviewCount?: number;
};

export type EditableUser = {
  id?: number;
  username: string;
  email: string;
  imageUrl?: string;
  biography?: string;
};

export type UserFormErrors = {
  onSave?: string;
  biography: string;
  imageUrl: string;
};

type Users = {
  data: User[];
};

export type UsersPaginationResponse = Users & PaginationResponse;

export type RegistrationErrors = Registration & onSaveError;
