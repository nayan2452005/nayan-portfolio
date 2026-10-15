import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ArrowUpRight, Github, Linkedin, Mail, Check, Plus, X, Send, Loader2, Sparkles } from 'lucide-react';

// ============================================================================
// EDITABLE PORTFOLIO CONFIGURATION
// ============================================================================
const PORTFOLIO_DATA = {
  profile: {
    name: "Nayan Choraria", role: "BCA Artificial Intelligence Student", university: "Jain University, Bengaluru",
    location: "Bengaluru, India", email: "nayanchoraria111@gmail.com",
    github: "https://github.com/nayan2452005", linkedin: "https://www.linkedin.com/in/nayan-choraria-026076266/",
    resumeUrl: "", // Optional: Add "/resume.pdf" when ready
    leadership: { role: "Past Joint Secretary", organization: "Marwari Yuva Manch", summary: "Led community initiatives, coordinated team operations, and managed event execution." },
    interests: ["Artificial Intelligence & Machine Learning", "Full-Stack Web Development", "AI-Powered Applications", "Data Analysis & Intelligent Systems", "Creative Technology & Interactive Web"]
  },
  featuredProjects: [
    { id: "sri-balaji-distributors", status: "Live Website", title: "Sri Balaji Distributors Website", category: "Full-Stack Web Development",
      description: "A modern, responsive business website built for an auto-electrical spare parts wholesale distributor. Features a refined landing experience, brand marquee, and scalable component architecture.",
      tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Responsive Design"], github: "https://github.com/nayan2452005", live: "https://sri-balaji-distributors.onrender.com" },
    { id: "honeypot-scam-detection", status: "Live API", title: "Honeypot Scam Detection", category: "AI & Backend Systems",
      description: "An AI-assisted backend service designed to detect suspicious conversations and extract scam-related indicators using structured FastAPI endpoints and behavioral checks.",
      tech: ["Python", "FastAPI", "Swagger UI", "Postman", "REST API"], github: "https://github.com/nayan2452005", live: "https://agentic-honeypot-a41c.onrender.com/docs" },
    { id: "aqi-monitor-dashboard", status: "Hardware & IoT", title: "AQI Monitor Dashboard", category: "IoT & Embedded Systems",
      description: "An IoT-based air quality monitoring system built with an MQ135 gas sensor and Arduino microcontroller to measure gas levels in real time and trigger threshold buzzer alerts.",
      tech: ["Arduino IDE", "MQ135 Sensor", "C / C++", "Circuit Design", "Real-Time Alerts"], github: "https://github.com/nayan2452005", live: "" },
    { id: "sentiment-analysis-nlp", status: "Machine Learning", title: "Social Media Sentiment Analysis", category: "Machine Learning & NLP",
      description: "A natural language processing project focused on classifying social media sentiment and detecting sarcasm across unstructured text streams.",
      tech: ["Python", "Machine Learning", "NLP", "Sentiment Classification", "Data Analysis"], github: "https://github.com/nayan2452005", live: "" }
  ],
  additionalArchive: [
    { id: "live-web-portfolio", status: "Live Website", title: "Personal Developer Portfolio", category: "Frontend Architecture",
      description: "Interactive personal portfolio built with React, Vite, and custom 3D canvas rendering, optimized for smooth performance and deployed on Render.",
      tech: ["React.js", "TypeScript", "Vite", "Tailwind CSS", "Render"], github: "https://github.com/nayan2452005", live: "https://nayan-portfolio-rrb8.onrender.com" },
    { id: "ai-tally-analytics", status: "In Development", title: "AI Tally Business Analytics", category: "AI Financial Application",
      description: "A Tally-style business analytics web app with Appwrite authentication, interactive Recharts dashboards (revenue, profit, GST, debtors), and Groq LLaMA insights.",
      tech: ["React", "TypeScript", "Vite", "Recharts", "Appwrite", "Groq API"], github: "https://github.com/nayan2452005", live: "" },
    { id: "reachinbox-scheduler", status: "Full-Stack", title: "ReachInbox – Email Scheduler", category: "Full-Stack Web Platform",
      description: "Full-stack email scheduling platform supporting Google OAuth login, sender management, automated job tracking, and PostgreSQL database integration.",
      tech: ["Next.js", "Node.js", "Express", "PostgreSQL", "Google OAuth", "REST API"], github: "https://github.com/nayan2452005", live: "" }
  ],
  skills: [
    { id: "ai-ml", category: "AI & Machine Learning", description: "Building intelligent workflows, NLP classification models, and LLM-powered applications.",
      items: ["Machine Learning", "Natural Language Processing", "Sentiment & Sarcasm Detection", "Groq API (LLaMA)", "AI Application Integration"], connections: ["languages", "data-analysis", "backend"] },
    { id: "languages", category: "Programming Languages", description: "Core languages used across web applications, backend APIs, and microcontroller programming.",
      items: ["Python", "TypeScript", "JavaScript (ES6+)", "C / C++", "Java", "SQL"], connections: ["ai-ml", "frontend", "backend"] },
    { id: "frontend", category: "Frontend Development", description: "Creating responsive, accessible, and refined user interfaces with modern React tooling.",
      items: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Vite", "HTML5 & CSS3"], connections: ["languages", "backend", "tools"] },
    { id: "backend", category: "Backend Development", description: "Designing REST APIs, authentication flows, and scalable server-side logic.",
      items: ["FastAPI", "Node.js", "Express.js", "RESTful APIs", "Google OAuth 2.0", "Appwrite"], connections: ["languages", "databases", "ai-ml"] },
    { id: "databases", category: "Databases", description: "Relational schema modeling, data persistence, and cloud database integration.",
      items: ["PostgreSQL", "SQL Databases", "Appwrite Database", "Firebase"], connections: ["backend", "data-analysis"] },
    { id: "data-analysis", category: "Data Analysis & Visualization", description: "Turning financial metrics and sensor readings into clear, interactive visual dashboards.",
      items: ["Recharts", "KPI Dashboards", "IoT Sensor Data", "Forecasting Workflows", "Data Visualization"], connections: ["ai-ml", "databases"] },
    { id: "tools", category: "Development Tools", description: "Everyday workflow tools for version control, API testing, hardware setup, and deployment.",
      items: ["Git & GitHub", "Postman", "Swagger UI / OpenAPI", "Arduino IDE", "Render"], connections: ["frontend", "backend"] }
  ]
};
const D = PORTFOLIO_DATA, PR = D.profile;
const ALL = [...D.featuredProjects, ...D.additionalArchive];

// ============================================================================
// BACKGROUND: SLOW GOLD WIREFRAME + DUST (reacts to scroll & pointer)
// ============================================================================
function Scene({ sc, ms }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let r; try { r = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); } catch { return; }
    const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100); cam.position.z = 9;
    r.setPixelRatio(Math.min(devicePixelRatio, 1.5)); r.setSize(innerWidth, innerHeight); el.appendChild(r.domElement);
    const wire = (g, c, o) => new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: o }));
    const a = wire(new THREE.IcosahedronGeometry(2.6, 1), 0xBE9B5F, 0.26), b = wire(new THREE.IcosahedronGeometry(1.5, 0), 0xEFE6D6, 0.14);
    const g = new THREE.Group(); g.add(a, b); scene.add(g);
    const pos = new Float32Array(2100); for (let i = 0; i < 2100; i++) pos[i] = (Math.random() - 0.5) * 34;
    const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const dust = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xBE9B5F, size: 0.035, transparent: true, opacity: 0.55 })); scene.add(dust);
    let id, t = 0, p = 0, mx = 0, my = 0;
    const rs = () => { cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); r.setSize(innerWidth, innerHeight); };
    const loop = () => {
      p += (sc.current - p) * 0.05; mx += (ms.current.x - mx) * 0.04; my += (ms.current.y - my) * 0.04; if (!rm) t += 0.004;
      a.rotation.set(t * 0.8 + my * 0.4 + p * 3, t + mx * 0.5, 0); b.rotation.set(-t, -t * 0.7 + p * 2, 0);
      g.position.set(innerWidth < 900 ? 0 : 3.4 - p * 5.5, -p * 3, -p * 4);
      dust.rotation.set(p * 0.8, t * 0.15 + mx * 0.1, 0);
      r.render(scene, cam); id = requestAnimationFrame(loop);
    };
    addEventListener('resize', rs); loop();
    return () => { cancelAnimationFrame(id); removeEventListener('resize', rs); r.dispose(); el.contains(r.domElement) && el.removeChild(r.domElement); };
  }, []);
  return <div ref={ref} aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none" />;
}

