import { useState, useCallback } from "react";
import toast from "react-hot-toast";

const useGetUserPaths = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const getUserPaths = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("DN-token");
            const res = await fetch(`${apiUrl}/user/learning-path`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);

            return data;
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Failed to fetch learning paths");
            }
            return [];
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    return { loading, getUserPaths };
};

export default useGetUserPaths;
