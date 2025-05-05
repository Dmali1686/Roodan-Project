import { useState, useCallback, useMemo, memo, useEffect, useRef } from "react";
import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { useI18n } from "@/utils/i18n";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, ShoppingBag, Package, Leaf, Droplet, Fuel, Search, X, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QuoteRequestForm } from "@/components/ui/forms/QuoteRequestForm";

// Define proper TypeScript interfaces
interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  details: string[];
  category: ProductCategory;
}

// Product category type
type ProductCategory = "all" | "food" | "oils" | "agri" | "petro";

// Category information interface
interface CategoryInfo {
  label: string;
  icon: React.ComponentType<any>;
  color: string;
}

// Category button props interface
interface CategoryButtonProps {
  category: {
    id: ProductCategory;
    label: string;
    icon: React.ComponentType<any>;
  };
  activeCategory: ProductCategory;
  onClick: () => void;
  index: number;
}

// Product card props interface
interface ProductCardProps {
  title: string;
  image: string;
  description: string;
  details: string[];
  category: ProductCategory;
  productId: string;
  t: (key: string) => string;
}

// Add ProductModal interface
interface ProductModalProps {
  product: Product;
  onClose: () => void;
  t: (key: string) => string;
  language: string;
}

// Move category info function outside component
const getCategoryInfo = (cat: ProductCategory, t: (key: string) => string): CategoryInfo => {
  switch(cat) {
    case 'food':
      return { label: t('products.categories.food'), icon: ShoppingBag, color: 'bg-amber-100/80 text-amber-700 border border-amber-200/50' };
    case 'oils':
      return { label: t('products.categories.oils'), icon: Droplet, color: 'bg-yellow-100/80 text-yellow-700 border border-yellow-200/50' };
    case 'agri':
      return { label: t('products.categories.agri'), icon: Leaf, color: 'bg-emerald-100/80 text-emerald-700 border border-emerald-200/50' };
    case 'petro':
      return { label: t('products.categories.petro'), icon: Fuel, color: 'bg-blue-100/80 text-blue-700 border border-blue-200/50' };
    default:
      return { label: t('products.categories.all'), icon: Package, color: 'bg-gray-100/80 text-gray-700 border border-gray-200/50' };
  }
};

// Define animation variants outside component
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

// Move helper function outside the component
const getProductIdByIndex = (id: number): string => {
  switch(id) {
    case 1: return "sugar_icumsa";
    case 2: return "soy_products";
    case 3: return "coffee_beans";
    case 4: return "beef_products";
    case 5: return "chicken_meat";
    case 6: return "beef_ghee";
    case 7: return "vegetable_oils";
    case 8: return "rice_varieties";
    case 9: return "olive_oil";
    case 10: return "urea_and_fertilizers";
    case 11: return "petroleum_products";
    default: return "";
  }
};

