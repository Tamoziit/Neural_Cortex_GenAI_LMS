import React from 'react';
import { FaEnvelope, FaPhone, FaUserTag, FaGlobe, FaIdBadge } from 'react-icons/fa';

interface ProfileDetailsProps {
    entity: any;
    isInstitution: boolean;
}

const DetailRow = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-full">
        <div className="w-12 h-12 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
            <Icon className="size-5" />
        </div>
        <div className="flex flex-col overflow-hidden w-full">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{label}</span>
            <span className="text-base text-gray-100 font-medium truncate w-full">{value || 'N/A'}</span>
        </div>
    </div>
);

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ entity, isInstitution }) => {
    return (
        <div className="glassmorphic p-8 rounded-2xl shadow-xl h-full flex flex-col w-full">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                {isInstitution ? 'Institution Details' : 'Personal Information'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isInstitution ? (
                    <>
                        <DetailRow icon={FaIdBadge} label="Registered Name" value={entity.name} />
                        <DetailRow icon={FaEnvelope} label="Email Address" value={entity.email} />
                        <DetailRow icon={FaUserTag} label="Entity Type" value={entity.type === 'institute' ? 'Educational Institute' : 'Corporate'} />
                        <DetailRow icon={FaGlobe} label="Domain" value={entity.domain || 'Not configured'} />
                    </>
                ) : (
                    <>
                        <DetailRow icon={FaIdBadge} label="Full Name" value={entity.fullName} />
                        <DetailRow icon={FaUserTag} label="Username" value={`@${entity.username}`} />
                        <DetailRow icon={FaEnvelope} label="Email Address" value={entity.email} />
                        <DetailRow icon={FaPhone} label="Mobile Number" value={entity.mobileNo} />
                        <DetailRow icon={FaUserTag} label="Gender" value={entity.gender === 'M' ? 'Male' : entity.gender === 'F' ? 'Female' : 'Other'} />
                    </>
                )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-blue-400 shrink-0 animate-pulse"></div>
                    <p className="text-sm text-blue-200/80 leading-relaxed">
                        Your profile changes are automatically synced. You are currently logged in as a 
                        <strong className="text-white mx-1">{isInstitution ? 'Verified Institution' : 'Standard User'}</strong>. 
                        For structural changes or deleting your account, please contact support.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;
