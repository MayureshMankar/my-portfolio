import React, { useState } from 'react';
import { FaDownload, FaGraduationCap, FaBriefcase, FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';

interface ExperienceItem {
  id: number;
  type: 'education' | 'experience' | 'certification';
  title: string;
  organization: string;
  date: string;
  description: string;
  skills?: string[];
}

const Resume: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'certifications'>('experience');

  const experienceData: ExperienceItem[] = [
    {
      id: 1,
      type: 'experience',
      title: 'Full Stack Developer',
      organization: 'Shreedevi Engineers',
      date: 'Jan 2024 – Mar 2024',
      description: 'Developed an official online presence for a real-world surface grinding company. The website features product listings, dynamic form submissions, certificate uploads, and client interaction modules.',
      skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS']
    },
    {
      id: 2,
      type: 'experience',
      title: 'Full Stack Developer',
      organization: 'AI Assistant Project',
      date: 'Jul 2024 – Aug 2024',
      description: 'Built a full-stack intelligent assistant that integrates natural language processing with real-time responses using OpenRouter APIs.',
      skills: ['FastAPI', 'PostgreSQL', 'Alembic', 'Tailwind CSS', 'JavaScript', 'Node.js']
    },
    {
      id: 3,
      type: 'experience',
      title: 'UI/UX Designer & Frontend Developer',
      organization: 'Whispering Soul',
      date: 'Apr 2024 – Present',
      description: 'Developing a modern website project focused on digital storytelling and immersive design.',
      skills: ['React', 'Framer Motion', 'Tailwind', 'UI/UX Design']
    },
    {
      id: 4,
      type: 'education',
      title: 'B.Sc in Computer Science',
      organization: 'University of Mumbai',
      date: '2023 – 2026',
      description: 'Pursuing a degree in Computer Science with a focus on software development and data structures.',
      skills: ['Data Structures', 'Algorithms', 'Database Systems', 'Computer Networks']
    },
    {
      id: 5,
      type: 'certification',
      title: 'Full Stack Development',
      organization: 'Online Certification',
      date: '2024',
      description: 'Completed comprehensive training in modern web development technologies including React, Node.js, and databases.',
      skills: ['React', 'Node.js', 'MongoDB', 'Express']
    }
  ];

  const filteredExperience = experienceData.filter(item => {
    if (activeTab === 'experience') return item.type === 'experience';
    if (activeTab === 'education') return item.type === 'education';
    if (activeTab === 'certifications') return item.type === 'certification';
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'education':
        return <FaGraduationCap className="text-blue-400" />;
      case 'certification':
        return <FaCertificate className="text-green-400" />;
      default:
        return <FaBriefcase className="text-purple-400" />;
    }
  };

  return (
    <section id="resume" className="py-16 px-4 bg-black text-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
            My Resume
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            A detailed overview of my professional journey, education, and certifications.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Download and Summary */}
          <div className="md:w-1/3">
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 mb-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Download Resume</h3>
              <p className="text-white/80 mb-6">
                Get a complete overview of my skills, experience, and qualifications in PDF format.
              </p>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 w-full justify-center"
              >
                <FaDownload />
                Download PDF
              </a>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-4 text-white">Professional Summary</h3>
              <p className="text-white/80 mb-4">
                Passionate full-stack developer with expertise in modern web technologies and a focus on building scalable digital products.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Projects Completed</span>
                  <span className="font-semibold">10+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Technologies</span>
                  <span className="font-semibold">30+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Experience</span>
                  <span className="font-semibold">3+ years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Timeline */}
          <div className="md:w-2/3">
            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6">
              {/* Tabs */}
              <div className="flex border-b border-white/20 mb-6">
                <button
                  className={`py-3 px-6 font-semibold ${activeTab === 'experience' ? 'text-white border-b-2 border-white' : 'text-white/60'}`}
                  onClick={() => setActiveTab('experience')}
                >
                  Experience
                </button>
                <button
                  className={`py-3 px-6 font-semibold ${activeTab === 'education' ? 'text-white border-b-2 border-white' : 'text-white/60'}`}
                  onClick={() => setActiveTab('education')}
                >
                  Education
                </button>
                <button
                  className={`py-3 px-6 font-semibold ${activeTab === 'certifications' ? 'text-white border-b-2 border-white' : 'text-white/60'}`}
                  onClick={() => setActiveTab('certifications')}
                >
                  Certifications
                </button>
              </div>

              {/* Timeline */}
              <div className="space-y-8">
                {filteredExperience.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative pl-8 border-l-2 border-white/20"
                  >
                    {/* Icon */}
                    <div className="absolute left-[-13px] top-0 w-6 h-6 rounded-full bg-black border-2 border-white flex items-center justify-center">
                      {getIcon(item.type)}
                    </div>

                    <div className="pb-8">
                      <span className="text-sm text-white/60">{item.date}</span>
                      <h3 className="text-xl font-bold text-white mt-1">{item.title}</h3>
                      <p className="text-white/80 font-medium">{item.organization}</p>
                      <p className="text-white/70 mt-2">{item.description}</p>
                      {item.skills && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {item.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;