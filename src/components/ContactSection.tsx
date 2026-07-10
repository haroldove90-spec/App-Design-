import { Phone, Mail, MapPin, MessageSquare, Clock, ShieldCheck, CheckCircle } from "lucide-react";
import { BRANCHES, CONTACT_INFO } from "../types";

export default function ContactSection() {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=Hola%20App%20Design!%20Me%20gustaría%20recibir%20asesoría%20sobre%20un%20proyecto.`, "_blank");
  };

  return (
    <section id="contacto" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative backdrop shapes */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] rounded-full bg-indigo-900/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Title Block */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-blue-500 uppercase block mb-3">
            Atención Inmediata
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight" id="contact-title">
            ¡Ponte en contacto con nosotros!
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            ¿Tienes un proyecto en mente o quieres optimizar la operación de tu empresa? Estamos listos para ayudarte a dar el siguiente paso. Visítanos, llámanos o escríbenos directamente.
          </p>
        </div>

        {/* Contact Info and Branches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16" id="contact-grid">
          {/* LEFT: DIRECT CONTACT INFO */}
          <div className="lg:col-span-5 bg-slate-900/50 border border-slate-800/80 p-8 rounded-3xl flex flex-col justify-between text-left">
            <div>
              <h3 className="text-white font-extrabold text-xl mb-6">
                Canales de Atención
              </h3>
              
              <div className="space-y-6">
                {/* Phone */}
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex gap-4 items-start p-4 rounded-xl hover:bg-slate-950 transition-colors group"
                >
                  <div className="bg-blue-900/30 text-blue-400 p-3 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Llámanos</span>
                    <span className="text-white font-bold text-lg font-mono tracking-tight block mt-0.5">
                      {CONTACT_INFO.phone}
                    </span>
                  </div>
                </a>

                {/* WhatsApp */}
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full flex gap-4 items-start p-4 rounded-xl hover:bg-slate-950 transition-colors text-left group cursor-pointer focus:outline-none"
                >
                  <div className="bg-green-950/40 text-green-400 p-3 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors shrink-0">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">WhatsApp Directo</span>
                    <span className="text-green-400 font-bold text-sm block mt-0.5 group-hover:underline">
                      Haz clic aquí para escribirnos
                    </span>
                    <span className="text-slate-400 text-xs mt-1 block">Atención técnica inmediata</span>
                  </div>
                </button>

                {/* Email */}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex gap-4 items-start p-4 rounded-xl hover:bg-slate-950 transition-colors group"
                >
                  <div className="bg-blue-900/30 text-blue-400 p-3 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Correo Electrónico</span>
                    <span className="text-white font-bold text-sm sm:text-base truncate block mt-0.5 group-hover:text-blue-400">
                      {CONTACT_INFO.email}
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Support and Assurance tags */}
            <div className="border-t border-slate-800/80 pt-6 mt-8 space-y-3">
              <div className="flex items-center gap-3 text-slate-400 text-xs sm:text-sm">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>Atención de Lunes a Sábado</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-xs sm:text-sm">
                <ShieldCheck className="h-4 w-4 text-blue-500" />
                <span>Garantía técnica de soporte continuo</span>
              </div>
            </div>
          </div>

          {/* RIGHT: PHYSICAL BRANCH OFFICES */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            {BRANCHES.map((branch) => (
              <div
                key={branch.name}
                className="bg-slate-900/40 border border-slate-800/80 p-8 rounded-3xl flex flex-col justify-between text-left group hover:border-slate-700 transition-colors relative"
              >
                {/* Pin ornament design */}
                <div className="flex justify-between items-start mb-8">
                  <div className="bg-blue-900/20 text-blue-400 p-3.5 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-bold font-mono tracking-wider text-blue-500 uppercase bg-blue-950/60 border border-blue-900/40 px-3 py-1 rounded-full">
                    Sede Física
                  </span>
                </div>

                <div>
                  <h4 className="text-white font-extrabold text-lg mb-4 group-hover:text-blue-400 transition-colors">
                    {branch.name}
                  </h4>
                  <div className="space-y-1.5 text-slate-300 text-sm">
                    <p className="font-semibold">{branch.address}</p>
                    {branch.colony && <p className="text-slate-400">{branch.colony}</p>}
                    <p className="text-slate-400">{branch.city}</p>
                    <p className="text-blue-400 font-mono text-xs font-semibold pt-1">
                      {branch.cp}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-800/80 pt-6 mt-8">
                  <span className="text-xs text-slate-500 block leading-relaxed">
                    Ubicación oficial de App Design en el Estado de México. Te esperamos para consultorías presenciales.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality commitment assurance */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 bg-slate-900/30 border border-slate-900 p-4 rounded-2xl">
          <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
          <span className="text-slate-300 text-xs sm:text-sm font-medium">
            Garantizamos atención personalizada, transparente y acompañamiento técnico constante en cada proyecto.
          </span>
        </div>
      </div>
    </section>
  );
}
