import Footer from "../../components/Footer";
import CTASection from "../../components/home/CTASection";
import HeroSection from "../../components/home/HeroSection";
import Contact from "../../components/landing/Contact";
import AppNavbar from "../../components/navbars/AppNavbar";
import { CTA_SECTIONS } from "../../constants/CTA";
import { useAuthContext } from "../../context/AuthContext";
import { institutionHomeUtils } from "../../constants/utils";
import Utils from "../../components/home/Utils";
import DefaultScreen from "../../components/DefaultScreen";

const Home = () => {
	const { authUser, authInstitution } = useAuthContext();

	const isLoggedIn = !!(authUser || authInstitution);
	const userName = authUser ? authUser.fullName : authInstitution?.name;

	if ((!authUser && !authInstitution) || !userName) {
		return <DefaultScreen />;
	}

	return (
		<>
			<AppNavbar />

			<HeroSection userName={userName} showScrollHint={isLoggedIn} />

			{isLoggedIn && (
				<div className="w-full">
					{CTA_SECTIONS.map((section) => (
						<CTASection key={section.step} {...section} />
					))}
				</div>
			)}

			{(authUser || authInstitution) && (
				<div className="relative z-10 w-full max-w-6xl flex flex-col gap-12 mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
						{authInstitution &&
							institutionHomeUtils.map((item, idx) => (
								<Utils {...item} key={idx} />
							))
						}
					</div>
				</div>
			)}

			<Contact />
			<Footer />
		</>
	);
};

export default Home;