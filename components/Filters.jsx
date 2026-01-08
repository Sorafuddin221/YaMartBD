'use client';

import React, { Suspense } from 'react';
import FiltersClientComponent from './FiltersClientComponent';
import Loader from './Loader'; // Assuming Loader is in the same components directory
import '@/componentStyles/Filters.css';

function Filters({ categories, recentProducts }) {
  return (
    <Suspense fallback={<Loader />}>
      <FiltersClientComponent categories={categories} recentProducts={recentProducts} />
    </Suspense>
  );
}

export default Filters;