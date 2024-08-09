import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import {
  IngredientType,
  TConstructorIngredient,
  TIngredient
} from './../../utils/types';

export interface TBurgerConstructorSlice {
  bun: TConstructorIngredient | TIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: TBurgerConstructorSlice = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addToConstructor: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === IngredientType.bun) {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeFromConstructor: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    reorderConstructor: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const ingredients = [...state.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.ingredients = ingredients;
    },
    resetConstructor: () => initialState
  },
  selectors: {
    selectBurgerConstructor: (state) => state,
    selectIngredientsConstructor: (state) => state.ingredients,
    selectBunConstructor: (state) => state.bun
  }
});

export const {
  selectBurgerConstructor,
  selectIngredientsConstructor,
  selectBunConstructor
} = burgerConstructorSlice.selectors;

export const {
  addToConstructor,
  removeFromConstructor,
  reorderConstructor,
  resetConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
