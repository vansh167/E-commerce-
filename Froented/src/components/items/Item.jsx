import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({ id, name, image, new_price, old_price }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="item">
      <Link to={`/product/${id}`} onClick={handleClick}>
        <div className="item-image-container">
          <img src={image} alt={name || 'Product Image'} />
        </div>
      </Link>
      <p className="item-name">{name}</p>
      <div className="item-prices">
        <span className="new-price">₹{Number(new_price).toLocaleString('en-IN')}</span>
        <span className="old-price">₹{Number(old_price).toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
};

export default Item;
