import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = ({ isDarkMode, toggleTheme }: { isDarkMode: boolean, toggleTheme: () => void }) => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', title: 'Về Tôi' },
    { id: 'projects', title: 'Dự Án' },
    { id: 'skills', title: 'Kỹ Năng' },
    { id: 'contact', title: 'Liên Hệ' },
  ];

  return (
    <nav className={`w-full flex justify-center fixed top-0 z-[100] transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className={`flex justify-between items-center transition-all duration-500 ${scrolled ? 'max-w-4xl w-[90%] glassmorphism px-8 py-3 rounded-full shadow-neon border border-white/10' : 'max-w-7xl w-full px-6'}`}>
        <a 
          href="#" 
          className="flex items-center gap-2"
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <p className={`${isDarkMode ? 'text-white' : 'text-slate-900'} text-[16px] font-bold cursor-pointer flex`}>
            HXP &nbsp;
            <span className="sm:block hidden text-gradient">| Portfolio</span>
          </p>
        </a>

        <div className="flex items-center gap-8">
          <ul className="list-none hidden sm:flex flex-row gap-8">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${active === link.title ? 'text-blue-600 dark:text-neonBlue font-bold' : (isDarkMode ? 'text-secondary' : 'text-slate-600')} hover:text-blue-600 dark:hover:text-neonBlue text-[15px] font-medium cursor-pointer transition-colors`}
                onClick={() => setActive(link.title)}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full glassmorphism border border-slate-200 dark:border-white/10 hover:shadow-neon transition-all ${isDarkMode ? 'text-white' : 'text-slate-700'}`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className="sm:hidden flex justify-end items-center">
              {toggle ? (
                <X className={`w-6 h-6 cursor-pointer ${isDarkMode ? 'text-white' : 'text-slate-900'}`} onClick={() => setToggle(!toggle)} />
              ) : (
                <Menu className={`w-6 h-6 cursor-pointer ${isDarkMode ? 'text-white' : 'text-slate-900'}`} onClick={() => setToggle(!toggle)} />
              )}

              <div className={`${!toggle ? 'hidden' : 'flex'} p-6 absolute top-16 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl glassmorphism ${!isDarkMode ? 'bg-white/90 border-slate-200 shadow-xl' : ''}`}>
                <ul className="list-none flex justify-end items-start flex-col gap-4">
                  {navLinks.map((link) => (
                    <li
                      key={link.id}
                      className={`${active === link.title ? 'text-blue-600 dark:text-neonBlue' : (isDarkMode ? 'text-secondary' : 'text-slate-600')} font-medium cursor-pointer text-[15px]`}
                      onClick={() => {
                        setToggle(!toggle);
                        setActive(link.title);
                      }}
                    >
                      <a href={`#${link.id}`}>{link.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
