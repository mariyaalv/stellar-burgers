import { IngredientType } from './../../utils/types';
import { expect, it, describe } from '@jest/globals';
import burgerConstructorReducer, {
  initialState,
  TBurgerConstructorSlice,
  addToConstructor,
  removeFromConstructor,
  reorderConstructor,
  resetConstructor,
  selectBurgerConstructor,
  selectIngredientsConstructor,
  selectBunConstructor
} from './burgerConstructorSlice';

const burgerConstructor: TBurgerConstructorSlice = {
  bun: {
    _id: '643d69a5c3f7b9001cfa093c',
    id: '',
    name: 'Краторная булка N-200i',
    type: IngredientType.bun,
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa0945',
      id: '',
      name: 'Соус с шипами Антарианского плоскоходца',
      type: IngredientType.sauce,
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      id: '',
      name: 'Биокотлета из марсианской Магнолии',
      type: IngredientType.main,
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    }
  ]
};

describe('burgerConstructorSlice', () => {
  it('should return default state when passed an empty action', () => {
    const res = burgerConstructorReducer(undefined, { type: '' });

    expect(res).toEqual(initialState);
  });

  it('should add new ingredient in array of ingridients with "addToConstructor" action', () => {
    const sauce = {
      _id: '643d69a5c3f7b9001cfa0945',
      name: 'Соус с шипами Антарианского плоскоходца',
      type: IngredientType.sauce,
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
    };

    const newState = burgerConstructorReducer(
      initialState,
      addToConstructor(sauce)
    );

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual(expect.objectContaining(sauce));
  });

  it('should add bun with "addToConstructor" action', () => {
    const bun = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: IngredientType.bun,
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };

    const newState = burgerConstructorReducer(
      initialState,
      addToConstructor(bun)
    );

    expect(newState.bun).not.toBeNull;
    expect(newState.bun).toEqual(expect.objectContaining(bun));
  });

  it('should remove ingredient from array of ingridients with "removeFromConstructor" action', () => {
    expect(burgerConstructor.ingredients).toHaveLength(2);

    const newState = burgerConstructorReducer(
      burgerConstructor,
      removeFromConstructor(0)
    );

    expect(newState.ingredients).toHaveLength(1);
  });

  it('should reorder ingredients with "reorderConstructor" action', () => {
    const newState = burgerConstructorReducer(
      burgerConstructor,
      reorderConstructor({ from: 0, to: 1 })
    );

    expect(newState.ingredients).toEqual([
      burgerConstructor.ingredients[1],
      burgerConstructor.ingredients[0]
    ]);
  });

  it('should return default state when passed "resetConstructor" action', () => {
    expect(burgerConstructor.bun).not.toBeNull;
    expect(burgerConstructor.ingredients).toHaveLength(2);

    const newState = burgerConstructorReducer(
      burgerConstructor,
      resetConstructor()
    );

    expect(newState).toEqual(initialState);
  });
});

describe('burgerConstructorSelectors', () => {
  it('should select burger from state', () => {
    const res = selectBurgerConstructor({ burgerConstructor });
    expect(res).toEqual(burgerConstructor);
  });
  it('should select ingredients from state', () => {
    const res = selectIngredientsConstructor({ burgerConstructor });
    expect(res).toEqual(burgerConstructor.ingredients);
  });
  it('should select bun from state', () => {
    const res = selectBunConstructor({ burgerConstructor });
    expect(res).toEqual(burgerConstructor.bun);
  });
});
