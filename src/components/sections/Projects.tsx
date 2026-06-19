import { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../constants';
import { Code, X, FileText } from 'lucide-react';

const ProjectCard = ({ index, project, setSelectedProject }: { index: number, project: typeof projects[0], setSelectedProject: (p: typeof projects[0]) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        scale={1.02}
        className="bg-[#1d1836] dark:bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full h-[480px] flex flex-col border border-white/5 hover:border-neonBlue/50 transition-all shadow-lg hover:shadow-neon cursor-pointer"
      >
        <div 
          className="w-full h-full flex flex-col"
          onClick={() => setSelectedProject(project)}
        >
          <div className="relative w-full h-[200px]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute top-3 left-3 bg-primary/80 backdrop-blur-md px-3 py-1 rounded-full text-[12px] font-bold text-neonBlue border border-neonBlue/30">
              {project.category}
            </div>
            <div className="absolute inset-0 flex justify-end m-3 card-img_hover gap-2">
              <div className="black-gradient w-10 h-10 rounded-full flex justify-center items-center bg-primary/80 border border-neonBlue">
                <FileText className="w-1/2 h-1/2 text-white" />
              </div>
            </div>
          </div>

          <div className="mt-5 flex-grow">
            <h3 className="text-white font-bold text-[22px] tracking-tight">{project.title}</h3>
            <p className="mt-2 text-[#dfd9ff] dark:text-secondary text-[14px] leading-relaxed line-clamp-4">{project.description}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 rounded-md bg-primary/50 border border-white/5 text-[11px] font-semibold text-gradient uppercase"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          <div className="mt-4 text-neonBlue text-[12px] font-bold flex items-center gap-1 group">
             Xem tài liệu nghiên cứu <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-secondary text-[18px] uppercase tracking-wider">Hành trình</p>
        <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Dự Án.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Click vào từng dự án để khám phá sâu hơn về các tài liệu nghiên cứu và giải pháp kỹ thuật mà tôi đã áp dụng.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7 justify-center">
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            index={index} 
            project={project} 
            setSelectedProject={setSelectedProject}
          />
        ))}
      </div>

      {/* Modal Nghiên Cứu */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center sm:p-4 p-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ 
                scale: 0.9, 
                opacity: 0, 
                y: 20 
              }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0 
              }}
              exit={{ 
                scale: 0.9, 
                opacity: 0, 
                y: 20,
                transition: { duration: 0.3 } 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-tertiary w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-3xl p-6 md:p-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] scrollbar-hide"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 glassmorphism rounded-full hover:shadow-neon transition-all z-10"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-1/2">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      className="w-full aspect-video object-cover rounded-2xl shadow-xl"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <div className="p-3 bg-neonBlue/10 rounded-2xl inline-block mb-4">
                      <FileText className="w-8 h-8 text-neonBlue" />
                    </div>
                    <h3 className="text-3xl font-black text-white leading-tight">{selectedProject.title}</h3>
                    <p className="text-neonBlue font-bold mt-2 uppercase tracking-widest">{selectedProject.category}</p>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h4 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                      <span className="w-1 h-6 bg-neonBlue rounded-full shadow-neon" />
                      Giải pháp kỹ thuật
                    </h4>
                    <div className="text-secondary leading-[1.8] text-lg whitespace-pre-line space-y-4">
                      {selectedProject.research}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-8">
                    <div>
                      <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-widest">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-primary/50 rounded-lg border border-white/5 text-[12px] text-neonBlue font-bold">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-8 border-t border-white/5">
                       <a 
                        href={selectedProject.source_code_link}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-4 bg-neonBlue text-primary rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-white transition-all shadow-neon hover:shadow-none"
                       >
                         <Code className="w-5 h-5" /> Source Code
                       </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
