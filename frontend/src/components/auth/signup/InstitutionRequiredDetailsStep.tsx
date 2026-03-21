import toast from "react-hot-toast";
import { useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import type { InstitutionDetailsProps } from "../../../types";

const InstitutionRequiredDetailsStep = ({ type, value, onChange, onBack, onSubmit, loading }: InstitutionDetailsProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const validateAndSubmit = () => {
		const { name, email, password } = value;
		if (!name || !email || !password) {
			toast.error("Please fill all the required fields");
			return;
		}
		if (name.length < 2) {
			toast.error("Institution name should be at least 2 characters long");
			return;
		}
		if (password.length < 6) {
			toast.error("Password should be at least 6 characters long");
			return;
		}
		onSubmit();
	};

	return (
		<div className="w-full flex flex-col gap-5">
			<div className="flex items-center gap-2">
				<button type="button" className="text-gray-400 font-semibold p-1 rounded-full border-2 cursor-pointer" onClick={onBack} disabled={loading}>
					<FaArrowLeft />
				</button>
				<span className="text-subhead">
					Step 2: Registration details
				</span>
			</div>

			<div className="glassmorphic-2 p-4 rounded-lg w-full">
				<div className="text-white/80 font-semibold mb-3">
					Creating: {type === "institute" ? "Institute" : "Corporate"}
				</div>

				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-1 w-full">
						<label className="text-lg font-medium text-gray-300">Institution name</label>
						<input
							type="text"
							placeholder="Enter institution name"
							required
							className="input-primary"
							value={value.name}
							onChange={(e) => onChange({ ...value, name: e.target.value })}
						/>
					</div>

					<div className="flex flex-col gap-1 w-full">
						<label className="text-lg font-medium text-gray-300">Email</label>
						<input
							type="email"
							placeholder="Enter email"
							required
							className="input-primary"
							value={value.email}
							onChange={(e) => onChange({ ...value, email: e.target.value })}
						/>
					</div>

					<div className="flex flex-col gap-1 w-full">
						<label className="text-lg font-medium text-gray-300 flex items-center gap-1.5">
							<FaLock />Password
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Enter password"
								required
								className="input-primary w-full pr-10"
								value={value.password}
								onChange={(e) => onChange({ ...value, password: e.target.value })}
							/>
							<button
								type="button"
								className="absolute right-2 top-1/2 transform -translate-y-1/2 mr-1.5 text-gray-400 hover:text-gray-600 cursor-pointer"
								onClick={() => setShowPassword((p) => !p)}
							>
								{showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-center gap-4 pt-1">
				<button
					type="button"
					className="btn-submit w-full"
					disabled={loading}
					onClick={validateAndSubmit}
				>
					{loading ? "Creating..." : "Create institution"}
				</button>
			</div>
		</div>
	);
};

export default InstitutionRequiredDetailsStep;