// Add ProductModal component
const ProductModal = memo(({ product, onClose, t, language }: ProductModalProps) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const categoryInfo = useMemo(() => getCategoryInfo(product.category, t), [product.category, t]);
  const CategoryIcon = categoryInfo.icon;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleRequestQuote = useCallback(() => {
    onClose(); // Close the modal first
    navigate('/inquiry'); // Navigate without state to show LOIForm
  }, [navigate, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden h-[90vh] md:h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-colors"
          aria-label="Close modal"
        >
          <XCircle className="w-6 h-6 text-gray-500 hover:text-gray-700" />
        </button>

        <div className="grid md:grid-cols-2 h-full">
          {/* Image section */}
          <div 
            className="relative h-[40vh] md:h-full bg-emerald-50/30"
          >
            <img
              src={product.image}
              alt={product.title}
              className={cn(
                "w-full h-full object-cover",
                !imageLoaded && "blur-sm opacity-0",
                imageLoaded && "blur-0 opacity-100 transition-all duration-500"
              )}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md shadow-sm ${categoryInfo.color}`}>
                <CategoryIcon className="w-3 h-3" />
                <span>{categoryInfo.label}</span>
              </div>
            </div>
          </div>

          {/* Content section */}
          <div 
            className="p-4 md:p-8 flex flex-col overflow-y-auto"
          >
            <h2 
              className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 line-clamp-2"
            >
              {product.title}
            </h2>
            
            <p 
              className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 line-clamp-4"
            >
              {product.description}
            </p>
            
            <div 
              className="space-y-3 md:space-y-4 mb-6 md:mb-8 flex-grow"
            >
              {product.details.map((detail, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                  <p className="text-sm md:text-base text-gray-700 line-clamp-2">{detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <Button
                onClick={handleRequestQuote}
                className={cn(
                  "w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white",
                  "hover:from-emerald-700 hover:to-emerald-600 rounded-lg",
                  "transition-all duration-300 group relative overflow-hidden",
                  "shadow-md hover:shadow-lg transform-gpu py-3 md:py-4 text-base md:text-lg"
                )}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t('products.requestQuote')}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 transform-gpu"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProductModal.displayName = 'ProductModal';

// Add QuoteFormModal component
const QuoteFormModal = memo(({ productId, onClose }: { productId: string; onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-colors"
          aria-label="Close modal"
        >
          <XCircle className="w-6 h-6 text-gray-500 hover:text-gray-700" />
        </button>
        <div className="p-4 overflow-y-auto">
          <QuoteRequestForm selectedProduct={productId} />
        </div>
      </div>
    </div>
  );
});

QuoteFormModal.displayName = 'QuoteFormModal';

// Update MemoizedProductCardWrapper component
const MemoizedProductCardWrapper = memo(({
  title, 
  image, 
  description, 
  details,
  category,
  productId,
  t,
  onClick
}: ProductCardProps & { onClick: () => void }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const categoryInfo = useMemo(() => getCategoryInfo(category, t), [category, t]);
  const CategoryIcon = categoryInfo.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleRequestQuote = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/inquiry'); // Navigate without state to show LOIForm
  }, [navigate]);

  return (
    <motion.div 
      ref={cardRef}
      className={cn(
        "bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-xl",
        "transition-all duration-300 border border-gray-100 h-[500px] flex flex-col group",
        "transform-gpu w-full cursor-pointer",
        !isVisible && "opacity-0",
        isVisible && "animate-fadeIn"
      )}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <div className="relative h-[200px]">
        <div className="w-full h-full overflow-hidden bg-emerald-50/30">
          {isVisible && (
            <img 
              src={image}
              alt={title} 
              className={cn(
                "w-full h-full object-cover transform-gpu will-change-transform",
                "group-hover:scale-105 transition-all duration-500 ease-out",
                !imageLoaded && "blur-sm opacity-0",
                imageLoaded && "blur-0 opacity-100"
              )}
              loading="lazy"
              decoding="async"
              width="320"
              height="240"
              onLoad={() => setImageLoaded(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="absolute top-4 left-4">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md shadow-sm ${categoryInfo.color}`}>
            <CategoryIcon className="w-3 h-3" />
            <span>{categoryInfo.label}</span>
          </div>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col h-[300px]">
        <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors line-clamp-1">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{description}</p>
        <div className="space-y-2 flex-grow">
          {details.map((detail, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
              <p className="text-xs text-gray-700 line-clamp-1">{detail}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 pt-0 mt-auto">
        <Button 
          className={cn(
            "w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white",
            "hover:from-emerald-700 hover:to-emerald-600 rounded-lg",
            "transition-all duration-300 group relative overflow-hidden",
            "shadow-md hover:shadow-lg transform-gpu py-2.5"
          )}
          onClick={handleRequestQuote}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
            {t('products.requestQuote')}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 transform-gpu" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </Button>
      </div>
    </motion.div>
  );
});

MemoizedProductCardWrapper.displayName = 'MemoizedProductCardWrapper';

// Memoized category button with improved props
const CategoryButton = memo(({ 
  category, 
  activeCategory, 
  onClick, 
  index 
}: CategoryButtonProps) => {
  const Icon = category.icon;
  
  return (
    <motion.div
      key={`${category.id}-${category.label}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: 0.1 + index * 0.05,
        type: "spring",
        stiffness: 100
      }}
    >
      <Button
        variant={activeCategory === category.id ? "default" : "outline"}
        onClick={onClick}
        className={cn(
          "group transition-all duration-300 px-5 py-2 rounded-full h-12 flex items-center justify-center",
          activeCategory === category.id
            ? "shadow-md"
            : "hover:border-emerald-700 hover:bg-emerald-50/70"
        )}
        style={
          activeCategory === category.id
            ? { background: "linear-gradient(to right, #059669, #10b981)" }
            : {}
        }
      >
        <div className="flex items-center gap-2">
          <Icon
            className={cn(
              "w-5 h-5 transition-colors",
              activeCategory === category.id
                ? "text-white"
                : "text-emerald-700 group-hover:text-emerald-800"
            )}
          />
          <span 
            className={cn(
              "font-medium",
              activeCategory === category.id ? "text-white" : ""
            )}
          >
            {category.label}
          </span>
        </div>
      </Button>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.activeCategory === nextProps.activeCategory &&
    prevProps.category.id === nextProps.category.id &&
    prevProps.category.label === nextProps.category.label
  );
});

CategoryButton.displayName = 'CategoryButton';

const Products = () => {
  const { t, language } = useI18n();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [productData, setProductData] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Initialize product data with translations
  useEffect(() => {
    // Create product data only when language changes
    setProductData([
      {
        id: 1,
        title: t('product.sugar.title'),
        image: "/sugar.jpg",
        description: t('product.sugar.description'),
        details: [
          t('product.sugar.detail1'),
          t('product.sugar.detail2'),
          t('product.sugar.detail3'),
        ],
        category: "food",
      },
      {
        id: 2,
        title: t('product.soy.title'),
        image: "/soya.jpg",
        description: t('product.soy.description'),
        details: [
          t('product.soy.detail1'),
          t('product.soy.detail2'),
          t('product.soy.detail3'),
        ],
        category: "agri",
      },
      {
        id: 3,
        title: t('product.coffee.title'),
        image: "/coffee.jpg",
        description: t('product.coffee.description'),
        details: [
          t('product.coffee.detail1'),
          t('product.coffee.detail2'),
          t('product.coffee.detail3'),
        ],
        category: "food",
      },
      {
        id: 4,
        title: t('product.beef.title'),
        image: "/meat.jpg",
        description: t('product.beef.description'),
        details: [
          t('product.beef.detail1'),
          t('product.beef.detail2'),
          t('product.beef.detail3'),
        ],
        category: "food",
      },
      {
        id: 5,
        title: t('product.chicken.title'),
        image: "/chicken.jpg",
        description: t('product.chicken.description'),
        details: [
          t('product.chicken.detail1'),
          t('product.chicken.detail2'),
          t('product.chicken.detail3'),
        ],
        category: "food",
      },
      {
        id: 6,
        title: t('product.ghee.title'),
        image: "/Ghee.jpg",
        description: t('product.ghee.description'),
        details: [
          t('product.ghee.detail1'),
          t('product.ghee.detail2'),
          t('product.ghee.detail3'),
        ],
        category: "oils",
      },
      {
        id: 7,
        title: t('product.vegetable.title'),
        image: "/oil.png",
        description: t('product.vegetable.description'),
        details: [
          t('product.vegetable.detail1'),
          t('product.vegetable.detail2'),
          t('product.vegetable.detail3'),
        ],
        category: "oils",
      },
      {
        id: 8,
        title: t('product.rice.title'),
        image: "/Rice.jpg",
        description: t('product.rice.description'),
        details: [
          t('product.rice.detail1'),
          t('product.rice.detail2'),
          t('product.rice.detail3'),
        ],
        category: "food",
      },
      {
        id: 9,
        title: t('product.olive.title'),
        image: "/olive-oil.jpg",
        description: t('product.olive.description'),
        details: [
          t('product.olive.detail1'),
          t('product.olive.detail2'),
          t('product.olive.detail3'),
        ],
        category: "oils",
      },
      {
        id: 10,
        title: t('product.urea.title'),
        image: "/Urea.png",
        description: t('product.urea.description'),
        details: [
          t('product.urea.detail1'),
          t('product.urea.detail2'),
          t('product.urea.detail3'),
        ],
        category: "agri",
      },
      {
        id: 11,
        title: t('product.petroleum.title'),
        image: "/petrol.jpg",
        description: t('product.petroleum.description'),
        details: [
          t('product.petroleum.detail1'),
          t('product.petroleum.detail2'),
          t('product.petroleum.detail3'),
        ],
        category: "petro",
      },
    ]);
  }, [language, t]);

  // Memoize categories to prevent recreating on each render
  const categories = useMemo(() => [
    { id: "all" as ProductCategory, label: t("products.categories.all"), icon: Grid },
    { id: "food" as ProductCategory, label: t("products.categories.food"), icon: ShoppingBag },
    { id: "oils" as ProductCategory, label: t("products.categories.oils"), icon: Droplet },
    { id: "agri" as ProductCategory, label: t("products.categories.agri"), icon: Leaf },
    { id: "petro" as ProductCategory, label: t("products.categories.petro"), icon: Fuel },
  ], [t, language]);

  // Filter products based on active category and search query
  const filteredProducts = useMemo(() => {
    if (!productData.length) return [];
    
    let filtered = activeCategory === "all"
      ? productData
      : productData.filter((product) => product.category === activeCategory);
    
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.details.some((detail) => detail.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [activeCategory, productData, searchQuery]);

  // Memoized category change handler
  const handleCategoryChange = useCallback((category: ProductCategory) => {
    setActiveCategory(category);
  }, []);

  // Handle search input change - debounced
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  }, []);

  // Clear search query
  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  // Reset filters function
  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setActiveCategory("all");
  }, []);

  // Generate search placeholder text based on active category and language
  const getSearchPlaceholder = useCallback(() => {
    const categoryName = activeCategory === "all" 
      ? t('products.categories.all').toLowerCase() 
      : t(`products.categories.${activeCategory}`).toLowerCase();
    
    return t('products.searchPlaceholder').replace('{category}', categoryName);
  }, [activeCategory, t]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-50 to-emerald-50/30 font-sans">
      <Header />
      <main className="flex-grow">
        {/* Filter and Search Section */}
        <section className="py-8 pt-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-5xl mx-auto px-4"
          >
            {/* Search Container */}
            <div className="relative mt-8">
              {/* Background decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-300 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-400 rounded-full opacity-20 blur-3xl"></div>
              
              {/* Search Bar */}
              <div className="relative mb-12 max-w-2xl mx-auto">
                {/* Search input container */}
                <div className={cn(
                  "relative flex items-center overflow-hidden rounded-full transition-all duration-300 border z-10",
                  searchFocused 
                    ? "border-emerald-400 shadow-lg shadow-emerald-100/50 bg-white" 
                    : "border-gray-200 shadow-sm bg-white/90 hover:border-emerald-200 hover:shadow-md"
                )}>
                  {/* Search icon */}
                  <div className={cn(
                    "absolute left-4 transition-all duration-300 flex items-center justify-center",
                    searchFocused ? "text-emerald-500" : "text-gray-400"
                  )}>
                    <Search className="h-5 w-5" />
                  </div>
                  
                  {/* Search input */}
                  <input
                    type="text"
                    className={cn(
                      "block w-full py-4 transition-all duration-300 bg-transparent focus:outline-none",
                      searchFocused ? "pl-12 pr-12" : "pl-12 pr-4"
                    )}
                    style={{ 
                      fontSize: "1.05rem", 
                      letterSpacing: "0.01em",
                      caretColor: "#10b981" 
                    }}
                    placeholder={getSearchPlaceholder()}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                  
                  {/* Clear button */}
                  {searchQuery && (
                    <button
                      className="absolute right-4 p-1.5 rounded-full bg-gray-100 hover:bg-emerald-100 text-gray-500 hover:text-emerald-600 focus:outline-none transition-colors duration-200"
                      onClick={clearSearch}
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  
                  {/* Accent line */}
                  <div 
                    className={cn(
                      "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500 ease-out",
                      searchFocused ? "w-full opacity-100" : "w-0 opacity-0"
                    )}
                  />
                </div>
                
                {/* Results counter */}
                {searchQuery && (
                  <div className="absolute right-4 -bottom-8 text-xs font-medium tracking-wide flex items-center gap-1.5">
                    <span className="inline-flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-full px-2 py-0.5">
                      {filteredProducts.length}
                    </span>
                    <span className="text-emerald-600">
                      {filteredProducts.length === 1 
                        ? t('products.singleResult') 
                        : t('products.multipleResults')}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Category Filters */}
              <div className="relative">
                <div className="flex flex-wrap gap-3 md:gap-4 justify-center items-center">
                  {categories.map((category, index) => (
                    <CategoryButton
                      key={`${category.id}-${language}`}
                      category={category}
                      activeCategory={activeCategory}
                      onClick={() => handleCategoryChange(category.id)}
                      index={index}
                    />
                  ))}
                </div>
                
                {/* Decorative corner accents */}
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-emerald-100/50 rounded-tr-xl -mt-2 -mr-2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-emerald-100/50 rounded-bl-xl -mb-2 -ml-2 pointer-events-none"></div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Products Grid */}
        <section className="py-8 pb-24 w-full overflow-x-hidden">
          <div className={cn("max-w-[1800px] mx-auto px-1 sm:px-4 md:px-6 w-full", language === "ar" ? "rtl" : "ltr")}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCategory + searchQuery.length + language}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div key={product.id} className="w-full min-w-0">
                      <div className="w-full min-w-0">
                        <MemoizedProductCardWrapper
                          title={product.title}
                          image={product.image}
                          description={product.description}
                          details={product.details}
                          category={product.category}
                          productId={getProductIdByIndex(product.id)}
                          t={t}
                          onClick={() => setSelectedProduct(product)}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/80 p-8 max-w-md mx-auto">
                      <div className="text-emerald-500 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('products.noProductsFound')}</h3>
                      <p className="text-gray-600">
                        {searchQuery 
                          ? t('products.noProductsMatching').replace('{query}', searchQuery).replace('{category}', activeCategory === "all" ? t('products.categories.all').toLowerCase() : t(`products.categories.${activeCategory}`).toLowerCase())
                          : t('products.noProductsInCategory').replace('{category}', activeCategory === "all" ? t('products.categories.all').toLowerCase() : t(`products.categories.${activeCategory}`).toLowerCase())
                        }
                      </p>
                      <Button 
                        className="mt-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-700 hover:to-emerald-600 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                        onClick={resetFilters}
                      >
                        {t('products.clearFilters')}
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            t={t}
            language={language}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;