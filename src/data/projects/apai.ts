import type { Project } from './types';
import hero from '../../assets/images/projects/apai/apai_hero_with_letters.png';
import introSide from '../../assets/images/projects/apai/apai_intro_side.png';
import dashboard from '../../assets/images/projects/apai/apai_dashboard.png';
import mobile from '../../assets/images/projects/apai/apai_mobile.png';
import galleryLeft from '../../assets/images/projects/apai/apai_gallery_left.png';
import galleryRight from '../../assets/images/projects/apai/apai_gallery_right.png';

export const apai: Project = {
  slug: 'apai',
  year: '2026',
  seoTitle: {
    es: 'Transformamos el caos del papel en una gestión operativa 100% digital - Mobula Estudio',
    en: 'We turned paper chaos into 100% digital operations management - Mobula Estudio',
  },
  card: {
    title: {
      es: 'APAI',
      en: 'APAI',
    },
    category: {
      es: 'Desarrollo Web',
      en: 'Web Development',
    },
    image: hero,
  },
  hero: {
    desktop: hero,
    mobile: hero,
    alt: {
      es: 'APAI - App de gestión operativa inmobiliaria',
      en: 'APAI - Property operations management app',
    },
  },
  intro: {
    variant: 'withImage',
    title: {
      es: 'Transformamos el caos del papel en una gestión operativa 100% digital',
      en: 'We turned paper chaos into 100% digital operations management',
    },
    paragraphs: {
      es: [
        'APAI, una empresa de administración inmobiliaria, coordinaba decenas de servicios de mantenimiento (aires acondicionados, pintura, etc.) dependiendo exclusivamente de boletas de visita técnica en papel.',
        'Esto implicaba traslados físicos, firmas manuales y una trazabilidad casi nula para el cliente y la administración.',
        'Mobula desarrolló una aplicación web completamente personalizada que centraliza y digitaliza todo el proceso operativo.',
        'Diseñamos un sistema con control de roles que permite crear boletas consecutivas, asignar tareas, registrar evidencia técnica en sitio y obtener firmas digitales, optimizando los tiempos de respuesta y profesionalizando el servicio.',
      ],
      en: [
        'APAI, a property management company, coordinated dozens of maintenance services (A/C, painting, and more) using paper-only technical visit tickets.',
        'That meant physical trips, handwritten signatures, and almost no traceability for clients or administration.',
        'Mobula built a fully custom web app that centralizes and digitizes the entire operations workflow.',
        'We designed a role-based system to create consecutive tickets, assign tasks, capture on-site technical evidence, and collect digital signatures—speeding up response times and professionalizing the service.',
      ],
    },
    industry: {
      es: 'Administración Inmobiliaria / Mantenimiento',
      en: 'Property Management / Maintenance',
    },
    sideImage: introSide,
    sideImageAlt: {
      es: 'APAI - Dashboard web en laptop',
      en: 'APAI - Web dashboard on laptop',
    },
    /** Figma: tall grey frame crops to the left half of the laptop */
    sideImagePosition: 'left center',
  },
  galleryBeforeGoals: [
    {
      type: 'full',
      image: dashboard,
      alt: {
        es: 'APAI - Panel administrativo con métricas',
        en: 'APAI - Admin panel with metrics',
      },
    },
  ],
  goals: {
    title: {
      es: 'Desarrollo Web & Automatización de Procesos',
      en: 'Web Development & Process Automation',
    },
    items: {
      es: [
        '<strong>Diseñamos un sistema web adaptativo con dos frentes principales:</strong> un Módulo Administrativo robusto para la oficina y un Módulo Técnico optimizado para dispositivos móviles.',
        '<strong>Automatizamos el flujo completo de las boletas:</strong> desde su estado “Pendiente” hasta su “Cierre”, integrando envío automático de correos a clientes y técnicos según el avance del servicio.',
        '<strong>Implementamos un sistema</strong> de auditoría y bitácoras para garantizar la seguridad, el seguimiento de la información y la evaluación de la concurrencia de mantenimientos por edificio.',
      ],
      en: [
        '<strong>We designed an adaptive web system with two main fronts:</strong> a robust Admin Module for the office and a Technician Module optimized for mobile devices.',
        '<strong>We automated the full ticket flow:</strong> from “Pending” to “Closed,” with automatic emails to clients and technicians as the service progresses.',
        '<strong>We implemented an audit</strong> and activity-log system to ensure security, information tracking, and evaluation of concurrent maintenance jobs per building.',
      ],
    },
    image: mobile,
    imageAlt: {
      es: 'APAI - Módulo técnico en móvil',
      en: 'APAI - Technician module on mobile',
    },
  },
  gallery: [
    {
      type: 'split',
      images: [galleryLeft, galleryRight],
      alt: [
        {
          es: 'APAI - Dashboard de órdenes de trabajo',
          en: 'APAI - Work orders dashboard',
        },
        {
          es: 'APAI - Métricas y reportes en móvil',
          en: 'APAI - Metrics and reports on mobile',
        },
      ],
    },
  ],
  closing: {
    lines: {
      es: [
        'Del rastro de papel a la precisión del dato en tiempo real.',
        'APAI. Gestión inmobiliaria a un clic de distancia.',
      ],
      en: [
        'From a paper trail to real-time data precision.',
        'APAI. Property management one click away.',
      ],
    },
  },
};
