import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ScrollAnimation from '../components/ScrollAnimation';
import { useLanguage, t } from '../i18n';
import { newsArticles } from '../data/mockData';
import './News.css';

function News() {
  const { id } = useParams();
  const { lang } = useLanguage();

  if (id) {
    const article = newsArticles.find(a => a.id === parseInt(id));
    if (!article) {
      return (
        <div className="page-wrapper">
          <div className="container" style={{ padding: '140px 24px', textAlign: 'center' }}>
            <h1>{t(lang, 'news.articleNotFound')}</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>{t(lang, 'news.articleNotFoundDesc')}</p>
            <Link to="/news" className="btn btn-primary" style={{ marginTop: '24px' }}>{t(lang, 'news.backToList')}</Link>
          </div>
        </div>
      );
    }
    return <NewsDetail article={article} />;
  }

  return <NewsList />;
}

function NewsList() {
  const { lang } = useLanguage();
  const allKey = '__all__';
  const categoryKeys = [...new Set(newsArticles.map(a => {
    const c = a.category[lang] || a.category;
    return typeof c === 'object' ? c.zh : c;
  }))];
  const categories = [allKey, ...categoryKeys];
  const [activeCategory, setActiveCategory] = useState(allKey);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const getCategoryLabel = (cat) => {
    if (cat === allKey) return t(lang, 'news.all');
    const article = newsArticles.find(a => {
      const c = a.category[lang] || a.category;
      return (typeof c === 'object' ? c.zh : c) === cat;
    });
    if (article) return (article.category[lang] || article.category);
    return cat;
  };

  const filtered = activeCategory === allKey
    ? newsArticles
    : newsArticles.filter(a => {
        const c = a.category[lang] || a.category;
        return (typeof c === 'object' ? c.zh : c) === activeCategory;
      });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="page-wrapper">
      <section className="news-hero">
        <div className="news-hero__bg">
          <div className="news-hero__glow news-hero__glow--1"></div>
          <div className="news-hero__glow news-hero__glow--2"></div>
        </div>
        <div className="container news-hero__content">
          <h1 className="news-hero__title">{t(lang, 'news.title')}</h1>
          <p className="news-hero__subtitle">{t(lang, 'news.subtitle')}</p>
        </div>
      </section>

      <section className="section news-main">
        <div className="container">
          <ScrollAnimation>
            <div className="news-filter">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`news-filter__btn ${activeCategory === cat ? 'news-filter__btn--active' : ''}`}
                  onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                >
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </div>
          </ScrollAnimation>

          <div className="news-list">
            {paged.map((article, index) => (
              <ScrollAnimation key={article.id} delay={index * 60}>
                <Link to={`/news/${article.id}`} className="news-list__item">
                  <div className="news-list__item-content">
                    <div className="news-list__item-meta">
                      <span className="news-list__item-category">{article.category[lang] || article.category}</span>
                      <span className="news-list__item-date">{article.date}</span>
                      {article.source && <span className="news-list__item-source">{article.source[lang] || article.source}</span>}
                    </div>
                    <h3 className="news-list__item-title">{article.title[lang] || article.title}</h3>
                    <p className="news-list__item-summary">{article.summary[lang] || article.summary}</p>
                    <span className="news-list__item-read">
                      {t(lang, 'news.readMore')}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="news-pagination">
              <button
                className="news-pagination__btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`news-pagination__btn ${currentPage === i + 1 ? 'news-pagination__btn--active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="news-pagination__btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function NewsDetail({ article }) {
  const { lang } = useLanguage();

  return (
    <div className="page-wrapper">
      <section className="news-detail">
        <div className="container">
          <Link to="/news" className="news-detail__back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {t(lang, 'news.backToList')}
          </Link>
          <div className="news-detail__header">
            <span className="news-detail__category">{article.category[lang] || article.category}</span>
            <h1 className="news-detail__title">{article.title[lang] || article.title}</h1>
            <div className="news-detail__meta">
              <span className="news-detail__date">{article.date}</span>
              {article.source && <span className="news-detail__source">{article.source[lang] || article.source}</span>}
            </div>
          </div>
          <div className="news-detail__content">
            {(article.content[lang] || article.content).split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('- ') || paragraph.match(/^\d+\./)) {
                const items = paragraph.split('\n');
                return (
                  <ul key={index} className="news-detail__list">
                    {items.map((item, i) => (
                      <li key={i} dangerouslySetInnerHTML={{
                        __html: item.replace(/^[-\d.)\s]+/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      }} />
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} dangerouslySetInnerHTML={{
                  __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }} />
              );
            })}
          </div>
          <div className="news-detail__footer">
            <Link to="/news" className="btn btn-outline">
              {t(lang, 'news.backToList')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default News;
