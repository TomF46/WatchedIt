import { EditableFilm } from "../types/Films";

export const newFilm = {
  name: "",
  shortDescription: "",
  fullDescription: "",
  runtime: 0,
  releaseDate: new Date(),
  posterUrl: undefined,
  trailerUrl: undefined,
  categories: [],
} as EditableFilm;

export const newPerson = {
  firstName: "",
  lastName: "",
  middleNames: "",
  stageName: "",
  dateOfBirth: new Date(),
  description: "",
  imageUrl: null,
};

export const newList = {
  name: "",
  description: "",
};

export const newReview = {
  rating: undefined,
  text: "",
};

export const newCategory = {
  name: "",
};

export const newComment = {
  text: "",
};

export const newTrivia = {
  text: "",
};

export const newArticle = {
  title: "",
  content: "",
  thumbnailUrl: null,
  publish: false,
};
