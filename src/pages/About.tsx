import { Header } from "@/components/ui/layout/Header";
import { Footer } from "@/components/ui/layout/Footer";
import { useI18n } from "@/utils/i18n";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Globe, Award, Users, Handshake, Building2, Plane, Ship, Truck, Store, Factory, User, MapPin, Briefcase } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { LucideIcon } from "lucide-react";

interface Partner {
  id: string;
  icon: LucideIcon;
  additionalLocation?: boolean;
  website?: string;
}

const About = () => {
  const { t, language } = useI18n();

  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const TeamSection = () => {
    const teamMembers = [
      {
        name: "Dipl.-Ing. MBA Adama Sow",
        role: "CEO, General Manager",
        description: "Visionary leader with strategic insights.",
        image: "/Adama.jpg",
        socialLinks: {
          linkedin: "https://www.linkedin.com/company/roodan",
          twitter: "https://twitter.com/roodan",
          email: "mailto:adama@roodan.ae",
        },
      },
      {
        name: "Jens Marson",
        role: "COO, Co-Manager",
        description: "Operational excellence expert.",
        image: "/Jens_marson.jpg",
        socialLinks: {
          linkedin: "https://www.linkedin.com/company/roodan",
          twitter: "https://twitter.com/roodan",
          email: "mailto:jens@roodan.ae",
        },
      },
      {
        name: "Tilmann Schillinger",
        role: "CFO, Co-Manager",
        description: "Financial strategy mastermind.",
        image: "/Tilmann_Schillinger.jpg",
        socialLinks: {
          linkedin: "https://www.linkedin.com",
          twitter: "https://twitter.com",
          email: "mailto:tilmann@roodan.ae",
        },
      },
      {
        name: "MBA, BSc. Pamela Aupindi ",
        role: "Business Development Africa",
        description: "International markets connector.",
        image: "/Pamela.jpg",
        socialLinks: {
          linkedin: "https://www.linkedin.com",
          twitter: "https://twitter.com",
          email: "mailto:pamela@roodan.ae",
        },
      },
      {
        name: "MBA, MSc.(UK) Kunal More",
        role: "Business Development Asia",
        description: "Technology transformation driver.",
        image: "/Kunal.jpg",
        socialLinks: {
          linkedin: "https://www.linkedin.com",
          twitter: "https://twitter.com",
          email: "mailto:kunal@roodan.ae",
        },
      },
      {
        name: "LLM. Makedonia Chante",
        role: "Laws and International Relations",
        description: "Technology transformation driver.",
        image: "/Makedonia.jpg",
        socialLinks: {
          linkedin: "https://www.linkedin.com",
          twitter: "https://twitter.com",
          email: "mailto:makedonia@roodan.ae",
        },
      },
    ];

    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="group relative h-[380px] sm:h-[400px] md:h-[420px] [perspective:1000px]"
            >
              <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front Card */}
                <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white/90 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-400/5 to-gray-600/10 mix-blend-multiply z-10" />
                  <div className="absolute inset-0 backdrop-blur-[1px] z-0" />
                  <img
                    src={member.image}
                    alt={member.name}
                    style={
                      member.name === "LLM. Makedonia Chante"
                        ? { objectPosition: "center top" }
                        : {}
                    }
                    className={`absolute inset-0 w-full h-full ${
                      member.name === "LLM. Makedonia Chante"
                        ? "object-cover"
                        : "object-cover"
                    } z-0`}
                  />

                  {/* Glass Nameplate */}
                  <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/80 border-t border-gray-100 p-6 z-20">
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                        {member.name}
                      </h3>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-base text-emerald-600 font-medium break-words flex-1">
                          {member.role}
                        </p>
                        <span className="text-sm text-gray-500 flex items-center gap-1 group-hover:scale-110 transition-transform whitespace-nowrap">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Flip
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements - Reduced */}
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-blue-300 opacity-10 blur-3xl z-10" />
                </div>

                {/* Back Card */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-white p-8 flex flex-col justify-center shadow-md border border-gray-200">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0zMCAzNGgtMnYtNGgydjR6bTAtNnYtNGgtMnY0aDJ6TTI0IDM0aC0ydi00aDJ2NHptMC02di00aC0ydjRoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10 mix-blend-overlay" />

                  {/* Logo in bottom right */}
                  <div className="absolute bottom-7 right-7 flex items-center bg-white p-2 rounded shadow-md z-10">
                    <img
                      src="/tree_logo.png"
                      alt="Roodan Logo"
                      className="h-11 object-contain"
                    />
                  </div>

                  <div className="mb-6 relative">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 break-words">
                      {member.name}
                    </h3>
                    <p className="text-base text-emerald-600 font-medium mb-4 break-words">
                      {member.role}
                    </p>
                    <div className="w-16 h-1 bg-emerald-500" />
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-4 mt-auto relative z-[100]">
                    {/* LinkedIn */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          member.socialLinks.linkedin,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-md cursor-pointer group"
                      aria-label="LinkedIn"
                    >
                      <svg
                        className="w-5 h-5 group-hover:animate-pulse"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </button>

                    {/* Twitter */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(
                          member.socialLinks.twitter,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-md cursor-pointer group"
                      aria-label="Twitter"
                    >
                      <svg
                        className="w-5 h-5 group-hover:animate-pulse"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </button>

                    {/* Email */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = member.socialLinks.email;
                      }}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-md cursor-pointer group"
                      aria-label="Email"
                    >
                      <svg
                        className="w-5 h-5 group-hover:animate-pulse"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const PartnersSection = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const scrollAmount = 320; // Width of one card
    const scrollSpeed = 0.5; // Reduced speed for smoother animation
    const animationFrameRef = useRef<number>();

    const partnersData: Partner[] = [
      { id: "europe", icon: Globe },
      { id: "westAfrica", icon: Building2 },
      { id: "mali", icon: Store },
      { id: "asia", icon: Plane },
      { id: "india", icon: Ship, additionalLocation: true },
      { id: "latinAmerica", icon: Globe },
      { id: "logistics", icon: Truck, website: "https://www.unitedgloball.com" },
      { id: "uae", icon: Building2, additionalLocation: true },
      { id: "ivoryCoast", icon: Store }
    ];

    // Create a duplicated array for seamless looping
    const duplicatedPartners = [...partnersData, ...partnersData];

    useEffect(() => {
      const animate = () => {
        if (!isHovered && carouselRef.current) {
          const containerWidth = carouselRef.current.scrollWidth;
          const halfWidth = containerWidth / 2;
          
          setScrollPosition((prevPosition) => {
            // Increment position for continuous scrolling
            let newPosition = prevPosition + scrollSpeed;
            
            // When we reach halfway through the duplicated content, 
            // reset position to create an invisible loop
            if (newPosition >= halfWidth) {
              // Instead of using animation transition for this reset,
              // directly set the position without animation
              carouselRef.current.style.transition = 'none';
              newPosition = 0;
              
              // Force a reflow to ensure the transition removal takes effect
              // before we re-enable it after a very short delay
              setTimeout(() => {
                carouselRef.current.style.transition = 'transform 0.5s ease-out';
              }, 10);
            }
            
            return newPosition;
          });
        }
        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animationFrameRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isHovered, scrollSpeed]);

    const handleScroll = (direction: "left" | "right") => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.scrollWidth;
        const halfWidth = containerWidth / 2;
        
        let newPosition;
        
        if (direction === "left") {
          newPosition = scrollPosition - scrollAmount;
          // If we would scroll before the start, loop around to the end
          if (newPosition < 0) {
            // Use the same no-transition approach for seamless wrapping
            carouselRef.current.style.transition = 'none';
            newPosition = halfWidth - scrollAmount;
            
            // Force a reflow before re-enabling transitions
            setTimeout(() => {
              carouselRef.current.style.transition = 'transform 0.5s ease-out';
            }, 10);
          }
        } else {
          newPosition = scrollPosition + scrollAmount;
          // If we would scroll past the halfway point, loop back to beginning
          if (newPosition >= halfWidth) {
            // Use the same no-transition approach for seamless wrapping
            carouselRef.current.style.transition = 'none';
            newPosition = 0;
            
            // Force a reflow before re-enabling transitions
            setTimeout(() => {
              carouselRef.current.style.transition = 'transform 0.5s ease-out';
            }, 10);
          }
        }
        
        setScrollPosition(newPosition);
      }
    };

    return (
      <div className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={sectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center justify-center gap-2 mb-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                whileInView={{
                  scale: 1,
                  opacity: 1,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    delay: 0.1,
                  },
                }}
                viewport={{ once: true }}
                className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 text-emerald-600"
              >
                <Handshake className="w-6 h-6" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                {t("about.partners.title")}
              </h2>
              <div className="w-20 h-1 mx-auto mt-4 bg-emerald-500"></div>
            </div>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4 mt-4">
              {t("about.partners.desc")}
            </p>
            <h3 className="text-2xl font-semibold text-gray-800 mb-8">
              {t("about.partners.subtitle")}
            </h3>
          </motion.div>

          <div className="relative">
            <motion.button
              onClick={() => handleScroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg border border-gray-200 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            <div className="overflow-hidden">
              <motion.div
                ref={carouselRef}
                className="flex space-x-6 py-4"
                style={{
                  transform: `translateX(-${scrollPosition}px)`,
                  transition: "transform 0.5s ease-out",
                  willChange: "transform",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {duplicatedPartners.map((partner, index) => (
                  <motion.div
                    key={`${partner.id}-${index}`}
                    className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-[260px]"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        delay: index * 0.1
                      }
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -5,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="flex items-center gap-3 mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <motion.div 
                        className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {partner.icon && <partner.icon className="w-5 h-5 text-emerald-600" />}
                      </motion.div>
                      <h4 className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                        {t(`about.partners.${partner.id}`)}
                      </h4>
                    </motion.div>

                    <div className="flex-grow flex flex-col justify-between space-y-2">
                      <div className="space-y-2">
                        <motion.div 
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 }}
                        >
                          <Briefcase className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <p className="text-gray-800 font-medium">
                            {t(`about.partners.${partner.id}.compName${partner.id === 'uae' ? '1' : ''}`)}
                          </p>
                        </motion.div>

                        <motion.div 
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                        >
                          <User className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <p className="text-gray-600">
                            {t(`about.partners.${partner.id}.name${partner.id === 'uae' ? '1' : ''}`)}
                          </p>
                        </motion.div>

                        <motion.div 
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 }}
                        >
                          <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <p className="text-gray-600">
                            {t(`about.partners.${partner.id}.location${partner.id === 'uae' ? '1' : partner.id === 'india' ? '1' : ''}`)}
                          </p>
                        </motion.div>

                        {partner.additionalLocation && (
                          <motion.div 
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.6 }}
                          >
                            <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <p className="text-gray-600">
                              {t(`about.partners.${partner.id}.location${partner.id === 'uae' ? '2' : partner.id === 'india' ? '2' : ''}`)}
                            </p>
                          </motion.div>
                        )}
                      </div>

                      {partner.website && (
                        <motion.a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:text-emerald-800 block"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          {partner.website}
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.button
              onClick={() => handleScroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg border border-gray-200 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header />
      <main className="flex-grow">
        {/* Mission & Values Section */}
        <motion.section
          className="page-container py-16 md:py-20 mt-12 relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Reduced decorative elements with different colors */}
          <div className="absolute top-20 right-10 w-40 h-40 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>

          <motion.div
            variants={sectionVariants}
            className="max-w-7xl mx-auto px-4 relative z-10"
          >
            <div className="flex flex-col items-center justify-center gap-3 mb-10">
              <h2 className="text-4xl md:text-5xl font-display mt-2 font-bold text-center text-black">
                {t("about.mission.title")}
              </h2>
              <div
                className="w-20 h-1 mx-auto"
                style={{
                  background: "linear-gradient(to right, #059669, #10b981)",
                }}
              ></div>
              <p className="text-xl text-center max-w-3xl mx-auto mt-3 text-gray-600">
                {t("about.mission.desc")}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12">
              {[1, 2, 3, 4].map((value, index) => (
                <motion.div
                  key={`value-${index}`}
                  variants={itemVariants}
                  className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 h-full"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="flex flex-col h-full">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-3 sm:mb-4 text-emerald-600">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3
                        className="text-sm sm:text-base md:text-lg lg:text-xl font-display font-semibold mb-2 break-words bg-clip-text text-transparent"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, #059669, #10b981)",
                        }}
                      >
                        {t(`about.values.value${value}.title`)}
                      </h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed break-words">
                        {t(`about.values.value${value}.desc`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Services section */}
        <motion.section
          className="page-container py-16 md:py-24 mt-12 relative overflow-hidden"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Enhanced decorative elements */}
          <div className="absolute top-20 left-5 w-64 h-64 bg-emerald-200 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute top-40 right-1/4 w-20 h-20 bg-purple-200 rounded-full opacity-15 blur-xl"></div>

          <motion.div
            variants={sectionVariants}
            className="max-w-7xl mx-auto px-4 relative z-10"
          >
            <div className="flex flex-col items-center justify-center gap-3 mb-14">
              <motion.h2
                className="text-4xl md:text-5xl font-display mt-2 font-bold text-center text-gray-800 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: "easeOut" },
                }}
                viewport={{ once: true }}
              >
                {t("about.services.title")}
              </motion.h2>
              <motion.div
                className="w-20 h-1 mx-auto bg-emerald-500"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{
                  width: 80,
                  opacity: 1,
                  transition: { duration: 0.5, delay: 0.3 },
                }}
                viewport={{ once: true }}
              ></motion.div>
              <motion.p
                className="text-xl text-center max-w-3xl mx-auto mt-3 text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: 0.4, ease: "easeOut" },
                }}
                viewport={{ once: true }}
              >
                {t("about.services.desc")}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
              {[1, 2].map((value, index) => (
                <motion.div
                  key={`value-${index}`}
                  variants={itemVariants}
                  className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 h-full relative overflow-hidden group"
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 35px -10px rgba(0, 0, 0, 0.1)",
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                >
                  {/* Decorative gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-60"></div>

                  {/* Decorative corner effect */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-emerald-50 to-transparent opacity-60 rounded-bl-full transform -translate-y-10 translate-x-10 group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-700"></div>

                  <div className="flex flex-col h-full relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 5 }}
                    >
                      {value === 1 ? (
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </motion.div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl md:text-2xl font-display font-semibold mb-5 text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                        {t(`about.service.service${value}.title`)}
                      </h3>

                      <ul className="space-y-3 text-gray-600 text-sm md:text-base">
                        {value === 1 ? (
                          <>
                            <li className="flex items-start group/item transition-all duration-300 hover:translate-x-1">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mr-3 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors duration-300">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 3L4.5 8.5L2 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              <span className="mt-0.5">
                                {t("about.service.service1.item1")}
                              </span>
                            </li>
                            <li className="flex items-start group/item transition-all duration-300 hover:translate-x-1">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mr-3 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors duration-300">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 3L4.5 8.5L2 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              <span className="mt-0.5">
                                {t("about.service.service1.item2")}
                              </span>
                            </li>
                            <li className="flex items-start group/item transition-all duration-300 hover:translate-x-1">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mr-3 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors duration-300">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 3L4.5 8.5L2 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              <span className="mt-0.5">
                                {t("about.service.service1.item3")}
                              </span>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="flex items-start group/item transition-all duration-300 hover:translate-x-1">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mr-3 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors duration-300">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 3L4.5 8.5L2 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              <span className="mt-0.5">
                                {t("about.service.service2.item1")}
                              </span>
                            </li>
                            <li className="flex items-start group/item transition-all duration-300 hover:translate-x-1">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mr-3 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors duration-300">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 3L4.5 8.5L2 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              <span className="mt-0.5">
                                {t("about.service.service2.item2")}
                              </span>
                            </li>
                            <li className="flex items-start group/item transition-all duration-300 hover:translate-x-1">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mr-3 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors duration-300">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 3L4.5 8.5L2 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              <span className="mt-0.5">
                                {t("about.service.service2.item3")}
                              </span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          className="page-container py-16 bg-gray-50 relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Reduced background decorative elements */}
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-400 rounded-full opacity-10 blur-3xl"></div>

          <motion.div
            variants={sectionVariants}
            className="text-center mb-10 relative z-10"
          >
            <div className="flex flex-col items-center justify-center gap-2 mb-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                whileInView={{
                  scale: 1,
                  opacity: 1,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    delay: 0.1,
                  },
                }}
                viewport={{ once: true }}
                className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 text-emerald-600"
              >
                <Users className="w-6 h-6" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mt-4">
                {t("about.team.title")}
              </h2>
              <div className="w-20 h-1 mx-auto mt-4 bg-emerald-500"></div>
            </div>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 mt-4">
              {t("about.team.desc")}
            </p>
          </motion.div>

          <TeamSection />
          <PartnersSection />
        </motion.section>

        {/* Why Choose Us Section */}
        <motion.section
          className="page-container py-16 relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Reduced decorative elements */}
          <div className="absolute top-40 right-20 w-40 h-40 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>

          <motion.div
            variants={sectionVariants}
            className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          >
            <div className="flex flex-col items-center justify-center gap-3 mb-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateY: 180 }}
                whileInView={{
                  scale: 1,
                  opacity: 1,
                  rotateY: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    delay: 0.1,
                  },
                }}
                viewport={{ once: true }}
                className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4 text-emerald-600"
              >
                <Globe className="w-6 h-6" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-gray-800 mt-4">
                {t("about.whyChooseUs.title")}
              </h2>
              <div className="w-20 h-1 mx-auto mt-2 bg-emerald-500"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {[
                "about.whyChooseUs.reason1",
                "about.whyChooseUs.reason2",
                "about.whyChooseUs.reason3",
                "about.whyChooseUs.reason4",
                "about.whyChooseUs.reason5",
              ].map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut",
                    },
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={cn(
                    "bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden",
                    index === 4 ? "col-span-2 max-w-xl mx-auto mt-4" : "h-full"
                  )}
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 sm:gap-4 mb-3">
                      <div className="hidden sm:block w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-emerald-500"></div>
                      </div>
                      <h3
                        className="text-base sm:text-lg md:text-xl font-display font-semibold text-gray-800 break-words bg-clip-text text-transparent flex-1"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, #059669, #10b981)",
                        }}
                      >
                        {t(`about.whyChooseUs.title${index + 1}`)}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line sm:pl-14 break-words">
                      {t(reason)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
