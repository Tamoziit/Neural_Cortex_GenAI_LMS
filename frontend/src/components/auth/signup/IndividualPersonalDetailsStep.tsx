import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaLock, FaPhoneAlt, FaRegUser, FaTransgenderAlt, FaUser } from "react-icons/fa";
import type { IndividualPersonalDetailProps } from "../../../types";

const IndividualPersonalDetailsStep = ({ value, onChange, onNext }: IndividualPersonalDetailProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const validate = () => {
		const { fullName, username, email, password, mobileNo, gender } = value;
		if (!fullName || !username || !email || !password || !mobileNo || !gender) {
			toast.error("Please fill all the required fields");
			return false;
		}
		if (username.length < 2) {
			toast.error("Username should be at least 2 characters long");
			return false;
		}
		if (password.length < 6) {
			toast.error("Password should be at least 6 characters long");
			return false;
		}
		if (mobileNo.length !== 10) {
			toast.error("Enter a valid Mobile No.");
			return false;
		}
		if (gender !== "M" && gender !== "F" && gender !== "O") {
			toast.error("Enter a valid gender");
			return false;
		}
		return true;
	};

	return (
		<div className="w-full flex flex-col gap-5">
			<div className="text-subhead">
				Step 1: Your details
			</div>

			<div className="flex flex-col gap-4 w-full">
				<div className="flex flex-col gap-1 w-full">
					<label className="text-lg font-medium text-gray-300 flex items-center gap-1.5">
						<FaUser />Full Name
					</label>
					<input
						type="text"
						placeholder="Enter your Name"
						required
						className="input-primary"
						value={value.fullName}
						onChange={(e) => onChange({ ...value, fullName: e.target.value })}
					/>
				</div>

				<div className="flex flex-col gap-1 w-full">
					<label className="text-lg font-medium text-gray-300 flex items-center gap-1.5">
						<FaRegUser />Username
					</label>
					<input
						type="text"
						placeholder="Enter your Username"
						required
						className="input-primary"
						value={value.username}
						onChange={(e) => onChange({ ...value, username: e.target.value })}
					/>
				</div>

				<div className="flex flex-col gap-1 w-full">
					<label className="text-lg font-medium text-gray-300 flex items-center gap-1.5">
						Email
					</label>
					<input
						type="email"
						placeholder="Enter your Email"
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
							placeholder="Enter your Password"
							required
							className="input-primary w-full pr-10"
							value={value.password}
							onChange={(e) => onChange({ ...value, password: e.target.value })}
						/>
						<button
							type="button"
							className="absolute right-2 top-1/2 transform -translate-y-1/2 mr-1.5 text-gray-400 hover:text-gray-600 cursor-pointer"
							onClick={() => setShowPassword((prev) => !prev)}
						>
							{showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
						</button>
					</div>
				</div>

				<div className="flex flex-col gap-1 w-full">
					<label className="text-lg font-medium text-gray-300 flex items-center gap-1.5">
						<FaPhoneAlt />Mobile Number
					</label>
					<input
						type="text"
						placeholder="Enter your Mobile Number"
						required
						className="input-primary"
						value={value.mobileNo}
						onChange={(e) => onChange({ ...value, mobileNo: e.target.value })}
					/>
				</div>

				<div className="flex flex-col gap-1 w-full">
					<label className="text-lg font-medium text-gray-300 flex items-center gap-1.5">
						<FaTransgenderAlt />Gender
					</label>
					<div className="flex justify-around w-full text-gray-300">
						<label className="flex items-center">
							<input
								type="radio"
								name="gender"
								className="mr-2"
								value="M"
								checked={value.gender === "M"}
								onChange={(e) => onChange({ ...value, gender: e.target.value })}
							/>
							MALE
						</label>
						<label className="flex items-center">
							<input
								type="radio"
								name="gender"
								className="mr-2"
								value="F"
								checked={value.gender === "F"}
								onChange={(e) => onChange({ ...value, gender: e.target.value })}
							/>
							FEMALE
						</label>
						<label className="flex items-center">
							<input
								type="radio"
								name="gender"
								className="mr-2"
								value="O"
								checked={value.gender === "O"}
								onChange={(e) => onChange({ ...value, gender: e.target.value })}
							/>
							OTHERS
						</label>
					</div>
				</div>
			</div>

			<div className="flex items-start justify-center w-full pt-2">
				<button
					type="button"
					className="btn-submit w-full lg:w-[90%]"
					onClick={() => {
						if (validate()) onNext();
					}}
				>
					Continue
				</button>
			</div>
		</div>
	);
};

export default IndividualPersonalDetailsStep;