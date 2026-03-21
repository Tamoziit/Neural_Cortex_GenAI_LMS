import type { LearningCard } from "../types";
import {
    RiBookOpenLine,
    RiFlashlightLine,
    RiToolsLine,
    RiMedalLine,
} from "react-icons/ri";

export const cards: LearningCard[] = [
    {
        title: "Learning Modules",
        bullets: [
            "Concept explanation",
            "Case studies",
            "Implementation walkthrough",
            "Architecture discussion",
        ],
        icon: RiBookOpenLine,
        alt: "Learning modules icon",
        accent: "from-sky-400/20 via-sky-500/5 to-transparent",
        accentBorder: "border-sky-400/25",
        accentText: "text-sky-300",
        accentDot: "bg-sky-400",
    },
    {
        title: "Hands-on Labs",
        description:
            "Real-world AI projects — RAG assistants, enterprise chatbots, multi-agent workflows, and LLM-powered document processing.",
        bullets: [],
        icon: RiFlashlightLine,
        alt: "Hands-on labs icon",
        accent: "from-violet-400/20 via-violet-500/5 to-transparent",
        accentBorder: "border-violet-400/25",
        accentText: "text-violet-300",
        accentDot: "bg-violet-400",
    },
    {
        title: "Interactive Learning Tools",
        bullets: [
            "Azure AI sandbox",
            "Code playground",
            "Architecture simulation tools",
        ],
        icon: RiToolsLine,
        alt: "Interactive tools icon",
        accent: "from-emerald-400/20 via-emerald-500/5 to-transparent",
        accentBorder: "border-emerald-400/25",
        accentText: "text-emerald-300",
        accentDot: "bg-emerald-400",
    },
    {
        title: "Certification",
        description: "Organizations can:",
        bullets: [
            "Verify employee capabilities",
            "Track AI readiness",
            "Identify skill gaps",
        ],
        icon: RiMedalLine,
        alt: "Certification icon",
        accent: "from-amber-400/20 via-amber-500/5 to-transparent",
        accentBorder: "border-amber-400/25",
        accentText: "text-amber-300",
        accentDot: "bg-amber-400",
    },
];