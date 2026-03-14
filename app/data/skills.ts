export interface Skill {
  name: string;
  level: number;
  category: "design" | "development" | "tool";
}

export const skills: Skill[] = [
  // Development
  { name: "Web Development (Next.js/React)", level: 85, category: "development" },
  { name: "Backend (Python/APIs)", level: 60, category: "development" },
  
  // Design
  { name: "Adobe Photoshop", level: 80, category: "design" },
  { name: "Adobe Illustrator", level: 75, category: "design" },
  { name: "Adobe InDesign", level: 70, category: "design" },
  { name: "UI/UX (Figma)", level: 50, category: "design" },

  // Tools & Specialties
  { name: "Brand Identity & Strategy", level: 90, category: "tool" },
  { name: "Corporate Visual Systems", level: 85, category: "tool" },
  { name: "Logical Problem Solving", level: 95, category: "tool" },
];

export const coreSkills = [
  "Full-stack Dev",
  "Next.js & Python",
  "Corporate Branding",
  "Minimalist UI/UX",
  "Responsive Web Design",
  "Logo Design",
  "Adobe Creative Suite",
];
