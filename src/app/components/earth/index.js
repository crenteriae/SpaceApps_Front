"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  Suspense,
  useCallback,
  useLayoutEffect
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
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';



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



function Modis() {
  const CenterDistance = 2.2; 
  const OrbitSpeed = -0.0001;    
  const loader = new GLTFLoader();
  const modisRef = useRef();
  const [model, setModel] = useState(null);

  useLayoutEffect(() => {
    loader.load(
      '/satellite.glb',
      (gltf) => {
        gltf.scene.traverse(child => {
          if (child.isMesh) {
            child.material = new THREE.MeshBasicMaterial({ color: child.material.color });
            child.castShadow = false;
            child.receiveShadow = false;
          }
        });
        setModel(gltf.scene);
      },
      undefined,
      (error) => {
        console.error('Error loading 3d model', error);
      }
    );
  }, []);

  useLayoutEffect(() => {
    if (model && modisRef.current) {
      modisRef.current.add(model);
      model.scale.set(.01, .01, .01);
    }
    return () => {
      if (model && modisRef.current) {
        modisRef.current.remove(model);
      }
    }
  }, [model]);

  useFrame(() => {
    if (modisRef.current) {
        const angle = Date.now() * OrbitSpeed;
        const x = CenterDistance * Math.cos(angle);
        const z = CenterDistance * Math.sin(angle);

        modisRef.current.position.set(x, 1, z); 
    }
  });

  return <group ref={modisRef} />;
}




function Moon() {
  const position = new Vector3(18, 10, 2);
  const moonMesh = useRef();
  const texture = useLoader(TextureLoader, "/assets/MoonTexture.jpg");
  const degreesY = -90;
  const radiansY = degreesY * (Math.PI / 80);

  useEffect(() => {
    if (moonMesh.current) {
      moonMesh.current.rotation.y = radiansY;
    }
  }, []);

  return (
    <mesh ref={moonMesh} position={position}>
      <sphereGeometry args={[1.3, 15, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

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
      <mesh position={position.toArray()} onPointerEnter={() => handleHover()}>
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

function Stars({ count = 10000 }) {
  const { scene } = useThree();
  const minRadius = 20;
  const maxRadius = 50;

  const vertices = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = minRadius + Math.random() * (maxRadius - minRadius);
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    const material = new THREE.PointsMaterial({ size: 0.1, color: "white" });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    return () => {
      scene.remove(points);
      geometry.dispose();
      material.dispose();
    };
  }, [count, scene]);

  return null;
}

const MemoizedFirePoint = React.memo(FirePoint);

function RotatingEarth({ fireData }) {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, "/assets/EarthTexture.jpg");

  const [hoverChange, setHoverChange] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0009;
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
        className="w-1/4"
        style={{
          ...styles.container,
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1,
        }}
      >
        <ul>
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
        </ul>
      </div>
      <Canvas raycaster={{ threshold: 0.5 }}>
        <Moon />
        <Modis />
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
            autoRotate={false}
            autoRotateSpeed={0.5}
            minDistance={2.5}
            maxDistance={8}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
