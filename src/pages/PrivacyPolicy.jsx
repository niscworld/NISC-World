import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="policy-page" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Privacy Policy</h1>
      <p><strong>Effective Date:</strong> 23/06/2025</p>
      <p><strong>Company:</strong> NAKSH INNOVATIVE SOLUTIONS CONSULTANCY (NISC)</p>
      <p><strong>Location:</strong> India</p>

      <hr />

      <h2>1. Introduction</h2>
      <p>
        This Privacy Policy explains how NISC collects, uses, discloses, and protects your personal information
        when you use our website, mobile apps, and software services. By accessing our services, you agree to
        the terms of this policy.
      </p>

      <h2>2. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, billing details (only after client registration).</li>
        <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage data.</li>
        <li><strong>Cookies and Tracking:</strong> We use cookies to enhance user experience and analyze traffic.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use your data to:</p>
      <ul>
        <li>Provide and improve our services.</li>
        <li>Communicate with you regarding updates, support, or promotions.</li>
        <li>Process payments and manage subscriptions.</li>
        <li>Ensure security and prevent fraud.</li>
      </ul>

      <h2>4. Sharing of Information</h2>
      <p>
        We do not sell your personal data. However, we may share it with:
      </p>
      <ul>
        <li>Trusted third-party service providers (e.g., payment gateways, analytics tools).</li>
        <li>Legal authorities, if required by law or to protect our rights.</li>
      </ul>

      <h2>5. Data Security</h2>
      <p>
        We implement industry-standard security measures to protect your data. However, no method of
        transmission over the internet is 100% secure.
      </p>

      <h2>6. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access or update your personal information.</li>
        <li>Request deletion of your data.</li>
        <li>Withdraw consent at any time (where applicable).</li>
      </ul>
      <p>To exercise these rights, contact us at: <strong>[Insert Contact Email]</strong></p>

      <h2>7. Cookies</h2>
      <p>
        We use cookies to personalize content and analyze site traffic. You can control cookie preferences
        through your browser settings.
      </p>

      <h2>8. Third-Party Links</h2>
      <p>
        Our services may contain links to external websites. We are not responsible for their privacy practices.
      </p>

      <h2>9. Children’s Privacy</h2>
      <p>
        We do not knowingly collect personal data from children under 18 without parental consent.
      </p>

      <h2>10. Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. Changes will be posted on this page with a revised
        effective date.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please contact us at:
      </p>
      <p>
        📧 <strong>support@nisc.co.in</strong><br />
        {/* 📞 <strong>[Insert Phone Number]</strong> */}
      </p>
    </div>
  );
};

export default PrivacyPolicy;
