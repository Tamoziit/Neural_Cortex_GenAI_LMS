import { motion } from "framer-motion";
import type { ProgressBarProps } from "../../types";

const ProgressBar = ({ current, total }: ProgressBarProps) => {
	const percentage = ((current) / total) * 100;

	return (
		<div className="flex items-center gap-4 w-full">
			<div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
				<motion.div
					className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
					initial={{ width: 0 }}
					animate={{ width: `${percentage}%` }}
					transition={{ duration: 0.5, ease: "easeOut" }}
				/>
			</div>
			<span className="text-sm !font-mono text-gray-400 shrink-0">
				{current} / {total}
			</span>
		</div>
	);
};

export default ProgressBar;