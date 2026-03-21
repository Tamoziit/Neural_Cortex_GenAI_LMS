import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import type { LoginParams } from "../types";

export type LoginType = "individual" | "institution";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser, setAuthInstitution } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;

    const login = async ({ email, password }: LoginParams, type: LoginType = "individual") => {
        const success = handleInputErrors({ email, password });

        if (!success) return;

        setLoading(true);
        try {
            const endpoint = type === "institution" ? `${apiUrl}/institutions/login` : `${apiUrl}/auth/login`;
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            // Storing user data with expiry
            const now = new Date().getTime();
            const expiry = now + 30 * 24 * 60 * 60 * 1000; // 30 days

            localStorage.setItem("DN-token", data.token);
            if (type === "institution") {
                localStorage.setItem("DN-institution", JSON.stringify(data));
                setAuthInstitution?.(data);
            } else {
                localStorage.setItem("DN-user", JSON.stringify(data));
                setAuthUser?.(data);
            }
            localStorage.setItem("DN-expiry", expiry.toString());

            if (data) {
                toast.success("Logged in successfully");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                console.log(error);
            } else {
                console.log("An unknown error occurred", error);
            }
        } finally {
            setLoading(false);
        }
    }

    return { loading, login }
}

export default useLogin;


function handleInputErrors({ email, password }: LoginParams) {
    if (!email || !password) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (password.length < 6) {
        toast.error("password should be atleast 6 characters long");
        return false;
    }

    return true;
}