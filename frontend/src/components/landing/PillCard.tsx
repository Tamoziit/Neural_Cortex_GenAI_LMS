import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { LearningCard } from "../../types";

const PillCard = ({ card, index }: { card: LearningCard; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const isWide = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isWide ? -32 : 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
            className={`relative ${isWide ? "self-start w-full lg:w-[90%]" : "self-end w-full lg:w-[90%]"}`}
        >
            <div
                className={`
					relative overflow-hidden flex items-center gap-6
					border ${card.accentBorder} bg-white/[0.03] backdrop-blur-sm
					px-6 py-5
					transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20 rounded-full
				`}
            >
                {/* Gradient wash */}
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${card.accent} opacity-70`} />

                {/* Icon circle */}
                <div className={`relative shrink-0 w-14 h-14 rounded-full flex items-center justify-center border ${card.accentBorder} bg-white/5`}>
                    <card.icon className={`w-8 h-8 ${card.accentText}`} />
                </div>

                {/* Text */}
                <div className="relative flex flex-col gap-2 min-w-0">
                    <span className={`text-sm font-semibold ${card.accentText} leading-none tracking-wider`}>
                        {card.title}
                    </span>

                    {card.description && (
                        <p className="text-xs text-white/45 leading-relaxed">{card.description}</p>
                    )}

                    {card.bullets.length > 0 && (
                        <ul className="flex flex-wrap gap-x-5 gap-y-1">
                            {card.bullets.map((b) => (
                                <li key={b} className="flex items-center gap-1.5">
                                    <span className={`h-1 w-1 rounded-full shrink-0 ${card.accentDot} opacity-60`} />
                                    <span className="text-xs text-white/45">{b}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Step number */}
                <span className={`relative ml-auto shrink-0 text-[15px] font-semibold tracking-widest uppercase !font-mono ${card.accentText} opacity-35`}>
                    {String(index + 1).padStart(2, "0")}
                </span>
            </div>
        </motion.div>
    );
}

export default PillCard;