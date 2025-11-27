import React, { useState, useEffect } from 'react';

interface FormData {
  name: string;
  email: string;
  deliveryLocation: string;
  startDate: string;
  endDate: string;
  bikeSize: string;
  bikeType: string;
  helmetAndGloves: boolean;
  termsAccepted: boolean;
}

const BIKE_PRICES: Record<string, number> = {
  'Hardtail': 35,
  'Full suspension: Cross Country': 45,
  'Full Suspension: Trail / Enduro': 45,
  'Full Suspension: eBike': 60,
};

const BookingForm: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    deliveryLocation: '',
    startDate: today,
    endDate: today,
    bikeSize: '',
    bikeType: '',
    helmetAndGloves: false,
    termsAccepted: false,
  });

  // Check for preselected bike type when component mounts or when scrolled into view
  useEffect(() => {
    const checkPreselectedBike = () => {
      const preselected = sessionStorage.getItem('selectedBikeType');
      if (preselected) {
        setFormData(prev => {
          // Only update if it's different and not already set
          if (prev.bikeType !== preselected) {
            return {
              ...prev,
              bikeType: preselected
            };
          }
          return prev;
        });
        // Clear it after using it
        sessionStorage.removeItem('selectedBikeType');
      }
    };

    // Check immediately on mount
    checkPreselectedBike();

    // Also check when the form section comes into view (in case of smooth scroll)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Small delay to ensure sessionStorage is set and scroll is complete
            setTimeout(checkPreselectedBike, 300);
          }
        });
      },
      { threshold: 0.1 }
    );

    const formElement = document.getElementById('booking-form');
    if (formElement) {
      observer.observe(formElement);
    }

    return () => {
      if (formElement) {
        observer.disconnect();
      }
    };
  }, []); // Empty dependency array - only run on mount

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Calculate price whenever relevant fields change
  useEffect(() => {
    if (!formData.startDate || !formData.endDate || !formData.bikeType) {
      setTotalPrice(0);
      setDays(0);
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    
    if (end < start) {
      setTotalPrice(0);
      setDays(0);
      return;
    }

    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    setDays(daysDiff);

    const basePrice = BIKE_PRICES[formData.bikeType] || 0;
    let price = basePrice * daysDiff;

    // Apply discounts
    if (daysDiff > 14) {
      price = price * 0.75; // 25% discount
    } else if (daysDiff > 6) {
      price = price * 0.85; // 15% discount
    }

    setTotalPrice(Math.round(price * 100) / 100);
  }, [formData.startDate, formData.endDate, formData.bikeType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const webhookUrl = 'https://whyc.app.n8n.cloud/webhook/bikerent-booking';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          totalPrice,
          totalBookingPriceFormatted: `€${totalPrice.toFixed(2)}`,
          days,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // Track conversion event
        if (typeof window !== 'undefined' && typeof (window as any).gtag_report_conversion === 'function') {
          (window as any).gtag_report_conversion();
        }
        
        setSubmitted(true);
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            deliveryLocation: '',
            startDate: today,
            endDate: today,
            bikeSize: '',
            bikeType: '',
            helmetAndGloves: false,
            termsAccepted: false,
          });
          setSubmitted(false);
        }, 5000);
      } else {
        alert('There was an error submitting your booking. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="booking-form" className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-navy mb-2">Booking Submitted!</h2>
            <p className="text-navy/70">
              Thank you for your booking request. We'll be in touch shortly with confirmation details.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking-form" className="py-16 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-8 text-center">
          Book Your Bike
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-navy mb-2">
              Name <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
              Email <span className="text-orange-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>

          {/* Delivery Location */}
          <div>
            <label htmlFor="deliveryLocation" className="block text-sm font-medium text-navy mb-2">
              Delivery location <span className="text-orange-500">*</span>
            </label>
            <textarea
              id="deliveryLocation"
              name="deliveryLocation"
              required
              rows={3}
              value={formData.deliveryLocation}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="Enter your delivery address"
            />
          </div>

          {/* Rental Period */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-navy mb-2">
                Start Date <span className="text-orange-500">*</span>
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                required
                min={today}
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-navy mb-2">
                End Date <span className="text-orange-500">*</span>
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                required
                min={formData.startDate}
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>
          </div>

          {/* Bike Size */}
          <div>
            <label htmlFor="bikeSize" className="block text-sm font-medium text-navy mb-2">
              Bike size <span className="text-orange-500">*</span>
            </label>
            <select
              id="bikeSize"
              name="bikeSize"
              required
              value={formData.bikeSize}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            >
              <option value="">Select size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          {/* Bike Type */}
          <div>
            <label htmlFor="bikeType" className="block text-sm font-medium text-navy mb-2">
              Bike type <span className="text-orange-500">*</span>
            </label>
            <select
              id="bikeType"
              name="bikeType"
              required
              value={formData.bikeType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            >
              <option value="">Select bike type</option>
              <option value="Hardtail">Hardtail</option>
              <option value="Full suspension: Cross Country">Full suspension: Cross Country</option>
              <option value="Full Suspension: Trail / Enduro">Full Suspension: Trail / Enduro</option>
              <option value="Full Suspension: eBike">Full Suspension: eBike</option>
            </select>
          </div>

          {/* Helmet and Gloves Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="helmetAndGloves"
              name="helmetAndGloves"
              checked={formData.helmetAndGloves}
              onChange={handleChange}
              className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="helmetAndGloves" className="ml-3 text-sm text-navy">
              I need a helmet and gloves
            </label>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="termsAccepted"
              name="termsAccepted"
              required
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="termsAccepted" className="ml-3 text-sm text-navy">
              I agree to the Terms and Conditions <span className="text-orange-500">*</span>
            </label>
          </div>

          {/* Price Summary */}
          {totalPrice > 0 && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-navy font-medium">Rental Period:</span>
                <span className="text-navy">{days} {days === 1 ? 'day' : 'days'}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-navy font-medium">Bike Type:</span>
                <span className="text-navy">{formData.bikeType}</span>
              </div>
              {days > 14 && (
                <div className="flex justify-between items-center mb-2 text-green-600">
                  <span className="font-medium">Discount (25%):</span>
                  <span>Applied</span>
                </div>
              )}
              {days > 6 && days <= 14 && (
                <div className="flex justify-between items-center mb-2 text-green-600">
                  <span className="font-medium">Discount (15%):</span>
                  <span>Applied</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-4 border-t border-gray-300">
                <span className="text-xl font-bold text-navy">Total Price:</span>
                <span className="text-2xl font-bold text-orange-500">€{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || !formData.termsAccepted}
            className="w-full px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit Booking'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
