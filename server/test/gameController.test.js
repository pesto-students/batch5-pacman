import { entityToCode, codeToEntity } from '../api/game/constants';

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
