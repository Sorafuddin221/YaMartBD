'use client';

import React, { Suspense } from 'react';
import PaymentSuccessClientComponent from './PaymentSuccessClientComponent';
import Loader from '@/components/Loader';

function PaymentSuccessPage() {
    return (
        <Suspense fallback={<Loader />}>
            <PaymentSuccessClientComponent />
        </Suspense>
    );
}

export default PaymentSuccessPage;