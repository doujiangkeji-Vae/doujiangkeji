import { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from '../components/ScrollAnimation';
import { useLanguage, t } from '../i18n';
import './Contact.css';

function Contact() {
  const { lang } = useLanguage();
  const prefix = lang === 'zh' ? '/cn' : '';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="page-wrapper">
      <section className="contact-hero">
        <div className="contact-hero__bg">
          <div className="contact-hero__glow contact-hero__glow--1"></div>
          <div className="contact-hero__glow contact-hero__glow--2"></div>
        </div>
        <div className="container contact-hero__content">
          <h1 className="contact-hero__title">{t(lang, 'contact.title')}</h1>
          <p className="contact-hero__subtitle">{t(lang, 'contact.subtitle')}</p>
        </div>
      </section>

      <section className="section contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <ScrollAnimation animation="fadeInLeft">
              <div className="contact-form-wrapper">
                <h2 className="contact-form__title">{t(lang, 'contact.formTitle')}</h2>
                <p className="contact-form__desc">{t(lang, 'contact.formDesc')}</p>
                {submitted && (
                  <div className="contact-form__success">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    {t(lang, 'contact.submitSuccess')}
                  </div>
                )}
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form__row">
                    <div className="contact-form__group">
                      <label className="contact-form__label">{t(lang, 'contact.name')} *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t(lang, 'contact.namePlaceholder')}
                        className="contact-form__input"
                        required
                      />
                    </div>
                    <div className="contact-form__group">
                      <label className="contact-form__label">{t(lang, 'contact.email')} *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t(lang, 'contact.emailPlaceholder')}
                        className="contact-form__input"
                        required
                      />
                    </div>
                  </div>
                  <div className="contact-form__group">
                    <label className="contact-form__label">{t(lang, 'contact.phone')}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t(lang, 'contact.phonePlaceholder')}
                      className="contact-form__input"
                    />
                  </div>
                  <div className="contact-form__group">
                    <label className="contact-form__label">{t(lang, 'contact.message')} *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t(lang, 'contact.messagePlaceholder')}
                      rows="6"
                      className="contact-form__textarea"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary contact-form__submit">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    {t(lang, 'contact.submit')}
                  </button>
                </form>
              </div>
            </ScrollAnimation>

            {/* Contact Info */}
            <ScrollAnimation animation="fadeInRight">
              <div className="contact-info">
                <h2 className="contact-info__title">{t(lang, 'contact.infoTitle')}</h2>
                <div className="contact-info__cards">
                  <div className="contact-info-card">
                    <div className="contact-info-card__icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="contact-info-card__title">{t(lang, 'contact.address')}</h4>
                      <p className="contact-info-card__text">{t(lang, 'contact.addressText')}</p>
                    </div>
                  </div>
                  <div className="contact-info-card">
                    <div className="contact-info-card__icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="contact-info-card__title">{t(lang, 'contact.phoneTitle')}</h4>
                      <p className="contact-info-card__text">{t(lang, 'contact.phoneText')}</p>
                    </div>
                  </div>
                  <div className="contact-info-card">
                    <div className="contact-info-card__icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="contact-info-card__title">{t(lang, 'contact.emailTitle')}</h4>
                      <p className="contact-info-card__text">{t(lang, 'contact.emailText')}</p>
                    </div>
                  </div>
                  <div className="contact-info-card">
                    <div className="contact-info-card__icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="contact-info-card__title">{t(lang, 'contact.hours')}</h4>
                      <p className="contact-info-card__text">{t(lang, 'contact.hoursText')}</p>
                    </div>
                  </div>
                  <Link to={`${prefix}/mail`} className="contact-info-card contact-info-card--mail">
                    <div className="contact-info-card__icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="contact-info-card__title">{t(lang, 'contact.enterpriseEmail')}</h4>
                      <p className="contact-info-card__text">{t(lang, 'contact.enterpriseEmailDesc')}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Map */}
          <ScrollAnimation>
            <div className="contact-map">
              <iframe
                title={t(lang, 'contact.mapTitle')}
                src="https://apis.map.qq.com/tools/routeplan/?type=drive&to=杭州市36C创业中心&tocoordinate=30.279084,120.15507&referer=doujiang"
                width="100%"
                height="400"
                style={{ border: 'none', borderRadius: '12px' }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}

export default Contact;
