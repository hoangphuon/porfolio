import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { skills } from '../../constants';

const Skills = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Flatten skills for the marquee
  const allSkills = skills.flatMap(category => category.items.map(item => item.name));
  // Duplicate for seamless loop
  const duplicatedSkills = [...allSkills, ...allSkills, ...allSkills];

  useEffect(() => {
    const setupMarquee = (el: HTMLDivElement | null, direction: number) => {
      if (!el) return;
      
      const width = el.scrollWidth / 3; 
      
      const tl = gsap.to(el, {
        x: direction > 0 ? -width : 0,
        xPercent: direction > 0 ? 0 : -33.33,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      el.addEventListener('mouseenter', () => tl.pause());
      el.addEventListener('mouseleave', () => tl.play());

      return tl;
    };

    const tl1 = setupMarquee(row1Ref.current, 1);
    const tl2 = setupMarquee(row2Ref.current, -1);

    return () => {
      tl1?.kill();
      tl2?.kill();
    };
  }, []);

  return (
    <section id="skills" className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-600 dark:text-secondary text-[18px] uppercase tracking-wider">Khả năng</p>
          <h2 className="text-slate-900 dark:text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">Kỹ Năng.</h2>
        </motion.div>
      </div>

      <div className="flex flex-col gap-8 mb-20">
        {/* Row 1: Left to Right */}
        <div className="relative flex overflow-hidden py-4 border-y border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
          <div ref={row1Ref} className="flex whitespace-nowrap gap-8 px-4">
            {duplicatedSkills.map((skill, index) => (
              <div
                key={`${skill}-1-${index}`}
                className="flex items-center gap-4 px-8 py-4 rounded-2xl glassmorphism border border-slate-200 dark:border-white/10"
              >
                <div className="w-3 h-3 rounded-full bg-neonBlue shadow-neon" />
                <span className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tighter">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="relative flex overflow-hidden py-4 border-y border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
          <div ref={row2Ref} className="flex whitespace-nowrap gap-8 px-4">
            {duplicatedSkills.map((skill, index) => (
              <div
                key={`${skill}-2-${index}`}
                className="flex items-center gap-4 px-8 py-4 rounded-2xl glassmorphism border border-slate-200 dark:border-white/10"
              >
                <div className="w-3 h-3 rounded-full bg-neonPurple shadow-neon" />
                <span className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tighter">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Proficiency Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {skills.map((category, idx) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="glassmorphism p-8 rounded-2xl border border-slate-200 dark:border-white/10"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-gradient-to-r from-neonBlue to-neonPurple" />
              {category.name}
            </h3>
            <div className="space-y-6">
              {category.items.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-700 dark:text-white/80 font-medium">{skill.name}</span>
                    <span className="text-neonBlue font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-neonBlue to-neonPurple shadow-neon"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
