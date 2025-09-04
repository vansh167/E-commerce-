import React, { useEffect, useState } from 'react'
import "./ListProduct.css"
import cross_icon from '../../assets/cross_icon.png' // ✅ Correct import

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then(res => res.json())
      .then((data) => { setAllProducts(data) })
  }
  fetchInfo();

  useEffect(() => {
    fetchInfo();
  }, []) // ✅ Add empty dependency array to avoid infinite fetch

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return <div key={index} className='listproduct-format'>
            <img src={product.image} alt="" className='listproductproduct-image' />
            <p>{product.name}</p>
            <p>${product.oldPrice}</p>
            <p>${product.newPrice}</p>
            <p>{product.category}</p>
            <img className='listproduct-remove-icon' src={cross_icon} alt="Remove" /> {/* ✅ Use correct variable */}
          </div>
        })}
      </div>
    </div>
  )
}

export default ListProduct;