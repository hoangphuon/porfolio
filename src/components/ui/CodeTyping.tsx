import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const codeSnippets = [
  "const developer = { name: 'Hoàng Xuân Phương', passion: 'Cinematic Web' };",
  "function createFuture() { return code + creativity; }",
  "while(learning) { keepGrowing(); buildImpact(); }",
  "import { Innovation } from '@utc/it-student';",
  "git commit -m 'Turning ideas into emotions' --cinematic",
];

const CodeTyping = () => {
  const [currentLine, setCurrentLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < codeSnippets[lineIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + codeSnippets[lineIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine('');
        setCharIndex(0);
        setLineIndex((prev) => (prev + 1) % codeSnippets.length);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, lineIndex]);

  return (
    <div className="w-full flex justify-center items-center py-20 px-4">
      <div className="font-mono text-xs md:text-sm bg-slate-100/80 dark:bg-black/40 backdrop-blur-md p-6 rounded-xl border border-slate-200 dark:border-white/10 shadow-2xl max-w-3xl w-full relative overflow-hidden group">
        <div className="flex gap-2 mb-4 border-b border-slate-200 dark:border-white/5 pb-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
          <span className="text-[10px] text-slate-400 dark:text-white/30 ml-2 uppercase tracking-widest">system_terminal.exe</span>
        </div>
        <div className="flex">
          <span className="text-green-600 dark:text-green-400 mr-2">➜</span>
          <span className="text-blue-600 dark:text-blue-400 mr-2">~/hoang-phuong</span>
          <span className="text-slate-500 dark:text-white/40 mr-2">git:(<span className="text-red-500 dark:text-red-400">main</span>)</span>
          <span className="text-yellow-600 dark:text-yellow-400 mr-2">✗</span>
        </div>
        <div className="mt-2 flex flex-wrap">
          <span className="text-slate-900 dark:text-white break-all">{currentLine}</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-5 bg-slate-900 dark:bg-white ml-1 align-middle"
          />
        </div>
        
        {/* Glow effect */}
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] pointer-events-none" />
      </div>
    </div>
  );
};

export default CodeTyping;
