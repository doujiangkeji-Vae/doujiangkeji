import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow footer__glow--blue"></div>
      <div className="footer__glow footer__glow--green"></div>
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <defs>
                  <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                <rect width="32" height="32" rx="8" fill="url(#footerLogoGrad)" />
                <path d="M8 16L14 10L20 16L14 22Z" fill="white" opacity="0.9" />
                <path d="M14 16L20 10L26 16L20 22Z" fill="white" opacity="0.6" />
              </svg>
              <span>豆姜科技</span>
            </div>
            <p className="footer__desc">
              智造未来，连接万物。豆姜科技致力于通过创新的物联网技术，为全球用户提供智能化的产品和解决方案。
            </p>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">产品服务</h4>
            <Link to="/products" className="footer__link">AI记忆助手</Link>
            <Link to="/products" className="footer__link">AI拾音工牌</Link>
            <Link to="/products" className="footer__link">AI标识</Link>
            <Link to="/products" className="footer__link">OpenClaw应用</Link>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">关于公司</h4>
            <Link to="/about" className="footer__link">公司介绍</Link>
            <Link to="/about" className="footer__link">团队成员</Link>
            <Link to="/news" className="footer__link">新闻资讯</Link>
            <Link to="/contact" className="footer__link">联系我们</Link>
            <Link to="/mail" className="footer__link">企业邮箱</Link>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__links-title">联系方式</h4>
            <p className="footer__contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              杭州市36C创业中心
            </p>
            <p className="footer__contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              17688885281（微信同号）
            </p>
            <p className="footer__contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              doujiangkeji@126.com
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; 2026 豆姜科技 DouJiang Technology. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#privacy">隐私政策</a>
            <a href="#terms">服务条款</a>
            <a href="#sitemap">网站地图</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
