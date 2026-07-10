export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  items?: string[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  details: ServiceDetail[];
}

export interface AddedValue {
  title: string;
  description: string;
  icon: string;
}

export interface CompanyValue {
  title: string;
  description: string;
  icon: string;
}

export interface Branch {
  name: string;
  address: string;
  colony?: string;
  city: string;
  cp: string;
}

export const ADDED_VALUES: AddedValue[] = [
  {
    title: "Experiencia y Trayectoria",
    description: "Más de 20 años en el ramo nos respaldan, ofreciendo soluciones probadas que combinan lo mejor de la publicidad impresa con la tecnología más avanzada.",
    icon: "Award"
  },
  {
    title: "Soluciones Integrales End-to-End",
    description: "No necesitas buscar a múltiples proveedores. Nos encargamos de todo: desde el diseño de tu logotipo y publicidad, hasta el desarrollo de tu ERP o aplicación móvil.",
    icon: "Layers"
  },
  {
    title: "Desarrollo a la Medida",
    description: "Entendemos que cada negocio es único. Creamos sistemas, páginas y aplicaciones adaptadas estrictamente a tus necesidades y procesos operativos.",
    icon: "Cpu"
  },
  {
    title: "Cercanía y Soporte Continuo",
    description: "Con dos sucursales físicas en el Estado de México, te garantizamos una atención personalizada, transparente y un acompañamiento técnico constante.",
    icon: "UserCheck"
  }
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "publicidad",
    title: "Publicidad Impresa e Imagen Corporativa",
    subtitle: "Conectamos con tus clientes en el mundo físico y digital.",
    icon: "Palette",
    details: [
      {
        id: "diseno_logos",
        title: "Diseño de Logotipos e Identidad Visual",
        description: "Creamos la cara de tu empresa. Diseñamos logotipos únicos y manuales de identidad corporativa que reflejan los valores de tu negocio y conectan con tu público objetivo."
      },
      {
        id: "publicidad_impresa",
        title: "Publicidad Impresa",
        description: "Desarrollamos material publicitario de alto impacto (folletos, volantes, lonas, tarjetas de presentación y papelería corporativa) con acabados profesionales."
      }
    ]
  },
  {
    id: "web",
    title: "Desarrollo Web y Comercio Electrónico",
    subtitle: "Páginas de alto rendimiento y tiendas para vender 24/7.",
    icon: "Globe",
    details: [
      {
        id: "paginas_web",
        title: "Diseño de Páginas Web",
        description: "Diseñamos sitios web modernos, intuitivos, rápidos y completamente optimizados para dispositivos móviles. Perfectos para dar a conocer tus servicios y captar clientes potenciales."
      },
      {
        id: "ecommerce",
        title: "Tiendas en Línea (E-commerce)",
        description: "Lleva tu catálogo al mundo digital. Creamos plataformas de venta en línea seguras, autoadministrables, con pasarelas de pago y configuraciones de envíos listas para facturar las 24 horas del día."
      }
    ]
  },
  {
    id: "software",
    title: "Innovación y Desarrollo de Software",
    subtitle: "Aplicaciones y sistemas que automatizan tu operación.",
    icon: "Terminal",
    details: [
      {
        id: "apps_moviles",
        title: "Desarrollo de Aplicaciones Móviles",
        description: "Creamos aplicaciones móviles a la medida para sistemas iOS y Android. Ideales para fidelizar clientes, ofrecer servicios interactivos o mejorar la logística de tu negocio."
      },
      {
        id: "erp_crm",
        title: "Programas de Gestión de Negocios (Software ERP/CRM)",
        description: "Diseñamos y desarrollamos sistemas de gestión interna que automatizan tus procesos: control de inventarios, reportes de ventas, administración de clientes y optimización de recursos, adaptados exactamente a tu forma de trabajar."
      }
    ]
  }
];

export const COMPANY_VALUES: CompanyValue[] = [
  {
    title: "Innovación",
    description: "Buscamos constantemente las últimas tendencias tecnológicas y de diseño para ofrecer soluciones vanguardistas.",
    icon: "Sparkles"
  },
  {
    title: "Compromiso",
    description: "Nos apropiamos de los objetivos de nuestros clientes para asegurar el éxito de cada proyecto.",
    icon: "Target"
  },
  {
    title: "Honestidad",
    description: "Ofrecemos asesoría transparente, cotizaciones claras y un servicio basado en la confianza mutua.",
    icon: "ShieldAlert"
  },
  {
    title: "Calidad",
    description: "Cuidamos cada detalle, desde el trazo de un logotipo hasta la última línea de código de un programa de gestión.",
    icon: "CheckCircle"
  }
];

export const BRANCHES: Branch[] = [
  {
    name: "Sucursal Tlalnepantla",
    address: "Alamo No. 8, Los Reyes Iztacala",
    city: "Tlalnepantla, Edo. de México",
    cp: "C.P. 54090"
  },
  {
    name: "Sucursal Coacalco",
    address: "Rinconada de Ceibas No. 06",
    colony: "Col. Rinconada San Felipe",
    city: "Coacalco, Edo. de México",
    cp: "C.P. 55719"
  }
];

export const CONTACT_INFO = {
  phone: "5624222449",
  whatsapp: "5624222449",
  email: "harold.anguiano@appdesignproyectos.com"
};
