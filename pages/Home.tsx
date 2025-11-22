
import React, { useState } from 'react';
import { ArrowRight, Shield, Globe, TrendingUp, Building2, Leaf, Activity, Users, CheckCircle2, Zap, ChevronDown, MapPin, BarChart3 } from 'lucide-react';
import GlobalNetworkViz from '../components/GlobalNetworkViz';
import MarketChart from '../components/MarketChart';
import EcosystemDiagram from '../components/EcosystemDiagram';

const Home: React.FC = () => {
  const [activeHub, setActiveHub] = useState<any | null>(null);

  return (
    <div className="w-full overflow-x-hidden bg-bg-matteBlack text-slate-200 selection:bg-bg-gold selection:text-black">
      
      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div 
             className="absolute inset-0 bg-cover bg-center scale-105 animate-[pulse-slow_10s_infinite_alternate]"
             style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")' }}
           ></div>
           {/* Gradient Overlays for text readability */}
           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-bg-matteBlack z-10"></div>
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10"></div>
        </div>
        
        {/* Spiderweb Overlay Effect */}
        <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="relative z-20 container mx-auto px-6 text-center mt-16">
            <div className="mb-8 inline-flex items-center justify-center p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 animate-fade-in">
                <Shield className="w-12 h-12 text-bg-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" strokeWidth={1} />
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tight" style={{animationDelay: '0.2s'}}>
                Global Wealth. <br/>
                <span className="italic font-light text-bg-gold">Regenerative Impact.</span>
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg md:text-xl mb-12 font-light tracking-wide leading-relaxed animate-fade-in-up opacity-0" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
                Designing multi-asset investment architectures for families, institutions, and nations. Powered by world-class global partners.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6 animate-fade-in-up opacity-0" style={{animationDelay: '0.7s', animationFillMode: 'forwards'}}>
                <a href="#solutions" className="group relative bg-bg-gold text-black px-10 py-4 rounded-sm uppercase tracking-[0.2em] text-xs font-bold overflow-hidden transition-all hover:bg-white">
                    <span className="relative z-10">Explore Solutions</span>
                    <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                </a>
                <a href="#partners" className="group border border-white/30 text-white px-10 py-4 rounded-sm uppercase tracking-[0.2em] text-xs font-bold hover:border-white hover:bg-white/5 transition-all">
                    Partner With Us
                </a>
            </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/30">
            <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section id="who-we-serve" className="py-32 bg-bg-matteBlack relative">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
                <h2 className="font-serif text-4xl md:text-5xl text-white">Who We Serve</h2>
                <p className="text-bg-gold uppercase tracking-widest text-xs mt-4 md:mt-0">Client Segments</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/10 border border-white/10">
                {[
                    { title: "HNW Families", desc: "Multi-generational wealth built on clarity and discipline.", icon: Users },
                    { title: "Family Offices", desc: "Institutional-grade access to private markets & governance.", icon: Building2 },
                    { title: "Institutions", desc: "Strategic solutions for risk-managed capital architectures.", icon: Shield },
                    { title: "Athletes (TG4)", desc: "From performance to prosperity—elite advisory & lifestyle.", icon: Activity },
                    { title: "Governments", desc: "Strategies supporting national development & infrastructure.", icon: Globe },
                ].map((item, i) => (
                    <div key={i} className="group relative bg-bg-matteBlack p-10 h-[24rem] flex flex-col justify-between overflow-hidden cursor-pointer hover:bg-[#0f0f0f] transition-colors">
                        {/* Hover Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-8 group-hover:border-bg-gold/50 group-hover:text-bg-gold transition-colors">
                                <item.icon className="w-5 h-5" />
                            </div>
                            <h3 className="font-serif text-2xl text-white mb-4 leading-tight group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
                        </div>
                        
                        <div className="relative z-10">
                            <p className="text-gray-400 text-sm leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                                {item.desc}
                            </p>
                            <div className="w-8 h-[1px] bg-bg-gold mt-8 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* PARTNERSHIPS */}
      <section id="partners" className="py-24 bg-black border-y border-white/5">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <span className="text-bg-gold uppercase tracking-[0.3em] text-[10px] font-bold">Strategic Alliance</span>
                <h3 className="font-serif text-3xl text-white mt-4">Global Powerhouses</h3>
            </div>
            
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-baseline opacity-60 hover:opacity-100 transition-opacity duration-700 mb-24 grayscale hover:grayscale-0">
                {/* Stylized Text Logos */}
                <div className="text-center group">
                    <div className="font-serif font-bold text-2xl text-white tracking-tighter group-hover:text-bg-gold transition-colors">Victory Hill</div>
                    <div className="text-[9px] font-sans text-gray-500 uppercase tracking-[0.2em] mt-1">Capital Corp</div>
                </div>
                <div className="text-center group">
                    <div className="font-serif font-bold text-2xl text-white tracking-tighter group-hover:text-bg-gold transition-colors">NetZero</div>
                    <div className="text-[9px] font-sans text-gray-500 uppercase tracking-[0.2em] mt-1">Nexus</div>
                </div>
                <div className="text-center group">
                    <div className="font-serif font-bold text-2xl text-white tracking-tighter group-hover:text-bg-gold transition-colors">ITS</div>
                    <div className="text-[9px] font-sans text-gray-500 uppercase tracking-[0.2em] mt-1">Holdings</div>
                </div>
                <div className="text-center group">
                    <div className="font-serif font-bold text-2xl text-white tracking-tighter group-hover:text-bg-gold transition-colors">Falcon</div>
                    <div className="text-[9px] font-sans text-gray-500 uppercase tracking-[0.2em] mt-1">Ireland</div>
                </div>
                <div className="text-center group">
                    <div className="font-serif font-bold text-2xl text-white tracking-tighter group-hover:text-bg-gold transition-colors">TG4</div>
                    <div className="text-[9px] font-sans text-gray-500 uppercase tracking-[0.2em] mt-1">Sports Dev</div>
                </div>
            </div>

            {/* ECOSYSTEM DIAGRAM */}
            <div className="relative max-w-5xl mx-auto">
                <div className="absolute top-0 left-0 w-full h-full bg-bg-gold/5 blur-[100px] rounded-full pointer-events-none"></div>
                <h3 className="text-center font-serif text-2xl text-white mb-10 relative z-10">The BGWM × Partner Ecosystem</h3>
                <div className="border border-white/5 bg-white/[0.02] rounded-sm p-2 relative z-10 backdrop-blur-sm">
                    <EcosystemDiagram />
                </div>
            </div>
        </div>
      </section>

      {/* INVESTMENT PILLARS */}
      <section id="solutions" className="py-32 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-[1fr_2fr] gap-16 mb-20">
                <div>
                    <h2 className="font-serif text-5xl text-white mb-6 leading-tight">Global <br/>Investment <br/><span className="text-bg-gold">Pillars</span></h2>
                    <p className="text-gray-400 leading-relaxed mb-8">
                        Connecting you to global opportunities through disciplined frameworks and institutional-grade architecture.
                    </p>
                    <a href="#contact" className="inline-flex items-center gap-2 text-bg-gold uppercase tracking-widest text-xs font-bold hover:text-white transition-colors">
                        Start a conversation <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { t: "Public Markets", d: "Systematic strategies for dynamic global cycles.", i: TrendingUp },
                        { t: "Private Markets", d: "Direct access to equity, credit, & infrastructure.", i: Shield },
                        { t: "Climate & Infra", d: "Energy transition & next-gen infrastructure.", i: Leaf },
                        { t: "Sports (TG4)", d: "Athlete capital & wealth alignment.", i: Activity },
                        { t: "Real Estate", d: "Prime global corridors & real assets.", i: Building2 },
                        { t: "Regenerative", d: "ESG → transition → regenerative systems.", i: Zap },
                    ].map((p, i) => (
                        <div key={i} className="glass-panel p-8 rounded-sm group hover:bg-white/5 transition-all duration-500 border border-white/5 hover:border-bg-gold/20">
                            <div className="flex justify-between items-start mb-6">
                                <p.i className="w-6 h-6 text-gray-500 group-hover:text-bg-gold transition-colors" />
                                <ArrowRight className="w-4 h-4 text-gray-700 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                            </div>
                            <h3 className="text-lg font-serif text-white mb-2">{p.t}</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">{p.d}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* GLOBAL REACH - REDESIGNED */}
      <section id="global" className="bg-[#030303] border-t border-white/5 relative">
        <div className="grid lg:grid-cols-[1fr_3fr] h-[600px]">
            
            {/* Left Control Panel */}
            <div className="bg-bg-charcoal border-r border-white/5 p-8 flex flex-col justify-between relative z-10 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
                <div>
                    <div className="flex items-center gap-3 mb-6 opacity-70">
                        <Globe className="w-5 h-5 text-bg-gold" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">Command Center</span>
                    </div>
                    <h2 className="font-serif text-3xl text-white mb-8 leading-tight">
                        Global <span className="text-bg-gold">Presence</span>
                    </h2>
                    
                    {activeHub ? (
                        <div className="animate-fade-in space-y-6 border-l-2 border-bg-gold pl-6 py-2">
                            <div>
                                <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Location</span>
                                <h3 className="text-3xl font-serif text-white">{activeHub.id}</h3>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Role</span>
                                <p className="text-bg-gold font-medium">{activeHub.role}</p>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase tracking-widest text-gray-500 block mb-1">Status</span>
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <p className="text-gray-300 text-sm">{activeHub.status}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-500 text-sm leading-relaxed">
                            <p className="mb-4">Benson Global operates across strategic corridors connecting North America, EMEA, and Africa.</p>
                            <p className="text-xs italic opacity-50">Hover over a node on the map to view operational details.</p>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                     <div className="flex justify-between items-end border-b border-white/10 pb-2">
                         <span className="text-[10px] uppercase tracking-wider text-gray-600">Active Hubs</span>
                         <span className="text-xl font-serif text-white">07</span>
                     </div>
                     <div className="flex justify-between items-end border-b border-white/10 pb-2">
                         <span className="text-[10px] uppercase tracking-wider text-gray-600">Capital Flow</span>
                         <div className="flex items-center gap-2 text-green-500">
                             <Activity className="w-3 h-3" />
                             <span className="text-xs font-bold">LIVE</span>
                         </div>
                     </div>
                </div>
            </div>

            {/* Right Map Visualization */}
            <div className="relative h-full w-full overflow-hidden">
                 <div className="absolute top-6 right-6 z-10 flex gap-4">
                     <div className="bg-black/50 backdrop-blur border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                         <div className="w-2 h-2 bg-bg-gold rounded-full"></div>
                         <span className="text-[10px] uppercase tracking-wider text-gray-400">Private Markets</span>
                     </div>
                     <div className="bg-black/50 backdrop-blur border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                         <div className="w-2 h-2 border border-bg-gold rounded-full"></div>
                         <span className="text-[10px] uppercase tracking-wider text-gray-400">Public Markets</span>
                     </div>
                 </div>
                 <GlobalNetworkViz onHoverHub={setActiveHub} />
            </div>
        </div>
      </section>

      {/* INSIGHTS (Recharts) */}
      <section id="insights" className="py-32 bg-bg-matteBlack">
        <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-20 items-start">
                <div className="space-y-12">
                    <div>
                        <h2 className="font-serif text-4xl text-white mb-6">Featured Insights</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Ahead-of-the-curve research and market analysis from the BGWM team.
                        </p>
                    </div>
                    <div className="space-y-8">
                        {[
                            { title: "Africa Growth Corridors", date: "OCT 2023", type: "Brief", img: "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=2010&auto=format&fit=crop" },
                            { title: "The Future of Athlete Wealth", date: "SEP 2023", type: "Report", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop" }
                        ].map((item, i) => (
                             <div key={i} className="flex gap-6 items-center group cursor-pointer border-b border-white/5 pb-8 last:border-0">
                                 <div className="w-32 h-20 bg-gray-800 overflow-hidden rounded-sm shrink-0">
                                    <img src={item.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" alt="News" />
                                 </div>
                                 <div>
                                     <div className="flex items-center gap-3 mb-2">
                                         <span className="text-[9px] font-bold bg-bg-gold/10 text-bg-gold px-2 py-1 rounded-sm uppercase tracking-wider">{item.type}</span>
                                         <span className="text-[10px] text-gray-500 uppercase tracking-wider">{item.date}</span>
                                     </div>
                                     <h4 className="text-white font-serif text-xl group-hover:text-bg-gold transition-colors leading-tight">{item.title}</h4>
                                 </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Chart Viz */}
                <div className="glass-panel p-10 rounded-sm border-t-4 border-t-bg-gold relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-20">
                        <BarChart3 className="w-24 h-24 text-white" />
                    </div>
                    <h3 className="text-white font-sans text-xs uppercase tracking-[0.2em] mb-8">Private Market Performance</h3>
                    <MarketChart />
                </div>
            </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-32 bg-white text-black">
         <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <div className="order-2 md:order-1">
                 <span className="text-bg-gold font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Our DNA</span>
                 <h2 className="font-serif text-5xl mb-10">The BG Philosophy</h2>
                 <div className="space-y-8">
                    {[
                        "Client Relationship Obsession",
                        "Long-Term Thinking & Investing",
                        "Invent & Reimagine Systems",
                        "Professional Pride & Excellence"
                    ].map((val, i) => (
                        <div key={i} className="flex items-center gap-6 group">
                            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                <span className="font-serif italic">{i + 1}</span>
                            </div>
                            <span className="text-xl font-light tracking-wide border-b border-transparent group-hover:border-black/20 transition-all pb-1">{val}</span>
                        </div>
                    ))}
                 </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center relative">
                <Shield className="w-80 h-80 text-gray-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={0.5} />
                <div className="relative z-10 bg-black text-white p-10 max-w-sm text-center">
                    <p className="font-serif text-2xl italic leading-relaxed">
                        "Resilient wealth is built when strategy, stewardship, and impact are aligned."
                    </p>
                    <div className="w-12 h-[1px] bg-bg-gold mx-auto mt-6"></div>
                </div>
            </div>
         </div>
      </section>

      {/* MAILCHIMP */}
      <section className="py-24 bg-bg-gold relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-multiply"></div>
         <div className="container mx-auto px-6 text-center relative z-10">
             <h2 className="font-serif text-4xl text-black mb-4">Global Intelligence Briefing</h2>
             <p className="text-black/70 mb-10 max-w-xl mx-auto font-light text-lg">Exclusive perspectives for investors and decision-makers.</p>
             <form className="max-w-lg mx-auto flex flex-col md:flex-row gap-0 shadow-2xl" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully.'); }}>
                 <input 
                    type="email" 
                    placeholder="Your Email Address" 
                    className="flex-1 px-8 py-5 bg-white border-none outline-none placeholder-gray-400 text-black"
                 />
                 <button type="submit" className="bg-black text-white px-10 py-5 uppercase tracking-[0.2em] text-xs font-bold hover:bg-gray-900 transition-colors">
                     Join
                 </button>
             </form>
         </div>
      </section>

      {/* CONTACT FORM (Minimalist) */}
      <section id="contact" className="py-32 bg-bg-charcoal relative">
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <div className="text-center mb-16">
                <h2 className="font-serif text-5xl text-white mb-6">Begin a Conversation</h2>
                <p className="text-gray-400">Confidential inquiries for HNW and Institutional clients.</p>
            </div>
            
            <div className="bg-bg-matteBlack p-12 md:p-16 border border-white/5 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-12 mb-12">
                    <div className="group">
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-bg-gold transition-colors">Full Name</label>
                        <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-bg-gold transition-colors font-serif text-xl" />
                    </div>
                    <div className="group">
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-bg-gold transition-colors">Email Address</label>
                        <input type="email" className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-bg-gold transition-colors font-serif text-xl" />
                    </div>
                </div>
                
                <div className="mb-12 group">
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-bg-gold transition-colors">Inquiry Type</label>
                    <select className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-bg-gold transition-colors font-serif text-xl appearance-none cursor-pointer">
                        <option className="bg-bg-charcoal">High-Net-Worth Client</option>
                        <option className="bg-bg-charcoal">Family Office</option>
                        <option className="bg-bg-charcoal">Institution or Corporation</option>
                        <option className="bg-bg-charcoal">Athlete (TG4)</option>
                        <option className="bg-bg-charcoal">Government Partnership</option>
                    </select>
                </div>

                <button className="w-full bg-white text-black py-5 uppercase tracking-[0.25em] text-xs font-bold hover:bg-bg-gold transition-colors">
                    Submit Inquiry
                </button>
            </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
