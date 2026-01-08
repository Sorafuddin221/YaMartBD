'use client';

import React, { Suspense } from 'react';
import LoginClientComponent from './LoginClientComponent';
import Loader from '@/components/Loader';


function LoginPage() {
    return (
        <Suspense fallback={<Loader />}>
            <LoginClientComponent />
        </Suspense>
    );
}

export default LoginPage;