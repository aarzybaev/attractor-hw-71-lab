import {CartDish} from '../../types';
import React from 'react';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner';

interface Props {
  orderItems: CartDish[];
  orderComplete: (id: string) => void;
  orderID: string;
  isRemoveLoading: boolean | string;
}
const OrderItem: React.FC<Props> = ({
  orderItems,
  orderComplete,
  orderID,
  isRemoveLoading
}) => {
  const isLoading = isRemoveLoading === orderID;
  const getTotalPrice = () :number => {
    return orderItems.reduce((acc, curr) => acc += curr.dish.price * curr.amount, 150);
  };
  return (
    <div>
      {orderItems.map(item => (
        <div key={item.dish.id} className="d-flex justify-content-between">
          <div className="col-6">{item.amount}x {item.dish.title}</div>
          <div className="col-auto fw-medium">{item.dish.price} KGS</div>
        </div>
      ))}
      <div  className="d-flex justify-content-between">
        <div className="col-6">Delivery</div>
        <div className="col-auto fw-medium">150 KGS</div>
      </div>
      <div className="col d-flex justify-content-between my-2">
        <div className="fw-bold">
          Order total: {getTotalPrice()} KGS
        </div>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => orderComplete(orderID)}
          disabled={isLoading}
        >
          Complete order
          {isLoading && <ButtonSpinner/>}
        </button>
      </div>
    </div>
  );
};

export default OrderItem;