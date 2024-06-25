import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { FiArrowLeft } from "react-icons/fi";

function Cart({ cartItems, setIsCartPage, removeFromCart, updateQuantity }) {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleQuantityChange = (productId, event) => {
    const quantity = parseInt(event.target.value);
    updateQuantity(productId, quantity);
  };

  return (
    <div className="cart-container">
      <div className="header-container">
        <button
          className="back-button"
          onClick={() => {
            navigate("/");
            setIsCartPage(false);
          }}
        >
          <FiArrowLeft /> Back to Products
        </button>
        <h1>Shopping Cart</h1>
        <span>Price</span>
      </div>
      <hr />
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index} className="product-container">
              <img src={item.image} alt={item.name} className="product-image" />
              <div className="product-details">
                <h2>{item.title}</h2>
                <p>In Stock</p>
                <p>Eligible for FREE shipping</p>
                <img
                  src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
                  alt="amazon-fulfilled"
                />
                <p>
                  <input type="checkbox" /> This will be a gift{" "}
                  <a href="#">Learn more</a>
                </p>
                <p>Category: {item.category}</p>
                <p><b>Size:</b> L</p>
                <div className="product-functions">
                  <select
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e)}
                  >
                    {[...Array(10).keys()].map(x => (
                      <option key={x + 1} value={x + 1}>Qty: {x + 1}</option>
                    ))}
                  </select>
                  |
                  <span onClick={() => removeFromCart(item.id)}>Delete</span>
                  |
                  <span>Save for later</span>|
                  <span>See more like this</span>|
                  <span>Share</span>
                </div>
              </div>
              <span className="product-price">${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        <h3>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items): ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default Cart;