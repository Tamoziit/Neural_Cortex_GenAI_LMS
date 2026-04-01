const FallbackPin = ({ isUnlocked, accentGlow }: { isUnlocked: boolean; accentGlow: string }) => {
    return (
        <mesh>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial
                color={isUnlocked ? accentGlow : "#1e293b"}
                emissive={isUnlocked ? accentGlow : "#000"}
                emissiveIntensity={isUnlocked ? 0.8 : 0}
            />
        </mesh>
    );
}

export default FallbackPin;