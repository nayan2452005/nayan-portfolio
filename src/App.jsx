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
    <div className="min-h-screen bg-[#050505] text-[#a1a1aa] selection:bg-white selection:text-black antialiased overflow-x-hidden font-sans">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
        
        * { 
          cursor: none !important; 
          -webkit-tap-highlight-color: transparent; 
        }

        h1, h2, h3, h4, .font-editorial {
          font-family: 'Playfair Display', serif;
        }

        p, a, span, button, .font-body {
          font-family: 'Inter', sans-serif;
        }
        
        .grid-bg {
          background-color: #050505;
          background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .pro-card {
          background: rgba(10, 10, 10, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 4px; /* Sharper, more architectural corners */
          backdrop-filter: blur(12px);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pro-card:hover {
          background: rgba(20, 20, 20, 0.8);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-4px);
        }

        .pro-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          color: #fff;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
        }

        .pro-btn:hover, .pro-btn:active {
          background: #ffffff;
          border-color: #ffffff;
          color: #000000;
        }

        .pro-btn-inverted {
          background: #ffffff;
          border: 1px solid #ffffff;
          border-radius: 4px;
          color: #000000;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .pro-btn-inverted:hover {
          background: #d4d4d8;
          border-color: #d4d4d8;
        }

        .reveal { 
          opacity: 0; 
          transform: translateY(24px); 
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal-active { 
          opacity: 1; 
          transform: translateY(0); 
        }

        .glow-line {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
          width: 100%;
        }

        @media (max-width: 768px) { 
          * { cursor: auto !important; }
          .cursor-follower, .cursor-dot { display: none; }
          .reveal { transition-duration: 0.8s; }
          .pro-card:hover { transform: translateY(0); }
        }
      `}</style>

      {/* Ultra-Minimalist Cursor Follower */}
      <div 
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] hidden md:flex items-center justify-center cursor-follower"
        style={{ transform: `translate(${followerPos.x - 20}px, ${followerPos.y - 20}px)` }}
      >
        <div className="w-full h-full rounded-full border border-white/30 transition-transform duration-300 ease-out" />
      </div>

      <div 
        className="fixed top-0 left-0 w-1 h-1 pointer-events-none z-[10000] hidden md:block cursor-dot bg-white rounded-full"
        style={{ transform: `translate(${mousePos.x - 2}px, ${mousePos.y - 2}px)` }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-5">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-xl font-editorial font-bold text-white tracking-wide flex items-center gap-3 group">
            <span className="text-white font-editorial italic text-2xl">N</span>
            <span className="uppercase tracking-[0.2em] text-xs font-body font-medium mt-1">Choraria.</span>
          </a>
          
          <div className="hidden md:flex gap-10 text-xs font-medium">
            {navLinks.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-[#a1a1aa] hover:text-white transition-colors uppercase tracking-[0.15em]">{l}</a>
            ))}
          </div>

          <button className="md:hidden text-white z-[110] p-2 hover:text-gray-300 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-[#050505]/98 backdrop-blur-2xl z-[105] flex flex-col items-center justify-center gap-10 transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
           {navLinks.map(l => (
              <a 
                key={l} 
                href={`#${l.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-editorial font-bold text-white tracking-wide active:text-gray-400 transition-colors"
              >
                {l}
              </a>
            ))}
            <div className="flex gap-6 mt-8">
               <a href="https://github.com/nayan2452005" target="_blank" rel="noreferrer" className="text-white hover:text-gray-400 transition-colors"><Github size={24} strokeWidth={1.5}/></a>
               <a href="https://www.linkedin.com/in/nayan-choraria-026076266/" target="_blank" rel="noreferrer" className="text-white hover:text-gray-400 transition-colors"><Linkedin size={24} strokeWidth={1.5}/></a>
            </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="min-h-screen flex items-center pt-24 px-6 relative grid-bg overflow-hidden">
          <div className="max-w-6xl mx-auto w-full relative z-10">
            <div className="reveal">
              <div className="inline-flex items-center gap-4 px-4 py-2 border border-white/10 bg-white/[0.02] backdrop-blur-sm mb-12 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-medium text-white tracking-[0.2em] uppercase">
                  Student @ Jain University
                </span>
              </div>
              
              <h2 className="text-lg md:text-xl text-[#a1a1aa] font-light mb-6 tracking-wide">Nayan Choraria</h2>
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.1] my-4 font-editorial">
                Engineering <span className="italic font-light text-gray-400">Scalable Systems.</span>
                <br />
                Advancing AI.
              </h1>
              
              <p className="text-lg md:text-xl text-[#a1a1aa] max-w-2xl mt-10 leading-relaxed font-light">
                I specialize in architecting intelligent applications and high-performance interfaces. Bridging the gap between complex machine learning models and intuitive user experiences.
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mt-14">
                <a href="#projects" className="pro-btn-inverted px-10 py-4 text-xs uppercase tracking-[0.15em] w-full md:w-auto gap-3 group">
                  View My Work <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </a>
                
                <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
                  <a href="https://github.com/nayan2452005" target="_blank" rel="noopener noreferrer" className="pro-btn p-4" title="GitHub">
                    <Github size={20} strokeWidth={1.5} />
                  </a>
                  <a href="https://www.linkedin.com/in/nayan-choraria-026076266/" target="_blank" rel="noopener noreferrer" className="pro-btn p-4" title="LinkedIn">
                    <Linkedin size={20} strokeWidth={1.5} />
                  </a>
                  <button onClick={copyEmail} className="pro-btn p-4 relative group" title="Copy Email">
                    {copied ? <Check size={20} className="text-white" strokeWidth={1.5} /> : <Mail size={20} strokeWidth={1.5} />}
                    {copied && <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded shadow-lg whitespace-nowrap">Copied</span>}
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
            <div className="flex items-center gap-6 mb-20 reveal">
              <h2 className="text-3xl md:text-4xl font-editorial font-bold text-white tracking-wide">Background</h2>
              <div className="h-px flex-1 bg-white/10 ml-4" />
            </div>
            
            <div className="max-w-3xl space-y-16 reveal">
              <p className="text-2xl md:text-3xl leading-relaxed text-[#a1a1aa] font-editorial font-light italic">
                "Currently pursuing a BCA in Artificial Intelligence at Jain University. My technical philosophy is built on treating systems as evolving structures—<strong className="text-white font-medium not-italic">designed with precision, rigorously tested, and scaled through real-world deployment.</strong>"
              </p>
              
              <div className="pro-card p-10 group border-white/10">
                 <div className="flex items-center gap-4 mb-6">
                   <Target size={20} className="text-white" strokeWidth={1.5} />
                   <h3 className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">Leadership Initiative</h3>
                 </div>
                 
                 <div>
                   <p className="text-2xl md:text-3xl font-editorial font-semibold text-white mb-4">Past Joint Secretary @ Marwari Yuva Manch</p>
                   <p className="text-[#a1a1aa] text-lg leading-relaxed font-light">
                     Fostering community growth, organizing strategic public initiatives, and executing high-level project management through coordinated team governance.
                   </p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section id="expertise" className="py-32 px-6 bg-[#030303] border-y border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-6 mb-20 reveal">
              <h2 className="text-3xl md:text-4xl font-editorial font-bold text-white tracking-wide">Technical Expertise</h2>
              <div className="h-px flex-1 bg-white/10 ml-4" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-20">
              <div className="reveal">
                <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
                  <Terminal className="text-white" size={20} strokeWidth={1.5} />
                  <h3 className="text-lg font-medium text-white tracking-wide uppercase text-sm">Development Stack</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { n: 'Python', i: <Terminal size={18} strokeWidth={1.5}/> },
                    { n: 'C / C++', i: <Cpu size={18} strokeWidth={1.5}/> },
                    { n: 'Java', i: <Code2 size={18} strokeWidth={1.5}/> },
                    { n: 'Machine Learning', i: <Brain size={18} strokeWidth={1.5}/> },
                    { n: 'React Ecosystem', i: <Activity size={18} strokeWidth={1.5}/> },
                    { n: 'SQL Databases', i: <Database size={18} strokeWidth={1.5}/> },
                    { n: 'Cloud & Firebase', i: <Server size={18} strokeWidth={1.5}/> }
                  ].map((s, idx) => (
                    <div key={idx} className="pro-card p-5 flex items-center gap-4 border-white/5 hover:border-white/20">
                      <div className="text-white">{s.i}</div>
                      <span className="text-sm font-light text-white">{s.n}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal">
                <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
                  <Users className="text-white" size={20} strokeWidth={1.5} />
                  <h3 className="text-lg font-medium text-white tracking-wide uppercase text-sm">Core Competencies</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { n: 'Systems Design', i: <Brain size={18} strokeWidth={1.5}/> },
                    { n: 'Technical Research', i: <Search size={18} strokeWidth={1.5}/> },
                    { n: 'Problem Solving', i: <Puzzle size={18} strokeWidth={1.5}/> },
                    { n: 'Communication', i: <MessageSquare size={18} strokeWidth={1.5}/> },
                    { n: 'Project Strategy', i: <Target size={18} strokeWidth={1.5}/> },
                    { n: 'Team Management', i: <Users size={18} strokeWidth={1.5}/> },
                    { n: 'Leadership', i: <Lightbulb size={18} strokeWidth={1.5}/> }
                  ].map((s, idx) => (
                    <div key={idx} className="pro-card p-5 flex items-center gap-4 border-white/5 hover:border-white/20">
                      <div className="text-[#a1a1aa]">{s.i}</div>
                      <span className="text-sm font-light text-white">{s.n}</span>
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
            <div className="flex items-center gap-6 mb-20 reveal">
               <h2 className="text-3xl md:text-4xl font-editorial font-bold text-white tracking-wide">Domain Capabilities</h2>
               <div className="h-px flex-1 bg-white/10 ml-4" />
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  id: 'web',
                  t: "Interface Architecture", 
                  d: "Building high-performance interfaces with meticulous aesthetics. Specializing in responsive, interactive ecosystems that drive user engagement.", 
                  icon: <Laptop size={24} strokeWidth={1.5} /> 
                },
                { 
                  id: 'ai',
                  t: "Applied Intelligence", 
                  d: "Implementing predictive models and intelligent algorithms to parse data, automate workflows, and solve complex logic challenges.", 
                  icon: <Brain size={24} strokeWidth={1.5} /> 
                },
                { 
                  id: 'custom',
                  t: "Systems Engineering", 
                  d: "Designing tailored backend architectures and integrated solutions from the ground up, built specifically for scalable operational workflows.", 
                  icon: <Sparkles size={24} strokeWidth={1.5} /> 
                }
              ].map((service, idx) => (
                <div key={idx} className="reveal">
                  <div 
                    onTouchStart={() => setActiveTouch(service.id)}
                    onTouchEnd={() => setActiveTouch(null)}
                    onTouchCancel={() => setActiveTouch(null)}
                    className={`pro-card p-10 h-full group relative overflow-hidden transition-all
                      ${activeTouch === service.id ? 'border-white bg-white/5' : 'hover:bg-white/[0.02]'}`}
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-5 transition-all duration-500 text-white scale-150">
                      {service.icon}
                    </div>
                    
                    <div className="w-14 h-14 border border-white/20 flex items-center justify-center text-white mb-8 group-hover:bg-white group-hover:text-black transition-all duration-500 rounded-sm">
                      {service.icon}
                    </div>
                    
                    <h3 className="text-2xl font-editorial font-semibold text-white mb-4">
                      {service.t}
                    </h3>
                    <p className="text-[#a1a1aa] leading-relaxed text-sm font-light">
                      {service.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section id="projects" className="py-32 bg-[#030303] border-y border-white/10 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-6 mb-20 reveal">
              <h2 className="text-3xl md:text-4xl font-editorial font-bold text-white tracking-wide">Featured Projects</h2>
              <div className="h-px flex-1 bg-white/10 ml-4" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              {[
                { 
                  t: "Scam Detection Engine", 
                  d: "A machine learning-powered interface designed to analyze and flag fraudulent patterns in real-time, utilizing behavioral heuristics to protect end-users.", 
                  icon: <ShieldCheck size={24} strokeWidth={1.5}/>, 
                  tag: "Machine Learning & UI",
                  link: "https://agentic-honeypot-a41c.onrender.com/docs"
                },
                { 
                  t: "AQI Telemetry Suite", 
                  d: "An end-to-end IoT dashboard aggregating real-time air quality metrics. Features responsive data visualization for historical analysis and environmental monitoring.", 
                  icon: <Activity size={24} strokeWidth={1.5}/>, 
                  tag: "IoT & Data Analytics",
                  link: "#"
                }
              ].map((p, idx) => (
                <a 
                  key={idx} 
                  href={p.link}
                  target={p.link !== "#" ? "_blank" : "_self"}
                  rel={p.link !== "#" ? "noopener noreferrer" : ""}
                  className="pro-card p-10 group reveal relative cursor-pointer border-white/10 hover:border-white/30 block"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="text-white opacity-80 group-hover:opacity-100 transition-opacity">
                      {p.icon}
                    </div>
                    <span className="text-[10px] font-medium tracking-[0.15em] px-3 py-1 text-white uppercase border border-white/20 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-editorial font-semibold text-white mb-4">{p.t}</h3>
                  <p className="text-[#a1a1aa] leading-relaxed mb-10 text-sm font-light">{p.d}</p>
                  
                  <div className="flex items-center text-xs font-medium text-white uppercase tracking-[0.15em] group-hover:text-gray-300 transition-colors">
                    View Project Specs <ArrowUpRight className="ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} strokeWidth={2} />
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-24 border border-white/20 p-12 bg-[#080808] flex flex-col md:flex-row items-center justify-between gap-10 reveal rounded-sm relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at right center, #ffffff 0%, transparent 50%)' }} />
              <div className="flex items-start md:items-center gap-8 relative z-10">
                <div className="hidden sm:block text-white opacity-80">
                  <Database size={40} strokeWidth={1} />
                </div>
                <div>
                  <h3 className="text-3xl font-editorial font-bold text-white tracking-wide mb-3">Ready to scale your vision?</h3>
                  <p className="text-[#a1a1aa] font-light">Let's engineer a bespoke solution tailored to your operational needs.</p>
                </div>
              </div>
              <a href="#connect" className="pro-btn-inverted px-10 py-5 w-full md:w-auto text-center relative z-10 text-xs tracking-[0.15em] uppercase">
                Initiate Dialogue
              </a>
            </div>
          </div>
        </section>

        {/* Connect */}
        <section id="connect" className="py-40 px-6 grid-bg">
          <div className="max-w-3xl mx-auto pro-card p-12 md:p-20 reveal text-center border-white/20 bg-[#050505]/90 rounded-sm">
            <div className="w-16 h-16 mx-auto flex items-center justify-center border border-white/20 text-white mb-10 rounded-full">
              <Mail size={24} strokeWidth={1.5} />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-editorial font-bold text-white mb-6">Let's Connect</h2>
            <p className="text-[#a1a1aa] text-lg mb-12 max-w-lg mx-auto font-light leading-relaxed">
              Open to new opportunities, collaborations, and architectural challenges. Feel free to reach out.
            </p>
            
            <div className="flex flex-col gap-5 max-w-md mx-auto">
              <button onClick={copyEmail} className="pro-btn-inverted px-8 py-5 w-full flex items-center justify-center gap-4 group">
                {copied ? <Check size={20} className="text-black" strokeWidth={2} /> : <Mail size={20} className="text-black" strokeWidth={2} />}
                <span className="text-xs uppercase tracking-[0.15em] font-bold">{copied ? "nayanchoraria111@gmail.com" : "Copy Email Address"}</span>
              </button>
              
              <div className="flex gap-5">
                 <a href="https://github.com/nayan2452005" target="_blank" rel="noopener noreferrer" className="pro-btn flex-1 py-5 flex items-center justify-center gap-3 border-white/20 hover:border-white">
                   <Github size={18} strokeWidth={1.5}/> <span className="text-xs uppercase tracking-[0.15em] font-medium">GitHub</span>
                 </a>
                 <a href="https://www.linkedin.com/in/nayan-choraria-026076266/" target="_blank" rel="noopener noreferrer" className="pro-btn flex-1 py-5 flex items-center justify-center gap-3 border-white/20 hover:border-white">
                   <Linkedin size={18} strokeWidth={1.5}/> <span className="text-xs uppercase tracking-[0.15em] font-medium">LinkedIn</span>
                 </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 bg-[#000000] border-t border-white/10 text-center flex flex-col items-center justify-center">
        <p className="tracking-[0.2em] font-medium uppercase text-[10px] text-white mb-3">© {new Date().getFullYear()} Nayan Choraria</p>
        <p className="text-[10px] text-[#525252] tracking-widest uppercase">Designed & Engineered with Precision</p>
      </footer>
    </div>
  );
}
