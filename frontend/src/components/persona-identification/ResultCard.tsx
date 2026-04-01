import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { levelConfig } from "../../constants/personaIdentification";
import { FiArrowRight } from "react-icons/fi";
import type { ResultCardProps } from "../../types";

const ResultCard = ({ result }: ResultCardProps) => {
	const config = levelConfig[result.level];
	const Icon = config.icon;
	const percentage = Math.round(result.percentage);

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95, y: 24 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
			className="w-full max-w-lg mx-auto"
		>
			{/* Main card */}
			<div
				className={`
                    relative rounded-2xl border glassmorphic p-8 overflow-hidden
                    ${config.border} ${config.glow}
                `}
			>
				{/* Background gradient */}
				<div className={`absolute inset-0 bg-gradient-to-br ${config.color} pointer-events-none`} />

				{/* Large faint background icon */}
				<Icon className="absolute -bottom-6 -right-6 text-[160px] text-white/3 pointer-events-none" />

				<div className="relative z-10 flex flex-col items-center text-center gap-6">
					{/* Icon ring */}
					<motion.div
						initial={{ scale: 0, rotate: -30 }}
						animate={{ scale: 1, rotate: 0 }}
						transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 14 }}
						className={`w-20 h-20 rounded-2xl glassmorphic-2 border ${config.border} flex items-center justify-center`}
					>
						<Icon className={`text-4xl ${config.text}`} />
					</motion.div>

					{/* Level badge */}
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
					>
						<span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold border ${config.badge}`}>
							<span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
							{result.level}
						</span>
					</motion.div>

					{/* Score arc display */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.35 }}
						className="flex flex-col items-center"
					>
						<p className="text-6xl font-bold text-white tabular-nums">{percentage}<span className="text-2xl text-gray-400">%</span></p>
						<p className="text-gray-400 text-sm mt-1 !font-mono">{result.score} out of {result.total} correct</p>
					</motion.div>

					{/* Score bar */}
					<div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
						<motion.div
							className={`h-full rounded-full bg-gradient-to-r ${config.color.replace("/25", "").replace("/5", "")}`}
							style={{ backgroundImage: undefined }}
							initial={{ width: 0 }}
							animate={{ width: `${percentage}%` }}
							transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
						>
							<div className={`w-full h-full ${config.text.replace("text-", "bg-").replace("-400", "-500")} opacity-70`} />
						</motion.div>
					</div>

					{/* Description */}
					<p className="text-gray-300 text-sm leading-relaxed">{config.label}</p>

					{/* CTA */}
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
						className="w-full"
					>
						<Link
							to={`/learning-path/${result.learningPath}`}
							className={`
                                group flex items-center justify-center gap-3 w-full py-3.5 px-6
                                rounded-xl border font-semibold text-sm transition-all duration-300
                                ${config.border} glassmorphic-2
                                hover:${config.glow}
                            `}
						>
							<span className={`${config.text} !font-mono`}>Explore Your Learning Path</span>
							<FiArrowRight className={`${config.text} group-hover:translate-x-1 transition-transform duration-300`} />
						</Link>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

export default ResultCard;