import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { useI18n } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { 
  Send, 
  Mail, 
  Phone, 
  Building, 
  ShoppingCart, 
  MessageCircle,
  FileText,
  Calendar,
  ShieldCheck,
  DollarSign,
  Truck,
  FileSignature,
  CreditCard,
  BarChart
} from "lucide-react";

const LOIForm = () => {
  const { t, language } = useI18n();
  const { toast } = useToast();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  const prevLanguageRef = useRef(language);
  
  // Force re-render when language changes
  useEffect(() => {
    if (prevLanguageRef.current !== language) {
      prevLanguageRef.current = language;
      setForceUpdate(prev => prev + 1);
    }
  }, [language]);
  
  // Form state
  const [formData, setFormData] = useState({
    // LOI details
    issuedDate: "",
    validUntil: "",
    
    // Product details
    productName: "",
    quantity: "",
    origin: "",
    shipments: "",
    frequencyOfDelivery: "",
    contractLength: "",
    totalContractAmount: "",
    incoterms: "CIF",
    deliveryPort: "",
    targetPrice: "",
    
    // Payment and inspection
    paymentTerms: "",
    inspection: "SGS",
    
    // Additional details
    observations: "",
    specifications: "",
    
    // Buyer information
    companyName: "",
    companyRegistrationNumber: "",
    address: "",
    representativeName: "",
    title: "",
    phone: "",
    email: "",
    website: "",
    
    // Bank information
    bankName: "",
    bankSwiftCode: "",
    bankAddress: "",
    accountName: "",
    accountNumber: "",
    bankOfficerName: "",
    bankOfficerTitle: "",
    bankPhone: ""
  });

  // Incoterms options
  const incotermsOptions = [
    { value: "CIF", label: "CIF (Cost, Insurance, Freight)" },
    { value: "FOB", label: "FOB (Free on Board)" },
    { value: "EXW", label: "EXW (Ex Works)" },
    { value: "DDP", label: "DDP (Delivered Duty Paid)" },
    { value: "FAS", label: "FAS (Free Alongside Ship)" },
    { value: "CFR", label: "CFR (Cost and Freight)" }
  ];
  
  // Inspection options
  const inspectionOptions = [
    { value: "SGS", label: "SGS" },
    { value: "INTERTEK", label: "INTERTEK" },
    { value: "CIQ", label: "CIQ" }
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      const requiredFields = [
        'issuedDate', 
        'validUntil', 
        'productName',
        'quantity', 
        'origin', 
        'deliveryPort', 
        'targetPrice',
        'companyName', 
        'companyRegistrationNumber', 
        'representativeName',
        'email', 
        'phone'  // Changed from 'phone' to match state
      ];
      
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        throw new Error("Please fill all required fields");
      }
      
      // Send data to backend API
      const response = await fetch('/api/loi-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "LOI Submitted Successfully",
          description: "Your Letter of Intent has been received. We will contact you shortly.",
          duration: 5000,
        });
        
        // Generate PDF download or preview option here
        
        // Reset form
        setFormData({
          issuedDate: "",
          validUntil: "",
          productName: "",
          quantity: "",
          origin: "",
          shipments: "",
          frequencyOfDelivery: "",
          contractLength: "",
          totalContractAmount: "",
          incoterms: "CIF",
          deliveryPort: "",
          targetPrice: "",
          paymentTerms: "",
          inspection: "SGS",
          observations: "",
          specifications: "",
          companyName: "",
          companyRegistrationNumber: "",
          address: "",
          representativeName: "",
          title: "",
          phone: "",
          email: "",
          website: "",
          bankName: "",
          bankSwiftCode: "",
          bankAddress: "",
          accountName: "",
          accountNumber: "",
          bankOfficerName: "",
          bankOfficerTitle: "",
          bankPhone: ""
        });
      } else {
        throw new Error(data.message || "Failed to submit LOI");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit LOI. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-50 to-emerald-50/30 font-sans">
      <Header />
      <main className="flex-grow">
        <motion.section 
          className="py-12 pt-28 relative"
          initial="initial"
          animate="animate"
          variants={pageVariants}
        >
          {/* Subtle background effect */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10" />
            <motion.div
              className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -top-64 -right-64"
              animate={{
                y: [0, -20, 0],
                transition: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              }}
            />
          </div>
          
          <div className={cn("page-container relative z-10", language === "ar" ? "rtl" : "ltr")}>
            <motion.div 
              variants={pageVariants}
              className="max-w-4xl mx-auto mt-8 bg-white/90 backdrop-blur-sm border border-gray-100/80 rounded-3xl p-5 sm:p-8 md:p-12 shadow-xl"
            >
              <motion.div variants={pageVariants} className="text-center mb-12">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
                  <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500 mb-2 sm:mb-0" />
                  <h2 className="text-2xl sm:text-3xl font-display font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent text-center">
                    {t("loi.title")}
                  </h2>
                </div>
                <p className="text-foreground max-w-2xl mx-auto text-sm sm:text-base">
                  {t("loi.subtitle")}     
                </p>
              </motion.div>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* LOI Details Section */}
                <div className="bg-emerald-50 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center">
                    <FileSignature className="w-5 h-5 mr-2" />
                    {t("loi.sections.loiDetails")}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    <div className="space-y-2">
                      <label htmlFor="issuedDate" className="text-sm font-medium flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-emerald-500" />
                        <span>
                          {t("loi.id")}
                        </span>
                        <span className="text-destructive">*</span>
                      </label>
                      <Input 
                        id="issuedDate" 
                        type="date"
                        value={formData.issuedDate}
                        onChange={handleChange}
                        required 
                        className="rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="validUntil" className="text-sm font-medium flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-emerald-500" />
                        <span>
                          {t("loi.vu")}
                        </span>
                        <span className="text-destructive">*</span>
                      </label>
                      <Input 
                        id="validUntil" 
                        type="date"
                        value={formData.validUntil}
                        onChange={handleChange}
                        required 
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Product Details Section */}
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {t("loi.sections.productDetails")}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label htmlFor="productName" className="text-sm font-medium flex items-center gap-1">
                        <span>{t("loi.product.name")}</span>
                        <span className="text-destructive">*</span>
                      </label>
                      <Input 
                        id="productName" 
                        value={formData.productName}
                        onChange={handleChange}
                        required 
                        placeholder={t('loi.product.e.g')}
                        className="rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="quantity" className="text-sm font-medium flex items-center gap-1">
                        <BarChart className="w-4 h-4 text-blue-500" />
                        <span>{t("loi.product.quantity")}</span>
                        <span className="text-destructive">*</span>
                      </label>
                      <Input 
                        id="quantity" 
                        value={formData.quantity}
                        onChange={handleChange}
                        required 
                        placeholder={t("loi.product.quantityPlaceholder")}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label htmlFor="origin" className="text-sm font-medium flex items-center gap-1">
                        <span>{t("loi.product.origin")}</span>
                        <span className="text-destructive">*</span>
                      </label>
                      <Input 
                        id="origin" 
                        value={formData.origin}
                        onChange={handleChange}
                        required 
                        placeholder={t("loi.product.originPlaceholder")}
                        className="rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="shipments" className="text-sm font-medium flex items-center gap-1">
                        <Truck className="w-4 h-4 text-blue-500" />
                        <span>{t("loi.product.shipments")}</span>
                      </label>
                      <Input 
                        id="shipments" 
                        value={formData.shipments}
                        onChange={handleChange}
                        placeholder={t("loi.product.shipmentsPlaceholder")}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label htmlFor="frequencyOfDelivery" className="text-sm font-medium">
                        {t("loi.product.frequency")}
                      </label>
                      <Input 
                        id="frequencyOfDelivery" 
                        value={formData.frequencyOfDelivery}
                        onChange={handleChange}
                        placeholder={t("loi.product.frequencyPlaceholder")}
                        className="rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="contractLength" className="text-sm font-medium">
                        {t("loi.product.contractLength")}
                      </label>
                      <Input 
                        id="contractLength" 
                        value={formData.contractLength}
                        onChange={handleChange}
                        placeholder={t("loi.product.contractLengthPlaceholder")}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label htmlFor="totalContractAmount" className="text-sm font-medium flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-blue-500" />
                        <span>{t("loi.product.totalAmount")}</span>
                      </label>
                      <Input 
                        id="totalContractAmount" 
                        value={formData.totalContractAmount}
                        onChange={handleChange}
                        placeholder={t("loi.product.totalAmountPlaceholder")}
                        className="rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="incoterms" className="text-sm font-medium">
                        {t("loi.product.incoterms")}
                      </label>
                      <Select 
                        value={formData.incoterms} 
                        onValueChange={(value) => handleSelectChange('incoterms', value)}
                      >
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder={t("loi.product.selectIncoterms")} />
                        </SelectTrigger>
                        <SelectContent>
                          {incotermsOptions.map((option) => (
                            <SelectItem 
                              key={option.value} 
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="deliveryPort" className="text-sm font-medium flex items-center gap-1">
                        <span>{t("loi.product.deliveryPort")}</span>
                        <span className="text-destructive">*</span>
                      </label>
                      <Input 
                        id="deliveryPort" 
                        value={formData.deliveryPort}
                        onChange={handleChange}
                        required 
                        placeholder={t("loi.product.deliveryPortPlaceholder")}
                        className="rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="targetPrice" className="text-sm font-medium flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-blue-500" />
                        <span>{t("loi.product.targetPrice")}</span>
                        <span className="text-destructive">*</span>
                      </label>
                      <Input 
                        id="targetPrice" 
                        value={formData.targetPrice}
                        onChange={handleChange}
                        required 
                        placeholder={t("loi.product.targetPricePlaceholder")}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                
        {/* Payment and Inspection Section */}
        <div className="bg-purple-50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold text-purple-700 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            {t("loi.sections.paymentInspection")}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="paymentTerms" className="text-sm font-medium">
                {t("loi.payment.terms")}
              </label>
              <div className="p-4 bg-white rounded-lg border border-gray-200 text-sm text-gray-700">
                {t("loi.payment.termsContent")}
              </div>
              {/* Hidden input to include in form data */}
              <input 
                type="hidden" 
                id="paymentTerms"
                value="THE BUYER RELEASES PAYMENT TO THE SELLER'S BANK AFTER INSPECTION AT THE LOADING PORT WITHIN THREE (3) BANKING DAYS AFTER THE CARGO HAS PASSED THE SGS OR SIMILAR, AND RECEIPT OF ALL RELEVANT PAYMENT DOCUMENTS."
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="inspection" className="text-sm font-medium">
                {t("loi.payment.inspection")}
              </label>
              <Select 
                value={formData.inspection} 
                onValueChange={(value) => handleSelectChange('inspection', value)}
              >
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder={t("loi.payment.selectInspection")} />
                </SelectTrigger>
                <SelectContent>
                  {inspectionOptions.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                {t("loi.payment.inspectionNote")}
              </p>
            </div>
          </div>
        </div>
                
    {/* Additional Details Section */}
<div className="bg-gray-50 p-4 rounded-xl">
  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
    <MessageCircle className="w-5 h-5 mr-2" />
    {t("loi.sections.additionalDetails")}
  </h3>
  
  <div className="grid grid-cols-1 gap-4">
    <div className="space-y-2">
      <label htmlFor="observations" className="text-sm font-medium">
        {t("loi.additional.observations")}
      </label>
      <Textarea 
        id="observations" 
        value={formData.observations}
        onChange={handleChange}
        placeholder={t("loi.additional.observationsPlaceholder")}
        className="rounded-lg h-20"
      />
    </div>
    
    <div className="space-y-2">
      <label htmlFor="specifications" className="text-sm font-medium">
        {t("loi.additional.specifications")}
      </label>
      <Textarea 
        id="specifications" 
        value={formData.specifications}
        onChange={handleChange}
        placeholder={t("loi.additional.specificationsPlaceholder")}
        className="rounded-lg h-20"
      />
    </div>
  </div>
</div>

{/* Buyer Information Section */}
<div className="bg-amber-50 p-4 rounded-xl">
  <h3 className="text-lg font-semibold text-amber-700 mb-4 flex items-center">
    <Building className="w-5 h-5 mr-2" />
    {t("loi.sections.buyerInfo")}
  </h3>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div className="space-y-2">
      <label htmlFor="companyName" className="text-sm font-medium flex items-center gap-1">
        <span>{t("loi.buyer.companyName")}</span>
        <span className="text-destructive">*</span>
      </label>
      <Input 
        id="companyName" 
        value={formData.companyName}
        onChange={handleChange}
        required 
        placeholder={t("loi.buyer.companyNamePlaceholder")}
        className="rounded-lg"
      />
    </div>
    
    <div className="space-y-2">
      <label htmlFor="companyRegistrationNumber" className="text-sm font-medium flex items-center gap-1">
        <ShieldCheck className="w-4 h-4 text-amber-500" />
        <span>{t("loi.buyer.regNumber")}</span>
        <span className="text-destructive">*</span>
      </label>
      <Input 
        id="companyRegistrationNumber" 
        value={formData.companyRegistrationNumber}
        onChange={handleChange}
        required 
        placeholder={t("loi.buyer.regNumberPlaceholder")}
        className="rounded-lg"
      />
    </div>
  </div>
  
  <div className="space-y-2 mb-4">
    <label htmlFor="address" className="text-sm font-medium">
      {t("loi.buyer.address")}
    </label>
    <Input 
      id="address" 
      value={formData.address}
      onChange={handleChange}
      placeholder={t("loi.buyer.addressPlaceholder")}
      className="rounded-lg"
    />
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div className="space-y-2">
      <label htmlFor="representativeName" className="text-sm font-medium flex items-center gap-1">
        <span>{t("loi.buyer.repName")}</span>
        <span className="text-destructive">*</span>
      </label>
      <Input 
        id="representativeName" 
        value={formData.representativeName}
        onChange={handleChange}
        required 
        placeholder={t("loi.buyer.repNamePlaceholder")}
        className="rounded-lg"
      />
    </div>
    
    <div className="space-y-2">
      <label htmlFor="title" className="text-sm font-medium">
        {t("loi.buyer.title")}
      </label>
      <Input 
        id="title" 
        value={formData.title}
        onChange={handleChange}
        placeholder={t("loi.buyer.titlePlaceholder")}
        className="rounded-lg"
      />
    </div>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <div className="space-y-2">
      <label htmlFor="phone" className="text-sm font-medium flex items-center gap-1">
        <Phone className="w-4 h-4 text-amber-500" />
        <span>{t("loi.buyer.phone")}</span>
        <span className="text-destructive">*</span>
      </label>
      <Input 
        id="phone" 
        value={formData.phone}
        onChange={handleChange}
        required 
        placeholder={t("loi.buyer.phonePlaceholder")}
        className="rounded-lg"
      />
    </div>
    
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-medium flex items-center gap-1">
        <Mail className="w-4 h-4 text-amber-500" />
        <span>{t("loi.buyer.email")}</span>
        <span className="text-destructive">*</span>
      </label>
      <Input 
        id="email" 
        type="email"
        value={formData.email}
        onChange={handleChange}
        required 
        placeholder={t("loi.buyer.emailPlaceholder")}
        className="rounded-lg"
      />
    </div>
  </div>
  
  <div className="space-y-2">
    <label htmlFor="website" className="text-sm font-medium">
      {t("loi.buyer.website")}
    </label>
    <Input 
      id="website" 
      value={formData.website}
      onChange={handleChange}
      placeholder={t("loi.buyer.websitePlaceholder")}
      className="rounded-lg"
    />
  </div>
</div>
                
                {/* Bank Information Section */}
                <div className="bg-indigo-50 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    {t("loi.sections.bankInfo")}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label htmlFor="bankName" className="text-sm font-medium">
                      {t('loi.bn')}
                      </label>
                      <Input 
                        id="bankName" 
                        value={formData.bankName}
                        onChange={handleChange}
                        placeholder={t("loi.bankNamePlaceholder")}
                        className="rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="bankSwiftCode" className="text-sm font-medium">
                      {t('loi.bwc')}
                      </label>
                      <Input 
                        id="bankSwiftCode" 
                        value={formData.bankSwiftCode}
                        onChange={handleChange}
                        placeholder={t("loi.bankSwiftCodePlaceholder")}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <label htmlFor="bankAddress" className="text-sm font-medium">
                    {t('loi.bd')}
                    </label>
                    <Input 
                      id="bankAddress" 
                      value={formData.bankAddress}
                      onChange={handleChange}
                      placeholder={t("loi.bankAddressPlaceholder")}
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label htmlFor="accountName" className="text-sm font-medium">
                      {t('loi.an')}
                      </label>
                      <Input 
                        id="accountName" 
                        value={formData.accountName}
                        onChange={handleChange}
                        placeholder={t("loi.accountNamePlaceholder")}
                        className="rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="accountNumber" className="text-sm font-medium">
                      {t('loi.anu')}
                      </label>
                      <Input 
                        id="accountNumber" 
                        value={formData.accountNumber}
                        onChange={handleChange}
                        placeholder={t("loi.accountNumberPlaceholder")}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="bankOfficerName" className="text-sm font-medium">
                       {t('loi.bon')}
                      </label>
                      <Input 
                        id="bankOfficerName" 
                        value={formData.bankOfficerName}
                        onChange={handleChange}
                        placeholder={t("loi.bankOfficerNamePlaceholder")}
                        className="rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="bankOfficerTitle" className="text-sm font-medium">
                       {t('loi.bot')}
                      </label>
                      <Input 
                        id="bankOfficerTitle" 
                        value={formData.bankOfficerTitle}
                        onChange={handleChange}
                        placeholder={t("loi.bankOfficerTitlePlaceholder")}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Legal Warnings Section */}
                <div className="bg-red-50 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center">
                    <ShieldCheck className="w-5 h-5 mr-2" />
                    {t("loi.sections.legalWarnings")}
                  </h3>
                  
                  <div className="space-y-4 text-sm text-red-700/90">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <input 
                          type="checkbox" 
                          required 
                          className="h-4 w-4 text-red-600 border-red-300 rounded focus:ring-red-500"
                        />
                      </div>
                      <p>
                      {t("loi.wr1")}
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <input 
                          type="checkbox" 
                          required 
                          className="h-4 w-4 text-red-600 border-red-300 rounded focus:ring-red-500"
                        />
                      </div>
                      <p>
                      {t("loi.wr2")}

                      </p>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <input 
                          type="checkbox" 
                          required 
                          className="h-4 w-4 text-red-600 border-red-300 rounded focus:ring-red-500"
                        />
                      </div>
                      <p>
                      {t("loi.wr3")}

                      </p>
                    </div>
                  </div>
                </div>

                {/* Signature Section */}
                <div className="bg-slate-50 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                    <FileSignature className="w-5 h-5 mr-2" />
                    {t("loi.sections.signature")}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="signature" className="text-sm font-medium flex items-center gap-1">
                        <span>
                        {t("loi.lg1")}
                        </span>
                        <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="signature"
                        placeholder={t("loi.signaturePlaceholder")}
                        className="rounded-lg font-semibold"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                      {t("loi.lg2")}
                      </label>
                      <div className="flex flex-col gap-2">
                        <Input 
                          type="file" 
                          accept=".pdf,.jpg,.png"
                          className="rounded-lg py-1.5"
                          onChange={(e) => {/* Handle file upload */}}
                        />
                        <p className="text-xs text-gray-500">
                        {t("loi.lg3")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Special Conditions Section */}
                <div className="bg-violet-50 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-violet-700 mb-4 flex items-center">
                    <ShieldCheck className="w-5 h-5 mr-2" />
                    {t("loi.sections.specialConditions")}
                  </h3>
                  
                  <div className="space-y-3 text-sm text-gray-700">
                    <p className="flex gap-2">
                      <span className="text-violet-600 font-semibold">§</span>
                      {t("loi.sc1")}
                    </p>
                    <p className="flex gap-2">
                      <span className="text-violet-600 font-semibold">§</span>
                      {t("loi.sc2")}
                    </p>
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
                      <span>{t("loi.sc3")}</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {t("loi.sc4")}
                   </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default LOIForm;