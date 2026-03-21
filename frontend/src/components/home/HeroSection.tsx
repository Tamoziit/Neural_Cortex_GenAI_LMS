import { motion } from "framer-motion";
import { LuChevronDown } from "react-icons/lu";

interface HeroProps {
	userName: string;
	showScrollHint: boolean;
}

const HeroSection = ({ userName, showScrollHint }: HeroProps) => {
	return (
		<div className="relative pt-20 lg:pt-32 p-6 lg:p-16 flex flex-col items-center min-h-screen pb-24 overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat">
				<div className="absolute inset-0 bg-black/40 lg:bg-black/20" />
			</div>

			{/* Content */}
			<div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 h-full">
				{/* Left: Logo + Greeting */}
				<div className="flex flex-col items-center lg:items-start gap-6">
					<motion.div
						className="w-40 lg:w-60"
						initial={{ opacity: 0, y: -30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.9, ease: "easeOut" }}
					>
						<img src="/DN_Logo.gif" alt="Neural Cortex logo" className="w-full object-contain" />
					</motion.div>

					<div className="flex flex-col items-center lg:items-start gap-3">
						<motion.h1
							className="text-primary !font-serif text-[30px] lg:text-[40px] leading-none text-center lg:text-left"
							initial={{ opacity: 0, x: -40 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
						>
							Welcome
						</motion.h1>

						<motion.h1
							className="text-[40px] lg:text-[55px] text-center lg:text-left max-w-xl !text-gray-300"
							initial={{ opacity: 0, x: -30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }}
						>
							{userName}
						</motion.h1>
					</div>
				</div>

				{/* Right: Azure image */}
				<motion.div
					className="flex-shrink-0"
					initial={{ opacity: 0, x: 40 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
				>
					<img src="/Azure.png" alt="Azure logo" className="w-50 lg:w-100 object-contain" />
				</motion.div>
			</div>

			{/* Scroll indicator */}
			{showScrollHint && (
				<motion.div
					className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.4, duration: 0.8 }}
				>
					<span className="text-xs tracking-widest uppercase font-light">Explore</span>
					<motion.div
						animate={{ y: [0, 6, 0] }}
						transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
					>
						<LuChevronDown size={20} className="opacity-50" />
					</motion.div>
				</motion.div>
			)}
		</div>
	);
};

export default HeroSection;