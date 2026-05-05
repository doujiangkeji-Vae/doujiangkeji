import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, t } from '../i18n';
import { API_BASE } from '../data/mockData';
import ScrollAnimation from '../components/ScrollAnimation';
import './Admin.css';

const CATEGORIES_ZH = ['行业动态', '技术前沿', '行业活动', '产品动态'];
const CATEGORIES_EN = ['Industry Trends', 'Tech Frontier', 'Industry Events', 'Product Updates'];

function Admin() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const token = sessionStorage.getItem('dj-admin-token');
  const categories = lang === 'zh' ? CATEGORIES_ZH : CATEGORIES_EN;

  // Authentication guard
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    // Verify token validity
    fetch(`${API_BASE}/admin/check`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).then(res => {
      if (!res.ok) {
        sessionStorage.removeItem('dj-admin-token');
        navigate('/login');
      }
    }).catch(() => {
      navigate('/login');
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [articles, setArticles] = useState([]);
  const [translateStatus, setTranslateStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  // Form state
  const [form, setForm] = useState({
    title: '',
    category: categories[0],
    summary: '',
    content: '',
  });
  const [editingId, setEditingId] = useState(null);

  const showMessage = useCallback((text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 4000);
  }, []);

  // Logout handler
  const handleLogout = async () => {
    const token = sessionStorage.getItem('dj-admin-token');
    if (token) {
      await fetch(`${API_BASE}/admin/logout`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    }
    sessionStorage.removeItem('dj-admin-token');
    navigate('/login');
  };

  // Fetch articles
  const fetchArticles = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/articles`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        setArticles(json.data || json);
      }
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    }
  }, [token]);

  // Fetch translation status
  const fetchTranslateStatus = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/translate/status`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        setTranslateStatus(json.data || json);
      }
    } catch (err) {
      console.error('Failed to fetch translate status:', err);
    }
  }, [token]);

  useEffect(() => {
    fetchArticles();
    fetchTranslateStatus();
  }, [fetchArticles, fetchTranslateStatus]);

  // Update category when language changes
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      category: categories[0],
    }));
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;

    setLoading(true);
    try {
      if (editingId) {
        // Update existing article
        const res = await fetch(`${API_BASE}/articles/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          showMessage(t(lang, 'admin.publishSuccess'), 'success');
          resetForm();
          fetchArticles();
        } else {
          showMessage('Failed to update article', 'error');
        }
      } else {
        // Create new article
        const res = await fetch(`${API_BASE}/articles`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          showMessage(t(lang, 'admin.publishSuccess'), 'success');
          resetForm();
          fetchArticles();
        } else {
          showMessage('Failed to publish article', 'error');
        }
      }
    } catch (err) {
      showMessage('Network error', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({ title: '', category: categories[0], summary: '', content: '' });
    setEditingId(null);
  };

  // Edit article - populate form
  const handleEdit = (article) => {
    setEditingId(article.id);
    setForm({
      title: article.title?.zh || article.title || '',
      category: article.category?.zh || article.category || categories[0],
      summary: article.summary?.zh || article.summary || '',
      content: article.content?.zh || article.content || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete article
  const handleDelete = async (id) => {
    if (!window.confirm(t(lang, 'admin.confirmDelete'))) return;

    try {
      const res = await fetch(`${API_BASE}/articles/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showMessage(t(lang, 'admin.deleteSuccess'), 'success');
        fetchArticles();
        // If we were editing this article, reset form
        if (editingId === id) {
          resetForm();
        }
      } else {
        showMessage('Failed to delete article', 'error');
      }
    } catch (err) {
      showMessage('Network error', 'error');
    }
  };

  // Retranslate article
  const handleRetranslate = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/articles/${id}/translate`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        showMessage(t(lang, 'admin.retranslateSuccess'), 'success');
        fetchArticles();
      } else {
        showMessage('Failed to retranslate article', 'error');
      }
    } catch (err) {
      showMessage('Network error', 'error');
    }
  };

  // Get display value for article fields
  const getDisplayTitle = (article) => {
    if (typeof article.title === 'object') return article.title[lang] || article.title.zh || '';
    return article.title || '';
  };

  const getDisplayCategory = (article) => {
    if (typeof article.category === 'object') return article.category[lang] || article.category.zh || '';
    return article.category || '';
  };

  const getDisplayDate = (article) => {
    return article.date || article.createdAt || '';
  };

  const getTranslateStatusText = (article) => {
    if (article.title_en && article.content_en) {
      return lang === 'zh' ? '已翻译' : 'Translated';
    }
    if (typeof article.title === 'object' && article.title.en) {
      return lang === 'zh' ? '已翻译' : 'Translated';
    }
    return lang === 'zh' ? '未翻译' : 'Not Translated';
  };

  return (
    <div className="admin">
      <div className="admin__container">
        {/* Header */}
        <ScrollAnimation animation="fadeInUp">
          <div className="admin__header">
            <div>
              <h1 className="admin__title">{t(lang, 'admin.title')}</h1>
              <p className="admin__subtitle">{t(lang, 'admin.subtitle')}</p>
            </div>
            <button className="admin__logout" onClick={handleLogout}>
              {t(lang, 'admin.logout')}
            </button>
          </div>
        </ScrollAnimation>

        {/* Message */}
        {message && (
          <div className={`admin__message admin__message--${messageType}`}>
            {message}
          </div>
        )}

        {/* Translation Status Card */}
        <ScrollAnimation animation="fadeInUp" delay={100}>
          <div className="admin__status">
            <h3 className="admin__status-title">{t(lang, 'admin.translateStatus')}</h3>
            {translateStatus ? (
              translateStatus.enabled ? (
                <div className="admin__status-enabled">
                  <span className="admin__status-dot admin__status-dot--active"></span>
                  {t(lang, 'admin.translateEnabled')}
                </div>
              ) : (
                <div className="admin__status-disabled">
                  <span className="admin__status-dot admin__status-dot--inactive"></span>
                  {t(lang, 'admin.translateDisabled')}
                  <p className="admin__status-desc">{t(lang, 'admin.translateDisabledDesc')}</p>
                </div>
              )
            ) : (
              <p className="admin__status-desc">{t(lang, 'admin.loading')}</p>
            )}
          </div>
        </ScrollAnimation>

        {/* Publish Form */}
        <ScrollAnimation animation="fadeInUp" delay={200}>
          <div className="admin__form-card">
            <h2 className="admin__form-title">
              {editingId ? t(lang, 'admin.update') : t(lang, 'admin.publishTitle')}
            </h2>
            <form onSubmit={handleSubmit} className="admin__form">
              <div className="admin__form-group">
                <label className="admin__label" htmlFor="title">
                  {t(lang, 'admin.titleField')} <span className="admin__required">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="admin__input"
                  placeholder={t(lang, 'admin.titlePlaceholder')}
                  value={form.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="admin__form-group">
                <label className="admin__label" htmlFor="category">
                  {t(lang, 'admin.category')}
                </label>
                <select
                  id="category"
                  name="category"
                  className="admin__select"
                  value={form.category}
                  onChange={handleInputChange}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="admin__form-group">
                <label className="admin__label" htmlFor="summary">
                  {t(lang, 'admin.summary')}
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  className="admin__textarea admin__textarea--small"
                  placeholder={t(lang, 'admin.summaryPlaceholder')}
                  value={form.summary}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>

              <div className="admin__form-group">
                <label className="admin__label" htmlFor="content">
                  {t(lang, 'admin.content')} <span className="admin__required">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  className="admin__textarea admin__textarea--large"
                  placeholder={t(lang, 'admin.contentPlaceholder')}
                  value={form.content}
                  onChange={handleInputChange}
                  rows={12}
                  required
                />
              </div>

              <div className="admin__form-actions">
                <button
                  type="submit"
                  className="admin__btn admin__btn--primary"
                  disabled={loading}
                >
                  {loading
                    ? t(lang, 'admin.loading')
                    : editingId
                      ? t(lang, 'admin.update')
                      : t(lang, 'admin.publish')}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="admin__btn admin__btn--outline"
                    onClick={resetForm}
                  >
                    {t(lang, 'admin.cancel')}
                  </button>
                )}
              </div>
            </form>
          </div>
        </ScrollAnimation>

        {/* Article List */}
        <ScrollAnimation animation="fadeInUp" delay={300}>
          <div className="admin__list-card">
            <h2 className="admin__list-title">{t(lang, 'admin.articleList')}</h2>
            {articles.length === 0 ? (
              <p className="admin__empty">{t(lang, 'admin.noArticles')}</p>
            ) : (
              <div className="admin__table-wrapper">
                <table className="admin__table">
                  <thead>
                    <tr>
                      <th>{t(lang, 'admin.titleField')}</th>
                      <th>{t(lang, 'admin.category')}</th>
                      <th>{t(lang, 'admin.date')}</th>
                      <th>{t(lang, 'admin.translateStatus')}</th>
                      <th>{t(lang, 'admin.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article) => (
                      <tr key={article.id}>
                        <td className="admin__table-title">{getDisplayTitle(article)}</td>
                        <td>
                          <span className="admin__badge">{getDisplayCategory(article)}</span>
                        </td>
                        <td className="admin__table-date">{getDisplayDate(article)}</td>
                        <td>
                          <span
                            className={`admin__translate-badge ${
                              getTranslateStatusText(article) === (lang === 'zh' ? '已翻译' : 'Translated')
                                ? 'admin__translate-badge--done'
                                : 'admin__translate-badge--pending'
                            }`}
                          >
                            {getTranslateStatusText(article)}
                          </span>
                        </td>
                        <td className="admin__table-actions">
                          <button
                            className="admin__btn admin__btn--sm admin__btn--outline"
                            onClick={() => handleEdit(article)}
                          >
                            {t(lang, 'admin.edit')}
                          </button>
                          <button
                            className="admin__btn admin__btn--sm admin__btn--outline"
                            onClick={() => handleRetranslate(article.id)}
                          >
                            {t(lang, 'admin.retranslate')}
                          </button>
                          <button
                            className="admin__btn admin__btn--sm admin__btn--danger"
                            onClick={() => handleDelete(article.id)}
                          >
                            {t(lang, 'admin.delete')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}

export default Admin;
