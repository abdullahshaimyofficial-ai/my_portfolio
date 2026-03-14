export interface Service {
  id: string;
  slug: string;
  category: "Designing" | "Development";
  title: string;
  shortDesc: string;
  description: string;
  icon: string;
  features: string[];
  deliverables: string[];
  duration: string;
  startingPrice: string;
}

export const services: Service[] = [
  // Development Services
  {
    id: "dev-1",
    slug: "full-stack-apps",
    category: "Development",
    title: "Custom Full-Stack Applications",
    shortDesc: "Architecting robust web platforms from the ground up using Next.js.",
    description: "Architecting robust web platforms from the ground up using Next.js. I focus on server-side rendering, SEO optimization, and lightning-fast load times.",
    icon: "Code2",
    features: ["Next.js & React Mastery", "Server-Side Rendering (SSR)", "SEO Optimization", "Lightning Performance"],
    deliverables: ["Full Source Code", "Deployment Setup", "Performance Report"],
    duration: "4–8 weeks",
    startingPrice: "$800",
  },
  {
    id: "dev-2",
    slug: "python-backend",
    category: "Development",
    title: "Python Backend Systems",
    shortDesc: "Leveraging Python to build secure, logical, and efficient backends.",
    description: "Leveraging Python to build secure, logical, and efficient backends. Whether it’s data processing or API integration, I ensure your 'under-the-hood' logic is flawless.",
    icon: "Terminal",
    features: ["Secure API Integration", "Complex Data Processing", "Scalable Architecture", "Logical Optimization"],
    deliverables: ["Backend API Documentation", "Database Schema", "Security Audit"],
    duration: "3–6 weeks",
    startingPrice: "$600",
  },

  // Design Services
  {
    id: "design-1",
    slug: "corporate-graphic-design",
    category: "Designing",
    title: "Corporate Graphic Design",
    shortDesc: "Professional visual communication for modern brands.",
    description: "Professional visual communication for modern brands. I specialize in clean, minimalist layouts for digital and print media using the Adobe Creative Suite.",
    icon: "Palette",
    features: ["Minimalist Layouts", "Digital & Print Media", "Adobe Suite Expertise", "High-Impact Visuals"],
    deliverables: ["High-Res Print Files", "Web-Ready Assets", "Brand Graphics"],
    duration: "1–2 weeks",
    startingPrice: "$150",
  },
  {
    id: "design-2",
    slug: "strategic-brand-identity",
    category: "Designing",
    title: "Strategic Brand Identity",
    shortDesc: "Cohesive brand systems that command professional respect.",
    description: "More than just a logo. I build cohesive brand systems—including typography, color theory, and usage guidelines—that command professional respect.",
    icon: "Layers",
    features: ["Systemic Brand Systems", "Custom Typography", "Color Theory Strategy", "Brand Guidelines"],
    deliverables: ["Brand Identity Manual", "Complete Logo Suite", "Typography Package"],
    duration: "2–4 weeks",
    startingPrice: "$350",
  },
  {
    id: "design-3",
    slug: "ui-ux-architecture",
    category: "Designing",
    title: "UI/UX Architecture",
    shortDesc: "Designing intuitive user journeys in Figma.",
    description: "Designing intuitive user journeys in Figma. I focus on clean interfaces that reduce friction and guide users toward clear business goals.",
    icon: "Monitor",
    features: ["Clean Interface Design", "User-Centric Journeys", "Figma Prototyping", "Conversion Focused"],
    deliverables: ["Interactive Prototype", "Design Specs for Devs", "UX Research Report"],
    duration: "3–6 weeks",
    startingPrice: "$500",
  },
  {
    id: "design-4",
    slug: "digital-brand-assets",
    category: "Designing",
    title: "Digital Brand Assets",
    shortDesc: "Specialized visuals for the modern web.",
    description: "Specialized visuals for the modern web—from custom social media frameworks to high-end presentation decks that align with your brand’s DNA.",
    icon: "Briefcase",
    features: ["Social Media Frameworks", "Premium Presentation Decks", "Consistent Brand DNA", "Web-Optimized Assets"],
    deliverables: ["Social Media Templates", "Presentation Deck (PPTX/PDF)", "Digital Asset Library"],
    duration: "1–3 weeks",
    startingPrice: "$200",
  },
];
