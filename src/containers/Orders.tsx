import {useAppDispatch, useAppSelector} from '../app/hooks';
import {fetchAllOrders, removeOrder} from '../store/ordersThunks';
import {selectFetchAllOrdersLoading, selectOrders, selectRemoveOrderLoading} from '../store/ordersSlice';
import {selectDishes} from '../store/dishesSlice';
import {useCallback, useEffect} from 'react';
import {fetchAll} from '../store/dishesThunks';
import {ApiOrder, ApiOrders, NewOrder} from '../types';
import Spinner from '../components/Spinner/Spinner';
import OrderItem from '../components/OrderItem/OrderItem';

const Orders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const dishes = useAppSelector(selectDishes);
  const isRemoveLoading = useAppSelector(selectRemoveOrderLoading);
  const isLoading = useAppSelector(selectFetchAllOrdersLoading);

  const fetchOrders = useCallback(async () => {
    await dispatch(fetchAll());
    await dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect( () => {
    void fetchOrders();
  }, [fetchOrders]);

  const newObj: NewOrder = {};

    const foo = (dishID: string, amount: number, orderID: string) => {
      const index = dishes.findIndex(item => item.id === dishID);
      if (!newObj[orderID]) {
        newObj[orderID] = [];
      }
      newObj[orderID].push({dish: dishes[index], amount:amount});
    };

    const dishHandle = (dish: ApiOrder, orderID: string) => {
      for (const key in dish) {
        foo(key, dish[key], orderID);
      }
    };
    const orderHandle = (order: ApiOrders) => {
      for (const key in order) {
        dishHandle(order[key], key);
      }
    };

      orders.forEach(order => {
        orderHandle(order);
      });

const orderCompleteHandler = async (id: string) => {
  await dispatch(removeOrder(id));
  await fetchOrders();
};
  return isLoading ? <Spinner /> : (
    <div className="row mt-3">
      <h4>Orders</h4>
      {Object.keys(newObj).map(orderID => (
        <div key={orderID} className="col-8  m-auto d-flex flex-column border border-light border-1 mt-1">
          {
              <OrderItem
                orderItems={newObj[orderID]}
                orderComplete={orderCompleteHandler}
                orderID={orderID}
                isRemoveLoading={isRemoveLoading}
              />
          }

        </div>
      ))}
    </div>
  );
};

export default Orders;