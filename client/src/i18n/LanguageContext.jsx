import { createContext, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import translations from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // 从 URL 路径检测语言
  const lang = location.pathname.startsWith('/cn') ? 'zh' : 'en';

  // 动态设置 html lang 和页面标题
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    const path = location.pathname.replace(/^\/cn/, '') || '/';
    const titles = {
      '/': lang === 'zh' ? '豆姜科技 | 智造未来，连接万物' : 'DouJiang Technology | Smart Future, Connected World',
      '/about': lang === 'zh' ? '关于我们 - 豆姜科技' : 'About Us - DouJiang Technology',
      '/products': lang === 'zh' ? '产品中心 - 豆姜科技' : 'Products - DouJiang Technology',
      '/news': lang === 'zh' ? '资讯中心 - 豆姜科技' : 'News - DouJiang Technology',
      '/contact': lang === 'zh' ? '联系我们 - 豆姜科技' : 'Contact Us - DouJiang Technology',
      '/mail': lang === 'zh' ? '企业邮箱 - 豆姜科技' : 'Enterprise Email - DouJiang Technology',
      '/privacy': lang === 'zh' ? '隐私政策 - 豆姜科技' : 'Privacy Policy - DouJiang Technology',
      '/terms': lang === 'zh' ? '服务条款 - 豆姜科技' : 'Terms of Service - DouJiang Technology',
      '/sitemap': lang === 'zh' ? '网站地图 - 豆姜科技' : 'Sitemap - DouJiang Technology',
      '/login': lang === 'zh' ? '管理员登录 - 豆姜科技' : 'Admin Login - DouJiang Technology',
      '/admin': lang === 'zh' ? '文章管理 - 豆姜科技' : 'Article Management - DouJiang Technology',
    };

    // 匹配路径（支持子路径如 /news/3）
    const matchedKey = Object.keys(titles).find(key =>
      path === key || (key !== '/' && path.startsWith(key))
    );

    document.title = matchedKey ? titles[matchedKey] : titles['/'];
  }, [lang, location.pathname]);

  // 切换语言的函数 - 通过 URL 跳转
  const switchLanguage = (targetLang) => {
    const currentPath = location.pathname;
    if (targetLang === 'zh') {
      // 切换到中文：添加 /cn 前缀
      if (!currentPath.startsWith('/cn')) {
        navigate('/cn' + currentPath);
      }
    } else {
      // 切换到英文：移除 /cn 前缀
      if (currentPath.startsWith('/cn')) {
        const newPath = currentPath.replace(/^\/cn/, '') || '/';
        navigate(newPath);
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function t(lang, key) {
  const keys = key.split('.');
  let value = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
}
