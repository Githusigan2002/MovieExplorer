import React from "react";

export const Footer = () => {
  return (
    <footer className="netflix-footer">
      <div className="container-fluid max-w-1200 px-3 px-md-5">
        <div className="mb-4 d-flex align-items-center gap-3 fs-5 text-secondary">
          <i className="bi bi-facebook cursor-pointer hover-white"></i>
          <i className="bi bi-instagram cursor-pointer hover-white"></i>
          <i className="bi bi-twitter-x cursor-pointer hover-white"></i>
          <i className="bi bi-youtube cursor-pointer hover-white"></i>
        </div>

        <div className="footer-links-grid">
          <a href="#faq" className="footer-link">Audio Description</a>
          <a href="#help" className="footer-link">Help Center</a>
          <a href="#gift" className="footer-link">Gift Cards</a>
          <a href="#media" className="footer-link">Media Center</a>
          <a href="#investor" className="footer-link">Investor Relations</a>
          <a href="#jobs" className="footer-link">Jobs</a>
          <a href="#terms" className="footer-link">Terms of Use</a>
          <a href="#privacy" className="footer-link">Privacy</a>
          <a href="#legal" className="footer-link">Legal Notices</a>
          <a href="#cookies" className="footer-link">Cookie Preferences</a>
          <a href="#corporate" className="footer-link">Corporate Information</a>
          <a href="#contact" className="footer-link">Contact Us</a>
        </div>

        <div className="mb-3">
          <button className="btn btn-outline-secondary btn-sm text-light px-3 py-1">
            <i className="bi bi-globe me-2"></i> English
          </button>
        </div>

        <p className="small text-secondary mb-0">
          &copy; 2025 MovieExplorer, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};