import { useState, useEffect, FormEvent } from "react";
import { Calculator, Check, ArrowRight, MessageSquare, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CONTACT_INFO } from "../types";

interface QuoteCalculatorProps {
  preselectedCategory?: string;
}

export default function QuoteCalculator({ preselectedCategory }: QuoteCalculatorProps) {
  // Service selections
  const [selectedServices, setSelectedServices] = useState<{ [key: string]: boolean }>({
    logos: false,
    impresa: false,
    web: false,
    ecommerce: false,
    apps: false,
    erp: false,
  });

  // Slider adjustments
  const [pagesCount, setPagesCount] = useState(5);
  const [itemsCount, setItemsCount] = useState(20);
  const [userRoleCount, setUserRoleCount] = useState(3);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Prices (MXN)
  const basePrices: { [key: string]: number } = {
    logos: 6500,
    impresa: 3500,
    web: 11500,
    ecommerce: 21500,
    apps: 45000,
    erp: 55000,
  };

  // Pre-select category if passed down
  useEffect(() => {
    if (preselectedCategory) {
      if (preselectedCategory === "publicidad") {
        setSelectedServices({ logos: true, impresa: false, web: false, ecommerce: false, apps: false, erp: false });
      } else if (preselectedCategory === "web") {
        setSelectedServices({ logos: false, impresa: false, web: true, ecommerce: false, apps: false, erp: false });
      } else if (preselectedCategory === "software") {
        setSelectedServices({ logos: false, impresa: false, web: false, ecommerce: false, apps: true, erp: false });
      } else if (preselectedCategory === "todos") {
        setSelectedServices({ logos: true, impresa: true, web: true, ecommerce: true, apps: true, erp: true });
      }
    }
  }, [preselectedCategory]);

  const toggleService = (id: string) => {
    setSelectedServices((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Real-time calculation
  const calculateTotal = () => {
    let total = 0;
    
    // Sum selected base prices
    Object.keys(selectedServices).forEach((key) => {
      if (selectedServices[key]) {
        total += basePrices[key];
      }
    });

    // Web specifics
    if (selectedServices.web) {
      total += (pagesCount - 1) * 1200; // Extra pages cost
    }

    // E-commerce specifics
    if (selectedServices.ecommerce) {
      if (itemsCount > 20) {
        total += (itemsCount - 20) * 150; // extra catalogue items
      }
    }

    // ERP specifics
    if (selectedServices.erp) {
      total += (userRoleCount - 1) * 3500; // extra software license seats
    }

    // Bundle discount if 3 or more services are selected
    const selectedCount = Object.values(selectedServices).filter(Boolean).length;
    let discount = 0;
    if (selectedCount >= 3) {
      discount = total * 0.15; // 15% bundle discount
    }

    return {
      subtotal: total,
      discount: discount,
      total: total - discount,
    };
  };

  const { subtotal, discount, total } = calculateTotal();

  // Format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getSelectedServicesList = () => {
    const list: string[] = [];
    if (selectedServices.logos) list.push("Diseño de Logotipo");
    if (selectedServices.impresa) list.push("Publicidad Impresa");
    if (selectedServices.web) list.push(`Página Web (${pagesCount} pág.)`);
    if (selectedServices.ecommerce) list.push(`E-commerce (${itemsCount} prod.)`);
    if (selectedServices.apps) list.push("App Móvil iOS/Android");
    if (selectedServices.erp) list.push(`Software ERP/CRM (${userRoleCount} usuarios)`);
    return list;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  // WhatsApp Message Generator
  const handleWhatsAppSend = () => {
    const servicesList = getSelectedServicesList().join(", ");
    const waText = `Hola App Design! Me interesa cotizar un proyecto.
• Mi Nombre: ${name || "Interesado"}
• Correo: ${email || "No provisto"}
• Teléfono: ${phone || "No provisto"}
• Servicios Elegidos: ${servicesList || "Personalizado"}
• Costo Estimado: ${formatCurrency(total)} MXN
• Mensaje adicional: ${message || "Hola, me gustaría recibir más detalles."}`;

    const encodedText = encodeURIComponent(waText);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodedText}`, "_blank");
  };

  return (
    <section id="cotizador" className="py-24 bg-brand-dark border-t border-slate-800/30 relative overflow-hidden">
      {/* Decorative Lights */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-brand-primary uppercase block mb-3">
            Cotizador Interactivo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Cotiza tu Proyecto hoy mismo
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Selecciona los servicios que necesitas y obtén un presupuesto preliminar instantáneo basado en nuestro tabulador de precios.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT PANEL: 1. SELECT SERVICES & ADJUST SLIDERS */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-left" id="calculator-inputs">
            {/* Services Options List */}
            <div className="bg-slate-950/80 border border-slate-800 p-6 sm:p-8 rounded-2xl">
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-brand-primary" />
                <span>1. Selecciona los servicios requeridos</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* LOGOS CARD */}
                <button
                  onClick={() => toggleService("logos")}
                  className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all focus:outline-none cursor-pointer ${
                    selectedServices.logos
                      ? "bg-brand-primary/10 border-brand-primary shadow-md shadow-brand-primary/5"
                      : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                    selectedServices.logos ? "bg-brand-primary border-brand-primary text-[#19354C]" : "border-slate-700"
                  }`}>
                    {selectedServices.logos && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm block">Diseño de Logotipo</span>
                    <span className="text-slate-400 text-xs mt-1 block">Logotipo & Identidad Corporativa</span>
                  </div>
                </button>

                {/* PRINT CARD */}
                <button
                  onClick={() => toggleService("impresa")}
                  className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all focus:outline-none cursor-pointer ${
                    selectedServices.impresa
                      ? "bg-brand-primary/10 border-brand-primary shadow-md shadow-brand-primary/5"
                      : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                    selectedServices.impresa ? "bg-brand-primary border-brand-primary text-[#19354C]" : "border-slate-700"
                  }`}>
                    {selectedServices.impresa && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm block">Publicidad Impresa</span>
                    <span className="text-slate-400 text-xs mt-1 block">Material promocional físico</span>
                  </div>
                </button>

                {/* WEB CARD */}
                <button
                  onClick={() => toggleService("web")}
                  className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all focus:outline-none cursor-pointer ${
                    selectedServices.web
                      ? "bg-brand-primary/10 border-brand-primary shadow-md shadow-brand-primary/5"
                      : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                    selectedServices.web ? "bg-brand-primary border-brand-primary text-[#19354C]" : "border-slate-700"
                  }`}>
                    {selectedServices.web && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm block">Página Web Corporativa</span>
                    <span className="text-slate-400 text-xs mt-1 block">Optimizado para móviles & SEO</span>
                  </div>
                </button>

                {/* E-COMMERCE CARD */}
                <button
                  onClick={() => toggleService("ecommerce")}
                  className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all focus:outline-none cursor-pointer ${
                    selectedServices.ecommerce
                      ? "bg-brand-primary/10 border-brand-primary shadow-md shadow-brand-primary/5"
                      : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                    selectedServices.ecommerce ? "bg-brand-primary border-brand-primary text-[#19354C]" : "border-slate-700"
                  }`}>
                    {selectedServices.ecommerce && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm block">Tienda en Línea</span>
                    <span className="text-slate-400 text-xs mt-1 block">Pasarela de pago & Envío</span>
                  </div>
                </button>

                {/* APPS CARD */}
                <button
                  onClick={() => toggleService("apps")}
                  className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all focus:outline-none cursor-pointer ${
                    selectedServices.apps
                      ? "bg-brand-primary/10 border-brand-primary shadow-md shadow-brand-primary/5"
                      : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                    selectedServices.apps ? "bg-brand-primary border-brand-primary text-[#19354C]" : "border-slate-700"
                  }`}>
                    {selectedServices.apps && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm block">App Móvil (iOS/Android)</span>
                    <span className="text-slate-400 text-xs mt-1 block">Aplicaciones nativas / híbridas</span>
                  </div>
                </button>

                {/* ERP CARD */}
                <button
                  onClick={() => toggleService("erp")}
                  className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all focus:outline-none cursor-pointer ${
                    selectedServices.erp
                      ? "bg-brand-primary/10 border-brand-primary shadow-md shadow-brand-primary/5"
                      : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                    selectedServices.erp ? "bg-brand-primary border-brand-primary text-[#19354C]" : "border-slate-700"
                  }`}>
                    {selectedServices.erp && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="text-white font-bold text-sm block">Software ERP / CRM</span>
                    <span className="text-slate-400 text-xs mt-1 block">Sistemas de gestión de negocio</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Dynamic sliders parameters based on checked choices */}
            <AnimatePresence>
              {(selectedServices.web || selectedServices.ecommerce || selectedServices.erp) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-slate-950/80 border border-slate-800 p-6 sm:p-8 rounded-2xl"
                >
                  <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-brand-primary animate-pulse" />
                    <span>2. Ajusta los parámetros de tu proyecto</span>
                  </h3>

                  <div className="space-y-6">
                    {/* WEB PAGES COUNT SLIDER */}
                    {selectedServices.web && (
                       <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm font-medium">
                          <label className="text-slate-300">Número de Páginas (Sitio Web):</label>
                          <span className="text-brand-primary font-mono font-bold text-base bg-brand-primary/10 px-3 py-1 rounded-md">
                            {pagesCount} páginas
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="25"
                          value={pagesCount}
                          onChange={(e) => setPagesCount(Number(e.target.value))}
                          className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                        />
                        <span className="text-[10px] text-slate-500 block text-right">
                          (Incluye 1 página base, cada página extra agrega $1,200 MXN)
                        </span>
                      </div>
                    )}

                    {/* ECOMMERCE ITEM COUNT SLIDER */}
                    {selectedServices.ecommerce && (
                       <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm font-medium">
                          <label className="text-slate-300">Productos iniciales en catálogo:</label>
                          <span className="text-brand-primary font-mono font-bold text-base bg-brand-primary/10 px-3 py-1 rounded-md">
                            {itemsCount} productos
                          </span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="150"
                          step="5"
                          value={itemsCount}
                          onChange={(e) => setItemsCount(Number(e.target.value))}
                          className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                        />
                        <span className="text-[10px] text-slate-500 block text-right">
                          (Incluye 20 productos iniciales de cortesía, cada producto extra agrega $150 MXN)
                        </span>
                      </div>
                    )}

                    {/* ERP LICENSES SLIDER */}
                    {selectedServices.erp && (
                       <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm font-medium">
                          <label className="text-slate-300">Número de Roles/Accesos de Usuarios:</label>
                          <span className="text-brand-primary font-mono font-bold text-base bg-brand-primary/10 px-3 py-1 rounded-md">
                            {userRoleCount} usuarios
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="25"
                          value={userRoleCount}
                          onChange={(e) => setUserRoleCount(Number(e.target.value))}
                          className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                        />
                        <span className="text-[10px] text-slate-500 block text-right">
                          (Incluye 1 usuario administrador base, cada usuario/rol extra agrega $3,500 MXN)
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT PANEL: 2. ESTIMATION AND CONTACT FORM */}
          <div className="lg:col-span-5" id="calculator-totals">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl sticky top-28">
              {/* Cost Highlight */}
              <div className="bg-gradient-to-r from-[#19354C]/80 via-slate-950 to-[#19354C]/80 p-6 sm:p-8 text-center border-b border-slate-800 relative">
                <span className="text-xs text-brand-primary font-mono tracking-widest block mb-2 uppercase">
                  Presupuesto Preliminar
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight my-1">
                  {formatCurrency(total)} <span className="text-sm font-normal text-slate-400 font-sans">MXN</span>
                </div>
                {discount > 0 && (
                  <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full font-semibold mt-2 inline-block">
                    ¡15% de Descuento por Paquete Aplicado!
                  </span>
                )}
                
                {/* Decorative glowing dots */}
                <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
              </div>

              {/* Form or success message */}
              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="quote-form"
                      onSubmit={handleSubmit}
                      className="space-y-4 text-left"
                      id="quote-lead-form"
                    >
                      <h4 className="text-white font-bold text-sm mb-4">
                        3. Completa tus datos para enviarte una cotización formal
                      </h4>

                      <div>
                        <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ej. Juan Pérez"
                          className="w-full bg-slate-900 border border-slate-800 focus:border-brand-primary rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                            Correo Electrónico *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="juan@empresa.com"
                            className="w-full bg-slate-900 border border-slate-800 focus:border-brand-primary rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                            WhatsApp / Teléfono
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="5512345678"
                            className="w-full bg-slate-900 border border-slate-800 focus:border-brand-primary rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                          Detalles del proyecto
                        </label>
                        <textarea
                          rows={2}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Cuéntanos un poco sobre tu giro o requerimiento..."
                          className="w-full bg-slate-900 border border-slate-800 focus:border-brand-primary rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition-all resize-none"
                        />
                      </div>

                      {/* Submit buttons */}
                      <div className="space-y-3 pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-brand-primary text-[#19354C] hover:bg-brand-primary/90 py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-primary/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          id="submit-quote-form"
                        >
                          {isSubmitting ? (
                            <span>Procesando...</span>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              <span>Enviar Solicitud</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={handleWhatsAppSend}
                          className="w-full bg-green-600/10 border border-green-500/20 text-green-400 hover:bg-green-600 hover:text-white py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                          id="submit-quote-whatsapp"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>Enviar directo por WhatsApp</span>
                        </button>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="quote-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8 space-y-4"
                      id="quote-success-panel"
                    >
                      <div className="w-16 h-16 bg-green-500/15 text-green-400 border border-green-500/20 rounded-full flex items-center justify-center mx-auto text-2xl mb-4">
                        ✓
                      </div>
                      <h4 className="text-white font-bold text-xl">¡Solicitud Recibida!</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Gracias <strong>{name}</strong>. Hemos registrado tu estimación de <strong>{formatCurrency(total)} MXN</strong> para tus servicios seleccionados. Un asesor técnico de nuestras sucursales se comunicará contigo vía <strong>{email}</strong> para formalizar tu cotización.
                      </p>
                      
                      <div className="pt-4 flex flex-col gap-3">
                        <button
                          onClick={handleWhatsAppSend}
                          className="bg-green-600 text-white hover:bg-green-500 py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          <MessageSquare className="h-5 w-5" />
                          <span>Escríbenos para seguimiento</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            setIsSubmitted(false);
                            setName("");
                            setEmail("");
                            setPhone("");
                            setMessage("");
                          }}
                          className="text-slate-400 hover:text-white text-xs font-mono underline"
                        >
                          Volver a cotizar
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