// Magnetic wrapper: element leans toward the pointer
function Mag({ as: T = 'a', className = '', children, ...p }) {
  const ref = useRef(null);
  const mv = (e) => { const b = ref.current.getBoundingClientRect(); ref.current.style.transform = `translate(${(e.clientX - b.left - b.width / 2) * 0.22}px,${(e.clientY - b.top - b.height / 2) * 0.32}px)`; };
  return <T ref={ref} onMouseMove={mv} onMouseLeave={() => (ref.current.style.transform = '')} className={`mag ${className}`} {...p}>{children}</T>;
}
const L = ({ d = 0, children }) => <span className="ln"><span style={{ '--d': `${d}s` }}>{children}</span></span>;

// Expandable project row
function Row({ p, i, open, setOpen }) {
  const on = open === p.id;
  return (
    <article className={`row ${on ? 'open' : ''}`}>
      <button className="rh" onClick={() => setOpen(on ? null : p.id)} aria-expanded={on}>
        <span className="rt serif">{p.title}</span>
        <span className="rc">{p.category}</span>
        <span className="ra"><Plus size={22} strokeWidth={1.2} /></span>
      </button>
      <div className="xp"><div className="xi"><div className="xb">
        <div className="orb" style={{ '--r': `${i * 67}deg` }} />
        <div>
          <span className={`tag ${p.live ? 'live' : ''}`}>{p.status}</span>
          <p className="desc">{p.description}</p>
          <div className="chips">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
          <div className="lnk">
            <a href={p.github} target="_blank" rel="noopener noreferrer"><Github size={14} /> Source code</a>
            {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="gold">View live <ArrowUpRight size={14} /></a>}
          </div>
        </div>
      </div></div></div>
    </article>
  );
}

