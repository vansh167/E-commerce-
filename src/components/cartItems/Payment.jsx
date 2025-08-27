import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaLock,  FaShieldAlt,  FaThumbsUp,  FaCcVisa,FaCcMastercard, FaCcPaypal,
} from "react-icons/fa";
import "./Payment.css";

const PaymentPage = () => {
  const location = useLocation();
  const { address, totalAmount } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("free");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // Delivery charges
  const deliveryCharges =
    deliveryOption === "today" ? 100 : deliveryOption === "fast" ? 50 : 0;

  // Final amounts
  const finalAmount = (totalAmount || 0) + deliveryCharges;
  const discountedAmount = finalAmount - (finalAmount * discountPercent) / 100;

  // Toast notifications
  const notifySuccess = (msg) =>
    toast.success(msg, { position: "top-right", autoClose: 3000, theme: "colored" });
  const notifyError = (msg) =>
    toast.error(msg, { position: "top-right", autoClose: 3000, theme: "colored" });

  // Coupon handling
  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();

    const coupons = { SAVE10: 10, SAVE20: 20, WELCOME5: 5 };
    
    if (coupons[code]) {
      setDiscountPercent(coupons[code]);
      notifySuccess(`Coupon applied! You got ${coupons[code]}% off.`);
    } else {
      setDiscountPercent(0);
      notifyError("Invalid coupon code!");
    }
  };

  // Card input handling
  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  // Confirm order
  const handleConfirmOrder = () => {
    if (!paymentMethod) return notifyError("⚠️ Please select a payment method.");
    if (paymentMethod === "upi" && !upiId) return notifyError("⚠️ Please enter your UPI ID.");
    if (paymentMethod === "card") {
      const { cardNumber, expiry, cvv, name } = cardDetails;
      if (!cardNumber || !expiry || !cvv || !name)
        return notifyError("⚠️ Please fill in all card details.");
    }
    notifySuccess(`✅ Order Placed! Total Paid: ₹${discountedAmount}`);
  };

  return (
    <div className="payment-wrapper">
      <ToastContainer />
      <h2 className="payment-title">Payment</h2>

      <div className="payment-content">
        {/* Left Section: Delivery Address & Security */}
        <div className="payment-left">
          <h3>Delivery Address</h3>
          {address ? (
            <p>
              <b>Name:</b> {address.name} <br />
              <b>Phone:</b> {address.phone} <br />
              <b>Address:</b> {address.address} <br />
              <b>City:</b> {address.city} <br />
              <b>Pincode:</b> {address.pincode}
            </p>
          ) : (
            <p>No address found</p>
          )}

          {/* Bottom Security & Trust */}
          <div className="payment-bottom">
            <div className="security-item">
              <FaLock size={30} color="#4caf50" />
              <span>100% Secure Payment</span>
            </div>
            <div className="security-item">
              <FaShieldAlt size={30} color="#2196f3" />
              <span>Verified Checkout</span>
            </div>
            <div className="security-item">
              <FaThumbsUp size={30} color="#ff9800" />
              <span>Trusted by Thousands</span>
            </div>
            <div className="security-item payment-brands">
              <FaCcVisa size={30} color="#1a1f71" />
              <FaCcMastercard size={30} color="#eb001b" />
              <FaCcPaypal size={30} color="#003087" />
            </div>
          </div>
        </div>

        {/* Right Section: Payment, Delivery, Coupon */}
        <div className="payment-right">
          <h3>Select Payment Method</h3>
          <select
            className="payment-dropdown"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">-- Select Payment Method --</option>
            <option value="upi">💳 UPI (Google Pay / PhonePe)</option>
            <option value="card">💳 Credit / Debit Card</option>
            <option value="cod">💵 Cash on Delivery</option>
          </select>

          {paymentMethod === "upi" && (
            <div className="upi-box">
              <input
                type="text"
                placeholder="Enter UPI ID (@upi)"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
          )}

          {paymentMethod === "card" && (
            <div className="card-details">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                maxLength="16"
                value={cardDetails.cardNumber}
                onChange={handleCardChange}
              />
              <div className="card-row">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  maxLength="5"
                  value={cardDetails.expiry}
                  onChange={handleCardChange}
                />
                <input
                  type="password"
                  name="cvv"
                  placeholder="CVV"
                  maxLength="3"
                  value={cardDetails.cvv}
                  onChange={handleCardChange}
                />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Cardholder Name"
                value={cardDetails.name}
                onChange={handleCardChange}
              />
            </div>
          )}

          <h3>Delivery Options</h3>
          <label>
            <input
              type="radio"
              name="delivery"
              value="today"
              checked={deliveryOption === "today"}
              onChange={(e) => setDeliveryOption(e.target.value)}
            />
            Deliver Today (₹100)
          </label>
          <label>
            <input
              type="radio"
              name="delivery"
              value="fast"
              checked={deliveryOption === "fast"}
              onChange={(e) => setDeliveryOption(e.target.value)}
            />
            Deliver in 1-2 Days (₹50)
          </label>
          <label>
            <input
              type="radio"
              name="delivery"
              value="free"
              checked={deliveryOption === "free"}
              onChange={(e) => setDeliveryOption(e.target.value)}
            />
            Standard Delivery (Free)
          </label>

          {/* Coupon Section */}
          <div className="coupon-box">
            <h3>Have a Coupon?</h3>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="apply-coupon-btn" onClick={handleApplyCoupon}>
              Apply
            </button>
            {discountPercent > 0 && (
              <p className="coupon-success">
                🎉 You saved {discountPercent}% on this order!
              </p>
            )}
          </div>

          {/* Final Summary */}
          <div className="final-summary">
            <p>Cart Total: ₹{totalAmount}</p>
            <p>Delivery Charges: ₹{deliveryCharges}</p>
            {discountPercent > 0 && (
              <p>Discount: -₹{(finalAmount * discountPercent) / 100}</p>
            )}
            <h3>Final Amount: ₹{discountedAmount}</h3>
          </div>

          <button className="confirm-btn" onClick={handleConfirmOrder}>
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
