import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from '../components/ScrollAnimation';
import { useCountUp, useScrollAnimation } from '../hooks/useAnimations';
import { products, newsArticles } from '../data/mockData';
import { useLanguage, t } from '../i18n';
import './Home.css';

function Home() {
  const { lang } = useLanguage();
  const prefix = lang === 'zh' ? '/cn' : '';
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const stats = [
    { value: 2026, suffix: '', label: t(lang, 'home.stat1'), isYear: true },
    { value: 1, suffix: '', label: t(lang, 'home.stat2') },
    { value: 100, suffix: '+', label: t(lang, 'home.stat3') },
    { value: 3, suffix: '', label: t(lang, 'home.stat4') }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__grid-lines"></div>
          <div className="hero__glow hero__glow--1"></div>
          <div className="hero__glow hero__glow--2"></div>
          <div className="hero__particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="hero__particle" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}></div>
            ))}
          </div>
        </div>
        <div className="hero__content container">
          <div className="hero__badge">
            <span className="hero__badge-dot"></span>
            {t(lang, 'home.badge')}
          </div>
          <h1 className="hero__title hero__title--large">
            {t(lang, 'home.title1')}{' '}
            <span className="hero__title-accent">{t(lang, 'home.title2')}</span>
          </h1>
          <p className="hero__subtitle">
            {t(lang, 'home.subtitle')}
          </p>
          <div className="hero__actions">
            <Link to={`${prefix}/products`} className="btn btn-primary">
              {t(lang, 'home.exploreProducts')}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to={`${prefix}/about`} className="btn btn-outline">
              {t(lang, 'home.learnMore')}
            </Link>
          </div>
          <div className="hero__stats">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section home-products">
        <div className="container">
          <ScrollAnimation>
            <h2 className="section-title">{t(lang, 'home.coreProducts')}</h2>
            <p className="section-subtitle">{t(lang, 'home.coreProductsDesc')}</p>
          </ScrollAnimation>
          <div className="home-products__grid">
            {products.slice(0, 4).map((product, index) => (
              <ScrollAnimation key={product.id} delay={index * 100}>
                <div className="product-card">
                  <div className="product-card__icon">
                    <ProductIcon category={product.category} />
                  </div>
                  <h3 className="product-card__name">{product.name}</h3>
                  <p className="product-card__brief">{product.brief}</p>
                  <div className="product-card__features">
                    {product.features.slice(0, 3).map((f, i) => (
                      <span key={i} className="product-card__tag">{f}</span>
                    ))}
                  </div>
                  <Link to={`${prefix}/products`} className="product-card__link">
                    {t(lang, 'home.viewDetails')}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </ScrollAnimation>
            ))}
          </div>
          <ScrollAnimation>
            <div className="home-products__more">
              <Link to={`${prefix}/products`} className="btn btn-outline">
                {t(lang, 'home.viewAllProducts')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Stats Section - temporarily hidden
      <section className="section home-stats">
        <div className="home-stats__bg">
          <div className="home-stats__glow home-stats__glow--blue"></div>
          <div className="home-stats__glow home-stats__glow--green"></div>
        </div>
        <div className="container">
          <ScrollAnimation>
            <h2 className="section-title">{t(lang, 'home.dataTitle')}</h2>
            <p className="section-subtitle">{t(lang, 'home.dataDesc')}</p>
          </ScrollAnimation>
          <div className="home-stats__grid">
            {[
              { value: 8, suffix: '亿+', label: '累计融资', icon: '💰' },
              { value: 50, suffix: '亿', label: '公司估值', icon: '📈' },
              { value: 5000, suffix: '万+', label: '接入设备', icon: '🔌' },
              { value: 65, suffix: '+', label: '覆盖国家', icon: '🌍' }
            ].map((stat, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="stat-card">
                  <div className="stat-card__icon">{stat.icon}</div>
                  <div className="stat-card__value">
                    <CountUpNumber end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="stat-card__label">{stat.label}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* News Section */}
      <section className="section home-news">
        <div className="container">
          <ScrollAnimation>
            <h2 className="section-title">{t(lang, 'home.newsTitle')}</h2>
            <p className="section-subtitle">{t(lang, 'home.newsDesc')}</p>
          </ScrollAnimation>
          <div className="home-news__grid">
            {newsArticles.slice(0, 3).map((article, index) => (
              <ScrollAnimation key={article.id} delay={index * 100}>
                <Link to={`${prefix}/news/${article.id}`} className="news-card">
                  <div className="news-card__category">{article.category[lang] || article.category}</div>
                  <h3 className="news-card__title">{article.title[lang] || article.title}</h3>
                  <p className="news-card__summary">{article.summary[lang] || article.summary}</p>
                  <div className="news-card__meta">
                    <span className="news-card__date">{article.date}</span>
                    {article.source && <span className="news-card__source">{article.source[lang] || article.source}</span>}
                    <span className="news-card__read-more">
                      {t(lang, 'home.readMore')}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
          <ScrollAnimation>
            <div className="home-news__more">
              <Link to={`${prefix}/news`} className="btn btn-outline">
                {t(lang, 'home.viewAllNews')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Newsletter / Contact Section */}
      <section className="section home-newsletter">
        <div className="container">
          <ScrollAnimation>
            <div className="newsletter">
              <div className="newsletter__glow"></div>
              <h2 className="newsletter__title">{t(lang, 'home.subscribeTitle')}</h2>
              <p className="newsletter__desc">{t(lang, 'home.subscribeDesc')}</p>
              <div className="newsletter__form">
                <input
                  type="email"
                  placeholder={t(lang, 'home.subscribePlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter__input"
                />
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (email) {
                      setSubscribed(true);
                      setEmail('');
                      setTimeout(() => setSubscribed(false), 3000);
                    }
                  }}
                >
                  {subscribed ? t(lang, 'home.subscribed') : t(lang, 'home.subscribeBtn')}
                </button>
              </div>
              {subscribed && (
                <p className="newsletter__success">{t(lang, 'home.subscribeSuccess')}</p>
              )}
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}

function StatCard({ stat }) {
  return (
    <div className="hero-stat">
      <span className="hero-stat__value">
        {stat.isYear ? stat.value : stat.value}
        {stat.suffix}
      </span>
      <span className="hero-stat__label">{stat.label}</span>
    </div>
  );
}

function CountUpNumber({ end, suffix = '' }) {
  const [count, setRunning] = useCountUp(end, 2000);
  const [ref, isVisible] = useScrollAnimation();

  useEffect(() => {
    if (isVisible) setRunning(true);
  }, [isVisible, setRunning]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

function ProductIcon({ category }) {
  const icons = {
    'AI记忆助手': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <circle cx="6" cy="6" r="1" fill="currentColor" />
        <circle cx="6" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
    'AI拾音工牌': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    'AI标识': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    'AI穿戴式硬件': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    'AI定位追踪': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
    'OpenClaw应用': (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
      </svg>
    )
  };
  return icons[category] || icons['AI记忆助手'];
}

export default Home;
