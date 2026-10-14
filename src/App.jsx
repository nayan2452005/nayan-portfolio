import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight, Github, Linkedin, Menu, X, Code2,
  Activity, ShieldCheck, Cpu, Users, Target, Mail, Check, Database, Terminal,
  Brain, Search, MessageSquare, Laptop, Sparkles, ChevronRight,
  Server, Send, Loader2, Command, BarChart3, Globe, Compass, Radio, Gauge
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollStats, setScrollStats] = useState({ dilation: '1.000', gForce: '1.00', depth: '0.0' });

  // TARS System Settings
  const [honesty, setHonesty] = useState(90);
  const [humor, setHumor] = useState(75);

  // TARS AI Interface State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'ai',
      content: 'TARS UNIT 01 ONLINE. Honesty 90%, Humor 75%. Orbital rendezvous coordinates verified. Awaiting mission query regarding Nayan Choraria.'
    }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Optical Reticle & Telemetry Tracking
  const cursorDotRef = useRef(null);
  const cursorFollowerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const follower = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
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
      follower.current.x += (mouse.current.x - follower.current.x) * 0.18;
      follower.current.y += (mouse.current.y - follower.current.y) * 0.18;
      if (cursorFollowerRef.current) {
        cursorFollowerRef.current.style.transform = `translate(${follower.current.x - 14}px, ${follower.current.y - 14}px)`;
      }
      rafId = requestAnimationFrame(followMouse);
    };

    if (isDesktop) {
      window.addEventListener('mousemove', handleMouseMove);
      rafId = requestAnimationFrame(followMouse);
    }

    // Dynamic Gargantua Light Rays & Relativistic Scroll Engine
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = Math.max(
        document.body.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);

      const root = document.documentElement;
      root.style.setProperty('--scroll-p', progress.toFixed(4));
      root.style.setProperty('--ray-angle', `${(progress * 115 - 25).toFixed(2)}deg`);
      root.style.setProperty('--accretion-tilt', `${(-6 + progress * 24).toFixed(2)}deg`);
      root.style.setProperty('--accretion-scale', `${(1 + progress * 0.45).toFixed(3)}`);
      root.style.setProperty('--horizon-shift', `${(progress * 32).toFixed(2)}vh`);
      root.style.setProperty('--doppler-shift', `${(progress * 45).toFixed(1)}deg`);

      setScrollStats({
        dilation: (1 + Math.pow(progress, 2) * 6.99).toFixed(3),
        gForce: (1 + progress * 4.8).toFixed(2),
        depth: (progress * 100).toFixed(1)
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('telemetry-active');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.telemetry-reveal').forEach(el => observer.observe(el));

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsAiModalOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsAiModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      if (isDesktop) {
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

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

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const userText = aiInput.trim();
    setAiMessages(prev => [...prev, { role: 'user', content: userText }]);
    setAiInput('');
    setIsAiLoading(true);

    try {
      const apiKey = "";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
      const systemPrompt = `You are TARS, the tactical Marine Corps surplus robot from Interstellar, serving as the mission control assistant for Nayan Choraria.
Current Config: Honesty: ${honesty}%, Humor: ${humor}%.
Candidate Dossier:
- Nayan Choraria: BCA in Artificial Intelligence at Jain University, ex-Joint Secretary @ Marwari Yuva Manch.
- Core Stack: Python, FastAPI, Next.js, React, TypeScript, PostgreSQL, Arduino/C++, Groq LLaMA models.
- Projects:
1. AI Tally Business Analytics Platform (React, TS, Vite, Recharts, Appwrite, Groq API/LLaMA)
2. ReachInbox Email Automation Engine (Next.js, Node.js, Express, PostgreSQL, Google OAuth)
3. Sri Balaji Distributors Corporate Portal (Live: https://sri-balaji-distributors.onrender.com)
4. Agentic Scam Detection API (FastAPI, Swagger, Postman)
5. Live Developer Portfolio (React, Vite, Render)
6. Real-Time Embedded AQI Monitor (Arduino IDE, MQ135 sensor, C++)
Style: Speak in TARS's distinctive deadpan, crisp, highly intelligent tone. Factor in your ${humor}% humor and ${honesty}% honesty parameters. Max 3 concise sentences.`;

      const payload = {
        contents: [{ parts: [{ text: userText }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
      };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Telemetry Link Offline");
      const data = await res.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Telemetry signal degraded. Transmission unreadable.";
      setAiMessages(prev => [...prev, { role: 'ai', content: responseText }]);
    } catch {
      setAiMessages(prev => [...prev, { role: 'ai', content: "Transmission lost across Gargantua gravitational horizon. Check connectivity." }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const navLinks = ['Telemetry', 'Arsenal', 'Protocols', 'Missions', 'Transmit'];

  const projects = [
    {
      code: "TASK-01 // ANALYTICS",
      title: "AI Tally Business Analytics Platform",
      timeline: "03/2026 – PRESENT",
      status: "TACTICAL ACTIVE",
      description: "Financial intelligence and analytics engine featuring role-based Appwrite telemetry, debtor aging KPI matrices, and Groq API LLaMA-powered predictive scenario forecasting under variable business horizons.",
      icon: <BarChart3 size={18} className="text-amber-500" />,
      tag: "APPLIED AI // TELEMETRY",
      tech: ["React", "TypeScript", "Vite", "Recharts", "Appwrite", "Groq API"],
      link: "#"
    },
    {
      code: "TASK-02 // COMMS",
      title: "ReachInbox – Outbound Scheduling Engine",
      timeline: "02/2026 – 03/2026",
      status: "DECOMMISSIONED/VERIFIED",
      description: "Full-stack asynchronous transmission matrix built with Google OAuth 2.0 verification, PostgreSQL relational telemetry schemas, automated queue dispatchers, and resilient REST microservices.",
      icon: <Send size={18} className="text-amber-500" />,
      tag: "FULL-STACK // PIPELINE",
      tech: ["Next.js", "Node.js", "Express", "PostgreSQL", "Google OAuth", "REST APIs"],
      link: "#"
    },
    {
      code: "TASK-03 // COMMERCIAL",
      title: "Sri Balaji Distributors Portal",
      timeline: "PRODUCTION",
      status: "ORBITAL TRANSMITTING",
      description: "Wholesale distribution commercial interface deployed to Render. Engineered with modular component slabs, endless brand marquee reels, and sub-second asset hydration metrics.",
      icon: <Globe size={18} className="text-amber-500" />,
      tag: "PRODUCTION PORTAL",
      tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
      link: "https://sri-balaji-distributors.onrender.com"
    },
    {
      code: "TASK-04 // DEFENSE",
      title: "Agentic Scam Detection Service",
      timeline: "01/2026 – 02/2026",
      status: "SECURED HONEYPOT",
      description: "High-throughput asynchronous payload interceptor built with FastAPI. Evaluates hostile heuristics, behavioral anomaly flags, and payload exploits documented via OpenAPI/Swagger.",
      icon: <ShieldCheck size={18} className="text-amber-500" />,
      tag: "HEURISTICS // FASTAPI",
      tech: ["FastAPI", "Python", "Swagger UI", "Postman", "REST APIs"],
      link: "https://agentic-honeypot-a41c.onrender.com/docs"
    },
    {
      code: "TASK-05 // BEACON",
      title: "Live Developer Portfolio Beacon",
      timeline: "ACTIVE BEACON",
      status: "SURFACE LINK",
      description: "Personal architectural showcase optimized for minimal compute latency, zero bundle bloat, responsive lazy-loaded components, and automated Render build pipelines.",
      icon: <Laptop size={18} className="text-amber-500" />,
      tag: "INTERFACE // ARCHITECTURE",
      tech: ["React.js", "TypeScript", "Vite", "Bootstrap", "Render"],
      link: "https://nayan-portfolio-rrb8.onrender.com"
    },
    {
      code: "TASK-06 // HARDWARE",
      title: "Real-Time Embedded AQI Telemetry",
      timeline: "06/2025 – 07/2025",
      status: "HARDWARE TESTED",
      description: "Embedded atmospheric sensor terminal utilizing an MQ135 chemical sensor on custom breadboard circuitry. Computes particulate thresholds and fires localized acoustic warning frequencies.",
      icon: <Activity size={18} className="text-amber-500" />,
      tag: "EMBEDDED // SENSORS",
      tech: ["Arduino IDE", "MQ135 Sensor", "C++", "Circuit Design"],
      link: "#"
    }
  ];

  return (
    <div className={`min-h-screen bg-[#020306] text-[#909cb0] selection:bg-[#f59e0b]/25 selection:text-[#fef3c7] antialiased overflow-x-hidden font-mono transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        
        :root {
          --scroll-p: 0;
          --ray-angle: -25deg;
          --accretion-tilt: -6deg;
          --accretion-scale: 1;
          --horizon-shift: 0vh;
          --doppler-shift: 0deg;
        }

        * { 
          cursor: none !important; 
          -webkit-tap-highlight-color: transparent; 
        }

        .font-sans-ui { font-family: 'Inter', sans-serif; }
        .font-mono-tars { font-family: 'JetBrains Mono', monospace; }

        /* Dynamic Gargantua Accretion Core & Lensing Rays */
        .gargantua-stage {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
          filter: hue-rotate(calc(var(--doppler-shift) * -0.4));
        }

        /* Relativistic Light Rays sweeping on scroll */
        .gargantua-light-rays {
          position: absolute;
          top: -35%;
          left: -25%;
          width: 150%;
          height: 170%;
          background: conic-gradient(
            from var(--ray-angle) at 50% 28%,
            transparent 0deg,
            rgba(245, 158, 11, 0.09) 22deg,
            rgba(254, 243, 199, 0.16) 38deg,
            rgba(217, 119, 6, 0.06) 55deg,
            transparent 85deg,
            rgba(56, 189, 248, 0.04) 140deg,
            transparent 185deg,
            rgba(245, 158, 11, 0.11) 235deg,
            rgba(251, 191, 36, 0.18) 255deg,
            transparent 310deg
          );
          filter: blur(55px);
          transform: translate3d(0, calc(var(--horizon-shift) * 0.45), 0) scale(var(--accretion-scale));
          will-change: transform;
          opacity: calc(0.55 + var(--scroll-p) * 0.45);
        }

        /* Upper Gravitational Lensing Halo */
        .gargantua-halo {
          position: absolute;
          top: calc(-14vh + var(--horizon-shift) * 0.65);
          left: 50%;
          width: 96vw;
          max-width: 1180px;
          height: 360px;
          border-radius: 50%;
          border-top: 2px solid rgba(251, 191, 36, 0.55);
          border-bottom: 1px solid rgba(245, 158, 11, 0.2);
          box-shadow: 
            0 -18px 60px rgba(245, 158, 11, 0.28),
            inset 0 22px 50px rgba(251, 191, 36, 0.12);
          transform: translateX(-50%) rotate(var(--accretion-tilt)) scale(var(--accretion-scale));
          will-change: transform;
          opacity: calc(0.65 - var(--scroll-p) * 0.15);
        }

        /* Horizontal Relativistic Accretion Disk Plane */
        .gargantua-accretion-plane {
          position: absolute;
          top: calc(12vh + var(--horizon-shift) * 0.85);
          left: 50%;
          width: 135vw;
          max-width: 1650px;
          height: 58px;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at center,
            rgba(255, 251, 235, 0.45) 0%,
            rgba(245, 158, 11, 0.35) 28%,
            rgba(217, 119, 6, 0.12) 58%,
            transparent 78%
          );
          filter: blur(8px);
          transform: translateX(-50%) rotate(calc(var(--accretion-tilt) * -0.6)) scaleX(var(--accretion-scale));
          will-change: transform;
          opacity: calc(0.45 + var(--scroll-p) * 0.4);
        }

        /* Photon Sphere Singularity Shadow */
        .gargantua-singularity {
          position: absolute;
          top: calc(2vh + var(--horizon-shift) * 0.72);
          left: 50%;
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background: radial-gradient(circle, #000000 58%, rgba(245, 158, 11, 0.45) 66%, transparent 76%);
          box-shadow: 0 0 80px rgba(245, 158, 11, 0.28);
          transform: translateX(-50%) scale(calc(0.85 + var(--scroll-p) * 0.5));
          will-change: transform;
          opacity: calc(0.35 + var(--scroll-p) * 0.35);
        }

        /* TARS Monolith & Tesseract Grid */
        .tesseract-grid {
          background-size: 44px 44px;
          background-image: 
            linear-gradient(to right, rgba(245, 158, 11, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          transform: perspective(900px) rotateX(calc(var(--scroll-p) * 14deg));
          transform-origin: center top;
        }

        /* TARS Articulated Block Card */
        .tars-card {
          position: relative;
          background: linear-gradient(180deg, rgba(14, 18, 26, 0.85) 0%, rgba(8, 10, 16, 0.95) 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-left: 2px solid rgba(245, 158, 11, 0.45);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s, box-shadow 0.35s;
        }

        .tars-card::before {
          content: "";
          position: absolute;
          top: var(--mouse-y, 0);
          left: var(--mouse-x, 0);
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.11) 0%, transparent 60%);
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 1;
        }

        .tars-card:hover {
          border-color: rgba(245, 158, 11, 0.65);
          border-left: 2px solid #f59e0b;
          transform: translateY(-3px);
          box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.85), 0 0 25px rgba(245, 158, 11, 0.1);
        }

        .tars-card:hover::before {
          opacity: 1;
        }

        .tars-card > * {
          position: relative;
          z-index: 2;
        }

        /* TARS Block Segments Indicator */
        .tars-slab-matrix {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3px;
        }
        .tars-slab {
          height: 12px;
          background: rgba(255, 255, 255, 0.1);
          transition: background 0.2s ease, transform 0.3s ease;
        }
        .tars-slab.active {
          background: #f59e0b;
          box-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
        }

        /* Typography Accents */
        .text-amber-lens {
          color: #f59e0b;
          text-shadow: 0 0 16px rgba(245, 158, 11, 0.45);
        }

        /* Relativistic Reveal on Scroll */
        .telemetry-reveal {
          opacity: 0;
          transform: translateY(22px) scale(0.99);
          filter: blur(4px);
          transition: 
            opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), 
            transform 0.75s cubic-bezier(0.16, 1, 0.3, 1),
            filter 0.75s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .telemetry-active {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
        }

        @media (max-width: 768px) {
          * { cursor: auto !important; }
          .tars-reticle { display: none; }
        }
      `}</style>

      {/* Dynamic Gargantua Gravitational Light Ray System */}
      <div className="gargantua-stage">
        <div className="gargantua-light-rays" />
        <div className="gargantua-singularity" />
        <div className="gargantua-halo" />
        <div className="gargantua-accretion-plane" />
      </div>
      <div className="fixed inset-0 tesseract-grid pointer-events-none z-0 opacity-65" />

      {/* Right-Side Horizon Telemetry Depth Gauge */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[90] hidden xl:flex flex-col items-end gap-2 pointer-events-none">
        <span className="text-[9px] text-amber-500/80 font-mono tracking-widest">HORIZON DEPTH</span>
        <div className="w-1 h-44 bg-white/10 relative overflow-hidden">
          <div 
            className="w-full bg-gradient-to-b from-amber-300 via-amber-500 to-orange-600 shadow-[0_0_12px_#f59e0b]"
            style={{ height: `${scrollStats.depth}%` }}
          />
        </div>
        <span className="text-[10px] text-white/70 font-mono">{scrollStats.depth}%</span>
        <span className="text-[9px] text-white/40 font-mono">{scrollStats.gForce}G</span>
      </div>

      {/* Optical Reticle Cursor */}
      <div 
        ref={cursorFollowerRef}
        className="fixed top-0 left-0 w-7 h-7 pointer-events-none z-[9999] hidden md:flex items-center justify-center will-change-transform tars-reticle"
      >
        <div className="w-full h-full border border-[#f59e0b]/40 rounded-sm relative flex items-center justify-center">
          <div className="w-1.5 h-[1px] bg-[#f59e0b] absolute -top-[1px] left-1/2 -translate-x-1/2" />
          <div className="w-1.5 h-[1px] bg-[#f59e0b] absolute -bottom-[1px] left-1/2 -translate-x-1/2" />
          <div className="h-1.5 w-[1px] bg-[#f59e0b] absolute -left-[1px] top-1/2 -translate-y-1/2" />
          <div className="h-1.5 w-[1px] bg-[#f59e0b] absolute -right-[1px] top-1/2 -translate-y-1/2" />
        </div>
      </div>
      <div 
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none z-[10000] hidden md:block bg-[#f59e0b] will-change-transform tars-reticle shadow-[0_0_8px_#f59e0b]"
      />

      {/* TARS Top Telemetry Bar */}
      <div className="fixed top-0 w-full z-[101] bg-[#020306]/90 border-b border-white/10 px-4 py-1.5 flex justify-between items-center text-[10px] text-white/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-amber-500 font-semibold tracking-wider">
            <span className="w-1.5 h-1.5 bg-amber-500 animate-pulse" />
            TARS TACTICAL OS // REV 4.2
          </span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="hidden sm:inline font-mono">
            RELATIVISTIC DILATION: <strong className="text-amber-400">{scrollStats.dilation}x</strong>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline font-mono">
            GRAVITATIONAL PULL: <strong className="text-white">{scrollStats.gForce} G</strong>
          </span>
          <span className="text-amber-400/80 font-mono">RAY LENSING: ACTIVE</span>
        </div>
      </div>

      {/* Mission Navigation Header */}
      <nav className="fixed top-[29px] w-full z-[100] bg-[#06080e]/80 backdrop-blur-xl border-b border-white/5 py-3">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-7 bg-[#0b0f19] border border-white/20 p-1 flex gap-0.5 items-center justify-center group-hover:border-amber-500/50 transition-colors">
              <div className="h-full w-1 bg-white/40 group-hover:bg-amber-400 transition-transform group-hover:-translate-y-0.5" />
              <div className="h-full w-1 bg-white/40 group-hover:bg-amber-400 transition-transform group-hover:translate-y-0.5" />
              <div className="h-full w-1 bg-white/40 group-hover:bg-amber-400 transition-transform group-hover:-translate-y-0.5" />
              <div className="h-full w-1 bg-amber-500" />
            </div>
            <div>
              <span className="font-bold text-white text-sm tracking-widest uppercase block">NAYAN CHORARIA</span>
              <span className="text-[9px] text-[#f59e0b] tracking-wider block font-mono">SYSTEMS ARCHITECT</span>
            </div>
          </a>
          
          <div className="hidden md:flex items-center gap-2 p-1 bg-black/40 border border-white/10">
            {navLinks.map((l, idx) => (
              <a 
                key={l} 
                href={`#${l.toLowerCase()}`} 
                className="text-xs uppercase tracking-wider text-[#8b99af] hover:text-white hover:bg-white/5 px-3 py-1 transition-all"
              >
                0{idx + 1} // {l}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsAiModalOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1.5 hover:bg-amber-500/20 transition-all text-xs font-semibold uppercase tracking-wider group"
            >
              <Terminal size={13} className="text-amber-400" />
              <span>Query TARS</span>
              <kbd className="hidden lg:inline-flex items-center gap-1 bg-black/40 px-1.5 py-0.5 text-[9px] text-amber-200/60 border border-amber-500/20 ml-1">
                <Command size={9} /> K
              </kbd>
            </button>
            <button className="md:hidden text-white/80 p-1 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`fixed inset-0 top-[60px] bg-[#020306]/98 backdrop-blur-2xl z-[105] flex flex-col p-6 gap-5 transition-all duration-300 md:hidden border-t border-white/10 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
          <div className="text-[10px] text-amber-500 tracking-widest border-b border-white/10 pb-2">
            // TARS MISSION DIRECTORY
          </div>
          {navLinks.map((l, idx) => (
            <a 
              key={l} 
              href={`#${l.toLowerCase()}`} 
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-semibold text-white tracking-widest uppercase hover:text-amber-400 transition-colors"
            >
              0{idx + 1} // {l}
            </a>
          ))}
          <button 
            onClick={() => { setIsMenuOpen(false); setIsAiModalOpen(true); }}
            className="mt-4 flex items-center justify-center gap-2 font-semibold text-xs tracking-wider uppercase bg-amber-500 text-black py-3 px-4 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
          >
            <Terminal size={15} /> Access TARS Unit Terminal
          </button>
        </div>
      </nav>

      {/* TARS AI HUD Terminal Modal */}
      <div className={`fixed inset-0 z-[9000] flex items-start justify-center pt-[12vh] px-4 transition-all duration-300 ${isAiModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setIsAiModalOpen(false)} />
        
        <div className={`relative w-full max-w-2xl bg-[#090c13] border border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.15)] flex flex-col overflow-hidden transition-transform duration-300 ${isAiModalOpen ? 'scale-100' : 'scale-95'}`}>
          
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/60">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-amber-500 animate-pulse" />
              <span className="text-xs font-bold text-white tracking-widest uppercase">
                TARS // ARTICULATED TACTICAL UNIT 01
              </span>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-white/50">
              <span>H:{honesty}%</span>
              <span>U:{humor}%</span>
              <button onClick={() => setIsAiModalOpen(false)} className="bg-white/5 px-1.5 py-0.5 text-white/60 border border-white/10 hover:text-white">
                ESC
              </button>
            </div>
          </div>

          <div className="bg-[#05070c] px-4 py-2 border-b border-white/5 grid grid-cols-2 gap-4 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-[10px]">HONESTY:</span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={honesty} 
                onChange={(e) => setHonesty(Number(e.target.value))}
                className="w-full accent-amber-500 h-1 bg-white/10"
              />
              <span className="text-amber-400 font-mono text-[10px] w-8">{honesty}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/40 text-[10px]">HUMOR:</span>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={humor} 
                onChange={(e) => setHumor(Number(e.target.value))}
                className="w-full accent-amber-500 h-1 bg-white/10"
              />
              <span className="text-amber-400 font-mono text-[10px] w-8">{humor}%</span>
            </div>
          </div>
          
          <div className="flex-1 max-h-[50vh] overflow-y-auto p-6 flex flex-col gap-4 text-xs font-mono">
            {aiMessages.map((msg, idx) => (
              <div key={idx} className={`p-3 border ${msg.role === 'user' ? 'border-white/20 bg-white/[0.02] ml-8 text-right' : 'border-amber-500/20 bg-amber-500/[0.03] mr-8 text-left'}`}>
                <div className="text-[10px] text-[#f59e0b] tracking-wider mb-1 uppercase">
                  {msg.role === 'user' ? '// TRANSMISSION_QUERY' : '// TARS_DISPATCH'}
                </div>
                <div className={`leading-relaxed ${msg.role === 'user' ? 'text-white' : 'text-amber-100/90'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isAiLoading && (
              <div className="p-3 border border-amber-500/30 bg-amber-500/[0.04] mr-8 flex items-center gap-3 text-amber-300">
                <Loader2 size={14} className="animate-spin text-amber-400" />
                <span>COMPUTING ORBITAL TELEMETRY COEFFICIENT...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleAiSubmit} className="p-3 border-t border-white/10 bg-black flex gap-2">
            <span className="text-amber-500 self-center pl-2">&gt;</span>
            <input 
              type="text" 
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Query mission stack, role suitability, or technical parameters..."
              className="flex-1 bg-transparent border-none text-xs text-white focus:outline-none placeholder:text-white/30 font-mono py-2"
              disabled={isAiLoading}
              autoFocus
            />
            <button 
              type="submit"
              disabled={isAiLoading || !aiInput.trim()}
              className="bg-amber-500 text-black px-4 py-1.5 text-xs font-bold tracking-widest uppercase hover:bg-amber-400 disabled:opacity-40"
            >
              TRANSMIT
            </button>
          </form>
        </div>
      </div>

      <main className="relative z-10 pt-28">
        {/* Mission Telemetry Hero Section */}
        <section id="telemetry" className="min-h-[88vh] flex flex-col justify-center px-6 relative">
          <div className="max-w-5xl mx-auto w-full">
            <div className="telemetry-reveal">
              
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="tars-slab-matrix w-28">
                    <div className="tars-slab active" />
                    <div className="tars-slab active" />
                    <div className="tars-slab active" />
                    <div className="tars-slab active" />
                  </div>
                  <span className="text-[11px] text-amber-400 tracking-wider">TARS CHASSIS: DOCKED</span>
                </div>
                <div className="text-[11px] text-white/40 tracking-widest font-mono">
                  [GARGANTUA PHOTON RING // LENSING ACTIVE]
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs tracking-wider mb-6">
                <Radio size={13} className="animate-pulse" />
                <span>ATMOSPHERIC TELEMETRY: READY FOR ENTERPRISE ORBIT</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 uppercase">
                ENGINEERING <span className="text-amber-lens">CRITICAL SYSTEMS</span>.<br />
                ACROSS THE <span className="text-white/90">EVENT HORIZON</span>.
              </h1>
              
              <p className="text-base md:text-lg text-[#94a3b8] max-w-3xl leading-relaxed mb-10 font-sans-ui">
                I am <span className="text-white font-semibold">Nayan Choraria</span> — an architectural engineer bridging deep-learning heuristics, high-throughput microservices, and tactical user interfaces. Built to execute flawlessly through high-gravity environments.
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a 
                  href="#missions" 
                  className="bg-amber-500 text-black px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-amber-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                >
                  Inspect Mission Logs <ChevronRight size={15} />
                </a>
                
                <div className="flex items-center gap-2">
                  <a 
                    href="https://github.com/nayan2452005" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-3.5 bg-white/[0.03] border border-white/10 hover:border-amber-500/40 text-white hover:text-amber-400 transition-all" 
                    title="GitHub Matrix"
                  >
                    <Github size={18} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/nayan-choraria-026076266/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-3.5 bg-white/[0.03] border border-white/10 hover:border-amber-500/40 text-white hover:text-amber-400 transition-all" 
                    title="LinkedIn Transceiver"
                  >
                    <Linkedin size={18} />
                  </a>
                  <button 
                    onClick={copyEmail} 
                    className="p-3.5 bg-white/[0.03] border border-white/10 hover:border-amber-500/40 text-white hover:text-amber-400 transition-all relative" 
                    title="Copy Comms Email"
                  >
                    {copied ? <Check size={18} className="text-green-400" /> : <Mail size={18} />}
                    {copied && (
                      <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-[9px] font-bold px-2 py-0.5 tracking-wider uppercase whitespace-nowrap">
                        FREQUENCY COPIED
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-14 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] text-white/50">
                <div>
                  <span className="block text-white/30 uppercase">GRAVITY METRIC</span>
                  <span className="text-white font-mono">{scrollStats.gForce} G (DYNAMIC)</span>
                </div>
                <div>
                  <span className="block text-white/30 uppercase">PRIMARY STACK</span>
                  <span className="text-amber-400 font-mono">PYTHON / FASTAPI / REACT</span>
                </div>
                <div>
                  <span className="block text-white/30 uppercase">STATION LOCATION</span>
                  <span className="text-white font-mono">JAIN UNIV // BENGALURU</span>
                </div>
                <div>
                  <span className="block text-white/30 uppercase">DISPATCH STATUS</span>
                  <span className="text-green-400 font-mono">ONLINE & TRANSMITTING</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Mission Dossier & Leadership */}
        <section className="py-24 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-10 items-stretch telemetry-reveal">
              <div className="md:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-amber-500 tracking-widest uppercase mb-2">// PERSONNEL PROFILE</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight uppercase mb-4">
                    Architectural Philosophy
                  </h2>
                  <p className="text-sm text-[#94a3b8] leading-relaxed font-sans-ui">
                    Currently completing a BCA in Artificial Intelligence at Jain University. My engineering ethos replicates TARS: stark operational durability, strict schema validation, zero decorative bloat, and total predictability when systems enter volatile scenarios.
                  </p>
                </div>
                <div className="mt-6 p-4 bg-white/[0.02] border border-white/10 text-[11px]">
                  <span className="text-amber-400 font-bold block mb-1">COORDINATE VERIFICATION</span>
                  <span className="text-white/60">"It’s not possible." — "No, it’s necessary." Precision execution regardless of orbital resistance.</span>
                </div>
              </div>
              
              <div className="md:col-span-7">
                <div 
                  className="tars-card p-8 h-full flex flex-col justify-between"
                  onMouseMove={handleCardMouseMove}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <Target size={16} className="text-amber-500" />
                        <span className="text-xs font-bold text-white tracking-widest uppercase">
                          GOVERNANCE // STRATEGIC COMMAND
                        </span>
                      </div>
                      <span className="text-[10px] text-amber-500 font-mono">TENURE VERIFIED</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 uppercase">
                      Past Joint Secretary @ Marwari Yuva Manch
                    </h3>
                    <p className="text-sm text-[#94a3b8] leading-relaxed font-sans-ui mb-6">
                      Coordinated team governance, organized high-impact public initiatives, and managed cross-functional teams under strict delivery timelines. Transferred organizational discipline directly into systems design and infrastructure strategy.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center text-[10px]">
                    <div className="p-2 bg-black/40 border border-white/5">
                      <span className="text-white/40 block">FOCUS</span>
                      <span className="text-white font-mono">TEAM GOVERNANCE</span>
                    </div>
                    <div className="p-2 bg-black/40 border border-white/5">
                      <span className="text-white/40 block">INITIATIVE</span>
                      <span className="text-white font-mono">OPERATIONS</span>
                    </div>
                    <div className="p-2 bg-black/40 border border-white/5">
                      <span className="text-white/40 block">COMPLETION</span>
                      <span className="text-amber-400 font-mono">100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Arsenal */}
        <section id="arsenal" className="py-24 px-6 border-t border-white/5 bg-[#010204]/70">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 telemetry-reveal gap-4">
              <div>
                <span className="text-xs text-amber-500 tracking-widest uppercase block mb-1">// HARDWARE & RUNTIMES</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight uppercase">Technical Arsenal</h2>
              </div>
              <div className="text-[11px] text-white/40 font-mono">
                CALIBRATED SYSTEMS: 16 UNITS READY
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="telemetry-reveal">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                  <span className="text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2">
                    <Terminal size={14} className="text-amber-500" /> CODE PROTOCOLS // RUNTIMES
                  </span>
                  <span className="text-[10px] text-white/40 font-mono">[01 - 08]</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { n: 'Python & FastAPI', c: 'BACKEND TELEMETRY' },
                    { n: 'React & Next.js', c: 'INTERFACE MATRIX' },
                    { n: 'TypeScript / JS', c: 'TYPE DEFENSE' },
                    { n: 'PostgreSQL & SQL', c: 'RELATIONAL REPOSITORIES' },
                    { n: 'Groq API / LLaMA', c: 'APPLIED INTELLIGENCE' },
                    { n: 'C / C++ & Arduino', c: 'EMBEDDED HARDWARE' },
                    { n: 'Appwrite Cloud', c: 'AUTH & PERSISTENCE' },
                    { n: 'Postman & Git', c: 'VALIDATION & AUDIT' }
                  ].map((s, idx) => (
                    <div 
                      key={idx} 
                      className="tars-card p-3.5 flex flex-col justify-between"
                      onMouseMove={handleCardMouseMove}
                    >
                      <span className="text-xs font-bold text-white tracking-wide">{s.n}</span>
                      <span className="text-[9px] text-[#f59e0b] mt-1 font-mono">{s.c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="telemetry-reveal">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                  <span className="text-xs font-bold text-white tracking-widest uppercase flex items-center gap-2">
                    <Compass size={14} className="text-amber-500" /> TACTICAL COMPETENCIES
                  </span>
                  <span className="text-[10px] text-white/40 font-mono">[09 - 16]</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { n: 'Systems Architecture', c: 'FAULT-TOLERANT SPEC' },
                    { n: 'API Schema Design', c: 'RESTFUL INTEGRITY' },
                    { n: 'Algorithmic Heuristics', c: 'LOGICAL EFFICIENCY' },
                    { n: 'Data Visualization', c: 'DYNAMIC TELEMETRY' },
                    { n: 'Mission Strategy', c: 'RISK MITIGATION' },
                    { n: 'Robotics Governance', c: 'TARS COLLABORATION' },
                    { n: 'Telemetry Documentation', c: 'OPENAPI / SWAGGER' },
                    { n: 'Crisis Resolution', c: 'HIGH STAKES DEBUG' }
                  ].map((s, idx) => (
                    <div 
                      key={idx} 
                      className="tars-card p-3.5 flex flex-col justify-between"
                      onMouseMove={handleCardMouseMove}
                    >
                      <span className="text-xs font-bold text-white tracking-wide">{s.n}</span>
                      <span className="text-[9px] text-white/40 mt-1 font-mono">{s.c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Protocols */}
        <section id="protocols" className="py-24 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="mb-14 telemetry-reveal">
              <span className="text-xs text-amber-500 tracking-widest uppercase block mb-1">// MISSION DIRECTIVES</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight uppercase">Operational Protocols</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  code: "PROTOCOL-01",
                  title: "Interface Architecture", 
                  desc: "Meticulous front-end ecosystems engineered for sub-second hydration, razor-sharp state machines, and resilient responsiveness under dense operational payloads.", 
                  icon: <Laptop size={18} className="text-amber-500" /> 
                },
                { 
                  code: "PROTOCOL-02",
                  title: "Applied Intelligence & Forecasting", 
                  desc: "Deploying high-speed Groq and LLaMA inferences into real-time business pipelines, turning massive balance-sheet metrics into actionable scenario simulations.", 
                  icon: <Brain size={18} className="text-amber-500" /> 
                },
                { 
                  code: "PROTOCOL-03",
                  title: "Distributed Backend & Hardware", 
                  desc: "Architecting hardened FastAPI and Node.js microservices, structured PostgreSQL schemas, multi-provider OAuth, and physical IoT analog telemetry integration.", 
                  icon: <Cpu size={18} className="text-amber-500" /> 
                }
              ].map((service, idx) => (
                <div 
                  key={idx} 
                  className="tars-card p-7 flex flex-col justify-between telemetry-reveal"
                  onMouseMove={handleCardMouseMove}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                      <div className="p-2 bg-black border border-white/10">
                        {service.icon}
                      </div>
                      <span className="text-[10px] text-amber-400 font-mono">{service.code}</span>
                    </div>
                    
                    <h3 className="text-base font-bold text-white mb-2 uppercase tracking-wide">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#94a3b8] leading-relaxed font-sans-ui">
                      {service.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40 font-mono">
                    <span>EXECUTION READY</span>
                    <span className="text-amber-400">READY // 1.0</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Missions */}
        <section id="missions" className="py-24 px-6 border-t border-white/5 bg-[#010204]/70">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 telemetry-reveal gap-4">
              <div>
                <span className="text-xs text-amber-500 tracking-widest uppercase block mb-1">// TRANSMITTED FLIGHT LOGS</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight uppercase">Executed Missions</h2>
              </div>
              <div className="text-[11px] text-white/40 font-mono">
                {projects.length} DEPLOYED SYSTEMS DOCUMENTED
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((p, idx) => (
                <div 
                  key={idx} 
                  className="tars-card p-7 telemetry-reveal flex flex-col justify-between"
                  onMouseMove={handleCardMouseMove}
                >
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-4 pb-3 border-b border-white/10">
                      <div>
                        <span className="text-[9px] text-[#f59e0b] tracking-widest block font-mono">
                          {p.code}
                        </span>
                        <span className="text-[10px] text-white/40 font-mono">
                          {p.timeline}
                        </span>
                      </div>
                      <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/30">
                        {p.status}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide hover:text-amber-400 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[#94a3b8] leading-relaxed mb-6 font-sans-ui">
                      {p.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {p.tech.map((t, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono text-white/70 bg-black/60 border border-white/10 px-2 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    {p.link !== "#" ? (
                      <a 
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider"
                      >
                        Transmit To Live Orbit <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <span className="text-[10px] text-white/40 font-mono uppercase">
                        // SECURED REPOSITORY TELEMETRY
                      </span>
                    )}
                    <span className="text-[10px] text-white/20 font-mono">NODE_{idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>

            <div 
              className="mt-14 tars-card p-8 flex flex-col md:flex-row items-center justify-between gap-6 telemetry-reveal bg-gradient-to-r from-amber-500/5 to-transparent border-amber-500/30"
              onMouseMove={handleCardMouseMove}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Gauge size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide">Ready For Interstellar Orbit?</h3>
                  <p className="text-xs text-[#94a3b8] font-sans-ui mt-0.5">Initiate communications for systems architecture roles, high-throughput microservices, or full-stack software initiatives.</p>
                </div>
              </div>
              <a 
                href="#transmit" 
                className="bg-white text-black hover:bg-amber-400 px-6 py-3 text-xs font-bold uppercase tracking-widest shrink-0 transition-colors"
              >
                Open Comms Link
              </a>
            </div>
          </div>
        </section>

        {/* Transmit */}
        <section id="transmit" className="py-28 px-6 border-t border-white/5 relative">
          <div className="max-w-xl mx-auto text-center telemetry-reveal">
            <div className="w-14 h-14 mx-auto flex items-center justify-center bg-black border border-amber-500/40 text-amber-400 mb-6">
              <Radio size={24} className="animate-pulse" />
            </div>
            
            <span className="text-xs text-amber-500 tracking-widest uppercase block mb-1">// COMM FREQUENCY 42-108</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight uppercase mb-4">
              Transmit Direct Signal
            </h2>
            <p className="text-sm text-[#94a3b8] mb-8 font-sans-ui leading-relaxed">
              Open to architectural roles, advanced machine learning integration, and high-performance software projects across all timelines.
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={copyEmail} 
                className="tars-card py-4 px-6 flex items-center justify-center gap-3 text-white hover:text-amber-400 transition-colors group"
              >
                {copied ? <Check size={16} className="text-green-400" /> : <Mail size={16} className="text-amber-500" />}
                <span className="text-xs font-mono font-bold tracking-wider">
                  {copied ? "SIGNAL COPIED TO CLIPBOARD" : "nayanchoraria111@gmail.com"}
                </span>
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href="https://github.com/nayan2452005" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="tars-card py-3.5 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-amber-400 transition-colors"
                >
                  <Github size={15} /> GitHub Matrix
                </a>
                <a 
                  href="https://www.linkedin.com/in/nayan-choraria-026076266/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="tars-card py-3.5 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-amber-400 transition-colors"
                >
                  <Linkedin size={15} /> LinkedIn Relay
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-white/10 bg-black text-center text-xs text-white/40">
        <div className="flex items-center justify-center gap-3 mb-2 font-mono">
          <span>TARS UNIT 01</span>
          <span>//</span>
          <span>MISSION: ENDURANCE</span>
          <span>//</span>
          <span>CREW: NAYAN CHORARIA</span>
        </div>
        <p className="text-[10px] text-white/30 font-mono">
          DESIGNED WITH GARGANTUA GRAVITATIONAL TRAJECTORY // © {new Date().getFullYear()} ALL COORDINATES LOGGED
        </p>
      </footer>
    </div>
  );
}
