import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";
import ChapterRow from "./ChapterRow";
import { roleAccent, fallbackAccent } from "../../constants/learningPath";
import type { ChaptersTableProps } from "../../types";

const ChaptersTable = ({ chapters, role }: ChaptersTableProps) => {
	const accent = roleAccent[role] ?? fallbackAccent;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
			className="flex flex-col gap-4"
		>
			{/* Section header */}
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<FiBookOpen className={`${accent.text} text-lg`} />
					<span className="text-white font-semibold text-lg">Contents</span>
					<span className="!font-mono text-xs text-gray-600">
						{chapters.length} chapters
					</span>
				</div>


			</div>

			{/* Thin divider */}
			<div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

			{/* Chapter rows */}
			<div className="flex flex-col gap-1.5">
				{chapters.map((chapter, i) => (
					<ChapterRow
						key={chapter._id}
						chapter={chapter}
						index={i}
						role={role}
						total={chapters.length}
					/>
				))}
			</div>
		</motion.div>
	);
};

export default ChaptersTable;
