import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import './OfferLetter.css';
import niscBanner from './assets/nisc_banner.png';
import stamp from './assets/stamp.png';
import API from '../../../api/MainApi';
import logo from "./assets/logo.png";
import { toast } from 'react-toastify';

const OfferLetter = () => {
  const [internId, setInternId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [showSendConfirmation, setShowSendConfirmation] = useState(false);

  const [offerData, setOfferData] = useState({
    fullname: '',
    email: '',
    internshipTitle: '',
    stipend: '',
    location: '',
    duration: '',
    hrName: '',
    hrId: '',
    offerDate: new Date().toLocaleDateString('en-GB')
  });

  const fetchInternDetails = async () => {
    if (!internId) {
      setErrors({ internId: 'Intern ID is required' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API.GET_OFFER_LETTER_DETAILS}/${internId}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to fetch details');

      setOfferData({
        fullname: data.fullname,
        email: data.email,
        internshipTitle: data.internship_title,
        stipend: data.stipend,
        location: data.location,
        duration: data.duration,
        hrName: data.hr_name,
        hrId: data.hr_id,
        offerDate: new Date().toLocaleDateString('en-GB')
      });
      setErrors({});
    } catch (error) {
      toast.error(error.message);
      setErrors({ internId: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const generatePDF = (forPreview = false) => {
    const element = document.getElementById('offer-letter');
    const opt = {
      margin: [10, 10],
      filename: `NISC_Internship_Offer_${offerData.fullname.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        scrollY: 0,
        letterRendering: true,
        useCORS: true,
        allowTaint: true,
        width: 794,
        height: 1123
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait'
      },
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy'] 
      }
    };

    if (forPreview) {
      return html2pdf().set(opt).from(element).outputPdf('bloburl');
    }
    return html2pdf().set(opt).from(element).save();
  };

  const sendOfferLetter = async () => {
    setIsLoading(true);
    
    try {
      const element = document.getElementById('offer-letter');
      const opt = {
        margin: [10, 10],
        filename: `NISC_Internship_Offer_${offerData.fullname.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          scrollY: 0,
          letterRendering: true,
          useCORS: true,
          allowTaint: true,
          width: 794,
          height: 1123
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait'
        }
      };

      const pdfBlob = await html2pdf().set(opt).from(element).output('blob');

      const formData = new FormData();
      formData.append('intern_id', internId);
      
      const pdfFile = new File(
        [pdfBlob], 
        `NISC_Offer_${offerData.fullname.replace(/\s+/g, '_')}.pdf`,
        { type: 'application/pdf' }
      );
      formData.append('pdf_file', pdfFile);

      const response = await fetch(API.SEND_OFFER_LETTER, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to send offer letter');
      }

      toast.success('Offer letter sent successfully!');
      setShowSendConfirmation(false);
      
    } catch (error) {
      console.error('Error sending offer letter:', error);
      toast.error(error.message || 'Failed to send offer letter');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="offer-letter-container">
      <div className="form-section">
        <h2>Generate Offer Letter</h2>
        
        <div className={`form-group ${errors.internId ? 'has-error' : ''}`}>
          <label>Intern ID:</label>
          <input
            type="text"
            value={internId}
            onChange={(e) => setInternId(e.target.value)}
            placeholder="Enter intern ID"
          />
          {errors.internId && <span className="error-message">{errors.internId}</span>}
        </div>

        <button 
          className="fetch-btn"
          onClick={fetchInternDetails}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Fetch Details'}
        </button>

        {offerData.fullname && (
          <>
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                value={offerData.fullname}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Internship Title:</label>
              <input
                type="text"
                value={offerData.internshipTitle}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Stipend:</label>
              <input
                type="text"
                value={offerData.stipend}
                onChange={(e) => setOfferData({...offerData, stipend: e.target.value})}
              />
            </div>

            <div className="button-group">
              <button 
                className="download-btn"
                onClick={() => generatePDF()}
              >
                Download PDF
              </button>
              
              <button 
                className="send-btn"
                onClick={() => setShowSendConfirmation(true)}
              >
                Send via Email
              </button>
            </div>
          </>
        )}
      </div>

      <div id="offer-letter" className="offer-letter">
  <div className="letter-content">
    {/* Watermark placed here - will be centered within letter-content */}
    <div className='watermark'>
      <img src={logo} alt="Company Watermark" />
    </div>
          <div className="banner">
            <img src={niscBanner} alt="NISC Banner" />
            <div className="header-line"></div>
          </div>
          
          <div className="letter-body">
            <div className="letter-head">
              <h1>INTERNSHIP OFFER LETTER</h1>
              <p className="ref-no">Ref: NISC/INTERN/{internId}</p>
            </div>
            
            <p className="date">Date: {offerData.offerDate}</p>
            
            <p className="salutation">Dear {offerData.fullname},</p>
            
            <p className="para">
              We are pleased to offer you the position of <strong>Intern</strong> at NISC for the {offerData.internshipTitle} program. 
              This internship is designed to provide you with professional experience in your chosen field.
            </p>
            
            <div className="terms-section">
              <h2>TERMS OF INTERNSHIP</h2>
              
              <div className="term-row">
                <span className="term-label">Internship Duration:</span>
                <span className="term-value">{offerData.duration}</span>
              </div>
              
              <div className="term-row">
                <span className="term-label">Location:</span>
                <span className="term-value">{offerData.location}</span>
              </div>
              
              <div className="term-row">
                <span className="term-label">Stipend:</span>
                <span className="term-value">{offerData.stipend}</span>
              </div>
            </div>
            
            <h3>Internship Responsibilities:</h3>
            <ul className="responsibilities">
              <li>Work on assigned projects under the guidance of your mentor</li>
              <li>Participate in team meetings and project discussions</li>
              <li>Complete assigned tasks within given timelines</li>
              <li>Maintain professional conduct and adhere to company policies</li>
            </ul>
            
            <p className="para">
              This internship offer is contingent upon your acceptance and agreement to abide by all company policies, 
              including confidentiality and intellectual property agreements.
            </p>
            
            <p className="para">
              We believe this opportunity will provide valuable professional experience and contribute to your career growth. 
              We look forward to your positive contributions to our team.
            </p>
            
            <p className="closing">Sincerely,</p>
            
            <div className="signatures">
              <div className="signature-block">
                <div className="signature-image">
                  <img src={`./src/assets/${offerData.hrId}.png`} alt="HR Signature" />
                  <img src={stamp} className="stamp" alt="Company Stamp" />
                </div>
                <p>{offerData.hrName} (HR)</p>
                <p>NISC</p>
              </div>
              
              <div className="signature-block">
                <div className="signature-image">
                  <img src={`./src/assets/sign.png`} alt="CEO Signature" />
                  <img src={stamp} className="stamp" alt="Company Stamp" />
                </div>
                <p>Founder/CEO/CTO</p>
                <p>NISC</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSendConfirmation && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <h3>Confirm Sending Offer Letter</h3>
            <p>Are you sure you want to send this offer letter to {offerData.email}?</p>
            <div className="modal-buttons">
              <button onClick={() => setShowSendConfirmation(false)}>Cancel</button>
              <button 
                className="confirm-send"
                onClick={sendOfferLetter}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Confirm Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferLetter;