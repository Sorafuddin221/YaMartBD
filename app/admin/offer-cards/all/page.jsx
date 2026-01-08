import React from 'react';
import PageTitle from '@/components/PageTitle';
import AllOfferCardsClientComponent from './AllOfferCardsClientComponent';
import '@/AdminStyles/AdminSettings.css';

function AllOfferCardsPage() {
  return (
    <>
      <PageTitle title="All Offer Cards" />
      <AllOfferCardsClientComponent />
    </>
  );
}

export default AllOfferCardsPage;
