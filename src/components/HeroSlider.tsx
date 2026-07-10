import { ArrowRight, Sparkles, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { scrollToSection } from "../utils";

interface HeroSliderProps {
  onQuoteClick: () => void;
}

export default function HeroSlider({ onQuoteClick }: HeroSliderProps) {
  const handleScrollToSection = (id: string) => {
    scrollToSection(id);
  };

  return (
    <section id="inicio" className="relative min-h-screen pt-28 pb-16 flex items-center bg-brand-dark overflow-hidden">
      {/* Abstract Background Decorative Lights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-primary/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      
      {/* Tech Grid Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#0f172a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Content Block */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary font-mono text-xs mb-6 uppercase tracking-wider"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-primary animate-pulse" />
            <span>Agencia Integral de Tecnología & Diseño</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
            id="hero-main-title"
          >
            Transformamos tus <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-cyan-300">ideas</span> en soluciones de alto impacto.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 mb-8 max-w-xl leading-relaxed"
            id="hero-subtitle"
          >
            Más de 20 años impulsando marcas y optimizando negocios con diseño, publicidad y desarrollo tecnológico a tu medida.
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            id="hero-cta-container"
          >
            <button
              onClick={onQuoteClick}
              className="bg-brand-primary text-[#19354C] hover:bg-brand-primary/90 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-xl shadow-brand-primary/20 active:scale-95 cursor-pointer"
              id="hero-primary-cta"
            >
              <span>Cotiza tu proyecto hoy mismo</span>
              <ArrowRight className="h-5 w-5" />
            </button>

            <button
              onClick={() => handleScrollToSection("nosotros")}
              className="px-6 py-4 rounded-xl font-medium text-slate-300 hover:text-white bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              id="hero-secondary-cta"
            >
              <span>Conócenos más</span>
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-4 mt-12 border-t border-slate-900 pt-8"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((n) => (
                <div key={n} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-xs font-bold text-white font-mono">
                  {n === 1 ? "20+" : n === 2 ? "MX" : "★"}
                </div>
              ))}
            </div>
            <div className="text-left text-xs text-slate-400">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <span className="font-semibold text-slate-300 ml-1">5.0</span>
              </div>
              <span className="font-mono">Trayectoria probada en el mercado mexicano</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Immersive Creative Display Panel (Para 1 Fotografía de alto impacto) */}
        <div className="lg:col-span-5 relative" id="hero-image-slider">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-gradient-to-b from-[#19354C]/60 to-slate-950/40 p-3 rounded-2xl border border-brand-primary/10 overflow-hidden shadow-2xl shadow-brand-primary/5 group"
          >
            {/* The main picture block simulating the high impact photography of the agency (traditional + digital combined) */}
            <div className="aspect-[4/5] rounded-xl overflow-hidden relative">
              {/* Overlay styling for modern vibe */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
              
              {/* Simulated high quality photography/render showcasing traditional print catalog design on left and tablet custom application design on right */}
              <svg
                viewBox="0 0 400 500"
                className="w-full h-full object-cover bg-slate-900"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Dark starry spatial background */}
                <rect width="400" height="500" fill="#030825" />
                <circle cx="200" cy="180" r="140" fill="url(#blue-gradient)" opacity="0.15" />
                <path d="M 0 500 Q 150 400 400 500" fill="#0a123c" />
                <path d="M 0 500 Q 300 450 400 500" fill="#121e58" opacity="0.5" />

                {/* Decorative coding lines & branding elements */}
                <g opacity="0.3" transform="translate(40, 60)">
                  <rect x="0" y="0" width="120" height="6" rx="3" fill="#1BCFEF" />
                  <rect x="0" y="15" width="80" height="6" rx="3" fill="#1BCFEF" opacity="0.6" />
                  <rect x="0" y="30" width="100" height="6" rx="3" fill="#1BCFEF" opacity="0.4" />
                </g>

                {/* Simulated beautiful smartphone mockup showing high-quality UI */}
                <g transform="translate(180, 110)">
                  {/* Phone body shadow */}
                  <rect x="0" y="0" width="160" height="300" rx="24" fill="#000000" opacity="0.4" />
                  {/* Phone body */}
                  <rect x="-4" y="-4" width="160" height="300" rx="24" fill="#090d16" stroke="#1BCFEF" strokeWidth="3" />
                  {/* Phone screen content */}
                  <rect x="6" y="10" width="140" height="272" rx="16" fill="#020617" />
                  {/* Notch */}
                  <rect x="45" y="10" width="62" height="14" rx="7" fill="#090d16" />
                  
                  {/* App UI content */}
                  <circle cx="76" cy="65" r="24" fill="#19354C" />
                  <path d="M 68 65 L 84 65 M 76 57 L 76 73" stroke="#1BCFEF" strokeWidth="3" strokeLinecap="round" />
                  
                  {/* App stats charts */}
                  <rect x="20" y="115" width="112" height="12" rx="6" fill="#1e293b" />
                  <rect x="20" y="115" width="70" height="12" rx="6" fill="#1BCFEF" />
                  
                  {/* Dynamic grid widgets */}
                  <rect x="20" y="140" width="52" height="45" rx="8" fill="#1BCFEF" opacity="0.8" />
                  <rect x="80" y="140" width="52" height="45" rx="8" fill="#1e293b" />
                  <rect x="20" y="195" width="112" height="60" rx="8" fill="#1e293b" />
                  
                  {/* Tech design agency label inside simulated phone */}
                  <text x="32" y="215" fill="#94a3b8" fontSize="8" fontFamily="monospace">ERP SYSTEM ONLINE</text>
                  <text x="32" y="228" fill="#1BCFEF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">+$24,850 MXN</text>
                  <text x="32" y="242" fill="#4ade80" fontSize="8" fontFamily="monospace">AUTOPROCESS COMPLETED</text>
                </g>

                {/* Left side: Premium Advertising Print & Identity Mockup */}
                <g transform="translate(45, 190)">
                  {/* Brochure Shadow */}
                  <rect x="0" y="0" width="125" height="180" rx="12" fill="#000000" opacity="0.3" transform="rotate(-6 62 90)" />
                  {/* Brochure Cover */}
                  <rect x="-2" y="-2" width="125" height="180" rx="12" fill="#1e293b" stroke="#1BCFEF" strokeWidth="2" transform="rotate(-6 62 90)" />
                  <rect x="4" y="4" width="113" height="168" rx="8" fill="#f8fafc" transform="rotate(-6 62 90)" />
                  
                  {/* Branding elements on printed material */}
                  <path d="M 12 42 L 55 12" stroke="#1BCFEF" strokeWidth="8" strokeLinecap="round" transform="rotate(-6 62 90)" />
                  <circle cx="28" cy="74" r="14" fill="#19354C" transform="rotate(-6 62 90)" />
                  <circle cx="82" cy="74" r="10" fill="#a5b4fc" transform="rotate(-6 62 90)" />
                  
                  {/* Print corporate text */}
                  <rect x="20" y="105" width="80" height="6" rx="3" fill="#0f172a" transform="rotate(-6 62 90)" />
                  <rect x="20" y="118" width="55" height="6" rx="3" fill="#475569" transform="rotate(-6 62 90)" />
                  <rect x="20" y="131" width="70" height="6" rx="3" fill="#94a3b8" transform="rotate(-6 62 90)" />
                  
                  <text x="25" y="152" fill="#1e293b" fontSize="8" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-6 62 90)">IDENTITY BRAND</text>
                </g>

                {/* Floating neon accent elements */}
                <g transform="translate(30, 360)">
                  <circle cx="20" cy="20" r="10" fill="#a855f7" opacity="0.4" className="animate-ping" />
                  <circle cx="20" cy="20" r="4" fill="#d8b4fe" />
                </g>
                <g transform="translate(340, 80)">
                  <circle cx="20" cy="20" r="10" fill="#3b82f6" opacity="0.4" className="animate-ping" />
                  <circle cx="20" cy="20" r="4" fill="#60a5fa" />
                </g>

                <defs>
                  <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1BCFEF" />
                    <stop offset="100%" stopColor="#19354C" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Slider UI Controls (aesthetic slide navigation) */}
              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-between items-center px-4">
                <div className="flex gap-2">
                  <span className="w-6 h-1.5 rounded-full bg-brand-primary block transition-all" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 block transition-all" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 block transition-all" />
                </div>
                <div className="flex gap-1">
                  <button className="p-1 rounded-md bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer" aria-label="Previous slide">
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-1 rounded-md bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer" aria-label="Next slide">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Glowing outer aura */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary to-cyan-500 rounded-2xl blur-md opacity-25 group-hover:opacity-45 transition duration-500 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
