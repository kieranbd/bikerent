import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-navy hover:opacity-80 transition-opacity">
            <div className="text-xl font-semibold leading-tight">Bike Rent</div>
            <div className="text-xl font-semibold">Cape Town</div>
          </Link>
          <div className="flex items-center gap-2">
            <img 
              src="/media/mountain-bike.png" 
              alt="Bike Rent Cape Town" 
              className="h-10 w-10"
              style={{ filter: 'brightness(0) saturate(100%) invert(12%) sepia(45%) saturate(800%) hue-rotate(195deg) brightness(0.4) contrast(1.1)' }}
            />
            <a 
              href="https://www.flaticon.com/free-icons/bike" 
              title="bike icons"
              className="sr-only"
              aria-label="Bike icons created by Freepik - Flaticon"
            >
              Bike icons created by Freepik - Flaticon
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
