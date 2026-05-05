import { createContext, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import translations from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // 从 URL 路径检测语言
  const lang = location.pathname.startsWith('/cn') ? 'zh' : 'en';

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
