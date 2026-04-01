import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AppNavbar from "../../components/navbars/AppNavbar";
import Spinner from "../../components/Spinner";
import ProgressBar from "../../components/persona-identification/ProgressBar";
import QuestionCard from "../../components/persona-identification/QuestionCard";
import ResultCard from "../../components/persona-identification/ResultCard";
import { DEFAULT_ROLES } from "../../constants/roles";
import { roleIcons, roleColors } from "../../constants/learningPath";
import { FiCode, FiChevronLeft, FiChevronRight, FiSend } from "react-icons/fi";
import useEvaluatePersona from "../../hooks/useEvaluatePersona";
import type { EvaluationResult, PersonaAnswer, PersonaQuestionsData } from "../../types";
import usePersonaQuestions from "../../hooks/usePersonaQuestions";

const PersonaIdentification = () => {
	const { role } = useParams<{ role: string }>();
	const { loading: questionsLoading, fetchQuestions } = usePersonaQuestions();
	const { loading: evaluating, evaluatePersona } = useEvaluatePersona();
	const [questionsData, setQuestionsData] = useState<PersonaQuestionsData | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [answers, setAnswers] = useState<Record<string, number>>({}); // questionId -> selected option idx
	const [direction, setDirection] = useState(1);
	const [result, setResult] = useState<EvaluationResult | null>(null);
	const hasFetched = useRef(false);

	// Role display info
	const roleData = DEFAULT_ROLES.find((r) => r.value === role);
	const Icon = role ? (roleIcons[role] || FiCode) : FiCode;
	const bgGradient = role ? (roleColors[role] || "from-cyan-500/20 via-cyan-400/5 to-transparent") : "from-cyan-500/20 via-cyan-400/5 to-transparent";

	useEffect(() => {
		if (!role || hasFetched.current) return;
		hasFetched.current = true;
		const load = async () => {
			const data = await fetchQuestions(role);
			if (data) {
				setQuestionsData(data);
			}
		};
		load();
	}, [role]);

	const questions = questionsData?.questions ?? [];
	const currentQuestion = questions[currentIndex];
	const totalQuestions = questions.length;
	const selectedAnswer = currentQuestion ? answers[currentQuestion._id] ?? null : null;
	const allAnswered = totalQuestions > 0 && Object.keys(answers).length === totalQuestions;

	const handleSelectAnswer = (idx: number) => {
		if (!currentQuestion || result) return;
		setAnswers((prev) => ({ ...prev, [currentQuestion._id]: idx }));
	};

	const handleNext = () => {
		if (currentIndex < totalQuestions - 1) {
			setDirection(1);
			setCurrentIndex((i) => i + 1);
		}
	};

	const handlePrev = () => {
		if (currentIndex > 0) {
			setDirection(-1);
			setCurrentIndex((i) => i - 1);
		}
	};

	const handleSubmit = async () => {
		if (!role || !allAnswered) return;
		const payload: PersonaAnswer[] = Object.entries(answers).map(([_id, ans]) => ({
			_id,
			ans: ans as 0 | 1 | 2 | 3,
		}));
		const data = await evaluatePersona(role, payload);
		if (data) {
			setResult(data);
		}
	};

	return (
		<>
			<AppNavbar />
			<div className="relative min-h-screen w-full overflow-hidden flex flex-col">

				{/* Ambient BG blobs */}
				<div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-br ${bgGradient} blur-[120px] rounded-full pointer-events-none opacity-50`} />
				<div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-900/15 blur-[100px] rounded-full pointer-events-none" />

				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -18 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.55 }}
					className="px-6 lg:px-14 pt-28 pb-6 flex items-center gap-4 relative z-10"
				>
					<div className="h-11 w-11 rounded-xl glassmorphic-2 flex items-center justify-center text-cyan-400 shrink-0">
						<Icon className="text-xl" />
					</div>
					<div>
						<p className="text-xs font-mono text-gray-500 tracking-widest uppercase">Skill Assessment</p>
						<h1 className="text-2xl lg:text-3xl text-primary leading-tight">
							{roleData?.label ?? role}
						</h1>
					</div>
				</motion.div>

				{/* Main content */}
				<div className="flex-1 flex items-start justify-center px-6 lg:px-14 pb-20 relative z-10">
					<div className="w-full max-w-2xl">

						{/* Loading */}
						{questionsLoading && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="flex flex-col items-center justify-center py-32 gap-4"
							>
								<Spinner size="large" />
								<p className="text-gray-500 text-sm font-mono tracking-wider">Loading questions…</p>
							</motion.div>
						)}

						{/* Result screen */}
						{!questionsLoading && result && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="flex flex-col items-center gap-6 py-8"
							>
								<div className="text-center mb-2">
									<h2 className="text-3xl font-bold text-white">Assessment Complete</h2>
									<p className="text-gray-400 mt-2">Here's your skill profile for {roleData?.label ?? role}</p>
								</div>
								<ResultCard result={result} />
							</motion.div>
						)}

						{/* Quiz screen */}
						{!questionsLoading && !result && questionsData && (
							<motion.div
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 }}
								className="flex flex-col gap-8"
							>
								{/* Progress */}
								<div className="glassmorphic rounded-2xl p-5 flex flex-col gap-3">
									<div className="flex items-center justify-between text-xs text-gray-500 uppercase tracking-widest">
										<span>Progress</span>
										<span className="!font-mono">{Object.keys(answers).length} answered</span>
									</div>
									<ProgressBar current={Object.keys(answers).length} total={totalQuestions} />

									{/* Dot indicators */}
									<div className="flex gap-1.5 flex-wrap mt-1">
										{questions.map((q, idx) => {
											const isAnswered = answers[q._id] !== undefined;
											const isCurrent = idx === currentIndex;
											return (
												<button
													key={q._id}
													onClick={() => {
														setDirection(idx > currentIndex ? 1 : -1);
														setCurrentIndex(idx);
													}}
													className={`
                                                        transition-all duration-300 rounded-full cursor-pointer
                                                        ${isCurrent
															? "w-6 h-2 bg-cyan-400"
															: isAnswered
																? "w-2 h-2 bg-cyan-400/40"
																: "w-2 h-2 bg-white/10"
														}
                                                    `}
												/>
											);
										})}
									</div>
								</div>

								{/* Card wrapper */}
								<div className="glassmorphic rounded-2xl p-6 md:p-8 min-h-[360px] flex flex-col justify-between gap-6">
									{/* Question */}
									<div className="flex-1">
										<QuestionCard
											key={currentQuestion?._id}
											question={currentQuestion}
											questionNumber={currentIndex + 1}
											selectedAnswer={selectedAnswer}
											onSelect={handleSelectAnswer}
											direction={direction}
										/>
									</div>

									{/* Nav controls */}
									<div className="flex items-center justify-between gap-3 pt-2 border-t border-white/5">
										{/* Prev */}
										<motion.button
											whileHover={{ scale: 1.04 }}
											whileTap={{ scale: 0.96 }}
											onClick={handlePrev}
											disabled={currentIndex === 0}
											className="flex items-center gap-2 px-4 py-2.5 rounded-xl glassmorphic-2 border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/25 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
										>
											<FiChevronLeft />
											<span className="!font-mono">Prev</span>
										</motion.button>

										{/* Skip dot */}
										<p className="text-xs text-gray-600 !font-mono">
											{currentIndex + 1} / {totalQuestions}
										</p>

										{/* Next or Submit */}
										<AnimatePresence mode="wait">
											{currentIndex < totalQuestions - 1 ? (
												<motion.button
													key="next"
													initial={{ opacity: 0, x: 10 }}
													animate={{ opacity: 1, x: 0 }}
													exit={{ opacity: 0, x: -10 }}
													whileHover={{ scale: 1.04 }}
													whileTap={{ scale: 0.96 }}
													onClick={handleNext}
													disabled={selectedAnswer === null}
													className="flex items-center gap-2 px-4 py-2.5 rounded-xl glassmorphic-2 border border-cyan-400/30 text-sm text-cyan-300 hover:border-cyan-400/60 hover:shadow-[0_0_12px_-4px_rgba(34,211,238,0.4)] transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
												>
													<span className="!font-mono">Next</span>
													<FiChevronRight />
												</motion.button>
											) : (
												<motion.button
													key="submit"
													initial={{ opacity: 0, x: 10 }}
													animate={{ opacity: 1, x: 0 }}
													exit={{ opacity: 0, x: -10 }}
													whileHover={{ scale: 1.04 }}
													whileTap={{ scale: 0.96 }}
													onClick={handleSubmit}
													disabled={!allAnswered || evaluating}
													className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-400/40 text-sm text-cyan-300 font-semibold hover:bg-cyan-500/25 hover:shadow-[0_0_16px_-4px_rgba(34,211,238,0.45)] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
												>
													{evaluating ? (
														<Spinner size="small" />
													) : (
														<>
															<FiSend className="text-xs" />
															<span className="!font-mono">Submit</span>
														</>
													)}
												</motion.button>
											)}
										</AnimatePresence>
									</div>
								</div>

								{/* Unanswered hint */}
								{!allAnswered && currentIndex === totalQuestions - 1 && (
									<motion.p
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="text-center text-xs text-amber-400/70 !font-mono"
									>
										Answer all questions before submitting
									</motion.p>
								)}
							</motion.div>
						)}

						{/* Empty state */}
						{!questionsLoading && !questionsData && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="flex flex-col items-center justify-center py-32 gap-3 text-center"
							>
								<p className="text-gray-400 text-xl">No questions found for this role.</p>
								<p className="text-gray-600 text-sm">Please check back later or select a different role.</p>
							</motion.div>
						)}

					</div>
				</div>
			</div>
		</>
	);
};

export default PersonaIdentification;