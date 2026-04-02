import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { roleAccent, fallbackAccent } from "../../constants/learningPath";

interface PrerequisitesListProps {
	prerequisites: string[];
	role: string;
}

const PrerequisitesList = ({ prerequisites, role }: PrerequisitesListProps) => {
	const accent = roleAccent[role] ?? fallbackAccent;

	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
			className="glassmorphic rounded-2xl p-6 flex flex-col gap-4"
		>
			<div className="flex items-center gap-3">
				<span className={`!font-mono text-[10px] tracking-[0.2em] uppercase ${accent.text}`}>
					Prerequisites
				</span>
				<div className="flex-1 h-px bg-white/5" />
				<span className="!font-mono text-[10px] text-gray-600">{prerequisites.length} items</span>
			</div>

			<ul className="flex flex-col gap-3">
				{prerequisites.map((pre, i) => (
					<motion.li
						key={i}
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.35, delay: 0.2 + i * 0.07 }}
						className="group flex items-start gap-3"
					>
						<FiCheckCircle
							className={`shrink-0 mt-0.5 text-sm ${accent.text} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
						/>
						<span className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
							{pre}
						</span>
					</motion.li>
				))}
			</ul>
		</motion.div>
	);
};

export default PrerequisitesList;
