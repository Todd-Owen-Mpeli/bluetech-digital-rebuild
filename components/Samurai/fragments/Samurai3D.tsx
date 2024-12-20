"use client";

import {FC, useEffect, useRef} from "react";
import * as THREE from "three";
import {ISamurai} from "@/components/Samurai/types/Index";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

const Samurai3D: FC<ISamurai.ISamurai3D> = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (!canvasRef.current) return;

		// Set up the scene
		const canvas = canvasRef.current;
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
		renderer.setSize(window.innerWidth, window.innerHeight);

		// Add OrbitControls for interaction
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.enableZoom = false; // Disable zooming via scroll wheel

		// Load Samurai model
		const loader = new GLTFLoader();
		loader.load(
			"/webgl/assets/models/samurai.glb", // Correct path to Samurai model
			(gltf: any) => {
				const model = gltf.scene;
				model.scale.set(4, 4, 4); // Adjust scale
				model.position.set(0, 0, 0); // Adjust position
				scene.add(model);
			},
			undefined,
			(error: any) => {
				console.error("Error loading GLB model:", error);
			}
		);

		// Set up lighting
		const light = new THREE.AmbientLight("#fafafa", 0.8);
		scene.add(light);
		const directionalLight = new THREE.DirectionalLight("#fafafa", 0.5);
		directionalLight.position.set(5, 5, 5);
		scene.add(directionalLight);

		// Add particles effect
		const particleCount = 1000;
		const particlesGeometry = new THREE.BufferGeometry();
		const particlesMaterial = new THREE.PointsMaterial({
			color: "#8531ed",
			size: 0.02,
		});

		const positions = new Float32Array(particleCount * 3);
		for (let i = 0; i < particleCount * 3; i++) {
			positions[i] = (Math.random() - 0.5) * 10;
		}
		particlesGeometry.setAttribute(
			"position",
			new THREE.BufferAttribute(positions, 3)
		);
		const particles = new THREE.Points(particlesGeometry, particlesMaterial);
		scene.add(particles);

		// Set camera position
		camera.position.z = 5;

		// Handle window resize
		const handleResize = () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		};
		window.addEventListener("resize", handleResize);

		// Animation loop
		const animate = () => {
			requestAnimationFrame(animate);
			particles.rotation.y += 0.001; // Add rotation for particles
			controls.update();
			renderer.render(scene, camera);
		};
		animate();

		// Cleanup on component unmount
		return () => {
			renderer.dispose();
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div style={{width: "100%", height: "100vh"}}>
			<canvas ref={canvasRef} />
		</div>
	);
};

export default Samurai3D;
