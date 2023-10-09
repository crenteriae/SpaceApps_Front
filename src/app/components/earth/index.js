"use client";

import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { Spinner } from "@nextui-org/react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from '@react-three/drei';

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
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: '10px',
        borderRadius: '5px',
        width: '240px',     
        maxHeight: '300px',  
        overflow: 'auto',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',  
        fontSize: '14px'    
    },
    listItem: {
        cursor: 'pointer',
        marginBottom: '5px',
        borderBottom: '1px solid rgba(0,0,0,0.1)',  
        padding: '8px 0',    
        transition: 'background-color 0.3s ease', 
        "&:hover": {
            backgroundColor: 'rgba(0,0,0,0.05)'  
        }
    }
};
function handleClickOnFirePoint(fire, camera, controls) {
    const position = new Vector3();
    position.setFromSphericalCoords(
        2.5,
        (Math.PI/2) - fire.latitude * (Math.PI/180),
        (fire.longitude+90) * (Math.PI/180)
    ).multiplyScalar(1.2); 
    camera.position.lerp(position, 1);
    controls.target.lerp(position, 1);
    controls.update();
}

function Moon() {
  const position = new Vector3(18,10,2)
  const moonMesh= useRef();
  const texture = useLoader(TextureLoader, "/assets/MoonTexture.jpg");
  const degreesY = -90;
  const radiansY= degreesY*(Math.PI/80);

  useEffect(() => {
    if (moonMesh.current) {
      moonMesh.current.rotation.y = radiansY;
    }
  }, []);

  return (
    <mesh ref={moonMesh} position={position}>
     <sphereGeometry args={[1.3, 15, 32]}/>
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
      <mesh
        position={position.toArray()}
        onPointerEnter={() => handleHover()}
      >
       < sphereGeometry args={[0.005, 15, 32]} />
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
                const response = await fetch('./Fire.json');
                if (!response.ok) {
                    throw new Error('Respuesta no exitosa');
                }
                const data = await response.json();

                const randomData = [];
                for (let i = 0; i < 50; i++) {
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
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <div style={{ ...styles.container, position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
                <ul>
                    {fireData.map((fire, index) => (
                        <li 
                            key={index} 
                            style={styles.listItem}
                            onClick={() => handleClickOnFirePoint(fire, camera, controls)} 
                        >
                            Firewild detected in: Latitude: {fire.latitude.toFixed(2)}, Longitude: {fire.longitude.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
            <Canvas raycaster={{ threshold: 0.5 }}>
            <Moon />
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
