"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { BsArrowRight } from 'react-icons/bs';
import { HiOutlineFire, HiOutlineLightningBolt, HiOutlineSparkles } from 'react-icons/hi';
import { useTheme } from './ThemeProvider';
import workData from '../data/work_data.json';

const WorkSlider = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);

  const filteredProjects = activeCategory === 'All' 
    ? workData.projects 
    : workData.projects.filter(project => project.category === activeCategory);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="space-y-12"
    >
      {/* Achievement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          variants={item}
          className="relative overflow-hidden bg-gradient-to-br from-accent/20 via-card to-card p-6 rounded-2xl border border-border group hover:border-accent/50 transition-all duration-500"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl transform group-hover:scale-150 transition-transform duration-700" />
          <HiOutlineFire className="text-4xl text-accent mb-4" />
          <h3 className="text-2xl font-bold mb-2">{workData.metrics.total_projects}+</h3>
          <p className="text-muted">Projects Completed</p>
        </motion.div>

        <motion.div
          variants={item}
          className="relative overflow-hidden bg-gradient-to-br from-accent/20 via-card to-card p-6 rounded-2xl border border-border group hover:border-accent/50 transition-all duration-500"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl transform group-hover:scale-150 transition-transform duration-700" />
          <HiOutlineLightningBolt className="text-4xl text-accent mb-4" />
          <h3 className="text-2xl font-bold mb-2">{workData.metrics.successful_delivery}</h3>
          <p className="text-muted">Success Rate</p>
        </motion.div>

        <motion.div
          variants={item}
          className="relative overflow-hidden bg-gradient-to-br from-accent/20 via-card to-card p-6 rounded-2xl border border-border group hover:border-accent/50 transition-all duration-500"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl transform group-hover:scale-150 transition-transform duration-700" />
          <HiOutlineSparkles className="text-4xl text-accent mb-4" />
          <h3 className="text-2xl font-bold mb-2">{workData.metrics.client_satisfaction}</h3>
          <p className="text-muted">Satisfaction Score</p>
        </motion.div>
      </div>

      {/* Category Filter */}
      <motion.div variants={item} className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
            activeCategory === 'All'
              ? 'bg-accent text-white shadow-lg shadow-accent/25'
              : 'bg-card hover:bg-accent/10'
          }`}
        >
          All Projects
        </button>
        {workData.categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
              activeCategory === category
                ? 'bg-accent text-white shadow-lg shadow-accent/25'
                : 'bg-card hover:bg-accent/10'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            variants={item}
            className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-500"
            style={{ 
              willChange: 'transform, opacity'
            }}
          >
            {/* Project Image with Parallax Effect */}
            <div className="aspect-video relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="p-6 relative z-10">
              <div className="space-y-4">
                <h3 className="text-xl font-bold group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 text-sm bg-accent/10 rounded-full text-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(project.metrics).map(([key, value], index) => (
                    <div key={index} className="text-center">
                      <div className="text-lg font-bold text-accent">{value}</div>
                      <div className="text-xs text-muted capitalize">{key.replace('_', ' ')}</div>
                    </div>
                  ))}
                </div>

                {/* View Project Link */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent group/btn"
                >
                  <span className="font-semibold">Explore Project</span>
                  <BsArrowRight className="transform group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent text-white text-sm font-medium shadow-lg shadow-accent/25">
              {project.category}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-accent/5 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-700" />
          </motion.div>
        ))}
      </motion.div>

      {/* Technology Stack */}
      <motion.div variants={item} className="bg-card rounded-2xl p-8 border border-border">
        <h3 className="text-xl font-bold mb-6">Technology Expertise</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(workData.technologies).map(([category, techs], index) => (
            <div key={index}>
              <h4 className="text-accent mb-3 capitalize">{category}</h4>
              <ul className="space-y-2">
                {techs.map((tech, techIndex) => (
                  <li key={techIndex} className="text-muted text-sm">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WorkSlider;