import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { roadmapModules, MODULE_ACCENTS, POSITIONS, CANVAS_WIDTH } from "../../constants/roadmapData";
import PinInfoCard from "./PinInfoCard";
import MapPinModel from "./MapPinModel";
import CrabWalker from "./CrabWalker";
import type { HTMLRoadmapProps, RoadmapPin } from "../../types";
import { FaSearch } from "react-icons/fa";
import Path from "./Path";

const HTMLRoadmap = ({ unlockedCount, onUnlock }: HTMLRoadmapProps) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [selectedPin, setSelectedPin] = useState<RoadmapPin | null>(null);
	const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

	// Auto-scroll to next/current pin when unlockedCount changes
	useEffect(() => {
		if (!scrollContainerRef.current) return;
		const targetIndex = Math.min(unlockedCount, POSITIONS.length - 1);
		const targetX = POSITIONS[targetIndex]?.x || 0;
		const windowWidth = window.innerWidth;
		const scrollOffset = Math.max(0, targetX - windowWidth / 2 + 100);
		scrollContainerRef.current.scrollTo({ left: scrollOffset, behavior: "smooth" });
	}, [unlockedCount]);

	return (
		<div className="relative w-full h-[calc(100vh-100px)] overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black rounded-3xl border border-white/5 shadow-2xl">
			{/* Scrollable Container */}
			<div
				ref={scrollContainerRef}
				className="absolute inset-0 overflow-x-auto overflow-y-hidden hide-scrollbar cursor-grab active:cursor-grabbing"
			>
				<div className="relative h-full min-h-[600px] flex items-center pt-24" style={{ width: CANVAS_WIDTH }}>
					{/* Path SVG */}
					<Path unlockedCount={unlockedCount} />
					
					{/* ── Crab walker (inside scrollable div so coords match) ── */}
					<CrabWalker unlockedCount={unlockedCount} />

					{/* ── 3-D Map Pin Nodes ───────────────────────────────────── */}
					{roadmapModules.map((mod, i) => {
						const pos = POSITIONS[i];
						const isUnlocked = i < unlockedCount;
						const isCurrent = i === unlockedCount - 1; // last unlocked pin
						const isNext    = i === unlockedCount;     // first locked pin (coming up)
						const accent = MODULE_ACCENTS[i % MODULE_ACCENTS.length];
						const isAbove = i % 2 === 0;
						const isHovered = hoveredIdx === i;
						const isSelected = selectedPin?.moduleId === mod.id;

						const pinData: RoadmapPin = {
							moduleId: mod.id,
							moduleTitle: mod.title,
							moduleDescription: mod.description,
							chapters: mod.chapters as any,
							t: i / roadmapModules.length,
							position: [pos.x, pos.y, 0] as [number, number, number],
							unlocked: isUnlocked,
							accentGlow: accent.glow,
							accentRing: accent.ring,
						};

						return (
							<div
								key={mod.id}
								className="absolute"
								style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
							>
								{/* Module label (above or below) */}
								<motion.div
									className={`absolute whitespace-nowrap flex flex-col ${isAbove ? "bottom-full mb-10" : "top-full mt-20"}`}
									style={{ left: "0%", transform: "translateX(-50%)" }}
									initial={{ opacity: 0, y: isAbove ? 20 : -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.2 + i * 0.1 }}
								>
									<div className="flex flex-col items-center">
										<p
											className="text-[10px] uppercase font-mono tracking-[0.2em]"
											style={{ color: isUnlocked ? accent.glow : "#64748b" }}
										>
											{isCurrent ? "Current" : isUnlocked ? "Unlocked" : isNext ? "Next" : "Locked"}
										</p>
										<h3 className="text-lg font-bold text-white mt-1 drop-shadow-lg">{mod.title}</h3>
										<p className="text-xs text-slate-400 mt-1 max-w-[200px] text-center whitespace-normal">
											{mod.description}
										</p>
									</div>
								</motion.div>

								<div
									style={{ position: "relative", zIndex: 20, cursor: "pointer" }}
									onClick={() => setSelectedPin(pinData)}
									onMouseEnter={() => setHoveredIdx(i)}
									onMouseLeave={() => setHoveredIdx(null)}
								>
									{/* "Explore" button on the current (last-unlocked) pin */}
									{isCurrent && (
										<motion.button
											className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-bold font-mono px-2 py-0.5 rounded-full bg-amber-400 text-black shadow-lg z-10 pointer-events-auto cursor-pointer hover:bg-amber-300 transition-colors"
											animate={{ y: [0, -3, 0] }}
											transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
											onClick={(e) => { e.stopPropagation(); setSelectedPin(pinData); }}
										>
											<span className="flex items-center gap-1.5"><FaSearch /> EXPLORE</span>
										</motion.button>
									)}
									{/* Lock icon overlay for locked pins */}
									{!isUnlocked && !isNext && (
										<div
											className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-slate-800 border border-white/20 flex items-center justify-center pointer-events-none z-10"
										>
											<span className="text-sm">🔒</span>
										</div>
									)}
									<MapPinModel
										isUnlocked={isUnlocked}
										isCurrent={isCurrent}
										isNext={isNext}
										isSelected={isSelected}
										accentGlow={accent.glow}
										hovered={isHovered}
									/>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
				<button
					onClick={() =>
						unlockedCount < roadmapModules.length
							? onUnlock(unlockedCount + 1)
							: onUnlock(1)
					}
					className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-mono text-sm transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer"
				>
					<FiCheckCircle className="w-4 h-4" />
					{unlockedCount < roadmapModules.length
						? `Mock Unlock Chapter ${unlockedCount + 1}`
						: "Reset Progress"}
				</button>
			</div>

			<div className="absolute inset-0 pointer-events-none z-40">
				<PinInfoCard
					pin={selectedPin}
					onClose={() => setSelectedPin(null)}
				/>
			</div>

			<style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
		</div>
	);
};

export default HTMLRoadmap;