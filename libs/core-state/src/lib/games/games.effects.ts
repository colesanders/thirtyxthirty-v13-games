import { Injectable } from '@angular/core';
import { GamesService } from '@thirty/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';
import * as GamesActions from './games.actions';
import { Game } from '@thirty/api-interfaces';

@Injectable()
export class GamesEffects {
  @Effect() loadGames$ = this.actions$.pipe(
    ofType(GamesActions.loadGames),
    fetch({
      run: (action) => this.gamesService.all().pipe(
        map((games: Game[]) => GamesActions.loadGamesSuccess({ games }))
      ),
      onError: (action, error) => GamesActions.loadGamesFailure({ error })
    })
  );

  @Effect() loadGame$ = this.actions$.pipe(
    ofType(GamesActions.loadGame),
    fetch({
      run: (action) => this.gamesService.byId(action.gameId).pipe(
        map((game: Game) => GamesActions.loadGameSuccess({ game }))
      ),
      onError: (action, error) => GamesActions.loadGameFailure({ error })
    })
  );

  @Effect() createGame$ = this.actions$.pipe(
    ofType(GamesActions.createGame),
    pessimisticUpdate({
      run: (action) => this.gamesService.create(action.game).pipe(
        map((game: Game) => GamesActions.createGameSuccess({ game }))
      ),
      onError: (action, error) => GamesActions.createGameFailure({ error })
    })
  );

  @Effect() updateGame$ = this.actions$.pipe(
    ofType(GamesActions.updateGame),
    pessimisticUpdate({
      run: (action) => this.gamesService.update(action.game).pipe(
        map((game: Game) => 
          GamesActions.updateGameSuccess({ game }))
      ),
      onError: (action, error) => GamesActions.updateGameFailure({ error })
    })
  );

  @Effect() deleteGame$ = this.actions$.pipe(
    ofType(GamesActions.deleteGame),
    pessimisticUpdate({
      run: (action) => this.gamesService.delete(action.game.id).pipe(
        map((game: Game) => GamesActions.deleteGameSuccess({ game })),
      ),
      onError: (action, error) => GamesActions.deleteGameFailure({ error })
    })
  );

  // Effect to refresh the game after an async operation changes the database
  // Made in order to reduce risk of timing errors between async and sync operations
  // @Effect() refreshOnSucces = this.actions$.pipe(
  //   ofType(GamesActions.deleteGameSuccess, GamesActions.updateGameSuccess),
  //   tap(action => {
  //     GamesActions.loadGames();
  //   })
  // );

  constructor(
    private actions$: Actions,
    private gamesService: GamesService
  ) {}
}