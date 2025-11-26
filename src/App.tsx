import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BikeSelection from './components/BikeSelection';
import HowItWorks from './components/HowItWorks';
import BookingForm from './components/BookingForm';
import FAQs from './components/FAQs';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <BikeSelection />
      <HowItWorks />
      <BookingForm />
      <FAQs />
      <Footer />
    </div>
  );
}

export default App;
