
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If no hash, scroll to top immediately
    if (!hash) {
      window.scrollTo(0, 0);
    }
    // If there is a hash, we rely on the page component's effect to handle the scroll
    // to ensure the element exists in the DOM before scrolling
  }, [pathname, hash]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-bg-matteBlack text-slate-200 font-sans selection:bg-bg-gold selection:text-black">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;
