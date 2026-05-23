import { Project, Experience, SkillGroup, TimelineEvent } from "./types";

export const PERSONAL_INFO = {
  name: "Alexander Vance",
  title: "Creative Developer & Spatial Designer",
  subtitle: "Designing interfaces at the boundary of logic and physical beauty.",
  introduction: "A front-end engineer and interactive designer specializing in ultra-smooth physical simulation interfaces, responsive WebGL architectures, and premium developer experiences for forward-thinking brands.",
  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400&q=80",
};

export const PROJECTS: Project[] = [
  {
    id: "aether",
    title: "Aether OS",
    subtitle: "Spatial Workspace Experience",
    description: "An interactive, glassmorphic desktop web shell with real-time fluid micro-interactions and workspace organization APIs.",
    longDescription: "Aether OS reimagines the browser workspace as a spatial operating system. Built with fluid physics animations and hardware-accelerated layouts, it integrates intuitive window-docking mechanics and spatial Canvas contexts for continuous workflow focus. Every node reactively repels surrounding clutter to maintain breathing space.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    tech: ["React", "Vite", "GSAP", "Tailwind CSS", "Motion"],
    demoUrl: "#demo",
    githubUrl: "#github",
    featured: true,
    year: "2026",
    category: "Spatial UI"
  },
  {
    id: "genesis",
    title: "Genesis Core",
    subtitle: "Generative Token Dynamics",
    description: "Dynamic WebGL generative rendering suite designed to translate real-time sensor streams into responsive 3D typography.",
    longDescription: "Genesis Core is a premium typography engine mapping live dynamic inputs onto volumetric, iridescent 3D meshes. By converting motion and acoustic signals into custom geometric perturbations, it establishes a living, breathing sensory expression. Perfect for immersive brand presentations and virtual gallery experiences.",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80",
    tech: ["Three.js", "WebGL", "GSAP", "React", "TypeScript"],
    demoUrl: "#demo",
    githubUrl: "#github",
    featured: true,
    year: "2025",
    category: "WebGL Canvas"
  },
  {
    id: "synapse",
    title: "Synapse Cloud",
    subtitle: "Decentralized Network Visualizer",
    description: "Multi-layered network topography diagram powered by force-directed physical simulations and real-time ledger updates.",
    longDescription: "Synapse maps blockchain and network latency metrics onto an organic interactive constellation. Utilizing Web Workers to compute force-directed node positions asynchronously, it scales up to 10,000 active visual connections without blocking standard main-thread render passes, yielding exceptional performance.",
    image: "https://images.unsplash.com/photo-1618005198143-d366bad22dc7?auto=format&fit=crop&w=1000&q=80",
    tech: ["Three.js", "D3.js", "Motion", "Tailwind CSS"],
    demoUrl: "#demo",
    githubUrl: "#github",
    featured: true,
    year: "2025",
    category: "Network Visualizer"
  },
  {
    id: "helios",
    title: "Helios Dynamics",
    subtitle: "Solar Telemetry WebGL Simulator",
    description: "Volumetric real-time solar physics simulation mapping telemetry signals to multi-fractal noise equations.",
    longDescription: "Helios Dynamics is a complex scientific visualizer bringing live particle telemetry to life. By converting magnetic solar wind inputs into mathematical bezier trails, it translates astronomical metrics into dynamic fluid streams. Leverages custom GPU shaders for smooth, beautiful 60FPS particle movement.",
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1000&q=80",
    tech: ["Three.js", "GLSL Shaders", "GSAP", "React", "WebAudio"],
    demoUrl: "#demo",
    githubUrl: "#github",
    featured: true,
    year: "2026",
    category: "WebGL Canvas"
  },
  {
    id: "nexus",
    title: "Nexus System",
    subtitle: "Bento-style Design Architecture",
    description: "A comprehensive, high-contrast reactive system for fast and responsive dashboard drafting.",
    longDescription: "Nexus is an Awwwards-nominated library of premium Bento Grid building modules. Fully integrated with micro-interaction triggers and native inertial swiping, it lets teams assemble modern landing pages with gorgeous layout rhythm and tactile scroll reveals out of the box.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1000&q=80",
    tech: ["React", "Tailwind CSS", "Spring Physics", "Motion"],
    demoUrl: "#demo",
    githubUrl: "#github",
    featured: false,
    year: "2024",
    category: "Design System"
  },
  {
    id: "prism-os",
    title: "Prism OS",
    subtitle: "Light Refraction System",
    description: "An interactive light physics model evaluating optical spectrum dispersion dynamically over canvas grids.",
    longDescription: "Prism OS is a real-time raycasting workspace that models how raw colors scatter across customizable translucent prisms. It renders photorealistic glass dispersion patterns synchronously in the browser with custom HTML canvas gradients.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
    tech: ["HTML5 Canvas", "Tailwind CSS", "Math.js", "Motion"],
    demoUrl: "#demo",
    githubUrl: "#github",
    featured: false,
    year: "2024",
    category: "Spatial UI"
  },
  {
    id: "quantum-flow",
    title: "Quantum Flow",
    subtitle: "Subatomic Particle Sandbox",
    description: "A liquid simulation physics engine computing gravity wells and multi-body planetary attractions.",
    longDescription: "Quantum Flow scales fluid simulation physics up to modern requirements. Powered by highly optimized canvas mechanics, it maps hundreds of custom particles and gravity attractors reactively to mouse movements, yielding tactile and kinetic responses.",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1000&q=80",
    tech: ["React", "TypeScript", "Canvas API", "Springs"],
    demoUrl: "#demo",
    githubUrl: "#github",
    featured: false,
    year: "2025",
    category: "WebGL Canvas"
  },
  {
    id: "stasis-dashboard",
    title: "Stasis Studio",
    subtitle: "Minimalist Analytics Interface",
    description: "High-contrast telemetry panel displaying live analytics for remote IoT systems with premium layout density.",
    longDescription: "Stasis reimagines complex diagnostic panels as elegant, simplified command nodes. Engineered with high text readability, smooth sparkline chart triggers, and interactive custom tooltips, it represents industrial monitoring at its finest quality.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    tech: ["React", "Tailwind CSS", "Recharts", "Motion"],
    demoUrl: "#demo",
    githubUrl: "#github",
    featured: false,
    year: "2024",
    category: "Design System"
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Creative Engineering",
    skills: [
      { name: "React / Vite / TS", proficiency: 98, iconName: "Layers" },
      { name: "Three.js / WebGL", proficiency: 90, iconName: "Rotate3d" },
      { name: "GSAP / ScrollTrigger", proficiency: 95, iconName: "Zap" },
      { name: "Framer Motion", proficiency: 96, iconName: "Sparkles" },
    ]
  },
  {
    category: "Spatial Design",
    skills: [
      { name: "Interactive Prototyping", proficiency: 95, iconName: "Cpu" },
      { name: "Micro-interactions", proficiency: 97, iconName: "Activity" },
      { name: "Cinematic Storytelling", proficiency: 88, iconName: "Clapperboard" },
      { name: "Bento Layout Systems", proficiency: 92, iconName: "Grid" },
    ]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp1",
    role: "Lead Creative Technologist",
    company: "Linear Dynamics Studio",
    period: "2024 — Present",
    description: "Pioneering fluid WebGL interactions and brand visual architectures for global tech enterprises.",
    details: [
      "Led the engineering of modern marketing and product launch interfaces, driving interactive conversion rates up by 42%.",
      "Created a proprietary spring-physics animation layer inside React, reducing UI render cycles by 25%.",
      "Coached a multi-disciplinary team of 8 design engineers on implementing polished 3D components with raw performance optimization."
    ]
  },
  {
    id: "exp2",
    role: "Senior Interaction Developer",
    company: "Aether Labs",
    period: "2022 — 2024",
    description: "Designed core layout mechanisms and responsive spatial systems for premium workspace collaboration dashboards.",
    details: [
      "Developed fully fluid drag-and-drop spatial dashboards that feel completely cinematic and friction-free.",
      "Optimized large-scale real-time network graphics representing telemetry lines with seamless frame delivery.",
      "Collaborated with motion designers to orchestrate interactive sound feedback and micro-animation choreography."
    ]
  },
  {
    id: "exp3",
    role: "Interactive UI Engineer",
    company: "Prism Creative Group",
    period: "2020 — 2022",
    description: "Built Awwwards-winning bespoke desktop landscapes, parallax scrolling galleries, and experimental web modules.",
    details: [
      "Secured two Awwwards Site of the Day honors and developer choice mentions for outstanding web animation craft.",
      "Engineered reliable cross-platform touch and pointer events to standardize tactile responses across mobile, tablet, and desktop viewports."
    ]
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "2026",
    title: "Unveiling Aether OS",
    subtitle: "Open Source Spatial Interface",
    description: "Released the initial alpha for a WebGL-based canvas workspace, capturing international developer acclaim."
  },
  {
    year: "2025",
    title: "Awwwards Interactive Jury",
    subtitle: "Evaluation Panelist",
    description: "Invited to join the international panel evaluating premium web motion and visual implementation benchmarks."
  },
  {
    year: "2024",
    title: "Keynote on Spatial UI",
    subtitle: "Front-end Innovation summit",
    description: "Presented a comprehensive framework on micro-interaction acoustics, inertia, and visual fluid dynamics in the web."
  },
  {
    year: "2022",
    title: "Pioneered Web physics standard",
    subtitle: "Reactive fluid systems",
    description: "Released an open physics solver integrating mouse-repulsion dynamics into React state nodes smoothly."
  }
];
