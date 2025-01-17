"use client";
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';
import TestimonialSlider from '../../components/TestimonialSlider';
import { HiOutlineSpeakerphone } from 'react-icons/hi';

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-primary/30 py-36">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          variants={fadeIn('down', 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="text-center mb-16"
        >
          <div className="inline-block p-4 rounded-full bg-accent/10 mb-6">
            <HiOutlineSpeakerphone className="text-4xl text-accent" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Client <span className="text-accent">Testimonials</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Discover what clients worldwide are saying about their experiences working with me
          </p>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          variants={fadeIn('up', 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="max-w-[1200px] mx-auto"
        >
          <TestimonialSlider />
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;