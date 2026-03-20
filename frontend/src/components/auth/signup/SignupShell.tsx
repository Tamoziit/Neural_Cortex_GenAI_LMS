import type { ReactNode } from "react";

type Props = {
	title: string;
	subtitle?: string;
	children: ReactNode;
};

const SignupShell = ({ title, subtitle, children }: Props) => {
	return (
		<div className="flex flex-col gap-3 items-center justify-center min-h-screen w-full pb-6">
			<h1 className="text-[30px] md:text-[35px] lg:text-[40px] text-secondary">{title}</h1>
			<div className="h-[3.3px] -mt-1 bg-blue-400 w-10 rounded-lg" />
			{subtitle && <div className="text-white/60 text-sm md:text-base mt-1">{subtitle}</div>}

			<div className="flex w-full items-center justify-center">
				<div className="flex overflow-hidden w-full justify-center">
					<div className="hidden lg:flex items-center justify-center w-[450px] glassmorphic p-4 rounded-lg lg:!rounded-none lg:!rounded-l-lg">
						<img src="/DN_Logo.gif" alt="signup" className="object-cover h-[400px]" />
					</div>

					<div className="flex flex-col gap-4 items-start justify-center glassmorphic p-4 w-[320px] md:w-[380px] lg:w-[450px] rounded-lg lg:!rounded-none lg:!rounded-r-lg">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignupShell;

