import { useState, useEffect } from 'react';
import MainCanvas from './components/canvas/MainCanvas';
import Navbar from './components/ui/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Footer from './components/sections/Footer';
import CustomCursor from './components/ui/CustomCursor';
import CodeTyping from './components/ui/CodeTyping';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#050816';
      document.body.style.color = '#ffffff';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    }
  }, [isDarkMode]);

  return (
    <main className={`relative z-0 ${isDarkMode ? 'bg-primary cursor-none' : 'bg-white-100 cursor-auto'}`}>
      {isDarkMode && <CustomCursor />}
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <div className="relative z-0">
        <MainCanvas isDarkMode={isDarkMode} />
        <Hero />
        <CodeTyping />
        <div className={`${isDarkMode ? '' : 'text-primary'}`}>
           <About />
           <Projects />
           <Skills />
           <Footer />
        </div>
      </div>
    </main>
  );
}

export default App;
