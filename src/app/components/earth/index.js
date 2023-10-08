"use client";
import { useState, useEffect, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader, Vector3, Color, Backside } from 'three';
import { OrbitControls, Html } from '@react-three/drei';

function FirePoint({ lat, long, info }) {
    const [hovered, setHovered] = useState(false);
    const position = new Vector3();
    const radius = 1.0;
    position.setFromSphericalCoords(
        radius,
        (Math.PI / 2) - lat * (Math.PI / 180),
        (long+90) * (Math.PI / 180)
    );

    return (
        <>
        <mesh 
            position={position.toArray()} 
            onPointerOver={() => setHovered(true)} 
            onPointerOut={() => setHovered(false)} 
        >
            <sphereGeometry args={[0.005, 15, 32]} />
            <meshPhongMaterial color={new Color('yellow')} emissive={new Color('yellow')} />
            {hovered && (
                <Html distanceFactor={10}>
                    <div style={{background: 'white', padding: '0.5em'}}>
                        {info}
                    </div>
                </Html>
            )}
        </mesh>
        <pointLight position={position.toArray()} color={new Color('yellow')} distance={0.1} intensity={.03} />
        </>
    );
}

function RotatingEarth({fireData}) {
    const meshRef = useRef();
    const texture = useLoader(TextureLoader, '/assets/EarthTexture.jpg');

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.003;
        }
    });

    return (
        <mesh ref={meshRef} scale={2}>
            <sphereGeometry />
            <meshStandardMaterial map={texture} />
            {fireData.map((fire, index) => (
                <FirePoint key={index} lat={fire.latitude} long={fire.longitude} info={fire.brightness.toString()} />
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
                for (let i = 0; i < 10; i++) {
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
        <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight intensity={80} position={[5, 0, 0]} />
            <RotatingEarth fireData={fireData} />
            <OrbitControls 
                enableZoom={true} 
                enableRotate={true} 
                autoRotate={true}
                autoRotateSpeed={0.5}
                minDistance={3}
                maxDistance={7}
            />
        </Canvas>
    );
}