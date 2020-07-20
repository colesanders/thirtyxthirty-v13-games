import { Game } from '@thirty/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as GamesActions from './games.actions';

export const LESSONS_FEATURE_KEY = 'game';

export interface GamesState extends EntityState<Game> {
  selectedId?: string | number; // which Games record has been selected
  loaded: boolean; // has the Games list been loaded
  error?: string | null; // last known error (if any)
}

export interface GamesPartialState {
  readonly [LESSONS_FEATURE_KEY]: GamesState;
}

export const gameAdapter: EntityAdapter<Game> = createEntityAdapter();

export const initialGamesState: GamesState = gameAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const _gamesReducer = createReducer(
  initialGamesState,
  on(GamesActions.resetGames, state => gameAdapter.removeAll(state)),
  on(GamesActions.resetSelectedGame, state => Object.assign({}, state, { selectedId: null })),
  on(GamesActions.selectGame, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  // Load game
  on(
    GamesActions.loadGames,
    state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    GamesActions.loadGamesSuccess,
    (state, { games }) =>
    gameAdapter.setAll(games, { ...state, loaded: true })
  ),
  on(
    GamesActions.loadGamesFailure,
    (state, { error }) => ({
    ...state,
    error
  })),
  // Load game
  on(
    GamesActions.loadGame,
    state => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(
    GamesActions.loadGameSuccess,
    (state, { game }) =>
    gameAdapter.upsertOne(game, { ...state, loaded: true })
  ),
  on(
    GamesActions.loadGameFailure,
    (state, { error }) => ({
    ...state,
    error
  })),
  // Add game
  on(GamesActions.createGameSuccess, (state, { game }) =>
    gameAdapter.addOne(game, state)
  ),
  on(GamesActions.createGameFailure, (state, { error }) => ({
    ...state,
    error
  })),
  // Update game
  on(GamesActions.updateGameSuccess, (state, { game }) =>
    gameAdapter.updateOne({ id: game.id, changes: game }, state)
  ),
  on(GamesActions.updateGameFailure, (state, { error }) => ({
    ...state,
    error
  })),
  // Delete game
  on(GamesActions.deleteGameSuccess, (state, { game }) =>
    gameAdapter.removeOne(game.id, state)
  ),
  on(GamesActions.deleteGameFailure, (state, { error }) => ({
    ...state,
    error
  })),
);

export function gamesReducer(state: GamesState | undefined, action: Action) {
  return _gamesReducer(state, action);
}