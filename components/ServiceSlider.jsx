"use client";
import { motion } from 'framer-motion';
import { useTheme } from '../components/ThemeProvider';
import { RxArrowTopRight } from "react-icons/rx";
import { CgWebsite } from "react-icons/cg";
import { RxCode, RxMobile } from "react-icons/rx";
import { FaCogs, FaUserCog, FaNetworkWired } from "react-icons/fa";
import { LuTestTube2, LuBrain } from "react-icons/lu";
import { GiArtificialIntelligence } from "react-icons/gi";

// Import services data
import servicesData from '../data/services.json';

const iconComponents = {
  CgWebsite,
  RxCode,
  RxMobile,
  FaCogs,
  LuTestTube2,
  FaNetworkWired,
  FaUserCog,
  GiArtificialIntelligence,
  LuBrain,
};

const ServiceSlider = () => {
  const { theme } = useTheme();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {servicesData.services.map((service, index) => {
        const IconComponent = iconComponents[service.icon] || RxCode;
        return (
          <motion.div
            key={index}
            variants={item}
            className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-500"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative p-8">
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                  <IconComponent className={`text-3xl ${theme === 'light' ? 'text-accent/90' : 'text-accent'}`} />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-4 text-text group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted mb-6 line-clamp-3">
                {service.description}
              </p>

              {/* Learn More Link */}
              <div className="flex items-center text-sm font-semibold text-accent opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <span className="mr-2">Learn More</span>
                <RxArrowTopRight className="text-lg transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/50 rounded-2xl transition-all duration-500" />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ServiceSlider;