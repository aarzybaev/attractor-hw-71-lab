import {useAppDispatch} from '../../app/hooks';
import {useSelector} from 'react-redux';
import {selectDeleteLoading, selectDishes, selectFetchLoading} from '../../store/dishesSlice';
import React, {useEffect} from 'react';
import {fetchAll, removeDish} from '../../store/dishesThunks';
import DishItem from './DishItem';
import Spinner from '../Spinner/Spinner';
import {NavLink} from 'react-router-dom';
import {addDish} from '../../store/cartSlice';
import {Dish} from '../../types';

interface Props {
  isHideBtn?: boolean;
}
const Dishes: React.FC<Props> = ({isHideBtn = false}) => {

const dispatch = useAppDispatch();
const dishItems = useSelector(selectDishes);
const fetchLoading = useSelector(selectFetchLoading);
const deleteLoading = useSelector(selectDeleteLoading);


  useEffect( () => {
      dispatch(fetchAll());
  }, [dispatch]);

  const removeDishHandler = async (id: string) => {
    await dispatch(removeDish(id));
    await dispatch(fetchAll());
  };

  const addCart = (dish: Dish) => {
    dispatch(addDish(dish));
  };

  let content = <Spinner />;

  if (!fetchLoading) {
    content = (
      <div className="col-8 m-auto">
        <div className="col d-flex justify-content-between mt-1">
          <h5>Dishes</h5>
          {
            !isHideBtn &&
            (<NavLink to="/admin/dishes/new-dish" className="btn btn-secondary btn-sm">Add new Dish</NavLink>)
          }
        </div>
        {dishItems.map(dish => (
          <DishItem
            key={dish.id}
            item={dish}
            isHideBtn={isHideBtn}
            onRemove={() => removeDishHandler(dish.id)}
            addCart={addCart}
            deleteLoading={deleteLoading}
          />
        ))}
      </div>
    );
  }

  return content;

};

export default Dishes;