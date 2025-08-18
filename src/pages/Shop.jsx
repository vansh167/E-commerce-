import React from 'react'
import Hero from '../components/hero/Heor'
import Popular from '../components/popular/Popular'
import Offers from '../components/offers/Offers'
import NewCollections from '../components/newCollection/NewCollections'
import Newsletter from '../components/newsLetter/Newsletter'
import Feature from '../feature/Feature'


const Shop = () => {
  return (
    <>
      <Hero/>
      <Feature/>
      <Popular/>
      <Offers/>
      <NewCollections/>
      <Newsletter/> 
    </>
  )
}

export default Shop
