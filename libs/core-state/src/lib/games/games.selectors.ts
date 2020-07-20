import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  LESSONS_FEATURE_KEY,
  GamesState,
  GamesPartialState,
  gameAdapter
} from './games.reducer';

// Lookup the 'Games' feature state managed by NgRx
export const getGamesState = createFeatureSelector<
  GamesPartialState,
  GamesState
>(LESSONS_FEATURE_KEY);

const { selectAll, selectEntities } = gameAdapter.getSelectors();

export const getGamesLoaded = createSelector(
  getGamesState,
  (state: GamesState) => state.loaded
);

export const getGamesError = createSelector(
  getGamesState,
  (state: GamesState) => state.error
);

export const getAllGames = createSelector(
  getGamesState,
  (state: GamesState) => selectAll(state)
);

export const getGamesEntities = createSelector(
  getGamesState,
  (state: GamesState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getGamesState,
  (state: GamesState) => state.selectedId
);

export const getSelectedGame = createSelector(
  getGamesEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);