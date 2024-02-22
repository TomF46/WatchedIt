import { User } from "./Auth";
import { Film } from "./Films";
import { PaginationResponse } from "./PaginationResponse";

export type Review = {
  id?: number;
  rating: number;
  text: string;
  user: User;
  film: Film;
};

export type EditableReview = {
  id?: number;
  rating?: number;
  text: string;
};

export type ReviewFormErrors = {
  rating?: string;
  text?: string;
  onSave?: string;
};

type Reviews = {
  data: Review[];
};
export type ReviewsPaginationResponse = Reviews & PaginationResponse;

export type Comment = {
  id?: number;
  text: string;
  createdDate: string;
  updatedDate: string;
  user: user;
};

export type EditableComment = {
  id?: number;
  text?: string;
};

export type CommentFormErrors = {
  text?: string;
  onSubmit?: string;
};

type Comments = {
  data: Comment[];
};
export type CommentsPaginationResponse = Comments & PaginationResponse;
