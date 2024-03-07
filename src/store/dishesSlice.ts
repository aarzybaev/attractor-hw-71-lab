import {ApiDish, Dish, FetchError} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {createDish, fetchAll, fetchOneDish, removeDish, updateDish} from './dishesThunks';
import {RootState} from '../app/store';

interface DishesState {
  dishItems: Dish[];
  oneDish: ApiDish | null;
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean | string;
  fetchOneLoading: boolean;
  fetchOneError: FetchError | null;
  updateLoading: boolean;
}

const initialState: DishesState = {
  dishItems: [],
  oneDish: null,
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
  fetchOneLoading: false,
  fetchOneError: null,
  updateLoading: false,
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) =>  {
    builder.addCase(fetchAll.pending, (state) => {
      state.fetchLoading = true;
    }).addCase(fetchAll.fulfilled, (state, {payload: dishes}) => {
      state.fetchLoading = false;
      state.dishItems = dishes;
      state.oneDish = null;
    }).addCase(fetchAll.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createDish.pending, (state) => {
      state.createLoading = true;
    }).addCase(createDish.fulfilled, (state) => {
      state.createLoading = false;
    }).addCase(createDish.rejected, (state) => {
      state.createLoading = false;
    });

    builder.addCase(fetchOneDish.pending, (state) => {
      state.fetchOneError = null;
      state.fetchOneLoading = true;
    }).addCase(fetchOneDish.fulfilled, (state, {payload: oneDish}) => {
      state.oneDish = oneDish;
      state.fetchOneLoading = false;
    }).addCase(fetchOneDish.rejected, (state, {payload: error}) => {
      state.fetchOneLoading = false;
      state.fetchOneError = error || null;
    });

    builder.addCase(removeDish.pending, (state, {meta: {arg: dishId}}) => {
      state.deleteLoading = dishId;
    }).addCase(removeDish.fulfilled, (state) => {
      state.deleteLoading = false;
    }).addCase(removeDish.rejected, (state) => {
      state.deleteLoading = false;
    });

    builder.addCase(updateDish.pending, (state) => {
      state.updateLoading = true;
    }).addCase(updateDish.fulfilled, (state) => {
      state.updateLoading = false;
    }).addCase(updateDish.rejected, (state) => {
      state.updateLoading = false;
    });
  }
});

export const dishesReducer = dishesSlice.reducer;
export const selectDishes = (state: RootState) => state.dishes.dishItems;
export const selectOneDish = (state: RootState) => state.dishes.oneDish;

export const selectFetchLoading = (state: RootState) => state.dishes.fetchLoading;
export const selectCreateLoading = (state: RootState) => state.dishes.createLoading;
export const selectDeleteLoading = (state: RootState) => state.dishes.deleteLoading;
export const selectFetchOneDishLoading = (state: RootState) => state.dishes.fetchOneLoading;
export const selectFetchOneDishError = (state: RootState) => state.dishes.fetchOneError;
export const selectUpdateDishLoading = (state: RootState) => state.dishes.updateLoading;
