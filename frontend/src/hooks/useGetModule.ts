import { useState } from "react";
import toast from "react-hot-toast";
import type { ModuleData } from "../types";

const useGetModule = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const getModule = async (id: string): Promise<ModuleData | null> => {
        setLoading(true);
        try {
            const token = localStorage.getItem("DN-token");
            const res = await fetch(`${apiUrl}/user/learning-path/module/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data as ModuleData;
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                console.log(error);
            } else {
                toast.error("Failed to load module");
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, getModule };
};

export default useGetModule;