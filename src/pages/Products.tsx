import { useState, useCallback, useMemo, memo, lazy, Suspense, useEffect } from "react";
import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { useI18n } from "@/utils/i18n";
import { ProductCard } from "@/components/ui/products/ProductCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, Filter, ShoppingBag, Package, Leaf, Droplet, Fuel, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
// Product category type
type ProductCategory = "all" | "food" | "oils" | "agri" | "petro";

// Memoized ProductCardWrapper component
const MemoizedProductCardWrapper = memo(({ 
  title, 
  image, 
  description, 
  details,
  category,
  productId 
}: { 
  title: string;
  image: string;
  description: string;
  details: string[];
  category: string;
  productId: string;
}) => {
  const navigate = useNavigate();
  const { t } = useI18n();
  // Get category label and icon
  const getCategoryInfo = useCallback((cat: string) => {
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
  }, [t]);

  const categoryInfo = useMemo(() => getCategoryInfo(category), [category, getCategoryInfo]);
  const CategoryIcon = categoryInfo.icon;

  const handleRequestQuote = () => {
    navigate('/inquiry', { state: { selectedProduct: productId } });
  };

  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col group"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <div className="aspect-[16/9] overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="absolute top-4 left-4">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md shadow-sm ${categoryInfo.color}`}>
            <CategoryIcon className="w-3 h-3" />
            <span>{categoryInfo.label}</span>
          </div>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow text-sm">{description}</p>
        <div className="space-y-2 mt-auto">
          {details.map((detail, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <p className="text-sm text-gray-700">{detail}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 pb-6">
        <Button 
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-700 hover:to-emerald-600 rounded-xl transition-all duration-300 group relative overflow-hidden shadow-md hover:shadow-lg hover:shadow-emerald-500/20"
          onClick={handleRequestQuote}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {t('products.requestQuote')}
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
    </motion.div>
  );
});

MemoizedProductCardWrapper.displayName = 'MemoizedProductCardWrapper';

// Memoized category button component
const CategoryButton = memo(({ 
  category, 
  activeCategory, 
  onClick, 
  index 
}: { 
  category: { id: string; label: string; icon: any }; 
  activeCategory: string; 
  onClick: () => void;
  index: number;
}) => {
  const Icon = category.icon;
  
  return (
    <motion.div
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
});

CategoryButton.displayName = 'CategoryButton';

const Products = () => {
  const { t, language } = useI18n();
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  // Product data - memoized to prevent recreation on each render
  const products = useMemo(() => [
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
      image: "/Beef.jpg",
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
      image: "/oil.jpeg",
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
  ], [t, language]);

  // Filter products based on active category and search query
  const filteredProducts = useMemo(() => {
    let filtered = activeCategory === "all"
      ? products
      : products.filter((product) => product.category === activeCategory);
    
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
  }, [activeCategory, products, searchQuery]);

  // Category filter buttons with improved icons - memoized
  const categories = useMemo(() => [
    { id: "all", label: t("products.categories.all"), icon: Grid },
    { id: "food", label: t("products.categories.food"), icon: ShoppingBag },
    { id: "oils", label: t("products.categories.oils"), icon: Droplet },
    { id: "agri", label: t("products.categories.agri"), icon: Leaf },
    { id: "petro", label: t("products.categories.petro"), icon: Fuel },
  ], [t]);

  // Memoize animation variants to prevent recreation on each render
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }), []);

  // Memoized category change handler
  const handleCategoryChange = useCallback((category: ProductCategory) => {
    setActiveCategory(category);
  }, []);

  // Handle search input change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  // Clear search query
  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-50 to-emerald-50/30 font-sans">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-6 overflow-hidden">
         
          
         
        </section>

        {/* Filter and Search Section */}
        <section className="py-8">
          
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-5xl mx-auto"
            >
              {/* Modern Search Container */}
              <div className="relative">
                {/* Background decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-300 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-400 rounded-full opacity-20 blur-3xl"></div>
                
                {/* Main container with glass effect */}
                
                  {/* Search Bar */}
                  <div className="relative mb-12 max-w-2xl mx-auto">
                 
                    {/* Background glow effect */}
                    <div 
                      className={cn(
                        "absolute inset-0 rounded-full transition-all duration-500",
                        searchFocused ? "opacity-100" : "opacity-0"
                      )}
                      style={{ 
                        background: "radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 70%)",
                        transform: searchFocused ? "scale(1.2)" : "scale(0.8)",
                        filter: "blur(10px)",
                        zIndex: 0
                      }}
                    />
                    
                    {/* Search input container */}
                    <div className={cn(
                      "relative flex items-center overflow-hidden rounded-full transition-all duration-300 border z-10",
                      searchFocused 
                        ? "border-emerald-400 shadow-lg shadow-emerald-100/50 bg-white" 
                        : "border-gray-200 shadow-sm bg-white/90 hover:border-emerald-200 hover:shadow-md"
                    )}>
                      {/* Animated search icon */}
                      <div className={cn(
                        "absolute left-4 transition-all duration-300 flex items-center justify-center",
                        searchFocused ? "text-emerald-500" : "text-gray-400"
                      )}>
                        <Search className={cn(
                          "h-5 w-5 transition-transform duration-300",
                          searchFocused ? "scale-110" : "scale-100"
                        )} />
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
                        placeholder={`Search ${activeCategory === "all" ? "all products" : activeCategory + " products"}...`}
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                      />
                      
                      {/* Clear button with animation */}
                      <AnimatePresence>
                        {searchQuery && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                            transition={{ 
                              duration: 0.2,
                              type: "spring",
                              stiffness: 300,
                              damping: 15
                            }}
                            className="absolute right-4 p-1.5 rounded-full bg-gray-100 hover:bg-emerald-100 text-gray-500 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition-colors duration-200"
                            onClick={clearSearch}
                            aria-label="Clear search"
                          >
                            <X className="h-4 w-4" />
                          </motion.button>
                        )}
                      </AnimatePresence>
                      
                      {/* Decorative accent line */}
                      <div 
                        className={cn(
                          "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500 ease-out",
                          searchFocused ? "w-full opacity-100" : "w-0 opacity-0"
                        )}
                      />
                    </div>
                    
                    {/* Results counter with animation */}
                    <AnimatePresence>
                      {searchQuery && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-4 -bottom-8 text-xs font-medium tracking-wide flex items-center gap-1.5"
                        >
                          <span className="inline-flex items-center justify-center bg-emerald-100 text-emerald-700 rounded-full px-2 py-0.5">
                            {filteredProducts.length}
                          </span>
                          <span className="text-emerald-600">
                            {filteredProducts.length === 1 ? 'result' : 'results'} found
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Category Filters with enhanced styling */}
                  <div className="relative">
                    <div className="flex flex-wrap gap-3 md:gap-4 justify-center items-center">
                      {categories.map((category, index) => (
                        <CategoryButton
                          key={category.id}
                          category={category}
                          activeCategory={activeCategory}
                          onClick={() => handleCategoryChange(category.id as ProductCategory)}
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
        <section className="py-8 pb-24">
          <div className={cn("page-container", language === "ar" ? "rtl" : "ltr")}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCategory + searchQuery} // Force re-animation when filters change
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <MemoizedProductCardWrapper
                      key={product.id}
                      title={product.title}
                      image={product.image}
                      description={product.description}
                      details={product.details}
                      category={product.category}
                      productId={getProductIdByIndex(product.id)}
                    />
                  ))
                ) : (
                  <motion.div 
                    className="col-span-full text-center py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
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
                        className="mt-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-700 hover:to-emerald-600 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-emerald-500/20"
                        onClick={() => {
                          setSearchQuery("");
                          setActiveCategory("all");
                        }}
                      >
                        {t('products.clearFilters')}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Helper function to get consistent product IDs
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

export default Products;