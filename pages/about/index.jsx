"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import CountUp from "react-countup";
import { useTheme } from '../../components/ThemeProvider';
import Avatar from "../../components/Avatar";
import { fadeIn } from "../../variants";
import { HiOutlineBriefcase } from 'react-icons/hi';
import timelineData from '../../data/timeline.json';

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
    <div className="min-h-screen py-32 text-center xl:text-left">
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="hidden xl:flex absolute bottom-0 -left-[370px]"
      >
        <Avatar />
      </motion.div>

      <div className="container mx-auto flex flex-col items-center xl:items-start gap-y-12 mb-20">
        <div className="flex flex-col xl:flex-row gap-x-12 items-start justify-between w-full">
          {/* Narrative Content */}
          <div className="flex-1 flex flex-col justify-start">
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
              <motion.h2
                variants={fadeIn("right", 0.2)}
                initial="hidden"
                animate="show"
                className="h2 mb-0"
              >
                Who <span className="text-accent">am I</span>?
              </motion.h2>
              <motion.a
                variants={fadeIn("right", 0.3)}
                initial="hidden"
                animate="show"
                href="/Muhammad Mahad Sheikh - CV.pdf"
                download
                className="btn btn-primary px-8 py-3 rounded-full flex items-center gap-2 max-w-max"
              >
                <span>Download Resume</span>
              </motion.a>
            </div>
            
            <motion.div
              variants={fadeIn("right", 0.4)}
              initial="hidden"
              animate="show"
              className="max-w-3xl space-y-6 text-muted leading-relaxed text-lg"
            >
              <p>
                My name is <strong>Muhammad Mahad Sheikh</strong>, and I come from <strong>Rawalpindi, Pakistan</strong>. The values of hard work and resilience that my family instilled in me have shaped the person I am today and fuel my drive to keep growing, both academically and professionally.
              </p>
              
              <p>
                I began my journey at <strong>Beaconhouse School System</strong>, and later pursued my <strong>Bachelor’s in Software Engineering at FAST Islamabad</strong>, where I was honored as a <strong>four-time Dean’s List awardee</strong>. My education gave me both a strong technical foundation and the confidence to explore opportunities beyond the classroom.
              </p>

              <p>
                Professionally, I have built over <strong>two years of experience in software engineering and full-stack development</strong>, delivering more than <strong>100 projects worldwide</strong>. I’ve had the privilege to work with organizations like <strong>Detecon International, Cognitive Healthcare International, and GWM</strong>. More recently, I founded <strong>Inspirovix</strong>, a start-up delivering AI and web solutions to clients across the UK, UAE, Singapore, and Pakistan.
              </p>

              <p>
                Beyond technology, my journey is about <strong>leadership and community building</strong>. As <strong>President of the FAST Blockchain Society</strong> and <strong>Co-Director of the National Science Bowl Pakistan</strong>, I’ve created platforms impacting hundreds of individuals.
              </p>

              <p>
                Looking ahead, my vision is to become a <strong>technology leader and entrepreneur</strong> building innovative businesses and bridging the gap between technology and meaningful impact. I want to inspire young people to think boldly, embrace creativity, and create opportunities that uplift their communities.
              </p>
            </motion.div>
          </div>

          {/* Experience Grid/Skills Tab */}
          <motion.div
            variants={fadeIn("left", 0.4)}
            initial="hidden"
            animate="show"
            className="flex flex-col w-full xl:max-w-[40%] mt-12 xl:mt-0"
          >
            <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-8 border-b border-border pb-4">
              {aboutData.map((item, itemI) => (
                <div
                  key={itemI}
                  className={`${
                    index === itemI
                      ? "text-accent border-b-2 border-accent"
                      : "text-muted hover:text-text"
                  } cursor-pointer capitalize xl:text-lg transition-all duration-300 pb-2`}
                  onClick={() => setIndex(itemI)}
                >
                  {item.title}
                </div>
              ))}
            </div>

            <div className="min-h-[300px] flex flex-col gap-y-4 items-center xl:items-start mb-12">
              {aboutData[index].info.map((item, itemI) => (
                <div
                  key={itemI}
                  className="flex flex-col md:flex-row gap-x-4 items-center xl:items-start text-center xl:text-left text-muted"
                >
                  <div className="font-semibold text-text">{item.title}</div>
                  <div className="hidden md:flex opacity-30">|</div>
                  <div className="text-accent">{item.stage}</div>
                  
                  {item.icons && (
                    <div className="flex flex-wrap gap-3 justify-center mt-2 md:mt-0">
                      {item.icons.map((iconItem, iconI) => {
                        const IconComponent = getIconComponent(iconItem.icon);
                        return (
                          <div key={iconI} title={iconItem.name}>
                            <IconComponent className="text-xl text-muted/60 hover:text-accent transition-colors" />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Stats Section Moved Here */}
            <motion.div
               variants={fadeIn("up", 0.6)}
               initial="hidden"
               animate="show"
               className="grid grid-cols-2 gap-x-8 gap-y-6 w-full"
            >
              {statsData.stats.map((stat, i) => {
                const displayValue = i === 0 ? calculateExperience() : stat.value;
                return (
                  <div key={i} className="flex flex-col items-center xl:items-start border-l border-accent/20 pl-4">
                    <div className="text-2xl xl:text-3xl font-bold text-accent mb-1">
                      <CountUp start={0} end={displayValue} duration={3} />
                      {stat.suffix}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-muted whitespace-nowrap">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Professional Journey (Relocated Timeline) */}
      <section className="py-20 relative z-10 bg-accent/5">
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            className="h2 text-center mb-20"
          >
            Professional <span className="text-accent">Journey</span>
          </motion.h2>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-[2px] bg-accent/20" />

            {/* Timeline Items */}
            {timelineData.timeline.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn(index % 2 === 0 ? "left" : "right", 0.3)}
                initial="show"
                animate="show"
                className={`relative flex md:justify-between items-center mb-16 w-full ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  <div className="bg-card/30 backdrop-blur-md p-8 rounded-2xl border border-border hover:border-accent/50 transition-all duration-300">
                    <div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <HiOutlineBriefcase className="text-accent text-2xl" />
                      <h3 className="text-xl font-bold text-text tracking-wide">{item.title}</h3>
                    </div>
                    <p className="text-accent font-medium mb-3">{item.company}</p>
                    <p className="text-muted leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Dot Marker */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-accent ring-8 ring-accent/10 z-10" />

                {/* Year Container - Sits on the other side of the flex row */}
                <div className={`absolute left-12 top-0 md:static md:w-[45%] flex items-center ${
                  index % 2 === 0 ? 'md:justify-end pr-8' : 'md:justify-start pl-8'
                }`}>
                   <span className="bg-accent/10 px-6 py-2 rounded-full text-sm font-bold text-accent border border-accent/20">
                    {item.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
