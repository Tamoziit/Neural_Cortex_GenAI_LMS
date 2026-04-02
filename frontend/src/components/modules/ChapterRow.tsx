import { motion } from "framer-motion";
import { FiClock, FiExternalLink, FiCode } from "react-icons/fi";
import { roleAccent, fallbackAccent } from "../../constants/learningPath";
import type { ChapterRowProps } from "../../types";

const ChapterRow = ({ chapter, index, role, total }: ChapterRowProps) => {
	const accent = roleAccent[role] ?? fallbackAccent;
	const chapterNum = String(index + 1).padStart(2, "0");

	return (
		<motion.a
			href={chapter.url}
			target="_blank"
			rel="noopener noreferrer"
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: 0.25 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
			className="group relative flex items-center gap-5 px-5 py-4 rounded-xl border border-white/5 hover:border-white/15 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 cursor-pointer"
		>
			{/* Subtle left accent line on hover */}
			<div
				className={`absolute left-0 top-2 bottom-2 w-[2px] rounded-full ${accent.color} opacity-0 group-hover:opacity-60 transition-opacity duration-400`}
			/>

			{/* Chapter number */}
			<div className="shrink-0 w-10 text-right">
				<span className={`!font-mono text-sm font-bold ${accent.text} opacity-40 group-hover:opacity-80 transition-opacity duration-300`}>
					{chapterNum}
				</span>
			</div>

			{/* Decorative dot-line connector */}
			<div className="shrink-0 flex flex-col items-center gap-0.5 self-stretch py-1">
				<div className={`w-1.5 h-1.5 rounded-full ${accent.color} opacity-30 group-hover:opacity-70 transition-opacity duration-300`} />
				{index < total - 1 && (
					<div className="flex-1 w-px bg-white/5 group-hover:bg-white/10 transition-colors duration-300" />
				)}
			</div>

			{/* Main content */}
			<div className="flex-1 min-w-0">
				<p className="text-sm lg:text-base font-medium text-gray-300 group-hover:text-white transition-colors duration-300 leading-snug truncate">
					{chapter.title}
				</p>
				<div className="flex items-center gap-3 mt-1.5 flex-wrap">
					{chapter.azureCode && (
						<span className="flex items-center gap-1 !font-mono text-[10px] text-gray-600 group-hover:text-gray-500 transition-colors duration-300">
							<FiCode className="text-[9px]" />
							{chapter.azureCode}
						</span>
					)}
					<span className={`!font-mono text-[10px] uppercase tracking-widest ${accent.text} opacity-0 group-hover:opacity-50 transition-opacity duration-300`}>
						{chapter.type}
					</span>
				</div>
			</div>

			{/* Right: duration + Open Studio button */}
			<div className="shrink-0 flex items-center gap-4">
				<span className="hidden sm:flex items-center gap-1.5 !font-mono text-xs text-gray-600 group-hover:text-gray-400 transition-colors duration-300">
					<FiClock className="text-[11px]" />
					{chapter.duration}
				</span>
				<span
					className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-semibold !font-mono tracking-wider transition-all duration-300
						border-white/5 text-gray-600 bg-white/0
						group-hover:border-white/15 group-hover:bg-white/5 group-hover:text-gray-200
					`}
				>
					Open Studio
					<FiExternalLink className="text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
				</span>
				{/* Mobile: icon only */}
				<span className="flex md:hidden items-center justify-center w-7 h-7 rounded-full border border-white/5 group-hover:border-white/15 group-hover:bg-white/5 transition-all duration-300">
					<FiExternalLink className="text-gray-600 group-hover:text-gray-200 text-xs transition-colors duration-300" />
				</span>
			</div>
		</motion.a>
	);
};

export default ChapterRow;