import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiLayers, FiCheckCircle } from "react-icons/fi";
import type { TimelineModuleCardProps } from "../../types";
import { levelBadge } from "../../constants/learningPath";

const TimelineModuleCard = forwardRef<HTMLDivElement, TimelineModuleCardProps>(
	({ module, index, isFocused, accentColor, accentBorder, accentText, accentGlow }, ref) => {
		const navigate = useNavigate();
		const isLeft = index % 2 === 0;

		return (
			<div
				ref={ref}
				className={`relative flex items-center w-full ${isLeft ? "justify-start pr-[calc(50%+2rem)]" : "justify-end pl-[calc(50%+2rem)]"}`}
			>
				{/* Timeline dot */}
				<div
					className={`
                        absolute left-1/2 -translate-x-1/2 z-10
                        w-4 h-4 rounded-full border-2 transition-all duration-500
                        ${isFocused
							? `${accentColor} border-white/50 shadow-[0_0_14px_4px_rgba(34,211,238,0.4)]`
							: "bg-white/10 border-white/20"
						}
                    `}
				/>

				{/* Connector arm */}
				<div
					className={`
                        absolute top-1/2 -translate-y-1/2 h-px w-8 transition-all duration-500
                        ${isLeft ? "right-[calc(50%-2rem+16px)] left-auto" : "left-[calc(50%-2rem+16px)] right-auto"}
                        ${isFocused ? `${accentColor} opacity-60` : "bg-white/10"}
                    `}
					style={{ background: isFocused ? undefined : "rgba(255,255,255,0.08)" }}
				/>

				{/* Card */}
				<motion.div
					initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
					whileHover={{ scale: 1.025, y: -4 }}
					onClick={() => navigate(`/learning-path/module/${module._id}`)}
					className={`
                        relative group cursor-pointer w-full max-w-md glassmorphic rounded-2xl overflow-hidden
                        transition-all duration-400 border
                        ${isFocused ? `${accentBorder} ${accentGlow}` : "border-white/10 hover:border-white/20"}
                    `}
				>
					{/* Focused accent overlay only — no hover colour change */}
					{isFocused && (
						<div className="absolute inset-0 bg-gradient-to-br from-white/4 to-transparent pointer-events-none" />
					)}

					<div className="relative z-10 p-5 flex flex-col gap-4">
						{/* Header row */}
						<div className="flex items-start justify-between gap-3">
							<div className="flex flex-col gap-1.5">
								{/* Phase badge */}
								<span className={`!font-mono text-[10px] tracking-[0.18em] uppercase ${accentText} opacity-70`}>
									Phase {module.phase}
								</span>
								<h3 className="text-white font-semibold text-base leading-snug group-hover:text-white transition-colors">
									{module.title}
								</h3>
							</div>
							<div className={`shrink-0 w-9 h-9 rounded-xl glassmorphic-2 flex items-center justify-center ${accentText} group-hover:scale-110 group-hover:-rotate-6 transition-all duration-400`}>
								<FiLayers className="text-base" />
							</div>
						</div>

						{/* Level + separator */}
						<div className="flex items-center gap-2">
							<span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold !font-mono ${levelBadge[module.level]}`}>
								<span className="w-1 h-1 rounded-full bg-current" />
								{module.level}
							</span>
						</div>

						{/* Prerequisites (max 3 shown) */}
						{module.prerequisites?.length > 0 && (
							<div className="flex flex-col gap-1.5">
								<p className="text-[10px] !font-mono text-gray-500 uppercase tracking-widest">Prerequisites</p>
								<ul className="flex flex-col gap-1">
									{module.prerequisites.slice(0, 3).map((pre, i) => (
										<li key={i} className="flex items-start gap-2">
											<FiCheckCircle className={`shrink-0 mt-0.5 text-xs ${accentText} opacity-60`} />
											<span className="text-[12px] text-gray-400 leading-snug line-clamp-1">{pre}</span>
										</li>
									))}
									{module.prerequisites.length > 3 && (
										<li className={`text-[11px] !font-mono ${accentText} opacity-60 pl-4`}>
											+{module.prerequisites.length - 3} more
										</li>
									)}
								</ul>
							</div>
						)}

						{/* Footer CTA row */}
						<div className="flex items-center justify-between pt-2 border-t border-white/5">
							<span className="!font-mono text-[10px] tracking-widest uppercase text-gray-600 group-hover:text-gray-300 transition-colors duration-300">
								Open Module
							</span>
							<div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 group-hover:translate-x-1">
								<FiArrowRight className="text-gray-500 group-hover:text-gray-200 text-xs" />
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		);
	}
);

TimelineModuleCard.displayName = "TimelineModuleCard";

export default TimelineModuleCard;