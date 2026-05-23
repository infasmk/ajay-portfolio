export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  year: string;
  category: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  details: string[];
}

export interface Skill {
  name: string;
  proficiency: number;
  iconName: string;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  description: string;
}
