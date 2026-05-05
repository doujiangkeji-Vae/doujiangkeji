import { useState } from 'react';
import { useLanguage, t } from '../i18n';
import './Mail.css';

function Mail() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('login');

  const enterpriseEmail = 'yuzhiyu@djkj.top';

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
                  {lang === 'zh' ? '域名邮箱转发配置' : 'Domain Email Forwarding Setup'}
                </h2>
                <p className="mail-login-desc">
                  {lang === 'zh'
                    ? '按照以下步骤配置，即可实现发到企业邮箱的邮件自动转发'
                    : 'Follow these steps to set up automatic email forwarding'}
                </p>

                <div className="mail-config-steps">
                  <div className="mail-config-step">
                    <div className="mail-config-step-number">1</div>
                    <div className="mail-config-step-content">
                      <h3>
                        {lang === 'zh' ? '登录腾讯云控制台' : 'Login to Tencent Cloud Console'}
                      </h3>
                      <p>
                        {lang === 'zh'
                          ? '打开 腾讯云控制台 → 域名注册 → 找到 djkj.top → 点击"解析"'
                          : 'Open Tencent Cloud Console → Domain Registration → Find djkj.top → Click "DNS Resolution"'}
                      </p>
                    </div>
                  </div>

                  <div className="mail-config-step">
                    <div className="mail-config-step-number">2</div>
                    <div className="mail-config-step-content">
                      <h3>
                        {lang === 'zh' ? '添加 MX 记录' : 'Add MX Record'}
                      </h3>
                      <div className="mail-config-table">
                        <table>
                          <thead>
                            <tr>
                              <th>{lang === 'zh' ? '类型' : 'Type'}</th>
                              <th>{lang === 'zh' ? '主机记录' : 'Host'}</th>
                              <th>{lang === 'zh' ? '记录值' : 'Value'}</th>
                              <th>{lang === 'zh' ? '优先级' : 'Priority'}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><code>MX</code></td>
                              <td><code>@</code></td>
                              <td><code>mxw.126.com</code></td>
                              <td><code>5</code></td>
                            </tr>
                            <tr>
                              <td><code>MX</code></td>
                              <td><code>@</code></td>
                              <td><code>mxn.126.com</code></td>
                              <td><code>10</code></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="mail-config-step">
                    <div className="mail-config-step-number">3</div>
                    <div className="mail-config-step-content">
                      <h3>
                        {lang === 'zh' ? '添加 TXT 记录（验证域名所有权）' : 'Add TXT Record (Domain Verification)'}
                      </h3>
                      <div className="mail-config-table">
                        <table>
                          <thead>
                            <tr>
                              <th>{lang === 'zh' ? '类型' : 'Type'}</th>
                              <th>{lang === 'zh' ? '主机记录' : 'Host'}</th>
                              <th>{lang === 'zh' ? '记录值' : 'Value'}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><code>TXT</code></td>
                              <td><code>@</code></td>
                              <td><code>v=spf1 include:126.com ~all</code></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="mail-config-step">
                    <div className="mail-config-step-number">4</div>
                    <div className="mail-config-step-content">
                      <h3>
                        {lang === 'zh' ? '在 126 邮箱设置企业邮箱' : 'Setup Enterprise Email in 126 Mailbox'}
                      </h3>
                      <p>
                        {lang === 'zh'
                          ? '1. 登录 doujiangkeji@126.com\n2. 设置 → 邮箱绑定 → 绑定企业邮箱\n3. 输入 yuzhiyu@djkj.top\n4. 按提示完成域名验证'
                          : '1. Login to doujiangkeji@126.com\n2. Settings → Email Binding → Bind Enterprise Email\n3. Enter yuzhiyu@djkj.top\n4. Complete domain verification'}
                      </p>
                    </div>
                  </div>

                  <div className="mail-config-step">
                    <div className="mail-config-step-number">5</div>
                    <div className="mail-config-step-content">
                      <h3>
                        {lang === 'zh' ? '等待生效' : 'Wait for Activation'}
                      </h3>
                      <p>
                        {lang === 'zh'
                          ? 'DNS 记录通常需要 10-30 分钟生效。生效后，发送到 yuzhiyu@djkj.top 的邮件将自动转发到 doujiangkeji@126.com'
                          : 'DNS records usually take 10-30 minutes to take effect. After activation, emails sent to yuzhiyu@djkj.top will be automatically forwarded to doujiangkeji@126.com'}
                      </p>
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
