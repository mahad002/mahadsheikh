"use client";
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from './ThemeProvider';
import clientReviews from '../data/Client_Reviews.json';

// World map texture URL from a reliable CDN
const WORLD_TEXTURE_URL = 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg';

// Country coordinates mapping
const COUNTRY_COORDINATES = {
  "United States": { lat: 37.0902, lon: -95.7129 },
  "United Kingdom": { lat: 55.3781, lon: -3.4360 },
  "Canada": { lat: 56.1304, lon: -106.3468 },
  "Australia": { lat: -25.2744, lon: 133.7751 },
  "India": { lat: 20.5937, lon: 78.9629 },
  "United Arab Emirates": { lat: 23.4241, lon: 53.8478 },
  "Qatar": { lat: 25.3548, lon: 51.1839 },
  "Malaysia": { lat: 4.2105, lon: 101.9758 },
  "France": { lat: 46.2276, lon: 2.2137 },
  "Germany": { lat: 51.1657, lon: 10.4515 },
  "Austria": { lat: 47.5162, lon: 14.5501 },
  "Norway": { lat: 60.4720, lon: 8.4689 },
  "Thailand": { lat: 15.8700, lon: 100.9925 },
  "Hong Kong": { lat: 22.3193, lon: 114.1694 },
  "South Korea": { lat: 35.9078, lon: 127.7669 },
  "Israel": { lat: 31.0461, lon: 34.8516 },
  "Morocco": { lat: 31.7917, lon: -7.0926 },
  "Egypt": { lat: 26.8206, lon: 30.8025 },
  "Zambia": { lat: -13.1339, lon: 27.8493 },
  "Portugal": { lat: 39.3999, lon: -8.2245 },
  "Pakistan": { lat: 30.3753, lon: 69.3451 }
};

// Convert lat/lon to 3D coordinates
function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Process client data
function useClientData() {
  return useMemo(() => {
    const reviews = clientReviews.reviews;
    const countryStats = reviews.reduce((acc, review) => {
      const country = review.country;
      if (!acc[country]) {
        acc[country] = {
          count: 0,
          totalRating: 0,
          reviews: [],
          code: review.country_code,
          coordinates: COUNTRY_COORDINATES[country]
        };
      }
      acc[country].count++;
      acc[country].totalRating += review.rating;
      acc[country].reviews.push(review);
      return acc;
    }, {});

    return Object.entries(countryStats).map(([country, data]) => ({
      country,
      code: data.code,
      count: data.count,
      avgRating: (data.totalRating / data.count).toFixed(1),
      reviews: data.reviews,
      coordinates: data.coordinates
    }));
  }, []);
}

// Interactive Globe component
function InteractiveGlobe({ clientData, onCountryClick }) {
  const { theme } = useTheme();
  const globeRef = useRef();

  // Calculate max orders for scaling
  const maxOrders = Math.max(...clientData.map(country => country.count));

  // Create materials with world map texture
  const materials = useMemo(() => {
    const textureLoader = new THREE.TextureLoader();
    const worldTexture = textureLoader.load(WORLD_TEXTURE_URL);
    worldTexture.colorSpace = THREE.SRGBColorSpace;

    return {
      globe: new THREE.MeshStandardMaterial({
        map: worldTexture,
        color: theme === 'dark' ? '#ffffff' : '#f0f0f0',
        metalness: 0.0,
        roughness: 0.6,
        transparent: true,
        opacity: 0.9
      }),
      points: new THREE.PointsMaterial({
        size: 0.05,
        color: theme === 'dark' ? '#60A5FA' : '#3B82F6',
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
      })
    };
  }, [theme]);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Base sphere */}
      <mesh material={materials.globe}>
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>

      {/* Country markers */}
      {clientData.map((country, index) => {
        if (!country.coordinates) return null;

        const position = latLonToVector3(
          country.coordinates.lat,
          country.coordinates.lon,
          1.1
        );

        const markerSize = 0.02 + (country.count / maxOrders) * 0.06;

        return (
          <group key={index} position={position}>
            <mesh onClick={() => onCountryClick(country)}>
              <sphereGeometry args={[markerSize * 0.5, 16, 16]} />
              <meshBasicMaterial color={theme === 'dark' ? '#60A5FA' : '#3B82F6'} />
            </mesh>
            <Billboard
              follow={true}
              lockX={false}
              lockY={false}
              lockZ={false}
            >
              <Text
                fontSize={0.06}
                color={theme === 'dark' ? '#60A5FA' : '#3B82F6'}
                anchorX="center"
                anchorY="bottom"
                outlineWidth={0.001}
                outlineColor={theme === 'dark' ? '#000000' : '#ffffff'}
              >
                {`${country.country} (${country.count})`}
              </Text>
            </Billboard>
          </group>
        );
      })}
    </group>
  );
}

// Stats component
function Stats({ data }) {
  const totalReviews = useMemo(() => 
    data.reduce((sum, country) => sum + country.count, 0), [data]
  );
  
  const avgRating = useMemo(() => {
    const total = data.reduce((sum, country) => 
      sum + (parseFloat(country.avgRating) * country.count), 0
    );
    return (total / totalReviews).toFixed(1);
  }, [data, totalReviews]);

  return (
    <div className="absolute top-4 left-4 space-y-2">
      <div className="glass p-4 rounded-lg">
        <div className="text-sm text-muted">Total Reviews</div>
        <div className="text-2xl font-bold text-accent">{totalReviews}</div>
      </div>
      <div className="glass p-4 rounded-lg">
        <div className="text-sm text-muted">Average Rating</div>
        <div className="text-2xl font-bold text-accent">{avgRating}</div>
      </div>
      <div className="glass p-4 rounded-lg">
        <div className="text-sm text-muted">Countries</div>
        <div className="text-2xl font-bold text-accent">{data.length}</div>
      </div>
    </div>
  );
}

// Main component
export default function WorldAnalytics() {
  const [isClient, setIsClient] = useState(false);
  const clientData = useClientData();
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCountryClick = (country) => {
    console.log('Country clicked:', country);
  };

  // Don't render on server
  if (!isClient) {
    return (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-muted">Loading visualization...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[300px]">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <InteractiveGlobe clientData={clientData} onCountryClick={handleCountryClick} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          minDistance={1.5}
          maxDistance={4}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      <Stats data={clientData} />
    </div>
  );
}