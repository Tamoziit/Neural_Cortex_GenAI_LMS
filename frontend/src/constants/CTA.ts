import { LuUsersRound, LuLayoutDashboard } from "react-icons/lu";
import type { CTAProps } from "../types";

export const CTA_SECTIONS: CTAProps[] = [
	{
		step: "01",
		label: "Step 01",
		title: "Create a Study Group",
		description:
			"Curate personalized learning roadmaps for your team. Set technical domains, proficiency levels, and goals to kickstart focused, measurable learning journeys.",
		to: "/create-study-group",
		cta: "Get Started",
		Icon: LuUsersRound,
		accentClass: "blue-300",
		variant: "filled",
		reverse: false,
		divider: true,
	},
	{
		step: "02",
		label: "Step 02",
		title: "Manage Study Groups",
		description:
			"Monitor progress across your active study groups. Track participant engagement, roadmap completion rates, and overall team performance from a unified dashboard.",
		to: "/manage-study-groups",
		cta: "View Dashboard",
		Icon: LuLayoutDashboard,
		accentClass: "emerald-300",
		variant: "outlined",
		reverse: true,
		divider: false,
	},
];