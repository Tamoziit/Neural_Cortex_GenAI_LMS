import { motion, AnimatePresence } from "framer-motion";
import type { PinInfoCardProps } from "../../types";
import { LEVEL_COLORS } from "../../constants/roadmapData";

const PinInfoCard = ({ pin, onClose }: PinInfoCardProps) => {
	return (
		<AnimatePresence>
			{pin && (
				<motion.div
					key={pin.moduleId}
					initial={{ opacity: 0, x: 40, scale: 0.95 }}
					animate={{ opacity: 1, x: 0, scale: 1 }}
					exit={{ opacity: 0, x: 40, scale: 0.95 }}
					transition={{ type: "spring", stiffness: 320, damping: 28 }}
					className="absolute top-28 right-6 w-80 z-30 pointer-events-auto"
				>
					<div
						className="rounded-2xl border border-white/15 bg-black/70 backdrop-blur-2xl shadow-2xl overflow-hidden"
						style={{ boxShadow: `0 0 40px ${pin.accentGlow}40` }}
					>
						{/* Header */}
						<div
							className="px-5 py-4 border-b border-white/10"
							style={{
								background: `linear-gradient(135deg, ${pin.accentGlow}${pin.unlocked ? "28" : "12"} 0%, transparent 100%)`,
							}}
						>
							<div className="flex items-start justify-between gap-2">
								<div>
									<p className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">
										Module
									</p>
									<h3 className="text-base font-bold text-white leading-tight">
										{pin.moduleTitle}
									</h3>
									<p className="text-xs text-white/50 mt-1">{pin.moduleDescription}</p>
								</div>

								{/* Status badge */}
								<span
									className={`shrink-0 mt-0.5 text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full border ${pin.unlocked
											? "text-cyan-300 border-cyan-400/40 bg-cyan-400/10"
											: "text-slate-400 border-slate-500/40 bg-slate-500/10"
										}`}
								>
									{pin.unlocked ? "✓ Unlocked" : "🔒 Locked"}
								</span>
							</div>
						</div>

						{/* Locked overlay notice */}
						{!pin.unlocked && (
							<div className="px-5 pt-3 pb-1">
								<div className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-[11px] text-white/40 font-mono text-center">
									Complete previous modules to unlock
								</div>
							</div>
						)}

						{/* Chapter list */}
						<ul className={`px-5 py-3 space-y-2 ${!pin.unlocked ? "opacity-40 pointer-events-none select-none" : ""}`}>
							{pin.chapters.map((ch) => (
								<li
									key={ch.id}
									className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 bg-white/5 border border-white/[0.08] hover:bg-white/10 transition-colors"
								>
									<span className="text-sm text-white/80 truncate">{ch.title}</span>
									<div className="flex items-center gap-1.5 shrink-0">
										<span className="text-[10px] text-white/35 font-mono">{ch.duration}</span>
										<span
											className={`text-[9px] font-semibold font-mono border rounded-full px-1.5 py-px ${LEVEL_COLORS[ch.level]}`}
										>
											{ch.level.slice(0, 3).toUpperCase()}
										</span>
									</div>
								</li>
							))}
						</ul>

						{/* Footer */}
						<div className="px-5 pb-4">
							<button
								onClick={onClose}
								className="w-full text-sm font-semibold font-mono py-2 rounded-lg border border-white/15 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer"
							>
								Close
							</button>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default PinInfoCard;