
import React from "react";
import PageTitle from "@/components/PageTitle";
import "../../pageStyles/ReturnAndRefund.css";

const ReturnAndRefund = () => {
  return (
    <div className="return-and-refund-container">
      <PageTitle title="Return and Refund Policy" />
      <div className="return-and-refund-content">
        <h1>Return and Refund Policy for YaMart BD</h1>
        <hr />
        <p className="last-updated">Last Updated: January 9, 2026</p>

        <p>
          At YaMart BD, we are committed to providing high-quality products and
          excellent customer service. Please read our Return & Refund Policy
          carefully before making a purchase.
        </p>

        <h2>1. General Policy</h2>
        <ul>
          <li>
            Customers may request a return or exchange within <strong>3 days</strong> of
            receiving a product.
          </li>
          <li>
            All returns and exchanges must follow the procedures outlined in
            this policy.
          </li>
          <li>
            Products must be in original condition and packaging, unless
            defective or incorrect.
          </li>
        </ul>

        <h2>2. Unboxing Video Requirement</h2>
        <ul>
          <li>
            Please record a video while unboxing the product in front of the
            delivery agent.
          </li>
          <li>
            This video will serve as valid proof in case of missing, damaged,
            or defective items.
          </li>
          <li>
            Complaints without an unboxing video may not be accepted.
          </li>
        </ul>

        <h2>3. Exchange Policy</h2>
        <ul>
          <li>
            If you receive a wrong or defective product, report it within 7
            days.
          </li>
          <li>
            Do not use the product until the issue is resolved.
          </li>
          <li>Exchanges are subject to stock availability.</li>
          <li>
            For customer-requested exchanges (correct product received but want
            a different product), double shipping charges may apply.
          </li>
        </ul>

        <h2>4. Return Policy</h2>
        <ul>
          <li>
            <strong>Wrong or defective products:</strong> return immediately to the
            delivery agent. No additional charges apply.
          </li>
          <li>
            <strong>Returns due to change of mind, dissatisfaction, or unavailability:</strong>
            delivery charges apply as below:
            <ul>
              <li>Double courier charge (2X)</li>
              <li>Packaging fee: 50 BDT</li>
            </ul>
          </li>
          <li>
            Used, washed, or unsealed products are{" "}
            <strong>non-refundable and non-exchangeable</strong>.
          </li>
          <li>
            Accessories found defective can be exchanged within 7 days.
          </li>
        </ul>

        <h2>5. Refund Process</h2>
        <ul>
          <li>
            Refunds (for online payments) will be processed after verification
            at our warehouse.
          </li>
          <li>
            The refund timeline is <strong>7–15 working days</strong> after receipt
            and verification of the returned item.
          </li>
          <li>
            <strong>COD refunds:</strong> replacements are provided; monetary refunds
            are processed only if online payment was used.
          </li>
        </ul>

        <h2>6. Required Procedure</h2>
        <ul>
          <li>
            All return or exchange requests{" "}
            <strong>must be submitted via our official form</strong>.
            <div className="exchange-form-button-container">
              <a href="https://forms.gle/dmugbsAWvDnpH6MK7" target="_blank" rel="noopener noreferrer" className="cta-button">
                Fill Out Exchange Form
              </a>
            </div>
          </li>
          <li>
            Include the order number, reason for return, and unboxing video
            link.
          </li>
          <li>
            Verbal requests with delivery agents will not be accepted.
          </li>
        </ul>

        <h2>7. Shipping Charges & Packaging Fees</h2>
        <ul>
          <li>
            Customer-requested returns or exchanges may incur:
            <ul>
              <li>Double courier charge (2X)</li>
              <li>Packaging fee: 50 BDT</li>
            </ul>
          </li>
        </ul>

        <h2>8. Contact Information</h2>
        <p>
          For any questions or concerns regarding returns or refunds, please
          contact us:
        </p>
        <p>
          <strong>YaMart BD</strong>
          <br />
          Naogaon, Rajshahi, Bangladesh
          <br />
          Email: yamartbd@gmail.com
          <br />
          Phone: +8807516143874
        </p>
      </div>
    </div>
  );
};

export default ReturnAndRefund;
