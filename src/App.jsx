import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, Github, Linkedin, Menu, X, Code2, 
  Activity, ShieldAlert, Cpu, Users, Target, Mail, Check, Database, Terminal, 
  Brain, Search, MessageSquare, Lightbulb, Puzzle, Laptop, Sparkles, Wrench, ChevronRight
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
      threshold: 0.15,
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

  const navLinks = ['Philosophy', 'Arsenal', 'Services', 'Lab', 'Connect'];

  return (
    <div className="min-h-screen bg-[#050505] text-[#A3A3A3] selection:bg-[#32CD32]/30 selection:text-white antialiased overflow-x-hidden font-sans">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        * { 
          font-family: 'Space Grotesk', sans-serif;
          cursor: none !important; 
          -webkit-tap-highlight-color: transparent; 
        }
        
        .grid-bg {
          background-color: #050505;
          background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .pro-card {
          background: linear-gradient(145deg, rgba(20,20,20,0.9) 0%, rgba(10,10,10,0.9) 100%);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
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
          box-shadow: 0 0 20px rgba(50,205,50,0.15);
          transform: translateY(-2px);
        }

        .reveal { 
          opacity: 0; 
          transform: translateY(30px); 
          transition: opacity 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
          will-change: opacity, transform;
        }
        .reveal-active { 
          opacity: 1; 
          transform: translateY(0); 
        }

        .text-gradient {
          background: linear-gradient(135deg, #FFFFFF 0%, #A3A3A3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .text-gradient-green {
          background: linear-gradient(135deg, #32CD32 0%, #16a34a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .glow-line {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(50,205,50,0.3) 50%, transparent 100%);
          width: 100%;
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(50, 205, 50, 0.4); }
          70% { transform: scale(1); box-shadow: 0 0 0 15px rgba(50, 205, 50, 0); }
          100% { transform: scale(0.8); box-shadow: 0 0 0 0 rgba(50, 205, 50, 0); }
        }
        .core-pulse { animation: pulse-ring 2.5s infinite cubic-bezier(0.4, 0, 0.2, 1); }

        @media (max-width: 768px) { 
          * { cursor: auto !important; }
          .cursor-follower, .cursor-dot { display: none; }
          .reveal { transition-duration: 0.5s; }
        }
      `}</style>

      {/* Sleek Cursor Follower */}
      <div 
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:flex items-center justify-center cursor-follower"
        style={{ transform: `translate(${followerPos.x - 16}px, ${followerPos.y - 16}px)` }}
      >
        <div className="w-full h-full rounded-full border border-[#32CD32]/40 bg-[#32CD32]/5 backdrop-blur-sm transition-transform duration-200 ease-out" />
      </div>

      {/* Center Dot */}
      <div 
        className="fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none z-[10000] hidden md:block cursor-dot bg-[#32CD32] rounded-full shadow-[0_0_10px_#32CD32]"
        style={{ transform: `translate(${mousePos.x - 3}px, ${mousePos.y - 3}px)` }}
      />

      <nav className="fixed top-0 w-full z-[100] bg-[#050505]/80 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-[#111] flex items-center justify-center border border-white/10 group-hover:border-[#32CD32]/50 transition-colors">
              <span className="text-[#32CD32]">N</span>
            </div>
            <span>Choraria.</span>
          </a>
          
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {navLinks.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-[#888] hover:text-[#32CD32] transition-colors uppercase tracking-wider">{l}</a>
            ))}
          </div>

          <button className="md:hidden text-white z-[110] p-2 hover:text-[#32CD32] transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`fixed inset-0 bg-[#050505]/95 backdrop-blur-lg z-[105] flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
           {navLinks.map(l => (
              <a 
                key={l} 
                href={`#${l.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-bold text-white uppercase tracking-widest active:text-[#32CD32]"
              >
                {l}
              </a>
            ))}
            <div className="flex gap-4 mt-8">
               <a href="https://github.com/nayan2452005" target="_blank" className="pro-btn p-3 rounded-full"><Github size={20}/></a>
               <a href="https://www.linkedin.com/in/nayan-choraria-026076266/" target="_blank" className="pro-btn p-3 rounded-full"><Linkedin size={20}/></a>
            </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="min-h-screen flex items-center pt-24 px-6 relative grid-bg overflow-hidden">
          {/* Decorative ambient glow */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#32CD32]/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto w-full relative z-10">
            <div className="reveal">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
                <div className="w-2 h-2 rounded-full bg-[#32CD32] core-pulse" />
                <span className="text-sm font-medium text-white tracking-wide">
                  Student @ Jain University
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl text-[#888] font-medium mb-4 tracking-wide">Nayan Choraria</h2>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[1.05] my-4">
                Decoding <br className="hidden md:block"/>
                <span className="text-gradient-green">Complexity.</span> <br />
                Defining AI.
              </h1>
              
              <p className="text-lg md:text-xl text-[#888] max-w-2xl mt-8 leading-relaxed">
                Architecting intelligent systems and high-performance interfaces. Bridging the gap between raw data and fluid human experiences.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mt-10">
                <a href="#lab" className="pro-btn px-8 py-4 text-sm uppercase tracking-widest w-full md:w-auto gap-2">
                  Enter The Lab <ChevronRight size={16} />
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
                    {copied && <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#111] text-[#32CD32] text-xs font-medium px-3 py-1.5 rounded-md border border-[#32CD32]/30 shadow-lg">Copied!</span>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="glow-line" />

        {/* Philosophy */}
        <section id="philosophy" className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-16 reveal">
              <h2 className="text-4xl font-bold text-white tracking-tight">The Architect</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4" />
            </div>
            
            <div className="max-w-3xl space-y-10 reveal">
              <p className="text-2xl md:text-3xl leading-relaxed text-[#A3A3A3] font-light">
                BCA-AI student at Jain University. I treat systems as living organisms—<strong className="text-white font-medium">designed with precision and evolved through deployment.</strong>
              </p>
              
              <div className="pro-card p-8 group hover:border-[#32CD32]/30">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 rounded-lg bg-[#32CD32]/10 text-[#32CD32]">
                     <Target size={24} />
                   </div>
                   <h3 className="text-sm font-bold tracking-widest text-[#888] uppercase">Legacy Achievement</h3>
                 </div>
                 
                 <div>
                   <p className="text-xl md:text-2xl font-bold text-white mb-2">Joint Secretary @ Marwari Yuva Manch</p>
                   <p className="text-[#A3A3A3] text-lg leading-relaxed">High-stakes public relations and strategic leadership through community governance.</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Arsenal */}
        <section id="arsenal" className="py-32 px-6 bg-[#0a0a0a] border-y border-white/5 relative">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#32CD32]/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-4xl font-bold text-white tracking-tight mb-16 reveal">Skills Arsenal</h2>
            
            <div className="grid md:grid-cols-2 gap-16">
              <div className="reveal">
                <div className="flex items-center gap-3 mb-8">
                  <Cpu className="text-[#32CD32]" size={24} />
                  <h3 className="text-xl font-semibold text-white">Technical Arsenal</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { n: 'Python', i: <Terminal size={18}/> },
                    { n: 'C / C++', i: <Cpu size={18}/> },
                    { n: 'Java', i: <Code2 size={18}/> },
                    { n: 'AI / ML', i: <Brain size={18}/> },
                    { n: 'React Ecosystem', i: <Activity size={18}/> },
                    { n: 'SQL Databases', i: <Database size={18}/> },
                    { n: 'Firebase Cloud', i: <ShieldAlert size={18}/> }
                  ].map((s, idx) => (
                    <div key={idx} className="pro-card p-4 flex items-center gap-3 hover:bg-white/5">
                      <div className="text-[#32CD32] bg-[#32CD32]/10 p-2 rounded-md">{s.i}</div>
                      <span className="text-sm font-medium text-white">{s.n}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal">
                <div className="flex items-center gap-3 mb-8">
                  <Users className="text-[#32CD32]" size={24} />
                  <h3 className="text-xl font-semibold text-white">Core DNA</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { n: 'Logical Design', i: <Brain size={18}/> },
                    { n: 'Research', i: <Search size={18}/> },
                    { n: 'Problem Solving', i: <Puzzle size={18}/> },
                    { n: 'Communication', i: <MessageSquare size={18}/> },
                    { n: 'Strategy', i: <Target size={18}/> },
                    { n: 'Management', i: <Users size={18}/> },
                    { n: 'Leadership', i: <Lightbulb size={18}/> }
                  ].map((s, idx) => (
                    <div key={idx} className="pro-card p-4 flex items-center gap-3 hover:bg-white/5">
                      <div className="text-[#888] bg-[#222] p-2 rounded-md">{s.i}</div>
                      <span className="text-sm font-medium text-white">{s.n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services We Provide */}
        <section id="services" className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-16 reveal">
               <h2 className="text-4xl font-bold text-white tracking-tight">Services Matrix</h2>
               <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4" />
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  id: 'web',
                  t: "Web Development", 
                  d: "High-performance interfaces with pixel-perfect aesthetics and fluid interactions. Building responsive ecosystems.", 
                  icon: <Laptop size={28} /> 
                },
                { 
                  id: 'ai',
                  t: "AI / ML Solutions", 
                  d: "Implementing neural networks and predictive models to solve complex logical hurdles and data patterns.", 
                  icon: <Brain size={28} /> 
                },
                { 
                  id: 'custom',
                  t: "Custom Systems", 
                  d: "Tailored architectural builds designed from the ground up to create something truly unique for your workflow.", 
                  icon: <Sparkles size={28} /> 
                }
              ].map((service, idx) => (
                <div key={idx} className="reveal">
                  <div 
                    onTouchStart={() => setActiveTouch(service.id)}
                    onTouchEnd={() => setActiveTouch(null)}
                    onTouchCancel={() => setActiveTouch(null)}
                    className={`pro-card p-8 h-full group relative overflow-hidden
                      ${activeTouch === service.id ? 'border-[#32CD32] bg-[#32CD32]/5' : 'hover:border-[#32CD32]/50 hover:bg-white/5'}`}
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 text-white">
                      {service.icon}
                    </div>
                    
                    <div className="w-12 h-12 rounded-xl bg-[#222] border border-white/10 flex items-center justify-center text-[#32CD32] mb-6 group-hover:scale-110 group-hover:bg-[#32CD32] group-hover:text-black transition-all duration-300">
                      {service.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-4">
                      {service.t}
                    </h3>
                    <p className="text-[#888] leading-relaxed">
                      {service.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 pro-card p-10 bg-gradient-to-br from-[#111] to-[#050505] flex flex-col md:flex-row items-center justify-between gap-8 reveal border-[#32CD32]/20">
              <div className="flex items-start md:items-center gap-6">
                <div className="p-4 bg-[#32CD32]/10 text-[#32CD32] rounded-2xl hidden sm:block">
                  <Wrench size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-2">Ready to build your vision?</h3>
                  <p className="text-[#888]">Let's engineer a solution tailored to your exact parameters.</p>
                </div>
              </div>
              <a href="#connect" className="pro-btn bg-[#32CD32] border-[#32CD32] text-black px-8 py-4 hover:bg-[#28a728] hover:text-black w-full md:w-auto text-center rounded-xl font-bold">
                Initiate Project
              </a>
            </div>
          </div>
        </section>

        {/* Lab */}
        <section id="lab" className="py-32 bg-[#0a0a0a] border-y border-white/5 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white tracking-tight mb-16 reveal">The R&D Lab</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { t: "Scam Detection UI", d: "Aggressive AI security layer for neutralising automated threats.", icon: <ShieldAlert size={24}/>, tag: "Machine Learning" },
                { t: "AQI Monitor", d: "IoT real-time visualization & telemetry suite for environmental data.", icon: <Activity size={24}/>, tag: "IoT / Data" }
              ].map((p, idx) => (
                <div key={idx} className="pro-card p-8 group reveal relative hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#32CD32]/5 cursor-pointer">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-[#111] border border-white/10 rounded-lg text-[#32CD32]">
                      {p.icon}
                    </div>
                    <span className="text-xs font-medium px-3 py-1 bg-[#32CD32]/10 text-[#32CD32] rounded-full border border-[#32CD32]/20">
                      {p.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#32CD32] transition-colors">{p.t}</h3>
                  <p className="text-[#888] leading-relaxed mb-6">{p.d}</p>
                  
                  <div className="flex items-center text-sm font-bold text-white group-hover:text-[#32CD32] transition-colors">
                    Explore Schematic <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Connect */}
        <section id="connect" className="py-40 px-6 grid-bg relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#32CD32]/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-3xl mx-auto pro-card p-12 md:p-16 reveal text-center border-[#32CD32]/20 bg-[#050505]/80 relative z-10">
            <div className="w-16 h-16 mx-auto bg-[#32CD32]/10 text-[#32CD32] flex items-center justify-center rounded-2xl mb-8 border border-[#32CD32]/20">
              <Terminal size={32} />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Establish Connection</h2>
            <p className="text-[#888] text-lg mb-10 max-w-lg mx-auto">
              Looking for a technical architect to collaborate on the next big update? System is standing by.
            </p>
            
            <div className="flex flex-col gap-6 max-w-md mx-auto">
              <button onClick={copyEmail} className="pro-btn px-8 py-5 w-full flex items-center justify-center gap-3 bg-white/5 border-white/10 hover:border-[#32CD32] hover:bg-[#32CD32]/10 group">
                {copied ? <Check size={24} className="text-[#32CD32]" /> : <Mail size={24} className="group-hover:text-[#32CD32] transition-colors" />}
                <span className="font-semibold text-lg">{copied ? "Address Copied!" : "Copy Email Address"}</span>
              </button>
              
              <div className="flex gap-4">
                 <a href="https://github.com/nayan2452005" target="_blank" rel="noopener noreferrer" className="pro-btn flex-1 py-4 flex items-center justify-center gap-2 bg-white/5">
                   <Github size={20}/> <span className="font-medium">GitHub</span>
                 </a>
                 <a href="https://www.linkedin.com/in/nayan-choraria-026076266/" target="_blank" rel="noopener noreferrer" className="pro-btn flex-1 py-4 flex items-center justify-center gap-2 bg-white/5">
                   <Linkedin size={20}/> <span className="font-medium">LinkedIn</span>
                 </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-[#050505] border-t border-white/5 text-center text-[#555] text-sm flex flex-col items-center justify-center">
        <p className="tracking-widest font-medium uppercase mb-2">© 2026 NAYAN CHORARIA</p>
        <p className="text-xs text-[#333]">SYSTEM BUILD 2.0-PRO</p>
      </footer>
    </div>
  );
}
