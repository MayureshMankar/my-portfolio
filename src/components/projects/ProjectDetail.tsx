import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import projectData from '../../projectData';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectData.find((p) => p.id === projectId);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
        <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
        <Link to="/projects" className="px-4 py-2 border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 font-medium">Back to Projects</Link>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-700 text-white">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 tracking-tight text-white">
          {project.title}
        </h1>

        {/* Two Column Layout */}
        <div className="w-full flex flex-col md:flex-row gap-8">
          {/* Left: Details */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Project Details Section */}
            <div className="w-full rounded-2xl bg-white/5 border border-white/10 p-8 grid grid-cols-1 gap-x-8 gap-y-4 text-white/90 text-base">
              <div><span className="font-semibold text-white">Role:</span> {project.role}</div>
              <div><span className="font-semibold text-white">Timeline:</span> {project.timeline}</div>
              <div><span className="font-semibold text-white">Client:</span> {project.client}</div>
              <div><span className="font-semibold text-white">Team:</span> {project.team}</div>
              <div><span className="font-semibold text-white">Problem:</span> {project.problem}</div>
              <div><span className="font-semibold text-white">Solution:</span> {project.solution}</div>
              <div><span className="font-semibold text-white">Challenges:</span> {project.challenges}</div>
              <div><span className="font-semibold text-white">Results:</span> {project.results}</div>
            </div>
          </div>
          {/* Right: Key Features */}
          {project.features && (
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl font-bold mb-4 text-white text-center md:text-left">Key Features</h2>
              <div className="grid grid-cols-1 gap-4">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-xl p-4">
                    <FaCheckCircle className="text-blue-400 min-w-5 min-h-5" />
                    <span className="text-white/90 text-base">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Overview Card Centered Below */}
        <div className="w-full flex justify-center mt-12">
          <div className="rounded-3xl bg-white/10 backdrop-blur-md shadow-2xl border border-white/10 p-8 flex flex-col items-center gap-6 max-w-2xl w-full">
            <p className="text-lg text-white/90 text-center mb-4 max-w-2xl">{project.fullDescription}</p>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {project.tech && project.tech.map((t) => (
                <span key={t} className="px-4 py-1 rounded-full text-xs font-semibold bg-white/20 text-white/90 border border-white/20">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-lg border-2 border-white text-white hover:bg-blue-600 hover:text-white transition-all duration-200 font-medium flex items-center gap-2">
                <FaGithub /> GitHub
              </a>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-lg border-2 border-white text-white hover:bg-blue-600 hover:text-white transition-all duration-200 font-medium flex items-center gap-2">
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
              <Link to="/projects" className="px-5 py-2 rounded-lg border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-200 font-medium flex items-center gap-2">
                <FaArrowLeft /> Back to Projects
              </Link>
            </div>
          </div>
        </div>

        {/* Gallery Centered Below */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="w-full flex flex-col items-center mt-12">
            <h2 className="text-2xl font-bold mb-4 text-white text-center">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
              {project.gallery.map((img, idx) => (
                <button
                  key={idx}
                  className="rounded-xl overflow-hidden shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/10"
                  onClick={() => setLightboxImg(img)}
                  type="button"
                >
                  <img src={img} alt={project.title + ' screenshot ' + (idx+1)} className="transition-transform duration-300 hover:scale-105 w-full h-48 object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox */}
        {lightboxImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg" onClick={() => setLightboxImg(null)}>
            <img src={lightboxImg} alt="Enlarged screenshot" className="max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl border-4 border-white" />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectDetail; 