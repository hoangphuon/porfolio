import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { personalInfo } from '../../constants';
import avatarImg from '../../assets/avatar.jpg';

const About = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const container = containerRef.current;
    if (!card || !container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      const rotateX = (y / (height / 2)) * -15;
      const rotateY = (x / (width / 2)) * 15;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    const handleClick = () => {
      gsap.to(card, {
        rotateY: "+=360",
        duration: 1.5,
        ease: "back.inOut(1.7)",
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-slate-600 dark:text-secondary text-[18px] uppercase tracking-wider">Giới thiệu</p>
        <h2 className="text-slate-900 dark:text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Về Tôi</h2>
      </motion.div>

      <div className="mt-10 flex flex-col md:flex-row gap-10 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full md:w-1/3 flex justify-center"
          ref={containerRef}
          style={{ perspective: "1000px" }}
        >
          <div 
            ref={cardRef}
            className="w-full max-w-[350px] cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="w-full p-[1px] rounded-[20px] bg-gradient-to-br from-neonBlue to-neonPurple shadow-neon">
              <div 
                className="bg-white dark:bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-center items-center flex-col shadow-xl dark:shadow-none"
                style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
              >
                <div 
                  className="w-40 h-40 rounded-full bg-slate-100 dark:bg-primary border-4 border-neonBlue flex items-center justify-center overflow-hidden"
                  style={{ transform: "translateZ(30px)" }}
                >
                   <img 
                    src={avatarImg} 
                    alt={personalInfo.name} 
                    className="w-full h-full object-cover"
                   />
                </div>
                <h3 
                  className="text-slate-900 dark:text-white text-[20px] font-bold text-center mt-4"
                  style={{ transform: "translateZ(40px)" }}
                >
                  {personalInfo.name}
                </h3>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full md:w-2/3"
        >
          <p className="text-slate-700 dark:text-secondary text-[17px] leading-[30px] indent-8">
            {personalInfo.about}
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glassmorphism p-4 rounded-xl border border-slate-200 dark:border-white/10">
              <h4 className="text-blue-600 dark:text-neonBlue font-bold">Trường Học</h4>
              <p className="text-sm text-slate-600 dark:text-white/80">{personalInfo.education.school}</p>
            </div>
            <div className="glassmorphism p-4 rounded-xl border border-slate-200 dark:border-white/10">
              <h4 className="text-green-600 dark:text-emerald-400 font-bold">GPA</h4>
              <p className="text-sm text-slate-600 dark:text-white/80">{personalInfo.education.gpa}</p>
            </div>
            <div className="glassmorphism p-4 rounded-xl border border-slate-200 dark:border-white/10">
              <h4 className="text-purple-600 dark:text-neonPurple font-bold">Chứng Chỉ</h4>
              <p className="text-sm text-slate-600 dark:text-white/80">IELTS 6.5</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
