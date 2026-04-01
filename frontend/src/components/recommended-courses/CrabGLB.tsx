import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef } from "react";

const CrabGLB = ({ walking }: { walking: boolean }) => {
	const { scene, animations } = useGLTF("/models/crab.glb");
	const groupRef = useRef<THREE.Group>(null!);
	const { actions, names } = useAnimations(animations, groupRef);
	const tRef = useRef(0);

	// Play correct animations based on 'walking' state
	useEffect(() => {
		if (names.length === 0) return;

		const walkAnimName = names[1]
		const idleAnimName = names[0];

		const walkClip = actions[walkAnimName];
		const idleClip = actions[idleAnimName];

		if (walking) {
			if (idleClip && idleAnimName !== walkAnimName) idleClip.stop();
			if (walkClip) {
				walkClip.paused = false;
				walkClip.setEffectiveTimeScale(1.8); // Speed up walk a bit if needed
				walkClip.reset().setLoop(THREE.LoopRepeat, Infinity).play();
			}
		} else {
			if (walkClip && idleAnimName !== walkAnimName) walkClip.stop();
			if (idleClip) {
				idleClip.paused = false;
				idleClip.setEffectiveTimeScale(1);
				idleClip.reset().setLoop(THREE.LoopRepeat, Infinity).play();
			} else if (walkClip) {
				walkClip.paused = true;
			}
		}

		return () => {
			if (walkClip) walkClip.stop();
			if (idleClip) idleClip.stop();
		};
	}, [actions, names, walking]);

	useFrame((_, delta) => {
		if (!groupRef.current) return;
		tRef.current += delta;
		const hasIdleAnim = names.some(n => n.toLowerCase().includes("idle"));
		if (!walking && !hasIdleAnim) {
			groupRef.current.position.y = Math.sin(tRef.current * 2) * 0.04;
		} else if (!walking) {
			groupRef.current.position.y = 0; // reset y if using actual idle animation
		}
	});

	return (
		<group ref={groupRef} scale={10} position={[0, -1.2, 0]}>
			<primitive object={scene} />
		</group>
	);
}

export default CrabGLB;