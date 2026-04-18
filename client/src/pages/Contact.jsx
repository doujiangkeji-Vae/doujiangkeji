import { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from '../components/ScrollAnimation';
import './Contact.css';

function Contact() {
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
          <h1 className="contact-hero__title">联系我们</h1>
          <p className="contact-hero__subtitle">我们期待与您建立联系，共同探讨合作机会</p>
        </div>
      </section>

      <section className="section contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <ScrollAnimation animation="fadeInLeft">
              <div className="contact-form-wrapper">
                <h2 className="contact-form__title">发送留言</h2>
                <p className="contact-form__desc">填写以下表单，我们将在 24 小时内回复您</p>
                {submitted && (
                  <div className="contact-form__success">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    感谢您的留言！我们已收到您的信息，将尽快与您联系。
                  </div>
                )}
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form__row">
                    <div className="contact-form__group">
                      <label className="contact-form__label">姓名 *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="请输入您的姓名"
                        className="contact-form__input"
                        required
                      />
                    </div>
                    <div className="contact-form__group">
                      <label className="contact-form__label">邮箱 *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="请输入您的邮箱"
                        className="contact-form__input"
                        required
                      />
                    </div>
                  </div>
                  <div className="contact-form__group">
                    <label className="contact-form__label">电话</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="请输入您的联系电话"
                      className="contact-form__input"
                    />
                  </div>
                  <div className="contact-form__group">
                    <label className="contact-form__label">留言 *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="请输入您的留言内容..."
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
                    发送留言
                  </button>
                </form>
              </div>
            </ScrollAnimation>

            {/* Contact Info */}
            <ScrollAnimation animation="fadeInRight">
              <div className="contact-info">
                <h2 className="contact-info__title">公司信息</h2>
                <div className="contact-info__cards">
                  <div className="contact-info-card">
                    <div className="contact-info-card__icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="contact-info-card__title">公司地址</h4>
                      <p className="contact-info-card__text">杭州市36C创业中心</p>
                    </div>
                  </div>
                  <div className="contact-info-card">
                    <div className="contact-info-card__icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="contact-info-card__title">联系电话</h4>
                      <p className="contact-info-card__text">17688885281（微信同号）</p>
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
                      <h4 className="contact-info-card__title">电子邮箱</h4>
                      <p className="contact-info-card__text">doujiangkeji@126.com</p>
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
                      <h4 className="contact-info-card__title">工作时间</h4>
                      <p className="contact-info-card__text">周一至周五 9:00 - 18:00<br />周末及法定节假日休息</p>
                    </div>
                  </div>
                  <Link to="/mail" className="contact-info-card contact-info-card--mail">
                    <div className="contact-info-card__icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="contact-info-card__title">企业邮箱</h4>
                      <p className="contact-info-card__text">登录企业邮箱，收发邮件<br />高效沟通，协作无间 →</p>
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
                title="腾讯地图"
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
