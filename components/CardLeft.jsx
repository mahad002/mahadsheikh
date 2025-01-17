"use client";
import { motion } from 'framer-motion';
import { fadeIn } from '../variants';

const CardLeft = ({ title, description, icon }) => {
  return (
    <motion.div
      variants={fadeIn('right', 0.2)}
      initial='hidden'
      animate='show'
      exit='hidden'
      className='flex flex-col items-center text-center'
    >
      <div className='mb-4'>{icon}</div>
      <h3 className='text-xl font-bold mb-2'>{title}</h3>
      <p className='max-w-md'>{description}</p>
    </motion.div>
  );
};

export default CardLeft;