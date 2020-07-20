import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { GamesEntity } from './games.models';
import { GamesEffects } from './games.effects';
import { GamesFacade } from './games.facade';

import * as GamessSelectors from './games.selectors';
import * as GamessActions from './games.actions';
import {
  GAMESS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './games.reducer';

interface TestSchema {
  gamess: State;
}

describe('GamessFacade', () => {
  let facade: GamesFacade;
  let store: Store<TestSchema>;
  const createGamessEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as GamesEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(GAMESS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([GamesEffects]),
        ],
        providers: [GamesFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(GamesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allGamess$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(GamessActions.loadGames());

        list = await readFirst(facade.allGamess$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadGamessSuccess` to manually update list
     */
    it('allGamess$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allGamess$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          GamessActions.loadGamesSuccess({
            gamess: [createGamessEntity('AAA'), createGamessEntity('BBB')],
          })
        );

        list = await readFirst(facade.allGamess$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
