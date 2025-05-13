import { useState, useEffect } from "react";
import { useI18n } from "@/utils/i18n";
import { useI18nToast } from "@/utils/i18n-toast";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { 
  Send, 
  Mail, 
  Phone, 
  Building, 
  ShoppingCart, 
  MessageCircle,
  FileText,
  BarChart,
  Truck
} from "lucide-react";

interface QuoteRequestFormProps {
  selectedProduct?: string;
}

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const QuoteRequestForm = ({ selectedProduct }: QuoteRequestFormProps) => {
  const { t } = useI18n();
  const { toast } = useToast();
  const { successToast, errorToast } = useI18nToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    product: selectedProduct || "",
    quantity: "",
    delivery: "",
    message: ""
  });

  // Update form when selectedProduct changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      product: selectedProduct || ""
    }));
  }, [selectedProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      const requiredFields = ['company', 'name', 'email', 'phone', 'product', 'quantity', 'delivery'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(t("quote.errors.requiredFields"));
      }
      
      // Use XMLHttpRequest instead of fetch to bypass potential blocking
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://roodan.ae/api/quote-request', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      
      // Handle response
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            successToast("quote.success.submitted", "quote.success.received", { "0": data.ticket_no });
            
            // Reset form
            setFormData({
              company: "",
              name: "",
              email: "",
              phone: "",
              product: selectedProduct || "",
              quantity: "",
              delivery: "",
              message: ""
            });
          } catch (error) {
            console.error('Error parsing JSON response:', error);
            errorToast("quote.errors.networkError", "quote.errors.serverInvalid");
          }
        } else {
          let errorMessage = t("quote.errors.failedSubmit");
          try {
            const data = JSON.parse(xhr.responseText);
            errorMessage = data.message || errorMessage;
          } catch (e) {
            // If parsing fails, use the default error message
          }
          
          // Using custom error message from server if available
          if (errorMessage !== t("quote.errors.failedSubmit")) {
            errorToast("quote.errors.networkError", "", { "0": errorMessage });
          } else {
            errorToast("quote.errors.networkError", "quote.errors.failedSubmit");
          }
        }
        setIsSubmitting(false);
      };
      
      // Handle network errors
      xhr.onerror = function() {
        console.error('Network error occurred');
        errorToast("quote.errors.networkError", "quote.errors.connectionFailed");
        setIsSubmitting(false);
      };
      
      // Send the request
      xhr.send(JSON.stringify(formData));
      
    } catch (error) {
      console.error('Submission error:', error);
      if (error instanceof Error) {
        errorToast("quote.errors.networkError", "", { "0": error.message });
      } else {
        errorToast("quote.errors.networkError", "quote.errors.tryAgain");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      variants={pageVariants}
      className="max-w-4xl mx-auto mt-8 bg-white/90 backdrop-blur-sm border border-gray-100/80 rounded-3xl p-5 sm:p-8 md:p-12 shadow-xl"
    >
      <motion.div variants={pageVariants} className="text-center mb-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
          <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500 mb-2 sm:mb-0" />
          <h2 className="text-2xl sm:text-3xl font-display font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent text-center">
            {t("quote.title")}
          </h2>
        </div>
        <p className="text-foreground max-w-2xl mx-auto text-sm sm:text-base">
          {t("quote.subtitle")}     
        </p>
      </motion.div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Information */}
        <div className="bg-emerald-50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
            <Building className="w-5 h-5 mr-2" />
            {t("quote.sections.companyInfo")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium flex items-center gap-1">
                <span>{t("quote.company")}</span>
                <span className="text-destructive">*</span>
              </label>
              <Input 
                id="company" 
                value={formData.company}
                onChange={handleChange}
                required 
                placeholder={t("quote.companyPlaceholder")}
                className="rounded-lg"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium flex items-center gap-1">
                <span>{t("quote.name")}</span>
                <span className="text-destructive">*</span>
              </label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                required 
                placeholder={t("quote.namePlaceholder")}
                className="rounded-lg"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium flex items-center gap-1">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>{t("quote.email")}</span>
                <span className="text-destructive">*</span>
              </label>
              <Input 
                id="email" 
                type="email"
                value={formData.email}
                onChange={handleChange}
                required 
                placeholder={t("quote.emailPlaceholder")}
                className="rounded-lg"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium flex items-center gap-1">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>{t("quote.phone")}</span>
                <span className="text-destructive">*</span>
              </label>
              <Input 
                id="phone" 
                value={formData.phone}
                onChange={handleChange}
                required 
                placeholder={t("quote.phonePlaceholder")}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
        
        {/* Product Information */}
        <div className="bg-blue-50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2" />
            {t("quote.sections.productInfo")}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="product" className="text-sm font-medium flex items-center gap-1">
                <span>{t("quote.product")}</span>
                <span className="text-destructive">*</span>
              </label>
              <Input 
                id="product" 
                value={formData.product}
                onChange={handleChange}
                required 
                placeholder={t("quote.productPlaceholder")}
                className="rounded-lg"
                readOnly={!!selectedProduct}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium flex items-center gap-1">
                <BarChart className="w-4 h-4 text-blue-500" />
                <span>{t("quote.quantity")}</span>
                <span className="text-destructive">*</span>
              </label>
              <Input 
                id="quantity" 
                value={formData.quantity}
                onChange={handleChange}
                required 
                placeholder={t("quote.quantityPlaceholder")}
                className="rounded-lg"
              />
            </div>
          </div>
          
          <div className="space-y-2 mt-4">
            <label htmlFor="delivery" className="text-sm font-medium flex items-center gap-1">
              <Truck className="w-4 h-4 text-blue-500" />
              <span>{t("quote.delivery")}</span>
              <span className="text-destructive">*</span>
            </label>
            <Input 
              id="delivery" 
              value={formData.delivery}
              onChange={handleChange}
              required 
              placeholder={t("quote.deliveryPlaceholder")}
              className="rounded-lg"
            />
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            {t("quote.sections.additionalInfo")}
          </h3>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              {t("quote.message")}
            </label>
            <Textarea 
              id="message" 
              value={formData.message}
              onChange={handleChange}
              placeholder={t("quote.messagePlaceholder")}
              className="rounded-lg h-32"
            />
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-center mt-10">
          <Button 
            type="submit" 
            size="lg"
            className="px-16 py-6 text-lg bg-emerald-600 hover:bg-emerald-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>{t("quote.submitting")}</span>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                {t("quote.submit")}
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}; 