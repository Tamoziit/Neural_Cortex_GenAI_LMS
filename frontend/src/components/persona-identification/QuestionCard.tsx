import { motion, AnimatePresence } from "framer-motion";
import { cardVariants, optionLetters } from "../../constants/personaIdentification";
import type { QuestionCardProps } from "../../types";

const QuestionCard = ({
	question,
	questionNumber,
	selectedAnswer,
	onSelect,
	direction,
}: QuestionCardProps) => {
	return (
		<AnimatePresence mode="wait" custom={direction}>
			<motion.div
				key={question._id}
				custom={direction}
				variants={cardVariants}
				initial="enter"
				animate="center"
				exit="exit"
				transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
				className="w-full"
			>
				{/* Question */}
				<div className="mb-8">
					<p className="text-xs font-mono text-cyan-400/70 tracking-widest uppercase mb-3">
						Question {questionNumber}
					</p>
					<h2 className="text-xl md:text-2xl text-white font-semibold leading-snug">
						{question.question}
					</h2>
				</div>

				{/* Options */}
				<div className="flex flex-col gap-3">
					{question.options.map((option, idx) => {
						const isSelected = selectedAnswer === idx;
						return (
							<motion.button
								key={idx}
								onClick={() => onSelect(idx)}
								whileHover={{ scale: 1.015, x: 4 }}
								whileTap={{ scale: 0.98 }}
								className={`
                                    group relative w-full text-left flex items-center gap-4 px-5 py-4 rounded-xl border
                                    transition-all duration-300 cursor-pointer
                                    ${isSelected
										? "border-cyan-400/60 bg-cyan-500/10 shadow-[0_0_20px_-4px_rgba(34,211,238,0.25)]"
										: "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/8"
									}
                                `}
							>
								{/* Letter badge */}
								<span
									className={`
                                        flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold shrink-0
                                        transition-all duration-300
                                        ${isSelected
											? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/50"
											: "bg-white/5 text-gray-500 border border-white/10 group-hover:text-gray-300"
										}
                                    `}
								>
									{optionLetters[idx]}
								</span>

								<span
									className={`text-base transition-colors duration-300 ${isSelected ? "text-cyan-100" : "text-gray-300 group-hover:text-white"
										}`}
								>
									{option}
								</span>

								{/* Selection dot */}
								{isSelected && (
									<motion.span
										layoutId="selected-dot"
										initial={{ scale: 0 }}
										animate={{ scale: 1 }}
										className="ml-auto w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] shrink-0"
									/>
								)}
							</motion.button>
						);
					})}
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default QuestionCard;