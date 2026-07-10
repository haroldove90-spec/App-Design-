import { Code, Heart, MessageSquare, PhoneCall, Mail } from "lucide-react";
import { CONTACT_INFO, BRANCHES } from "../types";

export default function Footer() {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-brand-dark border-t border-slate-900/50 pt-16 pb-8 text-left text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
        
        {/* Column 1: Brand & Desc */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center">
            <img
              src="https://appdesignproyectos.com/appdesignlogo.png"
              alt="App Design Logo"
              className="h-10 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
            En App Design fusionamos la fuerza de la publicidad tradicional y el diseño de identidad con la innovación del desarrollo de software a la medida. Tu visión es nuestro proyecto.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-green-400 bg-slate-900 p-2.5 rounded-full border border-slate-800 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageSquare className="h-4 w-4" />
            </a>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="text-slate-400 hover:text-brand-primary bg-slate-900 p-2.5 rounded-full border border-slate-800 transition-colors"
              aria-label="Llamar por teléfono"
            >
              <PhoneCall className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="text-slate-400 hover:text-brand-primary bg-slate-900 p-2.5 rounded-full border border-slate-800 transition-colors"
              aria-label="Enviar correo"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Navigation Quick links */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">Navegación</h4>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            {[
              { label: "Inicio", target: "inicio" },
              { label: "Nosotros", target: "nosotros" },
              { label: "Servicios", target: "servicios" },
              { label: "Cotizador", target: "cotizador" },
              { label: "Contacto", target: "contacto" },
            ].map((link) => (
              <li key={link.target}>
                <button
                  onClick={() => handleScrollTo(link.target)}
                  className="hover:text-brand-primary transition-colors focus:outline-none cursor-pointer"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact Channels */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">Contacto</h4>
          <ul className="space-y-3.5 text-xs sm:text-sm">
            <li className="flex gap-2.5 items-start">
              <PhoneCall className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-500 font-mono block uppercase">Línea Telefónica</span>
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-white hover:text-brand-primary font-mono font-bold">
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </li>
            <li className="flex gap-2.5 items-start">
              <Mail className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-500 font-mono block uppercase">Correo Corporativo</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-white hover:text-brand-primary break-all text-xs sm:text-sm font-semibold">
                  {CONTACT_INFO.email}
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Column 4: Sede Reference */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">Sucursales</h4>
          <div className="space-y-3 text-xs">
            {BRANCHES.map((b) => (
              <div key={b.name} className="border-l-2 border-l-brand-primary/40 pl-3">
                <span className="text-white font-bold block">{b.name}</span>
                <span className="text-slate-500 text-[11px] block mt-0.5">{b.address}, {b.city}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <span>© {new Date().getFullYear()} App Design Proyectos. Todos los derechos reservados.</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[10px]">
          <span>Desarrollado con</span>
          <Heart className="h-3 w-3 text-red-500 fill-current animate-pulse" />
          <span>por App Design México</span>
        </div>
      </div>
    </footer>
  );
}
