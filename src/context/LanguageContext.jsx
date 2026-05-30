import { createContext, useState, useContext, useEffect } from 'react';
import translations from '../lib/translations.json';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('c3a-language') || 'en';
    setLanguage(savedLanguage);
    document.documentElement.lang = savedLanguage;
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('c3a-language', lang);
    document.documentElement.lang = lang;
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
