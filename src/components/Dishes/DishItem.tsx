import {Dish} from '../../types';
import React from 'react';
import {NavLink} from 'react-router-dom';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner';

interface Props {
  item: Dish;
  onRemove: React.MouseEventHandler;
  addCart: (item: Dish) => void;
  deleteLoading: boolean | string;
  isHideBtn?: boolean
}

const DishItem: React.FC<Props> = ({
  item,
  onRemove,
  addCart,
  deleteLoading,
  isHideBtn = false
}) => {

  const isLoading = deleteLoading === item.id;

  return (
    <div
      className="d-flex my-2 align-items-center gap-3 border border-light border-2 p-2 rounded"
      onClick={() => isHideBtn && addCart(item)}
    >
      <img src={item.image} style={{width: '10rem'}} alt={item.title}/>
      <div className="ms-3">{item.title}</div>
      <div className="fw-bold ms-auto me-5">{item.price} KGS</div>
      <div>

        {!isHideBtn && (
          <>
            <NavLink className="btn btn-warning btn-sm" to={'/admin/dishes/edit/' + item.id}>Edit </NavLink>
            <button
            className="btn btn-danger btn-sm ms-2"
            onClick={onRemove}
            disabled={isLoading}
            >
            Delete
            {isLoading && <ButtonSpinner/>}
            </button>
          </>
        )}
      </div>

    </div>
  );
};

export default DishItem;