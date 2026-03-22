import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { InstitutionHomeUtilProps } from "../../types";

const Utils = ({ link, icon: Icon, header, desc, btnTitle }: InstitutionHomeUtilProps) => {
	return (
		<Link to={link}>
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
							<Icon className="w-7 h-7 text-cyan-400" />
						</div>
						<h2 className="text-2xl lg:text-3xl font-serif text-white mb-3">{header}</h2>
						<p className="text-gray-400 text-sm lg:text-base leading-relaxed">
							{desc}
						</p>
					</div>
					<div className="mt-8 flex items-center text-cyan-400 font-medium tracking-wide">
						{btnTitle}
						<svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</div>
				</div>
			</motion.div>
		</Link>
	)
}

export default Utils;