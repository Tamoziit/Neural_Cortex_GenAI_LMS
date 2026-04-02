import type { IconType } from "react-icons";
import type { RoadmapStep } from "../types";
import {
    FiCpu,
    FiGrid,
    FiLayers,
    FiRefreshCw,
    FiHardDrive,
    FiShield,
    FiCode,
    FiActivity
} from "react-icons/fi";

export const steps: RoadmapStep[] = [
    {
        title: "Initial Skill Assessment",
        bullets: ["Users complete an assessment test", "System analyzes background & AI knowledge"],
        icon: "/LP1.png",
        alt: "Assessment clipart",
        accent: "from-sky-400/20 to-sky-500/5",
    },
    {
        title: "Skill Mapping & Analysis",
        bullets: ["Evaluates assessment results", "Considers prior technical exposure", "Aligns to goals"],
        icon: "/LP2.png",
        alt: "Skill mapping clipart",
        accent: "from-violet-400/20 to-violet-500/5",
    },
    {
        title: "Learning Path Generation",
        bullets: ["Creates an adaptive roadmap", "Recommends courses, modules & labs"],
        icon: "/LP3.png",
        alt: "Path generation clipart",
        accent: "from-emerald-400/20 to-emerald-500/5",
    },
    {
        title: "Structured Learning Tracks",
        bullets: ["Beginner track for starters", "Intermediate for prior exposure", "Advanced for teams"],
        icon: "/LP4.png",
        alt: "Learning tracks clipart",
        accent: "from-amber-400/20 to-amber-500/5",
    },
    {
        title: "Continuous Adaptation",
        bullets: ["Progress is continuously monitored", "Learning paths update dynamically"],
        icon: "/LP5.png",
        alt: "Adaptation clipart",
        accent: "from-rose-400/20 to-rose-500/5",
    },
];

export const accentDot: Record<string, string> = {
    "from-sky-400/20 to-sky-500/5": "bg-sky-400",
    "from-violet-400/20 to-violet-500/5": "bg-violet-400",
    "from-emerald-400/20 to-emerald-500/5": "bg-emerald-400",
    "from-amber-400/20 to-amber-500/5": "bg-amber-400",
    "from-rose-400/20 to-rose-500/5": "bg-rose-400",
};

export const accentText: Record<string, string> = {
    "from-sky-400/20 to-sky-500/5": "text-sky-300",
    "from-violet-400/20 to-violet-500/5": "text-violet-300",
    "from-emerald-400/20 to-emerald-500/5": "text-emerald-300",
    "from-amber-400/20 to-amber-500/5": "text-amber-300",
    "from-rose-400/20 to-rose-500/5": "text-rose-300",
};

export const accentBorder: Record<string, string> = {
    "from-sky-400/20 to-sky-500/5": "border-sky-400/30",
    "from-violet-400/20 to-violet-500/5": "border-violet-400/30",
    "from-emerald-400/20 to-emerald-500/5": "border-emerald-400/30",
    "from-amber-400/20 to-amber-500/5": "border-amber-400/30",
    "from-rose-400/20 to-rose-500/5": "border-rose-400/30",
};

export const roleIcons: Record<string, IconType> = {
    Azure_AI_Engineer: FiCpu,
    Azure_DS: FiActivity,
    Azure_Administrator: FiGrid,
    Azure_Solutions_Architect: FiLayers,
    Azure_DevOps_Engineer: FiRefreshCw,
    Azure_Data_Engineer: FiHardDrive,
    Azure_Security_Engineer: FiShield,
    Azure_Developer: FiCode
};

export const roleColors: Record<string, string> = {
    Azure_AI_Engineer: "from-blue-500/20 via-blue-400/5 to-transparent",
    Azure_DS: "from-purple-500/20 via-purple-400/5 to-transparent",
    Azure_Administrator: "from-emerald-500/20 via-emerald-400/5 to-transparent",
    Azure_Solutions_Architect: "from-amber-500/20 via-amber-400/5 to-transparent",
    Azure_DevOps_Engineer: "from-pink-500/20 via-pink-400/5 to-transparent",
    Azure_Data_Engineer: "from-cyan-500/20 via-cyan-400/5 to-transparent",
    Azure_Security_Engineer: "from-rose-500/20 via-rose-400/5 to-transparent",
    Azure_Developer: "from-indigo-500/20 via-indigo-400/5 to-transparent"
};

export const roleAccent: Record<string, {
    color: string;
    border: string;
    text: string;
    glow: string;
}> = {
    Azure_AI_Engineer: { color: "bg-blue-500", border: "border-blue-400/40", text: "text-blue-400", glow: "shadow-[0_0_28px_-6px_rgba(96,165,250,0.4)]" },
    Azure_DS: { color: "bg-purple-500", border: "border-purple-400/40", text: "text-purple-400", glow: "shadow-[0_0_28px_-6px_rgba(167,139,250,0.4)]" },
    Azure_Administrator: { color: "bg-emerald-500", border: "border-emerald-400/40", text: "text-emerald-400", glow: "shadow-[0_0_28px_-6px_rgba(52,211,153,0.4)]" },
    Azure_Solutions_Architect: { color: "bg-amber-500", border: "border-amber-400/40", text: "text-amber-400", glow: "shadow-[0_0_28px_-6px_rgba(251,191,36,0.4)]" },
    Azure_DevOps_Engineer: { color: "bg-pink-500", border: "border-pink-400/40", text: "text-pink-400", glow: "shadow-[0_0_28px_-6px_rgba(244,114,182,0.4)]" },
    Azure_Data_Engineer: { color: "bg-cyan-500", border: "border-cyan-400/40", text: "text-cyan-400", glow: "shadow-[0_0_28px_-6px_rgba(34,211,238,0.4)]" },
    Azure_Security_Engineer: { color: "bg-rose-500", border: "border-rose-400/40", text: "text-rose-400", glow: "shadow-[0_0_28px_-6px_rgba(251,113,133,0.4)]" },
    Azure_Developer: { color: "bg-indigo-500", border: "border-indigo-400/40", text: "text-indigo-400", glow: "shadow-[0_0_28px_-6px_rgba(129,140,248,0.4)]" },
};

export const fallbackAccent = { color: "bg-cyan-500", border: "border-cyan-400/40", text: "text-cyan-400", glow: "shadow-[0_0_28px_-6px_rgba(34,211,238,0.4)]" };

export const levelColors = {
    Beginner: "text-emerald-400",
    Intermediate: "text-cyan-400",
    Advanced: "text-violet-400",
};

export const levelBadge: Record<string, string> = {
    Beginner: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
    Intermediate: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
    Advanced: "bg-violet-500/15 text-violet-300 border-violet-400/30",
};