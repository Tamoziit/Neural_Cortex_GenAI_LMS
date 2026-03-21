import React, { useState, useRef, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import Spinner from "../../components/Spinner";

interface ProfileAvatarProps {
    entity: any;
    isInstitution: boolean;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ entity, isInstitution }) => {
    const [profilePic, setProfilePic] = useState(entity?.profilePic || "");
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!entity?.profilePic) {
            setProfilePic("/placeholder.png");
        } else {
            setProfilePic(entity.profilePic);
        }
    }, [entity, isInstitution]);

    const handleProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setUploading(true);
        const file = e.target.files?.[0];
        if (file) {
            // Mock upload for now
            console.log(file);
            const previewUrl = URL.createObjectURL(file);
            setProfilePic(previewUrl);
        }
        setUploading(false);
    }

    return (
        <div className="glassmorphic p-8 rounded-2xl shadow-xl flex flex-col items-center gap-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-600/80 to-purple-600/80 opacity-80" />

            <div className="relative mt-8">
                <img
                    src={profilePic}
                    alt={isInstitution ? entity.name : entity.username}
                    className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 shadow-xl transition-transform duration-300 group-hover:scale-105 bg-gray-900"
                />

                <label
                    htmlFor="profile-pic-upload"
                    className="absolute bottom-2 right-2 bg-blue-600 p-3 rounded-full cursor-pointer hover:bg-blue-500 transition-colors shadow-lg border-2 border-gray-800 z-10"
                >
                    {uploading ? <Spinner size="small" /> : (
                        <div>
                            <FaPen className="size-4 text-white" />
                            <input
                                type="file"
                                id="profile-pic-upload"
                                className="hidden"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleProfilePicChange}
                            />
                        </div>
                    )}
                </label>
            </div>

            <div className="text-center z-10 w-full mt-2">
                <h2 className="text-2xl font-bold text-white truncate w-full" title={isInstitution ? entity.name : entity.fullName}>
                    {isInstitution ? entity.name : entity.fullName}
                </h2>
                <p className="text-blue-400 font-medium mt-1">
                    {isInstitution ? (entity.type === "institute" ? "Educational Institution" : "Corporate Entity") : `@${entity.username}`}
                </p>
            </div>
        </div>
    );
}

export default ProfileAvatar;
