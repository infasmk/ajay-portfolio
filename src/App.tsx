import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  Code2,
  Terminal,
  ChevronRight,
  Command,
  Send,
  Github,
  Linkedin,
  Twitter,
  Mail,
  FileText,
  CheckCircle,
  Clock,
  Cpu,
  Layers,
  Globe,
  Star,
  Activity,
  User,
  MapPin
} from "lucide-react";

import {
  PERSONAL_INFO,
  PROJECTS,
  SKILL_GROUPS,
  EXPERIENCES,
  TIMELINE_EVENTS
} from "./data";

import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import InteractiveScene from "./components/InteractiveScene";
import ProjectShowcase from "./components/ProjectShowcase";
import SkillBento from "./components/SkillBento";
import MagneticButton from "./components/MagneticButton";
import CinematicImage from "./components/CinematicImage";
import Counter from "./components/Counter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [systime, setSystime] = useState("");
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [activeExp, setActiveExp] = useState<string>("exp1");

  // Keep track of real-time clock
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const utc = d.toUTCString().replace("GMT", "UTC");
      setSystime(utc);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // GSAP ScrollTrigger Scroll-Reveal Effect for all major sections
  useEffect(() => {
    if (loading) return;

    const sections = ["#projects", "#skills", "#about", "#experience", "#contact"];

    const ctx = gsap.context(() => {
      sections.forEach((id) => {
        const section = document.querySelector(id);
        if (!section) return;

        let targets: Element[] = [];

        if (id === "#projects") {
          const header = section.querySelector("#projects-showcase > .space-y-4");
          // Target the overall projects, but allow the motion.div to do its horizontal entry safely,
          // so GSAP slides the header and overall containers
          const catalogToggle = section.querySelector("#projects-showcase > div:last-child");
          targets = [header, catalogToggle].filter(Boolean) as Element[];
        } else if (id === "#skills") {
          // Select header block and SkillBento
          const header = section.querySelector(".space-y-2");
          const bento = section.querySelector("#skills-bento") || section.querySelector("div:last-child");
          targets = [header, bento].filter(Boolean) as Element[];
        } else if (id === "#about") {
          // Select Left block and Right block columns
          const cols = section.querySelectorAll(".max-w-7xl > .col-span-1, .max-w-7xl > div");
          targets = Array.from(cols);
        } else if (id === "#experience") {
          // Select Header, Category toggle list, and panel wrapper
          const header = section.querySelector(".space-y-2");
          const tabs = section.querySelector(".flex-wrap");
          const content = section.querySelector(".max-w-3xl");
          targets = [header, tabs, content].filter(Boolean) as Element[];
        } else if (id === "#contact") {
          // Select Left side info list and Right side form block
          const cols = section.querySelectorAll(".max-w-7xl > .col-span-1, .max-w-7xl > div");
          targets = Array.from(cols);
        }

        const animElements = targets.filter((el) => {
          const tagName = el.tagName.toLowerCase();
          return !el.classList.contains("pointer-events-none") && tagName !== "script" && tagName !== "style";
        });

        if (animElements.length > 0) {
          gsap.fromTo(
            animElements,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, [loading]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <>
      {/* 1. Cinematic Entry Loading Screen */}
      <Loader onComplete={() => setLoading(false)} />

      {/* 2. Premium Adaptive Mouse Cursor Halo */}
      <CustomCursor />

      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="min-h-screen bg-[#ffffff] selection:bg-purple-100 selection:text-purple-900 text-[#111827] relative overflow-hidden font-sans"
          >
            {/* 3. Ambient Fluid Light Orbs behind background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-100/40 rounded-full filter blur-[150px] pointer-events-none z-0 animate-pulse [animation-duration:15s]" />
            <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-blue-100/30 rounded-full filter blur-[180px] pointer-events-none z-0 animate-pulse [animation-duration:20s]" />
            <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-cyan-100/30 rounded-full filter blur-[120px] pointer-events-none z-0" />

            {/* 4. Interactive 3D Mesh Canvas (Vanilla Three.js) */}
            <InteractiveScene />

            {/* Navigation Header */}
            <header className="sticky top-0 w-full z-50 border-b border-white/40 bg-white/70 backdrop-blur-md">
              <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo with magnetic effect */}
                <MagneticButton>
                  <a href="#hero" className="flex items-center space-x-2.5 group">
                    <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center text-white font-bold text-sm tracking-tighter group-hover:bg-purple-600 transition-colors duration-400 shadow-md">
                      <span>AV</span>
                    </div>
                    <span className="font-sans font-bold text-sm text-[#111827] tracking-wider uppercase group-hover:text-purple-600 transition-colors duration-200">
                      VANCE
                    </span>
                  </a>
                </MagneticButton>

                {/* Nav items */}
                <nav className="hidden md:flex items-center space-x-8">
                  <a
                    href="#projects"
                    className="text-xs font-mono text-[#374151] hover:text-[#7c3aed] transition-colors duration-200 uppercase tracking-widest relative group"
                  >
                    Projects
                    <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-[#7c3aed] group-hover:width-full transition-all duration-300" />
                  </a>
                  <a
                    href="#skills"
                    className="text-xs font-mono text-[#374151] hover:text-[#7c3aed] transition-colors duration-200 uppercase tracking-widest relative group"
                  >
                    Expertise
                    <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-[#7c3aed] group-hover:width-full transition-all duration-300" />
                  </a>
                  <a
                    href="#about"
                    className="text-xs font-mono text-[#374151] hover:text-[#7c3aed] transition-colors duration-200 uppercase tracking-widest relative group"
                  >
                    Journal
                    <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-[#7c3aed] group-hover:width-full transition-all duration-300" />
                  </a>
                  <a
                    href="#experience"
                    className="text-xs font-mono text-[#374151] hover:text-[#7c3aed] transition-colors duration-200 uppercase tracking-widest relative group"
                  >
                    Milestones
                    <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-[#7c3aed] group-hover:width-full transition-all duration-300" />
                  </a>
                </nav>

                <div className="flex items-center space-x-4">
                  <MagneticButton>
                    <a
                      href="#contact"
                      className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono uppercase tracking-widest transition-all shadow-md hover:shadow-lg flex items-center space-x-1.5"
                    >
                      <span>Initiate</span>
                      <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </header>

            {/* MAIN CONTENT CONTAINERS */}
            <main className="relative z-10">
              
              {/* 1. HERO SECTION */}
              <section id="hero" className="max-w-7xl mx-auto px-6 py-16 md:py-24 min-h-[calc(100vh-80px)] flex flex-col justify-between">
                
                {/* Visual Label Banner */}
                <div className="w-full flex items-center">
                  <div className="bg-slate-50 border border-slate-100 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center space-x-2 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-mono text-[10px] uppercase text-[#374151] tracking-widest font-semibold flex items-center space-x-1">
                      <span>Available for spatial commissions</span>
                    </span>
                  </div>
                </div>

                {/* Main Hero Elements */}
                <div className="my-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center select-none relative z-10">
                  {/* Left segment - Content takes 7 columns */}
                  <div className="lg:col-span-7 space-y-8">
                    <div className="space-y-4">
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="text-[#7c3aed] text-sm md:text-base font-mono uppercase tracking-widest font-semibold flex items-center space-x-2"
                      >
                        <Terminal className="w-4.5 h-4.5" />
                        <span>SEC_00 // DIGITAL ALCHEMY IS ONLINE</span>
                      </motion.p>
                      
                      <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl sm:text-7xl md:text-8xl font-sans tracking-tight font-extrabold text-[#111827] leading-[1.05]"
                      >
                        Building web experiences with{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500">
                          spatial soul.
                        </span>
                      </motion.h1>
                    </div>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                      className="text-[#374151] text-lg sm:text-xl font-sans leading-relaxed max-w-2xl font-normal"
                    >
                      Hi, I'm <span className="font-bold text-[#111827]">{PERSONAL_INFO.name}</span>. {PERSONAL_INFO.introduction}
                    </motion.p>

                    {/* Primary Call To Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      className="flex flex-wrap items-center gap-4 pt-4"
                    >
                      <MagneticButton>
                        <a
                          href="#projects"
                          className="px-8 py-4 bg-slate-900 text-white font-medium text-xs font-mono uppercase tracking-widest font-bold rounded-full flex items-center space-x-2 shadow-lg hover:bg-slate-800 hover:shadow-xl transition-all"
                        >
                          <span>Explore Artifacts</span>
                          <ArrowUpRight className="w-4 h-4 text-purple-300" />
                        </a>
                      </MagneticButton>

                      <MagneticButton>
                        <a
                          href="#contact"
                          className="px-6 py-4 bg-white border border-slate-200 text-[#111827] font-medium text-xs font-mono uppercase tracking-widest font-bold rounded-full flex items-center space-x-2 shadow-xs hover:border-slate-300 hover:bg-slate-50 transition-all"
                        >
                          <span>Initiate Request</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                        </a>
                      </MagneticButton>
                    </motion.div>
                  </div>

                  {/* Right segment - Animated Hero Digital Canvas Image takes 5 columns */}
                  <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 0.35, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-5 relative w-full flex justify-center lg:justify-end"
                  >
                    {/* Futuristic Glassmorphic Layering & Orbiting SVG elements */}
                    <div className="absolute top-[-25px] left-[-25px] w-12 h-12 border-t-3 border-l-3 border-[#7c3aed]/40 pointer-events-none z-10 hidden sm:block" />
                    <div className="absolute bottom-[-25px] right-[-25px] w-12 h-12 border-b-3 border-r-3 border-cyan-500/40 pointer-events-none z-10 hidden sm:block" />
                    
                    {/* Dot Matrix decorative element */}
                    <div className="absolute inset-[-40px] opacity-[0.25] pointer-events-none bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] -z-10 group-hover:scale-105 transition-transform duration-700" />

                    {/* Glowing Wireframe Orbit Behind Image */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-dashed border-slate-200/50 rounded-full animate-spin [animation-duration:35s] pointer-events-none -z-10" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-slate-200/40 rounded-full animate-spin [animation-duration:22s] [animation-direction:reverse] pointer-events-none -z-10" />

                    {/* Background Soft Glow backing the image frame */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#7c3aed]/15 via-[#3b82f6]/10 to-[#06b6d4]/15 rounded-3xl filter blur-3xl -z-5 animate-pulse [animation-duration:8s]" />

                    {/* Premium Card containing the Animated Cinematic Image with elegant asymmetry */}
                    <div className="w-full max-w-[390px] bg-slate-900 border border-slate-800 p-4 rounded-[32px] shadow-[0_30px_70px_rgba(0,0,0,0.15)] relative overflow-hidden group">
                      {/* Interactive Glass Screen overlay */}
                      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-10" />
                      
                      {/* Image container frame */}
                      <div className="relative overflow-hidden rounded-[24px]">
                        <CinematicImage
                          src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&h=800&q=80"
                          alt="Prismatic Light Dispersals Spatial Art"
                          aspectClassName="aspect-[3/4] rounded-[24px] saturate-[1.10] contrast-[1.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
                      </div>

                      {/* Floating Control Badges inside Frame */}
                      <div className="absolute top-8 left-8 bg-slate-950/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 shadow-sm flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-mono text-[9px] text-slate-300 font-bold tracking-widest uppercase">
                          WEBGL_AURA // ONLINE
                        </span>
                      </div>

                      {/* Floating Metadata Indicator inside Image Frame */}
                      <div className="absolute bottom-8 left-8 right-8 bg-slate-950/80 backdrop-blur-xl p-4 rounded-2xl border border-slate-800 shadow-2xl flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Cpu className="w-5 h-5 text-purple-400 animate-spin [animation-duration:8s]" />
                          <div className="text-left">
                            <p className="font-mono text-[8px] uppercase tracking-widest text-[#7c3aed] font-bold">
                              SPATIAL CORE v3
                            </p>
                            <p className="text-xs font-sans font-bold text-slate-100">
                              REFRACTIVE_OS
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <span className="inline-block px-2 py-0.5 bg-purple-900/40 border border-purple-800 text-purple-200 font-mono text-[8px] font-bold rounded">
                            60FPS_MAX
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Secondary Overlapping Indicator Panel (Floating Glass Dashboard) */}
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-[-10px] left-[-30px] bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-150 shadow-xl hidden xl:flex items-center space-x-3 max-w-[180px]"
                    >
                      <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-100">
                        <Layers className="w-4.5 h-4.5 text-[#7c3aed]" />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-[#111827] font-mono uppercase tracking-wide">
                          MODELS_3D //
                        </p>
                        <p className="text-[11px] text-[#374151]">
                          Active Quad-Refraction
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Bottom stats indicators - Interactive Bento grid concept with smooth count tickers */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-100 w-full mt-10">
                  <div className="space-y-1">
                    <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                      ACTIVE RESORTS
                    </p>
                    <p className="text-3xl font-sans tracking-tight font-extrabold text-[#111827] flex items-baseline">
                      <Counter target={3} suffix="+" className="font-sans" />
                      <span className="text-xs text-purple-600 font-normal ml-2">SaaS Systems</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                      FRAMES DISTRIBUTED
                    </p>
                    <p className="text-3xl font-sans tracking-tight font-extrabold text-[#111827] flex items-baseline">
                      <Counter target={150} suffix="M+" className="font-sans" />
                      <span className="text-xs text-blue-600 font-normal ml-2">WebGL Elements</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                      VISUAL HONORS
                    </p>
                    <div className="flex items-center space-x-1.5 text-[#111827]">
                      <p className="text-3xl font-sans tracking-tight font-extrabold">
                        <Counter target={6} className="font-sans" />
                      </p>
                      <div className="flex text-amber-500 scale-90">
                        <Star className="w-4.5 h-4.5 fill-current animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                      FEEDBACK COEFFICIENT
                    </p>
                    <p className="text-3xl font-sans tracking-tight font-extrabold text-[#111827] flex items-baseline">
                      <Counter target={100} suffix="%" className="font-sans" />
                      <span className="text-xs text-cyan-600 font-normal ml-2">Client Trust</span>
                    </p>
                  </div>
                </div>
              </section>

              {/* 2. PROJECTS SECTION */}
              <section id="projects" className="py-24 border-t border-slate-100 bg-[#f5f7fa]/50 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                  <ProjectShowcase projects={PROJECTS} />
                </div>
              </section>

              {/* 3. SKILLS GRID SECTION */}
              <section id="skills" className="py-24 relative z-10 max-w-7xl mx-auto px-6 space-y-12">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Code2 className="w-4 h-4 text-[#7c3aed]" />
                    <span className="font-mono text-xs text-[#7c3aed] uppercase tracking-widest font-semibold">
                      SEC_02 // FRAMEWORKS & PARADIGMS
                    </span>
                  </div>
                  <h2 className="text-4xl font-sans tracking-tight font-extrabold text-[#111827]">
                    Technical Capabilities
                  </h2>
                  <p className="text-[#374151] max-w-2xl leading-relaxed text-sm">
                    Combining reactive layout states with heavy canvas GPU computation to deploy fluid, high-fidelity landing flows.
                  </p>
                </div>

                <SkillBento skillGroups={SKILL_GROUPS} />
              </section>

              {/* 4. ABOUT JOURNAL SECTION */}
              <section id="about" className="py-24 border-t border-slate-100 bg-slate-50/50 relative z-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Side: Avatar block and short bio (5 Columns) */}
                  <div className="col-span-1 lg:col-span-5 space-y-8">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-purple-600" />
                        <span className="font-mono text-xs text-[#7c3aed] uppercase tracking-widest font-semibold">
                          SEC_03 // PERSONAL DOSSIER
                        </span>
                      </div>
                      <h2 className="text-4xl font-sans tracking-tight font-extrabold text-[#111827]">
                        Behind the Canvas
                      </h2>
                    </div>

                    <div className="relative group max-w-sm rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-white p-4">
                      <CinematicImage
                        src={PERSONAL_INFO.avatar}
                        alt="Alexander Vance Portrait"
                        aspectClassName="aspect-square rounded-2xl"
                      />
                      <div className="pt-4 flex justify-between items-center text-xs text-slate-500 font-mono">
                        <span className="flex items-center space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          <span>San Francisco, CA</span>
                        </span>
                        <span>CREATIVE ENGINEER</span>
                      </div>
                    </div>

                    <p className="text-[#374151] leading-relaxed text-sm">
                      Over the last six years, I have navigated the junction of high-contrast design systems and complex interactive mathematics. My process treats software as an immersive medium where animation is not decorative, but functional — organizing informational complexity into delightful physical experiences.
                    </p>
                  </div>

                  {/* Right Side: Timeline milestone storyboarding (7 Columns) */}
                  <div className="col-span-1 lg:col-span-7 space-y-8">
                    <div className="space-y-1 border-b border-slate-100 pb-3">
                      <p className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                        HISTORIC ARCHIVES
                      </p>
                      <h3 className="text-2xl font-sans tracking-tight font-bold text-[#111827]">
                        Ecosystem Milestones
                      </h3>
                    </div>

                    <div className="relative border-l border-slate-200 ml-4 pl-8 space-y-8">
                      {TIMELINE_EVENTS.map((evt, idx) => (
                        <div key={evt.year} className="relative group/time">
                          {/* Anchor Circle */}
                          <div className="absolute left-[-41px] top-1.5 w-6 h-6 rounded-full border-4 border-white bg-slate-900 shadow-md group-hover/time:bg-purple-600 transition-colors duration-350" />
                          
                          <div className="space-y-2">
                            <span className="inline-block px-3 py-1 font-mono text-xs font-semibold bg-slate-900 text-white rounded-md mb-1 shadow-sm">
                              {evt.year}
                            </span>
                            <div className="space-y-1">
                              <h4 className="text-base font-sans font-bold text-[#111827] group-hover/time:text-purple-600 transition-colors duration-250">
                                {evt.title}
                              </h4>
                              <p className="text-xs font-mono text-slate-400">
                                {evt.subtitle}
                              </p>
                            </div>
                            <p className="text-[#374151] text-xs leading-relaxed max-w-lg">
                              {evt.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. EXPERIENCE CHRONICLE */}
              <section id="experience" className="py-24 relative z-10 max-w-7xl mx-auto px-6 space-y-12">
                <div className="space-y-2 text-center max-w-2xl mx-auto">
                  <div className="flex items-center justify-center space-x-2">
                    <Activity className="w-4 h-4 text-[#7c3aed]" />
                    <span className="font-mono text-xs text-[#7c3aed] uppercase tracking-widest font-semibold">
                      SEC_04 // PROFESSIONAL LEDGER
                    </span>
                  </div>
                  <h2 className="text-4xl font-sans tracking-tight font-extrabold text-[#111827]">
                    Work Ecosystem
                  </h2>
                  <p className="text-[#374151] leading-relaxed text-sm">
                    A chronicle of leadership and software contributions in key technology chambers.
                  </p>
                </div>

                {/* Horizontal toggle tabs for Experiences */}
                <div className="flex flex-wrap justify-center gap-3">
                  {EXPERIENCES.map((exp) => (
                    <button
                      key={exp.id}
                      onClick={() => setActiveExp(exp.id)}
                      className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all cursor-pointer ${
                        activeExp === exp.id
                          ? "bg-slate-950 text-white shadow-md border-transparent"
                          : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                      }`}
                    >
                      {exp.company}
                    </button>
                  ))}
                </div>

                {/* Experience Showcase Panel */}
                <div className="max-w-3xl mx-auto min-h-[260px]">
                  <AnimatePresence mode="wait">
                    {EXPERIENCES.map((exp) => (
                      exp.id === activeExp && (
                        <motion.div
                          key={exp.id}
                          initial={{ opacity: 0, scale: 0.98, y: 15 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98, y: -15 }}
                          transition={{ duration: 0.4 }}
                          className="bg-[#ffffff] border border-slate-100 p-8 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.015)] space-y-6"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-150">
                            <div>
                              <h3 className="text-xl font-sans tracking-tight font-bold text-[#111827]">
                                {exp.role}
                              </h3>
                              <p className="text-sm font-mono text-purple-600">
                                {exp.company}
                              </p>
                            </div>
                            <span className="px-4 py-1.5 font-mono text-xs font-semibold bg-slate-50 border border-slate-150 rounded-full text-slate-700 self-start sm:self-center">
                              {exp.period}
                            </span>
                          </div>

                          <p className="text-[#374151] text-sm leading-relaxed italic">
                            "{exp.description}"
                          </p>

                          <div className="space-y-3.5">
                            <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                              Core Operational Contributions
                            </p>
                            <ul className="space-y-2.5">
                              {exp.details.map((detail, dIdx) => (
                                <li key={dIdx} className="flex items-start text-xs text-slate-600">
                                  <span className="text-[#7c3aed] mr-2.5 mt-0.5 select-none">✦</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )
                    ))}
                  </AnimatePresence>
                </div>
              </section>

              {/* 6. CONTACT COMPASS SECTION */}
              <section id="contact" className="py-24 border-t border-slate-100 bg-[#f5f7fa]/30 relative z-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Left Side Info (5 Columns) */}
                  <div className="col-span-1 lg:col-span-5 space-y-8">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-purple-600" />
                        <span className="font-mono text-xs text-[#7c3aed] uppercase tracking-widest font-semibold">
                          SEC_05 // SECURE DIRECTORIES
                        </span>
                      </div>
                      <h2 className="text-4xl font-sans tracking-tight font-extrabold text-[#111827]">
                        Initiate Connection
                      </h2>
                    </div>

                    <p className="text-[#374151] leading-relaxed text-sm">
                      Have a vision for a premium, interactively rich project or interested in integrating high-contrast WebGL visualizations into your product? Complete the compass to trigger a synchronization call.
                    </p>

                    <div className="space-y-4">
                      <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                        PUBLIC API ACCESS
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-slate-600 hover:text-purple-600 transition-colors duration-200">
                          <Mail className="w-5 h-5 text-slate-400" />
                          <span className="text-sm font-sans">infaazmk@gmail.com</span>
                        </div>
                        <div className="flex items-center space-x-3 text-slate-600 hover:text-purple-600 transition-colors duration-200">
                          <MapPin className="w-5 h-5 text-slate-400" />
                          <span className="text-sm font-sans">San Francisco, California // Remote US</span>
                        </div>
                      </div>
                    </div>

                    {/* Social networks coordinates */}
                    <div className="space-y-3">
                      <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                        EXTERNAL NODE ROUTING
                      </p>
                      <div className="flex items-center space-x-3">
                        <MagneticButton>
                          <a
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#7c3aed] hover:border-slate-300 hover:bg-slate-50 transition-all shadow-xs"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        </MagneticButton>

                        <MagneticButton>
                          <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#2563eb] hover:border-slate-300 hover:bg-slate-50 transition-all shadow-xs"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        </MagneticButton>

                        <MagneticButton>
                          <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noreferrer"
                            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#06b6d4] hover:border-slate-300 hover:bg-slate-50 transition-all shadow-xs"
                          >
                            <Twitter className="w-5 h-5" />
                          </a>
                        </MagneticButton>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Form Block (7 Columns) with glowing focus borders */}
                  <div className="col-span-1 lg:col-span-7">
                    <div className="bg-[#ffffff] border border-slate-100 p-8 rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.02)] relative overflow-hidden">
                      
                      <div className="absolute top-0 right-0 w-36 h-36 bg-purple-100/20 rounded-full filter blur-xl" />

                      <AnimatePresence mode="wait">
                        {formStatus !== "success" ? (
                          <motion.form
                            key="form"
                            onSubmit={handleFormSubmit}
                            className="space-y-6 relative z-10"
                          >
                            <h3 className="text-xl font-sans font-bold text-[#111827]">
                              Message Chamber
                            </h3>

                            <div className="space-y-1.5">
                              <label htmlFor="name" className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                                Real Name / Alias
                              </label>
                              <input
                                type="text"
                                id="name"
                                required
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                placeholder="E.g., Dr. Elizabeth Stone"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-sans focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-purple-600/10 focus:border-[#7c3aed] transition-all duration-200"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label htmlFor="email" className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                                Direct Email Address
                              </label>
                              <input
                                type="email"
                                id="email"
                                required
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                placeholder="E.g., contact@corporation.com"
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-sans focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-purple-600/10 focus:border-[#7c3aed] transition-all duration-200"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label htmlFor="message" className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                                Mission Parameters / Project Scope
                              </label>
                              <textarea
                                id="message"
                                required
                                rows={4}
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                placeholder="Detail your project dimensions, desired timelines, and interactive requirements..."
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-sans focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-purple-600/10 focus:border-[#7c3aed] transition-all duration-200 resize-none"
                              />
                            </div>

                            <div className="pt-2">
                              <MagneticButton className="w-full">
                                <button
                                  type="submit"
                                  disabled={formStatus === "submitting"}
                                  className="w-full py-4 bg-slate-900 text-white font-medium text-sm rounded-xl cursor-pointer hover:bg-slate-800 transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                                >
                                  {formStatus === "submitting" ? (
                                    <>
                                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                      <span>Broadcasting Parameters...</span>
                                    </>
                                  ) : (
                                    <>
                                      <span>Dispatch Transmission</span>
                                      <Send className="w-4 h-4 text-purple-300" />
                                    </>
                                  )}
                                </button>
                              </MagneticButton>
                            </div>
                          </motion.form>
                        ) : (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                          >
                            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                              <CheckCircle className="w-8 h-8" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="text-xl font-sans tracking-tight font-extrabold text-[#111827]">
                                Transmission Success
                              </h3>
                              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                                CH_COMM_SECURED
                              </p>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
                              Your project parameters have been written to the direct queue. Alexander Vance will synchronize with you within 24 working cycles.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </section>
            </main>

            {/* Cinematic System Footer */}
            <footer className="border-t border-slate-100 py-16 bg-[#ffffff] relative z-10">
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-8 text-left">
                {/* Logo and brief detail */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-950 flex items-center justify-center text-white font-bold text-xs">
                      <span>AV</span>
                    </div>
                    <span className="font-sans font-extrabold text-[#111827] text-xs uppercase tracking-widest">
                      VANCE CORE
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs max-w-xs leading-relaxed">
                    Designed with architectural absolute alignment, Kinetic mesh systems and responsive light transitions.
                  </p>
                </div>

                {/* Clock indicator */}
                <div className="flex flex-col space-y-1 md:items-end">
                  <span className="text-[10px] font-mono tracking-widest text-[#7c3aed] uppercase font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    SYSTEM SPECTRAPHONE TIME
                  </span>
                  <span className="text-xs font-mono text-[#111827]">
                    {systime || "CH_TIME_DISRUPTED"}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    DEVICE RESORT: STABLE 60FPS
                  </span>
                </div>
              </div>

              {/* Bottom Copyright and coordinates */}
              <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-400 gap-4">
                <span>© 2026 ALEXANDER VANCE. ALL PROTOCOLS EXECUTED.</span>
                <span className="flex items-center space-x-1">
                  <span>DEPLOYMENT: CLOUD RUN INGRESS</span>
                </span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
