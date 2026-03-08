"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  HiArrowDown
} from 'react-icons/hi';
import { fadeIn } from "../variants";

// Three.js/WebGL must not run on server (no document/window on Vercel SSR) — load only on client
const ThreeScene = dynamic(() => import("../components/ThreeScene"), {
  ssr: false,
});

const Home = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="h-full md:h-screen">
            <ThreeScene />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto pt-20">
            <motion.div
              className="mb-8"
            >
              <span className="px-6 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium border border-accent/20">
                Software & AI Engineer
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight"
            >
              I am
              <span className="text-accent block mt-2">
                Muhammad Mahad Sheikh
              </span>
            </motion.h1>

            <motion.p
              className="text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Who am I? A resilient, determined, and visionary developer bridging the gap between technology and meaningful impact.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-6 justify-center"
            >
              <a
                href="/about"
                className="btn btn-primary px-10 py-4 rounded-full flex items-center gap-3 group"
              >
                <span>Discover My Story</span>
                <HiArrowDown className="w-5 h-5 -rotate-90 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/Muhammad Mahad Sheikh - CV.pdf"
                download
                className="btn glass px-10 py-4 rounded-full hover:bg-accent/20 flex items-center gap-2"
              >
                <span>Download Resume</span>
              </a>
              <a
                href="/work"
                className="btn glass px-10 py-4 rounded-full hover:bg-accent/20"
              >
                Explore Projects
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
