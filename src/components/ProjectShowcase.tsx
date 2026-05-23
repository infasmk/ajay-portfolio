import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Projector,
  ExternalLink,
  Github,
  Sparkles,
  Filter,
  FolderOpen,
  ArrowRight,
  Plus,
  Minus,
  Atom
} from "lucide-react";
import { Project } from "../types";
import CinematicImage from "./CinematicImage";
import MagneticButton from "./MagneticButton";

interface ProjectShowcaseProps {
  projects: Project[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  // Separate into Featured (the 4 core main items) and All
  const featuredProjects = projects.filter((p) => p.featured);
  
  // Category state for the Archive Index
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [showCatalog, setShowCatalog] = useState<boolean>(false);

  // Extract unique categories for filtering
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  // Filter projects for the Archive Index
  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const toggleExpandProject = (id: string) => {
    setExpandedProjectId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full space-y-24 relative z-10" id="projects-showcase">
      
      {/* SECTION HEADER */}
      <div className="space-y-4 text-center max-w-3xl mx-auto pb-6">
        <div className="inline-flex items-center space-x-2 bg-purple-50 border border-purple-100 px-4 py-1.5 rounded-full">
          <Projector className="w-4 h-4 text-purple-600 animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest text-[#7c3aed] uppercase font-bold">
            SEC_01 // SELECTED ARTIFACT DECK
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl font-sans tracking-tight font-extrabold text-[#111827]">
          Curated Visual Projects
        </h2>
        <p className="text-[#374151] leading-relaxed text-sm">
          A focused sequence of my four most complex spatial interactive builds, designed to bridge advanced layout mathematics with creative cinematic physics.
        </p>
      </div>

      {/* CURATED FEATURED PROJECTS (THE 4 IMPORTANT PROJECTS) */}
      <div className="space-y-24">
        {featuredProjects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: isEven ? 100 : -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/90 backdrop-blur-md rounded-[32px] border border-slate-100 p-6 sm:p-8 lg:p-12 shadow-[0_15px_45px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_65px_rgba(0,0,0,0.05)] hover:border-purple-100 transition-all duration-500 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center group"
            >
              {/* Subtle cosmic background glow in the main project card */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full filter blur-3xl pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors duration-500" />

              {/* Project Image Panel (Dynamic Asymmetry: 7 columns) */}
              <div className={`col-span-1 lg:col-span-7 ${!isEven ? "lg:order-last" : ""}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)] bg-slate-50 border border-slate-100 p-2.5 transition-transform duration-500 group-hover:scale-[1.01]">
                  <CinematicImage
                    src={project.image}
                    alt={project.title}
                    aspectClassName="aspect-video rounded-xl"
                  />
                  
                  {/* Digital Timestamp Badge */}
                  <div className="absolute top-5 left-5 bg-[#ffffff]/90 backdrop-blur-md px-3 py-1.2 rounded-full border border-slate-100 shadow-sm flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                    <span className="font-mono text-[9px] font-semibold text-[#111827]">
                      {project.year} // SYSTEM_LOAD
                    </span>
                  </div>

                  {/* Category Pill Tag */}
                  <div className="absolute top-5 right-5 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.2 rounded-full text-white text-[9px] font-semibold tracking-wider uppercase">
                    {project.category}
                  </div>
                </div>
              </div>

              {/* Project Text Specs (5 columns) */}
              <div className="col-span-1 lg:col-span-5 flex flex-col justify-center space-y-5">
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs text-purple-600 font-bold tracking-widest uppercase">
                      NO.0{index + 1}
                    </span>
                    <span className="w-4 h-0.5 bg-slate-200" />
                    <span className="font-mono text-xs text-slate-400">
                      {project.subtitle}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-sans tracking-tight font-extrabold text-[#111827] group-hover:text-purple-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>

                <p className="text-[#374151] leading-relaxed text-sm font-normal">
                  {project.description}
                </p>

                {/* Architecture parameters Box */}
                <div className="bg-[#ffffff] border border-slate-100 p-4 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] space-y-2.5">
                  <div className="flex items-center space-x-2 text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                    <Atom className="w-3.5 h-3.5 text-[#2563eb]" />
                    <span>Technology Formula</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono px-2.5 py-0.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-600 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions & Connections */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <MagneticButton>
                    <a
                      href={project.demoUrl}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#111827] text-white text-[11px] font-mono uppercase tracking-widest font-bold rounded-full cursor-pointer hover:bg-slate-800 shadow-md hover:shadow-lg transition-all"
                    >
                      <span>Launch Node</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </MagneticButton>

                  <MagneticButton>
                    <a
                      href={project.githubUrl}
                      className="inline-flex items-center space-x-2 px-4.5 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-[#111827] text-[11px] font-mono uppercase tracking-widest font-bold rounded-full cursor-pointer hover:bg-slate-50 shadow-xs transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Resource API</span>
                    </a>
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* TOGGLE CATALOG INTERACTIVE BUTTON */}
      <div className="flex flex-col items-center justify-center pt-8 space-y-4">
        <p className="text-xs text-slate-400 font-mono text-center">
          Explore additional spatial widgets, tools, and sandboxes
        </p>
        <MagneticButton>
          <button
            onClick={() => setShowCatalog(!showCatalog)}
            className="inline-flex items-center space-x-3 px-8 py-4.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono uppercase tracking-widest rounded-full cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            <FolderOpen className="w-4 h-4 text-purple-400" />
            <span>{showCatalog ? "Collapse Complete Catalog" : "Explore Complete Catalog (7+ Builds)"}</span>
            <ArrowRight className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${showCatalog ? "rotate-90 text-purple-400" : ""}`} />
          </button>
        </MagneticButton>
      </div>

      <AnimatePresence>
        {showCatalog && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden w-full"
          >
            {/* ALL PROJECTS SECTION - DEDICATED DIRECTORY INDEX */}
            <div className="pt-16 border-t border-slate-100 space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <FolderOpen className="w-4 h-4 text-[#7c3aed]" />
                    <span className="font-mono text-xs text-[#7c3aed] uppercase tracking-widest font-semibold">
                      SYSTEM ARCHIVE DIRECTORY
                    </span>
                  </div>
                  <h3 className="text-3xl font-sans tracking-tight font-extrabold text-[#111827]">
                    Complete Project Catalog
                  </h3>
                  <p className="text-sm text-slate-500 max-w-xl">
                    Filter through the entire repository database to inspect and trigger standalone previews, design tokens, and source APIs.
                  </p>
                </div>

                {/* Interactive filter folder tabs */}
                <div className="flex flex-wrap gap-2 self-start md:self-end bg-slate-50 border border-slate-100 p-1.5 rounded-2xl relative z-10">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setExpandedProjectId(null);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                        activeCategory === cat
                          ? "bg-white text-slate-900 shadow-xs border border-slate-150 font-bold"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Catalog Rows / Bento Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project) => {
                    const isExpanded = expandedProjectId === project.id;

                    return (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="bg-[#ffffff] border border-slate-100 p-6 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_45px_rgba(0,0,0,0.035)] transition-all duration-300 flex flex-col justify-between group overflow-hidden relative pointer-events-auto"
                      >
                        {/* Tiny flare */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50/40 rounded-full filter blur-lg pointer-events-none group-hover:bg-purple-100/50 transition-colors duration-400" />

                        <div className="space-y-4">
                          {/* Catalog Image frame */}
                          <div className="relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-100">
                            <img
                              src={project.image}
                              alt={project.title}
                              referrerPolicy="no-referrer"
                              className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3 bg-[#ffffff]/90 px-2.5 py-1 rounded-lg border border-slate-100 shadow-xs">
                              <span className="font-mono text-[9px] font-bold text-slate-700">
                                {project.year}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-[#7c3aed]">
                              {project.category}
                            </span>
                            <h4 className="text-xl font-sans tracking-tight font-extrabold text-[#111827] group-hover:text-purple-600 transition-colors duration-250">
                              {project.title}
                            </h4>
                            <p className="text-xs text-slate-500">
                              {project.subtitle}
                            </p>
                          </div>

                          <p className="text-xs text-[#374151] leading-relaxed">
                            {project.description}
                          </p>

                          {/* Expandable Specifications segment */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden border-t border-slate-50 pt-3 space-y-3 mt-3"
                              >
                                <p className="text-[10px] text-slate-600 font-sans leading-relaxed">
                                  {project.longDescription}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {project.tech.map((t) => (
                                    <span
                                      key={t}
                                      className="text-[10px] font-mono px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-slate-500"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Actions Bar */}
                        <div className="flex items-center justify-between border-t border-slate-50 pt-5 mt-5">
                          <button
                            onClick={() => toggleExpandProject(project.id)}
                            className="text-[10px] font-mono font-bold tracking-wider text-[#7c3aed] flex items-center space-x-1 uppercase hover:text-purple-800 cursor-pointer"
                          >
                            {isExpanded ? (
                              <>
                                <Minus className="w-3.5 h-3.5" />
                                <span>Close Specifications</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5 animate-pulse" />
                                <span>View Specifications</span>
                              </>
                            )}
                          </button>

                          <div className="flex items-center space-x-2">
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              title="Source Code"
                              className="p-1.5 rounded-lg border border-slate-150 text-slate-400 hover:text-slate-800 transition-colors"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              title="Live Preview"
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
