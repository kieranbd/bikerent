import React, { useState } from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'When do I get my bike?',
    answer: 'Your bike will be delivered to your door (or where you plan to ride) within the Cape Town city limits on the morning of your first booked day. Delivery the evening before may be possible on request.',
  },
  {
    id: 2,
    question: 'Do I have to bring my own helmet?',
    answer: 'A helmet and pair of gloves is included free of charge and you can indicate if you need them when you book.',
  },
  {
    id: 3,
    question: 'What if I damage the bike?',
    answer: 'Your rental is covered by our premium waiver insurance, included by default on all rentals. Just make sure you return the bike. In the event of theft, you will be liable for an excess.',
  },
  {
    id: 4,
    question: 'Where am I allowed to take the bike?',
    answer: 'As long as it stays in South Africa and you return it on time, that\'s up to you.',
  },
  {
    id: 5,
    question: 'Is there a discount for longer-term rentals?',
    answer: 'Rental periods longer than 6 days include a 15% discount, and longer than 14 days a 25% discount.',
  },
];

const FAQs: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-12 text-center">
          FAQs
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-navy pr-4">{faq.question}</span>
                <span className="text-orange-500 text-xl flex-shrink-0">
                  {openId === faq.id ? '−' : '+'}
                </span>
              </button>
              {openId === faq.id && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <p className="text-navy/70 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
