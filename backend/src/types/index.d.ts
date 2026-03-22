import { Types } from "mongoose";
import { Request } from "express";

export interface AdminToken {
    password: string
}

export interface UserSignupBody {
    fullName: string;
    username: string;
    email: string;
    password: string;
    mobileNo: string;
    gender: "M" | "F" | "O";
    affiliation?: "student" | "professional";
    institutionId?: string;
}

export interface UserLoginBody {
    email: string;
    password: string;
}

export interface User {
    _id: Types.ObjectId;
    fullName: string;
    username: string;
    email: string;
    password: string;
    mobileNo?: string | null;
    profilePic?: string | null;
    gender?: "M" | "F" | "O" | null;
}

export interface Institution {
    _id: Types.ObjectId,
    name: string,
    type: "institute" | "corporate";
    email: string,
    mobileNo?: string | null;
    domain?: string | null;
    profilePic?: string | null;
}

export interface InstitutionCreateBody {
    name: string;
    type: "institute" | "corporate";
    email: string;
    password: string;
}

declare module "express" {
    export interface Request {
        user?: User;
        institution?: Institution;
    }
}