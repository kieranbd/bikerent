import React from 'react';

interface Bike {
  id: number;
  title: string;
  price: string;
  image: string;
}

const bikes: Bike[] = [
  {
    id: 1,
    title: 'Hardtail',
    price: '€35 / day',
    image: 'https://via.placeholder.com/400x300?text=Hardtail+Bike'
  },
  {
    id: 2,
    title: 'Marathon / Cross-Country',
    price: '€45 / day',
    image: 'https://via.placeholder.com/400x300?text=Cross+Country+Bike'
  },
  {
    id: 3,
    title: 'Trail / Enduro',
    price: '€45 / day',
    image: 'https://via.placeholder.com/400x300?text=Trail+Bike'
  },
  {
    id: 4,
    title: 'All-Mountain eBike',
    price: '€60 / day',
    image: 'https://via.placeholder.com/400x300?text=eBike'
  }
];

const BikeSelection: React.FC = () => {
  const scrollToBooking = () => {
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="bike-selection" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4 text-center">
          Our Bike Selection
        </h2>
        <p className="text-lg text-navy/70 mb-12 text-center max-w-2xl mx-auto">
          From hardtails to full-suspension trail bikes and e-bikes.
        </p>
        
        {/* Horizontal scrollable carousel */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-6 min-w-max">
            {bikes.map((bike) => (
              <div
                key={bike.id}
                className="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
              >
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={bike.image}
                    alt={bike.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy mb-2">{bike.title}</h3>
                  <p className="text-2xl font-bold text-orange-500 mb-4">{bike.price}</p>
                  <button
                    onClick={scrollToBooking}
                    className="w-full px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Book this bike
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BikeSelection;
