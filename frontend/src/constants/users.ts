import { FiBookOpen, FiUsers, FiBriefcase, FiGrid } from "react-icons/fi";
import type { UserBaseItem } from "../types";

export const users: UserBaseItem[] = [
    {
        title: "Students",
        description: "Learn faster with guided content, quizzes, and AI-powered help.",
        icon: FiBookOpen,
    },
    {
        title: "Professors",
        description: "Create courses, track progress, and personalize learning at scale.",
        icon: FiUsers,
    },
    {
        title: "Working Professionals",
        description: "Upskill with bite-sized modules and job-relevant learning paths.",
        icon: FiBriefcase,
    },
    {
        title: "Enterprises",
        description: "Train teams, manage compliance, and get org-level analytics.",
        icon: FiGrid,
    },
];