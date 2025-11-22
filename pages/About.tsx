import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield } from 'lucide-react';

const leadership = [
  {
    name: 'Dr. Anthony Kofi Benson',
    title: 'President & CEO',
    bio: `Founder of Benson Global Inc., Dr. Benson leads the firm’s global strategy, 
    multi-asset architecture and regenerative capital vision, advising families, 
    institutions, athletes, and governments across multiple continents.`,
    img: 'https://picsum.photos/200/200?random=101', 
  },
  {
    name: 'Dr. Tiaan Oosthuizen',
    title: 'Managing Partner',
    bio: `Dr. Oosthuizen brings deep expertise in strategy, operations and institutional 
    partnerships, helping align Benson Global’s platform with high-performing 
    organizations and long-term capital programs.`,
    img: 'https://picsum.photos/200/200?random=102',
  },
  {
    name: 'Kavis Reed',
    title: 'Managing Partner',
    bio: `A seasoned executive and leader in performance environments, Kavis bridges 
    elite sports, leadership and capital allocation, with a focus on long-term 
    resilience and impact.`,
    img: 'https://picsum.photos/200/200?random=103',
  },
  {
    name: 'Dr. Tobias De Corning',
    title: 'Managing Partner',
    bio: `Dr. De Corning contributes academic rigor and strategic insight, supporting 
    research-driven decision-making, governance, and cross-border institutional 
    collaboration.`,
    img: 'https://picsum.photos/200/200?random=104',
  },
];

const About: React.FC = () => {
  return (
    <div className="bg-[#050505] text-slate-50">
      {/* HERO */}
      <section
        className="px-[8vw] py-32 md:py-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at top left, rgba(212,165,58,0.18), transparent 55%), radial-gradient(circle at bottom right, rgba(212,165,58,0.12), transparent 55%)',
          backgroundColor: '#050505',
        }}
      >
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4A53A] animate-fade-in">
            About Benson Global Inc.
          </p>
          <h1 className="mt-3 font-serif text-3xl leading-tight text-[#FEFAF0] md:text-[2.5rem] animate-fade-in" style={{animationDelay: '0.2s'}}>
            A global wealth and advisory platform built for long-term leadership.
          </h1>
          <p className="mt-6 max-w-3xl text-sm text-[#DDD2AA] md:text-[1.1rem] leading-relaxed animate-fade-in" style={{animationDelay: '0.4s'}}>
            Benson Global Inc. (BG) designs multi-asset investment architectures for
            high-net-worth families, family offices, institutions, athletes, and
            governments. Our work is grounded in disciplined risk management,
            institutional partnerships, and a regenerative philosophy that aligns capital
            with long-term human, economic, and environmental prosperity.
          </p>
        </div>
      </section>

      {/* BG PHILOSOPHY */}
      <section className="border-y border-[#D4A53A]/30 bg-[#050505] px-[8vw] py-20">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center">
          <div>
            <h2 className="font-serif text-3xl text-[#F8F4EA] mb-6">The BG Philosophy</h2>
            <p className="text-sm text-[#D5C79A] mb-6 leading-relaxed">
              The BG Philosophy is a regenerative, global, intergenerational approach to
              wealth creation. It is built on four guiding principles that shape how we
              design strategies, build partnerships, and serve clients across the world.
            </p>
            <ul className="space-y-4 text-sm text-[#E2D6AE]">
              {[
                  "Client Relationship Obsession (CRO)",
                  "Willingness to Think & Invest Long Term",
                  "Eagerness to Invent & Reimagine Systems",
                  "Professional Pride & Excellence"
              ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#D4A53A] shrink-0" />
                      <span>{item}</span>
                  </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-[#C9BC91] italic border-l-2 border-[#D4A53A] pl-4">
              We believe that truly resilient wealth is built when strategy, stewardship,
              and impact are aligned—and when clients are treated as long-term partners,
              not transactions.
            </p>
          </div>
          <div className="flex items-center justify-center relative">
            {/* Decorative Elements */}
            <div className="absolute inset-0 border border-[#D4A53A]/20 rounded-full scale-110 animate-pulse-slow"></div>
            <div className="absolute inset-0 border border-[#D4A53A]/10 rounded-full scale-125"></div>
            
            <div className="relative z-10 bg-black/50 p-8 rounded-full border border-[#D4A53A]/30 backdrop-blur-sm">
                <Shield className="w-40 h-40 text-[#D4A53A]" strokeWidth={0.5} />
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & MANDATE */}
      <section className="bg-[#050607] px-[8vw] py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-3xl text-[#F8F4EA] mb-6">Mission &amp; Mandate</h2>
          <p className="text-base text-[#D5C79A] leading-relaxed mb-6">
            Our mission is to empower global families, institutions, athletes, and nations
            through disciplined, multi-asset wealth architectures and strategic
            partnerships. We exist to connect capital with long-term opportunity and to
            help clients design futures that are financially resilient, globally connected,
            and meaningfully impactful.
          </p>
          <div className="h-px w-24 bg-[#D4A53A] mx-auto mb-6"></div>
          <p className="text-sm text-[#C0B489]">
            We work across public markets, private markets, climate and infrastructure,
            sports and human performance, real estate and global opportunities, and
            regenerative investing—always in concert with world-class institutional
            partners.
          </p>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-[#050505] px-[8vw] py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-serif text-3xl text-[#F8F4EA] mb-4">
            Leadership Team
          </h2>
          <p className="mt-3 text-center text-sm text-[#D5C79A] max-w-2xl mx-auto mb-16">
            Benson Global is led by a team that integrates executive leadership, academic
            rigor, institutional experience, and performance-driven insight.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {leadership.map((leader) => (
              <article
                key={leader.name}
                className="flex gap-6 rounded-sm border border-[#D4A53A]/10 bg-gradient-to-b from-[#14100A] via-[#050505] to-[#050505] p-8 hover:border-[#D4A53A]/30 transition-colors group"
              >
                <div className="mt-1 shrink-0">
                  <img
                    src={leader.img}
                    alt={leader.name}
                    className="h-24 w-24 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border border-[#D4A53A]/20"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-medium text-[#F6EDD8]">
                    {leader.name}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#D4A53A] mb-4">
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
      <section className="bg-[#050607] px-[8vw] py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-serif text-3xl text-[#F8F4EA] mb-4">
            Global Presence
          </h2>
          <p className="text-sm text-[#D5C79A] mb-10">
            Benson Global operates across multiple regions, connecting clients and partners
            with cross-border opportunities and institutional-grade platforms.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {["Canada", "USA", "United Kingdom", "Qatar", "South Africa", "Namibia", "Ghana"].map((country) => (
                <div key={country} className="py-4 border border-white/5 bg-white/5 rounded hover:bg-[#D4A53A] hover:text-black transition-colors cursor-default text-xs uppercase tracking-widest">
                    {country}
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / LINK BACK TO CONTACT */}
      <section className="border-t border-[#D4A53A]/25 bg-black px-[8vw] py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="font-serif text-2xl text-[#F8F4EA]">
            Begin a Confidential Conversation
          </h2>
          <p className="mt-4 text-sm text-[#D5C79A] leading-relaxed">
            Whether you are a family, institution, athlete, or public-sector leader, we
            welcome thoughtful conversations about long-term strategy and capital
            alignment.
          </p>
          <Link
            to="/#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4A53A] px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-black hover:bg-white transition-colors"
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
