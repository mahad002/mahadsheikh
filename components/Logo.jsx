"use client";
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="ezQygqV570B1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 270 24"
      className="w-auto h-6 sm:h-7 md:h-8" // Adjusted height for responsive design
    >
      <text
        dx="0"
        dy="0"
        fontFamily="Roboto"
        fontSize="15"
        fontWeight="700"
        transform="matrix(1.471343 0 0 1.471343 6.285102 20.973783)"
        fill="currentColor"
        strokeWidth="0"
      >
        muhammad
      </text>
      <text
        dx="0"
        dy="0"
        fontFamily="Roboto"
        fontSize="15"
        fontWeight="700"
        transform="matrix(1.450704 0 0 1.450704 127.111577 20.899324)"
        fill="rgb(var(--color-muted))"
        strokeWidth="0"
      >
        mahad
      </text>
      <text
        dx="0"
        dy="0"
        fontFamily="Roboto"
        fontSize="15"
        fontWeight="400"
        transform="matrix(1.420838 0 0 1.420838 196.374075 20.749512)"
        fill="currentColor"
        strokeWidth="0"
      >
        sheikh
      </text>
      <text
        dx="0"
        dy="0"
        fontFamily="Roboto"
        fontSize="7.35"
        fontWeight="400"
        transform="matrix(4.943866 0 0 7.100514 258.049798 22.658343)"
        fill="rgb(var(--color-accent))"
        strokeWidth="0"
      >
        .
      </text>
    </motion.svg>
  );
};

export default Logo;