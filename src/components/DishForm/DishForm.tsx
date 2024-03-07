import {ApiDish, DishForm} from '../../types';
import React, {useState} from 'react';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner';

interface Props {
  onSubmit: (dish: ApiDish) => void;
  existingDish?: DishForm;
  isEdit?: boolean;
  isLoading?: boolean;
}

const initialState: DishForm = {
  title: '',
  price: '',
  image: ''
};

const DishForm: React.FC<Props> = ({
  onSubmit,
  existingDish = initialState,
  isEdit = false,
  isLoading = false
}) => {
  const [dish, setDish] = useState<DishForm>(existingDish);
  const changeDish = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDish(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      ...dish,
      price: parseFloat(dish.price),
    });
  };
  return (
    <>
      <form onSubmit={onFormSubmit}>
        <h4>{isEdit ? 'Edit dish' : 'Add new dish'}</h4>
        <div className="form-group">
          <label htmlFor="name">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            value={dish.title}
            onChange={changeDish}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            className="form-control"
            value={dish.price}
            onChange={changeDish}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="url"
            name="image"
            id="image"
            className="form-control"
            value={dish.image}
            onChange={changeDish}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
          {isLoading && <ButtonSpinner/>}
          {isEdit ? 'Update' : 'Create'}
        </button>
      </form>
    </>
  );
};

export default DishForm;