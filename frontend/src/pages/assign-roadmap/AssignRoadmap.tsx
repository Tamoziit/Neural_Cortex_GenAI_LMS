import { useEffect, useState } from "react";
import AppNavbar from "../../components/navbars/AppNavbar";
import { motion } from "framer-motion";
import useGetMembers from "../../hooks/useGetMembers";
import type { AffiliationRequestsProps } from "../../types";
import MemberCard from "./components/MemberCard";
import Spinner from "../../components/Spinner";

const AssignRoadmap = () => {
	const [members, setMembers] = useState<AffiliationRequestsProps[]>([]);
	const { loading, getMembers } = useGetMembers();

	useEffect(() => {
		const fetchMembers = async () => {
			const data = await getMembers();
			if (data && Array.isArray(data)) {
				setMembers(data);
			}
		};
		fetchMembers();
	}, []);

	return (
		<>
			<AppNavbar />

			<div className="relative pt-24 pb-16 px-6 lg:px-16 min-h-screen">
				<div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col gap-8">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
					>
						<div>
							<h1 className="text-4xl lg:text-5xl text-primary mb-4">Assign Learning Path</h1>
							<p className="text-gray-300 text-lg">Map curated courses and curriculum to your team members.</p>
						</div>
					</motion.div>

					{loading ? (
						<div className="flex justify-center items-center h-64">
							<Spinner />
						</div>
					) : members.length === 0 ? (
						<div className="text-center py-20 text-gray-400">
							<p className="text-xl">No members found in your institution.</p>
						</div>
					) : (
						<div className="flex flex-col gap-4 mt-8">
							{members.map((member) => (
								<MemberCard key={member._id} member={member} />
							))}
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default AssignRoadmap;