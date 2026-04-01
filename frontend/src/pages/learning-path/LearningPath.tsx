import { motion } from "framer-motion";
import AppNavbar from "../../components/navbars/AppNavbar";
import { DEFAULT_ROLES } from "../../constants/roles";
import { roleColors, roleIcons } from "../../constants/learningPath";
import { FiArrowRight, FiCode } from "react-icons/fi";
import { Link } from "react-router-dom";

const LearningPath = () => {
	return (
		<>
			<AppNavbar />

			<div className="relative min-h-screen w-full overflow-hidden flex flex-col">
				<div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />

				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55 }}
					className="px-6 lg:px-14 pt-28 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0 relative z-10"
				>
					<div>
						<h1 className="text-4xl lg:text-5xl text-primary mb-4">Learning Path</h1>
						<p className="text-gray-300 text-lg">Navigate your GenAI mastery journey — explore your roadmap.</p>
					</div>
				</motion.div>

				{/* Main Content Grid */}
				<div className="px-6 lg:px-14 pb-20 relative z-10 flex-1">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{DEFAULT_ROLES.map((role, idx) => {
							const Icon = roleIcons[role.value] || FiCode;
							const bgGradient = roleColors[role.value] || "from-gray-500/20 via-gray-400/5 to-transparent";

							return (
								<Link
									key={role.value}
									to={`/persona-identification/${role.value}`}
									className="h-full"
								>
									<motion.div
										key={role.value}
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
													<div className="h-12 w-12 rounded-xl glassmorphic-2 flex items-center justify-center mb-6 text-cyan-400 group-hover:text-cyan-300 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-lg shadow-black/20">
														<Icon className="text-2xl" />
													</div>
													<h3 className="text-xl font-bold text-gray-100 group-hover:text-white transition-colors">
														{role.label}
													</h3>
												</div>

												{/* Bottom section: Action */}
												<div className="pt-12 relative z-20 flex items-center justify-between text-sm font-medium">
													<span className="text-gray-500 group-hover:text-cyan-400 transition-colors duration-300 delay-100 font-mono tracking-wider text-xs">
														EXPLORE ROLE
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
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default LearningPath;