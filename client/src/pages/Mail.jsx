import { useState } from 'react';
import { useLanguage, t } from '../i18n';
import './Mail.css';

function Mail() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('login');

  const enterpriseEmail = 'yuzhiyu@doujiangai.cn';

  return (
    <div className="page-wrapper">
      <section className="mail-hero">
        <div className="container mail-hero__content">
          <h1 className="mail-hero__title">
            {lang === 'zh' ? '企业邮箱' : 'Enterprise Email'}
          </h1>
          <p className="mail-hero__subtitle">
            {lang === 'zh' ? '豆姜科技企业邮箱服务' : 'DouJiang Technology Enterprise Email'}
          </p>
        </div>
      </section>

      <section className="section mail-main">
        <div className="container">
          <div className="mail-login-wrapper">
            {/* Tabs */}
            <div className="mail-login-tabs">
              <button
                className={`mail-login-tab ${activeTab === 'login' ? 'mail-login-tab--active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                {lang === 'zh' ? '邮箱登录' : 'Email Login'}
              </button>
              <button
                className={`mail-login-tab ${activeTab === 'config' ? 'mail-login-tab--active' : ''}`}
                onClick={() => setActiveTab('config')}
              >
                {lang === 'zh' ? '邮箱配置' : 'Email Config'}
              </button>
            </div>

            {/* Login Tab */}
            {activeTab === 'login' && (
              <div className="mail-login-card">
                <div className="mail-login-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <h2 className="mail-login-title">
                  {lang === 'zh' ? '企业邮箱登录' : 'Enterprise Email Login'}
                </h2>
                <p className="mail-login-desc">
                  {lang === 'zh'
                    ? '发送到企业邮箱的邮件将自动转发到 126 邮箱'
                    : 'Emails sent to enterprise address will be forwarded to 126 mailbox'}
                </p>

                <div className="mail-login-info">
                  <div className="mail-login-info-item">
                    <span className="mail-login-info-label">
                      {lang === 'zh' ? '企业邮箱' : 'Enterprise Email'}
                    </span>
                    <span className="mail-login-info-value">{enterpriseEmail}</span>
                  </div>
                  <div className="mail-login-info-item">
                    <span className="mail-login-info-label">
                      {lang === 'zh' ? '转发到' : 'Forwarded to'}
                    </span>
                    <span className="mail-login-info-value">doujiangkeji@126.com</span>
                  </div>
                  <div className="mail-login-info-item">
                    <span className="mail-login-info-label">
                      {lang === 'zh' ? '状态' : 'Status'}
                    </span>
                    <span className="mail-login-info-value mail-login-status--pending">
                      {lang === 'zh' ? '待配置' : 'Pending Configuration'}
                    </span>
                  </div>
                </div>

                <div className="mail-login-actions">
                  <a
                    href="https://mail.126.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    {lang === 'zh' ? '登录 126 邮箱' : 'Login to 126 Email'}
                  </a>
                </div>

                <p className="mail-login-note">
                  {lang === 'zh'
                    ? '💡 请先完成域名邮箱转发配置，配置方法见"邮箱配置"标签页'
                    : '💡 Please complete email forwarding configuration first. See the "Email Config" tab for instructions.'}
                </p>
              </div>
            )}

            {/* Config Tab */}
            {activeTab === 'config' && (
              <div className="mail-login-card">
                <h2 className="mail-login-title">
                  {lang === 'zh' ? '腾讯企业邮箱配置' : 'Tencent Enterprise Email Setup'}
                </h2>
                <p className="mail-login-desc">
                  {lang === 'zh'
                    ? '已配置腾讯企业邮箱，使用 doujiangai.cn 域名'
                    : 'Tencent Enterprise Email configured with doujiangai.cn domain'}
                </p>

                <div className="mail-config-steps">
                  <div className="mail-config-step">
                    <div className="mail-config-step-number">1</div>
                    <div className="mail-config-step-content">
                      <h3>
                        {lang === 'zh' ? '登录腾讯企业邮箱' : 'Login to Tencent Enterprise Email'}
                      </h3>
                      <p>
                        {lang === 'zh'
                          ? '访问 exmail.qq.com，使用企业邮箱账号登录\n邮箱地址：yuzhiyu@doujiangai.cn'
                          : 'Visit exmail.qq.com and login with enterprise email\nEmail: yuzhiyu@doujiangai.cn'}
                      </p>
                    </div>
                  </div>

                  <div className="mail-config-step">
                    <div className="mail-config-step-number">2</div>
                    <div className="mail-config-step-content">
                      <h3>
                        {lang === 'zh' ? '网页版登录' : 'Web Login'}
                      </h3>
                      <p>
                        {lang === 'zh'
                          ? '直接在浏览器访问 exmail.qq.com 登录\n或使用 mail.doujiangai.cn（如已配置）'
                          : 'Login directly at exmail.qq.com\nOr use mail.doujiangai.cn (if configured)'}
                      </p>
                    </div>
                  </div>

                  <div className="mail-config-step">
                    <div className="mail-config-step-number">3</div>
                    <div className="mail-config-step-content">
                      <h3>
                        {lang === 'zh' ? '手机客户端配置' : 'Mobile Client Setup'}
                      </h3>
                      <p>
                        {lang === 'zh'
                          ? '下载 QQ邮箱 APP 或 Foxmail\n添加账号 → 选择腾讯企业邮箱 → 输入账号密码'
                          : 'Download QQ Mail APP or Foxmail\nAdd Account → Select Tencent Enterprise Email → Enter credentials'}
                      </p>
                    </div>
                  </div>

                  <div className="mail-config-step">
                    <div className="mail-config-step-number">4</div>
                    <div className="mail-config-step-content">
                      <h3>
                        {lang === 'zh' ? 'IMAP/SMTP 设置（第三方客户端）' : 'IMAP/SMTP Settings (Third-party Clients)'}
                      </h3>
                      <div className="mail-config-table">
                        <table>
                          <thead>
                            <tr>
                              <th>{lang === 'zh' ? '协议' : 'Protocol'}</th>
                              <th>{lang === 'zh' ? '服务器' : 'Server'}</th>
                              <th>{lang === 'zh' ? '端口' : 'Port'}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><code>IMAP</code></td>
                              <td><code>imap.exmail.qq.com</code></td>
                              <td><code>993 (SSL)</code></td>
                            </tr>
                            <tr>
                              <td><code>SMTP</code></td>
                              <td><code>smtp.exmail.qq.com</code></td>
                              <td><code>465 (SSL)</code></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Mail;
