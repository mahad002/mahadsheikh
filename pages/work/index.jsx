"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Bulb from '../../components/Bulb';
import WorkSlider from '../../components/WorkSlider';
import { fadeIn } from '../../variants';
import workData from '../../data/work_data.json';

const WorldAnalytics = dynamic(() => import('../../components/WorldAnalytics'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const Work = () => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  return (
    <div className='min-h-screen bg-primary/30 py-24 sm:py-32 overflow-hidden'>
      <div className='container mx-auto px-4'>
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

        <motion.div
          variants={fadeIn('up', 0.4)}
          initial='hidden'
          animate='show'
          className='mb-12 sm:mb-20'
        >
          <WorkSlider />
        </motion.div>

        {/* Analytics: load only when user opts in (saves ~3D bundle on initial /work load) */}
        <motion.div
          variants={fadeIn('up', 0.6)}
          initial='hidden'
          animate='show'
          className='bg-card rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm border border-border'
        >
          <h2 className='text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12'>
            Global <span className='text-accent'>Impact</span>
          </h2>
          {!showAnalytics ? (
            <div className='w-full aspect-video sm:h-[400px] flex items-center justify-center'>
              <button
                type='button'
                onClick={() => setShowAnalytics(true)}
                className='btn btn-primary px-8 py-4 rounded-full'
              >
                Load global impact visualization
              </button>
            </div>
          ) : (
            <div className='w-full aspect-[16/9] sm:aspect-[2/1] md:aspect-auto md:h-[600px] lg:h-[800px]'>
              <WorldAnalytics />
            </div>
          )}
        </motion.div>
      </div>
      <Bulb />
    </div>
  );
};

export default Work;