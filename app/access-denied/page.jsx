import React from 'react';
import Link from 'next/link';

function AccessDeniedPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8d7da', // Light red background
      color: '#721c24', // Dark red text
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3em', marginBottom: '20px' }}>Access Denied</h1>
      <p style={{ fontSize: '1.2em', marginBottom: '30px' }}>
        You do not have permission to view this page.
      </p>
      <Link href="/login" style={{
        backgroundColor: '#dc3545', // Red button
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        textDecoration: 'none',
        fontSize: '1em',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease'
      }}>
        Go to Login
      </Link>
    </div>
  );
}

export default AccessDeniedPage;
