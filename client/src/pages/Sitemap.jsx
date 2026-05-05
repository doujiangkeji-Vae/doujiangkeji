import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

export default function Sitemap() {
  const { lang } = useLanguage();
  const prefix = lang === 'zh' ? '/cn' : '';

  const isZh = lang === 'zh';

  const mainPages = [
    { path: '/', labelZh: '首页', labelEn: 'Home' },
    { path: '/products', labelZh: '产品中心', labelEn: 'Products' },
    { path: '/news', labelZh: '资讯中心', labelEn: 'News' },
    { path: '/about', labelZh: '关于我们', labelEn: 'About Us' },
    { path: '/contact', labelZh: '联系我们', labelEn: 'Contact Us' },
  ];

  const legalPages = [
    { path: '/privacy', labelZh: '隐私政策', labelEn: 'Privacy Policy' },
    { path: '/terms', labelZh: '服务条款', labelEn: 'Terms of Service' },
  ];

  return (
    <div className="page">
      <section className="section" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="container">
          <h1 className="section-title">{isZh ? '网站地图' : 'Sitemap'}</h1>
          <p style={{ color: '#888', marginBottom: '48px', fontSize: '16px', textAlign: 'center' }}>
            {isZh ? '以下是豆姜科技网站的所有页面链接' : 'Below are all page links of the Doujiang Technology website'}
          </p>

          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {/* Main Pages */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1a1a2e',
                marginBottom: '20px',
                paddingBottom: '8px',
                borderBottom: '2px solid #4f46e5'
              }}>
                {isZh ? '主要页面' : 'Main Pages'}
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {mainPages.map((page) => (
                  <li key={page.path} style={{ marginBottom: '12px' }}>
                    <Link
                      to={prefix + page.path}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: '#4f46e5',
                        fontSize: '16px',
                        fontWeight: '500',
                        backgroundColor: '#f8f7ff',
                        border: '1px solid #e8e5ff',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#4f46e5';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.borderColor = '#4f46e5';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f7ff';
                        e.currentTarget.style.color = '#4f46e5';
                        e.currentTarget.style.borderColor = '#e8e5ff';
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '12px', flexShrink: 0 }}>
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      {isZh ? page.labelZh : page.labelEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Pages */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1a1a2e',
                marginBottom: '20px',
                paddingBottom: '8px',
                borderBottom: '2px solid #4f46e5'
              }}>
                {isZh ? '法律信息' : 'Legal Information'}
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {legalPages.map((page) => (
                  <li key={page.path} style={{ marginBottom: '12px' }}>
                    <Link
                      to={prefix + page.path}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: '#4f46e5',
                        fontSize: '16px',
                        fontWeight: '500',
                        backgroundColor: '#f8f7ff',
                        border: '1px solid #e8e5ff',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#4f46e5';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.borderColor = '#4f46e5';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f7ff';
                        e.currentTarget.style.color = '#4f46e5';
                        e.currentTarget.style.borderColor = '#e8e5ff';
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '12px', flexShrink: 0 }}>
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                      {isZh ? page.labelZh : page.labelEn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
