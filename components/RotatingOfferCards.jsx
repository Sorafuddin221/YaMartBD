'use client';

import React, { useState, useEffect } from 'react';
import OfferCardDisplay from './OfferCardDisplay';

const RotatingOfferCards = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!cards || cards.length <= 1) {
      return; // No rotation needed if 0 or 1 card
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [cards]);

  if (!cards || cards.length === 0) {
    return null; // Don't render anything if no cards
  }

  return (
    <div className="rotating-offer-card-wrapper"> {/* Add a wrapper div for potential styling */}
      <OfferCardDisplay card={cards[currentIndex]} />
    </div>
  );
};

export default RotatingOfferCards;
