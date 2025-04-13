import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import projectData from '../projectData';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-16 px-4 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white text-center mb-14">
          My Work & Case Studies
        </h2>
        <div className="w-32 h-1 mx-auto mb-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-70" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project, idx) => (
            <motion.div
              key={project.id}
              className="min-w-[340px] max-w-[340px] bg-gradient-to-br from-black via-gray-900 to-white rounded-2xl shadow-xl flex flex-col group cursor-pointer transition-all duration-300 card-3d-hover"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.045, boxShadow: '0 16px 48px 0 rgba(60,120,255,0.22), 0 4px 16px 0 rgba(0,0,0,0.18)' }}
            >
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-extrabold mb-3 text-white tracking-tight">{project.title}</h3>
                <p className="text-base mb-6 opacity-80 line-clamp-3 text-white/80 font-medium">{project.shortDescription}</p>
                <Link
                  to={`/projects/${project.id}`}
                  className="mt-auto inline-block px-6 py-2 border-2 border-white text-white rounded-lg font-semibold text-center transition-all duration-200 shadow-sm hover:shadow-glow focus:shadow-glow focus:outline-none focus:ring-2 focus:ring-white/40"
                  style={{ transition: 'box-shadow 0.2s, background 0.2s, color 0.2s' }}
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 