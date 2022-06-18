import React from "react";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import './ConfirmOrder.css';
import CheckoutSteps from "./CheckoutSteps";


const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city} ${shippingInfo.state} ${shippingInfo.pinCode} ${shippingInfo.country} `;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <>
    <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>

              <div>
                <p>Address</p>
                <span>{address}</span>
              </div>
            </div>
          </div>

          <div className="confirmCartItems">
            <Typography>Your Cart Items: </Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => {
                  return (
                    <>
                      <div key={item.product}>
                        <img src={item.image} alt="image" />
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                        <span>
                          {item.quantity} X {item.price} ={" "}
                          <b>{`रु ${item.price * item.quantity}`}</b>
                        </span>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>

        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>रु {subtotal}</span>
              </div>

              <div>
                <p>Shipping Charges:</p>
                <span>रु {shippingCharges}</span>
              </div>

              <div>
                <p>GST:</p>
                <span>रु {tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>रु {totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
