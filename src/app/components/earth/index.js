"use client";
import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { Spinner } from "@nextui-org/react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  TextureLoader,
  Vector3,
  Color,
  Backside,
  Points,
  BufferGeometry,
  Float32BufferAttribute,
  PointsMaterial,
} from "three";
import { OrbitControls, Html } from "@react-three/drei";

function FirePoint({ lat, long, info, setHoverChange, hoverChange }) {
  const [hovered, setHovered] = useState(false);
  const position = new Vector3();
  const radius = 1.0;
  position.setFromSphericalCoords(
    radius,
    Math.PI / 2 - lat * (Math.PI / 180),
    (long + 90) * (Math.PI / 180)
  );
  if (hovered && !hoverChange) {
    setHovered(false);
  }
  const handleHover = () => {
    if (!hovered) {
      if (hoverChange) {
        setHoverChange(false);
        setHovered(true);
      } else {
        setHoverChange(true);
        setHovered(true);
      }
    }
  };

  return (
    <>
      <mesh
        position={position.toArray()}
        //onPointerOver={() => handleHover()}
        onPointerEnter={() => handleHover()}
      >
        <sphereGeometry args={[0.005, 15, 32]} />
        <meshPhongMaterial
          color={new Color("yellow")}
          emissive={new Color("yellow")}
        />
        {hovered && (
          <Html distanceFactor={3}>
            <div className="bg-white p-1 rounded-lg shadow-lg">{info}</div>
          </Html>
        )}
      </mesh>
      <pointLight
        position={position.toArray()}
        color={new Color("yellow")}
        distance={0.1}
        intensity={0.03}
      />
    </>
  );
}

function Stars({ count = 5000 }) {
  const { scene } = useThree();
  const vertices = useMemo(() => {
    const positions = new Float32Array(count * 3); // 3 vertices per point
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100; // a random position within a 100x100x100 cube
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    const material = new THREE.PointsMaterial({ size: 0.1, color: "white" });
    const points = new THREE.Points(geometry, material);
    scene.add(points); // Add points to the scene
    return () => {
      scene.remove(points); // Clean up points from scene on unmount
      geometry.dispose();
      material.dispose();
    };
  }, [count, scene]);

  return null; // Return null as we are directly mutating the scene, and not rendering anything through React's render
}

function RotatingEarth({ fireData }) {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, "/assets/EarthTexture.jpg");

  const [hoverChange, setHoverChange] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0;
    }
  });

  return (
    <mesh ref={meshRef} scale={2}>
      <Stars />
      <sphereGeometry />
      <meshStandardMaterial map={texture} />
      {fireData.map((fire, index) => (
        <FirePoint
          key={index}
          lat={fire.latitude}
          long={fire.longitude}
          info={fire.brightness.toString()}
          setHoverChange={setHoverChange}
          hoverChange={hoverChange}
        />
      ))}
    </mesh>
  );
}

export default function Earth() {
  const [fireData, setFireData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("./Fire.json");
        if (!response.ok) {
          throw new Error("Respuesta no exitosa");
        }
        const data = await response.json();

        const randomData = [];
        for (let i = 0; i < 20; i++) {
          const randomIndex = Math.floor(Math.random() * data.length);
          randomData.push(data[randomIndex]);
        }

        setFireData(randomData);
      } catch (error) {
        console.error("Error al obtener los datos:", error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <Canvas raycaster={{ threshold: 0.5 }}>
      <Suspense
        fallback={
          <Html>
            <Spinner />
          </Html>
        }
      >
        <ambientLight intensity={0.5} />
        <pointLight intensity={80} position={[5, 0, 0]} />
        <RotatingEarth fireData={fireData} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          minDistance={2.5}
          maxDistance={8}
        />
      </Suspense>
    </Canvas>
  );
}
