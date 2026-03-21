import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { accentBorder, accentDot, accentText, steps } from "../../constants/learningPath";
import StepCard from "./StepCard";

const LearningRoadmap = () => {
	const lineRef = useRef(null);
	const lineInView = useInView(lineRef, { once: true, margin: "-60px" });

	return (
		<div id="learning-roadmap" className="mt-16 w-full flex flex-col items-center px-4">
			{/* Header */}
			<div className="w-full flex flex-col gap-1 items-center justify-center">
				<h1 className="text-[39px] lg:text-[50px] text-secondary">Learning Path</h1>
				<p className="text-subhead">How we serve a personalized learning experience for you</p>
			</div>

			{/* ── Desktop Timeline ── */}
			<div className="hidden md:block w-full max-w-6xl mt-10">
				<div
					className="grid gap-x-2"
					style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
				>
					{/* Top row cards (even indices) */}
					{steps.map((step, idx) =>
						idx % 2 === 0 ? (
							<StepCard key={step.title} step={step} index={idx} />
						) : (
							/* Empty top slot for odd steps */
							<div key={step.title + "-top"} style={{ gridColumn: idx + 1 }} />
						)
					)}
				</div>

				{/* Center spine */}
				<div ref={lineRef} className="relative h-6 flex items-center">
					{/* Dots + connecting line */}
					<div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center px-0">
						{/* Animated line */}
						<motion.div
							initial={{ scaleX: 0 }}
							animate={lineInView ? { scaleX: 1 } : {}}
							transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
							className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent origin-left"
						/>
					</div>

					{/* Step dots on the spine */}
					<div
						className="relative w-full grid"
						style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
					>
						{steps.map((step, idx) => (
							<div key={step.title + "-dot"} className="flex justify-center">
								<motion.div
									initial={{ scale: 0, opacity: 0 }}
									animate={lineInView ? { scale: 1, opacity: 1 } : {}}
									transition={{
										duration: 0.4,
										ease: "backOut",
										delay: 0.3 + idx * 0.12,
									}}
									className="relative flex items-center justify-center"
								>
									{/* Outer ring */}
									<div
										className={`absolute w-6 h-6 rounded-full border ${accentBorder[step.accent]} bg-black/40`}
									/>
									{/* Inner fill */}
									<div className={`w-2.5 h-2.5 rounded-full ${accentDot[step.accent]} opacity-80`} />
								</motion.div>
							</div>
						))}
					</div>
				</div>

				{/* Bottom row cards (odd indices) */}
				<div
					className="grid gap-x-3"
					style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
				>
					{steps.map((step, idx) =>
						idx % 2 !== 0 ? (
							<StepCard key={step.title} step={step} index={idx} />
						) : (
							<div key={step.title + "-bot"} style={{ gridColumn: idx + 1 }} />
						)
					)}
				</div>
			</div>

			{/* ── Mobile Timeline ── */}
			<div className="md:hidden w-full relative pl-6 mt-10">
				{/* Vertical line */}
				<motion.div
					initial={{ scaleY: 0 }}
					whileInView={{ scaleY: 1 }}
					viewport={{ once: true, amount: 0.1 }}
					transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
					className="absolute left-2 top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent origin-top"
				/>

				<div className="flex flex-col gap-4">
					{steps.map((step, idx) => (
						<motion.div
							key={step.title}
							initial={{ opacity: 0, x: -16 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: idx * 0.07 }}
							className="relative"
						>
							{/* Spine dot */}
							<div
								className={`absolute -left-[22px] top-5 w-2.5 h-2.5 rounded-full ${accentDot[step.accent]} opacity-80 ring-4 ring-black/40`}
							/>

							<div
								className={`relative overflow-hidden rounded-2xl border ${accentBorder[step.accent]} bg-white/[0.03] p-5 flex flex-col gap-3`}
							>
								<div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${step.accent} opacity-60`} />

								<div className="relative flex items-start justify-between">
									<span className={`text-[10px] font-semibold tracking-widest uppercase !font-mono ${accentText[step.accent]} opacity-70`}>
										Step {String(idx + 1).padStart(2, "0")}
									</span>
									<img
										src={step.icon}
										alt={step.alt}
										className="size-12 object-contain"
										draggable={false}
									/>
								</div>

								<h3 className="relative text-sm font-semibold text-white/90 tracking-wider">{step.title}</h3>

								<ul className="relative flex flex-col gap-1.5">
									{step.bullets.map((b) => (
										<li key={b} className="flex items-start gap-2">
											<span className={`mt-[5px] h-1 w-1 rounded-full shrink-0 ${accentDot[step.accent]} opacity-70`} />
											<span className="text-xs text-white/50 leading-snug">{b}</span>
										</li>
									))}
								</ul>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
};

export default LearningRoadmap;