import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaCode, FaServer, FaMobile, FaDatabase } from 'react-icons/fa';
import projectData from '../projectData';

const ProjectFilters: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // Extract unique technologies for filtering
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projectData.forEach(project => {
      project.tech.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projectData;
    
    return projectData.filter(project => 
      project.tech.some(tech => 
        tech.toLowerCase().includes(activeFilter.toLowerCase())
      )
    );
  }, [activeFilter]);

  // Get icon for technology
  const getTechIcon = (tech: string) => {
    const lowerTech = tech.toLowerCase();
    if (lowerTech.includes('react') || lowerTech.includes('next')) return <FaCode />;
    if (lowerTech.includes('node') || lowerTech.includes('express')) return <FaServer />;
    if (lowerTech.includes('mongo') || lowerTech.includes('sql')) return <FaDatabase />;
    if (lowerTech.includes('mobile') || lowerTech.includes('electron')) return <FaMobile />;
    return <FaCode />;
  };

  return (
    <section id="projects" className="py-16 px-4 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            My Work & Case Studies
          </h2>
          <div className="w-32 h-1 mx-auto mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-70" />
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Explore my projects filtered by technology stack
          </p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeFilter === 'all'
                ? 'bg-white text-black shadow-lg'
                : 'bg-black/50 border border-white/20 text-white hover:bg-white/10'
            }`}
          >
            <FaFilter />
            All Projects ({projectData.length})
          </button>
          
          {allTechnologies.map((tech) => {
            const count = projectData.filter(project => 
              project.tech.some(t => t.toLowerCase().includes(tech.toLowerCase()))
            ).length;
            
            return (
              <button
                key={tech}
                onClick={() => setActiveFilter(tech)}
                className={`px-4 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 text-sm ${
                  activeFilter === tech
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-black/50 border border-white/20 text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {getTechIcon(tech)}
                {tech} ({count})
              </button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                className="min-w-[340px] max-w-[340px] bg-gradient-to-br from-black via-gray-900 to-white rounded-2xl shadow-xl flex flex-col group cursor-pointer transition-all duration-300 card-3d-hover"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.045, boxShadow: '0 16px 48px 0 rgba(60,120,255,0.22), 0 4px 16px 0 rgba(0,0,0,0.18)' }}
              >
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-extrabold mb-3 text-white tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-base mb-6 opacity-80 line-clamp-3 text-white/80 font-medium">
                    {project.shortDescription}
                  </p>
                  
                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white/90 border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white/70 border border-white/20">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <a
                    href={`/projects/${project.id}`}
                    className="mt-auto inline-block px-6 py-2 border-2 border-white text-white rounded-lg font-semibold text-center transition-all duration-200 shadow-sm hover:shadow-glow focus:shadow-glow focus:outline-none focus:ring-2 focus:ring-white/40"
                    style={{ transition: 'box-shadow 0.2s, background 0.2s, color 0.2s' }}
                  >
                    View Details
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
              <p className="text-white/70">
                Try selecting a different filter or check back later for more projects!
              </p>
            </div>
          )}
        </motion.div>

        {/* Results Count */}
        {activeFilter !== 'all' && (
          <motion.div
            className="text-center mt-8 text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Showing {filteredProjects.length} of {projectData.length} projects tagged with "{activeFilter}"
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectFilters;