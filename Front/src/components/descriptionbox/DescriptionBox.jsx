import React from 'react'
import './DescriptionBox.css'
const DescriptionBox = () => {
  return (
    <>
      <div className="descriptionbox">
        <div className="descriptionbox-navigator">
          <div className="descriptionbox-nav-box">Description</div>
          <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
          <p>
            E-commerce websites are online platforms that allow businesses to sell
            products and services directly to customers over the internet. They act
            as digital storefronts, providing a convenient way for customers to browse,
            select, and purchase items online. These websites offer various features like
            product catalogs, payment processing, order tracking, and customer support.
          </p>
          <p>
            To start an e-commerce business, you need to identify a niche, choose products,
            validate your idea, secure a supplier, create a business plan, set up your online
            store, and implement a marketing strategy
          </p>
        </div>
      </div>
    </>
  )
}

export default DescriptionBox
