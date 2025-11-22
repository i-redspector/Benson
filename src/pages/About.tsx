
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Award } from 'lucide-react';

const leadership = [
  {
    name: 'Dr. Anthony Kofi Benson',
    title: 'President & CEO',
    bio: `Founder of Benson Global Inc., Dr. Benson leads the firm’s global strategy, 
    multi-asset architecture and regenerative capital vision, advising families, 
    institutions, athletes, and governments across multiple continents.`,
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop', 
  },
  {
    name: 'Dr. Tiaan Oosthuizen',
    title: 'Managing Partner',
    bio: `Dr. Oosthuizen brings deep expertise in strategy, operations and institutional 
    partnerships, helping align Benson Global’s platform with high-performing 
    organizations and long-term capital programs.`,
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Kavis Reed',
    title: 'Managing Partner',
    bio: `A seasoned executive and leader in performance environments, Kavis bridges 
    elite sports, leadership and capital allocation, with a focus on long-term 
    resilience and impact.`,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
  },
  {
    name: 'Dr. Tobias De Corning',
    title: 'Managing Partner',
    bio: `Dr. De Corning contributes academic rigor and strategic insight, supporting 
    research-driven decision-making, governance, and cross-border institutional 
    collaboration.`,
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop',
  },
];

const About: React.FC = () => {
  return (
    <div className="bg-[#050505] text-slate-50">
      {/* HERO */}
      <section
        className="px-[8vw] py-32 md:py-48 relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle at top left, rgba(212,165,58,0.12), transparent 60%), radial-gradient(circle at bottom right, rgba(212,165,58,0.08), transparent 60%)',
          backgroundColor: '#050505',
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
        <div className="mx-auto max-w-5xl relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4A53A] animate-fade-in mb-6 flex items-center gap-2">
             <span className="w-8 h-[1px] bg-[#D4A53A]"></span> About Benson Global Inc.
          </p>
          <h1 className="font-serif text-4xl leading-tight text-[#FEFAF0] md:text-6xl animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            A global wealth and advisory platform built for <span className="text-[#D4A53A]">long-term leadership.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-base text-[#DDD2AA] md:text-xl leading-relaxed font-light animate-fade-in-up opacity-0" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>
            Benson Global Inc. (BG) designs multi-asset investment architectures for
            high-net-worth families, family offices, institutions, athletes, and
            governments. Our work is grounded in disciplined risk management,
            institutional partnerships, and a regenerative philosophy.
          </p>
        </div>
      </section>

      {/* BG PHILOSOPHY */}
      <section className="border-y border-[#D4A53A]/30 bg-[#050505] px-[8vw] py-24 relative">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-4xl text-[#F8F4EA] mb-8 animate-fade-in">The BG Philosophy</h2>
            <p className="text-base text-[#D5C79A] mb-10 leading-relaxed animate-fade-in" style={{animationDelay: '0.1s'}}>
              The BG Philosophy is a regenerative, global, intergenerational approach to
              wealth creation. It is built on four guiding principles that shape how we
              design strategies, build partnerships, and serve clients across the world.
            </p>
            <ul className="space-y-6 text-sm text-[#E2D6AE]">
              {[
                  "Client Relationship Obsession (CRO)",
                  "Willingness to Think & Invest Long Term",
                  "Eagerness to Invent & Reimagine Systems",
                  "Professional Pride & Excellence"
              ].map((item, i) => (
                  <li key={item} className="flex items-center gap-4 p-4 border border-white/5 rounded-sm hover:border-[#D4A53A]/30 transition-colors bg-white/5 hover:bg-white/10 animate-fade-in-up cursor-default group" style={{animationDelay: `${0.2 + (i * 0.1)}s`, opacity: 0, animationFillMode: 'forwards'}}>
                      <div className="w-8 h-8 rounded-full bg-[#D4A53A]/20 flex items-center justify-center text-[#D4A53A] text-xs font-serif font-bold group-hover:bg-[#D4A53A] group-hover:text-black transition-all duration-300">0{i+1}</div>
                      <span className="uppercase tracking-wide text-xs font-medium group-hover:text-white transition-colors">{item}</span>
                  </li>
              ))}
            </ul>
            <p className="mt-10 text-sm text-[#C9BC91] italic border-l-2 border-[#D4A53A] pl-6 py-2 animate-fade-in" style={{animationDelay: '0.6s'}}>
              We believe that truly resilient wealth is built when strategy, stewardship,
              and impact are aligned.
            </p>
          </div>
          <div className="flex items-center justify-center relative order-1 md:order-2 animate-fade-in" style={{animationDelay: '0.3s'}}>
            {/* Decorative Elements */}
            <div className="absolute inset-0 border border-[#D4A53A]/20 rounded-full scale-110 animate-pulse-slow"></div>
            <div className="absolute inset-0 border border-[#D4A53A]/10 rounded-full scale-125"></div>
            
            <div className="relative z-10 bg-gradient-to-br from-[#1a1a1a] to-black p-12 rounded-full border border-[#D4A53A]/30 shadow-[0_0_50px_rgba(212,175,55,0.15)] group hover:shadow-[0_0_80px_rgba(212,175,55,0.3)] transition-shadow duration-700">
                <Shield className="w-48 h-48 text-[#D4A53A] group-hover:scale-105 transition-transform duration-700" strokeWidth={0.5} />
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & MANDATE */}
      <section className="bg-[#050607] px-[8vw] py-32 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4A53A]/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <Award className="w-12 h-12 text-[#D4A53A] mx-auto mb-8 opacity-80 animate-fade-in" strokeWidth={1} />
          <h2 className="font-serif text-4xl text-[#F8F4EA] mb-8 animate-fade-in-up">Mission &amp; Mandate</h2>
          <p className="text-lg md:text-xl text-[#D5C79A] leading-relaxed mb-10 font-light animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            Our mission is to empower global families, institutions, athletes, and nations
            through disciplined, multi-asset wealth architectures and strategic
            partnerships. We exist to connect capital with long-term opportunity and to
            help clients design futures that are financially resilient, globally connected,
            and meaningfully impactful.
          </p>
          <div className="h-px w-24 bg-[#D4A53A] mx-auto mb-8 opacity-50"></div>
          <p className="text-xs md:text-sm text-[#C0B489] uppercase tracking-[0.3em] leading-loose">
            Public Markets • Private Markets • Climate • Sports • Real Estate • Regenerative
          </p>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-[#050505] px-[8vw] py-32">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-serif text-4xl text-[#F8F4EA] mb-4">
            Leadership Team
          </h2>
          <p className="mt-4 text-center text-sm text-[#D5C79A] max-w-2xl mx-auto mb-20">
            Benson Global is led by a team that integrates executive leadership, academic
            rigor, institutional experience, and performance-driven insight.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {leadership.map((leader, i) => (
              <article
                key={leader.name}
                className="flex flex-col sm:flex-row gap-8 rounded-sm border border-[#D4A53A]/10 bg-gradient-to-b from-[#14100A] via-[#050505] to-[#050505] p-8 hover:border-[#D4A53A]/30 transition-colors group animate-fade-in-up shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                style={{animationDelay: `${i * 0.15}s`, opacity: 0, animationFillMode: 'forwards'}}
              >
                <div className="mt-1 shrink-0">
                  <div className="w-32 h-32 rounded-full p-1 border border-[#D4A53A]/30 mx-auto sm:mx-0 overflow-hidden">
                     <img
                        src={leader.img}
                        alt={leader.name}
                        className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                      />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-serif font-medium text-[#F6EDD8] group-hover:text-white transition-colors">
                    {leader.name}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#D4A53A] mb-6 mt-2 font-bold">
                    {leader.title}
                  </p>
                  <p className="text-sm leading-relaxed text-[#CCBF99]">
                    {leader.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL PRESENCE */}
      <section className="bg-[#080808] px-[8vw] py-24 border-t border-white/5">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-serif text-3xl text-[#F8F4EA] mb-6">
            Global Presence
          </h2>
          <p className="text-sm text-[#D5C79A] mb-12 max-w-2xl mx-auto">
            Benson Global operates across multiple regions, connecting clients and partners
            with cross-border opportunities and institutional-grade platforms.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {["Canada", "USA", "United Kingdom", "Qatar", "South Africa", "Namibia", "Ghana"].map((country) => (
                <div key={country} className="px-6 py-3 border border-white/10 bg-white/5 rounded-sm hover:bg-[#D4A53A] hover:text-black hover:border-[#D4A53A] transition-all cursor-default text-xs uppercase tracking-widest font-bold">
                    {country}
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / LINK BACK TO CONTACT */}
      <section className="border-t border-[#D4A53A]/25 bg-black px-[8vw] py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="font-serif text-3xl text-[#F8F4EA]">
            Begin a Confidential Conversation
          </h2>
          <p className="mt-6 text-base text-[#D5C79A] leading-relaxed max-w-xl">
            Whether you are a family, institution, athlete, or public-sector leader, we
            welcome thoughtful conversations about long-term strategy and capital
            alignment.
          </p>
          <Link
            to="/#contact"
            className="mt-10 inline-flex items-center gap-2 rounded-sm bg-[#D4A53A] px-10 py-5 text-xs font-bold uppercase tracking-[0.25em] text-black hover:bg-white transition-colors shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            Connect With Benson Global
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
