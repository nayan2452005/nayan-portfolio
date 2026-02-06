import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, ChevronDown, Menu, X, Code2, Brain, Sparkles, ExternalLink, Activity, ShieldAlert, Cpu, Copy, Check, Users, Landmark } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:italic@0;1&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Initialize intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#020203] text-zinc-400 selection:bg-cyan-500/20 selection:text-cyan-100 font-sans antialiased overflow-x-hidden cursor-none">
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-active {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
      `}</style>

      {/* Custom Cursor Tracker */}
      <div 
        className="fixed top-0 left-0 w-8 h-8 border border-cyan-500/50 rounded-full pointer-events-none z-[9999] transition-transform duration-150 ease-out hidden md:block"
        style={{ 
          transform: `translate(${mousePos.x - 16}px, ${mousePos.y - 16}px)`,
        }}
      />
      <div 
        className="fixed top-0 left-0 w-1 h-1 bg-cyan-500 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ 
          transform: `translate(${mousePos.x - 2}px, ${mousePos.y - 2}px)`,
        }}
      />

      {/* Muted Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div 
          className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-cyan-900/10 rounded-full blur-[100px] transition-transform duration-700 ease-out"
          style={{ transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)` }}
        />
        <div 
          className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-purple-900/5 rounded-full blur-[100px] transition-transform duration-700 ease-out"
          style={{ transform: `translate(${-mousePos.x * 0.01}px, ${-mousePos.y * 0.01}px)` }}
        />
      </div>

      <Navbar activeSection={activeSection} />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------------- SHARED COMPONENTS ---------------- */

function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`py-24 md:py-32 relative z-10 ${className}`}>
      {children}
    </section>
  );
}

