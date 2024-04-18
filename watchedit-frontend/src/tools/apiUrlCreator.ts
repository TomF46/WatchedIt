import { FilmSearchParameters } from '../types/Films';

export function generateFilmSearchUrl(
  target: string,
  parameters: FilmSearchParameters,
): string {
  if (parameters.searchTerm)
    target = `${target}&searchTerm=${parameters.searchTerm}`;
  if (parameters.category) target = `${target}&category=${parameters.category}`;
  if (parameters.sort) target = `${target}&sort=${parameters.sort}`;
  if (parameters.releasedBeforeDate)
    target = `${target}&releasedBeforeDate=${parameters.releasedBeforeDate}`;
  if (parameters.releasedAfterDate)
    target = `${target}&releasedAfterDate=${parameters.releasedAfterDate}`;
  if (parameters.releasedOnDate)
    target = `${target}&releasedOnDate=${parameters.releasedOnDate}`;
  if (parameters.minRating)
    target = `${target}&minRating=${parameters.minRating}`;
  if (parameters.maxRating)
    target = `${target}&maxRating=${parameters.maxRating}`;
  return target;
}
