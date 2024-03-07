import DishForm from '../components/DishForm/DishForm';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {useParams} from 'react-router-dom';
import {
  selectFetchOneDishError,
  selectFetchOneDishLoading,
  selectOneDish,
  selectUpdateDishLoading
} from '../store/dishesSlice';
import {useCallback, useEffect} from 'react';
import {fetchOneDish, updateDish} from '../store/dishesThunks';
import {ApiDish} from '../types';
import Spinner from '../components/Spinner/Spinner';

const DishEdit = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const fetchLoading = useAppSelector(selectFetchOneDishLoading);
  const fetchError = useAppSelector(selectFetchOneDishError);
  const isUpdating = useAppSelector(selectUpdateDishLoading);
  const dish = useAppSelector(selectOneDish);

  const fetchDish = useCallback(async () => {
    await dispatch(fetchOneDish(id || ''));
  }, [dispatch, id]);

  useEffect(() => {
    void fetchDish();
  }, [fetchDish]);

  const onSubmit = async (apiDish: ApiDish) => {
    if (id) {
      await dispatch(updateDish({dishId: id, apiDish}));
    }
  };

  const existingDish = dish && {
    ...dish,
    price: dish.price.toString(),
  };

  return (
    <div className="row mt-2">
      <div className="col-6 m-auto">
        {fetchLoading && <Spinner/> }
        {fetchError && fetchError.code === 'not_found' && (
          <h4>Dish not found!</h4>
        )}
        {fetchError && fetchError.code === 'internet_problem' && (
          <div className="alert alert-warning">Internet problem!</div>
        )}
        {existingDish && (
          <DishForm
            isEdit
            onSubmit={onSubmit}
            existingDish={existingDish}
            isLoading={isUpdating}
          />
        )}
      </div>
    </div>
  );
};

export default DishEdit;