import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromGames from './games/games.reducer';
import { GamesEffects } from './games/games.effects';
import { GamesFacade } from './games/games.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromGames.LESSONS_FEATURE_KEY,
      fromGames.gamesReducer
    ),
    EffectsModule.forFeature([GamesEffects]),
  ],
  providers: [GamesFacade],
})
export class CoreStateModule {}
