import { IngredientType } from './../../utils/types';
import { TIngredientsResponse } from './../../utils/burger-api';
import { expect, it, describe } from '@jest/globals';
import ingredientsReducer, {
  initialState,
  TIngredientsSlice,
  fetchIngredients,
  selectisIngredientsLoading,
  selectIngredients,
  selectBuns,
  selectMains,
  selectSauces
} from '../../services/slices/ingredientsSlice';

describe('ingredientsSlice', () => {
  it('should return default state when passed an empty action', () => {
    const res = ingredientsReducer(undefined, { type: '' });

    expect(res).toEqual(initialState);
  });

  it('should change status with "fetchIngredients.pending" action', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.pending('pending')
    );

    expect(state.isLoading).toBeTruthy();
    expect(state.error).toBeNull();
  });

  it('should fetch feed with "fetchIngredients.fulfilled" action', () => {
    const expectedResult: TIngredientsResponse = {
      success: true,
      data: [
        {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: IngredientType.bun,
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        },
        {
          _id: '643d69a5c3f7b9001cfa0945',
          name: 'Соус с шипами Антарианского плоскоходца',
          type: IngredientType.sauce,
          proteins: 101,
          fat: 99,
          carbohydrates: 100,
          calories: 100,
          price: 88,
          image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-01-large.png'
        },
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: IngredientType.main,
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
        }
      ]
    };

    const state = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(expectedResult.data, 'fulfilled')
    );

    expect(state.isLoading).not.toBeTruthy();
    expect(state.ingredients).toEqual(expectedResult.data);
  });

  it('should change status with "fetchIngredients.rejected" action', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(null, 'rejected')
    );

    expect(state.isLoading).not.toBeTruthy();
    expect(state.error).not.toBeNull();
  });
});

describe('ingredientsSelectors', () => {
  const expectedResult: TIngredientsSlice = {
    ingredients: [
      {
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
      },
      {
        _id: '643d69a5c3f7b9001cfa0945',
        name: 'Соус с шипами Антарианского плоскоходца',
        type: IngredientType.sauce,
        proteins: 101,
        fat: 99,
        carbohydrates: 100,
        calories: 100,
        price: 88,
        image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: IngredientType.main,
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      }
    ],
    isLoading: false,
    error: null
  };

  it('should select status of loading from state', () => {
    const res = selectisIngredientsLoading({ ingredients: expectedResult });
    expect(res).toEqual(expectedResult.isLoading);
  });

  it('should select ingredients from state', () => {
    const res = selectIngredients({ ingredients: expectedResult });
    expect(res).toEqual(expectedResult.ingredients);
  });

  it('should select buns from state', () => {
    const res = selectBuns({ ingredients: expectedResult });
    expect(res).toEqual(
      expectedResult.ingredients.filter(
        (ingredient) => ingredient.type === IngredientType.bun
      )
    );
  });

  it('should select mains from state', () => {
    const res = selectMains({ ingredients: expectedResult });
    expect(res).toEqual(
      expectedResult.ingredients.filter(
        (ingredient) => ingredient.type === IngredientType.main
      )
    );
  });

  it('should select sauces from state', () => {
    const res = selectSauces({ ingredients: expectedResult });
    expect(res).toEqual(
      expectedResult.ingredients.filter(
        (ingredient) => ingredient.type === IngredientType.sauce
      )
    );
  });
});
