import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiDish, ApiDishes, Dish, FetchError, UpdateDishParams} from '../types';
import axiosAPI from '../axiosAPI';
import {isAxiosError} from 'axios';
import {AppDispatch} from '../app/store';
import {updateDishes} from './cartSlice';

export const fetchAll = createAsyncThunk<Dish[], void, {dispatch: AppDispatch}>(
  'dishes/fetchAll',
  async (_arg, thunkAPI) => {
    const {data: dishes} = await axiosAPI.get<ApiDishes | null>("/pizzas/dishes.json");

    let newDishes: Dish[] = [];

    if (dishes) {
      newDishes =  Object
        .keys(dishes)
        .map((id: string) => {
          return ({...dishes[id], id});
        });
      thunkAPI.dispatch(updateDishes(newDishes));
    }
    return newDishes;
  }
);

export const removeDish = createAsyncThunk<void, string>(
  'dishes/remove',
  async (id) => {
    await axiosAPI.delete('/pizzas/dishes/' + id + '.json');
  }
);

export const createDish = createAsyncThunk<void, ApiDish>(
  'dishes/create',
  async (dish) => {
    await axiosAPI.post("/pizzas/dishes.json", dish);
  }
);

export const fetchOneDish = createAsyncThunk<ApiDish, string, {rejectValue: FetchError}>(
  'dishes/fetchOne',
  async (dishId, thunkAPI) => {
    try {
      const {data: dish} = await axiosAPI.get<ApiDish | null>(`pizzas/dishes/${dishId}.json`);

      if (dish === null) {
        return thunkAPI.rejectWithValue({code: 'not_found'});
      }
      return dish;

    } catch (e) {
      if (isAxiosError(e) && !e.response) {
        return thunkAPI.rejectWithValue({code: 'internet_problem'});
      }

      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return thunkAPI.rejectWithValue({code: 'firebase_problem'});
      }

      throw e;
    }
  },
);

export const updateDish = createAsyncThunk<void, UpdateDishParams>(
  'dishes/update',
  async ({dishId, apiDish}) => {
    await axiosAPI.put(`/pizzas/dishes/${dishId}.json`, apiDish);
  },
);