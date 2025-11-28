import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import ListYourBike from './components/ListYourBike';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list-your-bike" element={<ListYourBike />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
