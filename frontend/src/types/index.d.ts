import type React from "react";
import type { IconType } from "react-icons";
import type { DifficultyLevel, Group, InstitutionType, SignupMode } from "./types";

export interface SignupParams {
    fullName: string;
    username: string;
    email: string;
    password: string;
    mobileNo: string;
    gender: string;
    affiliation: "student" | "professional";
    institutionId?: string;
}

export interface LoginParams {
    email: string;
    password: string;
}

export interface CreateInstitutionParams {
    name: string;
    type: "institute" | "corporate";
    email: string;
    password: string;
}

export interface InstitutionItem {
    _id: string;
    name: string;
    type: "institute" | "corporate";
    domain?: string | null;
}

export interface AuthUser {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    mobileNo: string;
    gender: "M" | "F" | "O";
    profilePic?: string | null;
}

export interface AuthInstitution {
    _id: string;
    name: string;
    type: "institute" | "corporate";
    email: string;
    domain?: string | null;
    profilePic?: string | null;
}

export interface AuthContextType {
    authUser: AuthUser | null;
    setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
    authInstitution: AuthInstitution | null;
    setAuthInstitution: React.Dispatch<React.SetStateAction<AuthInstitution | null>>;
}

export interface AuthContextProviderProps {
    children: React.ReactNode;
}

export interface UserBaseItem {
    title: string;
    description: string;
    icon: IconType;
};

export interface RoadmapStep {
    title: string;
    bullets: string[];
    icon: string;
    alt: string;
    accent: string;
};

export interface LearningCard {
    title: string;
    description?: string;
    bullets: string[];
    icon: IconType;
    alt: string;
    accentBorder: string;
    accentText: string;
    accentDot: string;
    accent: string;
};

export interface SignupModeSelectProps {
    onSelect: (mode: SignupMode) => void;
};

export interface InstitutionDetailsProps {
    type: "institute" | "corporate";
    value: {
        name: string;
        email: string;
        password: string;
    };
    onChange: (next: InstitutionDetailsProps["value"]) => void;
    onBack: () => void;
    onSubmit: () => void;
    loading?: boolean;
};

export interface IndividualAffiliationProps {
    group: Group | null;
    institutionId: string | undefined;
    onGroupChange: (group: Group) => void;
    onInstitutionIdChange: (institutionId: string) => void;
    onBack: () => void;
    onSubmit: (payload: {
        affiliation: "student" | "professional";
        institutionId: string;
    }) => void;
    loading?: boolean;
};

export interface PersonalInputs {
    fullName: string;
    username: string;
    email: string;
    password: string;
    mobileNo: string;
    gender: string;
};

export interface IndividualPersonalDetailProps {
    value: PersonalInputs;
    onChange: (next: PersonalInputs) => void;
    onNext: () => void;
};

export interface SearchableInstitutionSelectProps {
    institutionType: InstitutionType;
    value: string | undefined;
    onChange: (institutionId: string) => void;
    placeholder?: string;
};

export interface InstitutionSearchHookProps {
    institutionType: "institute" | "corporate";
    query: string,
    open: boolean
}

export interface CTAProps {
    step: string;
    label: string;
    title: string;
    description: string;
    to: string;
    cta: string;
    Icon: ReactNode;
    accentClass: string;
    variant: "filled" | "outlined"
    reverse: boolean
    divider: boolean
}

export interface Chapter {
    id: string;
    title: string;
    duration: string;
    level: DifficultyLevel;
    assignedTo?: string[];
}

export interface Module {
    id: string;
    title: string;
    chapters: Chapter[];
}

export interface StudyGroup {
    id: number;
    name: string;
    domain: string;
    members: number;
    progress: number;
    joinCode: string;
    modules: Module[];
}

export interface InstitutionHomeUtilProps {
    link: string;
    icon: IconType;
    header: string;
    desc: string;
    btnTitle: string;
}

export interface AffiliationRequestsProps {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    gender: "M" | "F" | "O";
    profilePic?: string | null;
}