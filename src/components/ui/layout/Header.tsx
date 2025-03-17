import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useI18n } from "@/utils/i18n";
import { LanguageSelector } from "@/components/ui/home/LanguageSelector";
import { Button } from "@/components/ui/button";
import { Menu, X, CircleUserRound, ArrowRight } from "lucide-react";

export function Header() {
  const { t } = useI18n();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scrolling for page transitions
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const routes = [
    { path: "/", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/products", label: t("nav.products") },
    { path: "/contact", label: t("nav.contact") },
  ];

  // Using emerald colors from Hero.tsx
  const logoGradient = "linear-gradient(to right, #0a5d36, #4ade80)";
  const navHoverGradient = "linear-gradient(to right, #047857, #10b981)";
  const textGradient = "linear-gradient(to right, #059669, #10b981)";
  const hoverTextGradient = "linear-gradient(to right, #047857, #10b981)";
  const underlineGradient = "linear-gradient(to right, #059669, #10b981)";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 precise-transition",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/30 py-1 sm:py-2"
          : "bg-transparent py-2 sm:py-4"
      )}
    >
      <div className="w-full max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <NavLink
            to="/"
            className="flex items-center group"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="transition-all duration-300 group-hover:scale-105 flex items-center">
              <div className="relative flex-shrink-0">
                <img
                  src="/tree_logo.png"
                  alt="Roodan"
                  className={cn(
                    "transition-all duration-300 object-contain",
                    isScrolled 
                      ? "w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20" 
                      : "w-14 h-14 xs:w-16 xs:h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22"
                  )}
                  style={{
                    transform: "translateY(-10%) translateX(5%)"
                  }}
                />
              </div>
              <span 
                className={cn(
                  "font-bold ml-2 xs:ml-3 tracking-wider transition-all duration-300 bg-clip-text text-transparent whitespace-nowrap",
                  isScrolled
                    ? "text-lg xs:text-xl sm:text-2xl md:text-3xl"
                    : "text-xl xs:text-2xl sm:text-3xl md:text-4xl"
                )}
                style={{ 
                  backgroundImage: logoGradient,
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)"
                }}
              >
               {t("logo.title")}
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) =>
                  cn(
                    "relative font-medium text-sm lg:text-base transition-all duration-300 py-2 group",
                    isActive 
                      ? "font-semibold" 
                      : "hover:font-medium"
                  )
                }
                style={({ isActive }) => ({
                  backgroundImage: isActive ? textGradient : "none",
                  WebkitBackgroundClip: isActive ? "text" : "none",
                  WebkitTextFillColor: isActive ? "transparent" : "inherit"
                })}
                onMouseEnter={(e) => {
                  if (!location.pathname.includes(route.path)) {
                    e.currentTarget.style.backgroundImage = hoverTextGradient;
                    e.currentTarget.style.webkitBackgroundClip = "text";
                    e.currentTarget.style.webkitTextFillColor = "transparent";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!location.pathname.includes(route.path)) {
                    e.currentTarget.style.backgroundImage = "none";
                    e.currentTarget.style.webkitBackgroundClip = "none";
                    e.currentTarget.style.webkitTextFillColor = "inherit";
                  }
                }}
                onClick={() => window.scrollTo(0, 0)}
              >
                {route.label}
                <span 
                  className={cn(
                    "absolute -bottom-1 left-0 w-full h-0.5 transition-all duration-500",
                    location.pathname === route.path 
                      ? "scale-x-100 opacity-100" 
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                  )}
                  style={{ 
                    background: underlineGradient,
                    transformOrigin: "left",
                    boxShadow: "0 0 8px rgba(5, 150, 105, 0.5)"
                  }}
                />
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            <LanguageSelector 
              className={cn(
                "transition-all duration-300",
                isScrolled ? "scale-90" : "scale-100"
              )}
            />
            <Button
              asChild
              size="sm"
              className="hover-scale hover:shadow-md font-medium px-3 lg:px-6 lg:text-base lg:size-lg text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600"
              style={{ 
                transition: "all 0.3s ease",
                boxShadow: "0 4px 14px rgba(5, 150, 105, 0.25)"
              }}
            >
              <NavLink to="/inquiry" onClick={() => window.scrollTo(0, 0)}>
                {t("nav.inquiry")}
              </NavLink>
            </Button>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex md:hidden items-center space-x-3 sm:space-x-4">
            <LanguageSelector 
              compact={true}
              className={cn(
                "transition-all duration-300",
                isScrolled ? "scale-90" : "scale-100"
              )}
            />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="h-16 w-16 sm:h-18 sm:w-18"
            >
              {isMobileMenuOpen ? (
                <X className="h-9 w-9 sm:h-10 sm:w-10" />
              ) : (
                <Menu className="h-9 w-9 sm:h-10 sm:w-10" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-[70px] sm:top-[80px] inset-x-0 bg-background border-t border-border/30 shadow-md transition-all duration-300 overflow-y-auto max-h-[calc(100vh-70px)] sm:max-h-[calc(100vh-80px)]">
            <nav className="flex flex-col py-6 sm:py-8 px-4 sm:px-6">
              {routes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={({ isActive }) =>
                    cn(
                      "py-4 sm:py-5 px-4 sm:px-6 font-medium text-lg sm:text-xl transition-all duration-300 group",
                      isActive
                        ? "font-semibold"
                        : "hover:font-medium"
                    )
                  }
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  <span 
                    className="relative inline-block"
                    style={{
                      backgroundImage: location.pathname === route.path ? textGradient : "none",
                      WebkitBackgroundClip: location.pathname === route.path ? "text" : "none",
                      WebkitTextFillColor: location.pathname === route.path ? "transparent" : "inherit",
                    }}
                    onMouseEnter={(e) => {
                      if (!location.pathname.includes(route.path)) {
                        e.currentTarget.style.backgroundImage = hoverTextGradient;
                        e.currentTarget.style.webkitBackgroundClip = "text";
                        e.currentTarget.style.webkitTextFillColor = "transparent";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!location.pathname.includes(route.path)) {
                        e.currentTarget.style.backgroundImage = "none";
                        e.currentTarget.style.webkitBackgroundClip = "none";
                        e.currentTarget.style.webkitTextFillColor = "inherit";
                      }
                    }}
                  >
                    {route.label}
                    <span 
                      className={cn(
                        "absolute -bottom-1 left-0 w-full h-0.5 transition-all duration-500",
                        location.pathname === route.path 
                          ? "scale-x-100 opacity-100" 
                          : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                      )}
                      style={{ 
                        background: underlineGradient,
                        transformOrigin: "left",
                        boxShadow: "0 0 8px rgba(5, 150, 105, 0.5)"
                      }}
                    />
                  </span>
                </NavLink>
              ))}
              <div className="pt-6 sm:pt-8 pb-4 px-4 sm:px-6">
                <Button 
                  className="w-full py-5 sm:py-6 text-base sm:text-lg text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 hover:shadow-lg" 
                  style={{ 
                    boxShadow: "0 4px 14px rgba(5, 150, 105, 0.25)",
                    transition: "all 0.3s ease"
                  }}
                  asChild
                >
                  <NavLink
                    to="/inquiry"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    {t("nav.inquiry")}
                  </NavLink>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}