import {ApiOrders} from '../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchAllOrders, removeOrder} from './ordersThunks';
import {RootState} from '../app/store';

interface OrdersState {
  orderItems: ApiOrders[];
  fetchAllOrdersLoading: boolean;
  removeLoading: boolean | string;
}

const initialState: OrdersState = {
  orderItems: [],
  fetchAllOrdersLoading: false,
  removeLoading: false,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) =>  {
    builder.addCase(fetchAllOrders.pending, (state) => {
      state.fetchAllOrdersLoading = true;
    }).addCase(fetchAllOrders.fulfilled, (state, {payload: orders}) => {
      state.fetchAllOrdersLoading = false;
      state.orderItems = orders;
    }).addCase(fetchAllOrders.rejected, (state) => {
      state.fetchAllOrdersLoading = false;
    });
    builder.addCase(removeOrder.pending, (state, {meta: {arg: orderID}}) => {
      state.removeLoading = orderID;
    }).addCase(removeOrder.fulfilled, (state) => {
      state.removeLoading = false;
    }).addCase(removeOrder.rejected, (state) => {
      state.removeLoading = false;
    });
  }
});

export const ordersReducer = ordersSlice.reducer;
export const selectOrders = (state: RootState) => state.orders.orderItems;
export const selectFetchAllOrdersLoading = (state: RootState) => state.orders.fetchAllOrdersLoading;
export const selectRemoveOrderLoading = (state: RootState) => state.orders.removeLoading;
