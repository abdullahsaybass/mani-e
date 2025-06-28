import React from 'react'
import header from './Navbar/Header'
import Header from './Navbar/Header'
import Footer from './Footer/Footer'
import HeroSlider from './Hero/Hero'
import Body from './Body/Body'
import Exclusive from './Body/Exclusive'
import Product from './Body/Productcarosuel'
import DiscountOffer from './Body/Offer'
import Categories from './Body/Catergory'
import CollectionsSection from './Body/Collection'
import ChildrenCollectionSection from './Body/ChildrenCollectionSection'
import FastSellingSection from './Body/FastSellingSection'
import SubscriptionSection from './Body/SubscriptionSection'
const Home = () => {
  return (
    <div>
        <Header />
        <HeroSlider />
        <Exclusive />
        <Product />
        <DiscountOffer />
        <Categories />
        <CollectionsSection />
        <Product />
        <Product />
        <ChildrenCollectionSection />
        <FastSellingSection />
        <SubscriptionSection />
        <Footer />
        {/* <Body /> */}
    </div>
  )
}

export default Home