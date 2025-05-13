import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { useI18n } from "@/utils/i18n";
import { useI18nToast } from "@/utils/i18n-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Contact = () => {
  const { t, language } = useI18n();
  const { toast } = useToast();
  const { successToast, errorToast } = useI18nToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Format address to properly display multiline content
  const formatAddress = (address) => {
    // First replace the escaped newlines with actual newlines
    const processedAddress = address.replace(/\\n/g, '\n');
    // Then split by newline and map to spans
    return processedAddress.split('\n').map((line, index) => (
      <span key={index} className="block text-xs leading-relaxed">{line}</span>
    ));
  };
  
  // Improved loading state management
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Update the API endpoint URL and remove Origin header
      const response = await fetch("https://roodan.ae/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(t("contact.errors.failedSend"));
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      
      successToast("contact.success.messageSent", "contact.success.getBackSoon");
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Error) {
        errorToast("contact.errors.networkError", "", { "0": error.message });
      } else {
        errorToast("contact.errors.networkError", "contact.errors.failedSend");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Header />
      <main className="flex-grow relative">
        {/* Added proper spacing from navbar */}
        <div className="h-20 relative z-10"></div>

        <div
          className={cn(
            "page-container",
            language === "ar" ? "rtl" : "ltr",
            "pt-14 pb-8"
          )}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <h2
              className="text-4xl md:text-5xl font-display font-bold text-center text-slate-800 mt-4"
            >
              {t("contact.title")}
            </h2>
          </div>
          <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full mb-8"></div>
        </div>

        {/* Contact Information Cards - Compact with minimal spacing */}
        <section className="py-4">
          <div
            className={cn("page-container", language === "ar" ? "rtl" : "ltr")}
          >
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 h-32 animate-pulse shadow-sm"
                  ></div>
                ))}
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {[
                  {
                    icon: Mail,
                    title: t("contact.email"),
                    links: [
                      { text: "info@roodan.ae", href: "mailto:info@roodan.ae" },
                    ],
                  },
                  {
                    icon: Phone,
                    title: t("contact.phone"),
                    links: [
                      { text: "+971507654228", href: "tel:+971507654228" },
                    ],
                  },
                  {
                    icon: MessageCircle,
                    title: t("contact.whatsapp"),
                    links: [
                      {
                        text: "+971507654228",
                        href: "https://wa.me/971507654228",
                      },
                    ],
                  },
                  {
                    icon: MapPin,
                    title: t("contact.address"),
                    address: t("contact.address_main"),
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.3 },
                      },
                    }}
                    className="bg-white rounded-lg p-3 flex flex-col items-center text-center hover:shadow-md transition-all duration-200 border border-gray-100"
                  >
                    <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                      <item.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-sm font-medium mb-1 text-slate-700">
                      {item.title}
                    </h3>
                    {item.links ? (
                      <div className="space-y-0.5">
                        {item.links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.href}
                            className="block text-xs text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            {link.text}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <address className="not-italic text-xs text-gray-600 mt-1">
                        {formatAddress(item.address)}
                      </address>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Contact Form + Map - Adjusted size for form elements */}
        <section className="py-6 sm:py-8">
          <div
            className={cn(
              "page-container max-w-6xl",
              language === "ar" ? "rtl" : "ltr"
            )}
          >
            <motion.div
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Map Section - Displayed first on mobile */}
                <div className="relative h-[300px] sm:h-[350px] lg:h-auto min-h-[250px] order-first lg:order-last pb-4 sm:pb-6 lg:pb-0">
                  <div className="absolute inset-0 rounded-lg overflow-hidden shadow-sm border border-gray-100">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.417834204089!2d54.33697647424187!3d24.470975504507794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e65e0afe75c95%3A0x3f42d2c696969cec!2sKhalidiyah%20Tower!5e0!3m2!1sen!2sae!4v1710835058468!5m2!1sen!2sae"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Roodan Office Location"
                      className="w-full h-full"
                    />
                  </div>
                </div>
                
                {/* Divider for mobile only */}
                <div className="block lg:hidden w-full h-px bg-gray-200 my-4"></div>
                
                {/* Form Section */}
                <div className="p-5 md:p-6 order-last lg:order-first mt-2 sm:mt-4 lg:mt-0">
                  <h3 className="text-2xl font-bold mb-2 text-slate-800">
                    {t("SendUs.title")}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {t("SendUs.desc")}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1 text-slate-700"
                      >
                        {t("contact.form.name")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        required
                        className="h-10 text-sm rounded-md border-gray-200 focus:border-blue-500 focus:ring-blue-500/30 transition-all"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1 text-slate-700"
                      >
                        {t("contact.form.email")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="h-10 text-sm rounded-md border-gray-200 focus:border-blue-500 focus:ring-blue-500/30 transition-all"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-1 text-slate-700"
                      >
                        {t("contact.form.message")} <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full text-sm rounded-md border-gray-200 focus:border-blue-500 focus:ring-blue-500/30 transition-all resize-y min-h-[100px]"
                        placeholder={t("contact.form.message_placeholder")}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="px-6 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-300 shadow-sm"
                        disabled={isSubmitting}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
                          {isSubmitting ? t("SendUs.sending") : t("SendUs.button")}
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Added bottom spacing */}
        <div className="h-8"></div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;