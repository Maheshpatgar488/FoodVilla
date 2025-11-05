import React, { useRef, useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react"; // ✅ npm install lucide-react
import emailjs from "emailjs-com";
import "./style.css";

const ContactForm = () => {
  const formRef = useRef();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_n6syu6t",      // ✅ your EmailJS service ID
        "template_otxd3cx",     // ✅ your EmailJS template ID
        formRef.current,        // ✅ actual form element
        "d5tvrbrPKwF4tPS9m"     // ✅ your public key
      )
      .then(() => {
        setSubmitted(true);
        e.target.reset(); // clear form after success
      })
      .catch((err) => {
        alert("❌ Error sending message: " + err.text);
      });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-card">
        <h2>Get in Touch</h2>
        <p className="contact-subtitle">
          Have a project in mind or just want to say hello?
          Reach out directly or fill out the form below!
        </p>

        {/* Contact Info */}
        <div className="contact-info">
          <div className="info-box">
            <Mail size={28} className="info-icon" />
            <div>
              <h4>Email</h4>
              <p>maheshpatgar14@gmail.com</p>
            </div>
          </div>

          <div className="info-box">
            <Phone size={28} className="info-icon" />
            <div>
              <h4>Phone</h4>
              <p>+91 1234567890</p>
            </div>
          </div>

          <div className="info-box">
            <MapPin size={28} className="info-icon" />
            <div>
              <h4>Location</h4>
              <p>Mumbai, India</p>
            </div>
          </div>
        </div>

        {submitted && (
          <p className="success-msg">✅ Thank you! Your message has been sent.</p>
        )}

        {/* Form */}
        <form ref={formRef} className="contact-form" onSubmit={handleSubmit} >
          <div className="form-left">
            <div className="form-group">
              <label htmlFor="from_name">Full Name</label>
              <input
                type="text"
                id="from_name"
                name="from_name"   // ✅ must match EmailJS variable
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reply_to">Email Address</label>
              <input
                type="email"
                id="reply_to"
                name="reply_to"   // ✅ must match EmailJS variable
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone No</label>
              <input
                type="text"
                id="phone"
                name="phone"      // ✅ must match EmailJS variable
                placeholder="Enter your number"
                maxLength={10}
                required
              />
            </div>
          </div>

          <div className="form-right">
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"   // ✅ must match EmailJS variable
                placeholder="Write your message"
                required
              />
            </div>
          </div>

          <div className="form-footer">
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
