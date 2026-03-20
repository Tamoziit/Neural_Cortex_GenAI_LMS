import { FaArrowLeft } from "react-icons/fa";
import SearchableInstitutionSelect from "./SearchableInstitutionSelect";
import toast from "react-hot-toast";
import type { IndividualAffiliationProps } from "../../../types";

const IndividualAffiliationStep = ({
	group,
	institutionId,
	onGroupChange,
	onInstitutionIdChange,
	onBack,
	onSubmit,
	loading
}: IndividualAffiliationProps) => {
	const selectedInstitutionType = group === "academia" ? "institute" : "corporate";
	const affiliation = group === "academia" ? "student" : "professional";

	return (
		<div className="w-full flex flex-col gap-5">
			<div className="flex items-center gap-2">
				<button type="button" className="text-gray-400 font-semibold p-1 rounded-full border-2 cursor-pointer" onClick={onBack} disabled={loading}>
					<FaArrowLeft />
				</button>
				<span className="text-subhead">
					Step 2: Affiliation
				</span>
			</div>

			<div className="flex flex-col gap-4">
				<div className="glassmorphic-2 p-4 rounded-xl">
					<div className="text-white/80 font-semibold mb-2">Affiliation group</div>
					<div className="grid grid-cols-2 gap-3">
						<button
							type="button"
							className={`px-4 py-3 rounded-lg border transition ${group === "academia"
								? "border-blue-400 bg-blue-400/10 text-blue-200"
								: "border-white/20 bg-white/5 text-white/70 hover:border-white/30 cursor-pointer"
								}`}
							onClick={() => {
								onGroupChange("academia");
							}}
						>
							Academia
						</button>
						<button
							type="button"
							className={`px-4 py-3 rounded-lg border transition ${group === "corporate"
								? "border-blue-400 bg-blue-400/10 text-blue-200"
								: "border-white/20 bg-white/5 text-white/70 hover:border-white/30 cursor-pointer"
								}`}
							onClick={() => {
								onGroupChange("corporate");
							}}
						>
							Corporate
						</button>
					</div>
				</div>

				{group && (
					<div className="glassmorphic-2 p-4 rounded-xl">
						<SearchableInstitutionSelect
							institutionType={selectedInstitutionType}
							value={institutionId}
							onChange={(id) => onInstitutionIdChange(id)}
							placeholder={`Search available ${selectedInstitutionType}s...`}
						/>
					</div>
				)}
			</div>

			<div className="flex items-center justify-center gap-4 pt-1 w-full">
				<button
					type="button"
					className="btn-submit w-full"
					disabled={loading}
					onClick={() => {
						if (!group) {
							toast.error("Please select your affiliation group");
							return;
						}
						if (!institutionId) {
							toast.error("Please select an institution");
							return;
						}
						onSubmit({
							affiliation,
							institutionId
						});
					}}
				>
					{loading ? "Submitting..." : "Create account"}
				</button>
			</div>
		</div>
	);
};

export default IndividualAffiliationStep;