import React from "react";
import { useLocation } from "react-router-dom";

const OrderSuccessPage = () => {
  const location = useLocation();
  const { totalAmount, address, paymentMethod, deliveryOption } = location.state || {};

  return (
    <div className="order-success">
      <h2>Order Successful!</h2>

      <h3>Order Details</h3>
      <p><b>Amount Paid:</b> ₹{totalAmount}</p>
      <p><b>Payment Method:</b> {paymentMethod}</p>
      <p><b>Delivery Method:</b> {deliveryOption}</p>

      <h3>Shipping Address</h3>
      {address ? (
        <div>
          <p><b>Name:</b> {address.name}</p>
          <p><b>Phone:</b> {address.phone}</p>
          <p><b>Address:</b> {address.address}</p>
          <p><b>City:</b> {address.city}</p>
          <p><b>Pincode:</b> {address.pincode}</p>
        </div>
      ) : (
        <p>No address available</p>
      )}
    </div>
  );
};

export default OrderSuccessPage;
