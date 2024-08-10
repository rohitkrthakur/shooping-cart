import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, decrementQuantity, removeFromCart, getCartTotal } from '../features/cartSlice';

const CartPage = () => {
  const { cart, totalQuantity, totalPrice } = useSelector((state) => state.allCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart, dispatch]);

  const handleQuantityChange = (item, type) => {
    if (type === 'increment') {
      dispatch(addToCart(item));
    } else if (type === 'decrement') {
      dispatch(decrementQuantity(item));
    }
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div>
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Cart - {cart.length} items</h5>
                </div>
                <div className="card-body">
                  {cart.map((item) => (
                    <div className="row" key={item.id}>
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <div
                          className="bg-image hover-overlay hover-zoom ripple rounded"
                          data-mdb-ripple-color="light"
                        >
                          <img src={item.img} className="w-100" alt={item.title} />
                          <a href="#!">
                            <div
                              className="mask"
                              style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}
                            ></div>
                          </a>
                        </div>
                      </div>

                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p><strong>{item.title}</strong></p>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm me-1 mb-2"
                          title="Remove item"
                          onClick={() => handleRemoveItem(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>

                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div className="d-flex mb-4" style={{ maxWidth: '300px' }}>
                          <button
                            className="btn btn-primary px-3 me-2"
                            onClick={() => handleQuantityChange(item, 'decrement')}
                          >
                            <i className="fas fa-minus"></i>
                          </button>

                          <div className="form-outline">
                            <input
                              id="form1"
                              name="quantity"
                              value={item.quantity}
                              type="number"
                              className="form-control"
                              readOnly
                            />
                            <label className="form-label" htmlFor="form1">
                              Quantity
                            </label>
                          </div>

                          <button
                            className="btn btn-primary px-3 ms-2"
                            onClick={() => handleQuantityChange(item, 'increment')}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>

                        <p className="text-start text-md-center">
                          <strong>${item.price.toFixed(2)}</strong>
                        </p>
                      </div>
                    </div>
                  ))}
                  <hr className="my-4" />
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Total Quantity
                      <span>{totalQuantity}</span>
                    </li>

                    <li
                      className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3"
                    >
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span><strong>${totalPrice}</strong></span>
                    </li>
                  </ul>

                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Go to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
