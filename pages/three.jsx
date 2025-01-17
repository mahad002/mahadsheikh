"use client";
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import Link from 'next/link';

// Dynamically import ThreeScene with no SSR
const ThreeScene = dynamic(() => import('../components/ThreeScene'), {
  ssr: false,
});

export default function ThreePage() {
  return (
    <div className="relative w-full h-screen bg-background">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-4 left-4 z-10"
      >
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-lg border border-border hover:border-accent/50 transition-all duration-300"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </Link>
      </motion.div>

      {/* Loading Message */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center bg-background z-20"
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-lg">Loading Experience...</p>
        </div>
      </motion.div>

      {/* Three.js Scene */}
      <ThreeScene />

      {/* Overlay Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-10"
      >
        <p className="text-sm text-muted mb-2">Click and drag to explore</p>
        <p className="text-xs text-muted">Created with Three.js</p>
      </motion.div>
    </div>
  );
}