import CTASection from "../../components/home/CTASection";
import HeroSection from "../../components/home/HeroSection";
import AppNavbar from "../../components/navbars/AppNavbar";
import { CTA_SECTIONS } from "../../constants/CTA";
import { useAuthContext } from "../../context/AuthContext";

const Home = () => {
	const { authUser, authInstitution } = useAuthContext();

	const isLoggedIn = !!(authUser || authInstitution);
	const userName = authUser ? authUser.fullName : authInstitution?.name;

	if ((!authUser && !authInstitution) || !userName) {
		return;
	}

	return (
		<>
			<AppNavbar />

			<HeroSection userName={userName} showScrollHint={isLoggedIn} />

			{isLoggedIn && (
				<div className="bg-[#0a0a0f] w-full">
					{CTA_SECTIONS.map((section) => (
						<CTASection key={section.step} {...section} />
					))}
				</div>
			)}
		</>
	);
};

export default Home;