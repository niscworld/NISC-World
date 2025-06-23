import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="policy-page" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Refund Policy</h1>
      <p><strong>Effective Date:</strong> 23/06/2025</p>
      <p><strong>Company:</strong> NAKSH INNOVATIVE SOLUTIONS CONSULTANCY (NISC)</p>
      <p><strong>Location:</strong> India</p>

      <hr />

      <h2>1. Overview</h2>
      <p>
        At NISC, we strive to deliver high-quality software solutions and services. This Refund Policy outlines
        the conditions under which refunds may be issued for our paid services.
      </p>

      <h2>2. Eligibility for Refunds</h2>
      <p>Refunds may be considered under the following circumstances:</p>
      <ul>
        <li>Technical Issues: If the service fails to function as described and our support team is unable to resolve the issue within a reasonable time.</li>
        <li>Duplicate Payments: If you are accidentally charged more than once for the same service.</li>
        <li>Service Not Delivered: If a paid service was not provided as agreed upon in the service contract.</li>
      </ul>

      <h2>3. Non-Refundable Situations</h2>
      <p>Refunds will not be issued in the following cases:</p>
      <ul>
        <li>Change of mind after service initiation.</li>
        <li>Failure to use the service due to user-side issues (e.g., device incompatibility).</li>
        <li>Services that have already been fully delivered or consumed.</li>
        <li>Custom software development or consulting services once work has commenced.</li>
      </ul>

      <h2>4. Refund Request Process</h2>
      <p>To request a refund, please contact us at <strong>[Insert Email]</strong> with:</p>
      <ul>
        <li>Your full name and contact details.</li>
        <li>The service purchased and date of transaction.</li>
        <li>Reason for the refund request.</li>
      </ul>
      <p>We will review your request and respond within 7 business days.</p>

      <h2>5. Refund Method and Timeline</h2>
      <p>
        Approved refunds will be processed to the original payment method within 10–15 business days,
        depending on your bank or payment provider.
      </p>

      <h2>6. Trial Periods and Subscriptions</h2>
      <p>If a free trial is offered, no charges will be made until the trial ends. For subscription-based services:</p>
      <ul>
        <li>You may cancel anytime before the next billing cycle.</li>
        <li>No partial refunds will be issued for unused time in a billing period.</li>
      </ul>

      <h2>7. Contact</h2>
      <p>For any questions regarding this policy, please reach out to:</p>
      <p>
        📧 <strong>support@nisc.co.in</strong><br />
        {/* 📞 <strong>[Insert Phone Number]</strong> */}
      </p>
    </div>
  );
};

export default RefundPolicy;
