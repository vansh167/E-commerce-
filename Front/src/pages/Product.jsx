import React from 'react'
import { useShopContext } from '../context/ShopContext'
import { useParams } from 'react-router';
import Breadcrum from '../components/breadcrum/Breadcrum';
import Productdisplay from '../components/productdisplay/Productdisplay';
import DescriptionBox from '../components/descriptionbox/DescriptionBox';
import RelatedProducts from '../components/relatedproducts/RelatedProducts';

const Product = () => {
  const {all_product} = useShopContext();
  const {productId} = useParams();  
  const product = all_product.find((e) => e.id === Number(productId))
  return (
    <>
      <div>
        <Breadcrum product={product}/>
        <Productdisplay product={product}/>
        <DescriptionBox/>
        <RelatedProducts/>
      </div>
    </>
  )
}

export default Product
