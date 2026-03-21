import { useRef } from "react";
import type { RoadmapStep } from "../../types";
import { motion, useInView } from "framer-motion";
import { accentBorder, accentDot, accentText } from "../../constants/learningPath";

const StepCard = ({ step, index }: { step: RoadmapStep; index: number }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-80px" });
	const isTop = index % 2 === 0;

	return (
		<div
			ref={ref}
			className="relative flex flex-col"
			style={{ gridColumn: `${index + 1}` }}
		>
			{/* Card — top or bottom */}
			<motion.div
				initial={{ opacity: 0, y: isTop ? -20 : 20 }}
				animate={isInView ? { opacity: 1, y: 0 } : {}}
				transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
				className={`${isTop ? "mb-0 pb-8" : "mt-auto pt-8"}`}
			>
				<div
					className={`
                        relative overflow-hidden w-50 lg:w-70 rounded-2xl border ${accentBorder[step.accent]}
                        bg-white/[0.03] backdrop-blur-sm
                        p-5 flex flex-col gap-4
                        transition-all duration-300
                        hover:bg-white/[0.06] hover:border-white/20
                    `}
				>
					{/* Gradient wash */}
					<div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${step.accent} opacity-60`} />

					{/* Step number */}
					<div className="relative flex items-start justify-between">
						<span
							className={`text-[10px] font-semibold tracking-widest uppercase !font-mono ${accentText[step.accent]} opacity-70`}
						>
							Step {String(index + 1).padStart(2, "0")}
						</span>
					</div>

					{/* Icon — centered */}
					<div className="relative flex justify-center items-center py-1">
						<img
							src={step.icon}
							alt={step.alt}
							className="size-20 object-contain"
							draggable={false}
						/>
					</div>

					{/* Title */}
					<h3 className="relative text-sm font-semibold text-white/90 leading-snug tracking-wider">
						{step.title}
					</h3>

					{/* Bullets */}
					<ul className="relative flex flex-col gap-1.5">
						{step.bullets.map((b) => (
							<li key={b} className="flex items-start gap-2">
								<span
									className={`mt-[5px] h-1 w-1 rounded-full shrink-0 ${accentDot[step.accent]} opacity-70`}
								/>
								<span className="text-xs text-white/50 leading-snug">{b}</span>
							</li>
						))}
					</ul>
				</div>
			</motion.div>
		</div>
	);
}

export default StepCard;