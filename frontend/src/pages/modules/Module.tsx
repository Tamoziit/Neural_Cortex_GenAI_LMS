import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import AppNavbar from "../../components/navbars/AppNavbar";
import ModuleHero from "../../components/modules/ModuleHero";
import PrerequisitesList from "../../components/modules/PrerequisitesList";
import ChaptersTable from "../../components/modules/ChaptersTable";
import Spinner from "../../components/Spinner";
import useGetModule from "../../hooks/useGetModule";
import { roleAccent, fallbackAccent } from "../../constants/learningPath";
import type { ModuleData } from "../../types";

const Module = () => {
	const { id } = useParams<{ id: string }>();
	const { loading, getModule } = useGetModule();
	const [data, setData] = useState<ModuleData | null>(null);

	useEffect(() => {
		if (!id) return;
		(async () => {
			const result = await getModule(id);
			setData(result);
		})();
	}, [id]);

	const accent = data ? (roleAccent[data.role] ?? fallbackAccent) : fallbackAccent;

	return (
		<>
			<AppNavbar />

			<div className="relative min-h-screen w-full overflow-hidden flex flex-col">

				{/* Ambient background glows */}
				<div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-cyan-900/15 blur-[130px] rounded-full pointer-events-none" />
				<div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-purple-950/20 blur-[120px] rounded-full pointer-events-none" />

				{loading ? (
					<div className="flex-1 flex items-center justify-center min-h-screen">
						<Spinner />
					</div>
				) : !data ? (
					<div className="flex-1 flex items-center justify-center min-h-screen">
						<p className="text-gray-500 !font-mono text-sm">Module not found.</p>
					</div>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.4 }}
						className="flex flex-col flex-1"
					>
						{/* Hero */}
						<ModuleHero data={data} />

						{/* Body — two-column on large screens */}
						<div className="flex-1 px-6 lg:px-14 pb-16 z-10 relative">
							<div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 max-w-7xl mx-auto">

								{/* Left: Chapters table-of-contents */}
								<ChaptersTable
									chapters={data.chapters}
									role={data.role}
								/>

								{/* Right: Prerequisites + module meta */}
								<div className="flex flex-col gap-6">
									<PrerequisitesList
										prerequisites={data.prerequisites}
										role={data.role}
									/>

									{/* Module meta card */}
									<motion.div
										initial={{ opacity: 0, y: 16 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: 0.3 }}
										className="glassmorphic rounded-2xl p-5 flex flex-col gap-4"
									>
										<span className={`!font-mono text-[10px] tracking-[0.2em] uppercase ${accent.text}`}>
											Module Info
										</span>
										<div className="h-px bg-white/5" />
										<dl className="flex flex-col gap-3">
											{[
												{ label: "Role", value: data.role.replace(/_/g, " ") },
												{ label: "Phase", value: `Phase ${data.phase}` },
												{ label: "Level", value: data.level },
												{ label: "Chapters", value: `${data.chapters.length}` },
											].map(({ label, value }) => (
												<div key={label} className="flex items-baseline justify-between gap-2">
													<dt className="!font-mono text-[10px] text-gray-600 uppercase tracking-widest shrink-0">{label}</dt>
													<div className="flex-1 border-b border-dotted border-white/5 mx-2" />
													<dd className="text-xs text-gray-300 !font-mono shrink-0">{value}</dd>
												</div>
											))}
										</dl>
									</motion.div>
								</div>
							</div>
						</div>
					</motion.div>
				)}
			</div>
		</>
	);
};

export default Module;