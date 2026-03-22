import AppNavbar from "../../components/navbars/AppNavbar";
import { useAuthContext } from "../../context/AuthContext";
import ProfileAvatar from "../../components/profile/ProfileAvatar";
import ProfileDetails from "../../components/profile/ProfileDetails";
import DefaultScreen from "../../components/DefaultScreen";

const Profile = () => {
	const { authUser, authInstitution } = useAuthContext();
	const entity = authUser || authInstitution;

	if (!entity) return (
		<DefaultScreen />
	);

	const isInstitution = !!authInstitution;

	return (
		<div className="relative min-h-screen text-gray-100 flex flex-col font-sans">
			{/* Background - covers entire page */}
			<div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat">
				<div className="absolute inset-0 bg-black/40 lg:bg-black/20" />
			</div>

			<AppNavbar />

			<div className="flex-1 w-full flex items-center justify-center z-0 p-4 pt-24 pb-12">
				<div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column - Avatar & Core Info */}
					<div className="col-span-1 flex flex-col gap-6">
						<ProfileAvatar entity={entity} isInstitution={isInstitution} />
					</div>

					{/* Right Column - Detailed Information */}
					<div className="col-span-1 lg:col-span-2">
						<ProfileDetails entity={entity} isInstitution={isInstitution} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile;