import { motion } from "framer-motion";
import AppNavbar from "../../components/navbars/AppNavbar";
import { Link } from "react-router-dom";
import useInstitutionRequests from "../../hooks/useInstitutionRequests";
import useVerifyUser from "../../hooks/useVerifyUser";

const VerifyUsers = () => {
	const { loading: fetching, requests, setRequests } = useInstitutionRequests();
	const { loading: verifying, verifyUser } = useVerifyUser();

	const handleVerify = async (userId: string) => {
		const success = await verifyUser(userId);
		if (success) {
			setRequests((prev) => prev.filter((req) => req._id !== userId));
		}
	};

	return (
		<>
			<AppNavbar />

			<div className="relative pt-32 pb-16 px-6 lg:px-16 min-h-screen">
				<div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-8">
					<motion.div 
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
					>
						<div>
							<h1 className="text-4xl lg:text-5xl font-serif text-white mb-2">Pending Requests</h1>
							<p className="text-gray-400 text-lg">Review and verify user affiliation requests.</p>
						</div>
						
						<Link 
							to="/home"
							className="px-6 py-2.5 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-all text-sm"
						>
							Back to Dashboard
						</Link>
					</motion.div>

					{fetching ? (
						<div className="flex justify-center items-center py-20">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
						</div>
					) : (
						<div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
							{requests.length === 0 ? (
								<div className="flex flex-col items-center justify-center py-20 text-center px-4">
									<div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
										<svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
										</svg>
									</div>
									<h3 className="text-xl font-medium text-white mb-2">No pending requests</h3>
									<p className="text-gray-400 max-w-sm">All user affiliation requests have been verified. Check back later for new requests.</p>
								</div>
							) : (
								<div className="flex flex-col divide-y divide-white/5">
									{requests.map((req, idx) => (
										<motion.div 
											key={req._id}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3, delay: idx * 0.05 }}
											className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:bg-white/[0.02] transition-colors"
										>
											<div className="flex items-center gap-4">
												<div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
													{req.fullName.substring(0, 2).toUpperCase()}
												</div>
												<div>
													<h3 className="text-lg font-medium text-white">{req.fullName}</h3>
													<div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
														<span className="font-mono">{req.username}</span>
														<span>&bull;</span>
														<span>{req.email}</span>
														<span>&bull;</span>
														<span className="uppercase text-xs tracking-wider">{req.gender === "M" ? "Male" : req.gender === "F" ? "Female" : "Other"}</span>
													</div>
												</div>
											</div>
											
											<button
												onClick={() => handleVerify(req._id)}
												disabled={verifying}
												className="w-full sm:w-auto !p-2 btn-secondary !text-sm !rounded-full !border !border-emerald-400 !text-emerald-400 hover:!bg-emerald-500 hover:!text-gray-800 flex justify-center shrink-0"
											>
												{verifying ? "Verifying..." : "Approve Affiliation"}
											</button>
										</motion.div>
									))}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default VerifyUsers;
