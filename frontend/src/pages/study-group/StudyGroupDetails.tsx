import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import AppNavbar from "../../components/navbars/AppNavbar";
import { mockGroups } from "../../constants/studyGroups";
import { useState } from "react";
import toast from "react-hot-toast";
import type { Module } from "../../types";
import { FaClock } from "react-icons/fa";

const categoryColors = {
	Beginner: "text-green-400 bg-green-400/10 border-green-400/20",
	Intermediate: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
	Advanced: "text-red-400 bg-red-400/10 border-red-400/20"
};

const StudyGroupDetails = () => {
	const { id } = useParams<{ id: string }>();
	const group = mockGroups.find(g => g.id.toString() === id);
	const [activeCategory, setActiveCategory] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All");

	if (!group) {
		return (
			<>
				<AppNavbar />
				<div className="flex pt-32 justify-center items-center h-screen text-white">
					<h2 className="text-2xl">Study Group Not Found</h2>
				</div>
			</>
		);
	}

	const filteredModules = group.modules.map(m => {
		const matchedChapters = activeCategory === "All" 
			? m.chapters 
			: m.chapters.filter(c => c.level === activeCategory);
		
		return { ...m, chapters: matchedChapters };
	}).filter(m => m.chapters.length > 0);

	return (
		<>
			<AppNavbar />

			<div className="relative pt-24 lg:pt-32 pb-16 px-6 lg:px-16 min-h-screen">
				<div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-10">
					{/* Header / Hero */}
					<motion.div 
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<Link to="/manage-study-groups" className="text-gray-400 hover:text-white mb-6 inline-flex items-center text-sm font-medium transition-colors">
							&larr; Back to Groups
						</Link>
						<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8 mt-4">
							<div className="flex flex-col gap-2">
								<h1 className="text-4xl lg:text-5xl font-serif text-white">{group.name}</h1>
								<div className="flex items-center gap-4">
									<p className="text-primary text-lg font-mono tracking-wide">{group.domain}</p>
									<div 
										className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-all cursor-pointer group"
										onClick={() => {
											navigator.clipboard.writeText(group.joinCode);
											toast.success("Join code copied to clipboard!");
										}}
										title="Click to copy join code"
									>
										<span className="text-xs text-gray-400 font-mono tracking-widest uppercase">Code</span>
										<span className="text-sm font-bold text-white tracking-widest !font-mono">{group.joinCode}</span>
										<svg className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
										</svg>
									</div>
								</div>
							</div>
							
							<div className="flex flex-col items-end gap-2 bg-white/5 border border-white/10 p-4 rounded-xl">
								<span className="text-sm text-gray-400 uppercase tracking-wider font-mono">Progress</span>
								<div className="flex items-center gap-4">
									<div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
										<div className="h-full bg-cyan-400 rounded-full" style={{ width: `${group.progress}%` }} />
									</div>
									<span className="text-xl font-bold text-primary !font-mono">{group.progress}%</span>
								</div>
								<span className="text-xs text-gray-500">{group.members} Members Enrolled</span>
							</div>
						</div>
					</motion.div>

					{/* Curriculum / Modules */}
					<div className="flex flex-col gap-6">
						<div className="flex flex-wrap items-center justify-between gap-4">
							<h2 className="text-2xl font-serif text-white">Curriculum Modules</h2>
							
							{/* Category Filters */}
							<div className="flex gap-2">
								{["All", "Beginner", "Intermediate", "Advanced"].map((cat) => (
									<button
										key={cat}
										onClick={() => setActiveCategory(cat as typeof activeCategory)}
										className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
											activeCategory === cat 
												? "bg-cyan-400 hover:bg-cyan-300 text-black" 
												: "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
										}`}
									>
										{cat}
									</button>
								))}
							</div>
						</div>

						<div className="flex flex-col gap-6">
							{filteredModules.map((module: Module, moduleIdx: number) => (
								<motion.div
									key={module.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: moduleIdx * 0.05 }}
									className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
								>
									{/* Module Header */}
									<div className="p-6 border-b border-white/5 bg-white/[0.02] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
										<div>
											<h3 className="text-xl font-semibold text-white">
												<span className="text-gray-500 mr-2 font-mono">{moduleIdx + 1}.</span> 
												{module.title}
											</h3>
										</div>
										<span className="text-sm text-gray-400 font-mono bg-black/30 px-3 py-1 rounded-lg">
											{module.chapters.length} Chapters
										</span>
									</div>

									{/* Chapters List */}
									<div className="flex flex-col">
										{module.chapters.map((chapter, chapIdx) => (
											<div key={chapter.id} className="p-4 px-6 border-b border-white/5 hover:bg-white/5 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
												<div className="flex items-start gap-4">
													<div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-400 shrink-0 !font-mono mt-0.5">
														{chapIdx + 1}
													</div>
													<div>
														<div className="flex items-center gap-2">
															<h4 className="text-base text-gray-200 font-medium">{chapter.title}</h4>
															<span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${categoryColors[chapter.level]}`}>
																{chapter.level}
															</span>
														</div>
														<div className="flex items-center gap-3 mt-1 cursor-default">
															<span className="text-xs text-gray-400 flex items-center gap-1 !font-mono">
																<FaClock />
																{chapter.duration}
															</span>
														</div>
													</div>
												</div>
												
												{/* Assigned Individuals */}
												{chapter.assignedTo && chapter.assignedTo.length > 0 && (
													<div className="flex items-center xl:min-w-[200px] justify-end">
														<div className="flex -space-x-2 mr-3 pointer-events-none">
															{chapter.assignedTo.slice(0, 3).map((person, i) => (
																<div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-[#12111E] flex items-center justify-center text-[10px] text-white font-bold" title={person}>
																	{person.substring(0, 2).toUpperCase()}
																</div>
															))}
															{chapter.assignedTo.length > 3 && (
																<div className="w-8 h-8 rounded-full bg-white/20 border-2 border-[#12111E] flex items-center justify-center text-[10px] text-white font-bold backdrop-blur-sm">
																	+{chapter.assignedTo.length - 3}
																</div>
															)}
														</div>
														<span className="text-xs text-gray-500 font-mono hidden md:block">
															{chapter.assignedTo.length} assigned
														</span>
													</div>
												)}
											</div>
										))}
									</div>
								</motion.div>
							))}
							
							{filteredModules.length === 0 && (
								<div className="text-center py-12 text-gray-500 border border-dashed border-white/10 rounded-2xl">
									No modules found for this category.
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default StudyGroupDetails;