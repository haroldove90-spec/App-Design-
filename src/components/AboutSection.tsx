import { useState } from "react";
import { Award, Layers, Cpu, UserCheck, Sparkles, Target, ShieldAlert, CheckCircle, Eye, Compass, Heart } from "lucide-react";
import { motion } from "motion/react";
import { ADDED_VALUES, COMPANY_VALUES, BRANCHES } from "../types";

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<"nosotros" | "mision" | "vision">("nosotros");

  const iconMap: { [key: string]: any } = {
    Award: Award,
    Layers: Layers,
    Cpu: Cpu,
    UserCheck: UserCheck,
    Sparkles: Sparkles,
    Target: Target,
    ShieldAlert: ShieldAlert,
    CheckCircle: CheckCircle,
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="nosotros" className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Decorative Blur elements */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-brand-primary/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-indigo-900/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* SECTION 1: WELCOME & GENERAL DESCRIPTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7 text-left">
            <span className="text-xs font-bold font-mono tracking-widest text-brand-primary uppercase block mb-3">
              ¿Quiénes Somos?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 tracking-tight">
              Bienvenidos a App Design
            </h2>
            <p className="text-slate-300 mb-6 leading-relaxed text-base sm:text-lg">
              En un entorno empresarial que se mueve rápido, tu negocio necesita herramientas que lo hagan destacar y operar sin límites. En <strong>App Design</strong>, fusionamos la fuerza de la publicidad tradicional y el diseño de identidad con la innovación del desarrollo de software. Creamos desde la imagen corporativa que enamora a tus clientes, hasta las aplicaciones móviles y sistemas de gestión que automatizan tu día a día. Tu visión es nuestro proyecto; tu éxito, nuestro compromiso.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base mb-8">
              Somos una agencia integral de tecnología y diseño con más de dos décadas de trayectoria en el mercado mexicano. Nos especializamos en acompañar a emprendedores y empresas en su proceso de consolidación y transformación digital. A través de un enfoque personalizado, combinamos creatividad y código para entregar herramientas clave que impulsan las ventas, mejoran la presencia de marca y optimizan la administración de los negocios de nuestros clientes.
            </p>
          </div>

          {/* Interactive Navigation Panel on Right (Misión, Visión, Quiénes somos) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl shadow-xl shadow-slate-950/40 relative">
              <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-6 border-b border-slate-800 pb-3" id="about-nav-tabs">
                {[
                  { id: "nosotros", label: "Trayectoria", icon: Compass },
                  { id: "mision", label: "Misión", icon: Target },
                  { id: "vision", label: "Visión", icon: Eye },
                ].map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-1 sm:px-3 rounded-lg text-[10px] sm:text-xs font-semibold tracking-wide transition-all focus:outline-none cursor-pointer ${
                        activeTab === tab.id
                          ? "bg-brand-primary text-[#19354C] font-bold shadow-md shadow-brand-primary/10"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                      }`}
                    >
                      <TabIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Contents */}
              <div className="min-h-[180px] text-left flex flex-col justify-center" id="about-tab-content">
                {activeTab === "nosotros" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                      <Compass className="h-5 w-5 text-brand-primary" />
                      <span>Más de 20 años de experiencia</span>
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Nacimos bajo la premisa de que la publicidad y la tecnología deben trabajar en perfecta sincronía. Nos hemos consolidado como el aliado estratégico de confianza para negocios en Tlalnepantla, Coacalco y toda la Zona Metropolitana, ayudándoles a competir al más alto nivel.
                    </p>
                  </motion.div>
                )}

                {activeTab === "mision" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                      <Target className="h-5 w-5 text-brand-primary" />
                      <span>Nuestra Misión</span>
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Impulsar el crecimiento y la eficiencia de nuestros clientes mediante soluciones integrales de diseño, publicidad y desarrollo de software a la medida, garantizando que su identidad de marca y sus herramientas operativas sean de la más alta calidad.
                    </p>
                  </motion.div>
                )}

                {activeTab === "vision" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                      <Eye className="h-5 w-5 text-brand-primary" />
                      <span>Nuestra Visión</span>
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Ser la agencia líder en soluciones integrales de diseño y tecnología en el Estado de México y el país, reconocida por nuestra capacidad de innovación, la solidez técnica de nuestros desarrollos y el impacto positivo en la rentabilidad de las empresas que confían en nosotros.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: 4 VALORES AGREGADOS (Why Choose Us?) */}
        <div className="mb-24 text-center">
          <span className="text-xs font-bold font-mono tracking-widest text-brand-primary uppercase block mb-3">
            Ventajas Competitivas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            ¿Por qué elegir App Design?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base mb-12">
            Combinamos más de dos décadas de experiencia física e informática para potenciar los resultados de tu negocio.
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            id="added-values-grid"
          >
            {ADDED_VALUES.map((val) => {
              const IconComponent = iconMap[val.icon] || Award;
              return (
                <motion.div
                  key={val.title}
                  variants={itemVariants}
                  whileHover={{ y: -6, borderColor: "rgba(27, 207, 239, 0.4)" }}
                  className="bg-slate-950/50 border border-slate-800/80 p-6 rounded-2xl flex flex-col items-start text-left transition-all relative group"
                >
                  <div className="bg-brand-primary/10 text-brand-primary p-3 rounded-xl mb-4 group-hover:bg-brand-primary group-hover:text-[#19354C] transition-all">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-brand-primary transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* SECTION 3: COMPANY VALUES */}
        <div className="border-t border-slate-800/80 pt-20">
          <div className="text-center mb-12">
            <span className="text-xs font-bold font-mono tracking-widest text-brand-primary uppercase block mb-3">
              Ética y Metodología
            </span>
            <h2 className="text-3xl font-extrabold text-white mb-3">
              Valores que rigen nuestra Agencia
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Cada acción que tomamos, desde el trazo inicial de tu marca hasta el despliegue del software final, se alinea con nuestros principios.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="company-values-grid">
            {COMPANY_VALUES.map((val, idx) => {
              const IconComponent = iconMap[val.icon] || CheckCircle;
              return (
                <div
                  key={val.title}
                  className="bg-slate-950/20 border border-slate-800/30 p-6 rounded-xl text-left flex items-start gap-4 hover:bg-slate-950/40 transition-colors"
                >
                  <div className="bg-slate-900 p-2 rounded-lg text-brand-primary shrink-0">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1">{val.title}</h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{val.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
