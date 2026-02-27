"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import CountUp from "react-countup";
import { useTheme } from '../../components/ThemeProvider';
import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";
import { fadeIn } from "../../variants";

// Import data
import skillsData from '../../data/skills.json';
import awardsData from '../../data/awards.json';
import experienceData from '../../data/experience.json';
import credentialsData from '../../data/credentials.json';
import statsData from '../../data/stats.json';

// Calculate dynamic years of experience (starting from 2022)
const calculateExperience = () => {
  const startYear = 2022;
  const currentYear = new Date().getFullYear();
  return Math.max(1, currentYear - startYear + 1);
};

// Import specific icon sets
import { FaHtml5, FaCss3, FaJs, FaReact, FaWordpress, FaFigma, FaDocker, 
  FaJava, FaPython, FaNodeJs, FaAngular, FaSketch, FaInvision, FaSwift, 
  FaPhp, FaLaravel, FaAws, FaMicrosoft, FaBootstrap, FaCode } from 'react-icons/fa';
import { SiNextdotjs, SiFramer, SiAdobelightroom, SiAdobephotoshop, 
  SiCanva, SiMysql, SiPostgresql, SiCplusplus, SiFirebase, SiSupabase, 
  SiKubernetes, SiJenkins, SiSelenium, SiCypress, SiExpress, SiTailwindcss, 
  SiKotlin, SiRubyonrails, SiTerraform, SiMocha, SiJest, SiMongodb, 
  SiRedis, SiAmazondynamodb, SiTensorflow, SiPytorch, SiScikitlearn, 
  SiKeras, SiOpenai } from 'react-icons/si';
import { RiFlutterFill, RiVuejsLine } from 'react-icons/ri';
import { IoLogoFirebase } from 'react-icons/io5';
import { DiDatabase } from 'react-icons/di';
import { AiOutlineGitlab } from 'react-icons/ai';

// Icon mapping
const iconComponents = {
  FaHtml5, FaCss3, FaJs, FaReact, FaWordpress, FaFigma, FaDocker, 
  FaJava, FaPython, FaNodeJs, FaAngular, FaSketch, FaInvision, 
  FaSwift, FaPhp, FaLaravel, FaAws, FaMicrosoft, FaBootstrap, FaCode,
  SiNextdotjs, SiFramer, SiAdobelightroom, SiAdobephotoshop, 
  SiCanva, SiMysql, SiPostgresql, SiCplusplus, SiFirebase, 
  SiSupabase, SiKubernetes, SiJenkins, SiSelenium, SiCypress, 
  SiExpress, SiTailwindcss, SiKotlin, SiRubyonrails, SiTerraform, 
  SiMocha, SiJest, SiMongodb, SiRedis, SiAmazondynamodb, 
  SiTensorflow, SiPytorch, SiScikitlearn, SiKeras, SiOpenai,
  RiFlutterFill, RiVuejsLine, IoLogoFirebase, DiDatabase, AiOutlineGitlab
};

const aboutData = [
  {
    title: "skills",
    info: skillsData.categories
  },
  {
    title: "awards",
    info: awardsData.awards.map(award => ({
      title: award.title,
      stage: award.year
    }))
  },
  {
    title: "experience",
    info: experienceData.experience.map(exp => ({
      title: `${exp.title} - ${exp.company}`,
      stage: exp.period
    }))
  },
  {
    title: "credentials",
    info: credentialsData.credentials.map(cred => ({
      title: `${cred.title} - ${cred.institution}`,
      stage: cred.year
    }))
  }
];

const About = () => {
  const [index, setIndex] = useState(0);
  const { theme } = useTheme();

  const getIconComponent = (iconName) => {
    return iconComponents[iconName] || iconComponents.FaCode;
  };

  return (
    <div className="h-full py-32 text-center xl:text-left">
      <Circles />

      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="hidden xl:flex absolute bottom-0 -left-[370px]"
      >
        <Avatar />
      </motion.div>

      <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6">
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2"
          >
            Visioning <span className="text-accent">practical</span> building
            to prove.
          </motion.h2>
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            className="max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0 text-muted"
          >
            1 year ago, I began freelancing as a developer. Since then, I've
            done remote work for agencies, consulted for startups, and
            collaborated on digital products for business and consumer use.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={fadeIn("right", 0.6)}
            initial="hidden"
            animate="show"
            className="hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
          >
            <div className="flex flex-1 xl:gap-x-6">
              {statsData.stats.map((stat, index) => {
                // Use dynamic experience calculation for the first stat
                const displayValue = index === 0 ? calculateExperience() : stat.value;
                
                return (
                <div key={index} className="relative flex-1 after:w-[1px] after:h-full after:bg-border after:absolute after:top-0 after:right-0 last:after:hidden">
                  <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                    <CountUp start={0} end={displayValue} duration={5} />
                    {stat.suffix}
                  </div>
                  <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px] text-muted">
                    {stat.label}
                  </div>
                </div>
              )})}
            </div>
          </motion.div>
        </div>

        {/* Skills and other sections */}
        <motion.div
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col w-full xl:max-w-[48%] h-[480px]"
        >
          <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4">
            {aboutData.map((item, itemI) => (
              <div
                key={itemI}
                className={`${
                  index === itemI
                    ? "text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300"
                    : "text-muted"
                } cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-border after:absolute after:-bottom-1 after:left-0`}
                onClick={() => setIndex(itemI)}
              >
                {item.title}
              </div>
            ))}
          </div>

          <div className="py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start">
            {aboutData[index].info.map((item, itemI) => (
              <div
                key={itemI}
                className="flex-1 flex flex-col md:flex-row max-w-max gap-x-2 items-center text-center text-muted"
              >
                <div className="font-light mb-2 md:mb-0">{item.title}</div>
                <div className="hidden md:flex">-</div>
                <div>{item.stage}</div>
                {item.icons && (
                  <div className="flex flex-wrap gap-4 justify-center">
                    {item.icons.map((iconItem, iconI) => {
                      const IconComponent = getIconComponent(iconItem.icon);
                      return (
                        <div 
                          key={iconI} 
                          className="group relative"
                          title={iconItem.name}
                        >
                          <IconComponent 
                            className={`text-2xl ${
                              theme === 'light' 
                                ? 'text-text hover:text-accent' 
                                : 'text-muted hover:text-accent'
                            } transition-colors duration-300`}
                          />
                          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-card px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-border shadow-lg">
                            {iconItem.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
