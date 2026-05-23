import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { SkillGroup, Skill } from "../types";

interface SkillBentoProps {
  skillGroups: SkillGroup[];
}

// Helper to map string to Lucide React element safely
function getIconComponent(name: string) {
  // Safe lookup with typing assertion
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.Code className="w-5 h-5" />;
  return <IconComponent className="w-5 h-5" />;
}

export default function SkillBento({ skillGroups }: SkillBentoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {/* 1. Large Feature Bento Card: Core Philosophy */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="col-span-1 md:col-span-2 lg:col-span-1 bg-[#ffffff] border border-slate-100 p-8 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-300 pointer-events-auto"
      >
        <div className="absolute top-0 right-0 w-36 h-36 bg-purple-100/30 rounded-full filter blur-xl group-hover:bg-purple-200/40 transition-all duration-500 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100/20 rounded-full filter blur-lg pointer-events-none" />

        <div className="space-y-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 text-[#7c3aed] group-hover:scale-110 transition-transform duration-300">
            <Icons.Compass className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-sans tracking-tight font-bold text-[#111827]">
            My Aesthetic Philosophy
          </h3>
          <p className="text-sm leading-relaxed text-[#374151]">
            I build digital canvases focused on clean margins, smooth kinetics, and high architectural honesty. By keeping elements mathematically organized, interfaces become intuitive and comfortable.
          </p>
        </div>

        <div className="pt-8 relative z-10">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-600">
              ⚡ GPU-Optimized
            </span>
            <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-600">
              🎯 Kinetic Physics
            </span>
            <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-600">
              💎 Awwwards Standard
            </span>
          </div>
        </div>
      </motion.div>

      {/* 2 & 3. Modular Tech categories */}
      {skillGroups.map((group, groupIdx) => (
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: groupIdx * 0.15 }}
          className="bg-[#ffffff] border border-slate-100 p-8 rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all duration-300 relative overflow-hidden group flex flex-col justify-between pointer-events-auto"
        >
          {groupIdx === 0 ? (
            <div className="absolute top-0 right-0 w-44 h-44 bg-blue-100/30 rounded-full filter blur-2xl group-hover:bg-blue-200/40 transition-all duration-500 pointer-events-none" />
          ) : (
            <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-100/30 rounded-full filter blur-2xl group-hover:bg-cyan-200/40 transition-all duration-500 pointer-events-none" />
          )}

          <div className="space-y-6 relative z-10 w-full">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h4 className="text-lg font-sans tracking-tight font-bold text-[#111827]">
                {group.category}
              </h4>
              <span className="text-[10px] font-mono tracking-widest text-[#7c3aed] uppercase">
                SEC_0{groupIdx + 1}
              </span>
            </div>

            <div className="space-y-5">
              {group.skills.map((skill: Skill) => (
                <div key={skill.name} className="space-y-1.5 group/skill">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-slate-500 group-hover/skill:text-purple-600 transition-colors duration-200">
                        {getIconComponent(skill.iconName)}
                      </span>
                      <span className="font-sans font-medium text-[#111827]">
                        {skill.name}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-slate-500">
                      {skill.proficiency}%
                    </span>
                  </div>
                  
                  {/* Custom progress gauge track */}
                  <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
                      className={`h-full rounded-full bg-gradient-to-r ${
                        groupIdx === 0
                          ? "from-blue-600 to-purple-500"
                          : "from-purple-500 to-cyan-500"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 relative z-10 text-right">
            <span className="text-xs font-mono text-slate-400 group-hover:text-slate-600 transition-colors duration-300">
              CONTINUOUS UPDATES_
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
