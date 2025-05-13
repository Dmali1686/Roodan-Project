import React, { createContext, useContext, useEffect, useState } from 'react';
import { useI18n } from '@/utils/i18n';
import { Toaster } from '@/components/ui/toaster';

// Create a context to track language changes
const I18nToastContext = createContext<null>(null);

export const I18nToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { language } = useI18n();
  const [toastKey, setToastKey] = useState(0);

  // Update the toaster when language changes
  useEffect(() => {
    // Force a re-render of the Toaster component
    setToastKey(prev => prev + 1);
  }, [language]);

  return (
    <I18nToastContext.Provider value={null}>
      {children}
      <Toaster key={toastKey} />
    </I18nToastContext.Provider>
  );
};

export const useI18nToastContext = () => {
  const context = useContext(I18nToastContext);
  if (context === undefined) {
    throw new Error('useI18nToastContext must be used within an I18nToastProvider');
  }
  return context;
}; 