import { users } from "../../constants/users";

const UserBase = () => {
	return (
		<div id="userbase" className="mt-16 w-full items-center justify-center p-4">
			<div className="w-full flex flex-col gap-1 items-center justify-center">
				<h1 className="text-[39px] lg:text-[50px] text-secondary text-center">Whom We Cater To?</h1>
				<p className="text-subhead">Built for every learner and every team.</p>
			</div>

			<div className="mt-10 w-full flex items-center justify-center">
				<div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
					{users.map((item) => (
						<div
							key={item.title}
							className="group flex flex-col gap-3 p-5 bg-white/5 backdrop-blur-lg shadow-md border border-white/30 rounded-lg hover:border-cyan-300/50 hover:bg-white/10 transition-colors"
						>
							<div className="text-cyan-300/90 group-hover:text-cyan-300 transition-colors">
								{item.icon}
							</div>
							<div className="flex flex-col gap-1">
								<h3 className="text-lg font-semibold text-gray-200">{item.title}</h3>
								<p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default UserBase;