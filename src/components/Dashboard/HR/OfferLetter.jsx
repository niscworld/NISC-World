import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import './OfferLetter.css';
import niscBanner from './assets/nisc_banner.png';
import logo from './assets/logo.png';

const OfferLetter = () => {
  // State for dynamic values
  const [offerData, setOfferData] = useState({
    candidateName: 'KOPPOLU SRINIVAS CHARAN',
    offerDate: '04/07/2025',
    positionTitle: 'Intern',
    department: 'Database schema design',
    startDate: '05/07/25',
    endDate: '11/07/25',
    workingHours: 'flexible',
    location: 'Remote',
    stipend: 'Unpaid',
    projectName: 'MEDTRACK PRO'
  });

  // Update function for dynamic values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfferData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to download the offer letter as PDF
  const downloadOfferLetter = () => {
    const element = document.getElementById('offer-letter');
    
    // Clone the element to avoid modifying the original
    const clonedElement = element.cloneNode(true);
    
    // Make sure all text is black for the PDF
    clonedElement.querySelectorAll('*').forEach(el => {
      el.style.color = '#000000';
      el.style.fontFamily = 'Arial, sans-serif';
    });

    const opt = {
      margin: 10,
      filename: `NISC_OfferLetter_${offerData.candidateName}.pdf`,
      image: { 
        type: 'jpeg', 
        quality: 0.98 
      },
      html2canvas: { 
        scale: 2,
        logging: true,
        useCORS: true,
        allowTaint: true,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        hotfixes: ["px_scaling"]
      }
    };

    html2pdf()
      .set(opt)
      .from(clonedElement)
      .save();
  };

  return (
    <div className="offer-letter-container">
      <div className="form-section">
        <h2>Edit Offer Letter Details</h2>
        <div className="form-group">
          <label>Candidate Name:</label>
          <input
            type="text"
            name="candidateName"
            value={offerData.candidateName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Offer Date:</label>
          <input
            type="text"
            name="offerDate"
            value={offerData.offerDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Position Title:</label>
          <input
            type="text"
            name="positionTitle"
            value={offerData.positionTitle}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={offerData.department}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="text"
            name="startDate"
            value={offerData.startDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input
            type="text"
            name="endDate"
            value={offerData.endDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Working Hours:</label>
          <input
            type="text"
            name="workingHours"
            value={offerData.workingHours}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={offerData.location}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Stipend:</label>
          <input
            type="text"
            name="stipend"
            value={offerData.stipend}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Project Name:</label>
          <input
            type="text"
            name="projectName"
            value={offerData.projectName}
            onChange={handleInputChange}
          />
        </div>
        <button className="download-btn" onClick={downloadOfferLetter}>
          Download Offer Letter
        </button>
      </div>

      <div id="offer-letter" className="offer-letter">
        <div className="banner">
          <img src={niscBanner} alt="NISC Banner" />
        </div>
        <div className="watermark">
          <img src={logo} alt="NISC Logo" />
        </div>
        <div className="letter-content">
          <h1>INTERNSHIP OFFER LETTER</h1>
          <p className="date">Date: {offerData.offerDate}</p>
          <p className="salutation">Dear {offerData.candidateName},</p>
          
          <p>
            We are delighted to offer you the position of {offerData.positionTitle} at NISC. 
            This internship is an opportunity to work closely with our team on innovative 
            software projects while gaining valuable industry experience.
          </p>
          
          <h2>Internship Terms:</h2>
          <ul>
            <li><strong>Position Title:</strong> {offerData.positionTitle}</li>
            <li><strong>Department:</strong> {offerData.department}</li>
            <li><strong>Internship Period:</strong> {offerData.startDate} to {offerData.endDate}</li>
            <li><strong>Working Hours:</strong> {offerData.workingHours}</li>
            <li><strong>Location:</strong> {offerData.location}</li>
            <li><strong>Stipend:</strong> "{offerData.stipend}"</li>
          </ul>
          
          <h2>Your responsibilities will include:</h2>
          <ul>
            <li>
              Assisting in development, research, designing of Database schema design of {offerData.projectName}
            </li>
            <li>Participating in team meetings and contributing to project goals</li>
            <li>Completing tasks as assigned by the internship supervisor</li>
          </ul>
          
          <p>
            This offer is contingent upon your acceptance and agreement to abide by company
            policies and confidentiality terms.
          </p>
          
          <p>
            We look forward to your positive contribution to our team and hope this internship
            adds great value to your career journey.
          </p>
          
          <div className="signatures">
            <div className="signature">
              <p>_________________________</p>
              <p>Director of Development</p>
            </div>
            <div className="signature">
              <p>_________________________</p>
              <p>HR Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferLetter;