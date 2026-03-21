import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useCreateInstitution from "../../hooks/useCreateInstitution";
import useSignup from "../../hooks/useSignup";
import SignupShell from "../../components/auth/signup/SignupShell";
import SignupModeSelect from "../../components/auth/signup/SignupModeSelect";
import StepProgress from "../../components/auth/signup/StepProgress";
import IndividualPersonalDetailsStep from "../../components/auth/signup/IndividualPersonalDetailsStep";
import IndividualAffiliationStep from "../../components/auth/signup/IndividualAffiliationStep";
import SelectInstitutionTypeStep from "../../components/auth/signup/SelectInstitutionTypeStep";
import InstitutionRequiredDetailsStep from "../../components/auth/signup/InstitutionRequiredDetailsStep";
import type { Group, SignupMode } from "../../types/types";

const Signup = () => {
	const { signup, loading: signupLoading } = useSignup();
	const { loading: createLoading, createInstitution } = useCreateInstitution();

	const [mode, setMode] = useState<SignupMode | null>(null);
	const [step, setStep] = useState(0); // per-mode step index

	const [personal, setPersonal] = useState({
		fullName: "",
		username: "",
		email: "",
		password: "",
		mobileNo: "",
		gender: ""
	});

	const [group, setGroup] = useState<Group | null>(null);
	const [institutionId, setInstitutionId] = useState<string | undefined>(undefined);

	const [institutionType, setInstitutionType] = useState<"institute" | "corporate" | null>(null);
	const [institutionForm, setInstitutionForm] = useState({
		name: "",
		email: "",
		password: ""
	});

	const title = useMemo(() => {
		if (mode === "institution") return "Create an Institution";
		return "Signup";
	}, [mode]);

	const resetAll = () => {
		setMode(null);
		setStep(0);
		setPersonal({
			fullName: "",
			username: "",
			email: "",
			password: "",
			mobileNo: "",
			gender: ""
		});
		setGroup(null);
		setInstitutionId(undefined);
		setInstitutionType(null);
		setInstitutionForm({ name: "", email: "", password: "" });
	};

	return (
		<SignupShell title={title} subtitle={mode ? "Fill the form step-by-step" : "Choose your path to get started"}>
			{!mode && (
				<div className="flex flex-col gap-4 items-stretch">
					<SignupModeSelect
						onSelect={(m) => {
							setMode(m);
							setStep(0);
						}}
					/>

					<div className="flex -mt-2 w-full items-center justify-center">
						<Link to="/login" className="text-gray-400 hover:text-blue-600">
							Already have an account? Login
						</Link>
					</div>
				</div>
			)}

			{mode === "individual" && (
				<div className="w-full flex flex-col gap-4">
					<StepProgress
						steps={["Personal details", "Affiliation"]}
						activeIndex={step}
					/>

					{step === 0 && (
						<IndividualPersonalDetailsStep
							value={personal}
							onChange={setPersonal}
							onNext={() => setStep(1)}
						/>
					)}

					{step === 1 && (
						<IndividualAffiliationStep
							group={group}
							institutionId={institutionId}
							onGroupChange={(g) => {
								setGroup(g);
								setInstitutionId(undefined);
							}}
							onInstitutionIdChange={(id) => setInstitutionId(id)}
							onBack={() => setStep(0)}
							loading={signupLoading}
							onSubmit={async ({ affiliation, institutionId }) => {
								await signup({
									...personal,
									affiliation,
									institutionId
								});
							}}
						/>
					)}

					<div className="flex items-center justify-center w-full gap-3">
						<button type="button" className="px-6 !font-mono text-gray-400 underline text-sm cursor-pointer" onClick={resetAll}>
							Switch to other mode
						</button>
					</div>
				</div>
			)}

			{mode === "institution" && (
				<div className="w-full flex flex-col gap-4">
					<StepProgress steps={["Type", "Registration"]} activeIndex={step} />

					{step === 0 && (
						<SelectInstitutionTypeStep
							value={institutionType}
							onChange={(t) => setInstitutionType(t)}
							onNext={() => {
								if (!institutionType) return;
								setStep(1);
							}}
						/>
					)}

					{step === 1 && institutionType && (
						<InstitutionRequiredDetailsStep
							type={institutionType}
							value={institutionForm}
							onChange={setInstitutionForm}
							onBack={() => setStep(0)}
							loading={createLoading}
							onSubmit={async () => {
								await createInstitution({
									...institutionForm,
									type: institutionType
								});
							}}
						/>
					)}

					<div className="flex -mt-2 w-full items-center justify-center">
						<Link to="/login" className="text-gray-400 hover:text-blue-600">
							Already have an account? Login
						</Link>
					</div>
				</div>
			)}
		</SignupShell>
	);
};

export default Signup;