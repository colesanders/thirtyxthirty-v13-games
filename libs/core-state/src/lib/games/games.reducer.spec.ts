import { GamessEntity } from './games.models';
import * as GamessActions from './games.actions';
import { State, initialState, reducer } from './games.reducer';

describe('Gamess Reducer', () => {
  const createGamessEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as GamessEntity);

  beforeEach(() => {});

  describe('valid Gamess actions', () => {
    it('loadGamessSuccess should return set the list of known Gamess', () => {
      const gamess = [
        createGamessEntity('PRODUCT-AAA'),
        createGamessEntity('PRODUCT-zzz'),
      ];
      const action = GamessActions.loadGamessSuccess({ gamess });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
