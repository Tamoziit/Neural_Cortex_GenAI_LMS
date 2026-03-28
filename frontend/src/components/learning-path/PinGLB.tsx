import { useGLTF } from "@react-three/drei";
import type { PinGLBProps } from "../../types";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const PinGLB = ({ isUnlocked, isCurrent, isNext, isSelected, accentGlow, hovered }: PinGLBProps) => {
	const { scene } = useGLTF("/models/map_pin.glb");
	const groupRef = useRef<THREE.Group>(null!);
	const t = useRef(0);

	// Cloning once per instance, tint materials
	const cloned = useMemo(() => {
		const c = scene.clone(true);
		c.traverse((child) => {
			if ((child as THREE.Mesh).isMesh) {
				const mesh = child as THREE.Mesh;
				const originalMat = mesh.material as THREE.MeshStandardMaterial;
				const mat = originalMat.clone();
				if (isCurrent && isUnlocked) {
					// Current (last unlocked) pin: render gold
					mat.color = new THREE.Color("#FFD700");
					mat.emissive = new THREE.Color("#FFA500");
					mat.roughness = 0.15;
					mat.metalness = 0.85;
					mat.transparent = false;
					mat.opacity = 1;
				} else {
					mat.color = new THREE.Color(isUnlocked ? accentGlow : "#8899aa");
					mat.emissive = new THREE.Color(isUnlocked ? accentGlow : "#334455");
					mat.roughness = 0.22;
					mat.metalness = 0.72;
					mat.transparent = true;
					mat.opacity = isUnlocked ? 1 : 0.55;
				}
				mat.emissiveIntensity = 0;
				mesh.material = mat;
			}
		});
		return c;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scene, accentGlow, isUnlocked, isCurrent, isNext]);

	useFrame((_, delta) => {
		if (!groupRef.current) return;
		t.current += delta;

		// Update emissive intensity on every frame
		cloned.traverse((child) => {
			if ((child as THREE.Mesh).isMesh) {
				const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
				if (isCurrent && isUnlocked) {
					mat.emissiveIntensity = Math.sin(t.current * 1.8) * 0.25 + 0.85;
				} else if (isUnlocked) {
					const pulse = Math.sin(t.current * 2.5) * 0.3 + 0.65;
					mat.emissiveIntensity = isSelected ? 1.6 : hovered ? 1.1 : pulse;
				} else {
					mat.emissiveIntensity = Math.sin(t.current * 1.0) * 0.05 + 0.05;
				}
			}
		});

		// Float bob (unlocked) / slow breathe (locked)
		if (isUnlocked) {
			groupRef.current.position.y = Math.sin(t.current * 1.8) * 0.07;
		} else {
			groupRef.current.position.y = Math.sin(t.current * 0.9) * 0.03;
		}

		// Hover / selected uniform scale — boosted target
		const targetScale = hovered || isSelected ? 1.28 : 1.0;
		const s = groupRef.current.scale.x;
		const lerped = s + (targetScale - s) * (1 - Math.pow(0.008, delta));
		groupRef.current.scale.setScalar(lerped);

		// Current (last unlocked) pin: gentle spin to mark your location
		if (isCurrent && isUnlocked) {
			groupRef.current.rotation.y += delta * 1.3;
		}
	});

	return (
		<group ref={groupRef} scale={0.78}>
			<primitive object={cloned} />
		</group>
	);
}

export default PinGLB;