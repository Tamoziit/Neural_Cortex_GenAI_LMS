import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AppNavbar from "../../components/navbars/AppNavbar";
import { DEFAULT_ROLES } from "../../constants/roles";
import { roleColors, roleIcons } from "../../constants/learningPath";
import { FiCode } from "react-icons/fi";
import RoleCard from "../../components/learning-path/RoleCard";
import useGetUserPaths from "../../hooks/useGetUserPaths";
import AssignedPathCard from "../../components/learning-path/AssignedPathCard";

const LearningPath = () => {
	const { getUserPaths, loading } = useGetUserPaths();
	const [userPaths, setUserPaths] = useState<any[]>([]);

	useEffect(() => {
		const fetchPaths = async () => {
			const data = await getUserPaths();
			if (data && Array.isArray(data)) {
				setUserPaths(data);
			}
		};
		fetchPaths();
	}, [getUserPaths]);

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

				<div className="flex items-center justify-center mb-10">
					<div className="h-[1px] bg-white/40 w-[95%]" />
				</div>

				{/* Learning paths */}
				<div className="px-6 lg:px-14 pb-20 relative z-10 flex-1">
					<h1 className="text-secondary text-2xl mb-4">Your Learning Paths</h1>

					{userPaths.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{userPaths.map((path, idx) => (
								<AssignedPathCard
									key={path._id}
									path={path}
									idx={idx}
								/>
							))}
						</div>
					) : (
						<div className="text-gray-400">
							{loading ? "Loading your learning paths..." : "You are not assigned any learning paths yet."}
						</div>
					)}
				</div>

				<div className="flex items-center justify-center mb-10">
					<div className="h-[1px] bg-white/40 w-[95%]" />
				</div>

				{/* Role Content Grid */}
				<div className="px-6 lg:px-14 pb-20 relative z-10 flex-1">
					<h1 className="text-secondary text-2xl mb-4">Choose a Path</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{DEFAULT_ROLES.map((role, idx) => {
							const Icon = roleIcons[role.value as keyof typeof roleIcons] || FiCode;
							const bgGradient = roleColors[role.value as keyof typeof roleColors] || "from-gray-500/20 via-gray-400/5 to-transparent";

							return (
								<RoleCard
									key={role.value}
									role={role}
									idx={idx}
									bgGradient={bgGradient}
									Icon={Icon}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default LearningPath;