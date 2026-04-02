import { useState } from "react";
import { motion } from "framer-motion";
import AppNavbar from "../../components/navbars/AppNavbar";
import HTMLRoadmap from "../../components/recommended-courses/HTMLRoadmap";
import { roadmapModules } from "../../constants/roadmapData";
import ProgressStrip from "../../components/recommended-courses/ProgressStrip";

const RecommendedCourses = () => {
	const [unlockedCount, setUnlockedCount] = useState(1);

	return (
		<>
			<AppNavbar />

			<div className="relative min-h-screen w-full overflow-hidden bg-[#0e0d0d] flex flex-col">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55 }}
					className="px-6 lg:px-14 pt-24 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0"
				>
					<div>
						<h1 className="text-4xl lg:text-5xl text-primary mb-4">Neuron Cortex Recommended courses</h1>
						<p className="text-gray-300 text-lg">Our experts handpicked & curated courses to match your learning goals.</p>
					</div>

					<div className="pointer-events-auto">
						<ProgressStrip
							total={roadmapModules.length}
							unlocked={unlockedCount}
							onUnlock={setUnlockedCount}
						/>
					</div>
				</motion.div>

				{/* Legend */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.35, duration: 0.5 }}
					className="px-6 lg:px-14 pb-4 flex items-center gap-5 text-[11px] font-mono text-white/60 drop-shadow-md shrink-0"
				>
					<span className="flex items-center gap-1.5">
						<span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
						Unlocked
					</span>
					<span className="flex items-center gap-1.5">
						<span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
						Current
					</span>
					<span className="flex items-center gap-1.5">
						<span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
						Locked
					</span>
					<span className="hidden sm:block text-white/40">
						Scroll sideways to explore · Click a pin to inspect
					</span>
				</motion.div>

				{/* SVG Configurable Winding View */}
				<div className="flex-1 w-full px-6 lg:px-14 pb-8">
					<HTMLRoadmap
						unlockedCount={unlockedCount}
						onUnlock={setUnlockedCount}
					/>
				</div>

				{/* Bottom hint */}
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.7 }}
					className="text-center text-[10px] font-mono text-white/40 tracking-widest pb-4 drop-shadow-md shrink-0"
				>
					NEURON CORTEX LLC. · GenAI LEARNING ROADMAP
				</motion.p>
			</div>
		</>
	)
}

export default RecommendedCourses;