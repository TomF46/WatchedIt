import { User } from "./AuthDefinitions";
import { Film } from "./Films";
import { PaginationResponse } from "./PaginationResponse";
import { onSaveError } from "./forms";

export type Review = {
  id?: number;
  rating: number;
  text: string;
  user: User; //todo
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

type Comments = {
  data: Comment[];
};
export type CommentsPaginationResponse = Comments & PaginationResponse;
