import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Code, MessageSquare, PhoneCall, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CONTACT_INFO } from "../types";
import { scrollToSection } from "../utils";

interface HeaderProps {
  onQuoteClick: () => void;
  onAdminClick?: () => void;
}

export default function Header({ onQuoteClick, onAdminClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Simple intersection observer alternative for active section highlighting
      const sections = ["inicio", "nosotros", "servicios", "cotizador", "contacto"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    scrollToSection(sectionId);
  };

  const navLinks = [
    { label: "Inicio", target: "inicio" },
    { label: "Nosotros", target: "nosotros" },
    { label: "Servicios", target: "servicios" },
    { label: "Cotizador", target: "cotizador" },
    { label: "Contacto", target: "contacto" },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-dark/90 backdrop-blur-md border-b border-blue-900/30 py-4 shadow-lg shadow-blue-950/20"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("inicio");
          }}
          className="flex items-center group focus:outline-none"
          id="header-brand-logo"
        >
          <img
            src="https://appdesignproyectos.com/appdesignlogos.png"
            alt="App Design Logo"
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" id="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.target);
              }}
              className={`text-sm font-medium tracking-wide transition-all relative py-1 focus:outline-none ${
                activeSection === link.target
                  ? "text-brand-primary font-semibold"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {link.label}
              {activeSection === link.target && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Action Button & Contact */}
        <div className="hidden lg:flex items-center gap-4" id="desktop-actions">
          {onAdminClick && (
            <button
              onClick={onAdminClick}
              className="p-2.5 text-slate-400 hover:text-brand-primary bg-slate-950 hover:bg-slate-900 rounded-xl border border-slate-800 transition-colors cursor-pointer"
              title="Acceso Administrador"
            >
              <Lock className="h-4 w-4" />
            </button>
          )}
          
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-300 hover:text-green-400 text-sm font-medium transition-colors"
          >
            <MessageSquare className="h-4 w-4 text-green-400" />
            <span>WhatsApp Directo</span>
          </a>
          
          <button
            onClick={onQuoteClick}
            className="bg-brand-primary text-[#19354C] hover:bg-brand-primary/90 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-brand-primary/20 active:scale-95 cursor-pointer"
            id="header-cta-btn"
          >
            <span>Cotiza Ahora</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-slate-200 hover:text-white focus:outline-none p-1"
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-brand-dark border-b border-blue-900/30 overflow-hidden"
            id="mobile-nav-drawer"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => handleNavClick(link.target)}
                  className={`text-left text-base font-semibold py-2 border-b border-slate-900 focus:outline-none ${
                    activeSection === link.target
                      ? "text-brand-primary pl-2 border-l-2 border-l-brand-primary pl-4"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="flex flex-col gap-4 mt-4 pt-2">
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center gap-3 text-slate-300 hover:text-brand-primary py-1"
                >
                  <PhoneCall className="h-5 w-5 text-brand-primary" />
                  <span className="font-mono text-sm">{CONTACT_INFO.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 hover:text-green-400 py-1"
                >
                  <MessageSquare className="h-5 w-5 text-green-400" />
                  <span className="text-sm">Escríbenos por WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onQuoteClick();
                  }}
                  className="bg-brand-primary text-[#19354C] hover:bg-brand-primary/90 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer"
                  id="mobile-cta-btn"
                >
                  <span>Cotizar Proyecto</span>
                  <ArrowRight className="h-5 w-5" />
                </button>

                {onAdminClick && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onAdminClick();
                    }}
                    className="flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-brand-primary py-2.5 rounded-xl text-xs font-bold transition-all border border-slate-800 cursor-pointer mt-1"
                  >
                    <Lock className="h-3.5 w-3.5" />
                    <span>Acceso Administrador</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
