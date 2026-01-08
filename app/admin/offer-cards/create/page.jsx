import React from 'react';
import PageTitle from '@/components/PageTitle';
import CreateOfferCardClientComponent from './CreateOfferCardClientComponent';
import '@/AdminStyles/AdminSettings.css';

function CreateOfferCardPage() {
  return (
    <>
      <PageTitle title="Add New Offer Card" />
      <CreateOfferCardClientComponent />
    </>
  );
}

export default CreateOfferCardPage;
