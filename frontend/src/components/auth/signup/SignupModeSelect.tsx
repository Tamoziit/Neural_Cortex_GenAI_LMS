import { FiGrid, FiUser } from "react-icons/fi";
import type { SignupModeSelectProps } from "../../../types";

const SignupModeSelect = ({ onSelect }: SignupModeSelectProps) => {
	return (
		<div className="w-full flex flex-col gap-4">
			<div className="text-subhead text-center">
				Choose what you want to do
			</div>

			<div className="grid grid-cols-1 gap-3">
				<button
					type="button"
					className="glassmorphic-2 p-4 rounded-xl text-left hover:cursor-pointer transition-all duration-200 hover:border-white/30 hover:bg-white/[0.06] active:scale-[0.99]"
					onClick={() => onSelect("individual")}
				>
					<div className="flex items-start gap-4">
						<div className="w-12 h-12 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center">
							<FiUser className="text-blue-200" size={24} />
						</div>
						<div className="flex flex-col gap-1 min-w-0">
							<div className="text-white font-semibold text-lg">Signup as an individual</div>
							<div className="text-white/50 text-sm">
								Join as a student or professional and link to an institution.
							</div>
						</div>
					</div>

					<div className="flex flex-wrap gap-2 mt-4">
						<span className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs border border-white/10">
							Students
						</span>
						<span className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs border border-white/10">
							Professors
						</span>
						<span className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs border border-white/10">
							Working Professionals
						</span>
					</div>
				</button>

				<button
					type="button"
					className="glassmorphic-2 p-4 rounded-xl text-left hover:cursor-pointer transition-all duration-200 hover:border-white/30 hover:bg-white/[0.06] active:scale-[0.99]"
					onClick={() => onSelect("institution")}
				>
					<div className="flex items-start gap-4">
						<div className="w-12 h-12 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center">
							<FiGrid className="text-blue-200" size={24} />
						</div>
						<div className="flex flex-col gap-1 min-w-0">
							<div className="text-white font-semibold text-lg">Create an institution</div>
							<div className="text-white/50 text-sm">
								Register your Institute or Corporate organization.
							</div>
						</div>
					</div>

					<div className="flex flex-wrap gap-2 mt-4">
						<span className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs border border-white/10">
							Institute
						</span>
						<span className="px-3 py-1 rounded-full bg-white/5 text-white/70 text-xs border border-white/10">
							Corporate
						</span>
					</div>
				</button>
			</div>
		</div>
	);
};

export default SignupModeSelect;