function Container({ children, className = "" }) {
  return (
    <div className={`max-w-6xl mx-auto px-6 md:px-12 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ number, title }) {
  return (
    <div className="flex items-center gap-4 mb-12 md:mb-16 group reveal">
      <span className="font-mono text-xs text-cyan-500/60 font-bold">{number}</span>
      <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase italic transition-transform group-hover:translate-x-2 duration-300">
        {title}
      </h2>
      <div className="h-[1px] bg-zinc-800 flex-1 ml-4" />
    </div>
  );
}

/* ---------------- NAVBAR ---------------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#work' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#020203]/80 backdrop-blur-md py-4' : 'bg-transparent py-8'
      }`}
    >
      <Container className="flex justify-between items-center">
        <a href="#" className="text-xl font-black tracking-tighter text-white z-50 hover:opacity-70 transition-all hover:scale-105">
          NC<span className="text-cyan-500">.</span>
        </a>

        <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-zinc-500 hover:text-white transition-all relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <button 
          className="md:hidden text-white z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-[#020203] flex flex-col items-center justify-center gap-10 md:hidden animate-in fade-in duration-300">
             {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl text-white font-black hover:text-cyan-400 uppercase italic tracking-tighter"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </Container>
    </nav>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      <Container className="relative z-10">
        <div className="max-w-4xl">
          <div className="flex flex-col gap-4 mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
              Student @ Jain University
            </div>
            
            <h2 className="text-xl md:text-2xl font-normal text-white/80 font-['Instrument_Serif'] italic tracking-tight">
               Nayan Choraria
            </h2>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black tracking-tighter text-white leading-[0.9] mb-12 uppercase italic animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
            Decoding <br />
            <span className="text-transparent transition-all duration-500 hover:text-white/10" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)' }}>Complexity</span> <br />
            <span className="text-cyan-500/80">Defining AI</span>
          </h1>

          <p className="text-base md:text-lg text-zinc-500 max-w-xl leading-relaxed mb-12 font-medium border-l border-zinc-800 pl-6 transition-colors hover:border-cyan-500/50 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            BCA-AI student at Jain University. Bridging the gap between <span className="text-zinc-300">mathematical logic</span> and autonomous systems through a calculative visionary lens.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <a 
              href="#work" 
              className="group relative inline-flex items-center justify-center h-14 px-10 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest transition-all hover:bg-cyan-400 active:scale-95 duration-300"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center h-14 px-10 rounded-full border border-zinc-800 text-zinc-400 text-xs font-black uppercase tracking-widest hover:border-zinc-600 hover:text-white transition-all duration-300 active:scale-95"
            >
              Contact
            </a>
          </div>
        </div>
      </Container>
      
      <div className="absolute bottom-10 left-12 text-zinc-800 hidden md:block animate-bounce">
        <div className="flex flex-col items-center gap-4">
            <div className="h-20 w-[1px] bg-gradient-to-b from-transparent to-zinc-800" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Scroll</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */

function About() {
  return (
    <Section id="about" className="bg-[#040406]">
      <Container>
        <SectionHeading number="01" title="The Architect" />
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="space-y-8 text-lg text-zinc-500 font-medium reveal">
            <p className="leading-relaxed">
              <strong className="text-white text-2xl block mb-4 italic uppercase font-black tracking-tighter">Obsessed with logic.</strong>
              I dissect complex problems to find elegant solutions. My focus is on the intersection of data integrity and model performance.
            </p>
            
            <div className="p-6 rounded-2xl bg-cyan-500/[0.03] border border-cyan-500/10 flex items-start gap-4 transition-all hover:bg-cyan-500/[0.08] hover:border-cyan-500/30 group reveal reveal-delay-1">
               <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-500 mt-1 transition-transform group-hover:scale-110">
                 <Users size={18} />
               </div>
               <div>
                  <h4 className="text-zinc-200 font-bold uppercase text-xs tracking-widest mb-1">Joint Secretary</h4>
                  <p className="text-sm text-zinc-500 italic">Marwari Yuva Manch</p>
                  <p className="text-xs text-zinc-600 mt-2 transition-colors group-hover:text-zinc-400">Spearheading social initiatives and organizational strategy with a focus on impact-driven leadership.</p>
               </div>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 italic text-zinc-400 hover:text-zinc-300 transition-colors reveal reveal-delay-2">
               "I dream in data but execute with calculation. Every big vision requires a surgical strategy to come to life."
            </div>
          </div>

          <div className="relative reveal reveal-delay-1">
            <div className="aspect-square rounded-3xl bg-zinc-900 border border-white/5 p-8 flex items-center justify-center relative overflow-hidden group transition-all duration-700 hover:border-cyan-500/30 hover:scale-[1.02]">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                
                <div className="grid grid-cols-2 gap-4 relative z-10 w-full">
                  {[
                    { label: "Vision", val: "100%", color: "bg-cyan-500" },
                    { label: "Logic", val: "95%", color: "bg-white/40" },
                    { label: "Leadership", val: "Joint Sec", color: "bg-white/40" },
                    { label: "AI", val: "Core", color: "bg-cyan-500/50" }
                  ].map(stat => (
                    <div key={stat.label} className="bg-white/5 p-5 rounded-xl border border-white/5 transition-all hover:bg-white/[0.08] hover:-translate-y-1">
                      <span className="text-[9px] uppercase font-bold text-zinc-600 block mb-1 tracking-widest">{stat.label}</span>
                      <span className="text-lg font-black text-zinc-200">{stat.val}</span>
                      <div className="h-0.5 w-full mt-2 bg-zinc-800 rounded-full overflow-hidden">
                         <div className={`h-full ${stat.color} transition-all duration-1000 w-0 group-hover:w-full`} />
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ---------------- SKILLS ---------------- */

function Skills() {
  const [activeTab, setActiveTab] = useState('technical');

  const skills = {
    technical: [
      { name: "Python / AI", icon: <Cpu size={24} /> },
      { name: "Data Analysis", icon: <Activity size={24} /> },
      { name: "Web Systems", icon: <ExternalLink size={24} /> },
      { name: "IoT Arch", icon: <Cpu size={24} /> },
      { name: "Documentation", icon: <Code2 size={24} /> },
      { name: "Git Workflow", icon: <Github size={24} /> }
    ],
    essence: [
      { name: "Leadership", icon: "👑" },
      { name: "Vision", icon: "🔭" },
      { name: "Strategy", icon: "♟️" },
      { name: "Creative", icon: "💡" },
      { name: "Speaker", icon: "🎙️" },
      { name: "Agile", icon: "🌊" }
    ]
  };

  return (
    <Section id="skills">
      <Container>
        <SectionHeading number="02" title="The Arsenal" />

        <div className="flex gap-4 mb-12 reveal">
          {['technical', 'essence'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95 ${
                activeTab === tab 
                ? 'bg-white text-black' 
                : 'border border-zinc-800 text-zinc-600 hover:text-white hover:border-zinc-500'
              }`}
            >
              {tab === 'technical' ? 'Technical' : 'Core DNA'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skills[activeTab].map((skill, idx) => (
            <div 
              key={skill.name} 
              className={`group p-8 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all duration-500 cursor-default reveal reveal-delay-${(idx % 3) + 1}`}
            >
              <div className="mb-4 opacity-30 group-hover:opacity-100 group-hover:text-cyan-500 transition-all duration-500 transform group-hover:scale-110">
                {skill.icon}
              </div>
              <h3 className="text-zinc-200 font-bold uppercase italic text-sm tracking-wide">{skill.name}</h3>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ---------------- WORK ---------------- */

function Work() {
  const projects = [
    {
      title: "Honeypot Scam Detection",
      description: "Aggressive AI security layer designed to bait and neutralize malicious actors.",
      tech: ["Security", "Python", "ML"],
      icon: <ShieldAlert className="group-hover:text-cyan-500" />
    },
    {
      title: "AQI Monitor Pro",
      description: "Real-time environmental data visualization engine using IoT sensor data.",
      tech: ["IoT", "React", "Data"],
      icon: <Activity className="group-hover:text-cyan-500" />
    }
  ];

  return (
    <Section id="work" className="bg-[#040406]">
      <Container>
        <SectionHeading number="03" title="Projects" />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`group p-8 rounded-3xl bg-[#020203] border border-white/5 hover:border-cyan-500/20 hover:-translate-y-2 transition-all duration-500 overflow-hidden relative reveal reveal-delay-${index + 1}`}
            >
                <div className="absolute -right-20 -top-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all duration-500" />
                
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="p-3 rounded-xl bg-white/5 text-zinc-500 transition-colors group-hover:bg-cyan-500/10 group-hover:text-cyan-500">
                    {project.icon}
                  </div>
                  <ArrowUpRight className="text-zinc-800 group-hover:text-cyan-500 transition-all group-hover:rotate-45" size={20} />
                </div>
                
                <h3 className="text-2xl font-black text-white uppercase italic mb-3 relative z-10 transition-colors group-hover:text-cyan-50">
                  {project.title}
                </h3>
                
                <p className="text-zinc-500 text-sm mb-8 leading-relaxed relative z-10">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 relative z-10">
                  {project.tech.map(t => (
                    <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-zinc-700 group-hover:text-cyan-500/60 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ---------------- CONTACT ---------------- */

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "nayanchoraria111@gmail.com";

  const copyEmail = () => {
    const el = document.createElement('textarea');
    el.value = email;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section id="contact">
      <Container>
        <div className="relative py-20 px-8 rounded-3xl bg-white/[0.01] border border-white/5 text-center overflow-hidden group reveal">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-12 relative z-10">
            Let's Start <br />
             <span className="text-zinc-800 group-hover:text-zinc-600 transition-colors duration-700">Something Big.</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button
              onClick={copyEmail}
              className={`h-14 px-10 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all active:scale-95 ${
                copied ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-cyan-400'
              }`}
            >
              {copied ? 'Copied!' : 'Copy Email Address'}
            </button>

            <a
              href="https://www.linkedin.com/in/nayan-choraria-026076266/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-14 px-10 rounded-full border border-zinc-800 text-zinc-500 font-bold uppercase tracking-widest text-[10px] hover:text-white hover:border-cyan-500/50 transition-all flex items-center gap-2 active:scale-95"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
          </div>
          
          <div className="mt-10 text-zinc-800 font-mono text-[10px] uppercase tracking-[0.4em] relative z-10 transition-colors group-hover:text-zinc-700">
            {email}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-[#020203] relative z-10">
      <Container className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-lg font-black text-white italic hover:text-cyan-500 transition-colors cursor-pointer">
          NC<span className="text-cyan-500">.</span>
        </div>

        <div className="flex gap-8">
          {[
            { icon: <Github size={18} />, href: "https://github.com/nayan2452005" },
            { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/nayan-choraria-026076266/" }
          ].map((social, i) => (
            <a 
              key={i}
              href={social.href} 
              target="_blank" 
              className="text-zinc-800 hover:text-cyan-500 hover:scale-125 transition-all"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <p className="text-zinc-800 text-[9px] uppercase font-bold tracking-[0.4em]">
          © 2026 CALCULATIVE VISIONARY
        </p>
      </Container>
    </footer>
  );
}