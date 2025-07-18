"use client";
import { motion } from "framer-motion";
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import ServiceSlider from "../../components/ServiceSlider";
import { fadeIn } from "../../variants";

const Services = () => {
  return (
    <div className="h-full py-36 flex items-center">
      {/* <Circles /> */}
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-8">
          {/* Header */}
          <div className="text-center">
            <motion.h2
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-8"
            >
              My <span className="text-accent">Services</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="text-muted max-w-[600px] mx-auto mt-4 text-lg"
            >
              Comprehensive solutions tailored to your needs, from web development to AI integration.
              Each service is crafted with attention to detail and industry best practices.
            </motion.p>
          </div>

          {/* Services Grid */}
          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            animate="show"
            className="w-full"
          >
            <ServiceSlider />
          </motion.div>
        </div>
      </div>
      <Bulb />
    </div>
  );
};

export default Services;