// ============================================================================
// MAIN APPLICATION
// ============================================================================
export default function App() {
  const [menu, setMenu] = useState(false), [copied, setCopied] = useState(false), [count, setCount] = useState(0), [ready, setReady] = useState(false);
  const [active, setActive] = useState('home'), [scrolled, setScrolled] = useState(false), [hov, setHov] = useState(false);
  const [more, setMore] = useState(false), [skill, setSkill] = useState('ai-ml'), [open, setOpen] = useState(D.featuredProjects[0].id);
  const [chat, setChat] = useState(false), [honesty, setHonesty] = useState(90), [humor, setHumor] = useState(75);
  const [input, setInput] = useState(''), [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState([{ r: 'a', t: "Welcome. I'm Nayan's digital concierge. Ask me about his projects, his skills, or his studies at Jain University." }]);
  const sc = useRef(0), ms = useRef({ x: 0, y: 0 }), dot = useRef(null), ring = useRef(null), bar = useRef(null), end = useRef(null);

  // Opening sequence: counter, then the curtain lifts and the headline rises
  useEffect(() => {
    let c = 0; const iv = setInterval(() => {
      c = Math.min(100, c + Math.ceil(Math.random() * 8)); setCount(c);
      if (c >= 100) { clearInterval(iv); setTimeout(() => setReady(true), 400); }
    }, 50); return () => clearInterval(iv);
  }, []);
  useEffect(() => { document.body.style.overflow = ready ? '' : 'hidden'; }, [ready]);

  useEffect(() => {
    const fine = matchMedia('(pointer: fine)').matches; let raf; const raw = { x: -100, y: -100 }, sm = { x: -100, y: -100 };
    const mm = (e) => {
      raw.x = e.clientX; raw.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${e.clientX - 3}px,${e.clientY - 3}px,0)`;
      setHov(Boolean(e.target.closest && e.target.closest('a,button,input,.mag')));
      ms.current = { x: e.clientX / innerWidth - 0.5, y: e.clientY / innerHeight - 0.5 };
      const s = document.documentElement.style; s.setProperty('--mx', e.clientX + 'px'); s.setProperty('--my', e.clientY + 'px');
    };
    const tick = () => { sm.x += (raw.x - sm.x) * 0.15; sm.y += (raw.y - sm.y) * 0.15; if (ring.current) ring.current.style.transform = `translate3d(${sm.x - 18}px,${sm.y - 18}px,0)`; raf = requestAnimationFrame(tick); };
    if (fine) { addEventListener('mousemove', mm, { passive: true }); tick(); }
    const onScroll = () => {
      const h = Math.max(document.documentElement.scrollHeight - innerHeight, 1); sc.current = Math.min(scrollY / h, 1);
      if (bar.current) bar.current.style.transform = `scaleX(${sc.current})`; setScrolled(scrollY > 50);
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    const so = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { threshold: 0.3 });
    document.querySelectorAll('section[id]').forEach((s) => so.observe(s));
    const ro = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.rv').forEach((el) => ro.observe(el));
    const kd = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setChat((v) => !v); }
      else if (e.key === 'Escape') { setChat(false); setMenu(false); }
    };
    addEventListener('keydown', kd);
    return () => { removeEventListener('mousemove', mm); cancelAnimationFrame(raf); removeEventListener('scroll', onScroll); removeEventListener('keydown', kd); so.disconnect(); ro.disconnect(); };
  }, []);

  useEffect(() => { if (chat) end.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, chat]);

  const copyEmail = () => {
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(PR.email);
    else { const el = document.createElement('textarea'); el.value = PR.email; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el); }
    setCopied(true); setTimeout(() => setCopied(false), 2200);
  };

  const local = (q) => {
    q = q.toLowerCase();
    if (/project|work|live|balaji|honeypot|aqi|sentiment/.test(q)) return "Nayan's deployed projects include the Sri Balaji Distributors website and the Honeypot Scam Detection API. He has also built an IoT AQI monitor, a sentiment analysis NLP model, an AI Tally analytics app, and ReachInbox.";
    if (/skill|stack|tech|language/.test(q)) return "Nayan works with Python, TypeScript, JavaScript, C/C++, React, Next.js, FastAPI, Node.js, PostgreSQL, Appwrite, and machine learning and NLP tools.";
    if (/education|university|student|about|who/.test(q)) return "Nayan Choraria is a BCA Artificial Intelligence student at Jain University in Bengaluru, focused on AI applications and full-stack software.";
    if (/contact|email|hire|reach/.test(q)) return `You can reach Nayan at ${PR.email}, or through GitHub and LinkedIn.`;
    return "Nayan Choraria is a BCA AI student at Jain University building AI applications and full-stack web systems. Ask about his projects, skills, or how to contact him.";
  };

  const send = async (e) => {
    e.preventDefault(); const q = input.trim(); if (!q) return;
    setMsgs((m) => [...m, { r: 'u', t: q }]); setInput(''); setBusy(true);
    const add = (t) => setMsgs((m) => [...m, { r: 'a', t }]);
    const sys = `You are the digital concierge on Nayan Choraria's portfolio website: polished, warm, and concise. Settings: Honesty ${honesty}%, Humor ${humor}%.
About Nayan: ${PR.role} at ${PR.university}. Past Joint Secretary at Marwari Yuva Manch.
Projects:
${ALL.map((p) => `- ${p.title}: ${p.description}${p.live ? ` (Live: ${p.live})` : ''}`).join('\n')}
Answer in 2 to 3 sentences. Do not invent experience or metrics.`;
    try {
      const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
      const groq = env.VITE_GROQ_API_KEY || '', proxy = env.VITE_AI_PROXY_URL || '', gem = env.VITE_GEMINI_API_KEY || '';
      if (groq) {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${groq}` },
          body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'system', content: sys }, { role: 'user', content: q }], temperature: 0.6, max_tokens: 220 })
        });
        if (!res.ok) throw new Error('Groq failed'); const d = await res.json();
        add(d.choices?.[0]?.message?.content?.trim() || local(q)); return;
      }
      if (proxy || gem) {
        const res = await fetch(proxy || `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${gem}`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: q }] }], systemInstruction: { parts: [{ text: sys }] } })
        });
        if (!res.ok) throw new Error('API failed'); const d = await res.json();
        add(d.candidates?.[0]?.content?.parts?.[0]?.text || local(q)); return;
      }
      await new Promise((r) => setTimeout(r, 500)); add(local(q));
    } catch { add(local(q)); } finally { setBusy(false); }
  };

  const nav = ['home', 'about', 'projects', 'skills', 'contact'];
  const cur = D.skills.find((s) => s.id === skill) || D.skills[0];
  const words = ['Machine Learning', 'FastAPI', 'React', 'TypeScript', 'Natural Language Processing', 'Next.js', 'PostgreSQL', 'Python', 'Node.js', 'Arduino'];

  return (
    <div className={`app ${ready ? 'go' : ''}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@300;400;500;600&display=swap');
        :root{--bg:#120E0B;--ink:#EFE6D6;--mut:#9C9080;--gold:#BE9B5F;--line:rgba(239,230,214,.12);--ease:cubic-bezier(.16,1,.3,1)}
        html{scroll-behavior:smooth} body{background:var(--bg);color:var(--ink);font-family:'Manrope',sans-serif;-webkit-font-smoothing:antialiased}
        ::selection{background:var(--gold);color:var(--bg)}
        @media (pointer:fine) and (min-width:768px){*{cursor:none!important}}
        .app{position:relative;overflow-x:hidden}
        .serif{font-family:'Cormorant Garamond',serif;font-weight:500;letter-spacing:-.02em}
        .gold{color:var(--gold)} .mut{color:var(--mut)}
        .lbl{font-size:.8rem;letter-spacing:.06em;color:var(--mut)}
        .h1{font-size:clamp(3.1rem,9.2vw,8.6rem);line-height:.96}
        .h2{font-size:clamp(2.4rem,6vw,5.2rem);line-height:1}
        .it{font-style:italic;color:var(--gold)}
        .grain{position:fixed;inset:0;z-index:90;pointer-events:none;opacity:.07;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
        .glow{position:fixed;inset:0;z-index:1;pointer-events:none;background:radial-gradient(640px circle at var(--mx,70%) var(--my,30%),rgba(190,155,95,.09),transparent 60%)}
        .bar{position:fixed;top:0;left:0;right:0;height:2px;z-index:100;background:var(--gold);transform:scaleX(0);transform-origin:left}
        /* opening curtain */
        .loader{position:fixed;inset:0;z-index:200;background:#0C0907;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.4rem;border-radius:0 0 50% 50%/0 0 9vh 9vh;transition:transform 1.2s cubic-bezier(.76,0,.24,1),visibility 0s 1.2s}
        .go .loader{transform:translateY(-102%);visibility:hidden}
        .go .loader>*{opacity:0;transition:opacity .4s}
        .loader .cnt{font-size:clamp(4rem,12vw,9rem);line-height:1;font-variant-numeric:tabular-nums}
        .loader .rule{width:min(260px,60vw);height:1px;background:var(--line);overflow:hidden}
        .loader .rule i{display:block;height:100%;background:var(--gold);transition:width .1s linear}
        /* cursor */
        .cd{position:fixed;top:0;left:0;width:6px;height:6px;border-radius:50%;background:var(--gold);z-index:9999;pointer-events:none}
        .cr{position:fixed;top:0;left:0;width:36px;height:36px;z-index:9998;pointer-events:none}
        .cr i{display:block;width:100%;height:100%;border:1px solid rgba(239,230,214,.45);border-radius:50%;transition:transform .5s var(--ease),background .4s,border-color .4s}
        .cr.h i{transform:scale(1.7);background:rgba(190,155,95,.12);border-color:var(--gold)}
        /* nav */
        .nav{position:fixed;top:0;left:0;right:0;z-index:60;display:flex;align-items:center;justify-content:space-between;padding:1.5rem 2rem;transition:all .6s var(--ease)}
        .nav.sc{padding:.85rem 2rem;background:rgba(18,14,11,.72);backdrop-filter:blur(18px);border-bottom:1px solid var(--line)}
        .mono-ring{width:2.6rem;height:2.6rem;border:1px solid var(--gold);border-radius:50%;display:grid;place-items:center;font-size:1.15rem;transition:background .5s,color .5s}
        .mono-ring:hover{background:var(--gold);color:var(--bg)}
        .nl{position:relative;font-size:.85rem;letter-spacing:.04em;color:var(--mut);transition:color .4s;padding:.3rem 0}
        .nl::after{content:'';position:absolute;left:0;right:0;bottom:0;height:1px;background:var(--gold);transform:scaleX(0);transform-origin:right;transition:transform .6s var(--ease)}
        .nl:hover,.nl.on{color:var(--ink)} .nl:hover::after,.nl.on::after{transform:scaleX(1);transform-origin:left}
        .mm{position:fixed;inset:0;z-index:55;background:var(--bg);display:flex;flex-direction:column;justify-content:center;gap:.4rem;padding:2rem;clip-path:circle(0 at calc(100% - 3rem) 2.4rem);transition:clip-path 1s var(--ease)}
        .mm.o{clip-path:circle(160% at calc(100% - 3rem) 2.4rem)}
        .mm a{font-size:clamp(2.6rem,12vw,4.5rem);line-height:1.1;transform:translateY(30px);opacity:0;transition:all .9s var(--ease)}
        .mm.o a{transform:none;opacity:1}
        /* buttons */
        .mag{display:inline-flex;transition:transform .5s var(--ease)}
        .btn{display:inline-flex;align-items:center;gap:.7rem;padding:1.05rem 1.9rem;border-radius:999px;font-size:.78rem;font-weight:500;letter-spacing:.1em;text-transform:uppercase;border:1px solid rgba(239,230,214,.28);position:relative;overflow:hidden;isolation:isolate;transition:color .5s,border-color .5s,transform .5s var(--ease)}
        .btn::before{content:'';position:absolute;inset:0;background:var(--ink);transform:translateY(101%);transition:transform .65s var(--ease);z-index:-1}
        .btn:hover::before{transform:none} .btn:hover{color:#120E0B;border-color:var(--ink)}
        .btn.fill{background:var(--gold);border-color:var(--gold);color:#120E0B}
        /* headline line-mask reveal */
        .ln{display:block;overflow:hidden;padding:0 .04em .12em;margin-bottom:-.12em}
        .ln>span{display:block;transform:translateY(112%);transition:transform 1.4s var(--ease) var(--d,0s)}
        .go .hero .ln>span,.in .ln>span{transform:none}
        .go .hero .fd{opacity:1;transform:none}
        .fd{opacity:0;transform:translateY(18px);transition:opacity 1.2s var(--ease) var(--d,0s),transform 1.2s var(--ease) var(--d,0s)}
        .go .hero .fd{transition-delay:var(--d,0s)}
        .rv{opacity:0;transform:translateY(28px);transition:opacity 1.2s var(--ease) var(--d,0s),transform 1.2s var(--ease) var(--d,0s)}
        .rv.in{opacity:1;transform:none}
        .sec{position:relative;z-index:10;padding:9rem 1.5rem;border-top:1px solid var(--line)}
        .wrap{max-width:1180px;margin:0 auto}
        .hero{position:relative;z-index:10;min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;padding:9rem 1.5rem 3rem}
        .cue{width:1px;height:56px;background:var(--line);position:relative;overflow:hidden}
        .cue::after{content:'';position:absolute;top:-100%;left:0;width:100%;height:100%;background:var(--gold);animation:cue 2.4s var(--ease) infinite}
        @keyframes cue{to{top:100%}}
        .mq{position:relative;z-index:10;overflow:hidden;border-block:1px solid var(--line);padding:1.5rem 0;background:rgba(18,14,11,.7);backdrop-filter:blur(6px)}
        .mt{display:flex;gap:3rem;width:max-content;animation:mq 46s linear infinite;align-items:center}
        .mt span{font-size:2.3rem;font-style:italic;color:rgba(239,230,214,.55);white-space:nowrap}
        .mt b{width:6px;height:6px;border:1px solid var(--gold);transform:rotate(45deg);flex:none}
        @keyframes mq{to{transform:translateX(-50%)}}
        /* projects */
        .row{border-bottom:1px solid var(--line)}
        .rh{display:grid;grid-template-columns:1fr auto 2.5rem;align-items:center;gap:1.5rem;width:100%;padding:2.2rem 0;text-align:left;color:var(--ink);transition:padding .7s var(--ease),color .5s}
        .rh:hover{padding-left:1.2rem}
        .rt{font-size:clamp(1.8rem,4vw,3.3rem);line-height:1.05;transition:color .5s}
        .row.open .rt,.rh:hover .rt{color:var(--gold);font-style:italic}
        .rc{font-size:.82rem;color:var(--mut)}
        .ra{transition:transform .8s var(--ease);color:var(--gold)} .row.open .ra{transform:rotate(135deg)}
        .xp{display:grid;grid-template-rows:0fr;transition:grid-template-rows .9s var(--ease)} .row.open .xp{grid-template-rows:1fr}
        .xi{overflow:hidden;min-height:0;opacity:0;transition:opacity .7s} .row.open .xi{opacity:1;transition-delay:.15s}
        .xb{display:grid;grid-template-columns:180px 1fr;gap:3rem;padding:.5rem 0 3rem;align-items:center}
        .orb{position:relative;aspect-ratio:1;border-radius:50%;background:conic-gradient(from var(--r),#BE9B5F,#1b1510,#7d6236,#1b1510,#BE9B5F);box-shadow:0 0 70px rgba(190,155,95,.16);animation:spin 20s linear infinite}
        .orb::after{content:'';position:absolute;inset:16%;border-radius:50%;background:var(--bg)}
        @keyframes spin{to{transform:rotate(360deg)}}
        .tag{display:inline-block;font-size:.75rem;padding:.3rem .9rem;border:1px solid var(--line);border-radius:999px;color:var(--mut);margin-bottom:1rem}
        .tag.live{color:var(--gold);border-color:rgba(190,155,95,.5)}
        .desc{color:var(--mut);line-height:1.75;max-width:40rem;margin-bottom:1.4rem}
        .chips{display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.6rem}
        .chips span{font-size:.75rem;padding:.35rem .85rem;border:1px solid var(--line);border-radius:999px;color:var(--mut);transition:all .4s}
        .chips span:hover{border-color:var(--gold);color:var(--ink)}
        .lnk{display:flex;gap:1.8rem;font-size:.85rem}
        .lnk a{display:inline-flex;align-items:center;gap:.4rem;color:var(--mut);transition:color .4s} .lnk a:hover{color:var(--ink)} .lnk a.gold{color:var(--gold)}
        .pop{animation:pop .9s var(--ease) both} @keyframes pop{from{opacity:0;transform:translateY(14px)}}
        /* skills */
        .sk{display:flex;justify-content:space-between;align-items:center;width:100%;padding:1.25rem 0;border-bottom:1px solid var(--line);text-align:left;color:var(--mut);transition:all .6s var(--ease)}
        .sk .serif{font-size:1.7rem;transition:color .5s}
        .sk:hover,.sk.on{color:var(--ink);padding-left:1rem} .sk.on .serif{color:var(--gold);font-style:italic}
        .glass{background:linear-gradient(145deg,rgba(239,230,214,.06),rgba(239,230,214,.015));border:1px solid var(--line);backdrop-filter:blur(20px);border-radius:22px}
        .rel{font-size:.78rem;color:var(--mut);border-bottom:1px solid var(--line);padding-bottom:2px;transition:all .4s} .rel:hover{color:var(--gold);border-color:var(--gold)}
        .ix{padding:1.1rem 0;border-bottom:1px solid var(--line);font-size:.95rem;transition:padding .6s var(--ease),color .4s} .ix:hover{padding-left:.8rem;color:var(--gold)}
        /* concierge */
        .fab{position:fixed;right:1.25rem;bottom:1.25rem;z-index:80;display:flex;align-items:center;gap:.6rem;padding:.85rem 1.3rem;border-radius:999px;font-size:.8rem;color:var(--ink);background:rgba(18,14,11,.8);border:1px solid rgba(190,155,95,.5);backdrop-filter:blur(16px);transition:all .5s var(--ease)}
        .fab:hover{background:var(--gold);color:var(--bg)}
        .chat{position:fixed;right:1.25rem;bottom:5rem;width:min(26rem,calc(100vw - 2.5rem));z-index:80;transform-origin:bottom right;transform:translateY(24px) scale(.95);opacity:0;visibility:hidden;transition:transform .8s var(--ease),opacity .5s,visibility 0s .8s;background:rgba(22,17,13,.92);box-shadow:0 40px 90px rgba(0,0,0,.7)}
        .chat.o{transform:none;opacity:1;visibility:visible;transition-delay:0s}
        .m{padding:.8rem 1rem;border-radius:14px;font-size:.85rem;line-height:1.6;max-width:88%;animation:pop .7s var(--ease) both}
        .m.a{background:rgba(239,230,214,.05);border:1px solid var(--line)} .m.u{background:var(--gold);color:#120E0B;margin-left:auto}
        .chat input[type=range]{accent-color:var(--gold);width:100%;height:2px}
        @media (max-width:700px){.rc{display:none}.rh{grid-template-columns:1fr 2.5rem}.xb{grid-template-columns:1fr;gap:1.5rem}.orb{width:90px}.sec{padding:6rem 1.25rem}.nav,.nav.sc{padding-inline:1.25rem}}
        @media (prefers-reduced-motion:reduce){*{animation:none!important;transition-duration:.01ms!important}.ln>span,.rv,.fd{transform:none!important;opacity:1!important}}
      `}</style>

      <div className="grain" aria-hidden="true" />
      <div className="glow" aria-hidden="true" />
      <div ref={bar} className="bar" aria-hidden="true" />
      <Scene sc={sc} ms={ms} />

      <div className="loader" aria-hidden={ready}>
        <span className="serif cnt">{String(count).padStart(2, '0')}</span>
        <div className="rule"><i style={{ width: `${count}%` }} /></div>
        <span className="lbl">{PR.name}</span>
      </div>

      <div ref={ring} className={`cr hidden md:block ${hov ? 'h' : ''}`} aria-hidden="true"><i /></div>
      <div ref={dot} className="cd hidden md:block" aria-hidden="true" />

      <header className={`nav ${scrolled ? 'sc' : ''}`}>
        <a href="#home" className="mono-ring serif" aria-label="Home">NC</a>
        <nav className="hidden md:flex items-center gap-9" aria-label="Primary">
          {nav.slice(1).map((n) => <a key={n} href={`#${n}`} className={`nl ${active === n ? 'on' : ''}`}>{n[0].toUpperCase() + n.slice(1)}</a>)}
        </nav>
        <div className="flex items-center gap-4">
          <span className="hidden lg:flex items-center gap-2 lbl"><i className="w-1.5 h-1.5 rounded-full bg-[#BE9B5F] animate-pulse" />Available for projects</span>
          <button onClick={() => setMenu(!menu)} className="md:hidden nl" style={{ zIndex: 70, position: 'relative' }} aria-expanded={menu}>{menu ? <X size={22} /> : 'Menu'}</button>
        </div>
      </header>
      <div className={`mm md:hidden ${menu ? 'o' : ''}`}>
        {nav.map((n, i) => <a key={n} href={`#${n}`} onClick={() => setMenu(false)} className="serif" style={{ transitionDelay: menu ? `${0.25 + i * 0.07}s` : '0s' }}>{n[0].toUpperCase() + n.slice(1)}</a>)}
      </div>

      <main>
        <section id="home" className="hero">
          <div className="wrap w-full">
            <p className="lbl fd mb-8" style={{ '--d': '.9s' }}>{PR.role}, {PR.university}</p>
            <h1 className="h1 serif">
              <L d={0.15}>Intelligent software,</L>
              <span className="it"><L d={0.3}>crafted with precision.</L></span>
            </h1>
            <p className="fd mut max-w-xl text-base sm:text-lg leading-relaxed mt-9" style={{ '--d': '1.1s' }}>
              I build useful digital experiences at the intersection of artificial intelligence, software engineering, and creative technology.
            </p>
            <div className="fd flex flex-wrap items-center gap-4 mt-10" style={{ '--d': '1.25s' }}>
              <Mag href="#projects" className="btn fill">View selected work</Mag>
              <Mag href="#contact" className="btn"><Mail size={15} /> Get in touch</Mag>
            </div>
            <div className="fd flex items-end justify-between mt-20 pt-6 border-t border-[color:var(--line)]" style={{ '--d': '1.4s' }}>
              <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm">
                <div><span className="lbl block">Based in</span>{PR.location}</div>
                <div><span className="lbl block">Focus</span>AI / ML and full-stack</div>
                <div><span className="lbl block">Studying at</span>Jain University</div>
              </div>
              <div className="cue hidden sm:block" aria-hidden="true" />
            </div>
          </div>
        </section>

        <div className="mq" aria-hidden="true">
          <div className="mt serif">{[...words, ...words].map((w, i) => <React.Fragment key={i}><span>{w}</span><b /></React.Fragment>)}</div>
        </div>

        <section id="about" className="sec">
          <div className="wrap grid lg:grid-cols-12 gap-14">
            <div className="lg:col-span-7 rv">
              <h2 className="h2 serif mb-10"><L>Every builder has a beginning.</L><span className="it"><L d={0.12}>Intelligence is the direction.</L></span></h2>
              <p className="serif text-2xl sm:text-[1.75rem] leading-snug mb-6" style={{ fontWeight: 400 }}>
                I'm Nayan Choraria, a BCA Artificial Intelligence student at Jain University in Bengaluru, passionate about combining machine learning with practical, well-crafted software.
              </p>
              <p className="mut leading-relaxed max-w-xl">
                Whether I'm building FastAPI services for scam detection, programming sensors for real-time air quality monitoring, or developing full-stack web applications, I focus on clean architecture, reliability, and intuitive user experiences.
              </p>
              <div className="flex gap-12 mt-12">
                {[[ALL.length, 'Projects built'], [ALL.filter((p) => p.live).length, 'Live deployments'], [D.skills.length, 'Skill disciplines']].map(([n, l]) => (
                  <div key={l}><span className="serif gold block" style={{ fontSize: '3.2rem', lineHeight: 1 }}>{n}</span><span className="lbl">{l}</span></div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 rv" style={{ '--d': '.15s' }}>
              <h3 className="serif text-2xl mb-3 gold">Areas of interest</h3>
              <div className="mb-12">{PR.interests.map((t) => <div key={t} className="ix">{t}</div>)}</div>
              <div className="glass p-7 mb-4"><span className="lbl block mb-1">Education</span><h4 className="serif text-2xl">BCA, Artificial Intelligence</h4><p className="mut text-sm mt-1">{PR.university}</p></div>
              <div className="glass p-7"><span className="lbl block mb-1">Leadership</span><h4 className="serif text-2xl">{PR.leadership.role}, {PR.leadership.organization}</h4><p className="mut text-sm mt-1">{PR.leadership.summary}</p></div>
            </div>
          </div>
        </section>

        <section id="projects" className="sec">
          <div className="wrap">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 rv">
              <h2 className="h2 serif"><L>Selected work</L></h2>
              <p className="mut text-sm max-w-sm">Live deployments come first, followed by hardware, machine learning, and full-stack builds. Select a project to open it.</p>
            </div>
            <div className="border-t border-[color:var(--line)] rv">
              {D.featuredProjects.map((p, i) => <Row key={p.id} p={p} i={i} open={open} setOpen={setOpen} />)}
              {more && D.additionalArchive.map((p, i) => <div key={p.id} className="pop" style={{ animationDelay: `${i * 0.12}s` }}><Row p={p} i={i + 4} open={open} setOpen={setOpen} /></div>)}
            </div>
            <div className="mt-12 text-center rv">
              <Mag as="button" onClick={() => setMore((v) => !v)} className="btn"><Plus size={14} style={{ transition: 'transform .6s', transform: more ? 'rotate(45deg)' : 'none' }} />{more ? 'Show fewer projects' : `View ${D.additionalArchive.length} more projects`}</Mag>
            </div>
          </div>
        </section>

        <section id="skills" className="sec">
          <div className="wrap">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 rv">
              <h2 className="h2 serif"><L>Skills and tools</L></h2>
              <p className="mut text-sm max-w-sm">Choose a discipline to see the tools and technologies behind it.</p>
            </div>
            <div className="grid lg:grid-cols-12 gap-12 items-start rv">
              <div className="lg:col-span-6 border-t border-[color:var(--line)]">
                {D.skills.map((s) => (
                  <button key={s.id} onClick={() => setSkill(s.id)} onMouseEnter={() => setSkill(s.id)} className={`sk ${skill === s.id ? 'on' : ''}`}>
                    <span className="serif">{s.category}</span><span className="lbl">{s.items.length} skills</span>
                  </button>
                ))}
              </div>
              <div className="lg:col-span-6 lg:sticky lg:top-28">
                <div className="glass p-8 sm:p-10" key={cur.id}>
                  <div className="pop">
                    <h3 className="serif text-4xl it mb-4">{cur.category}</h3>
                    <p className="mut leading-relaxed mb-8">{cur.description}</p>
                    <div className="chips">{cur.items.map((t) => <span key={t}>{t}</span>)}</div>
                    <div className="pt-6 mt-2 border-t border-[color:var(--line)]">
                      <span className="lbl block mb-3">Works closely with</span>
                      <div className="flex flex-wrap gap-x-6 gap-y-3">
                        {cur.connections.map((c) => { const o = D.skills.find((s) => s.id === c); return o && <button key={c} onClick={() => setSkill(c)} className="rel">{o.category}</button>; })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="sec" style={{ paddingBlock: '11rem' }}>
          <div className="wrap text-center rv">
            <h2 className="h1 serif mb-8"><L>Let's build something</L><span className="it"><L d={0.14}>extraordinary.</L></span></h2>
            <p className="mut text-lg max-w-xl mx-auto leading-relaxed mb-12">I'm open to interesting ideas, collaborations, and meaningful technology projects.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <Mag as="button" onClick={copyEmail} className="btn">{copied ? <Check size={16} /> : <Mail size={16} />}{copied ? 'Email copied' : PR.email}</Mag>
              <Mag href={`mailto:${PR.email}`} className="btn fill">Send an email <ArrowUpRight size={16} /></Mag>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <a href={PR.github} target="_blank" rel="noopener noreferrer" className="nl inline-flex items-center gap-2"><Github size={16} />GitHub</a>
              <a href={PR.linkedin} target="_blank" rel="noopener noreferrer" className="nl inline-flex items-center gap-2"><Linkedin size={16} />LinkedIn</a>
              {PR.resumeUrl && <a href={PR.resumeUrl} target="_blank" rel="noopener noreferrer" className="nl">Resume</a>}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 px-6 py-8 border-t border-[color:var(--line)]" style={{ background: 'rgba(18,14,11,.9)' }}>
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-3 lbl">
          <span>© {new Date().getFullYear()} {PR.name}</span>
          <span>BCA Artificial Intelligence, {PR.university}</span>
        </div>
      </footer>

      <button className="fab" onClick={() => setChat((v) => !v)} aria-expanded={chat} title="Ask the concierge (Cmd/Ctrl + K)">
        {chat ? <X size={15} /> : <Sparkles size={15} className="gold" />} {chat ? 'Close' : 'Ask the concierge'}
      </button>
      <div className={`chat glass overflow-hidden ${chat ? 'o' : ''}`} role="dialog" aria-label="Concierge">
        <div className="px-5 py-4 border-b border-[color:var(--line)]">
          <span className="serif text-2xl block">Concierge</span>
          <span className="lbl">Ask about projects, skills, or experience</span>
        </div>
        <div className="px-5 py-3 grid grid-cols-2 gap-5 lbl border-b border-[color:var(--line)]">
          <label>Honesty {honesty}%<input type="range" min="0" max="100" value={honesty} onChange={(e) => setHonesty(+e.target.value)} /></label>
          <label>Humor {humor}%<input type="range" min="0" max="100" value={humor} onChange={(e) => setHumor(+e.target.value)} /></label>
        </div>
        <div className="px-5 py-3 flex flex-wrap gap-2 border-b border-[color:var(--line)]">
          {["Tell me about Nayan's live projects", 'What is his tech stack?', 'How can I contact Nayan?'].map((t) => (
            <button key={t} type="button" onClick={() => setInput(t)} className="rel">{t}</button>
          ))}
        </div>
        <div className="p-5 flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: '40vh' }}>
          {msgs.map((m, i) => <div key={i} className={`m ${m.r}`}>{m.t}</div>)}
          {busy && <div className="m a flex items-center gap-2 mut"><Loader2 size={14} className="animate-spin" />Thinking</div>}
          <div ref={end} />
        </div>
        <form onSubmit={send} className="p-3 flex items-center gap-2 border-t border-[color:var(--line)]">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question" className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-[#9C9080]" />
          <button type="submit" disabled={busy || !input.trim()} className="p-2.5 rounded-full bg-[#BE9B5F] text-[#120E0B] disabled:opacity-40 transition-opacity" aria-label="Send"><Send size={15} /></button>
        </form>
      </div>
    </div>
  );
}
