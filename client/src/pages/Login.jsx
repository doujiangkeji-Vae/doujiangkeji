import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, t } from '../i18n';
import { API_BASE } from '../data/mockData';
import './Login.css';

function Login() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem('dj-admin-token', data.token);
        navigate('/admin');
      } else {
        setError(data.error || t(lang, 'login.error'));
      }
    } catch (err) {
      setError(t(lang, 'login.networkError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__logo">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <span>DouJiang Admin</span>
        </div>
        <h1 className="login__title">{t(lang, 'login.title')}</h1>
        <p className="login__desc">{t(lang, 'login.desc')}</p>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__field">
            <label>{t(lang, 'login.username')}</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder={t(lang, 'login.usernamePlaceholder')} required autoFocus />
          </div>
          <div className="login__field">
            <label>{t(lang, 'login.password')}</label>
            <div className="login__password-wrap">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={t(lang, 'login.passwordPlaceholder')} required />
              <button type="button" className="login__toggle-pwd" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>
          {error && <p className="login__error">{error}</p>}
          <button type="submit" className="login__btn" disabled={loading}>
            {loading ? t(lang, 'login.loading') : t(lang, 'login.submit')}
          </button>
        </form>
        <a href="/" className="login__back">{t(lang, 'login.backToSite')}</a>
      </div>
    </div>
  );
}

export default Login;
