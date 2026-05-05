import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

export default function NotFound() {
  const { lang } = useLanguage();
  const prefix = lang === 'zh' ? '/cn' : '';
  const isZh = lang === 'zh';

  return (
    <div className="page" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #f8f7ff 0%, #eef2ff 100%)'
    }}>
      <div style={{ padding: '40px 20px' }}>
        <div style={{
          fontSize: '160px',
          fontWeight: '800',
          lineHeight: '1',
          background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px',
          letterSpacing: '-4px'
        }}>
          404
        </div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '600',
          color: '#1a1a2e',
          marginBottom: '12px'
        }}>
          {isZh ? '页面未找到' : 'Page Not Found'}
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#888',
          marginBottom: '40px',
          maxWidth: '400px',
          margin: '0 auto 40px'
        }}>
          {isZh
            ? '抱歉，您访问的页面不存在或已被移除。请检查网址是否正确，或返回首页。'
            : 'Sorry, the page you are looking for does not exist or has been removed. Please check the URL or return to the homepage.'}
        </p>
        <Link
          to={prefix || '/'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '14px 32px',
            borderRadius: '8px',
            backgroundColor: '#4f46e5',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#4338ca';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(79, 70, 229, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#4f46e5';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(79, 70, 229, 0.3)';
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {isZh ? '返回首页' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
}
