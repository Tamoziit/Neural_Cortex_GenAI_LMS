import { motion } from "framer-motion";
import AppNavbar from "../../components/navbars/AppNavbar";
import { Link } from "react-router-dom";
import { mockGroups } from "../../constants/studyGroups";
import toast from "react-hot-toast";

const ManageStudyGroups = () => {
	return (
		<>
			<AppNavbar />

			<div className="relative pt-32 pb-16 px-6 lg:px-16 min-h-screen">
				<div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat">
					<div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
				</div>

				<div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-10">
					<motion.div 
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="flex flex-col md:flex-row justify-between items-center gap-6"
					>
						<div>
							<h1 className="text-4xl lg:text-5xl font-serif text-primary mb-2">Manage Study Groups</h1>
							<p className="text-gray-300 text-lg">Monitor progress and manage learning roadmaps.</p>
						</div>
						
						<Link 
							to="/study-groups/create"
							className="!px-6 !py-2 btn-secondary !text-sm"
						>
							+ Create New Group
						</Link>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{mockGroups.map((group, idx) => (
							<Link key={group.id} to={`/study-groups/${group.id}`}>
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: idx * 0.1 }}
									className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all flex flex-col gap-4 cursor-pointer"
								>
									<div className="flex justify-between items-start gap-4">
										<h3 className="text-xl font-semibold text-white">{group.name}</h3>
										<span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80 whitespace-nowrap">
											{group.members} Members
										</span>
									</div>
									
									<p className="text-secondary text-sm font-mono">{group.domain}</p>
									
									<div 
										className="flex items-center gap-2 bg-black/30 w-fit px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 transition-colors mt-2"
										onClick={(e) => {
											e.preventDefault();
											navigator.clipboard.writeText(group.joinCode);
											toast.success("Join code copied!");
										}}
									>
										<span className="text-xs text-gray-400 !font-mono">Join Code:</span>
										<span className="text-xs tracking-widest text-white !font-mono">{group.joinCode}</span>
										<svg className="w-3.5 h-3.5 text-gray-400 ml-1 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
										</svg>
									</div>
									
									<div className="mt-auto pt-4 border-t border-white/10">
										<div className="flex justify-between items-center mb-2">
											<span className="text-xs text-gray-400">Roadmap Progress</span>
											<span className="text-xs font-semibold text-primary">{group.progress}%</span>
										</div>
										<div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
											<div 
												className="h-full bg-cyan-400 rounded-full" 
												style={{ width: `${group.progress}%` }}
											/>
										</div>
									</div>
								</motion.div>
							</Link>
						))}

						{/* Add New Group Card */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: mockGroups.length * 0.1 }}
						>
							<Link
								to="/study-groups/create"
								className="h-full border-2 border-dashed border-white/20 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all text-gray-400 hover:text-primary group min-h-[220px]"
							>
								<div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-primary/10 flex items-center justify-center text-3xl mb-2 transition-all">
									+
								</div>
								<h3 className="text-lg font-medium">Create New Group</h3>
							</Link>
						</motion.div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ManageStudyGroups;