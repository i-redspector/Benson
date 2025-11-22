
import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Linkedin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialIconWithFeed from './SocialIconWithFeed';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
        // Navbar background logic
        setScrolled(window.scrollY > 20);

        // Progress Bar Logic
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${totalScroll / windowHeight}`;
        setScrollProgress(Number(scroll));
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isHome && href.startsWith('#')) {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        if (href.startsWith('#')) {
            navigate(`/${href}`);
        } else {
            navigate(href);
        }
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Who We Serve', href: '#who-we-serve' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Partners', href: '#partners' },
    { name: 'Insights', href: '#insights' },
    { name: 'About', href: '/about' },
  ];

  return (
    <>
    {/* Scroll Progress Bar */}
    <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-[60]">
        <div 
            className="h-full bg-bg-gold transition-all duration-100 ease-out shadow-[0_0_10px_#D4AF37]"
            style={{ width: `${scrollProgress * 100}%` }}
        ></div>
    </div>

    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        scrolled || !isHome || mobileMenuOpen
          ? 'bg-bg-matteBlack/80 backdrop-blur-xl py-3 border-b border-white/5 shadow-2xl' 
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 z-50 group" onClick={() => { window.scrollTo(0,0); setMobileMenuOpen(false); }}>
            <div className="relative">
              <div className="absolute inset-0 bg-bg-gold/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Shield className="w-8 h-8 text-bg-gold fill-bg-gold/5 relative z-10 transition-transform duration-500 group-hover:scale-105" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-serif font-bold tracking-wider text-white leading-none">BENSON</span>
                <span className="text-[0.6rem] uppercase tracking-[0.35em] text-bg-gold leading-tight">Global Inc</span>
            </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[11px] uppercase tracking-[0.2em] font-medium text-gray-400 hover:text-white transition-colors relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-bg-gold group-hover:w-full transition-all duration-500 ease-out opacity-70"></span>
              </a>
            ))}
          </nav>

          {/* Social Icons in Header */}
          <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
          
          <div className="flex items-center gap-2">
             <SocialIconWithFeed platform="linkedin" Icon={Linkedin} placement="bottom" />
             <SocialIconWithFeed platform="instagram" Icon={Instagram} placement="bottom" />
             <SocialIconWithFeed platform="facebook" Icon={Facebook} placement="bottom" />
             <SocialIconWithFeed platform="x" Icon={Twitter} placement="bottom" />
             <SocialIconWithFeed platform="youtube" Icon={Youtube} placement="bottom" />
          </div>

          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')} 
            className="ml-4 border border-bg-gold/50 text-bg-gold px-6 py-2.5 rounded-sm uppercase text-[10px] font-bold tracking-[0.2em] hover:bg-bg-gold hover:text-black hover:border-bg-gold transition-all duration-500"
          >
            Client Login
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white z-50 p-2 hover:text-bg-gold transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-bg-matteBlack/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 z-40 animate-fade-in">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-bg-gold/10 via-transparent to-transparent opacity-30 pointer-events-none"></div>
            
            <div className="flex flex-col items-center gap-6 relative z-10">
                {navLinks.map((link, idx) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-2xl font-serif text-white hover:text-bg-gold transition-colors tracking-wide opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${idx * 0.1}s`, animationFillMode: 'forwards' }}
                  >
                    {link.name}
                  </a>
                ))}
            </div>

            <div className="flex gap-5 mt-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                <SocialIconWithFeed platform="linkedin" Icon={Linkedin} placement="top" />
                <SocialIconWithFeed platform="instagram" Icon={Instagram} placement="top" />
                <SocialIconWithFeed platform="facebook" Icon={Facebook} placement="top" />
                <SocialIconWithFeed platform="x" Icon={Twitter} placement="top" />
                <SocialIconWithFeed platform="youtube" Icon={Youtube} placement="top" />
            </div>
            
            <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, '#contact')} 
                className="mt-8 bg-bg-gold text-black px-10 py-4 rounded-sm uppercase text-xs font-bold tracking-[0.2em] opacity-0 animate-fade-in-up hover:scale-105 transition-transform"
                style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
            >
                Client Login
             </a>
          </div>
        )}
      </div>
    </header>
    </>
  );
};

export default Header;
