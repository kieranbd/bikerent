import React from 'react';
import Hero from './Hero';
import BikeSelection from './BikeSelection';
import HowItWorks from './HowItWorks';
import BookingForm from './BookingForm';
import FAQs from './FAQs';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <BikeSelection />
      <HowItWorks />
      <BookingForm />
      <FAQs />
    </>
  );
};

export default Home;
