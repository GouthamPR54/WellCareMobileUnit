import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Navigation from './Nav/Navigation';
import InfoBar from './InfoBar';
import Offers from './Offers';
import SpecialOffer from './SpecialOffer';
import Hero from './Hero';
import Data from './Data';
import Banner from './Banner';
import Footer from './Footer';
// import heroImage from '../assets/hero-image.jpg'; // Add your hero image to the src/assets folder

const Index = () => {
  return (
    <>
    {/* <Navigation /> */}
      <Hero/>
      <InfoBar />
      <Offers />
      <Data />
      <SpecialOffer />
      <Banner />
      </>
  );
};

export default Index;
