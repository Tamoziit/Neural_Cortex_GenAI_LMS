import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser, authInstitution, setAuthInstitution } = useAuthContext();
    const apiUrl = import.meta.env.VITE_API_URL;
    const endpoint = authUser ? `${apiUrl}/user/auth/logout/${authUser?._id}` : `${apiUrl}/institution/auth/logout/${authInstitution?._id}`;
    const STORAGE = authUser ? "DN-user" : "DN-institution";

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("DN-token")}`
                }
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("DN-token");
            localStorage.removeItem(STORAGE);
            localStorage.removeItem("DN-expiry");
            setAuthUser(null);
            setAuthInstitution(null);

            if (data) {
                toast.success("Logged out successfully");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                console.log(error);
            }
            else
                console.log("An unknown error occured");
        } finally {
            setLoading(false);
        }
    }

    return { loading, logout };
}

export default useLogout;