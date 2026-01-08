'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '@/componentStyles/OfferSection.css'; // Reuse existing styles

const OfferCardDisplay = ({ card }) => {
  return (
    <div className="offer-card">
      <Image src={card.imageUrl} alt={card.title} layout="fill" objectFit="cover" />
      <div className="offer-content">
        <h2>{card.title}</h2>
        <p>{card.description}</p>
        {card.buttonUrl && (
          <Link href={card.buttonUrl}>
            <button className="offer-btn">Shop Now</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default OfferCardDisplay;
