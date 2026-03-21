import { FaUniversity, FaBuilding, FaCheckCircle } from "react-icons/fa";

type Props = {
	value: "institute" | "corporate" | null;
	onChange: (type: "institute" | "corporate") => void;
	onNext: () => void;
};

const options = [
	{
		type: "institute" as const,
		label: "Academia / Institute",
		description: "Register a university, school, or learning institute.",
		Icon: FaUniversity,
	},
	{
		type: "corporate" as const,
		label: "Corporate",
		description: "Register a corporate organization or business.",
		Icon: FaBuilding,
	},
];

const SelectInstitutionTypeStep = ({ value, onChange, onNext }: Props) => {
	return (
		<div className="w-full flex flex-col gap-4">
			<div className="text-subhead">Step 1: Institution type</div>

			<div className="grid grid-cols-1 gap-3">
				{options.map(({ type, label, description, Icon }) => {
					const selected = value === type;
					return (
						<button
							key={type}
							type="button"
							aria-pressed={selected}
							onClick={() => onChange(type)}
							className={`relative w-full text-left rounded-xl border-2 p-4 transition-all duration-200 active:scale-[0.99] cursor-pointer
								${selected
									? "border-blue-400 bg-blue-500/15 shadow-[0_0_18px_2px_rgba(96,165,250,0.18)]"
									: "border-white/15 bg-white/[0.04] hover:border-white/30 hover:bg-white/[0.07]"
								}`}
						>
							<div className="flex items-start gap-4">
								{/* Icon badge */}
								<div className={`flex-shrink-0 mt-0.5 w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all duration-200
									${selected ? "bg-blue-500/30 text-blue-300" : "bg-white/10 text-white/50"}`}>
									<Icon />
								</div>

								{/* Text */}
								<div className="flex-1 min-w-0">
									<div className={`font-semibold text-base transition-colors duration-200 ${selected ? "text-blue-200" : "text-white"}`}>
										{label}
									</div>
									<div className={`text-sm mt-0.5 transition-colors duration-200 ${selected ? "text-blue-300/70" : "text-white/45"}`}>
										{description}
									</div>
								</div>

								{/* Selected checkmark */}
								<div className={`flex-shrink-0 mt-0.5 text-xl transition-all duration-200
									${selected ? "text-blue-400 opacity-100 scale-100" : "text-transparent opacity-0 scale-75"}`}>
									<FaCheckCircle />
								</div>
							</div>

							{/* Bottom selected bar */}
							{selected && (
								<div className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0" />
							)}
						</button>
					);
				})}
			</div>

			<div className="flex items-center justify-center w-full pt-1">
				<button
					type="button"
					className="btn-submit w-full lg:w-[90%]"
					onClick={onNext}
					disabled={!value}
				>
					Continue
				</button>
			</div>
		</div>
	);
};

export default SelectInstitutionTypeStep;