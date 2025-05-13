import { useI18n } from "./i18n";
import { toast } from "@/hooks/use-toast";

/**
 * A utility function to create toasts with internationalization support.
 * This ensures that toast messages will update when the language changes.
 */
export const useI18nToast = () => {
  const { t } = useI18n();

  // Function to show a success toast with i18n
  const successToast = (titleKey: string, descriptionKey: string, params?: Record<string, string>) => {
    let description = t(descriptionKey);
    
    // Replace parameters in the description if provided
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        description = description.replace(`{${key}}`, value);
      });
    }
    
    return toast({
      title: t(titleKey),
      description,
      duration: 5000,
    });
  };

  // Function to show an error toast with i18n
  const errorToast = (titleKey: string, descriptionKey: string, params?: Record<string, string>) => {
    let description = t(descriptionKey);
    
    // Replace parameters in the description if provided
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        description = description.replace(`{${key}}`, value);
      });
    }
    
    return toast({
      title: t(titleKey),
      description,
      variant: "destructive",
      duration: 5000,
    });
  };

  return {
    successToast,
    errorToast
  };
}; 