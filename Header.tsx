import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
    <header className={`fixed top-0 w-full z-40 transition-all duration-500 ${scrolled || !isHome ? 'bg-bg-matteBlack/95 backdrop-blur-md py-4 border-b border-bg-gold/20' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 z-50 group" onClick={() => window.scrollTo(0,0)}>
            <Shield className="w-8 h-8 text-bg-gold fill-bg-gold/10 group-hover:scale-105 transition-transform duration-500" />
            <div className="flex flex-col">
                <span className="text-xl font-serif font-bold tracking-wider text-white">BENSON</span>
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-bg-gold">Global Inc</span>
            </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm uppercase tracking-widest text-gray-300 hover:text-bg-gold transition-colors text-[11px] relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-bg-gold group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="border border-bg-gold text-bg-gold px-6 py-2 rounded-sm uppercase text-xs tracking-widest hover:bg-bg-gold hover:text-black transition-all duration-300">
            Client Login
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="text-bg-gold" /> : <Menu />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center gap-8 z-40 animate-fade-in">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-2xl font-serif text-white hover:text-bg-gold"
              >
                {link.name}
              </a>
            ))}
             <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="mt-4 border border-bg-gold text-bg-gold px-8 py-4 rounded-sm uppercase text-sm tracking-widest">
                Client Login
             </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
