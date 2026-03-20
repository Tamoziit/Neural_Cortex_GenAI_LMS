/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import type { AuthContextProviderProps, AuthContextType, AuthUser, AuthInstitution } from "../types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
};

const getStoredUser = (): AuthUser | null => {
    const expiry = localStorage.getItem("DN-expiry");
    const now = new Date().getTime();

    if (!expiry || now > parseInt(expiry)) {
        localStorage.removeItem("DN-user");
        localStorage.removeItem("DN-token");
        localStorage.removeItem("DN-expiry");
        return null;
    }

    const user = localStorage.getItem("DN-user");
    return user ? JSON.parse(user) : null;
};

const getStoredInstitution = (): AuthInstitution | null => {
    const expiry = localStorage.getItem("DN-expiry");
    const now = new Date().getTime();

    if (!expiry || now > parseInt(expiry)) {
        localStorage.removeItem("DN-institution");
        localStorage.removeItem("DN-token");
        localStorage.removeItem("DN-expiry");
        return null;
    }

    const institution = localStorage.getItem("DN-institution");
    return institution ? JSON.parse(institution) : null;
};

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [authUser, setAuthUser] = useState<AuthUser | null>(getStoredUser());
    const [authInstitution, setAuthInstitution] = useState<AuthInstitution | null>(getStoredInstitution());

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, authInstitution, setAuthInstitution }}>
            {children}
        </AuthContext.Provider>
    );
};
