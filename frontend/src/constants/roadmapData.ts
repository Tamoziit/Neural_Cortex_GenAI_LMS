import type { RoadmapModule } from "../types";
import buildLayout from "../utils/buildLayout";

export const MODULE_ACCENTS = [
    { glow: "#22d3ee", ring: "#0e7490", label: "sky" },     // cyan
    { glow: "#a78bfa", ring: "#6d28d9", label: "violet" },  // violet
    { glow: "#34d399", ring: "#065f46", label: "emerald" }, // emerald
    { glow: "#fb923c", ring: "#9a3412", label: "orange" },  // orange
    { glow: "#f472b6", ring: "#9d174d", label: "pink" },    // pink
] as const;

export const LEVEL_COLORS: Record<string, string> = {
    Beginner: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    Intermediate: "text-amber-300 bg-amber-500/10 border-amber-500/30",
    Advanced: "text-rose-300 bg-rose-500/10 border-rose-500/30",
};

export const roadmapModules: RoadmapModule[] = [
    {
        id: "mod-1",
        title: "AI Foundations",
        description: "Core concepts of Generative AI & LLMs",
        chapters: [
            { id: "c-1-1", title: "Intro to Generative AI", duration: "45 min", level: "Beginner" },
            { id: "c-1-2", title: "LLM Architecture", duration: "60 min", level: "Beginner" },
            { id: "c-1-3", title: "Prompt Engineering", duration: "50 min", level: "Beginner" },
        ],
    },
    {
        id: "mod-2",
        title: "Azure AI Services",
        description: "Azure OpenAI, Cognitive Services & SDK",
        chapters: [
            { id: "c-2-1", title: "Azure OpenAI Setup", duration: "40 min", level: "Intermediate" },
            { id: "c-2-2", title: "Cognitive Services Overview", duration: "55 min", level: "Intermediate" },
            { id: "c-2-3", title: "Azure AI SDK Deep Dive", duration: "70 min", level: "Intermediate" },
        ],
    },
    {
        id: "mod-3",
        title: "RAG & Embeddings",
        description: "Retrieval-Augmented Generation patterns",
        chapters: [
            { id: "c-3-1", title: "Vector Databases", duration: "50 min", level: "Intermediate" },
            { id: "c-3-2", title: "Embedding Models", duration: "45 min", level: "Intermediate" },
            { id: "c-3-3", title: "Building a RAG Pipeline", duration: "80 min", level: "Advanced" },
        ],
    },
    {
        id: "mod-4",
        title: "Multi-Agent Systems",
        description: "Orchestration, tools & agentic workflows",
        chapters: [
            { id: "c-4-1", title: "Agent Design Patterns", duration: "60 min", level: "Advanced" },
            { id: "c-4-2", title: "Tool Use & Function Calling", duration: "65 min", level: "Advanced" },
            { id: "c-4-3", title: "Multi-Agent Orchestration", duration: "90 min", level: "Advanced" },
        ],
    },
    {
        id: "mod-5",
        title: "Production & MLOps",
        description: "Deploy, monitor & iterate AI solutions",
        chapters: [
            { id: "c-5-1", title: "APIs & Deployment Strategies", duration: "55 min", level: "Advanced" },
            { id: "c-5-2", title: "Observability & Evaluation", duration: "50 min", level: "Advanced" },
            { id: "c-5-3", title: "Responsible AI & Governance", duration: "60 min", level: "Advanced" },
        ],
    },
    {
        id: "mod-6",
        title: "Production & MLOps",
        description: "Deploy, monitor & iterate AI solutions",
        chapters: [
            { id: "c-6-1", title: "APIs & Deployment Strategies", duration: "55 min", level: "Advanced" },
            { id: "c-6-2", title: "Observability & Evaluation", duration: "50 min", level: "Advanced" },
            { id: "c-6-3", title: "Responsible AI & Governance", duration: "60 min", level: "Advanced" },
        ],
    },
    {
        id: "mod-7",
        title: "Production & MLOps",
        description: "Deploy, monitor & iterate AI solutions",
        chapters: [
            { id: "c-7-1", title: "APIs & Deployment Strategies", duration: "55 min", level: "Advanced" },
            { id: "c-7-2", title: "Observability & Evaluation", duration: "50 min", level: "Advanced" },
            { id: "c-7-3", title: "Responsible AI & Governance", duration: "60 min", level: "Advanced" },
        ],
    },
];

const _layout = buildLayout(roadmapModules.length);
export const POSITIONS    = _layout.positions;
export const PATH_D       = _layout.pathD;
export const CANVAS_WIDTH = _layout.canvasWidth;