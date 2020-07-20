import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { select, Store, Action, ActionsSubject } from '@ngrx/store';

import { Game } from '@thirty/api-interfaces';

import * as GamesActions from './games.actions';
import * as fromGames from './games.reducer';
import * as GamesSelectors from './games.selectors';

@Injectable({
  providedIn: 'root'
})
export class GamesFacade {
  loaded$ = this.store.pipe(select(GamesSelectors.getGamesLoaded));
  allGames$ = this.store.pipe(select(GamesSelectors.getAllGames));
  selectedGame$ = this.store.pipe(select(GamesSelectors.getSelectedGame));

  mutations$ = this.actions$.pipe(
    filter((action: Action) =>
    action.type === GamesActions.createGame({} as any).type ||
    action.type === GamesActions.updateGame({} as any).type ||
    action.type === GamesActions.deleteGame({} as any).type
    )
  );

  constructor(private store: Store, private actions$: ActionsSubject) { }

  selectGame(selectedId: string) {
    this.dispatch(GamesActions.selectGame({ selectedId }));
  }

  resetSelectedGame(){
    this.dispatch(GamesActions.resetSelectedGame());
  }

  loadGames() {
    this.dispatch(GamesActions.loadGames());
  }

  loadGame(gameId: string) {
    this.dispatch(GamesActions.loadGame({ gameId }));
  }

  createGame(game: Game) {
    this.dispatch(GamesActions.createGame({ game }));
  }

  updateGame(game: Game) {
    this.dispatch(GamesActions.updateGame({ game }));
  }

  deleteGame(game: Game) {
    this.dispatch(GamesActions.deleteGame({ game }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
