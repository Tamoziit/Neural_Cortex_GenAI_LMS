import { useState } from "react";
import toast from "react-hot-toast";
import type { CreateInstitutionParams } from "../types";
import { useAuthContext } from "../context/AuthContext";

const useCreateInstitution = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    const { setAuthInstitution } = useAuthContext();

    const createInstitution = async ({
        name,
        type,
        email,
        password
    }: CreateInstitutionParams) => {
        const success = handleInputErrors({
            name,
            type,
            email,
            password
        });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/institution/auth/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, type, email, password })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Storing user data with expiry
            const now = new Date().getTime();
            const expiry = now + 30 * 24 * 60 * 60 * 1000; // 30 days

            localStorage.setItem("DN-token", data.token);
            localStorage.setItem("DN-institution", JSON.stringify(data));
            localStorage.setItem("DN-expiry", expiry.toString());
            setAuthInstitution(data);

            if (data) {
                toast.success("Institution created successfully");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Failed to create institution");
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, createInstitution };
};

export default useCreateInstitution;


function handleInputErrors({
    name,
    type,
    email,
    password
}: CreateInstitutionParams) {
    if (!name || !type || !email || !password) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (name.length < 2) {
        toast.error("Name should be atleast 2 characters long");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password should be atleast 6 characters long");
        return false;
    }

    if (type !== "corporate" && type !== "institute") {
        toast.error("Specify a valid affiliation");
        return false;
    }

    return true;
}