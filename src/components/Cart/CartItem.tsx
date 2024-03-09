import {CartDish} from '../../types';
import React from 'react';

interface Props {
  item: CartDish;
  removeCartItem: React.MouseEventHandler;
}
const CartItem: React.FC<Props> = ({
  item,
  removeCartItem
}) => {

  return (
    <div className="card mb-2 p-2">
      <div className="d-flex align-items-center">
        <div className="col">{item.dish.title}</div>
        <div className="col">x {item.amount}</div>
        <div className="col">{item.dish.price} KGS</div>
        <button className="btn btn-danger btn-sm" onClick={removeCartItem}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;