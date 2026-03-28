import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import PinGLB from "./PinGLB";
import FallbackPin from "./FallbackPin";
import type { MapPinModelProps } from "../../types";

useGLTF.preload("/models/map_pin.glb");

const MapPinModel = ({
	isUnlocked,
	isCurrent,
	isNext,
	isSelected,
	accentGlow,
	hovered,
}: MapPinModelProps) => {
	return (
		<div style={{ width: 130, height: 160, pointerEvents: "none" }} className="z-90">
			<Canvas
				camera={{ position: [0, 0.4, 2.1], fov: 42 }}
				gl={{ antialias: true, alpha: true }}
				style={{ width: "100%", height: "100%" }}
			>
				{/* Ambient — brighter for unlocked */}
				<ambientLight intensity={isUnlocked ? 0.7 : 0.3} />

				{/* Key light */}
				<directionalLight position={[2, 4, 3]} intensity={1.5} color="#ffffff" />

				{/* Accent fill — rim light from below/side using module colour */}
				<directionalLight
					position={[-2, -1.5, 1.5]}
					intensity={isUnlocked ? 0.8 : 0.2}
					color={accentGlow}
				/>

				{/* Point light for glow halo */}
				<pointLight
					position={[0, 1.5, 1.5]}
					intensity={isCurrent && isUnlocked ? 2.8 : isUnlocked ? 2.2 : 0.6}
					color={isCurrent && isUnlocked ? "#FFD700" : accentGlow}
					distance={10}
					decay={2}
				/>

				<Suspense fallback={<FallbackPin isUnlocked={isUnlocked} accentGlow={accentGlow} />}>
					<PinGLB
						isUnlocked={isUnlocked}
						isCurrent={isCurrent}
						isNext={isNext}
						isSelected={isSelected}
						accentGlow={accentGlow}
						hovered={hovered}
					/>
				</Suspense>
			</Canvas>
		</div>
	);
}

export default MapPinModel;