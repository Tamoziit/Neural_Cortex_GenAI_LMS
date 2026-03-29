import { useState } from "react";
import type { AffiliationRequestsProps } from "../../../types";
import { DEFAULT_ROLES } from "../../../constants/roles";
import useAssignRoadmap from "../../../hooks/useAssignRoadmap";
import { FiUser, FiMail, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

interface MemberCardProps {
	member: AffiliationRequestsProps;
}

const MemberCard = ({ member }: MemberCardProps) => {
	const [selectedRole, setSelectedRole] = useState(DEFAULT_ROLES[0].value);
	const { loading, assignRoadmap } = useAssignRoadmap();
	const [isAssigned, setIsAssigned] = useState(false);

	const handleAssign = async () => {
		const result = await assignRoadmap(member._id, selectedRole);
		if (result && !result.error) {
			setIsAssigned(true);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all gap-5"
		>
			<div className="flex items-center gap-4 flex-1 min-w-0">
				<div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/20 overflow-hidden shrink-0">
					{member.profilePic ? (
						<img src={member.profilePic} alt={member.fullName} className="w-full h-full object-cover" />
					) : (
						<span className="text-xl text-primary font-bold">
							{member.fullName.charAt(0).toUpperCase()}
						</span>
					)}
				</div>
				<div className="flex flex-col min-w-0">
					<h3 className="text-lg font-medium text-white truncate">{member.fullName}</h3>
					<div className="flex items-center gap-4 text-sm text-gray-400">
						<span className="flex items-center gap-1 shrink-0">
							<FiUser className="w-3 h-3" /> @{member.username}
						</span>
						<span className="flex items-center gap-1 truncate">
							<FiMail className="w-3 h-3" /> {member.email}
						</span>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-end gap-4 w-full sm:w-auto shrink-0">
				<div className="w-full sm:w-44">
					<select
						value={selectedRole}
						onChange={(e) => {
							setSelectedRole(e.target.value);
							setIsAssigned(false);
						}}
						disabled={loading}
						className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50 appearance-none cursor-pointer truncate text-sm"
						style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
					>
						{DEFAULT_ROLES.map((role) => (
							<option key={role.value} value={role.value} className="bg-slate-900">
								{role.label}
							</option>
						))}
					</select>
				</div>

				<button
					onClick={handleAssign}
					disabled={loading || isAssigned}
					className={`w-30 px-2 py-1.5 rounded-lg font-medium transition-all flex items-center justify-center shrink-0 cursor-pointer !font-mono ${isAssigned
						? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
						: "border border-gray-300 text-gray-300 hover:bg-white/10 disabled:opacity-50"
						}`}
				>
					{isAssigned ? (
						<>
							<FiCheckCircle className="mr-2" /> Assigned
						</>
					) : loading ? (
						"Assigning..."
					) : (
						"Assign"
					)}
				</button>
			</div>
		</motion.div>
	);
};

export default MemberCard;