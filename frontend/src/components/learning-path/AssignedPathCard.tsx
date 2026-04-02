import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";
import { DEFAULT_ROLES } from "../../constants/roles";
import { roleColors, roleIcons, levelBadge } from "../../constants/learningPath";
import type { AssignedPathCardProps } from "../../types";

const AssignedPathCard = ({ path, idx }: AssignedPathCardProps) => {
	const roleConfig = DEFAULT_ROLES.find(r => r.value === path.role) || { value: path.role, label: path.role.replace(/_/g, " ") };
	const Icon = roleIcons[roleConfig.value as keyof typeof roleIcons] || FiBookOpen;
	const bgGradient = roleColors[roleConfig.value as keyof typeof roleColors] || "from-gray-500/20 via-gray-400/5 to-transparent";

	return (
		<Link to={`/learning-path/${path._id}`} className="h-full block">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: idx * 0.05 + 0.2 }}
				whileHover={{ y: -5 }}
				className="group cursor-pointer h-full"
			>
				<div className="relative h-full glassmorphic rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.15)] group-hover:border-white/30">

					{/* Animated Background Gradients & Accents */}
					<div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${bgGradient} opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

					{/* Inner Content */}
					<div className="relative h-full w-full p-6 flex flex-col justify-between z-10">

						{/* Top section: Icon & Title */}
						<div className="relative z-20">
							<div className="flex justify-between items-start mb-6">
								<div className="h-12 w-12 rounded-xl glassmorphic-2 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-lg shadow-black/20">
									<Icon className="text-2xl" />
								</div>
								<span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold !font-mono ${levelBadge[path.level as keyof typeof levelBadge] || 'text-gray-300 border-gray-600 bg-gray-500/10'}`}>
									<span className="w-1 h-1 rounded-full bg-current" />
									{path.level}
								</span>
							</div>
							<h3 className="text-xl font-bold text-gray-100 group-hover:text-white transition-colors mb-2">
								{roleConfig.label}
							</h3>
							<p className="text-sm text-gray-400 flex items-center gap-1.5 font-mono">
								<span className="text-cyan-400/80">{path.moduleIds?.length || 0}</span> Modules
							</p>
						</div>

						{/* Bottom section: Action */}
						<div className="pt-10 relative z-20 flex items-center justify-between text-sm font-medium">
							<span className="text-gray-500 group-hover:text-cyan-400 transition-colors duration-300 delay-100 font-mono tracking-wider text-xs uppercase">
								Continue Learning
							</span>
							<div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 transition-all duration-300 group-hover:translate-x-1 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.2)]">
								<FiArrowRight className="text-gray-500 group-hover:text-cyan-400" />
							</div>
						</div>

						{/* Large faint background icon */}
						<Icon className="absolute -bottom-4 -right-4 text-[100px] text-white/5 group-hover:text-white/10 group-hover:rotate-12 transition-all duration-700 pointer-events-none" />
					</div>
				</div>
			</motion.div>
		</Link>
	);
};

export default AssignedPathCard;