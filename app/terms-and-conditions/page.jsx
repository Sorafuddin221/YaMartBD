import React from 'react';
import PageTitle from '@/components/PageTitle';
import Link from 'next/link';
import '@/pageStyles/TermsAndConditions.css';

const TermsAndConditions = () => {
    return (
        <>
            <PageTitle title="Terms and Conditions" />
            <div className="terms-and-conditions-container">
                <h1>Terms and Conditions – YaMart BD</h1>
                <p><strong>Last Updated: December 6, 2025</strong></p>

                <h2>1. Agreement to Terms</h2>
                <p>
                    These Terms and Conditions constitute a legally binding agreement between you (“you”) and YaMart BD (“we”, “us”, or “our”) regarding your use of our website and related services (collectively, the “Site”). By accessing or using the Site, you agree to comply with these Terms. If you do not agree, you must stop using the Site immediately.
                </p>
                
                <h2>2. Intellectual Property Rights</h2>
                <p>
                    All content on the Site, including text, images, videos, graphics, logos, software, and designs (collectively “Content”), are owned by or licensed to YaMart BD and are protected under copyright, trademark, and other intellectual property laws of Bangladesh. You may not use, copy, modify, or distribute the Content without our written permission.
                </p>

                <h2>3. User Representations</h2>
                <p>By using the Site, you agree that you::</p>
                <ul>
                    <li>All registration information you submit will be true, accurate, current, and complete.</li>
                    <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                    <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
                    <li>You will not use the Site for any illegal or unauthorized purpose.</li>
                    <li>Your use of the Site will not violate any applicable law or regulation.</li>
                </ul>

                <h2>4. Products</h2>
                <p>
                   We strive to display products accurately, including colors, features, and specifications. However, display may vary, and we do not guarantee 100% accuracy. Product availability is not guaranteed, and we may discontinue or change products and prices at any time.
                </p>

                <h2>5. Purchases and Payment</h2>
                <p>We accept the following forms of payment:</p>
                <ul>
                    <li>We currently accept **Cash on Delivery (COD)**.  </li>
                    <li>  If online payments (e.g., bKash, Nagad) are added in the future, payments will be processed securely through third-party providers. We do not store payment details. </li>
                    <li>You agree to provide accurate account and contact information for purchases. </li>
                    <li>All prices are in Bangladeshi Taka (BDT) and may include applicable taxes. </li>
                
                </ul>
                <h2>6. Return & Exchange Policy</h2>
                <p>
                    Please refer to our<strong> <Link href="/return-and-refund">Return and Refund Policy</Link> </strong>for detailed information on returns and exchanges.
                </p>

                <h2>7. Prohibited Activities</h2>
                <p>You may not use the Site for any unauthorized commercial purpose or activity not approved by YaMart BD.</p>

                <h2>8. Governing Law</h2>
                <p>
                   These Terms are governed by and construed under the laws of Bangladesh. Any dispute will be resolved under Bangladesh law.
                </p>

                <h2>9. Disclaimer</h2>
                <p>
                    The Site is provided “as-is” and “as-available”. We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement. Use the Site at your own risk.
                </p>

                <h2>10. Limitation of Liability</h2>
                <p>
                   To the fullest extent permitted by law, YaMart BD and its employees, directors, and agents are not liable for any damages arising from use of the Site, including lost profits, lost data, or other losses, even if advised of the possibility.
                    </p>

                <h2>11. Contact Us</h2>
                <p>
                    In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
                </p>
                <p>
                    YaMart BD<br />
                    Gazipur,Dhaka, Bangladesh<br />
                    yamartbd@gmail.com<br />
                    07516143874
                </p>
            </div>
        </>
    );
};

export default TermsAndConditions;
