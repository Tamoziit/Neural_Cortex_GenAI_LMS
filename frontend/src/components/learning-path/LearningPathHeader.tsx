import { motion } from "framer-motion";
import { FiLayers, FiUser, FiAward } from "react-icons/fi";
import { DEFAULT_ROLES } from "../../constants/roles";
import { roleIcons, roleColors, levelColors } from "../../constants/learningPath";
import { FiCode } from "react-icons/fi";
import type { LearningPathHeaderProps } from "../../types";

const LearningPathHeader = ({ data, accentText }: LearningPathHeaderProps) => {
	const roleData = DEFAULT_ROLES.find((r) => r.value === data.role);
	const Icon = roleIcons[data.role] || FiCode;
	const bgGradient = roleColors[data.role] || "from-cyan-500/20 via-cyan-400/5 to-transparent";

	const stats = [
		{ icon: FiLayers, label: "Modules", value: data.moduleIds.length },
		{ icon: FiAward, label: "Level", value: data.level },
		{ icon: FiUser, label: "Type", value: "Learning Path" },
	];

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.55 }}
			className="relative px-6 lg:px-14 pt-28 pb-10"
		>
			{/* Ambient glow */}
			<div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-br ${bgGradient} blur-[120px] opacity-40 pointer-events-none rounded-full`} />

			<div className="relative z-10 max-w-4xl mx-auto">
				{/* Role chip */}
				<div className="flex items-center gap-3 mb-5">
					<div className={`w-10 h-10 rounded-xl glassmorphic-2 flex items-center justify-center ${accentText} shrink-0`}>
						<Icon className="text-lg" />
					</div>
					<span className={`!font-mono text-xs tracking-[0.18em] uppercase ${accentText} opacity-80`}>
						{roleData?.label ?? data.role}
					</span>
				</div>

				<h1 className="text-primary text-3xl lg:text-5xl mb-3">Your Roadmap</h1>
				<p className="text-gray-400 text-base mb-8 max-w-xl">
					Follow the phases in order — each module builds on the last.
					Click any card to start learning.
				</p>

				{/* Stats row */}
				<div className="flex flex-wrap items-center gap-3">
					{stats.map(({ icon: StatIcon, label, value }) => (
						<div key={label} className="glassmorphic flex items-center gap-2.5 px-4 py-2.5 rounded-xl">
							<StatIcon className={`${accentText} text-sm`} />
							<span className="text-gray-500 text-xs !font-mono tracking-wide">{label}</span>
							<span className={`text-sm font-semibold ${value === data.level ? levelColors[data.level as keyof typeof levelColors] : "text-white"}`}>
								{value}
							</span>
						</div>
					))}
				</div>
			</div>
		</motion.div>
	);
};

export default LearningPathHeader;
