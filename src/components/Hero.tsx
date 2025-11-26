import React from 'react';

const Hero: React.FC = () => {
  const scrollToBikes = () => {
    document.getElementById('bike-selection')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-start bg-cover bg-center bg-no-repeat" 
             style={{ backgroundImage: 'url(/media/sunset-at-signal-hill-cape-town-south-africa-suns-2025-01-09-01-52-10-utc%20Large.jpeg)' }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Eyebrow tagline */}
          <div className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <span className="text-white text-sm font-medium flex items-center gap-2">
              <span className="text-lg leading-none inline-block" style={{ lineHeight: '1.2em', transform: 'translateY(-0.1em) scale(1.25)' }}>🚲</span>
              <span>New full-suspension bikes just added</span>
            </span>
          </div>
          
          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Rent a mountain bike in Cape Town
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
            Hardtail and full-suspension bikes for rent from one day and longer, delivered to your door.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <button
              onClick={scrollToBikes}
              className="px-8 h-12 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap flex items-center justify-center"
            >
              View Bikes
            </button>
            <button
              onClick={scrollToBooking}
              className="px-8 h-12 bg-white text-navy font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap flex items-center justify-center"
            >
              Book Your Bike
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
