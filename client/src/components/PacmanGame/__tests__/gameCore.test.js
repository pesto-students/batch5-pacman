import {
  initSquareGridState,
  entityApplier,
} from '../gameCore';
import { entityToCode, codeToEntity } from '../constants';


describe('initSquareGridState', () => {
  const threeZeroGrid = [0, 0, 0];
  const threeByThreeGrid = [[...threeZeroGrid], [...threeZeroGrid], [...threeZeroGrid]];
  it('should generates 2d array with correct number of rows', () => {
    expect(initSquareGridState(3).length).toEqual(3);
  });
  it('should generates 2d array with correct number of cols', () => {
    expect(initSquareGridState(3).length).toEqual(3);
  });
  it('should generates the square grid', () => {
    expect(initSquareGridState(3)).toEqual(threeByThreeGrid);
  });
});

describe('codeToEntity', () => {
  it('should be free for code 0', () => {
    expect(codeToEntity('0')).toEqual('free');
  });
  it('should be food for code 1', () => {
    expect(codeToEntity('1')).toEqual('food');
  });
  it('should be energizer for code 2', () => {
    expect(codeToEntity('2')).toEqual('energizer');
  });
  it('should be ghost for code 3', () => {
    expect(codeToEntity('3')).toEqual('ghost');
  });
  it('should be wall for code 4', () => {
    expect(codeToEntity('4')).toEqual('wall');
  });
  it('should be pacman for code 5', () => {
    expect(codeToEntity('5')).toEqual('pacman');
  });
});

describe('entityToCode', () => {
  it('should be 0 for entity free', () => {
    expect(entityToCode('free')).toEqual(0);
  });
  it('should be 1 for entity food', () => {
    expect(entityToCode('food')).toEqual(1);
  });
  it('should be 2 entity energizer', () => {
    expect(entityToCode('energizer')).toEqual(2);
  });
  it('should be 3 for entity ghost', () => {
    expect(entityToCode('ghost')).toEqual(3);
  });
  it('should be 4 for entity wall', () => {
    expect(entityToCode('wall')).toEqual(4);
  });
  it('should be 5 for entity pacman', () => {
    expect(entityToCode('pacman')).toEqual(5);
  });
});

describe('entityApplier', () => {
  it('should should apply entityCode at correct location', () => {
    const grid = [
      [0, 0],
      [0, 0],
    ];
    const entityLocation = [[1, 1]];
    const finalGrid = [
      [0, 0],
      [0, 2],
    ];
    expect(entityApplier(grid, entityLocation, 2)).toEqual(finalGrid);
  });
});
