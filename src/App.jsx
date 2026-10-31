import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Check,
  Plus,
  X,
  Send,
  Loader2,
  Sparkles,
  Terminal,
  Compass,
  Cpu,
  Layers,
  Globe,
  ShieldAlert,
  Activity
} from 'lucide-react';

// ============================================================================
// EDITABLE PORTFOLIO CONFIGURATION (100% PRESERVED + VISUAL METADATA)
// ============================================================================
const PORTFOLIO_DATA = {
  profile: {
    name: "Nayan Choraria",
    role: "BCA Artificial Intelligence Student",
    university: "Jain University, Bengaluru",
    location: "Bengaluru, India",
    coordinates: "12.9716° N, 77.5946° E",
    email: "nayanchoraria111@gmail.com",
    github: "https://github.com/nayan2452005",
    linkedin: "https://www.linkedin.com/in/nayan-choraria-026076266/",
    resumeUrl: "", // Optional: Add "/resume.pdf" when ready
    leadership: {
      role: "Past Joint Secretary",
      organization: "Marwari Yuva Manch",
      summary: "Led community initiatives, coordinated team operations, and managed event execution."
    },
    interests: [
      "Artificial Intelligence & Machine Learning",
      "Full-Stack Web Development",
      "AI-Powered Applications",
      "Data Analysis & Intelligent Systems",
      "Creative Technology & Interactive Web"
    ]
  },
  featuredProjects: [
    {
      id: "sri-balaji-distributors",
      index: "I",
      year: "2026",
      status: "Live Website",
      title: "Sri Balaji Distributors Website",
      category: "Full-Stack Web Development",
      architecture: "Client-Edge SPA • Component Design System",
      description:
        "A modern, responsive business website built for an auto-electrical spare parts wholesale distributor. Features a refined landing experience, brand marquee, and scalable component architecture.",
      tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Responsive Design"],
      github: "https://github.com/nayan2452005",
      live: "https://sri-balaji-distributors.onrender.com"
    },
    {
      id: "honeypot-scam-detection",
      index: "II",
      year: "2026",
      status: "Live API",
      title: "Honeypot Scam Detection",
      category: "AI & Backend Systems",
      architecture: "Agentic Decoy Engine • FastAPI Microservice",
      description:
        "An AI-assisted backend service designed to detect suspicious conversations and extract scam-related indicators using structured FastAPI endpoints and behavioral checks.",
      tech: ["Python", "FastAPI", "Swagger UI", "Postman", "REST API"],
      github: "https://github.com/nayan2452005",
      live: "https://agentic-honeypot-a41c.onrender.com/docs"
    },
    {
      id: "aqi-monitor-dashboard",
      index: "III",
      year: "2025",
      status: "Hardware & IoT",
      title: "AQI Monitor Dashboard",
      category: "IoT & Embedded Systems",
      architecture: "MQ135 Sensor Array • Serial Telemetry Loop",
      description:
        "An IoT-based air quality monitoring system built with an MQ135 gas sensor and Arduino microcontroller to measure gas levels in real time and trigger threshold buzzer alerts.",
      tech: ["Arduino IDE", "MQ135 Sensor", "C / C++", "Circuit Design", "Real-Time Alerts"],
      github: "https://github.com/nayan2452005",
      live: ""
    },
    {
      id: "sentiment-analysis-nlp",
      index: "IV",
      year: "2025",
      status: "Machine Learning",
      title: "Social Media Sentiment Analysis",
      category: "Machine Learning & NLP",
      architecture: "Lexical Tokenization • Sarcasm Classifier",
      description:
        "A natural language processing project focused on classifying social media sentiment and detecting sarcasm across unstructured text streams.",
      tech: ["Python", "Machine Learning", "NLP", "Sentiment Classification", "Data Analysis"],
      github: "https://github.com/nayan2452005",
      live: ""
    }
  ],
  additionalArchive: [
    {
      id: "live-web-portfolio",
      index: "V",
      year: "2026",
      status: "Live Website",
      title: "Personal Developer Portfolio",
      category: "Frontend Architecture",
      architecture: "WebGL Three.js Canvas • Bespoke Design System",
      description:
        "Interactive personal portfolio built with React, Vite, and custom 3D canvas rendering, optimized for smooth performance and deployed on Render.",
      tech: ["React.js", "TypeScript", "Vite", "Tailwind CSS", "Render"],
      github: "https://github.com/nayan2452005",
      live: "https://nayan-portfolio-rrb8.onrender.com"
    },
    {
      id: "ai-tally-analytics",
      index: "VI",
      year: "2026",
      status: "In Development",
      title: "AI Tally Business Analytics",
      category: "AI Financial Application",
      architecture: "Groq LLaMA Inference • Real-Time Ledger BI",
      description:
        "A Tally-style business analytics web app with Appwrite authentication, interactive Recharts dashboards (revenue, profit, GST, debtors), and Groq LLaMA insights.",
      tech: ["React", "TypeScript", "Vite", "Recharts", "Appwrite", "Groq API"],
      github: "https://github.com/nayan2452005",
      live: ""
    },
    {
      id: "reachinbox-scheduler",
      index: "VII",
      year: "2025",
      status: "Full-Stack",
      title: "ReachInbox – Email Scheduler",
      category: "Full-Stack Web Platform",
      architecture: "OAuth 2.0 Queue • PostgreSQL Persistence",
      description:
        "Full-stack email scheduling platform supporting Google OAuth login, sender management, automated job tracking, and PostgreSQL database integration.",
      tech: ["Next.js", "Node.js", "Express", "PostgreSQL", "Google OAuth", "REST API"],
      github: "https://github.com/nayan2452005",
      live: ""
    }
  ],
  skills: [
    {
      id: "ai-ml",
      code: "SYS.01",
      coords: { x: 190, y: 75 },
      category: "AI & Machine Learning",
      description: "Building intelligent workflows, NLP classification models, and LLM-powered applications.",
      items: [
        "Machine Learning",
        "Natural Language Processing",
        "Sentiment & Sarcasm Detection",
        "Groq API (LLaMA)",
        "AI Application Integration"
      ],
      connections: ["languages", "data-analysis", "backend"]
    },
    {
      id: "languages",
      code: "SYS.02",
      coords: { x: 90, y: 155 },
      category: "Programming Languages",
      description: "Core languages used across web applications, backend APIs, and microcontroller programming.",
      items: ["Python", "TypeScript", "JavaScript (ES6+)", "C / C++", "Java", "SQL"],
      connections: ["ai-ml", "frontend", "backend"]
    },
    {
      id: "frontend",
      code: "SYS.03",
      coords: { x: 85, y: 265 },
      category: "Frontend Development",
      description: "Creating responsive, accessible, and refined user interfaces with modern React tooling.",
      items: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Vite", "HTML5 & CSS3"],
      connections: ["languages", "backend", "tools"]
    },
    {
      id: "backend",
      code: "SYS.04",
      coords: { x: 205, y: 195 },
      category: "Backend Development",
      description: "Designing REST APIs, authentication flows, and scalable server-side logic.",
      items: ["FastAPI", "Node.js", "Express.js", "RESTful APIs", "Google OAuth 2.0", "Appwrite"],
      connections: ["languages", "databases", "ai-ml"]
    },
    {
      id: "databases",
      code: "SYS.05",
      coords: { x: 315, y: 250 },
      category: "Databases",
      description: "Relational schema modeling, data persistence, and cloud database integration.",
      items: ["PostgreSQL", "SQL Databases", "Appwrite Database", "Firebase"],
      connections: ["backend", "data-analysis"]
    },
    {
      id: "data-analysis",
      code: "SYS.06",
      coords: { x: 310, y: 125 },
      category: "Data Analysis & Visualization",
      description: "Turning financial metrics and sensor readings into clear, interactive visual dashboards.",
      items: ["Recharts", "KPI Dashboards", "IoT Sensor Data", "Forecasting Workflows", "Data Visualization"],
      connections: ["ai-ml", "databases"]
    },
    {
      id: "tools",
      code: "SYS.07",
      coords: { x: 195, y: 320 },
      category: "Development Tools",
      description: "Everyday workflow tools for version control, API testing, hardware setup, and deployment.",
      items: ["Git & GitHub", "Postman", "Swagger UI / OpenAPI", "Arduino IDE", "Render"],
      connections: ["frontend", "backend"]
    }
  ]
};

