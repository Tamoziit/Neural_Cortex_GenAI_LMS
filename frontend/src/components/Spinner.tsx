import { motion } from "framer-motion";

interface SpinnerProps {
	size?: "small" | "medium" | "large";
	color?: "primary" | "secondary" | "accent";
}

const Spinner = ({ size, color }: SpinnerProps) => {
	const sizeClasses =
		size === "large" ? "w-16 h-16 border-4" :
			size === "small" ? "w-5 h-5 border-[2.4px]" :
				"w-10 h-10 border-[3px]";

	const colorClasses =
		color === "secondary" ? "border-gray-400 border-t-gray-500" :
			color === "accent" ? "border-gray-300 border-t-green-600" :
				"border-gray-300 border-t-blue-500";

	return (
		<div className="flex w-full items-center justify-center py-0.5">
			<motion.div
				className={`${sizeClasses} ${colorClasses} rounded-full shadow-lg`}
				animate={{
					rotate: 360
				}}
				transition={{
					rotate: { duration: 1, repeat: Infinity, ease: "linear" }	
				}}
			/>
		</div>
	);
};

export default Spinner;