"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  HiArrowDown, HiCode, HiOutlineGlobeAlt, HiOutlineLightningBolt,
  HiOutlineClock, HiOutlineChartBar, HiOutlineBriefcase
} from 'react-icons/hi';
import { fadeIn } from "../variants";

// Three.js/WebGL must not run on server (no document/window on Vercel SSR) — load only on client
const ThreeScene = dynamic(() => import("../components/ThreeScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-screen bg-gradient-to-b from-background/80 to-background" />,
});
import statsData from '../data/stats.json';
import servicesData from '../data/services.json';
import timelineData from '../data/timeline.json';

// Calculate dynamic years of experience (starting from 2022)
const calculateExperience = () => {
  const startYear = 2022;
  const currentYear = new Date().getFullYear();
  return Math.max(1, currentYear - startYear + 1);
};

const Home = () => {
  const statsRef = useRef(null);
  const servicesRef = useRef(null);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="h-full md:h-screen">
            <ThreeScene />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 min-h-screen">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen pt-20 lg:pt-0 gap-12">
            {/* Text Content */}
            <motion.div
              variants={fadeIn("right", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="flex-1 text-center lg:text-left max-w-2xl lg:max-w-none"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium inline-block">
                  Full Stack Developer
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                Building Digital
                <span className="text-accent block mt-2">
                  Experiences
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8"
              >
                Passionate about creating innovative solutions and delivering exceptional
                digital experiences. Let's turn your vision into reality.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <a
                  href="/contact"
                  className="btn btn-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center gap-2 group"
                >
                  <span>Start a Project</span>
                  <HiArrowDown className="w-5 h-5 group-hover:animate-bounce" />
                </a>
                <a
                  href="/work"
                  className="btn glass px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-accent/20"
                >
                  View Portfolio
                </a>
              </motion.div>
            </motion.div>

            {/* Visual Content - Hidden on small screens */}
            <motion.div
              variants={fadeIn("left", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="flex-1 relative hidden md:block"
            >
              <div className="relative w-full max-w-[500px] aspect-square mx-auto">
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-full animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent rounded-full animate-pulse delay-75" />

                {/* Floating Icons */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -left-4 top-1/4 glass p-4 rounded-2xl"
                >
                  <HiCode className="text-3xl text-accent" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="absolute -right-4 top-1/2 glass p-4 rounded-2xl"
                >
                  <HiOutlineGlobeAlt className="text-3xl text-accent" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 glass p-4 rounded-2xl"
                >
                  <HiOutlineLightningBolt className="text-3xl text-accent" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator - Hidden on small screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-muted">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-muted rounded-full flex items-center justify-center">
                <motion.div
                  animate={{
                    y: [0, 8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="w-2 h-2 bg-accent rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-b from-background via-background/50 to-background relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statsData.stats.map((stat, index) => {
              // Use dynamic experience calculation for the first stat
              const displayValue = index === 0 ? calculateExperience() : stat.value;

              return (
                <motion.div
                  key={index}
                  variants={fadeIn("up", 0.1 * index)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-accent/50 transition-all duration-300"
                >
                  <div className="text-4xl font-bold text-accent mb-2">
                    {displayValue}{stat.suffix}
                  </div>
                  <div className="text-muted">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section ref={servicesRef} className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Featured <span className="text-accent">Services</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.services.slice(0, 3).map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", 0.1 * index)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="group bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-accent/50 transition-all duration-300"
              >
                <div className="mb-6 w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                  <HiCode className="text-2xl text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="/services"
              className="btn glass px-8 py-4 rounded-full hover:bg-accent/20 inline-flex items-center gap-2"
            >
              View All Services
              <HiArrowDown className="w-5 h-5 rotate-[-90deg]" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Professional <span className="text-accent">Journey</span>
          </motion.h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-border" />

            {/* Timeline Items */}
            {timelineData.timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex md:justify-between items-start mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
              >
                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border hover:border-accent/50 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <HiOutlineBriefcase className="text-accent text-xl" />
                      <h3 className="text-lg font-bold">{item.title}</h3>
                    </div>
                    <p className="text-accent mb-2">{item.company}</p>
                    <p className="text-muted">{item.description}</p>
                  </div>
                </div>

                {/* Year Marker */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-accent/20 border-4 border-accent flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>

                {/* Year */}
                <div className="absolute left-12 md:left-1/2 transform md:translate-x-8 bg-accent/10 px-4 py-1 rounded-full text-sm font-medium text-accent">
                  {item.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
