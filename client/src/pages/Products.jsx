import { useState } from 'react';
import ScrollAnimation from '../components/ScrollAnimation';
import { products } from '../data/mockData';
import './Products.css';

function Products() {
  const categories = ['全部', ...new Set(products.map(p => p.category))];
  const [activeCategory, setActiveCategory] = useState('全部');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = activeCategory === '全部'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className="products-hero">
        <div className="products-hero__bg">
          <div className="products-hero__glow products-hero__glow--1"></div>
          <div className="products-hero__glow products-hero__glow--2"></div>
        </div>
        <div className="container products-hero__content">
          <h1 className="products-hero__title">产品中心</h1>
          <p className="products-hero__subtitle">覆盖AI硬件应用全场景的智能硬件产品矩阵</p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="section products-main">
        <div className="container">
          <ScrollAnimation>
            <div className="products-filter">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`products-filter__btn ${activeCategory === cat ? 'products-filter__btn--active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollAnimation>

          <div className="products-grid">
            {filtered.map((product, index) => (
              <ScrollAnimation key={product.id} delay={index * 80}>
                <div className="products-grid__card" onClick={() => setSelectedProduct(product)}>
                  <div className="products-grid__card-header">
                    <div className="products-grid__card-icon">
                      <ProductIcon category={product.category} />
                    </div>
                    <span className="products-grid__card-category">{product.category}</span>
                  </div>
                  <h3 className="products-grid__card-name">{product.name}</h3>
                  <p className="products-grid__card-brief">{product.brief}</p>
                  <div className="products-grid__card-features">
                    {product.features.map((f, i) => (
                      <span key={i} className="products-grid__card-tag">{f}</span>
                    ))}
                  </div>
                  <button className="products-grid__card-btn">
                    查看详情
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="product-modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-modal" onClick={e => e.stopPropagation()}>
            <button className="product-modal__close" onClick={() => setSelectedProduct(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="product-modal__header">
              <div className="product-modal__icon">
                <ProductIcon category={selectedProduct.category} />
              </div>
              <div>
                <span className="product-modal__category">{selectedProduct.category}</span>
                <h2 className="product-modal__name">{selectedProduct.name}</h2>
              </div>
            </div>
            <p className="product-modal__desc">{selectedProduct.description}</p>
            <div className="product-modal__features">
              <h3>核心特性</h3>
              <div className="product-modal__features-list">
                {selectedProduct.features.map((f, i) => (
                  <div key={i} className="product-modal__feature">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="product-modal__specs">
              <h3>技术参数</h3>
              <div className="product-modal__specs-table">
                {Object.entries(selectedProduct.specs).map(([key, value]) => (
                  <div key={key} className="product-modal__spec-row">
                    <span className="product-modal__spec-key">{key}</span>
                    <span className="product-modal__spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="product-modal__actions">
              {selectedProduct.link ? (
                <a href={selectedProduct.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">查看详情</a>
              ) : (
                <button className="btn btn-primary">申请试用</button>
              )}
              <button className="btn btn-outline">下载资料</button>
            </div>
          </div>
        </div>
      )}
    </div>
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

export default Products;
