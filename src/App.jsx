import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, Github, Linkedin, Menu, X, Code2, 
  Activity, ShieldCheck, Cpu, Users, Target, Mail, Check, Database, Terminal, 
  Brain, Search, MessageSquare, Lightbulb, Puzzle, Laptop, Sparkles, ChevronRight, Server
} from 'lucide-react';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [followerPos, setFollowerPos] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTouch, setActiveTouch] = useState(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    let rafId;
    const followMouse = () => {
      setFollowerPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.15,
        y: prev.y + (mousePos.y - prev.y) * 0.15
      }));
      rafId = requestAnimationFrame(followMouse);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(followMouse);

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

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [mousePos]);

  const copyEmail = () => {
    const email = "nayanchoraria111@gmail.com";
    const el = document.createElement('textarea');
    el.value = email;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = ['About', 'Expertise', 'Capabilities', 'Projects', 'Connect'];

  return (
    <div className="min-h-screen bg-[#030303] text-[#A3A3A3] selection:bg-[#32CD32]/30 selection:text-white antialiased overflow-x-hidden font-sans">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        * { 
          cursor: none !important; 
          -webkit-tap-highlight-color: transparent; 
        }

        h1, h2, h3, h4, .font-heading {
          font-family: 'Space Grotesk', sans-serif;
        }

        p, a, span, button, .font-body {
          font-family: 'Inter', sans-serif;
        }
        
        .grid-bg {
          background-color: #030303;
          background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .pro-card {
          background: linear-gradient(145deg, rgba(20,20,20,0.6) 0%, rgba(10,10,10,0.8) 100%);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          backdrop-filter: blur(12px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pro-card:hover {
          border-color: rgba(50, 205, 50, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 12px 30px -10px rgba(50, 205, 50, 0.1);
        }

        .pro-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: #fff;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
        }

        .pro-btn:hover, .pro-btn:active {
          background: rgba(50,205,50,0.1);
          border-color: #32CD32;
          color: #32CD32;
        }

        .reveal { 
          opacity: 0; 
          transform: translateY(20px); 
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal-active { 
          opacity: 1; 
          transform: translateY(0); 
        }
        
        .text-gradient-green {
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .glow-line {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(50,205,50,0.4) 50%, transparent 100%);
          width: 100%;
          opacity: 0.5;
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(50, 205, 50, 0.4); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(50, 205, 50, 0); }
          100% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(50, 205, 50, 0); }
        }
        .core-pulse { animation: pulse-ring 2.5s infinite cubic-bezier(0.4, 0, 0.2, 1); }

        @media (max-width: 768px) { 
          * { cursor: auto !important; }
          .cursor-follower, .cursor-dot { display: none; }
          .reveal { transition-duration: 0.6s; }
          .pro-card:hover { transform: translateY(0); }
        }
      `}</style>

      {/* Sleek Cursor Follower */}
      <div 
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:flex items-center justify-center cursor-follower"
        style={{ transform: `translate(${followerPos.x - 16}px, ${followerPos.y - 16}px)` }}
      >
        <div className="w-full h-full rounded-full border border-[#32CD32]/40 bg-[#32CD32]/5 backdrop-blur-sm transition-transform duration-200 ease-out" />
      </div>

      <div 
        className="fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none z-[10000] hidden md:block cursor-dot bg-[#32CD32] rounded-full shadow-[0_0_10px_#32CD32]"
        style={{ transform: `translate(${mousePos.x - 3}px, ${mousePos.y - 3}px)` }}
      />

      <nav className="fixed top-0 w-full z-[100] bg-[#030303]/80 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-xl font-heading font-bold text-white tracking-tight flex items-center gap-3 group">
            <div className="w-8 h-8 rounded bg-[#111] flex items-center justify-center border border-white/10 group-hover:border-[#32CD32]/50 transition-colors">
              <span className="text-[#32CD32] font-heading">N</span>
            </div>
            <span>Choraria.</span>
          </a>
          
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {navLinks.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-[#888] hover:text-[#32CD32] transition-colors uppercase tracking-wider text-xs">{l}</a>
            ))}
          </div>

          <button className="md:hidden text-white z-[110] p-2 hover:text-[#32CD32] transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-[#030303]/98 backdrop-blur-2xl z-[105] flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
           {navLinks.map(l => (
              <a 
                key={l} 
                href={`#${l.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-heading font-bold text-white uppercase tracking-widest active:text-[#32CD32]"
              >
                {l}
              </a>
            ))}
            <div className="flex gap-4 mt-8">
               <a href="https://github.com/nayan2452005" target="_blank" rel="noreferrer" className="pro-btn p-3 rounded-full"><Github size={20}/></a>
               <a href="https://www.linkedin.com/in/nayan-choraria-026076266/" target="_blank" rel="noreferrer" className="pro-btn p-3 rounded-full"><Linkedin size={20}/></a>
            </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center pt-24 px-6 relative grid-bg overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#32CD32]/5 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto w-full relative z-10">
            <div className="reveal">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
                <div className="w-2 h-2 rounded-full bg-[#32CD32] core-pulse" />
                <span className="text-xs font-medium text-white tracking-wide uppercase">
                  Student @ Jain University
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl text-[#888] font-medium mb-4 tracking-wide font-heading">Hi, I'm Nayan Choraria.</h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.05] my-4 font-heading">
                Engineering <br className="hidden md:block"/>
                <span className="text-gradient-green">Scalable Systems.</span> <br />
                Advancing AI.
              </h1>
              
              <p className="text-lg md:text-xl text-[#888] max-w-2xl mt-8 leading-relaxed font-light">
                I specialize in architecting intelligent applications and high-performance interfaces. Bridging the gap between complex machine learning models and intuitive user experiences.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mt-12">
                <a href="#projects" className="pro-btn px-8 py-4 text-sm uppercase tracking-widest w-full md:w-auto gap-2 group">
                  View My Work <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                
                <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
                  <a href="https://github.com/nayan2452005" target="_blank" rel="noopener noreferrer" className="pro-btn p-4 rounded-xl" title="GitHub">
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/nayan-choraria-026076266/" target="_blank" rel="noopener noreferrer" className="pro-btn p-4 rounded-xl" title="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                  <button onClick={copyEmail} className="pro-btn p-4 rounded-xl relative group" title="Copy Email">
                    {copied ? <Check size={20} className="text-[#32CD32]" /> : <Mail size={20} />}
                    {copied && <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#111] text-[#32CD32] text-xs font-medium px-3 py-1.5 rounded-md border border-[#32CD32]/30 shadow-lg whitespace-nowrap">Email Copied!</span>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="glow-line" />

        {/* About / Philosophy */}
        <section id="about" className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-16 reveal">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-heading">Background</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4" />
            </div>
            
            <div className="max-w-3xl space-y-12 reveal">
              <p className="text-xl md:text-2xl leading-relaxed text-[#A3A3A3] font-light">
                Currently pursuing a BCA in Artificial Intelligence at Jain University. My technical philosophy is built on treating systems as evolving structures—<strong className="text-white font-medium">designed with precision, rigorously tested, and scaled through real-world deployment.</strong>
              </p>
              
              <div className="pro-card p-8 group">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 rounded-lg bg-[#32CD32]/10 text-[#32CD32]">
                     <Target size={20} />
                   </div>
                   <h3 className="text-xs font-bold tracking-widest text-[#888] uppercase font-heading">Leadership Initiative</h3>
                 </div>
                 
                 <div>
                   <p className="text-xl md:text-2xl font-bold text-white mb-3 font-heading">Joint Secretary @ Marwari Yuva Manch</p>
                   <p className="text-[#A3A3A3] text-base leading-relaxed">
                     Fostering community growth, organizing strategic public initiatives, and executing high-level project management through coordinated team governance.
                   </p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section id="expertise" className="py-32 px-6 bg-[#080808] border-y border-white/5 relative">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#32CD32]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-16 reveal font-heading">Technical Expertise</h2>
            
            <div className="grid md:grid-cols-2 gap-16">
              <div className="reveal">
                <div className="flex items-center gap-3 mb-8">
                  <Terminal className="text-[#32CD32]" size={24} />
                  <h3 className="text-xl font-semibold text-white font-heading">Development Stack</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { n: 'Python', i: <Terminal size={18}/> },
                    { n: 'C / C++', i: <Cpu size={18}/> },
                    { n: 'Java', i: <Code2 size={18}/> },
                    { n: 'Machine Learning', i: <Brain size={18}/> },
                    { n: 'React Ecosystem', i: <Activity size={18}/> },
                    { n: 'SQL Databases', i: <Database size={18}/> },
                    { n: 'Cloud & Firebase', i: <Server size={18}/> }
                  ].map((s, idx) => (
                    <div key={idx} className="pro-card p-4 flex items-center gap-3 hover:bg-white/5 border-white/5">
                      <div className="text-[#32CD32] bg-[#32CD32]/10 p-2 rounded-md">{s.i}</div>
                      <span className="text-sm font-medium text-white">{s.n}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal">
                <div className="flex items-center gap-3 mb-8">
                  <Users className="text-[#32CD32]" size={24} />
                  <h3 className="text-xl font-semibold text-white font-heading">Core Competencies</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { n: 'Systems Design', i: <Brain size={18}/> },
                    { n: 'Technical Research', i: <Search size={18}/> },
                    { n: 'Problem Solving', i: <Puzzle size={18}/> },
                    { n: 'Communication', i: <MessageSquare size={18}/> },
                    { n: 'Project Strategy', i: <Target size={18}/> },
                    { n: 'Team Management', i: <Users size={18}/> },
                    { n: 'Leadership', i: <Lightbulb size={18}/> }
                  ].map((s, idx) => (
                    <div key={idx} className="pro-card p-4 flex items-center gap-3 hover:bg-white/5 border-white/5">
                      <div className="text-[#888] bg-[#222] p-2 rounded-md">{s.i}</div>
                      <span className="text-sm font-medium text-white">{s.n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities (Services) */}
        <section id="capabilities" className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-16 reveal">
               <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-heading">Domain Capabilities</h2>
               <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4" />
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  id: 'web',
                  t: "Web & Interface Architecture", 
                  d: "Building high-performance interfaces with pixel-perfect aesthetics. Specializing in responsive, interactive ecosystems that drive user engagement.", 
                  icon: <Laptop size={26} /> 
                },
                { 
                  id: 'ai',
                  t: "AI & Machine Learning", 
                  d: "Implementing predictive models and intelligent algorithms to parse data, automate workflows, and solve complex logic challenges.", 
                  icon: <Brain size={26} /> 
                },
                { 
                  id: 'custom',
                  t: "Custom Systems Engineering", 
                  d: "Designing tailored backend architectures and integrated solutions from the ground up, built specifically for scalable operational workflows.", 
                  icon: <Sparkles size={26} /> 
                }
              ].map((service, idx) => (
                <div key={idx} className="reveal">
                  <div 
                    onTouchStart={() => setActiveTouch(service.id)}
                    onTouchEnd={() => setActiveTouch(null)}
                    onTouchCancel={() => setActiveTouch(null)}
                    className={`pro-card p-8 h-full group relative overflow-hidden transition-colors
                      ${activeTouch === service.id ? 'border-[#32CD32] bg-[#32CD32]/5' : ''}`}
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 text-white">
                      {service.icon}
                    </div>
                    
                    <div className="w-12 h-12 rounded-xl bg-[#111] border border-white/10 flex items-center justify-center text-[#32CD32] mb-6 group-hover:scale-110 group-hover:bg-[#32CD32] group-hover:text-black transition-all duration-300 shadow-lg shadow-black/50">
                      {service.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4 font-heading">
                      {service.t}
                    </h3>
                    <p className="text-[#888] leading-relaxed text-sm">
                      {service.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section id="projects" className="py-32 bg-[#080808] border-y border-white/5 px-6 relative">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#32CD32]/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-16 reveal font-heading">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { 
                  t: "Scam Detection Engine", 
                  d: "A machine learning-powered interface designed to analyze and flag fraudulent patterns in real-time, utilizing behavioral heuristics to protect end-users.", 
                  icon: <ShieldCheck size={24}/>, 
                  tag: "Machine Learning & UI" 
                },
                { 
                  t: "AQI Telemetry Suite", 
                  d: "An end-to-end IoT dashboard aggregating real-time air quality metrics. Features responsive data visualization for historical analysis and environmental monitoring.", 
                  icon: <Activity size={24}/>, 
                  tag: "IoT & Data Analytics" 
                }
              ].map((p, idx) => (
                <div key={idx} className="pro-card p-8 group reveal relative cursor-pointer">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-[#111] border border-white/10 rounded-lg text-[#32CD32] group-hover:bg-[#32CD32]/10 transition-colors">
                      {p.icon}
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 bg-[#222] text-[#A3A3A3] rounded-full border border-white/10 group-hover:border-[#32CD32]/30 group-hover:text-[#32CD32] transition-colors">
                      {p.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#32CD32] transition-colors font-heading">{p.t}</h3>
                  <p className="text-[#888] leading-relaxed mb-8 text-sm">{p.d}</p>
                  
                  <div className="flex items-center text-sm font-bold text-white group-hover:text-[#32CD32] transition-colors uppercase tracking-wider">
                    View Project Specs <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 pro-card p-10 bg-gradient-to-br from-[#111] to-[#050505] flex flex-col md:flex-row items-center justify-between gap-8 reveal border-[#32CD32]/20">
              <div className="flex items-start md:items-center gap-6">
                <div className="p-4 bg-[#32CD32]/10 text-[#32CD32] rounded-2xl hidden sm:block">
                  <Database size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-2 font-heading">Ready to scale your vision?</h3>
                  <p className="text-[#888]">Let's engineer a bespoke solution tailored to your operational needs.</p>
                </div>
              </div>
              <a href="#connect" className="px-8 py-4 bg-[#32CD32] text-black hover:bg-[#28a728] rounded-xl font-bold transition-colors w-full md:w-auto text-center font-heading">
                Initiate Dialogue
              </a>
            </div>
          </div>
        </section>

        {/* Connect */}
        <section id="connect" className="py-40 px-6 grid-bg relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#32CD32]/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-3xl mx-auto pro-card p-12 md:p-16 reveal text-center border-[#32CD32]/20 bg-[#050505]/80 relative z-10">
            <div className="w-16 h-16 mx-auto bg-[#32CD32]/10 text-[#32CD32] flex items-center justify-center rounded-2xl mb-8 border border-[#32CD32]/20 shadow-[0_0_30px_rgba(50,205,50,0.15)]">
              <Mail size={32} />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight font-heading">Let's Connect</h2>
            <p className="text-[#888] text-lg mb-10 max-w-lg mx-auto">
              Open to new opportunities, collaborations, and architectural challenges. Feel free to reach out.
            </p>
            
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              <button onClick={copyEmail} className="pro-btn px-8 py-5 w-full flex items-center justify-center gap-3 bg-white/5 border-white/10 hover:border-[#32CD32] hover:bg-[#32CD32]/10 group">
                {copied ? <Check size={22} className="text-[#32CD32]" /> : <Mail size={22} className="group-hover:text-[#32CD32] transition-colors" />}
                <span className="font-semibold text-lg">{copied ? "nayanchoraria111@gmail.com" : "Copy Email Address"}</span>
              </button>
              
              <div className="flex gap-4">
                 <a href="https://github.com/nayan2452005" target="_blank" rel="noopener noreferrer" className="pro-btn flex-1 py-4 flex items-center justify-center gap-2 bg-white/5 hover:border-[#32CD32]/50">
                   <Github size={20}/> <span className="font-medium">GitHub</span>
                 </a>
                 <a href="https://www.linkedin.com/in/nayan-choraria-026076266/" target="_blank" rel="noopener noreferrer" className="pro-btn flex-1 py-4 flex items-center justify-center gap-2 bg-white/5 hover:border-[#32CD32]/50">
                   <Linkedin size={20}/> <span className="font-medium">LinkedIn</span>
                 </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-[#030303] border-t border-white/5 text-center text-[#555] text-sm flex flex-col items-center justify-center">
        <p className="tracking-widest font-medium uppercase mb-2">© {new Date().getFullYear()} NAYAN CHORARIA</p>
        <p className="text-xs text-[#444]">Designed & Engineered with Precision</p>
      </footer>
    </div>
  );
}
