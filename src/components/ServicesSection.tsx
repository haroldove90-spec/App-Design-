import { Palette, Globe, Terminal, ArrowRight, CheckCircle2, ShoppingCart, Smartphone, AppWindow } from "lucide-react";
import { motion } from "motion/react";
import { SERVICE_CATEGORIES } from "../types";

interface ServicesSectionProps {
  onServiceSelect: (serviceId: string) => void;
}

export default function ServicesSection({ onServiceSelect }: ServicesSectionProps) {
  const iconMap: { [key: string]: any } = {
    Palette: Palette,
    Globe: Globe,
    Terminal: Terminal,
  };

  const serviceSubIcons: { [key: string]: any } = {
    diseno_logos: Palette,
    publicidad_impresa: ShoppingCart,
    paginas_web: Globe,
    ecommerce: ShoppingCart,
    apps_moviles: Smartphone,
    erp_crm: AppWindow,
  };

  return (
    <section id="servicios" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-indigo-900/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Title Block */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-blue-500 uppercase block mb-3">
            Nuestra Oferta
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight" id="services-title">
            Servicios Integrales End-to-End
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Desde la identidad visual de tu marca hasta la automatización de tus sistemas empresariales. Cubrimos cada etapa de tu transformación digital.
          </p>
        </div>

        {/* Services Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16" id="services-grid">
          {SERVICE_CATEGORIES.map((category) => {
            const CategoryIcon = iconMap[category.icon] || Palette;
            return (
              <motion.div
                key={category.id}
                whileHover={{ y: -8 }}
                className="bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/40 rounded-3xl p-8 flex flex-col justify-between transition-all relative overflow-hidden group shadow-lg shadow-slate-950/20"
              >
                {/* Decorative glowing gradient inside the card */}
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue-600/5 blur-3xl group-hover:bg-blue-600/10 transition-all pointer-events-none" />

                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-900/30 text-blue-400 p-4 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md shadow-blue-500/5">
                      <CategoryIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-extrabold text-lg text-left leading-snug">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-400 text-xs sm:text-sm text-left mb-8 border-b border-slate-800 pb-4">
                    {category.subtitle}
                  </p>

                  {/* Category Subdetails */}
                  <div className="space-y-6 text-left mb-8">
                    {category.details.map((detail) => {
                      const SubIcon = serviceSubIcons[detail.id] || CheckCircle2;
                      return (
                        <div key={detail.id} className="flex gap-4 items-start group/item">
                          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-blue-400 shrink-0 group-hover/item:border-blue-500/30 transition-colors">
                            <SubIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-sm mb-1.5 group-hover/item:text-blue-300 transition-colors">
                              {detail.title}
                            </h4>
                            <p className="text-slate-400 text-xs leading-relaxed">
                              {detail.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card footer CTA to scroll to quote calculator */}
                <div className="pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => onServiceSelect(category.id)}
                    className="w-full bg-slate-950 hover:bg-blue-600 border border-slate-800 hover:border-blue-500 text-slate-300 hover:text-white py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Cotizar esta línea</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner Section */}
        <div className="bg-gradient-to-r from-blue-950/40 via-slate-950 to-blue-950/40 border border-blue-950/80 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#1053f3_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
          
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
            ¿Buscas un desarrollo o combinación específica?
          </h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-6">
            Nuestra fortaleza radica en integrar diferentes áreas. Podemos diseñar tu identidad de marca y, al mismo tiempo, desarrollar tu aplicación móvil conectada a tu ERP.
          </p>
          <button
            onClick={() => onServiceSelect("todos")}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-blue-500/10 cursor-pointer"
          >
            Configurar Cotización Completa
          </button>
        </div>
      </div>
    </section>
  );
}
