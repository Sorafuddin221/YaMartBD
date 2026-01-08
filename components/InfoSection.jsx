import React from 'react';
import Link from 'next/link';
import PolicyIcon from '@mui/icons-material/Policy';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import GavelIcon from '@mui/icons-material/Gavel';
import '@/componentStyles/InfoSection.css';

const InfoSection = () => {
  return (
    <section className="info-section">
      <div className="info-column">
        <Link href="/privacy-policy">
          <div className="info-card">
            <PolicyIcon />
            <h3>Privacy Policy</h3>
            <p>Read our privacy policy</p>
          </div>
        </Link>
      </div>
      <div className="info-column">
        <Link href="/contact">
          <div className="info-card">
            <HeadsetMicIcon />
            <h3>Customer Service</h3>
            <p>Contact us for any query</p>
          </div>
        </Link>
      </div>
      <div className="info-column">
        <Link href="/terms-and-conditions">
          <div className="info-card">
            <GavelIcon />
            <h3>Terms & Conditions</h3>
            <p>Read our terms and conditions</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default InfoSection;
