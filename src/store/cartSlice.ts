import {CartDish, Dish} from '../types';
import {RootState} from '../app/store';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createOrder} from './cartThunks';

interface CartState {
  cartDishes: CartDish[];
  cartTotalPrice: number;
  orderLoading: boolean;
}

const initialState: CartState = {
  cartDishes: [],
  cartTotalPrice: 0,
  orderLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDish: (state, {payload: dish}: PayloadAction<Dish>) => {
      const index = state.cartDishes.findIndex(cartDish => cartDish.dish.id === dish.id);

      if (index !== -1) {
        state.cartDishes[index].amount++;
      } else {
        state.cartDishes.push({
          dish,
          amount: 1,
        });
      }

      state.cartTotalPrice = state.cartDishes
        .reduce((acc, curr) => acc += curr.dish.price * curr.amount, 0);
    },

    removeCartItem: (state, {payload: dishID}: PayloadAction<string>) => {
      const index = state.cartDishes.findIndex(item => item.dish.id === dishID);
      if (index !== -1) {
        const newCartDishes : CartDish[] = [...state.cartDishes];
        newCartDishes.splice(index, 1);
        state.cartDishes = newCartDishes;
        state.cartTotalPrice = state.cartDishes
          .reduce((acc, curr) => acc += curr.dish.price * curr.amount, 0);
      }
    },

    clearCart: (state) => {
      state.cartDishes = [];
      state.cartTotalPrice = 0;
    },
    updateDishes: (state, {payload: dishes}: PayloadAction<Dish[]>) => {
      const newCartDishes: CartDish[] = [];

      state.cartDishes.forEach(cartDish => {
        const existingDish = dishes.find(dish => cartDish.dish.id === dish.id);

        if (!existingDish) {
          return;
        }

        newCartDishes.push({
          amount: cartDish.amount,
          dish: existingDish,
        });
      });

      state.cartDishes = newCartDishes;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.orderLoading = true;
    }).addCase(createOrder.fulfilled, (state) => {
      state.orderLoading = false;
    }).addCase(createOrder.rejected, (state) => {
      state.orderLoading = false;
    });
  }
});

export const cartReducer = cartSlice.reducer;

export const {
  addDish,
  removeCartItem,
  clearCart,
  updateDishes} = cartSlice.actions;

export const selectCartDishes = (state: RootState) => state.cart.cartDishes;
export const selectCartTotalPrice = (state: RootState) => state.cart.cartTotalPrice;
export const selectOrderLoading = (state: RootState) => state.cart.orderLoading;