import type React from "react";
import type { IconType } from "react-icons";

export interface SignupParams {
    fullName: string;
    username: string;
    email: string;
    password: string;
    mobileNo: string;
    gender: string;
}

export interface LoginParams {
    email: string;
    password: string;
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

export interface AuthContextType {
    authUser: AuthUser | null;
    setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

export interface AuthContextProviderProps {
    children: ReactNode;
}

export interface UserBaseItem {
    title: string;
    description: string;
    icon: React.ReactNode;
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