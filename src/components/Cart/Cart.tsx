import CartItem from './CartItem';
import {CartDish} from '../../types';
import React from 'react';
import {useAppDispatch} from '../../app/hooks';
import {removeCartItem} from '../../store/cartSlice';

interface Props {
  cartDishes: CartDish[];
  cartTotalPrice:  number;
}
const Cart: React.FC<Props> = ({cartDishes, cartTotalPrice}) => {
  const dispatch = useAppDispatch();
  const removeCartDish = (id: string) => {
    dispatch(removeCartItem(id));
  };
  return (
    <div>
      <h5>Cart</h5>
      {cartDishes.map(cartDish => (
        <CartItem
          key={cartDish.dish.id}
          item={cartDish}
          removeCartItem={() => removeCartDish(cartDish.dish.id)}
        />
      ))}
      <div className="card border-0 p2">
        <div className="row">
          <div className="col">
            Total:
          </div>
          <div className="col ps-4">
            <strong>{cartTotalPrice}</strong> KGS
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;