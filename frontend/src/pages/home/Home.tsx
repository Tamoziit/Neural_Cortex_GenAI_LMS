import Footer from "../../components/Footer";
import CTASection from "../../components/home/CTASection";
import HeroSection from "../../components/home/HeroSection";
import Contact from "../../components/landing/Contact";
import LearningRoadmap from "../../components/landing/LearningRoadmap";
import AppNavbar from "../../components/navbars/AppNavbar";
import { CTA_SECTIONS } from "../../constants/CTA";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
	const { authUser, authInstitution } = useAuthContext();

	const isLoggedIn = !!(authUser || authInstitution);
	const userName = authUser ? authUser.fullName : authInstitution?.name;

	if ((!authUser && !authInstitution) || !userName) {
		return;
	}

	return (
		<>
			<AppNavbar />

			<HeroSection userName={userName} showScrollHint={isLoggedIn} />

			{isLoggedIn && (
				<div className="w-full">
					{CTA_SECTIONS.map((section) => (
						<CTASection key={section.step} {...section} />
					))}
				</div>
			)}

				{/* ── New Study Group Sections ── */}
				{(authUser || authInstitution) && (
					<div className="relative z-10 w-full max-w-6xl mt-16 md:mt-24 flex flex-col gap-12 mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
							{/* Verify Users Card (Institution Only) */}
							{authInstitution && (
								<Link to="/verify-users">
									<motion.div
										initial={{ opacity: 0, y: 30 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, amount: 0.2 }}
										transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
										className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm cursor-pointer"
									>
										<div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
										<div className="relative z-10 flex flex-col h-full justify-between">
											<div>
												<div className="w-14 h-14 rounded-2xl bg-cyan-400/20 flex items-center justify-center mb-6">
													<svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
													</svg>
												</div>
												<h2 className="text-2xl lg:text-3xl font-serif text-white mb-3">Verify Users</h2>
												<p className="text-gray-400 text-sm lg:text-base leading-relaxed">
													Review pending affiliation requests. Verify your organization members before they can access the curated curriculum.
												</p>
											</div>
											<div className="mt-8 flex items-center text-cyan-400 font-medium tracking-wide">
												View Requests
												<svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
												</svg>
											</div>
										</div>
									</motion.div>
								</Link>
							)}
						</div>
					</div>
				)}

			<Contact />
			<Footer />
		</>
	);
};

export default Home;