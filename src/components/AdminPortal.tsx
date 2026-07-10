import { useState, useEffect, FormEvent } from "react";
import { 
  Lock, User, Key, LogOut, RefreshCw, Trash2, Phone, Mail, 
  MessageSquare, Clock, Search, Filter, TrendingUp, CheckCircle2, 
  AlertCircle, ExternalLink, Calendar, Calculator, Check, AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CONTACT_INFO } from "../types";

interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  services: string[];
  parameters: {
    pagesCount?: number;
    itemsCount?: number;
    userRoleCount?: number;
  };
  total: number;
  message: string;
  date: string;
  status: "Nuevo" | "Contactado" | "Cotizado" | "Cerrado";
}

interface AdminPortalProps {
  onClose: () => void;
}

export default function AdminPortal({ onClose }: AdminPortalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Quotes state
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("Todos");
  
  // Detail modal / expansion state
  const [expandedQuoteId, setExpandedQuoteId] = useState<string | null>(null);

  // Check login session on mount
  useEffect(() => {
    const adminToken = sessionStorage.getItem("appdesign_admin_token");
    if (adminToken) {
      setIsLoggedIn(true);
      fetchQuotes();
    }
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsLoggingIn(true);
    setLoginError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("appdesign_admin_token", data.token);
        setIsLoggedIn(true);
        fetchQuotes();
      } else {
        const errData = await response.json();
        setLoginError(errData.error || "Credenciales inválidas");
      }
    } catch (err) {
      console.error("Server login failed, trying client-side fallback:", err);
      // Client-side fallback for static deployments
      if (username === "harold.anguiano" && password === "Hdfk#1970") {
        sessionStorage.setItem("appdesign_admin_token", "admin_token_fallback");
        setIsLoggedIn(true);
        fetchQuotes();
      } else {
        setLoginError("Credenciales incorrectas (Verifica tus datos)");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("appdesign_admin_token");
    setIsLoggedIn(false);
    setQuotes([]);
  };

  const fetchQuotes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/quotes");
      if (response.ok) {
        const data = await response.json();
        setQuotes(data);
      } else {
        throw new Error("Failed to fetch");
      }
    } catch (err) {
      console.warn("Backend fetch failed, loading from local storage backup:", err);
      // Load from local storage backup
      const localData = localStorage.getItem("appdesign_quotes");
      if (localData) {
        setQuotes(JSON.parse(localData));
      } else {
        setQuotes([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/quotes/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Success
        setQuotes(prev => prev.map(q => q.id === id ? { ...q, status: newStatus as any } : q));
      } else {
        throw new Error("PATCH failed");
      }
    } catch (err) {
      console.warn("Backend update failed, updating locally:", err);
      // Local fallback
      const updated = quotes.map(q => q.id === id ? { ...q, status: newStatus as any } : q);
      setQuotes(updated);
      localStorage.setItem("appdesign_quotes", JSON.stringify(updated));
    }
  };

  const handleDeleteQuote = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este presupuesto registrado?")) {
      return;
    }

    try {
      const response = await fetch(`/api/quotes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setQuotes(prev => prev.filter(q => q.id !== id));
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      console.warn("Backend delete failed, deleting locally:", err);
      const updated = quotes.filter(q => q.id !== id);
      setQuotes(updated);
      localStorage.setItem("appdesign_quotes", JSON.stringify(updated));
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatDate = (isoStr: string) => {
    try {
      const date = new Date(isoStr);
      return date.toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoStr;
    }
  };

  // Filter quotes based on search query and status filter
  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch = 
      q.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.phone.includes(searchQuery) ||
      q.services.join(" ").toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "Todos" || q.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // KPI Calculations
  const totalReceived = quotes.length;
  const newQuotesCount = quotes.filter(q => q.status === "Nuevo").length;
  const activePipelineValue = quotes
    .filter(q => q.status !== "Cerrado")
    .reduce((sum, q) => sum + q.total, 0);

  // Generate WhatsApp link
  const getWhatsAppLink = (q: Quote) => {
    const waText = `Hola ${q.name}! Te contacto de App Design respecto a tu presupuesto solicitado de ${formatCurrency(q.total)} MXN para los servicios: ${q.services.join(", ")}. ¿En qué horario podemos agendar una llamada breve para resolver tus dudas?`;
    return `https://wa.me/52${q.phone.replace(/\D/g, "")}?text=${encodeURIComponent(waText)}`;
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        
        {/* Header Bar */}
        <div className="border-b border-slate-800 px-6 py-4 flex justify-between items-center bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="bg-brand-primary/10 text-brand-primary p-2.5 rounded-xl">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-white font-extrabold text-lg">Portal Administrativo</h2>
              <p className="text-slate-400 text-xs">Gestión interna de cotizaciones y prospectos</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-slate-950 hover:bg-red-950/30 text-slate-400 hover:text-red-400 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-slate-800 hover:border-red-900/30 cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Cerrar Sesión</span>
              </button>
            )}
            
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-850 p-2.5 rounded-xl border border-slate-800 transition-colors cursor-pointer"
              aria-label="Cerrar Portal"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-brand-dark/30">
          {!isLoggedIn ? (
            /* LOGIN SCREEN */
            <div className="max-w-md mx-auto py-12">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-8"
              >
                <div className="text-center mb-8">
                  <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-primary/20">
                    <User className="h-6 w-6" />
                  </div>
                  <h3 className="text-white font-bold text-xl">Iniciar Sesión</h3>
                  <p className="text-slate-400 text-xs mt-1">Ingresa tus credenciales autorizadas de administrador</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5 text-left">
                  {loginError && (
                    <div className="bg-red-900/10 border border-red-900/40 p-3 rounded-xl flex items-center gap-2.5 text-xs text-red-400">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-xs font-semibold block">Usuario</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="ejemplo.usuario"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-brand-primary rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-xs font-semibold block">Contraseña</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                        <Key className="h-4 w-4" />
                      </div>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-brand-primary rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full bg-brand-primary text-[#19354C] hover:bg-brand-primary/90 font-bold text-sm py-3 px-4 rounded-xl transition-all shadow-lg shadow-brand-primary/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                  >
                    {isLoggingIn ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Autenticando...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        <span>Acceder al Panel</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          ) : (
            /* ADMIN DASHBOARD */
            <div className="space-y-6">
              
              {/* KPIS ROW */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 text-left">
                  <div className="bg-brand-primary/10 text-brand-primary p-3 rounded-xl">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Total Solicitudes</span>
                    <h4 className="text-2xl font-extrabold text-white mt-0.5">{totalReceived}</h4>
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 text-left">
                  <div className="bg-yellow-500/10 text-yellow-500 p-3 rounded-xl">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Nuevos Prospectos</span>
                    <h4 className="text-2xl font-extrabold text-yellow-400 mt-0.5">{newQuotesCount}</h4>
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 text-left">
                  <div className="bg-emerald-500/10 text-emerald-500 p-3 rounded-xl">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Presupuesto en Pipeline</span>
                    <h4 className="text-2xl font-extrabold text-emerald-400 mt-0.5">{formatCurrency(activePipelineValue)}</h4>
                  </div>
                </div>
              </div>

              {/* FILTERS & SEARCH ROW */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between text-left">
                {/* Search */}
                <div className="relative w-full sm:w-80">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Search className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por cliente, correo o servicio..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-brand-primary rounded-xl pl-9 pr-4 py-2 text-white text-xs focus:outline-none transition-all"
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-2 items-center w-full sm:w-auto overflow-x-auto">
                  <span className="text-slate-400 text-xs font-medium flex items-center gap-1 shrink-0">
                    <Filter className="h-3 w-3" /> Estado:
                  </span>
                  {["Todos", "Nuevo", "Contactado", "Cotizado", "Cerrado"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        statusFilter === status
                          ? "bg-brand-primary text-[#19354C]"
                          : "bg-slate-900 text-slate-400 hover:text-white"
                      }`}
                    >
                      {status}
                    </button>
                  ))}

                  <button
                    onClick={fetchQuotes}
                    className="bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white p-2 rounded-lg border border-slate-800 transition-all cursor-pointer shrink-0 ml-2"
                    title="Actualizar Datos"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin text-brand-primary" : ""}`} />
                  </button>
                </div>
              </div>

              {/* QUOTES LIST */}
              <div className="space-y-4 text-left">
                {isLoading && quotes.length === 0 ? (
                  <div className="text-center py-12 bg-slate-950/30 border border-slate-800/50 rounded-2xl">
                    <RefreshCw className="h-8 w-8 animate-spin text-brand-primary mx-auto mb-3" />
                    <p className="text-slate-400 text-sm">Cargando cotizaciones...</p>
                  </div>
                ) : filteredQuotes.length === 0 ? (
                  <div className="text-center py-16 bg-slate-950/30 border border-slate-800/50 rounded-2xl">
                    <AlertTriangle className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                    <h4 className="text-white font-bold text-base">Sin resultados</h4>
                    <p className="text-slate-400 text-xs mt-1">No se encontraron presupuestos que coincidan con la búsqueda o filtro.</p>
                  </div>
                ) : (
                  filteredQuotes.map((q) => {
                    const isExpanded = expandedQuoteId === q.id;
                    const statusColors = {
                      Nuevo: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
                      Contactado: "bg-blue-500/10 text-blue-400 border-blue-500/30",
                      Cotizado: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                      Cerrado: "bg-slate-800 text-slate-400 border-slate-700",
                    };

                    return (
                      <div 
                        key={q.id}
                        className={`bg-slate-950/90 border rounded-2xl overflow-hidden transition-all duration-200 ${
                          isExpanded 
                            ? "border-brand-primary/55 ring-1 ring-brand-primary/20 shadow-xl" 
                            : "border-slate-800/80 hover:border-slate-700"
                        }`}
                      >
                        {/* Summary Header */}
                        <div 
                          onClick={() => setExpandedQuoteId(isExpanded ? null : q.id)}
                          className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none bg-slate-950/40"
                        >
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className="text-white font-extrabold text-base">{q.name}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColors[q.status]}`}>
                                {q.status}
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-400">
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3 text-slate-500" /> {q.email}
                              </span>
                              {q.phone && (
                                <span className="flex items-center gap-1">
                                  <Phone className="h-3 w-3 text-slate-500" /> {q.phone}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-slate-500" /> {formatDate(q.date)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-0 border-slate-800 pt-3 md:pt-0">
                            <div className="text-left md:text-right">
                              <span className="text-[10px] text-slate-500 uppercase font-mono block">Monto Cotizado</span>
                              <span className="text-lg font-bold font-mono text-brand-primary">{formatCurrency(q.total)}</span>
                            </div>
                            
                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              {/* Status changer */}
                              <select
                                value={q.status}
                                onChange={(e) => handleUpdateStatus(q.id, e.target.value)}
                                className="bg-slate-900 border border-slate-850 hover:border-slate-700 text-slate-300 text-xs font-semibold py-1.5 px-2.5 rounded-lg focus:outline-none cursor-pointer"
                              >
                                <option value="Nuevo">Nuevo</option>
                                <option value="Contactado">Contactado</option>
                                <option value="Cotizado">Cotizado</option>
                                <option value="Cerrado">Cerrado</option>
                              </select>

                              {/* Delete button */}
                              <button
                                onClick={() => handleDeleteQuote(q.id)}
                                className="p-2 bg-slate-900 hover:bg-red-950/20 text-slate-500 hover:text-red-400 border border-slate-850 rounded-lg hover:border-red-950/40 transition-colors cursor-pointer"
                                title="Eliminar Registro"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Expandable Details Container */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="border-t border-slate-850 bg-slate-950/40"
                            >
                              <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-slate-850">
                                
                                {/* Services & Parameters */}
                                <div className="md:col-span-7 space-y-4">
                                  <div>
                                    <h5 className="text-white text-xs font-bold uppercase tracking-wider font-mono mb-2">Servicios Solicitados:</h5>
                                    <div className="flex flex-wrap gap-2">
                                      {q.services.map((srv, index) => (
                                        <span 
                                          key={index} 
                                          className="bg-slate-900 border border-slate-800 text-slate-200 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5"
                                        >
                                          <Check className="h-3.5 w-3.5 text-brand-primary" />
                                          {srv}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Render parameters if any are configured */}
                                  {(q.parameters?.pagesCount || q.parameters?.itemsCount || q.parameters?.userRoleCount) && (
                                    <div>
                                      <h5 className="text-white text-xs font-bold uppercase tracking-wider font-mono mb-2">Ajustes del Proyecto:</h5>
                                      <ul className="space-y-1 text-slate-400 text-xs">
                                        {!!q.parameters.pagesCount && (
                                          <li>• Páginas requeridas para el sitio web: <strong className="text-slate-200">{q.parameters.pagesCount} páginas</strong></li>
                                        )}
                                        {!!q.parameters.itemsCount && (
                                          <li>• Productos para el catálogo e-commerce: <strong className="text-slate-200">{q.parameters.itemsCount} productos</strong></li>
                                        )}
                                        {!!q.parameters.userRoleCount && (
                                          <li>• Accesos de usuarios para ERP: <strong className="text-slate-200">{q.parameters.userRoleCount} accesos</strong></li>
                                        )}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Custom message box */}
                                  <div>
                                    <h5 className="text-white text-xs font-bold uppercase tracking-wider font-mono mb-2">Mensaje del Prospecto:</h5>
                                    <div className="bg-slate-900/80 border border-slate-850 p-4 rounded-xl text-slate-300 text-xs leading-relaxed max-w-full italic">
                                      "{q.message}"
                                    </div>
                                  </div>
                                </div>

                                {/* Actions Sidepanel */}
                                <div className="md:col-span-5 flex flex-col justify-center gap-3">
                                  <h5 className="text-white text-xs font-bold uppercase tracking-wider font-mono text-left md:text-center">Contactar Cliente</h5>
                                  
                                  {q.phone && (
                                    <a
                                      href={getWhatsAppLink(q)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-[#0c2e17] font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-md shadow-emerald-500/5"
                                    >
                                      <MessageSquare className="h-4 w-4 stroke-[2.5]" />
                                      <span>Enviar WhatsApp de Contacto</span>
                                      <ExternalLink className="h-3 w-3" />
                                    </a>
                                  )}

                                  <a
                                    href={`mailto:${q.email}?subject=Cotización App Design - ${q.services.join(", ")}&body=Hola ${q.name}, muchas gracias por contactarnos. Hemos recibido tu solicitud de presupuesto por ${formatCurrency(q.total)} MXN...`}
                                    className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all border border-slate-800 hover:border-slate-700"
                                  >
                                    <Mail className="h-4 w-4" />
                                    <span>Responder por Correo</span>
                                  </a>
                                </div>

                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                )}
              </div>

            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="border-t border-slate-800 px-6 py-3.5 bg-slate-950 flex justify-between items-center text-[11px] text-slate-500">
          <span>App Design Proyectos © 2026</span>
          <span className="font-mono">IP: Secure Sandbox | DB: Active JSON</span>
        </div>

      </div>
    </div>
  );
}
