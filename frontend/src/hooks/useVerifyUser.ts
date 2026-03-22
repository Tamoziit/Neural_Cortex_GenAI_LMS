import { useState } from "react";
import toast from "react-hot-toast";

const useVerifyUser = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const verifyUser = async (userId: string) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("DN-token");
            const res = await fetch(`${apiUrl}/institution/utils/requests/${userId}/verify`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);

            toast.success("User verified successfully!");
            return true;
        } catch (error: any) {
            toast.error(error.message || "Failed to verify user");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, verifyUser };
};

export default useVerifyUser;