const D = PORTFOLIO_DATA;
const PR = D.profile;
const ALL = [...D.featuredProjects, ...D.additionalArchive];

// ============================================================================
// 3D BACKGROUND: CELESTIAL HOROLOGY ARMILLARY ASTROLABE
// ============================================================================
function CelestialAstrolabe({ sc, ms }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 11.5;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    el.appendChild(renderer.domElement);

    const astrolabe = new THREE.Group();
    scene.add(astrolabe);

    // Materials
    const brassMat = new THREE.MeshBasicMaterial({
      color: 0xd6b47c,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const fineGoldMat = new THREE.MeshBasicMaterial({
      color: 0xfaf6ee,
      wireframe: true,
      transparent: true,
      opacity: 0.11
    });
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xd6b47c,
      wireframe: true,
      transparent: true,
      opacity: 0.32
    });

    // Outer Meridian Gimbal Ring
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.018, 12, 120), brassMat);
    // Ecliptic Calibrated Gimbal Ring
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.85, 0.015, 10, 100), fineGoldMat);
    ring2.rotation.x = Math.PI / 3;
    // Equatorial Inner Ring
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.02, 12, 90), brassMat);
    ring3.rotation.y = Math.PI / 4;

    // Geodesic Horology Core
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.32, 1), coreMat);
    const innerCrystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.72, 0), fineGoldMat);

    // Degree Calibration Ticks around Outer Ring
    const tickGeo = new THREE.BufferGeometry();
    const tickPositions = [];
    for (let i = 0; i < 72; i++) {
      const angle = (i / 72) * Math.PI * 2;
      const rIn = i % 6 === 0 ? 3.58 : 3.65;
      const rOut = 3.76;
      tickPositions.push(
        Math.cos(angle) * rIn,
        Math.sin(angle) * rIn,
        0,
        Math.cos(angle) * rOut,
        Math.sin(angle) * rOut,
        0
      );
    }
    tickGeo.setAttribute('position', new THREE.Float32BufferAttribute(tickPositions, 3));
    const ticks = new THREE.LineSegments(
      tickGeo,
      new THREE.LineBasicMaterial({ color: 0xd6b47c, transparent: true, opacity: 0.35 })
    );

    // Polar Axis Needle
    const axisGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -4.4, 0),
      new THREE.Vector3(0, 4.4, 0)
    ]);
    const axisLine = new THREE.Line(
      axisGeo,
      new THREE.LineBasicMaterial({ color: 0xd6b47c, transparent: true, opacity: 0.2 })
    );

    astrolabe.add(ring1, ring2, ring3, core, innerCrystal, ticks, axisLine);

    // Ambient Celestial Dust Field
    const particleCount = 850;
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 36;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: 0xd6b47c,
        size: 0.032,
        transparent: true,
        opacity: 0.45
      })
    );
    scene.add(dust);

    let frameId;
    let time = 0;
    let smoothScroll = 0;
    let mx = 0;
    let my = 0;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      smoothScroll += (sc.current - smoothScroll) * 0.05;
      mx += (ms.current.x - mx) * 0.04;
      my += (ms.current.y - my) * 0.04;
      if (!reducedMotion) time += 0.0032;

      ring1.rotation.y = time * 0.5 + mx * 0.6 + smoothScroll * 2.2;
      ring1.rotation.x = my * 0.35 + smoothScroll * 0.8;

      ring2.rotation.x = Math.PI / 3 + time * 0.7 - my * 0.4;
      ring2.rotation.z = time * 0.4 + smoothScroll * 3.1;

      ring3.rotation.y = Math.PI / 4 - time * 0.85 + mx * 0.5;
      ring3.rotation.x = time * 0.35 + smoothScroll * 1.9;

      core.rotation.set(time * 0.6 + smoothScroll * 2.5, -time * 0.8 + mx * 0.5, 0);
      innerCrystal.rotation.set(-time * 1.1, time * 0.9, smoothScroll * 4);
      ticks.rotation.z = -time * 0.22 + smoothScroll * 1.5;

      const xOffset = window.innerWidth < 960 ? 0 : 3.3 - smoothScroll * 5.8;
      astrolabe.position.set(xOffset, -smoothScroll * 2.4, -smoothScroll * 3.2);
      astrolabe.rotation.z = 0.22 + mx * 0.12;

      dust.rotation.set(smoothScroll * 0.5, time * 0.1 + mx * 0.08, 0);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [sc, ms]);

  return <div ref={mountRef} aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none" />;
}

// ============================================================================
// MAGNETIC INTERACTION & LINE REVEAL HELPERS
// ============================================================================
function Mag({ as: Tag = 'a', className = '', children, cursorLabel = '', ...props }) {
  const ref = useRef(null);
  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.24;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.32;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor={cursorLabel}
      className={`mag-el ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

const RevealLine = ({ d = 0, children }) => (
  <span className="line-mask">
    <span style={{ '--d': `${d}s` }}>{children}</span>
  </span>
);

// ============================================================================
// BESPOKE ARCHITECTURAL SVG SCHEMATIC PER PROJECT
// ============================================================================
function ProjectBlueprint({ index }) {
  return (
    <div className="blueprint-box">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <radialGradient id={`glow-${index}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D6B47C" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#D6B47C" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="84" fill={`url(#glow-${index})`} />
        <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(214,180,124,0.22)" strokeDasharray="3 5" />
        <circle
          cx="100"
          cy="100"
          r="58"
          fill="none"
          stroke="rgba(214,180,124,0.45)"
          strokeWidth="0.9"
          className="spin-slow"
        />
        <circle
          cx="100"
          cy="100"
          r="36"
          fill="none"
          stroke="rgba(250,246,238,0.25)"
          strokeDasharray="18 8"
          className="spin-rev"
        />
        <line x1="12" y1="100" x2="188" y2="100" stroke="rgba(214,180,124,0.16)" strokeWidth="0.75" />
        <line x1="100" y1="12" x2="100" y2="188" stroke="rgba(214,180,124,0.16)" strokeWidth="0.75" />
        <polygon
          points="100,32 158,134 42,134"
          fill="none"
          stroke="rgba(214,180,124,0.4)"
          strokeWidth="0.9"
          className="spin-slow"
        />
        <circle cx="100" cy="100" r="4" fill="#D6B47C" />
        <text
          x="100"
          y="182"
          textAnchor="middle"
          fill="#9E9689"
          fontSize="7.5"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="2"
        >
          PLATE {index} // SPEC
        </text>
      </svg>
    </div>
  );
}

