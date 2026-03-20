import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppNavbar from "../../components/navbars/AppNavbar";
import { useNavigate } from "react-router-dom";
import { qnaSteps } from "../../constants/QnA";

const CreateStudyGroup = () => {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(0);
	const [answers, setAnswers] = useState<Record<number, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleOptionSelect = (option: string) => {
		setAnswers((prev) => ({ ...prev, [currentStep]: option }));
	};

	const handleNext = () => {
		if (currentStep < qnaSteps.length - 1) {
			setCurrentStep((prev) => prev + 1);
		} else {
			handleSubmit();
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep((prev) => prev - 1);
		}
	};

	const handleSubmit = () => {
		setIsSubmitting(true);
		// Simulate API call to create group and curate roadmap
		setTimeout(() => {
			setIsSubmitting(false);
			navigate("/manage-study-groups"); // Redirect after success
		}, 1500);
	};

	return (
		<>
			<AppNavbar />

			<div className="relative pt-32 pb-16 px-6 lg:px-16 min-h-screen flex flex-col items-center">
				<div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat">
					<div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
				</div>

				<div className="relative z-10 w-full max-w-3xl flex flex-col gap-8">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center"
					>
						<h1 className="text-4xl lg:text-5xl font-serif text-primary mb-4">Create Study Group</h1>
						<p className="text-gray-300 text-lg">Answer a few questions to curate a personalized learning roadmap for your employees.</p>
					</motion.div>

					{/* Question Card */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl"
					>
						<div className="flex justify-between items-center mb-8">
							<span className="text-secondary font-mono text-sm tracking-wider uppercase">
								Question {currentStep + 1} of {qnaSteps.length}
							</span>
							<div className="flex gap-1">
								{qnaSteps.map((_, idx) => (
									<div
										key={idx}
										className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? "w-4 bg-emerald-300" : idx < currentStep ? "w-2 bg-white/50" : "w-2 bg-white/20"}`}
									/>
								))}
							</div>
						</div>

						<AnimatePresence mode="wait">
							<motion.div
								key={currentStep}
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.3 }}
								className="flex flex-col gap-6"
							>
								<h2 className="text-2xl text-white font-medium">
									{qnaSteps[currentStep].question}
								</h2>

								<div className="flex flex-col gap-3">
									{qnaSteps[currentStep].options.map((option, idx) => {
										const isSelected = answers[currentStep] === option;
										return (
											<button
												key={idx}
												onClick={() => handleOptionSelect(option)}
												className={`text-left w-full p-4 rounded-xl border transition-all duration-200 ${isSelected
														? "bg-black/10 border-primary text-white"
														: "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/30"
													} cursor-pointer`}
											>
												{option}
											</button>
										);
									})}
								</div>
							</motion.div>
						</AnimatePresence>

						<div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
							<button
								onClick={handleBack}
								disabled={currentStep === 0 || isSubmitting}
								className={`px-6 py-2.5 rounded-lg font-medium transition-all ${currentStep === 0 || isSubmitting
										? "opacity-50 cursor-not-allowed text-gray-500"
										: "text-gray-300 hover:text-white hover:bg-white/5"
									} cursor-pointer z-10 !font-mono`}
							>
								Back
							</button>

							<button
								onClick={handleNext}
								disabled={!answers[currentStep] || isSubmitting}
								className={`px-8 py-2.5 rounded-lg font-medium transition-all ${!answers[currentStep] || isSubmitting
										? "opacity-50 cursor-not-allowed bg-gray-600 text-gray-300"
										: "bg-primary text-black bg-white/20 hover:bg-white/30"
									} cursor-pointer z-10 !font-mono`}
							>
								{isSubmitting ? "Curating Roadmap..." : currentStep === qnaSteps.length - 1 ? "Curate Roadmap" : "Next"}
							</button>
						</div>
					</motion.div>
				</div>
			</div>
		</>
	);
};

export default CreateStudyGroup;