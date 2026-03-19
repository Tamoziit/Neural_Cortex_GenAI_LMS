import { FiBookOpen, FiUsers, FiBriefcase, FiGrid } from "react-icons/fi";
import type { UserBaseItem } from "../types";

export const users: UserBaseItem[] = [
    {
        title: "Students",
        description: "Learn faster with guided content, quizzes, and AI-powered help.",
        icon: <FiBookOpen className="h-10 w-10" aria-hidden="true" />,
    },
    {
        title: "Professors",
        description: "Create courses, track progress, and personalize learning at scale.",
        icon: <FiUsers className="h-10 w-10" aria-hidden="true" />,
    },
    {
        title: "Working Professionals",
        description: "Upskill with bite-sized modules and job-relevant learning paths.",
        icon: <FiBriefcase className="h-10 w-10" aria-hidden="true" />,
    },
    {
        title: "Enterprises",
        description: "Train teams, manage compliance, and get org-level analytics.",
        icon: <FiGrid className="h-10 w-10" aria-hidden="true" />,
    },
];