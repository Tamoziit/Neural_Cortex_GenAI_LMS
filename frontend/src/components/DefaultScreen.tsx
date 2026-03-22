import AppNavbar from "./navbars/AppNavbar";
import Spinner from "./Spinner";

const DefaultScreen = () => {
	return (
		<>
			<AppNavbar />

			<div className="relative px-6 lg:px-16 min-h-screen">
				<div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat">
					<div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
				</div>

				<div className="relative flex flex-col gap-6 w-full min-h-screen items-center justify-center z-10">
					<Spinner size="large" />
					<span className="!font-mono !text-gray-400">Getting Things Ready...</span>
				</div>
			</div>
		</>
	)
}

export default DefaultScreen;