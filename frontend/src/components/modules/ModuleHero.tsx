import { motion } from "framer-motion";
import { FiArrowLeft, FiBookOpen, FiClock, FiLayers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { levelBadge, roleAccent, fallbackAccent } from "../../constants/learningPath";
import type { ModuleData } from "../../types";

interface ModuleHeroProps {
	data: ModuleData;
}

const ModuleHero = ({ data }: ModuleHeroProps) => {
	const navigate = useNavigate();
	const accent = roleAccent[data.role] ?? fallbackAccent;

	const totalDuration = data.chapters.reduce((acc, ch) => {
		// parse durations like "37 min", "1 hr 33 min"
		const hrMatch = ch.duration.match(/(\d+)\s*hr/);
		const minMatch = ch.duration.match(/(\d+)\s*min/);
		const hrs = hrMatch ? parseInt(hrMatch[1]) : 0;
		const mins = minMatch ? parseInt(minMatch[1]) : 0;
		return acc + hrs * 60 + mins;
	}, 0);

	const totalHrs = Math.floor(totalDuration / 60);
	const totalMins = totalDuration % 60;
	const totalStr = totalHrs > 0 ? `${totalHrs} hr${totalHrs > 1 ? "s" : ""} ${totalMins > 0 ? `${totalMins} min` : ""}`.trim() : `${totalMins} min`;

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
			className="relative px-6 lg:px-14 pt-28 pb-10 z-10"
		>
			{/* Back button */}
			<button
				onClick={() => navigate(-1)}
				className="group flex items-center gap-2 mb-8 text-sm text-gray-500 hover:text-gray-200 transition-colors duration-300 cursor-pointer"
			>
				<FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
				<span className="!font-mono tracking-widest uppercase text-xs">Back</span>
			</button>

			<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
				{/* Left — title block */}
				<div className="flex flex-col gap-3 max-w-2xl">
					{/* Role + Phase pill row */}
					<div className="flex items-center gap-3 flex-wrap">
						<span className={`!font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full border ${accent.border} ${accent.text} bg-white/5`}>
							{data.role.replace(/_/g, " ")}
						</span>
						<span className="!font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-white/10 text-gray-500">
							Phase {data.phase}
						</span>
						<span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold !font-mono ${levelBadge[data.level] ?? ""}`}>
							<span className="w-1 h-1 rounded-full bg-current" />
							{data.level}
						</span>
					</div>

					{/* Title */}
					<h1 className="text-3xl lg:text-5xl text-primary leading-tight">{data.title}</h1>

					{/* Meta strip */}
					<div className="flex items-center gap-5 mt-1 flex-wrap">
						<span className="flex items-center gap-1.5 text-sm text-gray-400 !font-mono">
							<FiBookOpen className={`${accent.text} text-base`} />
							{data.chapters.length} Chapters
						</span>
						<span className="flex items-center gap-1.5 text-sm text-gray-400 !font-mono">
							<FiClock className={`${accent.text} text-base`} />
							{totalStr} total
						</span>
						<span className="flex items-center gap-1.5 text-sm text-gray-400 !font-mono">
							<FiLayers className={`${accent.text} text-base`} />
							{data.prerequisites.length} Prerequisites
						</span>
					</div>
				</div>
			</div>

			{/* Decorative bottom divider */}
			<div className={`mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent`} />
		</motion.div>
	);
};

export default ModuleHero;