// ============================================================================
// EXPANDABLE ATELIER PROJECT PLATE
// ============================================================================
function ProjectRow({ p, i, open, setOpen }) {
  const isOpen = open === p.id;
  const isLive = Boolean(p.live);

  return (
    <article className={`proj-row ${isOpen ? 'is-open' : ''}`}>
      <button
        className="proj-head"
        onClick={() => setOpen(isOpen ? null : p.id)}
        aria-expanded={isOpen}
        data-cursor={isOpen ? 'CLOSE' : 'INSPECT'}
      >
        <div className="flex items-baseline gap-4 sm:gap-7">
          <span className="mono text-xs text-[#D6B47C]/80 w-7">
            {p.index || String(i + 1).padStart(2, '0')}
          </span>
          <span className="proj-title display-serif">{p.title}</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <span className="mono text-[11px] uppercase tracking-[0.16em] text-[#9E9689]">
            {p.category}
          </span>
          <span className={`status-pill ${isLive ? 'is-live' : ''}`}>
            <i className="status-dot" />
            {p.status}
          </span>
        </div>

        <span className="proj-toggle" aria-hidden="true">
          <Plus size={20} strokeWidth={1.25} />
        </span>
      </button>

      <div className="proj-drawer">
        <div className="proj-drawer-inner">
          <div className="proj-body">
            <ProjectBlueprint index={p.index || i + 1} />

            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`status-pill ${isLive ? 'is-live' : ''}`}>
                  <i className="status-dot" />
                  {p.status}
                </span>
                <span className="mono text-xs text-[#9E9689] border border-[color:var(--border)] px-3 py-1 rounded-full">
                  {p.architecture || p.category}
                </span>
                <span className="mono text-xs text-[#D6B47C] ml-auto">ARCHIVE // {p.year || '2026'}</span>
              </div>

              <p className="text-[#FAF6EE]/85 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                {p.description}
              </p>

              <div className="pt-1">
                <span className="mono text-[10px] uppercase tracking-[0.2em] text-[#9E9689] block mb-2.5">
                  System Stack & Instrumentation
                </span>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-3 border-t border-[color:var(--border)]">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="GITHUB"
                  className="action-link"
                >
                  <Github size={15} />
                  <span>Inspect Repository</span>
                  <ArrowUpRight size={14} />
                </a>

                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="LAUNCH"
                    className="action-link is-gold"
                  >
                    <Globe size={15} />
                    <span>Launch Live Deployment</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ============================================================================
// MAIN PORTFOLIO APPLICATION
// ============================================================================
export default function App() {
  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [hovState, setHovState] = useState('');
  const [more, setMore] = useState(false);
  const [skill, setSkill] = useState('ai-ml');
  const [open, setOpen] = useState(D.featuredProjects[0].id);

  // Digital Concierge State
  const [chat, setChat] = useState(false);
  const [honesty, setHonesty] = useState(90);
  const [humor, setHumor] = useState(75);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [localTime, setLocalTime] = useState('');
  const [msgs, setMsgs] = useState([
    {
      r: 'a',
      t: "Welcome to Nayan Choraria's digital atelier. Ask me about his deployed systems, AI research at Jain University, or full-stack architecture."
    }
  ]);

  const sc = useRef(0);
  const ms = useRef({ x: 0, y: 0 });
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const barRef = useRef(null);
  const endRef = useRef(null);

  // Live Bengaluru IST Telemetry Clock
  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(new Date());
        setLocalTime(`${formatted} IST`);
      } catch {
        setLocalTime('IST');
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Opening Horology Calibration Curtain
  useEffect(() => {
    let c = 0;
    const iv = setInterval(() => {
      c = Math.min(100, c + Math.ceil(Math.random() * 9));
      setCount(c);
      if (c >= 100) {
        clearInterval(iv);
        setTimeout(() => setReady(true), 360);
      }
    }, 42);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden';
  }, [ready]);

  // Pointer Reticle, Scroll Telemetry & Intersection Observers
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    let rafId;
    const raw = { x: -100, y: -100 };
    const smooth = { x: -100, y: -100 };

    const onMouseMove = (e) => {
      raw.x = e.clientX;
      raw.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }
      const interactive = e.target.closest?.('a, button, input, [data-cursor]');
      if (interactive) {
        setHovState(interactive.getAttribute('data-cursor') || 'OPEN');
      } else {
        setHovState('');
      }
      ms.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      };
      const rootStyle = document.documentElement.style;
      rootStyle.setProperty('--mx', `${e.clientX}px`);
      rootStyle.setProperty('--my', `${e.clientY}px`);
    };

    const tick = () => {
      smooth.x += (raw.x - smooth.x) * 0.16;
      smooth.y += (raw.y - smooth.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${smooth.x - 22}px, ${smooth.y - 22}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    if (finePointer) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      tick();
    }

    const onScroll = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      sc.current = Math.min(window.scrollY / maxScroll, 1);
      if (barRef.current) barRef.current.style.transform = `scaleX(${sc.current})`;
      setScrolled(window.scrollY > 48);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const sectionObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.28 }
    );
    document.querySelectorAll('section[id]').forEach((s) => sectionObs.observe(s));

    const revealObs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            revealObs.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    document.querySelectorAll('.reveal-block').forEach((el) => revealObs.observe(el));

    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setChat((v) => !v);
      } else if (e.key === 'Escape') {
        setChat(false);
        setMenu(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
      sectionObs.disconnect();
      revealObs.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chat) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, chat]);

  const copyEmail = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(PR.email);
    } else {
      const el = document.createElement('textarea');
      el.value = PR.email;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  // Local Deterministic Concierge Fallback
  const localConcierge = (q) => {
    const query = q.toLowerCase();
    if (/project|work|live|balaji|honeypot|aqi|sentiment/.test(query)) {
      return "Nayan's live deployments include the Sri Balaji Distributors web platform and the Honeypot Scam Detection API. His broader engineering archive features an IoT AQI Monitor, a Social Media Sentiment NLP model, AI Tally Analytics, and ReachInbox.";
    }
    if (/skill|stack|tech|language/.test(query)) {
      return "Nayan engineers across Python, TypeScript, JavaScript, and C/C++, pairing React, Next.js, and Tailwind CSS on the frontend with FastAPI, Node.js, PostgreSQL, Appwrite, and Groq LLaMA inference on the backend.";
    }
    if (/education|university|student|about|who|leadership/.test(query)) {
      return "Nayan Choraria is a BCA Artificial Intelligence student at Jain University in Bengaluru and Past Joint Secretary at Marwari Yuva Manch, specializing in applied AI and full-stack architecture.";
    }
    if (/contact|email|hire|reach/.test(query)) {
      return `You can reach Nayan directly at ${PR.email}, or connect via his GitHub and LinkedIn profiles linked in the dossier below.`;
    }
    return "Nayan Choraria is a BCA AI student at Jain University building intelligent software and full-stack systems. Ask about his live deployments, technical architecture, or how to initiate a collaboration.";
  };

  // Live Groq / Gemini / Proxy Handler
  const sendMessage = async (e, presetQuery) => {
    if (e) e.preventDefault();
    const q = (presetQuery ?? input).trim();
    if (!q || busy) return;

    setMsgs((m) => [...m, { r: 'u', t: q }]);
    if (!presetQuery) setInput('');
    setBusy(true);

    const appendReply = (t) => setMsgs((m) => [...m, { r: 'a', t }]);
    const sysPrompt = `You are the digital concierge on Nayan Choraria's portfolio website: polished, warm, and concise. Settings: Honesty ${honesty}%, Humor ${humor}%.
About Nayan: ${PR.role} at ${PR.university}. Past Joint Secretary at Marwari Yuva Manch.
Projects:
${ALL.map((p) => `- ${p.title}: ${p.description}${p.live ? ` (Live: ${p.live})` : ''}`).join('\n')}
Answer in 2 to 3 sentences. Do not invent experience or metrics.`;

    try {
      const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};
      const groq = env.VITE_GROQ_API_KEY || '';
      const proxy = env.VITE_AI_PROXY_URL || '';
      const gem = env.VITE_GEMINI_API_KEY || '';

      if (groq) {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${groq}` },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: sysPrompt },
              { role: 'user', content: q }
            ],
            temperature: 0.6,
            max_tokens: 220
          })
        });
        if (!res.ok) throw new Error('Groq failed');
        const data = await res.json();
        appendReply(data.choices?.[0]?.message?.content?.trim() || localConcierge(q));
        return;
      }

      if (proxy || gem) {
        const res = await fetch(
          proxy ||
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${gem}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: q }] }],
              systemInstruction: { parts: [{ text: sysPrompt }] }
            })
          }
        );
        if (!res.ok) throw new Error('API failed');
        const data = await res.json();
        appendReply(data.candidates?.[0]?.content?.parts?.[0]?.text || localConcierge(q));
        return;
      }

      await new Promise((r) => setTimeout(r, 450));
      appendReply(localConcierge(q));
    } catch {
      appendReply(localConcierge(q));
    } finally {
      setBusy(false);
    }
  };

  const navItems = [
    { id: 'home', num: '00', label: 'Index' },
    { id: 'about', num: '01', label: 'Dossier' },
    { id: 'projects', num: '02', label: 'Selected Works' },
    { id: 'skills', num: '03', label: 'Architecture' },
    { id: 'contact', num: '04', label: 'Initiate' }
  ];

  const currentSkill = D.skills.find((s) => s.id === skill) || D.skills[0];
  const marqueeWords = [
    'Artificial Intelligence',
    'FastAPI Microservices',
    'React & TypeScript',
    'Natural Language Processing',
    'Next.js Architecture',
    'PostgreSQL',
    'Groq LLaMA Inference',
    'Embedded IoT Telemetry',
    'Full-Stack Engineering'
  ];

  return (
    <div className={`atelier-app ${ready ? 'is-ready' : ''}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

        :root {
          --bg: #060605;
          --surface: #0D0C0A;
          --elevated: #151310;
          --ink: #FAF6EE;
          --muted: #9E9689;
          --gold: #D6B47C;
          --gold-soft: rgba(214, 180, 124, 0.14);
          --border: rgba(250, 246, 238, 0.09);
          --border-gold: rgba(214, 180, 124, 0.38);
          --ease: cubic-bezier(0.16, 1, 0.3, 1);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; background: var(--bg); }
        body {
          margin: 0;
          background: var(--bg);
          color: var(--ink);
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        ::selection { background: var(--gold); color: var(--bg); }

        @media (pointer: fine) and (min-width: 768px) {
          * { cursor: none !important; }
        }

        .display-serif {
          font-family: 'Instrument Serif', Georgia, serif;
          font-weight: 400;
          letter-spacing: -0.02em;
        }
        .mono {
          font-family: 'JetBrains Mono', monospace;
        }

        /* Subtle Architectural Grid & Film Grain */
        .arch-grid {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background-size: 96px 96px;
          background-image:
            linear-gradient(to right, rgba(250, 246, 238, 0.024) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(250, 246, 238, 0.024) 1px, transparent 1px);
          mask-image: radial-gradient(circle at 50% 40%, black 25%, transparent 85%);
        }
        .film-grain {
          position: fixed;
          inset: 0;
          z-index: 90;
          pointer-events: none;
          opacity: 0.055;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .pointer-spotlight {
          position: fixed;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: radial-gradient(
            680px circle at var(--mx, 72%) var(--my, 28%),
            rgba(214, 180, 124, 0.085),
            transparent 62%
          );
        }

        /* Top Scroll Progress Telemetry Bar */
        .telemetry-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          z-index: 120;
          background: linear-gradient(90deg, transparent, var(--gold), #FAF6EE);
          transform: scaleX(0);
          transform-origin: left;
        }

        /* Horology Calibration Loader */
        .horology-loader {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: #040403;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          transition: transform 1.25s cubic-bezier(0.76, 0, 0.24, 1), visibility 0s 1.25s;
        }
        .is-ready .horology-loader {
          transform: translateY(-102%);
          visibility: hidden;
        }
        .loader-dial {
          position: relative;
          width: 210px;
          height: 210px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          border: 1px solid rgba(214, 180, 124, 0.22);
        }
        .loader-dial::before {
          content: '';
          position: absolute;
          inset: 12px;
          border-radius: 50%;
          border: 1px dashed rgba(250, 246, 238, 0.14);
          animation: orbitSpin 18s linear infinite;
        }

        /* Bespoke Reticle Cursor */
        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
          z-index: 9999;
          pointer-events: none;
        }
        .cursor-reticle {
          position: fixed;
          top: 0;
          left: 0;
          width: 44px;
          height: 44px;
          z-index: 9998;
          pointer-events: none;
          display: grid;
          place-items: center;
        }
        .cursor-reticle-ring {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid rgba(214, 180, 124, 0.42);
          transition: transform 0.45s var(--ease), background 0.35s, border-color 0.35s;
          position: relative;
        }
        .cursor-reticle.is-active .cursor-reticle-ring {
          transform: scale(1.55);
          background: rgba(214, 180, 124, 0.12);
          border-color: var(--gold);
        }
        .cursor-tag {
          position: absolute;
          top: 112%;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.18em;
          color: var(--gold);
          white-space: nowrap;
          opacity: 0;
          transform: translateY(-4px);
          transition: all 0.3s var(--ease);
        }
        .cursor-reticle.is-active .cursor-tag {
          opacity: 1;
          transform: translateY(0);
        }

        /* Navigation Header */
        .atelier-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 80;
          padding: 1.4rem 2.2rem;
          transition: all 0.55s var(--ease);
        }
        .atelier-nav.is-scrolled {
          padding: 0.85rem 2.2rem;
          background: rgba(6, 6, 5, 0.78);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
        }
        .crest-badge {
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 50%;
          border: 1px solid var(--border-gold);
          display: grid;
          place-items: center;
          position: relative;
          color: var(--ink);
          transition: all 0.45s var(--ease);
        }
        .crest-badge:hover {
          background: var(--gold);
          color: var(--bg);
          box-shadow: 0 0 28px rgba(214, 180, 124, 0.35);
        }
        .nav-item {
          display: inline-flex;
          align-items: baseline;
          gap: 0.38rem;
          font-size: 0.82rem;
          color: var(--muted);
          padding: 0.35rem 0;
          position: relative;
          transition: color 0.35s;
        }
        .nav-item::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.55s var(--ease);
        }
        .nav-item:hover, .nav-item.is-on {
          color: var(--ink);
        }
        .nav-item:hover::after, .nav-item.is-on::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        /* Mobile Fullscreen Menu */
        .mobile-vault {
          position: fixed;
          inset: 0;
          z-index: 75;
          background: rgba(6, 6, 5, 0.97);
          backdrop-filter: blur(24px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2.5rem;
          clip-path: circle(0% at calc(100% - 2.5rem) 2.5rem);
          transition: clip-path 0.85s var(--ease);
        }
        .mobile-vault.is-open {
          clip-path: circle(150% at calc(100% - 2.5rem) 2.5rem);
        }

        /* Line Mask & Scroll Reveal Animations */
        .line-mask {
          display: block;
          overflow: hidden;
          padding: 0 0.04em 0.1em;
          margin-bottom: -0.1em;
        }
        .line-mask > span {
          display: block;
          transform: translateY(112%);
          transition: transform 1.35s var(--ease) var(--d, 0s);
        }
        .is-ready .hero-sec .line-mask > span,
        .in-view .line-mask > span {
          transform: none;
        }
        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1.15s var(--ease) var(--d, 0s), transform 1.15s var(--ease) var(--d, 0s);
        }
        .is-ready .hero-sec .fade-up {
          opacity: 1;
          transform: none;
        }
        .reveal-block {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1.15s var(--ease) var(--d, 0s), transform 1.15s var(--ease) var(--d, 0s);
        }
        .reveal-block.in-view {
          opacity: 1;
          transform: none;
        }

        /* Typography & Buttons */
        .hero-h1 {
          font-size: clamp(3.3rem, 9.2vw, 8.8rem);
          line-height: 0.94;
        }
        .sec-h2 {
          font-size: clamp(2.5rem, 5.8vw, 5.1rem);
          line-height: 0.98;
        }
        .italic-gold {
          font-style: italic;
          color: var(--gold);
        }
        .mag-el {
          display: inline-flex;
          transition: transform 0.45s var(--ease);
        }
        .atelier-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.85rem;
          border-radius: 999px;
          font-size: 0.76rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: 1px solid rgba(250, 246, 238, 0.22);
          color: var(--ink);
          background: rgba(13, 12, 10, 0.55);
          backdrop-filter: blur(12px);
          position: relative;
          overflow: hidden;
          isolation: isolate;
          transition: color 0.45s, border-color 0.45s, box-shadow 0.45s;
        }
        .atelier-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--ink);
          transform: translateY(102%);
          transition: transform 0.55s var(--ease);
          z-index: -1;
        }
        .atelier-btn:hover::before {
          transform: none;
        }
        .atelier-btn:hover {
          color: var(--bg);
          border-color: var(--ink);
        }
        .atelier-btn.is-solid {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--bg);
          font-weight: 600;
        }
        .atelier-btn.is-solid:hover {
          box-shadow: 0 0 36px rgba(214, 180, 124, 0.35);
        }

        /* Sections & Containers */
        .atelier-sec {
          position: relative;
          z-index: 10;
          padding: 8.5rem 1.5rem;
          border-top: 1px solid var(--border);
        }
        .atelier-wrap {
          max-width: 1220px;
          margin: 0 auto;
        }

        /* Marquee Ribbon */
        .marquee-band {
          position: relative;
          z-index: 10;
          overflow: hidden;
          border-block: 1px solid var(--border);
          padding: 1.35rem 0;
          background: rgba(10, 9, 8, 0.78);
          backdrop-filter: blur(10px);
        }
        .marquee-track {
          display: flex;
          gap: 3.2rem;
          width: max-content;
          align-items: center;
          animation: marqueeScroll 44s linear infinite;
        }
        @keyframes marqueeScroll {
          to { transform: translateX(-50%); }
        }

        /* Bento Glass Panels */
        .atelier-card {
          background: linear-gradient(155deg, rgba(250, 246, 238, 0.045), rgba(250, 246, 238, 0.01));
          border: 1px solid var(--border);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
          transition: border-color 0.45s, transform 0.45s var(--ease);
        }
        .atelier-card:hover {
          border-color: var(--border-gold);
        }

        /* Project Rows & Blueprints */
        .proj-row {
          border-bottom: 1px solid var(--border);
          transition: background 0.45s;
        }
        .proj-row.is-open {
          background: linear-gradient(90deg, rgba(214, 180, 124, 0.04), transparent 70%);
        }
        .proj-head {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr auto 2.75rem;
          align-items: center;
          gap: 1.5rem;
          padding: 2.1rem 0.5rem;
          text-align: left;
          background: transparent;
          border: 0;
          color: var(--ink);
          transition: padding 0.6s var(--ease);
        }
        .proj-head:hover {
          padding-left: 1.25rem;
        }
        .proj-title {
          font-size: clamp(1.85rem, 3.8vw, 3.25rem);
          line-height: 1.05;
          transition: color 0.45s;
        }
        .proj-row.is-open .proj-title,
        .proj-head:hover .proj-title {
          color: var(--gold);
          font-style: italic;
        }
        .proj-toggle {
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 50%;
          border: 1px solid var(--border);
          display: grid;
          place-items: center;
          color: var(--gold);
          transition: transform 0.7s var(--ease), border-color 0.4s, background 0.4s;
        }
        .proj-row.is-open .proj-toggle {
          transform: rotate(135deg);
          border-color: var(--gold);
          background: rgba(214, 180, 124, 0.12);
        }
        .proj-drawer {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.8s var(--ease);
        }
        .proj-row.is-open .proj-drawer {
          grid-template-rows: 1fr;
        }
        .proj-drawer-inner {
          overflow: hidden;
          min-height: 0;
          opacity: 0;
          transition: opacity 0.6s;
        }
        .proj-row.is-open .proj-drawer-inner {
          opacity: 1;
          transition-delay: 0.12s;
        }
        .proj-body {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 2.75rem;
          padding: 0.5rem 0.75rem 3rem 2.75rem;
          align-items: center;
        }
        .blueprint-box {
          width: 190px;
          height: 190px;
          border-radius: 18px;
          border: 1px solid var(--border-gold);
          background: radial-gradient(circle at center, rgba(214, 180, 124, 0.08), rgba(6, 6, 5, 0.9));
          padding: 0.65rem;
        }
        .spin-slow {
          transform-origin: 100px 100px;
          animation: orbitSpin 26s linear infinite;
        }
        .spin-rev {
          transform-origin: 100px 100px;
          animation: orbitSpin 18s linear infinite reverse;
        }
        @keyframes orbitSpin {
          to { transform: rotate(360deg); }
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.3rem 0.8rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          color: var(--muted);
        }
        .status-pill.is-live {
          color: var(--gold);
          border-color: var(--border-gold);
          background: rgba(214, 180, 124, 0.08);
        }
        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
        }
        .status-pill.is-live .status-dot {
          box-shadow: 0 0 8px var(--gold);
        }

        .tech-chip {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.73rem;
          padding: 0.38rem 0.85rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          color: var(--ink);
          background: rgba(250, 246, 238, 0.03);
          transition: all 0.35s;
        }
        .tech-chip:hover {
          border-color: var(--gold);
          color: var(--gold);
          transform: translateY(-1px);
        }
        .action-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.35s;
        }
        .action-link:hover { color: var(--ink); }
        .action-link.is-gold { color: var(--gold); }

        /* Skills & Constellation Matrix */
        .skill-tab {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 0.5rem;
          border: 0;
          border-bottom: 1px solid var(--border);
          background: transparent;
          color: var(--muted);
          text-align: left;
          transition: all 0.5s var(--ease);
        }
        .skill-tab:hover, .skill-tab.is-active {
          color: var(--ink);
          padding-left: 1.15rem;
        }
        .skill-tab.is-active .skill-name {
          color: var(--gold);
          font-style: italic;
        }

        /* Concierge Floating Terminal */
        .concierge-fab {
          position: fixed;
          right: 1.5rem;
          bottom: 1.5rem;
          z-index: 95;
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.85rem 1.35rem;
          border-radius: 999px;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ink);
          background: rgba(13, 12, 10, 0.88);
          border: 1px solid var(--border-gold);
          backdrop-filter: blur(18px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.65);
          transition: all 0.45s var(--ease);
        }
        .concierge-fab:hover {
          background: var(--gold);
          color: var(--bg);
        }
        .concierge-modal {
          position: fixed;
          right: 1.5rem;
          bottom: 5.25rem;
          width: min(27rem, calc(100vw - 2rem));
          z-index: 95;
          background: rgba(12, 11, 9, 0.95);
          border: 1px solid var(--border-gold);
          border-radius: 22px;
          backdrop-filter: blur(24px);
          box-shadow: 0 40px 100px rgba(0, 0, 0, 0.85);
          transform-origin: bottom right;
          transform: translateY(20px) scale(0.95);
          opacity: 0;
          visibility: hidden;
          transition: transform 0.65s var(--ease), opacity 0.45s, visibility 0s 0.65s;
        }
        .concierge-modal.is-open {
          transform: none;
          opacity: 1;
          visibility: visible;
          transition-delay: 0s;
        }
        .chat-bubble {
          padding: 0.8rem 1rem;
          border-radius: 14px;
          font-size: 0.84rem;
          line-height: 1.6;
          max-width: 88%;
        }
        .chat-bubble.a {
          background: rgba(250, 246, 238, 0.045);
          border: 1px solid var(--border);
          color: var(--ink);
        }
        .chat-bubble.u {
          background: var(--gold);
          color: var(--bg);
          margin-left: auto;
          font-weight: 500;
        }
        input[type=range] {
          accent-color: var(--gold);
          width: 100%;
          height: 3px;
        }

        @media (max-width: 768px) {
          .proj-head { grid-template-columns: 1fr 2.5rem; }
          .proj-body { grid-template-columns: 1fr; padding: 0.5rem 0.5rem 2.25rem; gap: 1.5rem; }
          .blueprint-box { width: 120px; height: 120px; }
          .atelier-sec { padding: 5.5rem 1.25rem; }
          .atelier-nav, .atelier-nav.is-scrolled { padding-inline: 1.25rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
          .line-mask > span, .reveal-block, .fade-up {
            transform: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>

      {/* Ambient Visual Layers */}
      <div className="arch-grid" aria-hidden="true" />
      <div className="film-grain" aria-hidden="true" />
      <div className="pointer-spotlight" aria-hidden="true" />
      <div ref={barRef} className="telemetry-bar" aria-hidden="true" />
      <CelestialAstrolabe sc={sc} ms={ms} />

      {/* Opening Calibration Curtain */}
      <div className="horology-loader" aria-hidden={ready}>
        <div className="loader-dial">
          <div className="text-center">
            <span className="mono text-[10px] tracking-[0.25em] uppercase text-[#9E9689] block mb-1">
              Calibrating
            </span>
            <span className="display-serif text-6xl text-[#FAF6EE] tabular-nums">
              {String(count).padStart(2, '0')}
            </span>
            <span className="mono text-[10px] text-[#D6B47C] block mt-1">AST.2026 // NC</span>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="mono text-xs uppercase tracking-[0.22em] text-[#FAF6EE]">{PR.name}</p>
          <p className="mono text-[11px] text-[#9E9689] mt-1">{PR.coordinates}</p>
        </div>
      </div>

      {/* Custom Precision Reticle Cursor */}
      <div
        ref={ringRef}
        className={`cursor-reticle hidden md:grid ${hovState ? 'is-active' : ''}`}
        aria-hidden="true"
      >
        <div className="cursor-reticle-ring" />
        <span className="cursor-tag">{hovState}</span>
      </div>
      <div ref={dotRef} className="cursor-dot hidden md:block" aria-hidden="true" />

      {/* Top Architectural Navigation */}
      <header className={`atelier-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="atelier-wrap flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#home" className="crest-badge display-serif text-xl" aria-label="Home" data-cursor="HOME">
              NC
            </a>
            <div className="hidden sm:block">
              <span className="mono text-[11px] uppercase tracking-[0.16em] text-[#FAF6EE] block">
                {PR.name}
              </span>
              <span className="mono text-[10px] text-[#9E9689] flex items-center gap-2">
                <span>{PR.location}</span>
                {localTime && (
                  <>
                    <span className="text-[#D6B47C]">•</span>
                    <span className="text-[#D6B47C]">{localTime}</span>
                  </>
                )}
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary Navigation">
            {navItems.slice(1).map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-cursor={item.label.toUpperCase()}
                className={`nav-item ${active === item.id ? 'is-on' : ''}`}
              >
                <span className="mono text-[10px] text-[#D6B47C]">{item.num}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setChat(true)}
              data-cursor="CMD+K"
              className="hidden sm:inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[color:var(--border)] bg-[#0D0C0A]/80 hover:border-[#D6B47C] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D6B47C] animate-pulse" />
              <span className="mono text-[11px] text-[#FAF6EE]">Concierge</span>
              <kbd className="mono text-[10px] text-[#9E9689] border border-[color:var(--border)] px-1.5 py-0.5 rounded">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setMenu(!menu)}
              className="lg:hidden mono text-xs uppercase tracking-[0.18em] px-3.5 py-2 rounded-full border border-[color:var(--border)] text-[#FAF6EE]"
              style={{ zIndex: 85, position: 'relative' }}
              aria-expanded={menu}
            >
              {menu ? <X size={18} /> : 'Index'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-vault lg:hidden ${menu ? 'is-open' : ''}`}>
        <div className="space-y-4">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenu(false)}
              className="block display-serif text-5xl text-[#FAF6EE] hover:text-[#D6B47C] transition-colors"
            >
              <span className="mono text-xs text-[#D6B47C] mr-4">{item.num}</span>
              {item.label}
            </a>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-[color:var(--border)] mono text-xs text-[#9E9689]">
          <p>{PR.email}</p>
          <p className="mt-1">{PR.university}</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main>
        {/* ===================================================================
            00 // HERO SECTION
        =================================================================== */}
        <section
          id="home"
          className="hero-sec relative z-10 min-h-screen flex flex-col justify-end pt-36 pb-12 px-6"
        >
          <div className="atelier-wrap w-full">
            <div className="fade-up flex flex-wrap items-center gap-3 mb-7" style={{ '--d': '0.75s' }}>
              <span className="status-pill is-live">
                <i className="status-dot" />
                Available for Select Engineering Roles & Projects
              </span>
              <span className="mono text-xs text-[#9E9689]">
                // {PR.role} • {PR.university}
              </span>
            </div>

            <h1 className="hero-h1 display-serif">
              <RevealLine d={0.12}>Intelligent software,</RevealLine>
              <span className="italic-gold">
                <RevealLine d={0.26}>architected with</RevealLine>
              </span>
              <RevealLine d={0.4}>horological precision.</RevealLine>
            </h1>

            <div className="grid lg:grid-cols-12 gap-8 items-end mt-10">
              <p
                className="fade-up lg:col-span-6 text-[#9E9689] text-base sm:text-lg leading-relaxed font-light"
                style={{ '--d': '0.95s' }}
              >
                I am <strong className="text-[#FAF6EE] font-medium">{PR.name}</strong>—designing and deploying
                full-stack web platforms, agentic AI microservices, and sensor-driven hardware systems with
                exacting visual and architectural clarity.
              </p>

              <div
                className="fade-up lg:col-span-6 flex flex-wrap lg:justify-end items-center gap-4"
                style={{ '--d': '1.1s' }}
              >
                <Mag href="#projects" cursorLabel="EXPLORE" className="atelier-btn is-solid">
                  <span>Inspect Selected Works</span>
                  <ArrowUpRight size={16} />
                </Mag>
                <Mag href="#contact" cursorLabel="CONNECT" className="atelier-btn">
                  <Mail size={15} />
                  <span>Initiate Dialogue</span>
                </Mag>
              </div>
            </div>

            {/* Bottom Hero Telemetry Bar */}
            <div
              className="fade-up grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-6 border-t border-[color:var(--border)]"
              style={{ '--d': '1.25s' }}
            >
              <div>
                <span className="mono text-[10px] uppercase tracking-[0.2em] text-[#9E9689] block">
                  01 / Base Station
                </span>
                <span className="text-sm text-[#FAF6EE] mt-1 block">{PR.location}</span>
              </div>
              <div>
                <span className="mono text-[10px] uppercase tracking-[0.2em] text-[#9E9689] block">
                  02 / Primary Focus
                </span>
                <span className="text-sm text-[#FAF6EE] mt-1 block">Applied AI & Full-Stack</span>
              </div>
              <div>
                <span className="mono text-[10px] uppercase tracking-[0.2em] text-[#9E9689] block">
                  03 / Academic Institution
                </span>
                <span className="text-sm text-[#FAF6EE] mt-1 block">{PR.university}</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="mono text-[10px] uppercase tracking-[0.2em] text-[#9E9689] block">
                    04 / Production Status
                  </span>
                  <span className="text-sm text-[#D6B47C] mt-1 block">
                    {ALL.filter((p) => p.live).length} Live Deployments
                  </span>
                </div>
                <Compass size={22} className="text-[#D6B47C]/70 hidden sm:block animate-spin" style={{ animationDuration: '16s' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            CALIBRATED MARQUEE RIBBON
        =================================================================== */}
        <div className="marquee-band" aria-hidden="true">
          <div className="marquee-track display-serif">
            {[...marqueeWords, ...marqueeWords].map((word, idx) => (
              <React.Fragment key={idx}>
                <span className="text-3xl sm:text-4xl italic text-[#FAF6EE]/65 whitespace-nowrap">
                  {word}
                </span>
                <span className="mono text-xs text-[#D6B47C] tracking-[0.2em]">✦</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ===================================================================
            01 // ARCHITECTURAL DOSSIER (ABOUT)
        =================================================================== */}
        <section id="about" className="atelier-sec">
          <div className="atelier-wrap">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 reveal-block">
              <div>
                <span className="mono text-xs uppercase tracking-[0.22em] text-[#D6B47C] block mb-3">
                  01 // Monograph & Dossier
                </span>
                <h2 className="sec-h2 display-serif">
                  <RevealLine>Every system begins with</RevealLine>
                  <span className="italic-gold">
                    <RevealLine d={0.14}>intentional discipline.</RevealLine>
                  </span>
                </h2>
              </div>
              <span className="mono text-xs text-[#9E9689] mt-4 md:mt-0">
                SPECIFICATION SHEET // REV 2026.4
              </span>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left Narrative Column */}
              <div className="lg:col-span-7 space-y-6 reveal-block">
                <div className="atelier-card p-8 sm:p-10">
                  <span className="mono text-[11px] uppercase tracking-[0.18em] text-[#D6B47C] block mb-4">
                    Engineering Philosophy
                  </span>
                  <p className="display-serif text-2xl sm:text-3xl leading-snug text-[#FAF6EE] mb-6">
                    I’m {PR.name}, a {PR.role} at {PR.university}, focused on bridging machine intelligence
                    with resilient, production-grade software.
                  </p>
                  <p className="text-[#9E9689] leading-relaxed text-base font-light">
                    Whether architecting FastAPI decoy endpoints for real-time scam detection, wiring MQ135
                    gas telemetry sensors to microcontrollers, or delivering high-craft commercial web
                    platforms, I treat every layer of the stack as an exercise in clarity, speed, and
                    reliability.
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-[color:var(--border)]">
                    {[
                      [String(ALL.length).padStart(2, '0'), 'Engineered Systems'],
                      [String(ALL.filter((p) => p.live).length).padStart(2, '0'), 'Live Cloud Nodes'],
                      [String(D.skills.length).padStart(2, '0'), 'Core Disciplines']
                    ].map(([val, label]) => (
                      <div key={label}>
                        <span className="display-serif text-4xl sm:text-5xl text-[#D6B47C] block leading-none">
                          {val}
                        </span>
                        <span className="mono text-[11px] text-[#9E9689] mt-2 block uppercase tracking-wider">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education & Leadership Dual Cards */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="atelier-card p-7">
                    <div className="flex items-center justify-between mb-4">
                      <span className="mono text-[10px] uppercase tracking-[0.2em] text-[#D6B47C]">
                        Academic Foundation
                      </span>
                      <Cpu size={16} className="text-[#D6B47C]" />
                    </div>
                    <h3 className="display-serif text-2xl text-[#FAF6EE]">BCA, Artificial Intelligence</h3>
                    <p className="text-sm text-[#9E9689] mt-1">{PR.university}</p>
                  </div>

                  <div className="atelier-card p-7">
                    <div className="flex items-center justify-between mb-4">
                      <span className="mono text-[10px] uppercase tracking-[0.2em] text-[#D6B47C]">
                        Executive Leadership
                      </span>
                      <Activity size={16} className="text-[#D6B47C]" />
                    </div>
                    <h3 className="display-serif text-2xl text-[#FAF6EE]">
                      {PR.leadership.role} — {PR.leadership.organization}
                    </h3>
                    <p className="text-sm text-[#9E9689] mt-2 leading-relaxed">{PR.leadership.summary}</p>
                  </div>
                </div>
              </div>

              {/* Right Areas of Research & Focus */}
              <div className="lg:col-span-5 reveal-block" style={{ '--d': '0.15s' }}>
                <div className="atelier-card p-8 sm:p-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-[color:var(--border)]">
                      <span className="mono text-xs uppercase tracking-[0.18em] text-[#D6B47C]">
                        Core Research Vectors
                      </span>
                      <Layers size={16} className="text-[#D6B47C]" />
                    </div>

                    <div className="divide-y divide-[color:var(--border)]">
                      {PR.interests.map((interest, idx) => (
                        <div
                          key={interest}
                          className="py-4 flex items-center justify-between group hover:pl-2 transition-all"
                        >
                          <span className="text-[#FAF6EE] group-hover:text-[#D6B47C] transition-colors">
                            {interest}
                          </span>
                          <span className="mono text-xs text-[#9E9689]">0{idx + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-[color:var(--border)] flex items-center justify-between">
                    <div>
                      <span className="mono text-[10px] uppercase tracking-[0.2em] text-[#9E9689] block">
                        Direct Channel
                      </span>
                      <span className="mono text-xs text-[#FAF6EE]">{PR.email}</span>
                    </div>
                    <a
                      href="#contact"
                      data-cursor="CONTACT"
                      className="mono text-xs uppercase tracking-wider text-[#D6B47C] hover:underline"
                    >
                      Inquire →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            02 // SELECTED WORKS & EXHIBITION ARCHIVE
        =================================================================== */}
        <section id="projects" className="atelier-sec">
          <div className="atelier-wrap">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 reveal-block">
              <div>
                <span className="mono text-xs uppercase tracking-[0.22em] text-[#D6B47C] block mb-3">
                  02 // Curated Exhibition
                </span>
                <h2 className="sec-h2 display-serif">
                  <RevealLine>Selected engineering</RevealLine>
                  <span className="italic-gold">
                    <RevealLine d={0.12}>plates & deployments.</RevealLine>
                  </span>
                </h2>
              </div>
              <p className="text-[#9E9689] text-sm max-w-sm leading-relaxed">
                Live production deployments lead the index, followed by embedded IoT hardware, NLP models, and
                full-stack platforms. Click any plate to inspect its blueprint.
              </p>
            </div>

            <div className="border-t border-[color:var(--border)] reveal-block">
              {D.featuredProjects.map((p, i) => (
                <ProjectRow key={p.id} p={p} i={i} open={open} setOpen={setOpen} />
              ))}

              {more &&
                D.additionalArchive.map((p, i) => (
                  <ProjectRow key={p.id} p={p} i={i + 4} open={open} setOpen={setOpen} />
                ))}
            </div>

            <div className="mt-12 text-center reveal-block">
              <Mag
                as="button"
                onClick={() => setMore((v) => !v)}
                cursorLabel={more ? 'COLLAPSE' : 'EXPAND'}
                className="atelier-btn"
              >
                <Plus
                  size={15}
                  style={{
                    transition: 'transform 0.5s',
                    transform: more ? 'rotate(45deg)' : 'none'
                  }}
                />
                <span>
                  {more
                    ? 'Collapse Extended Archive'
                    : `Unseal Extended Archive (${D.additionalArchive.length} More Works)`}
                </span>
              </Mag>
            </div>
          </div>
        </section>

        {/* ===================================================================
            03 // INTERACTIVE NEURAL CONSTELLATION & SKILLS
        =================================================================== */}
        <section id="skills" className="atelier-sec">
          <div className="atelier-wrap">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 reveal-block">
              <div>
                <span className="mono text-xs uppercase tracking-[0.22em] text-[#D6B47C] block mb-3">
                  03 // System Topology
                </span>
                <h2 className="sec-h2 display-serif">
                  <RevealLine>Disciplines &</RevealLine>
                  <span className="italic-gold">
                    <RevealLine d={0.12}>interconnected stack.</RevealLine>
                  </span>
                </h2>
              </div>
              <p className="text-[#9E9689] text-sm max-w-sm">
                Select a discipline from the index or click any node on the neural schematic to inspect its
                connected technologies.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-10 items-start reveal-block">
              {/* Left Column: Discipline Selector List */}
              <div className="lg:col-span-5 border-t border-[color:var(--border)]">
                {D.skills.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSkill(s.id)}
                    onMouseEnter={() => setSkill(s.id)}
                    data-cursor="SELECT"
                    className={`skill-tab ${skill === s.id ? 'is-active' : ''}`}
                  >
                    <div className="flex items-baseline gap-3.5">
                      <span className="mono text-[11px] text-[#D6B47C]">{s.code}</span>
                      <span className="skill-name display-serif text-2xl sm:text-3xl">{s.category}</span>
                    </div>
                    <span className="mono text-xs text-[#9E9689]">{s.items.length} units</span>
                  </button>
                ))}
              </div>

              {/* Right Column: Live Interactive Node Graph + Specification Card */}
              <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-6">
                <div className="atelier-card p-7 sm:p-9">
                  {/* Top Constellation SVG Map */}
                  <div className="mb-7 pb-6 border-b border-[color:var(--border)]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="mono text-[10px] uppercase tracking-[0.2em] text-[#D6B47C]">
                        Interactive Architecture Topology
                      </span>
                      <span className="mono text-[11px] text-[#9E9689]">
                        ACTIVE NODE // {currentSkill.code}
                      </span>
                    </div>

                    <svg
                      viewBox="0 0 400 370"
                      className="w-full h-56 sm:h-64 rounded-xl bg-[#060605]/70 border border-[color:var(--border)]"
                    >
                      {/* Connection Edges */}
                      {D.skills.map((source) =>
                        source.connections.map((targetId) => {
                          const target = D.skills.find((k) => k.id === targetId);
                          if (!target) return null;
                          const isHighlighted = source.id === skill || target.id === skill;
                          return (
                            <line
                              key={`${source.id}-${target.id}`}
                              x1={source.coords.x}
                              y1={source.coords.y}
                              x2={target.coords.x}
                              y2={target.coords.y}
                              stroke={isHighlighted ? '#D6B47C' : 'rgba(250,246,238,0.12)'}
                              strokeWidth={isHighlighted ? '1.4' : '0.7'}
                              strokeDasharray={isHighlighted ? 'none' : '3 4'}
                            />
                          );
                        })
                      )}

                      {/* Skill Nodes */}
                      {D.skills.map((node) => {
                        const isSelected = node.id === skill;
                        const isLinked = currentSkill.connections.includes(node.id);
                        return (
                          <g
                            key={node.id}
                            onClick={() => setSkill(node.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            {isSelected && (
                              <circle
                                cx={node.coords.x}
                                cy={node.coords.y}
                                r="18"
                                fill="rgba(214,180,124,0.18)"
                              />
                            )}
                            <circle
                              cx={node.coords.x}
                              cy={node.coords.y}
                              r={isSelected ? '7' : isLinked ? '5.5' : '4'}
                              fill={isSelected ? '#D6B47C' : isLinked ? '#FAF6EE' : '#5A554C'}
                              stroke="#060605"
                              strokeWidth="2"
                            />
                            <text
                              x={node.coords.x}
                              y={node.coords.y - 12}
                              textAnchor="middle"
                              fill={isSelected ? '#D6B47C' : '#FAF6EE'}
                              fontSize="9"
                              fontFamily="JetBrains Mono, monospace"
                            >
                              {node.category.split(' ')[0]}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Active Skill Details */}
                  <div key={currentSkill.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                      <h3 className="display-serif text-3xl sm:text-4xl italic text-[#D6B47C]">
                        {currentSkill.category}
                      </h3>
                      <span className="mono text-xs text-[#9E9689]">{currentSkill.code}</span>
                    </div>

                    <p className="text-[#9E9689] leading-relaxed mb-6 font-light">
                      {currentSkill.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-7">
                      {currentSkill.items.map((item) => (
                        <span key={item} className="tech-chip">
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="pt-5 border-t border-[color:var(--border)] flex flex-wrap items-center gap-3">
                      <span className="mono text-[10px] uppercase tracking-[0.2em] text-[#9E9689] mr-2">
                        Synapse Links:
                      </span>
                      {currentSkill.connections.map((connId) => {
                        const linked = D.skills.find((s) => s.id === connId);
                        return (
                          linked && (
                            <button
                              key={connId}
                              onClick={() => setSkill(connId)}
                              className="mono text-xs text-[#D6B47C] hover:underline"
                            >
                              [{linked.category}]
                            </button>
                          )
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            04 // GRAND FINALE & DIRECT TRANSMISSION (CONTACT)
        =================================================================== */}
        <section id="contact" className="atelier-sec" style={{ paddingBlock: '10rem' }}>
          <div className="atelier-wrap text-center reveal-block">
            <span className="mono text-xs uppercase tracking-[0.25em] text-[#D6B47C] block mb-4">
              04 // Initiate Transmission
            </span>
            <h2 className="hero-h1 display-serif mb-8">
              <RevealLine>Let’s engineer the</RevealLine>
              <span className="italic-gold">
                <RevealLine d={0.14}>extraordinary.</RevealLine>
              </span>
            </h2>

            <p className="text-[#9E9689] text-lg max-w-xl mx-auto leading-relaxed mb-12 font-light">
              Available for ambitious software engineering internships, AI product collaborations, and bespoke
              full-stack commissions.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <Mag
                as="button"
                onClick={copyEmail}
                cursorLabel="COPY"
                className="atelier-btn"
              >
                {copied ? <Check size={16} className="text-[#D6B47C]" /> : <Mail size={16} />}
                <span>{copied ? 'Address Copied to Clipboard' : PR.email}</span>
              </Mag>

              <Mag
                href={`mailto:${PR.email}`}
                cursorLabel="DISPATCH"
                className="atelier-btn is-solid"
              >
                <span>Dispatch Direct Email</span>
                <ArrowUpRight size={16} />
              </Mag>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-[color:var(--border)] max-w-lg mx-auto">
              <a
                href={PR.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                className="nav-item"
              >
                <Github size={16} className="text-[#D6B47C]" />
                <span>GitHub Archive</span>
                <ArrowUpRight size={13} />
              </a>

              <a
                href={PR.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="LINKEDIN"
                className="nav-item"
              >
                <Linkedin size={16} className="text-[#D6B47C]" />
                <span>LinkedIn Dossier</span>
                <ArrowUpRight size={13} />
              </a>

              {PR.resumeUrl && (
                <a
                  href={PR.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="CV"
                  className="nav-item"
                >
                  <span>Curriculum Vitae</span>
                  <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          ARCHITECTURAL COLOPHON FOOTER
      ===================================================================== */}
      <footer className="relative z-10 px-6 py-9 border-t border-[color:var(--border)] bg-[#040403]/90">
        <div className="atelier-wrap flex flex-col sm:flex-row items-center justify-between gap-4 mono text-xs text-[#9E9689]">
          <div className="flex items-center gap-3">
            <span className="text-[#D6B47C]">© {new Date().getFullYear()}</span>
            <span className="text-[#FAF6EE]">{PR.name}</span>
            <span>// ALL RIGHTS RESERVED</span>
          </div>
          <div>
            <span>{PR.role} • {PR.university}</span>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          AI DIGITAL CONCIERGE (TARS-INSPIRED TELEMETRY MODULE)
      ===================================================================== */}
      <button
        className="concierge-fab"
        onClick={() => setChat((v) => !v)}
        aria-expanded={chat}
        data-cursor="CONCIERGE"
        title="Open AI Concierge (Cmd/Ctrl + K)"
      >
        {chat ? <X size={15} /> : <Sparkles size={15} className="text-[#D6B47C]" />}
        <span className="mono">{chat ? 'Close Terminal' : 'AI Concierge'}</span>
      </button>

      <div
        className={`concierge-modal overflow-hidden ${chat ? 'is-open' : ''}`}
        role="dialog"
        aria-label="Digital Concierge"
      >
        <div className="px-5 py-4 border-b border-[color:var(--border)] flex items-center justify-between bg-[#090807]">
          <div className="flex items-center gap-2.5">
            <Terminal size={16} className="text-[#D6B47C]" />
            <div>
              <span className="display-serif text-2xl text-[#FAF6EE] block leading-none">
                Atelier Concierge
              </span>
              <span className="mono text-[10px] text-[#9E9689] uppercase tracking-wider">
                LLaMA 3.3 / Telemetry Assistant
              </span>
            </div>
          </div>
          <button
            onClick={() => setChat(false)}
            className="text-[#9E9689] hover:text-[#FAF6EE] p-1"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Honesty & Humor Calibration Sliders */}
        <div className="px-5 py-3 grid grid-cols-2 gap-5 mono text-[10px] uppercase tracking-wider text-[#9E9689] border-b border-[color:var(--border)] bg-[#060605]/60">
          <label className="space-y-1">
            <div className="flex justify-between">
              <span>Honesty</span>
              <span className="text-[#D6B47C]">{honesty}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={honesty}
              onChange={(e) => setHonesty(+e.target.value)}
            />
          </label>
          <label className="space-y-1">
            <div className="flex justify-between">
              <span>Humor</span>
              <span className="text-[#D6B47C]">{humor}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={humor}
              onChange={(e) => setHumor(+e.target.value)}
            />
          </label>
        </div>

        {/* Quick Prompts */}
        <div className="px-5 py-2.5 flex flex-wrap gap-2 border-b border-[color:var(--border)]">
          {[
            "Tell me about Nayan's live projects",
            'What is his tech stack?',
            'How can I contact Nayan?'
          ].map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => sendMessage(null, prompt)}
              className="mono text-[11px] text-[#9E9689] hover:text-[#D6B47C] border border-[color:var(--border)] hover:border-[#D6B47C] px-2.5 py-1 rounded-full transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Stream */}
        <div className="p-5 flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: '36vh' }}>
          {msgs.map((m, i) => (
            <div key={i} className={`chat-bubble ${m.r}`}>
              {m.t}
            </div>
          ))}
          {busy && (
            <div className="chat-bubble a flex items-center gap-2 text-[#9E9689] mono text-xs">
              <Loader2 size={14} className="animate-spin text-[#D6B47C]" />
              <span>Synthesizing response...</span>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => sendMessage(e)}
          className="p-3 flex items-center gap-2 border-t border-[color:var(--border)] bg-[#090807]"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Inquire about architecture, stack, or availability..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-[#FAF6EE] outline-none placeholder:text-[#9E9689]/60"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="p-2.5 rounded-full bg-[#D6B47C] text-[#060605] disabled:opacity-35 transition-opacity"
            aria-label="Send message"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
