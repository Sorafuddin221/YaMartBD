import React from 'react';
import Link from 'next/link';
import '@/pageStyles/NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
        <p className="not-found-sub-message">It might have been moved or deleted.</p>
        <Link href="/" className="not-found-home-link">
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
}
