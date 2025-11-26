import React, { useEffect, useRef, useState } from 'react';

interface TimelineItem {
  id: number;
  title: string;
  side: 'left' | 'right';
}

const timelineItems: TimelineItem[] = [
  { id: 1, title: 'Browse bikes', side: 'left' },
  { id: 2, title: 'Confirm your dates and accessories', side: 'right' },
  { id: 3, title: 'Submit your booking', side: 'left' },
  { id: 4, title: 'Receive confirmation and payment link', side: 'right' },
  { id: 5, title: 'Bike delivered to your door', side: 'left' },
];

const HowItWorks: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set(prev).add(index));
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-12 text-center">
          How it Works
        </h2>
        
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-orange-400 hidden md:block"></div>
          
          {/* Timeline items */}
          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`relative flex items-center ${
                  item.side === 'left' ? 'md:justify-end' : 'md:justify-start'
                }`}
              >
                <div
                  className={`w-full md:w-5/12 transition-opacity duration-1000 ${
                    visibleItems.has(index) ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {item.id}
                      </div>
                      <h3 className="text-xl font-semibold text-navy">{item.title}</h3>
                    </div>
                  </div>
                </div>
                
                {/* Timeline dot - only visible on desktop */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
