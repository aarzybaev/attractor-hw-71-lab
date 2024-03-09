import {ApiOrders} from '../types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosAPI from '../axiosAPI';

export const fetchAllOrders = createAsyncThunk<ApiOrders[], void>(
  'orders/fetchAll',
  async () => {
    const {data: orders} = await axiosAPI.get<ApiOrders | null>("/pizzas/orders.json");
    if (orders) {
      return Object.keys(orders).map(id => ({[id]: orders[id]}));
    } else {
      return [];
    }
  }
);

export const removeOrder = createAsyncThunk<void, string>(
  'orders/remove',
  async (id) => {
    await axiosAPI.delete('/pizzas/orders/' + id + '.json');
  }
);