import { rootReducer } from './rootReducer';
import state from './store';
import { expect, it, describe } from '@jest/globals';

describe('rootReducer', () => {
  const res = rootReducer(undefined, { type: '' });

  it('should return default state when passed an empty action', () => {
    expect(res).toEqual(state.getState());
  });

  it('should contain all keys', () => {
    expect(res).toHaveProperty('user');
    expect(res).toHaveProperty('ingredients');
    expect(res).toHaveProperty('burgerConstructor');
    expect(res).toHaveProperty('feed');
    expect(res).toHaveProperty('order');
    expect(res).toHaveProperty('userOrders');
  });
});
