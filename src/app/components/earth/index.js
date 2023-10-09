"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  Suspense,
  useCallback,
} from "react";
import {
  Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import axios from "axios";

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

const styles = {
  container: {
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: "10px",
    borderRadius: "5px",
    maxHeight: "300px",
    overflow: "auto",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
    fontSize: "14px",
  },
  listItem: {
    cursor: "pointer",
    marginBottom: "5px",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    padding: "8px 0",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.05)",
    },
  },
};

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
        intensity={parseFloat(info) / 1000}
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

const MemoizedFirePoint = React.memo(FirePoint);

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
        <MemoizedFirePoint
          key={index}
          lat={fire.latitude}
          long={fire.longitude}
          info={fire.bright_ti5.toString()}
          setHoverChange={setHoverChange}
          hoverChange={hoverChange}
        />
      ))}
    </mesh>
  );
}

export default function Earth() {
  const [fireData, setFireData] = useState([]);
  const [fireRate, setFireRate] = useState("loading");

  const getFireRate = async (lat, lot) => {
    const response = await axios.get(
      `https://flamefox.azurewebsites.net/api/prediction/fire_rate?latitude=${lat}&longitude=${lot}`
    );
    const data = response.data;
    //console.log(data.data);
    setFireRate(data.data.toString());
  };

  const handleClickOnFirePoint = (fire) => {
    setFireRate("loading...");
    getFireRate(fire.latitude, fire.longitude);
  };

  const fetchData = useCallback(async () => {
    try {
      let limit = 100;
      const response = await axios.get(
        `http://localhost:1080/api/live?limit=${limit}`
      );
      if (response.status !== 200) {
        throw new Error("Respuesta no exitosa");
      }
      const data = await response.data;
      setFireData(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error.message);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <div
        style={{
          ...styles.container,
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1,
        }}
        className="w-1/3 p-5"
      >
        {fireData.map((fire, index) => (
          <Popover placement="right" key={index}>
            <PopoverTrigger>
              <Button
                className="w-full h-full p-4 my-2 flex flex-col items-start"
                onPress={() => handleClickOnFirePoint(fire)}
              >
                <h1 className="font-bold">Wildfire detected</h1>
                <p className="text-left">Latitude: {fire.latitude}</p>
                <p>Longitude: {fire.longitude}</p>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-small font-bold">
                  The fire has an aproximated rate in km/h of
                </div>
                <div className="text-tiny">{fireRate}</div>
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
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
    </div>
  );
}
