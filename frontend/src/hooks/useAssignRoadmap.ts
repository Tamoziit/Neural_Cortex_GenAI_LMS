import { useState } from "react";
import toast from "react-hot-toast";

const useAssignRoadmap = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const assignRoadmap = async (memberId: string, role: string) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("DN-token");
            const res = await fetch(`${apiUrl}/institution/roadmap/assign-roadmap`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ memberId, role })
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            toast.success("Roadmap assigned successfully");
            return data;
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                console.log(error);
            } else {
                console.log("An unknown error occurred", error);
                toast.error("An unknown error occurred");
            }
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { loading, assignRoadmap };
};

export default useAssignRoadmap;
