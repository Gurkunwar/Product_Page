import React from 'react';
import './Products.css';

function Products({ category, description, image, name, price, rating, addToCart }) {
  return (
    <div className="product-container">
      <div className="left-container">
        <img src={image} alt={name} />
      </div>
      <div className="right-container">
        <strong>{name}</strong>
        <p>{category}</p>
        <p className="rating">Rating: {rating}</p>
        <p>{description}</p>
        <p>${price}</p>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Products;
