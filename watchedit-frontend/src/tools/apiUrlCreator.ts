import { FilmSearchParameters } from '../types/Films';
import { NewsArticleSearchParameters } from '../types/News';
import { PersonSearchParameters } from '../types/People';

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

export function generatePersonSearchUrl(
  target: string,
  parameters: PersonSearchParameters,
): string {
  if (parameters.firstName)
    target = `${target}&firstName=${parameters.firstName}`;
  if (parameters.lastName) target = `${target}&lastName=${parameters.lastName}`;
  if (parameters.stageName)
    target = `${target}&stageName=${parameters.stageName}`;
  if (parameters.sort) target = `${target}&sort=${parameters.sort}`;
  return target;
}

export function generateNewsArticleSearchUrl(
  target: string,
  parameters: NewsArticleSearchParameters,
): string {
  if (parameters.title) target = `${target}&title=${parameters.title}`;
  if (parameters.publisher)
    target = `${target}&publisher=${parameters.publisher}`;
  if (parameters.sort) target = `${target}&sort=${parameters.sort}`;
  return target;
}
