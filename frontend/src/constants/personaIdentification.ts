import { FiStar, FiTrendingUp, FiZap } from "react-icons/fi";

export const levelConfig = {
    Beginner: {
        icon: FiStar,
        color: "from-emerald-500/25 to-teal-500/5",
        border: "border-emerald-400/30",
        text: "text-emerald-400",
        glow: "shadow-[0_0_40px_-8px_rgba(52,211,153,0.35)]",
        badge: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
        label: "You're just starting out — your personalized beginner roadmap awaits.",
    },
    Intermediate: {
        icon: FiTrendingUp,
        color: "from-cyan-500/25 to-blue-500/5",
        border: "border-cyan-400/30",
        text: "text-cyan-400",
        glow: "shadow-[0_0_40px_-8px_rgba(34,211,238,0.35)]",
        badge: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
        label: "You've got solid foundations — your path is calibrated for growth.",
    },
    Advanced: {
        icon: FiZap,
        color: "from-violet-500/25 to-purple-500/5",
        border: "border-violet-400/30",
        text: "text-violet-400",
        glow: "shadow-[0_0_40px_-8px_rgba(167,139,250,0.35)]",
        badge: "bg-violet-500/15 text-violet-300 border-violet-400/30",
        label: "Impressive expertise — your advanced track is ready to challenge you.",
    },
};

export const optionLetters = ["A", "B", "C", "D"];

export const cardVariants = {
    enter: (dir: number) => ({
        x: dir > 0 ? 80 : -80,
        opacity: 0,
        scale: 0.97,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (dir: number) => ({
        x: dir > 0 ? -80 : 80,
        opacity: 0,
        scale: 0.97,
    }),
};