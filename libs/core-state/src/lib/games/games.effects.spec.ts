import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { GamesEffects } from './games.effects';
import * as GamessActions from './games.actions';

describe('GamessEffects', () => {
  let actions: Observable<any>;
  let effects: GamesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        GamesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(GamesEffects);
  });

  describe('loadGamess$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: GamessActions.loadGames() });

      const expected = hot('-a-|', {
        a: GamessActions.loadGamesSuccess({ gamess: [] }),
      });

      expect(effects.loadGamess$).toBeObservable(expected);
    });
  });
});
