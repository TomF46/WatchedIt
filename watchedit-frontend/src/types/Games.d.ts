import Person from '../pages/people/Person';
import { Credit } from './Credits';
import { Film } from './Films';
import { Person } from './People';

export type ConnectionsGame = {
  id: number;
  person: Person;
  clues: Credit[];
  status: number;
  statusText: number;
  createdDate: Date;
  updatedDate: Date;
  score?: number;
};

type ConnectionsGames = {
  data: ConnectionsGame[];
};

export type ConnectionsGamesPaginationResponse = ConnectionsGames &
  PaginationResponse;

export type GuessFilmFromCastGame = {
  id: number;
  film: Film;
  clues: Person[];
  status: number;
  statusText: number;
  createdDate: Date;
  updatedDate: Date;
  score?: number;
};

type GuessFilmFromCastGames = {
  data: GuessFilmFromCastGame[];
};

export type GuessFilmFromCastGamesPaginationResponse = GuessFilmFromCastGames &
  PaginationResponse;

export type GuessFilmFromDescriptionGame = {
  id: number;
  rounds: GuessFilmFromDescriptionGameRound[];
  status: number;
  statusText: number;
  createdDate: Date;
  updatedDate: Date;
  score?: number;
};

export type GuessFilmFromDescriptionGameRound = {
  id: number;
  clue: { name?: string; description: string };
  status: number;
  statusText: number;
};

type GuessFilmFromDescriptionGames = {
  data: GuessFilmFromDescriptionGame[];
};

export type GuessFilmFromDescriptionGamesPaginationResponse =
  GuessFilmFromDescriptionGames & PaginationResponse;

export type GuessFilmFromDescriptionGameLeaderboardEntry = {
  id: number;
  score: number;
  user: User;
  updatedDate: Date;
};

type GuessFilmFromDescriptionGameLeaderboardEntries = {
  data: GuessFilmFromDescriptionGameLeaderboardEntry[];
};

export type GuessFilmFromDescriptionGamesLeaderboardPaginationResponse =
  GuessFilmFromDescriptionGameLeaderboardEntries & PaginationResponse;
