import { SelectOption } from '../components/Inputs/InputTypes';
import { EditableFilm, FilmForRequest } from '../types/Films';

export function mapSelectsForRequest(
  filmForRequest: FilmForRequest,
  film: EditableFilm,
): FilmForRequest {
  filmForRequest.categories = film.categories.map(
    (category: SelectOption) => category.id,
  );
  filmForRequest.languages = film.languages.map((tag: SelectOption) => tag.id);
  filmForRequest.ageRatings = film.ageRatings.map(
    (tag: SelectOption) => tag.id,
  );
  filmForRequest.otherTags = film.otherTags.map((tag: SelectOption) => tag.id);
  return filmForRequest;
}
