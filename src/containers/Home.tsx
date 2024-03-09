import Dishes from '../components/Dishes/Dishes';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {clearCart, selectCartDishes, selectCartTotalPrice, selectOrderLoading} from '../store/cartSlice';
import Modal from '../components/Modal/Modal';
import {useState} from 'react';
import Cart from '../components/Cart/Cart';
import {createOrder} from '../store/cartThunks';
import ButtonSpinner from '../components/ButtonSpinner/ButtonSpinner';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const cartDishes = useAppSelector(selectCartDishes);
  const cartTotalPrice = useAppSelector(selectCartTotalPrice);
  const isOrderLoading = useAppSelector(selectOrderLoading);

  const order = () => {
  const newOrder = cartDishes.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.dish.id]: curr.amount
    };
  }, {});
  dispatch(createOrder(newOrder));
  dispatch(clearCart());
  cancel();
  };
  const cancel = () => setShowModal(false);

  return (
    <>
      <div className="row my-2">
        <div className="col-10 m-auto">
          <Dishes isHideBtn={true}/>
          <div className="col-8 m-auto d-flex justify-content-between">
            <div className="fw-medium">Order total: {cartTotalPrice} KGS</div>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setShowModal(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        title="Your order"
        onClose={cancel}
      >
        <div className="modal-body">
          <Cart
            cartDishes={cartDishes}
            cartTotalPrice={cartTotalPrice}
          />
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-danger"
            onClick={cancel}
          >
            Cancel
          </button>
          <button
            className="btn btn-success"
            onClick={order}
            disabled={isOrderLoading || cartTotalPrice == 0}
          >
            Order
            {isOrderLoading && <ButtonSpinner />}
          </button>
        </div>
      </Modal>

    </>
  );
};

export default Home;