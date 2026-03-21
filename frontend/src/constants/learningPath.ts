import type { RoadmapStep } from "../types";

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