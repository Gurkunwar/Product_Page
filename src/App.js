import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Products from './components/Products';
import Cart from './components/Cart';
import { FiShoppingCart } from 'react-icons/fi';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartPage, setIsCartPage] = useState(false);

  async function getData() {
    const data = await fetch('https://fakestoreapi.com/products');
    const response = await data.json();
    setProducts(response);
  }

  useEffect(() => {
    getData();
  }, []);

  function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function removeFromCart(productId) {
    setCart(cart.filter(item => item.id !== productId));
  }

  function updateQuantity(productId, quantity) {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity }
        : item
    ));
  }

  return (
    <Router>
      <div className="App">
        <div className="nav-container">
          {!isCartPage && (
            <>
              <h1>Products</h1>
              <Link to="/cart" onClick={() => setIsCartPage(true)}>
                <button className="cart-btn">
                  <FiShoppingCart className="cart-icon" />
                </button>
              </Link>
            </>
          )}
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                {products.map((product) => (
                  <Products
                    category={product.category}
                    description={product.description}
                    image={product.image}
                    name={product.title}
                    key={product.id}
                    rating={product.rating.rate}
                    ratingCount={product.rating.count}
                    price={product.price}
                    addToCart={() => addToCart(product)}
                  />
                ))}
              </div>
            }
          />
          <Route
            path="/cart"
            element={<Cart
              cartItems={cart}
              setIsCartPage={setIsCartPage}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
