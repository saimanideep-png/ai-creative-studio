import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Contact.css';

const Contact: React.FC = () => {
  const { ref, className } = useScrollReveal<HTMLDivElement>();

  return (
    <section id="contact" className="section">
      <div ref={ref} className={`section__inner ${className}`}>
      <span className="section__label">Get In Touch</span>
      <h2 className="section__title">Let's Connect</h2>

      <div className="contact__content">
        {/* Terminal Card */}
        <div className="terminal scroll-reveal" id="contact-terminal">
          <div className="terminal__titlebar">
            <span className="terminal__dot terminal__dot--red" />
            <span className="terminal__dot terminal__dot--yellow" />
            <span className="terminal__dot terminal__dot--green" />
            <span className="terminal__title">terminal</span>
          </div>

          <div className="terminal__body">
            <p className="terminal__line terminal__line--command">
              $ connect --with saimanideep
            </p>
            <p className="terminal__line">
              &gt; Ready. Choose your channel:
            </p>
            <p className="terminal__line">
              → email{' '}
              <a
                id="contact-email"
                className="terminal__link"
                href="mailto:saimanideep369@gmail.com"
              >
                saimanideep369@gmail.com
              </a>
            </p>
            <p className="terminal__line">
              → linkedin{' '}
              <a
                id="contact-linkedin"
                className="terminal__link"
                href="https://www.linkedin.com/in/rachamadugusaimanideep/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/rachamadugusaimanideep
              </a>
            </p>
            <p className="terminal__line">
              → github{' '}
              <a
                id="contact-github"
                className="terminal__link"
                href="https://github.com/manideep963"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/manideep963
              </a>
            </p>
            <span className="terminal__cursor" aria-hidden="true">█</span>
          </div>
        </div>

        {/* Contact Form */}
        <form
          id="contact-form"
          className="contact-form scroll-reveal"
          action="mailto:saimanideep369@gmail.com"
          method="post"
          encType="text/plain"
        >
          <input
            id="contact-name"
            className="contact-form__input"
            type="text"
            name="name"
            placeholder="Name"
            required
            aria-label="Your name"
          />
          <input
            id="contact-email-input"
            className="contact-form__input"
            type="email"
            name="email"
            placeholder="Email"
            required
            aria-label="Your email address"
          />
          <textarea
            id="contact-message"
            className="contact-form__textarea"
            name="message"
            placeholder="Message"
            required
            aria-label="Your message"
          />
          <button id="contact-submit" className="contact-form__submit" type="submit">
            Send Message
          </button>
          <p className="contact-form__note">Opens your email client</p>
        </form>
      </div>
      </div>
    </section>
  );
};

export default Contact;
