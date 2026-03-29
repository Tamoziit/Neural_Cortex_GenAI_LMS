import { RiRoadMapLine } from "react-icons/ri";
import type { InstitutionHomeUtilProps } from "../types";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export const institutionHomeUtils: InstitutionHomeUtilProps[] = [
    {
        link: "/verify-users",
        icon: IoMdCheckmarkCircleOutline,
        header: "Verify Users",
        desc: "Review pending affiliation requests. Verify your organization members before they can access the curated curriculum.",
        btnTitle: "View Requests"
    },
    {
        link: "/assign-roadmap",
        icon: RiRoadMapLine,
        header: "Assign Roadmap",
        desc: "Map curated courses and curriculum to your team members. Track their progress and guide their professional development.",
        btnTitle: "Get Started"
    }
]