import { Game } from '@thirty/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedGame = createAction('[Games] Reset Selected Game');
export const resetGames = createAction('[Games] Reset Games');

// Select Game
export const selectGame = createAction(
  '[Games] Select Game',
  props<{ selectedId: string }>()
);

// Load Games
export const loadGames = createAction('[Games] Load Games');

export const loadGamesSuccess = createAction(
  '[Games] Load Games Success',
  props<{ games: Game[] }>()
);

export const loadGamesFailure = createAction(
  '[Games] Load Games Failure',
  props<{ error: any }>()
);

// Load Game
export const loadGame = createAction(
  '[Games] Load Game',
  props<{ gameId: string }>()
);

export const loadGameSuccess = createAction(
  '[Games] Load Game Success',
  props<{ game: Game }>()
);

export const loadGameFailure = createAction(
  '[Games] Load Game Failure',
  props<{ error: any }>()
);

// Create Game
export const createGame = createAction(
  '[Games] Create Game',
  props<{ game: Game }>()
);

export const createGameSuccess = createAction(
  '[Games] Create Game Success',
  props<{ game: Game }>()
);

export const createGameFailure = createAction(
  '[Games] Create Game Failure',
  props<{ error: any }>()
);

// Update Game
export const updateGame = createAction(
  '[Games] Update Game',
  props<{ game: Game }>()
);

export const updateGameSuccess = createAction(
  '[Games] Update Game Success',
  props<{ game: Game }>()
);

export const updateGameFailure = createAction(
  '[Games] Update Game Failure',
  props<{ error: any }>()
);

// Delete Game
export const deleteGame = createAction(
  '[Games] Delete Game',
  props<{ game: Game }>()
);

export const deleteGameCancelled = createAction(
  '[Games] Delete Game Cancelled'
);

export const deleteGameSuccess = createAction(
  '[Games] Delete Game Success',
  props<{ game: Game }>()
);

export const deleteGameFailure = createAction(
  '[Games] Delete Game Failure',
  props<{ error: any }>()
);