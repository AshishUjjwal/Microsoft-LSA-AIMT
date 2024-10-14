import React, { useState } from 'react';
import styles from './ContactSection.module.css';
import { Link } from 'react-router-dom';

const ContactSection = () => {
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleFocus = (field) => {
    setFocus({ ...focus, [field]: true });
  };

  const handleBlur = (field) => {
    setFocus({ ...focus, [field]: false });
  };

  return (
    <div className={styles.contactSection}>
      <div className={styles.contact}>
        <h2>Contact Us</h2>
        <form className={styles.contactForm}>
          <label className={focus.name ? styles.focused : ''}>
            Name:
            <input
              type="text"
              name="name"
              onFocus={() => handleFocus('name')}
              onBlur={() => handleBlur('name')}
            />
          </label>
          <label className={focus.email ? styles.focused : ''}>
            Email:
            <input
              type="email"
              name="email"
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
            />
          </label>
          <label className={focus.message ? styles.focused : ''}>
            Message:
            <textarea
              name="message"
              onFocus={() => handleFocus('message')}
              onBlur={() => handleBlur('message')}
            ></textarea>
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
      <div className={styles.additionalInfo}>
        <h2>Additional Info</h2>
        <div className={styles.whatsapp}>
          
          <h3>Join WhatsApp Group</h3>
          {/* <a href="https://chat.whatsapp.com/your-group-link" target="_blank" rel="noopener noreferrer">
            <button>Join WhatsApp Group</button>
          </a> */}
        </div>
        <div className={styles.linkedin}>
          <h3>Follow Us on LinkedIn</h3>
          <p>Stay updated with our latest Events and Challenge.</p>
          {/* <a href="https://www.linkedin.com/company/your-company" target="_blank" rel="noopener noreferrer">
            <button>Follow LinkedIn Page</button>
          </a> */}
          <Link to="https://www.linkedin.com/company/your-company">Follow LinkedIn Page</Link>
        </div>
        <div className={styles.address}>
          <h3>Address</h3>
          <p>Lucknow, Uttar Pradesh, India</p>
          {/* <a href="https://www.linkedin.com/company/your-company" target="_blank" rel="noopener noreferrer">
            <button>Visit Map</button>
          </a> */}
          <Link to="https://www.linkedin.com/company/your-company">About</Link>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;