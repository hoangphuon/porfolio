import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../constants';

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "DEVELOPER";
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= fullText.length) {
        setDisplayText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
        // Optional: restart after a delay or just stay
      }
    }, 150);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section 
      className="relative w-full h-screen mx-auto flex flex-col justify-center items-center text-center px-4 overflow-hidden"
    >
      <div className="z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-12 relative"
        >
          {/* Typing Text Container - Replaces the Eyes */}
          <div className="w-80 h-28 md:w-[700px] md:h-40 flex items-center justify-center overflow-hidden rounded-[40px] border-b-4 border-blue-600/50 dark:border-neonBlue/50 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.2)] dark:shadow-[0_20px_60px_-15px_rgba(0,243,255,0.3)] mx-auto relative group bg-slate-950/95 dark:bg-[#0a0a0a]">
            <h2 className="text-4xl md:text-7xl font-black tracking-[0.2em] text-white font-mono relative z-20">
              {displayText}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1.5 h-10 md:h-20 bg-blue-500 dark:bg-neonBlue ml-2"
              />
            </h2>
            
            {/* Tech effects */}
            <div className="absolute inset-0 bg-blue-500/5 dark:bg-neonBlue/5 pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] pointer-events-none" />
            
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(59,130,246,0.06),rgba(0,255,0,0.02),rgba(255,0,0,0.02))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-30" />
          </div>
          
          {/* Intense light streak behind text */}
          <div className="absolute -inset-24 bg-blue-500/10 dark:bg-neonBlue/10 blur-[130px] -z-10" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-slate-900 dark:text-white"
          style={{ textShadow: "0 0 20px rgba(59, 130, 246, 0.1)" }}
        >
          {personalInfo.name.split(' ').map((word, i) => (
            <span key={i} className={i === personalInfo.name.split(' ').length - 1 ? "text-gradient" : ""}>
              {word}{' '}
            </span>
          ))}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 font-medium md:text-xl max-w-2xl mx-auto text-slate-600 dark:text-secondary"
        >
          {personalInfo.tagline}
        </motion.p>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-slate-400 dark:border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-slate-400 dark:bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
