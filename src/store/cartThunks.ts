import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiOrder} from '../types';
import axiosAPI from '../axiosAPI';

export const createOrder = createAsyncThunk<void, ApiOrder>(
  'cart/order',
  async (apiOrder) => {
    await axiosAPI.post('/pizzas/orders.json', apiOrder);
  },
);