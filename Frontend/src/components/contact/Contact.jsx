import React from "react";
import "./Contact.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGoogle,
  FaUsers,
} from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="contact-container">
      <p className="contact-subtitle">CONTACT US</p>
      <h1 className="contact-title">WE READY FOR YOUR QUESTIONS</h1>

      <div className="contact-info">
        <div className="info-box">
          <FaMapMarkerAlt className="icon" />
          <h4>ADDRESS</h4>
          <p>
            No. 119/1, GNT Road, Vellore Market City, RedHills, Chennai - 52
            <br />
            (Opp to RedHills Police Station, Near CSI Church)
          </p>
        </div>

        <div className="info-box">
          <FaPhoneAlt className="icon" />
          <h4>PHONE</h4>
          <p>9600746966</p>
        </div>

        <div className="info-box">
          <FaEnvelope className="icon" />
          <h4>EMAIL</h4>
          <p>MANITEXTILESTHEGRANDSTORE@GMAIL.COM</p>
        </div>

        <div className="info-box">
          <FaUsers className="icon" />
          <h4>FOLLOW US</h4>
          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
            <FaGoogle />
          </div>
        </div>
      </div>

      <div className="map-container">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps?q=Redhills,%20Chennai&z=15&output=embed"
          width="100%"
          height="450"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      <div className="form-section">
        <h2>HAVE A QUESTIONS?</h2>
        <form className="contact-form">
          <div className="form-row">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
          </div>
          <div className="form-row">
            <input type="text" placeholder="Phone" />
            <input type="text" placeholder="Subject" />
          </div>
          <textarea placeholder="Your message" rows="6"></textarea>
          <button type="submit">SEND MESSAGE</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
