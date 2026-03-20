type StepProgressProps = {
	steps: string[];
	activeIndex: number;
};

const StepProgress = ({ steps, activeIndex }: StepProgressProps) => {
	return (
		<div className="w-full flex flex-col gap-2">
			<div className="flex items-center justify-between gap-3">
				{steps.map((s, idx) => {
					const isActive = idx === activeIndex;
					const isDone = idx < activeIndex;
					return (
						<div key={s} className="flex flex-col gap-1 items-center flex-1 min-w-0">
							<div
								className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${isDone
									? "border-green-400 bg-green-400/15 text-green-200"
									: isActive
										? "border-blue-400 bg-blue-400/15 text-blue-200"
										: "border-white/20 bg-white/5 text-white/50"
									}`}
							>
								{idx + 1}
							</div>
							<span className={`text-[11px] text-center truncate w-full ${isActive ? "text-blue-300" : "text-white/40"}`}>
								{s}
							</span>
						</div>
					);
				})}
			</div>

			<div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
				<div
					className="h-full bg-blue-400 rounded-full transition-all duration-300"
					style={{ width: `${((activeIndex + 1) / steps.length) * 100}%` }}
				/>
			</div>
		</div>
	);
};

export default StepProgress;