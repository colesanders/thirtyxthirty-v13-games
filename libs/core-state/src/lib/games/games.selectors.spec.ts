import { GamessEntity } from './games.models';
import { State, gamessAdapter, initialState } from './games.reducer';
import * as GamessSelectors from './games.selectors';

describe('Gamess Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getGamessId = (it) => it['id'];
  const createGamessEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as GamessEntity);

  let state;

  beforeEach(() => {
    state = {
      gamess: gamessAdapter.addAll(
        [
          createGamessEntity('PRODUCT-AAA'),
          createGamessEntity('PRODUCT-BBB'),
          createGamessEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Gamess Selectors', () => {
    it('getAllGamess() should return the list of Gamess', () => {
      const results = GamessSelectors.getAllGamess(state);
      const selId = getGamessId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = GamessSelectors.getSelected(state);
      const selId = getGamessId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getGamessLoaded() should return the current 'loaded' status", () => {
      const result = GamessSelectors.getGamessLoaded(state);

      expect(result).toBe(true);
    });

    it("getGamessError() should return the current 'error' state", () => {
      const result = GamessSelectors.getGamessError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
