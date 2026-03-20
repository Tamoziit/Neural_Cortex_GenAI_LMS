import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import type { CTAProps } from "../../types";

const CTASection = ({
	step,
	label,
	title,
	description,
	to,
	cta,
	Icon,
	accentClass = "primary",
	variant = "filled",
	reverse = false,
	divider = false,
}: CTAProps) => {
	const rowDir = reverse ? "lg:flex-row-reverse" : "lg:flex-row";

	const iconBoxClass = `flex-shrink-0 w-28 h-28 lg:w-40 lg:h-40 rounded-3xl 
		bg-gradient-to-br from-${accentClass}/20 to-${accentClass}/5 
		border border-${accentClass}/20 
		flex items-center justify-center 
		shadow-[0_0_60px_-10px] shadow-${accentClass}/20`;

	const stepLabelClass = `text-xs tracking-[0.2em] uppercase text-${accentClass} font-medium !font-mono tracking-widest`;

	const iconColorClass = `text-${accentClass}`;

	const buttonClass =
		variant === "filled"
			? `group mt-2 flex items-center gap-3 px-7 py-3.5 rounded-full 
			   bg-${accentClass} text-white font-medium text-sm tracking-wide 
			   hover:bg-${accentClass}/90 transition-all duration-200 
			   shadow-lg shadow-${accentClass}/20 hover:shadow-${accentClass}/30 hover:gap-4 cursor-pointer`
			: `group mt-2 flex items-center gap-3 px-7 py-3.5 rounded-full 
			   border border-${accentClass}/40 text-${accentClass} font-medium text-sm tracking-wide 
			   hover:bg-${accentClass}/10 transition-all duration-200 hover:gap-4 cursor-pointer`;

	return (
		<motion.section
			className={`w-full ${divider ? "border-b border-white/5" : ""}`}
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.7 }}
		>
			<div className={`max-w-6xl mx-auto px-6 lg:px-16 py-20 lg:py-28 flex flex-col ${rowDir} items-center gap-12 lg:gap-20`}>

				{/* Icon box */}
				<motion.div
					className={iconBoxClass}
					initial={{ opacity: 0, scale: 0.85 }}
					whileInView={{ opacity: 1, scale: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.1 }}
				>
					{Icon && <Icon size={48} className={iconColorClass} />}
				</motion.div>

				{/* Text content */}
				<div className="flex flex-col items-center lg:items-start gap-4 text-center lg:text-left flex-1">
					<motion.span
						className={stepLabelClass}
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.15 }}
					>
						{label}
					</motion.span>

					<motion.h2
						className="text-3xl lg:text-5xl text-white leading-tight"
						initial={{ opacity: 0, y: 15 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						{title}
					</motion.h2>

					<motion.p
						className="text-gray-400 text-base lg:text-lg leading-relaxed max-w-lg"
						initial={{ opacity: 0, y: 15 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.28 }}
					>
						{description}
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.36 }}
					>
						<Link to={to}>
							<button className={buttonClass}>
								{cta}
								<LuArrowRight
									size={16}
									className="transition-transform group-hover:translate-x-0.5"
								/>
							</button>
						</Link>
					</motion.div>
				</div>

				{/* Decorative step number */}
				<div className="hidden lg:block flex-shrink-0 text-[120px] text-white/20 leading-none select-none !font-mono">
					{step}
				</div>
			</div>
		</motion.section>
	);
};

export default CTASection;