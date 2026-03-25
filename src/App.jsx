import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpRight, Github, Linkedin, Menu, X, Code2, 
  Activity, ShieldCheck, Cpu, Users, Target, Mail, Check, Database, Terminal, 
  Brain, Search, MessageSquare, Lightbulb, Puzzle, Laptop, Sparkles, ChevronRight, Server, Send, Loader2, Command
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Gemini AI State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    { role: 'ai', content: 'System Architect AI initialized. How can I assist you with Nayan\'s portfolio?' }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef(null);

  // DOM Refs for optimized cursor & spotlight
  const cursorDotRef = useRef(null);
  const cursorFollowerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const follower = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Elegant Preloader
    setTimeout(() => setIsLoaded(true), 800);

    document.documentElement.style.scrollBehavior = 'smooth';
    
    const isDesktop = window.matchMedia("(pointer: fine)").matches;
    let rafId;

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const followMouse = () => {
      follower.current.x += (mouse.current.x - follower.current.x) * 0.15;
      follower.current.y += (mouse.current.y - follower.current.y) * 0.15;
      if (cursorFollowerRef.current) {
        cursorFollowerRef.current.style.transform = `translate(${follower.current.x - 16}px, ${follower.current.y - 16}px)`;
      }
      rafId = requestAnimationFrame(followMouse);
    };

    if (isDesktop) {
      window.addEventListener('mousemove', handleMouseMove);
      rafId = requestAnimationFrame(followMouse);
    }

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

    // Command + K listener for AI
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsAiModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (isDesktop) {
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(rafId);
      }
      observer.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Spotlight Effect Logic for Cards
  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  // Auto-scroll chat
  useEffect(() => {
    if (isAiModalOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiMessages, isAiModalOpen]);

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

  // Gemini API Integration
  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userText = aiInput.trim();
    setAiMessages(prev => [...prev, { role: 'user', content: userText }]);
    setAiInput('');
    setIsAiLoading(true);

    try {
      const apiKey = ""; // API key populated by runtime environment
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      const systemPrompt = "You are the 'System Architect AI', a highly sophisticated and professional AI representing Nayan Choraria. Nayan is a BCA AI student at Jain University, a past Joint Secretary at Marwari Yuva Manch, and an expert in Python, React, ML, and Systems Design. Answer queries about his capabilities, projects, and fitness for roles. Use a polite, precise, and highly technical tone reminiscent of top-tier software documentation. Keep responses under 3 sentences.";

      const payload = {
        contents: [{ parts: [{ text: userText }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
      };

      const attemptFetch = async (retries = 5, delay = 1000) => {
        try {
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          if (!res.ok) throw new Error("API Error");
          const data = await res.json();
          return data.candidates?.[0]?.content?.parts?.[0]?.text || "Error computing response.";
        } catch (err) {
          if (retries === 0) throw err;
          await new Promise(r => setTimeout(r, delay));
          return attemptFetch(retries - 1, delay * 2);
        }
      };

      const responseText = await attemptFetch();
      setAiMessages(prev => [...prev, { role: 'ai', content: responseText }]);
    } catch (error) {
      setAiMessages(prev => [...prev, { role: 'ai', content: "Network error. Please attempt query again." }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const navLinks = ['About', 'Expertise', 'Capabilities', 'Projects', 'Connect'];

  return (
    <div className={`min-h-screen bg-[#050505] text-[#888888] selection:bg-white/20 selection:text-white antialiased overflow-x-hidden font-sans transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * { 
          cursor: none !important; 
          -webkit-tap-highlight-color: transparent; 
          font-family: 'Inter', sans-serif;
        }

        /* Fluid Mesh Gradients */
        .ambient-mesh {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          z-index: 0;
          pointer-events: none;
          background: 
            radial-gradient(circle at 15% 50%, rgba(59, 130, 246, 0.08), transparent 25%),
            radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.08), transparent 25%);
          filter: blur(80px);
        }

        .grid-bg {
          background-size: 30px 30px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
        }

        /* Premium Spotlight Cards */
        .pro-card {
          position: relative;
          background: rgba(10, 10, 10, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          backdrop-filter: blur(20px);
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s;
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.5);
        }

        .pro-card::before {
          content: "";
          position: absolute;
          top: var(--mouse-y, 0);
          left: var(--mouse-x, 0);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 50%);
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 1;
        }

        .pro-card:hover {
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-4px);
        }

        .pro-card:hover::before {
          opacity: 1;
        }

        .pro-card > * {
          position: relative;
          z-index: 2;
        }

        /* Buttons */
        .btn-primary {
          background: #ffffff;
          color: #000000;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.3s ease;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 4px 14px 0 rgba(255,255,255,0.15);
        }
        .btn-primary:hover {
          background: #f0f0f0;
          transform: translateY(-1px);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.2), 0 6px 20px 0 rgba(255,255,255,0.2);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          transition: all 0.3s ease;
        }
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }

        /* Text Gradients */
        .text-gradient {
          background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .text-gradient-blue {
          background: linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Reveal Animations */
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

        /* AI Scrollbar */
        .chat-scroll::-webkit-scrollbar { width: 6px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .chat-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }

        @media (max-width: 768px) { 
          * { cursor: auto !important; }
          .cursor-follower, .cursor-dot { display: none; }
          .reveal { transition-duration: 0.6s; }
          .pro-card:hover { transform: translateY(0); }
        }
      `}</style>

      {/* Background Elements */}
      <div className="ambient-mesh" />
      <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-40" />

      {/* Minimalist Cursor */}
      <div 
        ref={cursorFollowerRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:flex items-center justify-center will-change-transform"
      >
        <div className="w-full h-full rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-transform duration-300 ease-out" />
      </div>
      <div 
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none z-[10000] hidden md:block bg-white rounded-full will-change-transform shadow-[0_0_10px_rgba(255,255,255,0.8)]"
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] bg-[#050505]/60 backdrop-blur-xl border-b border-white/5 py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors shadow-inner">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="font-semibold text-white tracking-tight">Nayan Choraria</span>
          </a>
          
          <div className="hidden md:flex items-center gap-1 p-1 bg-white/[0.03] border border-white/5 rounded-full">
            {navLinks.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium text-[#888] hover:text-white hover:bg-white/10 px-4 py-1.5 rounded-full transition-all">
                {l}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAiModalOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-all text-sm font-medium group"
            >
              <Sparkles size={14} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
              <span>Ask AI</span>
              <kbd className="hidden lg:inline-flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-white/60 ml-2 border border-white/10">
                <Command size={10} /> K
              </kbd>
            </button>
            <button className="md:hidden text-white/80 hover:text-white transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 top-[64px] bg-[#050505]/98 backdrop-blur-2xl z-[105] flex flex-col p-6 gap-6 transition-all duration-300 md:hidden border-t border-white/10 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
           {navLinks.map(l => (
              <a 
                key={l} 
                href={`#${l.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-bold text-white tracking-tight active:text-blue-400 transition-colors"
              >
                {l}
              </a>
            ))}
            <button 
              onClick={() => { setIsMenuOpen(false); setIsAiModalOpen(true); }}
              className="mt-4 flex items-center justify-center gap-2 font-medium text-sm bg-blue-600 text-white px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)]"
            >
              <Sparkles size={16} /> Query Architect AI
            </button>
        </div>
      </nav>

      {/* Command Palette AI Modal */}
      <div className={`fixed inset-0 z-[9000] flex items-start justify-center pt-[15vh] transition-all duration-300 ${isAiModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAiModalOpen(false)} />
        
        <div className={`relative w-[90%] max-w-2xl bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] rounded-2xl flex flex-col overflow-hidden transition-transform duration-300 ${isAiModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
          
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
            <Search size={16} className="text-[#888]" />
            <span className="text-xs font-medium text-[#888] tracking-wide uppercase">Architect AI Interface</span>
            <div className="ml-auto flex gap-1.5">
              <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-white/60 border border-white/5">ESC</kbd>
            </div>
          </div>
          
          {/* Chat Body */}
          <div className="flex-1 max-h-[50vh] overflow-y-auto p-6 flex flex-col gap-6 chat-scroll">
            {aiMessages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 max-w-[90%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border ${msg.role === 'user' ? 'bg-white/10 border-white/20' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>
                  {msg.role === 'user' ? <Users size={14} /> : <Sparkles size={14} />}
                </div>
                <div className={`pt-1.5 text-sm leading-relaxed ${msg.role === 'user' ? 'text-white/90 text-right' : 'text-[#a1a1aa]'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isAiLoading && (
              <div className="flex gap-4 max-w-[90%]">
                 <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center border bg-blue-500/10 border-blue-500/20 text-blue-400">
                  <Loader2 size={14} className="animate-spin" />
                </div>
                <div className="pt-1.5 text-sm text-[#a1a1aa] animate-pulse">
                  Processing query...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleAiSubmit} className="p-2 border-t border-white/5 bg-[#050505]">
            <div className="relative flex items-center bg-white/[0.03] border border-white/5 rounded-xl px-4 py-2 focus-within:border-white/20 focus-within:bg-white/[0.05] transition-colors">
              <input 
                type="text" 
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask about my tech stack or experience..."
                className="flex-1 bg-transparent border-none text-sm text-white focus:outline-none focus:ring-0 placeholder:text-[#666] py-2"
                disabled={isAiLoading}
                autoFocus
              />
              <button 
                type="submit"
                disabled={isAiLoading || !aiInput.trim()}
                className="ml-2 bg-white text-black p-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowUpRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="min-h-[90vh] flex flex-col justify-center px-6 relative">
          <div className="max-w-4xl mx-auto w-full text-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-xs font-medium text-white/80">Available for Opportunities</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-bold tracking-tight text-gradient leading-[1.1] mb-6">
                Engineering <span className="text-white">Scalable</span> Systems.<br />
                Advancing <span className="text-gradient-blue">Artificial Intelligence.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-[#888] max-w-2xl mx-auto mt-6 leading-relaxed">
                I'm Nayan Choraria, a systems architect bridging the gap between complex machine learning models and high-performance, intuitive user interfaces.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                <a href="#projects" className="btn-primary px-8 py-3.5 w-full sm:w-auto flex items-center justify-center gap-2">
                  View Projects <ChevronRight size={16} />
                </a>
                
                <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
                  <a href="https://github.com/nayan2452005" target="_blank" rel="noopener noreferrer" className="btn-secondary p-3.5" title="GitHub">
                    <Github size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/nayan-choraria-026076266/" target="_blank" rel="noopener noreferrer" className="btn-secondary p-3.5" title="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                  <button onClick={copyEmail} className="btn-secondary p-3.5 relative group" title="Copy Email">
                    {copied ? <Check size={20} className="text-green-400" /> : <Mail size={20} />}
                    {copied && <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2.5 py-1 rounded shadow-lg whitespace-nowrap">Copied</span>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About & Leadership */}
        <section id="about" className="py-24 px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-12 items-center reveal">
              <div className="md:col-span-5">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Background</h2>
                <p className="text-lg text-[#888] leading-relaxed">
                  Currently pursuing a BCA in Artificial Intelligence at Jain University. My technical philosophy centers on building systems designed with precision, rigorously tested, and scaled through deployment.
                </p>
              </div>
              
              <div className="md:col-span-7">
                <div 
                  className="pro-card p-8 group cursor-default"
                  onMouseMove={handleCardMouseMove}
                >
                   <div className="flex items-center gap-3 mb-4">
                     <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                       <Target size={18} />
                     </div>
                     <h3 className="text-xs font-semibold tracking-wider text-[#888] uppercase">Leadership Initiative</h3>
                   </div>
                   
                   <div>
                     <p className="text-xl font-semibold text-white mb-2">Past Joint Secretary @ Marwari Yuva Manch</p>
                     <p className="text-[#888] text-sm leading-relaxed">
                       Fostering community growth, organizing strategic public initiatives, and executing high-level project management through coordinated team governance.
                     </p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise */}
        <section id="expertise" className="py-24 px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-16 reveal">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Technical Arsenal</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="reveal">
                <h3 className="text-sm font-semibold text-[#888] tracking-wider uppercase mb-6 flex items-center gap-2">
                  <Terminal size={16} /> Stack
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { n: 'Python', i: <Terminal size={16}/> },
                    { n: 'C / C++', i: <Cpu size={16}/> },
                    { n: 'Java', i: <Code2 size={16}/> },
                    { n: 'Machine Learning', i: <Brain size={16}/> },
                    { n: 'React Ecosystem', i: <Activity size={16}/> },
                    { n: 'SQL Databases', i: <Database size={16}/> },
                    { n: 'Cloud & Firebase', i: <Server size={16}/> }
                  ].map((s, idx) => (
                    <div 
                      key={idx} 
                      className="pro-card p-4 flex items-center gap-3"
                      onMouseMove={handleCardMouseMove}
                    >
                      <div className="text-white/60">{s.i}</div>
                      <span className="text-sm font-medium text-white/90">{s.n}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal">
                <h3 className="text-sm font-semibold text-[#888] tracking-wider uppercase mb-6 flex items-center gap-2">
                  <Users size={16} /> Competencies
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { n: 'Systems Design', i: <Brain size={16}/> },
                    { n: 'Technical Research', i: <Search size={16}/> },
                    { n: 'Problem Solving', i: <Puzzle size={16}/> },
                    { n: 'Communication', i: <MessageSquare size={16}/> },
                    { n: 'Project Strategy', i: <Target size={16}/> },
                    { n: 'Team Management', i: <Users size={16}/> },
                    { n: 'Leadership', i: <Lightbulb size={16}/> }
                  ].map((s, idx) => (
                    <div 
                      key={idx} 
                      className="pro-card p-4 flex items-center gap-3"
                      onMouseMove={handleCardMouseMove}
                    >
                      <div className="text-[#666]">{s.i}</div>
                      <span className="text-sm font-medium text-white/90">{s.n}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities (Services) */}
        <section id="capabilities" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-16 reveal">Domain Capabilities</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  t: "Interface Architecture", 
                  d: "Building high-performance interfaces with meticulous aesthetics. Specializing in responsive, interactive ecosystems that drive user engagement.", 
                  icon: <Laptop size={20} /> 
                },
                { 
                  t: "Applied Intelligence", 
                  d: "Implementing predictive models and intelligent algorithms to parse data, automate workflows, and solve complex logic challenges.", 
                  icon: <Brain size={20} /> 
                },
                { 
                  t: "Systems Engineering", 
                  d: "Designing tailored backend architectures and integrated solutions from the ground up, built specifically for scalable operational workflows.", 
                  icon: <Sparkles size={20} /> 
                }
              ].map((service, idx) => (
                <div 
                  key={idx} 
                  className="pro-card p-8 h-full flex flex-col reveal"
                  onMouseMove={handleCardMouseMove}
                  style={{ transitionDelay: `${idx * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                    {service.t}
                  </h3>
                  <p className="text-[#888] text-sm leading-relaxed">
                    {service.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section id="projects" className="py-24 px-6 relative">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-16 reveal">Featured Work</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  t: "Scam Detection Engine", 
                  d: "A machine learning-powered interface designed to analyze and flag fraudulent patterns in real-time, utilizing behavioral heuristics to protect end-users.", 
                  icon: <ShieldCheck size={20}/>, 
                  tag: "Machine Learning & UI",
                  link: "https://agentic-honeypot-a41c.onrender.com/docs"
                },
                { 
                  t: "AQI Telemetry Suite", 
                  d: "An end-to-end IoT dashboard aggregating real-time air quality metrics. Features responsive data visualization for historical analysis and environmental monitoring.", 
                  icon: <Activity size={20}/>, 
                  tag: "IoT & Data Analytics",
                  link: "#"
                }
              ].map((p, idx) => (
                <a 
                  key={idx} 
                  href={p.link}
                  target={p.link !== "#" ? "_blank" : "_self"}
                  rel={p.link !== "#" ? "noopener noreferrer" : ""}
                  className="pro-card p-8 group reveal block"
                  onMouseMove={handleCardMouseMove}
                  style={{ transitionDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white transition-colors">
                      {p.icon}
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider px-2.5 py-1 bg-white/5 text-white/80 rounded-full border border-white/10">
                      {p.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">{p.t}</h3>
                  <p className="text-[#888] text-sm leading-relaxed mb-8">{p.d}</p>
                  
                  <div className="flex items-center text-xs font-semibold text-white/80 group-hover:text-white transition-colors">
                    View Project <ArrowUpRight className="ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" size={14} />
                  </div>
                </a>
              ))}
            </div>

            <div 
              className="mt-16 pro-card p-10 flex flex-col md:flex-row items-center justify-between gap-8 reveal bg-gradient-to-r from-blue-900/10 to-transparent border-blue-500/20"
              onMouseMove={handleCardMouseMove}
            >
              <div className="flex items-center gap-6">
                <div className="hidden sm:flex w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 items-center justify-center text-blue-400">
                  <Database size={20} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-2">Ready to scale your vision?</h3>
                  <p className="text-[#888] text-sm">Let's engineer a bespoke solution tailored to your operational needs.</p>
                </div>
              </div>
              <a href="#connect" className="btn-primary px-6 py-3 text-sm w-full md:w-auto text-center shrink-0">
                Initiate Dialogue
              </a>
            </div>
          </div>
        </section>

        {/* Connect */}
        <section id="connect" className="py-32 px-6">
          <div className="max-w-2xl mx-auto text-center reveal">
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-white/5 border border-white/10 text-white mb-8 rounded-2xl shadow-inner">
              <Mail size={24} />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">Let's Connect</h2>
            <p className="text-[#888] text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Open to new opportunities, collaborations, and architectural challenges.
            </p>
            
            <div className="flex flex-col gap-4">
              <button onClick={copyEmail} className="btn-secondary w-full py-4 flex items-center justify-center gap-3 group">
                {copied ? <Check size={18} className="text-green-400" /> : <Mail size={18} className="text-white/60 group-hover:text-white transition-colors" />}
                <span className="text-sm font-semibold tracking-wide">{copied ? "Email Copied!" : "nayanchoraria111@gmail.com"}</span>
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                 <a href="https://github.com/nayan2452005" target="_blank" rel="noopener noreferrer" className="btn-secondary py-4 flex items-center justify-center gap-2 group">
                   <Github size={18} className="text-white/60 group-hover:text-white transition-colors"/> <span className="text-sm font-medium">GitHub</span>
                 </a>
                 <a href="https://www.linkedin.com/in/nayan-choraria-026076266/" target="_blank" rel="noopener noreferrer" className="btn-secondary py-4 flex items-center justify-center gap-2 group">
                   <Linkedin size={18} className="text-white/60 group-hover:text-white transition-colors"/> <span className="text-sm font-medium">LinkedIn</span>
                 </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-white/5 text-center flex flex-col items-center justify-center bg-[#000]">
        <p className="text-sm font-medium text-white/80 mb-2">© {new Date().getFullYear()} Nayan Choraria</p>
        <p className="text-xs text-[#555]">Designed & Engineered with Precision</p>
      </footer>
    </div>
  );
}
