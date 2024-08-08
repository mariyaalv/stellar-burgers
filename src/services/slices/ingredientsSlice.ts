import { getIngredientsApi } from './../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  IngredientType,
  TIngredient,
  TResponseStatus
} from './../../utils/types';

export interface TIngredientsSlice extends TResponseStatus {
  ingredients: TIngredient[];
}

export const initialState: TIngredientsSlice = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk('ingredients/get', async () =>
  getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    selectBuns: (state) =>
      state.ingredients.filter(
        (ingredient) => ingredient.type === IngredientType.bun
      ),
    selectMains: (state) =>
      state.ingredients.filter(
        (ingredient) => ingredient.type === IngredientType.main
      ),
    selectSauces: (state) =>
      state.ingredients.filter(
        (ingredient) => ingredient.type === IngredientType.sauce
      ),
    selectIngredients: (state) => state.ingredients,
    selectisIngredientsLoading: (state) => state.isLoading
  }
});

export const {
  selectisIngredientsLoading,
  selectIngredients,
  selectBuns,
  selectMains,
  selectSauces
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
