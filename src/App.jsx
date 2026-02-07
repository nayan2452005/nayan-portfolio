import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, Github, Linkedin, Menu, X, Code2, 
  Activity, ShieldAlert, Cpu, Users, Target, Mail, Check, Database, Terminal, 
  Brain, Search, MessageSquare, Lightbulb, Puzzle, Laptop, Sparkles, Wrench
} from 'lucide-react';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [followerPos, setFollowerPos] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    let rafId;
    const followMouse = () => {
      setFollowerPos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * 0.12,
        y: prev.y + (mousePos.y - prev.y) * 0.12
      }));
      rafId = requestAnimationFrame(followMouse);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(followMouse);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, { threshold: 0.15 });

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

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#AAAAAA] selection:bg-[#32CD32]/40 selection:text-white antialiased overflow-x-hidden text-[14px]"
         style={{ fontFamily: "'VT323', monospace" }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        
        * { cursor: none !important; image-rendering: pixelated; }
        
        .mc-container {
          background: #c6c6c6;
          border-top: 2px solid #ffffff;
          border-left: 2px solid #ffffff;
          border-right: 2px solid #555555;
          border-bottom: 2px solid #555555;
          box-shadow: inset -2px -2px 0 #8b8b8b, inset 2px 2px 0 #dbdbdb;
        }

        .mc-btn {
          background: #c6c6c6;
          border: 2px solid #000;
          box-shadow: inset -2px -2px 0 #555555, inset 2px 2px 0 #ffffff;
          padding: 4px 12px;
          color: #3f3f3f;
          transition: all 0.1s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .mc-btn:hover {
          background: #32CD32;
          color: white;
          box-shadow: inset -2px -2px 0 #1a6b1a, inset 2px 2px 0 #a5e0a5;
        }

        .reveal { 
          opacity: 0; 
          transform: translateY(30px); 
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .reveal-active { 
          opacity: 1; 
          transform: translateY(0); 
        }

        .grass-divider {
          height: 12px;
          background: #4ca43e;
          border-bottom: 4px solid #3d8432;
          width: 100%;
        }
        
        .dirt-texture {
          background-color: #79553a;
          background-image: repeating-conic-gradient(#6d4c33 0% 25%, transparent 0% 50%) 50% / 8px 8px;
        }

        @keyframes xp-glow {
          0%, 100% { filter: drop-shadow(0 0 2px #7bff00) brightness(1); }
          50% { filter: drop-shadow(0 0 8px #fffb00) brightness(1.2); }
        }
        .xp-orb { animation: xp-glow 1s infinite ease-in-out; }

        @keyframes furnace-glow {
          0%, 100% { fill: #ff9900; filter: drop-shadow(0 0 2px #ff4400); }
          50% { fill: #ffcc00; filter: drop-shadow(0 0 5px #ffaa00); }
        }
        .burn-active { animation: furnace-glow 1.2s infinite ease-in-out; }

        @media (max-width: 768px) { 
          * { cursor: auto !important; }
          .cursor-xp, .crosshair { display: none; }
        }
      `}</style>

      {/* XP Orb Cursor Follower */}
      <div 
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] hidden md:block cursor-xp"
        style={{ transform: `translate(${followerPos.x - 12}px, ${followerPos.y - 12}px)` }}
      >
        <svg width="24" height="24" viewBox="0 0 8 8" className="xp-orb">
          <rect x="2" y="0" width="4" height="8" fill="#4ade80" />
          <rect x="0" y="2" width="8" height="4" fill="#4ade80" />
          <rect x="2" y="2" width="4" height="4" fill="#fef08a" />
          <rect x="3" y="3" width="2" height="2" fill="#ffffff" />
          <rect x="2" y="0" width="4" height="1" fill="#166534" />
          <rect x="2" y="7" width="4" height="1" fill="#166534" />
          <rect x="0" y="2" width="1" height="4" fill="#166534" />
          <rect x="7" y="2" width="1" height="4" fill="#166534" />
        </svg>
      </div>

      {/* Crosshair */}
      <div 
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[10000] hidden md:block crosshair"
        style={{ transform: `translate(${mousePos.x - 12}px, ${mousePos.y - 12}px)` }}
      >
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white opacity-40"></div>
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-white opacity-40"></div>
      </div>

      <nav className="fixed top-0 w-full z-[100] bg-[#1e1e1e]/95 border-b-4 border-black py-3">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-white tracking-tighter uppercase">
            <span className="text-[#32CD32]">NC</span>.
          </a>
          <div className="hidden md:flex gap-6 uppercase text-xl">
            {['Philosophy', 'Arsenal', 'Services', 'Lab', 'Connect'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-[#AAAAAA] hover:text-[#32CD32] transition-colors tracking-widest">{l}</a>
            ))}
          </div>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="min-h-screen flex items-center pt-20 px-6 relative dirt-texture">
          <div className="max-w-5xl mx-auto w-full relative z-10 bg-[#000000]/75 p-8 border-4 border-black shadow-[16px_16px_0_rgba(0,0,0,0.5)]">
            <div className="reveal">
              <div className="flex flex-wrap items-center gap-4 bg-black/40 border-2 border-black px-4 py-3 mb-6 w-fit">
                <svg width="32" height="32" viewBox="0 0 16 16" fill="none" className="shrink-0 border-2 border-black">
                  <rect width="16" height="16" fill="#707070"/>
                  <rect x="0" y="0" width="16" height="1" fill="#8b8b8b"/>
                  <rect x="0" y="0" width="1" height="16" fill="#8b8b8b"/>
                  <rect x="3" y="8" width="10" height="6" fill="#404040"/>
                  <rect x="4" y="9" width="8" height="4" fill="#1a1a1a"/>
                  <path d="M5 12H11V10H5V12Z" className="burn-active" />
                  <path d="M7 11H9V9H7V11Z" className="burn-active" style={{ animationDelay: '0.2s' }} />
                </svg>
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-bold text-[#AAAAAA] uppercase tracking-widest mt-1">Student @ Jain University</span>
                </div>
              </div>
              
              <h2 className="text-3xl text-white tracking-wide mb-2 uppercase opacity-80">Nayan Choraria</h2>
              <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white leading-none my-6 uppercase">
                Decoding <br />
                <span className="text-[#32CD32]">Complexity</span> <br />
                Defining AI
              </h1>
              
              <div className="flex flex-wrap gap-4 mt-10">
                <a href="#lab" className="mc-btn text-2xl uppercase px-8 py-3">Enter The Lab</a>
                
                <div className="flex items-center gap-3 ml-2">
                  <a href="https://github.com/nayan2452005" target="_blank" rel="noopener noreferrer" className="mc-btn p-2" title="GitHub">
                    <Github size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/nayan-choraria-026076266/" target="_blank" rel="noopener noreferrer" className="mc-btn p-2" title="LinkedIn">
                    <Linkedin size={24} />
                  </a>
                  <button onClick={copyEmail} className="mc-btn p-2 relative group" title="Copy Email">
                    {copied ? <Check size={24} className="text-[#32CD32]" /> : <Mail size={24} />}
                    {copied && <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 border border-[#32CD32]">Copied!</span>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grass-divider" />

        {/* Philosophy (The Architect) */}
        <section id="philosophy" className="py-24 bg-[#1e1e1e] px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-16 reveal">
              <div className="w-8 h-8 bg-[#32CD32] border-2 border-black" />
              <h2 className="text-3xl text-white uppercase tracking-widest">The Architect</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-8 reveal">
                <p className="text-2xl leading-snug text-[#AAAAAA]">
                  BCA-AI student at Jain University. I treat systems as living organisms—designed with precision and evolved through deployment.
                </p>
                <div className="mc-container p-6 bg-[#c6c6c6] text-black">
                   <h3 className="text-xl font-bold mb-2 uppercase border-b-2 border-black/10 pb-2">Legacy Achievement</h3>
                   <div className="flex gap-4 items-start">
                     <Users className="shrink-0 mt-1" size={24} />
                     <div>
                       <p className="text-lg font-bold">Joint Secretary @ Marwari Yuva Manch</p>
                       <p className="text-[#444444] text-base leading-tight">Honed high-stakes public relations and strategic leadership through community-scale governance.</p>
                     </div>
                   </div>
                </div>
              </div>

              {/* Interactive Stats */}
              <div className="mc-container p-6 bg-[#2a2a2a] border-white/10 reveal">
                <h3 className="text-white text-xl uppercase mb-6 flex items-center gap-2">
                  <Activity size={18} className="text-[#32CD32]" /> Character Stats
                </h3>
                <div className="space-y-6">
                  {[
                    { label: 'Intelligence (AI/ML)', val: 92, color: '#32CD32' },
                    { label: 'Charisma (PR/Leadership)', val: 88, color: '#4ade80' },
                    { label: 'Agility (Web Dev)', val: 85, color: '#22c55e' },
                    { label: 'Stamina (Logic)', val: 95, color: '#16a34a' }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm uppercase">
                        <span className="text-white">{stat.label}</span>
                        <span className="text-[#32CD32]">{stat.val}/100</span>
                      </div>
                      <div className="h-4 bg-black border border-white/20 p-[2px]">
                        <div 
                          className="h-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${stat.val}%`, 
                            backgroundColor: stat.color,
                            boxShadow: `0 0 10px ${stat.color}44`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Arsenal (Skills) */}
        <section id="arsenal" className="py-24 px-6 bg-[#252525]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl text-white uppercase tracking-widest mb-16 reveal">Skills Arsenal</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Technical Skills */}
              <div className="reveal">
                <h3 className="text-[#32CD32] text-2xl uppercase mb-8 border-b-2 border-[#32CD32]/20 pb-2 flex items-center gap-2">
                  <Cpu size={24} /> Technical Arsenal
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { n: 'Python', i: <Terminal size={18}/> },
                    { n: 'C Programming', i: <Cpu size={18}/> },
                    { n: 'Java', i: <Code2 size={18}/> },
                    { n: 'AI / ML', i: <Brain size={18}/> },
                    { n: 'React / Web', i: <Activity size={18}/> },
                    { n: 'SQL / DB', i: <Database size={18}/> },
                    { n: 'Firebase', i: <ShieldAlert size={18}/> }
                  ].map((s, idx) => (
                    <div key={idx} className="mc-container p-4 flex items-center gap-3 group hover:bg-[#32CD32] transition-colors">
                      <div className="text-black">{s.i}</div>
                      <span className="text-lg font-bold text-black uppercase tracking-widest">{s.n}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core DNA */}
              <div className="reveal">
                <h3 className="text-[#32CD32] text-2xl uppercase mb-8 border-b-2 border-[#32CD32]/20 pb-2 flex items-center gap-2">
                  <Users size={24} /> Core DNA
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { n: 'Logical', i: <Brain size={18}/> },
                    { n: 'Curious', i: <Search size={18}/> },
                    { n: 'Problem Solving', i: <Puzzle size={18}/> },
                    { n: 'Communication', i: <MessageSquare size={18}/> },
                    { n: 'Strategy', i: <Target size={18}/> },
                    { n: 'Management', i: <Users size={18}/> },
                    { n: 'Leadership', i: <Lightbulb size={18}/> }
                  ].map((s, idx) => (
                    <div key={idx} className="mc-container p-4 flex items-center gap-3 group hover:bg-white transition-colors">
                      <div className="text-black">{s.i}</div>
                      <span className="text-lg font-bold text-black uppercase tracking-widest">{s.n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services We Provide */}
        <section id="services" className="py-24 px-6 bg-[#1a1a1a]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl text-white uppercase tracking-widest mb-16 reveal">Services We Provide</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  t: "Web Development & Design", 
                  d: "High-performance interfaces with pixel-perfect aesthetics and fluid interactions.", 
                  icon: <Laptop size={32} /> 
                },
                { 
                  t: "AI / ML Solutions", 
                  d: "Implementing neural networks and predictive models to solve complex logical hurdles.", 
                  icon: <Brain size={32} /> 
                },
                { 
                  t: "Custom Solutions", 
                  d: "Tailored architectural builds designed from the ground up to create something truly unique.", 
                  icon: <Sparkles size={32} /> 
                }
              ].map((service, idx) => (
                <div key={idx} className="mc-container p-8 bg-[#2a2a2a] group reveal relative border-white/5 hover:bg-[#32CD32] transition-all duration-300">
                  <div className="text-[#32CD32] group-hover:text-black mb-6 transition-colors">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-black uppercase mb-4 transition-colors leading-tight">
                    {service.t}
                  </h3>
                  <p className="text-[#AAAAAA] group-hover:text-black/80 text-lg leading-snug transition-colors">
                    {service.d}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-8 mc-container bg-[#c6c6c6] flex flex-col md:flex-row items-center justify-between gap-6 reveal">
              <div className="flex items-center gap-4">
                <Wrench className="text-black" size={32} />
                <p className="text-black text-xl font-bold uppercase">Ready to build your unique vision?</p>
              </div>
              <a href="#connect" className="mc-btn bg-black text-white px-8 py-3 text-xl uppercase hover:bg-[#32CD32]">Initiate Project</a>
            </div>
          </div>
        </section>

        {/* Lab (Projects) */}
        <section id="lab" className="py-24 bg-[#1e1e1e] px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl text-white uppercase tracking-widest mb-16 reveal">The Lab</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { t: "Scam Detection", d: "Aggressive AI security layer for neutralising automated threats.", icon: <ShieldAlert /> },
                { t: "AQI Monitor", d: "IoT real-time visualization & telemetry suite.", icon: <Activity /> }
              ].map((p, idx) => (
                <div key={idx} className="mc-container p-8 group reveal relative hover:bg-[#d0d0d0] transition-colors">
                  <div className="text-[#1a6b1a] mb-6">{p.icon}</div>
                  <h3 className="text-3xl font-bold text-black uppercase mb-2">{p.t}</h3>
                  <p className="text-[#555555] text-xl mb-6 leading-tight">{p.d}</p>
                  <ArrowUpRight className="absolute top-8 right-8 text-[#1a6b1a] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Connect */}
        <section id="connect" className="py-32 px-6 dirt-texture">
          <div className="max-w-2xl mx-auto bg-[#000000]/90 p-12 border-4 border-black shadow-[16px_16px_0_#000] reveal text-center">
            <h2 className="text-5xl text-white uppercase mb-4">Start A Realm</h2>
            <p className="text-[#AAAAAA] text-xl mb-10 uppercase tracking-widest">Collaborate on the next big update</p>
            <div className="flex flex-col gap-4">
              <button onClick={copyEmail} className="mc-btn text-2xl uppercase px-12 py-5 w-full flex items-center justify-center gap-3">
                {copied ? <Check size={24} /> : <Mail size={24} />}
                {copied ? "Email Copied!" : "Copy Email Address"}
              </button>
              
              <div className="flex flex-col items-center gap-4 mt-8">
                <p className="text-[#32CD32] text-xl uppercase tracking-widest font-bold">Follow Us:</p>
                <div className="flex justify-center gap-8">
                   <a href="https://github.com/nayan2452005" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#32CD32] flex items-center gap-2 text-xl uppercase transition-colors">
                     <Github size={24}/> GitHub
                   </a>
                   <a href="https://www.linkedin.com/in/nayan-choraria-026076266/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#32CD32] flex items-center gap-2 text-xl uppercase transition-colors">
                     <Linkedin size={24}/> LinkedIn
                   </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 bg-black text-center text-[#555555] text-xl">
        <p className="tracking-[0.3em]">© 2026 NAYAN CHORARIA | BUILD 1.21-PRO</p>
      </footer>
    </div>
  );
}
