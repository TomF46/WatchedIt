import { EditableFilm } from '../types/Films';

export const newFilm = {
  name: '',
  shortDescription: '',
  fullDescription: '',
  runtime: 0,
  releaseDate: new Date(),
  posterUrl: undefined,
  trailerUrl: undefined,
  categories: [],
  languages: [],
  ageRatings: [],
  otherTags: [],
} as EditableFilm;

export const newPerson = {
  firstName: '',
  lastName: '',
  middleNames: '',
  stageName: '',
  dateOfBirth: new Date(),
  description: '',
  imageUrl: undefined,
};

export const newList = {
  name: '',
  description: '',
};

export const newReview = {
  rating: undefined,
  text: '',
};

export const newCategory = {
  name: '',
};

export const newComment = {
  text: '',
};

export const newTrivia = {
  text: '',
};

export const newArticle = {
  title: '',
  content: '',
  thumbnailUrl: undefined,
  published: false,
};

export const newTag = {
  name: '',
  type: 1,
};
