import React, { useState, useEffect } from 'react';

interface AvailabilityDate {
  startDate: string;
  endDate: string;
}

interface FormData {
  name: string;
  email: string;
  bikeLocation: string;
  bikeType: string;
  bikeSize: string;
  bikeYear: string;
  availabilityDates: AvailabilityDate[];
  rentalFeePerDay: string;
  termsAccepted: boolean;
}

const ListYourBike: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    bikeLocation: '',
    bikeType: '',
    bikeSize: '',
    bikeYear: '',
    availabilityDates: [{ startDate: today, endDate: today }],
    rentalFeePerDay: '',
    termsAccepted: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAvailabilityDateChange = (index: number, field: 'startDate' | 'endDate', value: string) => {
    setFormData((prev) => {
      const newDates = [...prev.availabilityDates];
      newDates[index] = {
        ...newDates[index],
        [field]: value,
      };
      return {
        ...prev,
        availabilityDates: newDates,
      };
    });
  };

  const addAvailabilityDate = () => {
    setFormData((prev) => ({
      ...prev,
      availabilityDates: [...prev.availabilityDates, { startDate: today, endDate: today }],
    }));
  };

  const removeAvailabilityDate = (index: number) => {
    if (formData.availabilityDates.length > 1) {
      setFormData((prev) => ({
        ...prev,
        availabilityDates: prev.availabilityDates.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const webhookUrl = 'https://whyc.app.n8n.cloud/webhook/list-bike';

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            bikeLocation: '',
            bikeType: '',
            bikeSize: '',
            bikeYear: '',
            availabilityDates: [{ startDate: today, endDate: today }],
            rentalFeePerDay: '',
            termsAccepted: false,
          });
          setSubmitted(false);
        }, 5000);
      } else {
        alert('There was an error submitting your listing. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your listing. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Generate years from 2019 to 2025
  const years = Array.from({ length: 2025 - 2019 + 1 }, (_, i) => 2019 + i);

  if (submitted) {
    return (
      <section className="pt-24 pb-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-navy mb-2">Listing Submitted!</h2>
            <p className="text-navy/70">
              Thank you for your listing request. We'll be in touch shortly with confirmation details.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 pb-16 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4 text-center">
          Earn an Income with Your Bike
        </h2>
        <p className="text-lg text-navy/70 mb-12 text-center max-w-2xl mx-auto">
          List your bike with us, and we'll service it for free. When it gets rented out, you receive a fixed rental fee.
        </p>

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

          {/* Bike Location */}
          <div>
            <label htmlFor="bikeLocation" className="block text-sm font-medium text-navy mb-2">
              Bike location <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              id="bikeLocation"
              name="bikeLocation"
              required
              value={formData.bikeLocation}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="Enter your bike's location"
            />
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

          {/* Bike Year */}
          <div>
            <label htmlFor="bikeYear" className="block text-sm font-medium text-navy mb-2">
              Bike year <span className="text-orange-500">*</span>
            </label>
            <select
              id="bikeYear"
              name="bikeYear"
              required
              value={formData.bikeYear}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            >
              <option value="">Select year</option>
              {years.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Availability Dates */}
          <div>
            <label className="block text-sm font-medium text-navy mb-2">
              Availability dates <span className="text-orange-500">*</span>
            </label>
            {formData.availabilityDates.map((dateRange, index) => (
              <div key={index} className="mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor={`startDate-${index}`} className="block text-sm font-medium text-navy mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      id={`startDate-${index}`}
                      required
                      min={today}
                      value={dateRange.startDate}
                      onChange={(e) => handleAvailabilityDateChange(index, 'startDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor={`endDate-${index}`} className="block text-sm font-medium text-navy mb-2">
                      End Date
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        id={`endDate-${index}`}
                        required
                        min={dateRange.startDate}
                        value={dateRange.endDate}
                        onChange={(e) => handleAvailabilityDateChange(index, 'endDate', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                      />
                      {formData.availabilityDates.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAvailabilityDate(index)}
                          className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          aria-label="Remove date range"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addAvailabilityDate}
              className="px-4 py-2 bg-gray-200 text-navy rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              <span>Add another date range</span>
            </button>
          </div>

          {/* Rental Fee Per Day */}
          <div>
            <label htmlFor="rentalFeePerDay" className="block text-sm font-medium text-navy mb-2">
              Rental fee per day (in ZAR) <span className="text-orange-500">*</span>
            </label>
            <input
              type="number"
              id="rentalFeePerDay"
              name="rentalFeePerDay"
              required
              min="0"
              step="0.01"
              value={formData.rentalFeePerDay}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              placeholder="Enter rental fee in ZAR"
            />
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
              I accept the Ts and Cs of renting my bike out through Bike Rent Cape Town <span className="text-orange-500">*</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || !formData.termsAccepted}
            className="w-full px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit Listing'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ListYourBike;
