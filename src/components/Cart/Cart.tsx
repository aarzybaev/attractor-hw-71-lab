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
      {cartTotalPrice !==0 ? (<div className="card mb-2 p-2">
        <div className="d-flex align-items-center">
          <div className="col">Delivery</div>
          <div className="col ps-5">150 KGS</div>
        </div>
      </div>) : <></>}
      <div className="card border-0 p2">
        <div className="row">
          <div className="col">
            Total:
          </div>
          <div className="col ps-4">
            <strong>{cartTotalPrice !== 0 ? cartTotalPrice + 150 : 0}</strong> KGS
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;