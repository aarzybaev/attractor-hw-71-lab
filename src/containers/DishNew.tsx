import DishForm from '../components/DishForm/DishForm';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {selectCreateLoading} from '../store/dishesSlice';
import {useNavigate} from 'react-router-dom';
import {ApiDish} from '../types';
import {createDish} from '../store/dishesThunks';

const DishNew = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isCreating = useAppSelector(selectCreateLoading);
  const onSubmit = async (newDish: ApiDish) => {
    await dispatch(createDish(newDish));
    navigate('/admin/dishes');
  };
  return (
    <div className="row mt-2">
      <div className="col-6 m-auto">
        <DishForm onSubmit={onSubmit} isLoading={isCreating}/>
      </div>
    </div>
  );
};

export default DishNew;