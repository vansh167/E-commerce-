import React from 'react';
import './css/ShopCategory.css';
import { useShopContext } from '../context/ShopContext';
import dropdown_icon from '../components/Assets/dropdown_icon.png';
import Item from '../components/items/Item';

const ShopCategory = (props) => {
  const { all_product } = useShopContext();

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="Shop Banner" />

      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 50 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="Sort Icon" />
        </div>
      </div>

      <div className="shopcategory-products">
        {all_product
          .filter((item) => item.category === props.category)
          .map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
      </div>

      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
