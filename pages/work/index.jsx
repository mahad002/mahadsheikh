"use client";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import Bulb from '../../components/Bulb';
import Circles from '../../components/Circles';
import WorkSlider from '../../components/WorkSlider';
import { fadeIn } from '../../variants';
import workData from '../../data/work_data.json';

// Dynamically import WorldAnalytics with no SSR
const WorldAnalytics = dynamic(() => import('../../components/WorldAnalytics'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-muted">Loading visualization...</p>
      </div>
    </div>
  )
});

const Work = () => {
  return (
    <div className='min-h-screen bg-primary/30 py-24 sm:py-32 overflow-hidden'>
      {/* <Circles /> */}
      <div className='container mx-auto px-4'>
        {/* Hero Section */}
        <motion.div
          variants={fadeIn('down', 0.2)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='text-center mb-8 sm:mb-16'
        >
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4'>
            Project <span className='text-accent'>Portfolio</span>
          </h1>
          <p className='text-muted max-w-2xl mx-auto text-sm sm:text-base lg:text-lg'>
            Explore my journey of innovation and collaboration across {workData.metrics.total_projects}+ projects
            with a {workData.metrics.successful_delivery} success rate
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          variants={fadeIn('up', 0.4)}
          initial='hidden'
          animate='show'
          className='mb-12 sm:mb-20'
          style={{ 
            willChange: 'opacity, transform'
          }}
        >
          <WorkSlider />
        </motion.div>

        {/* Analytics Section */}
        <motion.div
          variants={fadeIn('up', 0.6)}
          initial='hidden'
          animate='show'
          exit='hidden'
          className='bg-card rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm border border-border'
          style={{ 
            willChange: 'opacity, transform'
          }}
        >
          <h2 className='text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12'>
            Global <span className='text-accent'>Impact</span>
          </h2>
          <div className='w-full aspect-[16/9] sm:aspect-[2/1] md:aspect-auto md:h-[600px] lg:h-[800px]'>
            <WorldAnalytics />
          </div>
        </motion.div>
      </div>
      <Bulb />
    </div>
  );
};

export default Work;