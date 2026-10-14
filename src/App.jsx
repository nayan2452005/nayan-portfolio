import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowUpRight, Github, Linkedin, Menu, X, Code2,
  Activity, ShieldCheck, Cpu, Target, Mail, Check, Database, Terminal,
  Brain, Laptop, Sparkles, ChevronRight,
  Send, Loader2, Command, BarChart3, Globe, Compass, Radio,
  Layers, Eye, FileText, Minimize2, MessageSquare
} from 'lucide-react';

// ============================================================================
// EDITABLE PORTFOLIO CONFIGURATION
// ============================================================================
const PORTFOLIO_DATA = {
  profile: {
    name: "Nayan Choraria",
    role: "BCA Artificial Intelligence Student",
    university: "Jain University, Bengaluru, India",
    location: "Bengaluru, IN // 12.9716° N, 77.5946° E",
    email: "nayanchoraria111@gmail.com",
    github: "https://github.com/nayan2452005",
    linkedin: "https://www.linkedin.com/in/nayan-choraria-026076266/",
    resumeUrl: "", // Add a path/URL (e.g. "/Nayan_Choraria_Resume.pdf") when available
    leadership: {
      role: "Past Joint Secretary",
      organization: "Marwari Yuva Manch",
      summary: "Coordinated community initiatives, structured team operations, and collaborative project execution."
    },
    interests: [
      "Artificial Intelligence & Machine Learning",
      "Full-Stack Web Development",
      "AI-Powered Applications",
      "Data Analysis & Intelligent Systems",
      "Creative Technology & Interactive Experiences"
    ]
  },
  featuredProjects: [
    {
      id: "honeypot-scam-detection",
      code: "ARCHIVE // 01",
      title: "Honeypot Scam Detection",
      category: "AI & Threat Intelligence",
      visualType: "honeypot",
      description:
        "An AI-assisted system for detecting suspicious conversations and extracting scam-related indicators through structured API pipelines and behavioral heuristics.",
      tech: ["Python", "FastAPI", "AI Heuristics", "Swagger UI", "Postman", "REST API"],
      github: "https://github.com/nayan2452005",
      live: "https://agentic-honeypot-a41c.onrender.com/docs"
    },
    {
      id: "aqi-monitor-dashboard",
      code: "ARCHIVE // 02",
      title: "AQI Monitor Dashboard",
      category: "IoT & Environmental Telemetry",
      visualType: "aqi",
      description:
        "An IoT-based air quality monitoring system utilizing an MQ135 gas sensor and microcontroller firmware to sample gas levels in real time and trigger threshold alerts.",
      tech: ["Arduino IDE", "MQ135 Sensor", "C / C++", "Breadboard Circuitry", "Telemetry Alerts"],
      github: "https://github.com/nayan2452005",
      live: ""
    },
    {
      id: "sri-balaji-distributors",
      code: "ARCHIVE // 03",
      title: "Sri Balaji Distributors Website",
      category: "Full-Stack Commercial Web",
      visualType: "distributor",
      description:
        "A modern, responsive business website engineered for an auto-electrical spare parts wholesale distributor, featuring a modular component architecture and brand showcase.",
      tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Component Architecture"],
      github: "https://github.com/nayan2452005",
      live: "https://sri-balaji-distributors.onrender.com"
    },
    {
      id: "sentiment-analysis-nlp",
      code: "ARCHIVE // 04",
      title: "Social Media Sentiment Analysis",
      category: "Machine Learning & NLP",
      visualType: "sentiment",
      description:
        "A machine learning and natural language processing project focused on contextual sentiment classification, polarity scoring, and sarcasm detection across unstructured social streams.",
      tech: ["Python", "Machine Learning", "NLP", "Text Classification", "Data Analysis"],
      github: "https://github.com/nayan2452005",
      live: ""
    }
  ],
  additionalArchive: [
    {
      id: "ai-tally-analytics",
      code: "LOG // 05",
      title: "AI Tally Business Analytics Software",
      category: "AI Financial Systems",
      visualType: "tally",
      description:
        "A Tally-inspired business analytics web application with Appwrite authentication, interactive Recharts KPI dashboards (revenue, profit, GST, debtors), and Groq LLaMA forecasting.",
      tech: ["React", "TypeScript", "Vite", "Recharts", "Appwrite", "Groq API"],
      github: "https://github.com/nayan2452005",
      live: ""
    },
    {
      id: "reachinbox-scheduler",
      code: "LOG // 06",
      title: "ReachInbox – Email Scheduling Platform",
      category: "Full-Stack Platform",
      visualType: "reachinbox",
      description:
        "A full-stack email scheduling and management system supporting Google OAuth login, sender management, automated job tracking, and PostgreSQL persistence.",
      tech: ["Next.js", "Node.js", "Express", "PostgreSQL", "Google OAuth", "REST APIs"],
      github: "https://github.com/nayan2452005",
      live: ""
    },
    {
      id: "live-web-portfolio",
      code: "LOG // 07",
      title: "Interactive Spatial Web Portfolio",
      category: "Creative Technology",
      visualType: "portfolio",
      description:
        "Personal web architecture showcasing interactive 3D gravitational rendering, responsive performance optimization, and automated cloud deployment.",
      tech: ["React.js", "TypeScript", "Vite", "Tailwind CSS", "Render"],
      github: "https://github.com/nayan2452005",
      live: "https://nayan-portfolio-rrb8.onrender.com"
    }
  ],
  skills: [
    {
      id: "ai-ml",
      code: "SYS-01",
      category: "AI and Machine Learning",
      description: "Predictive modeling, NLP pipelines, and LLM-powered application workflows.",
      items: ["Machine Learning", "Natural Language Processing", "Sentiment & Sarcasm Detection", "Groq API (LLaMA)", "AI-Assisted Heuristics"],
      connections: ["languages", "data-analysis", "backend"]
    },
    {
      id: "languages",
      code: "SYS-02",
      category: "Programming Languages",
      description: "Core computational languages across systems, web, and embedded hardware.",
      items: ["Python", "TypeScript", "JavaScript (ES6+)", "C / C++", "Java", "SQL"],
      connections: ["ai-ml", "frontend", "backend"]
    },
    {
      id: "frontend",
      code: "SYS-03",
      category: "Frontend Development",
      description: "Responsive, component-driven interfaces with smooth motion and clean typography.",
      items: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Vite", "HTML5 & CSS3"],
      connections: ["languages", "backend", "tools"]
    },
    {
      id: "backend",
      code: "SYS-04",
      category: "Backend Development",
      description: "RESTful API architecture, authentication flows, and asynchronous job handling.",
      items: ["FastAPI", "Node.js", "Express.js", "RESTful APIs", "Google OAuth 2.0", "Appwrite"],
      connections: ["languages", "databases", "ai-ml"]
    },
    {
      id: "databases",
      code: "SYS-05",
      category: "Databases",
      description: "Relational schema design, query optimization, and cloud-backed storage.",
      items: ["PostgreSQL", "SQL Databases", "Appwrite Database", "Firebase"],
      connections: ["backend", "data-analysis"]
    },
    {
      id: "data-analysis",
      code: "SYS-06",
      category: "Data Analysis",
      description: "KPI tracking, financial & environmental telemetry visualization, and forecasting.",
      items: ["Recharts", "KPI & Financial Dashboards", "IoT Sensor Telemetry", "Scenario Forecasting", "Data Visualization"],
      connections: ["ai-ml", "databases"]
    },
    {
      id: "tools",
      code: "SYS-07",
      category: "Development Tools",
      description: "Version control, API validation, hardware prototyping, and cloud deployment.",
      items: ["Git & GitHub", "Postman", "Swagger UI / OpenAPI", "Arduino IDE", "Render"],
      connections: ["frontend", "backend"]
    }
  ]
};

// ============================================================================
// 3D GARGANTUA BLACK HOLE & GRAVITATIONAL LENSING CANVAS ENGINE
// ============================================================================
function GargantuaCanvas({ scrollProgress, mousePos, reducedMotion }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    scroll: 0,
    targetScroll: 0,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0
  });

  useEffect(() => {
    stateRef.current.targetScroll = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    stateRef.current.targetMouseX = mousePos.x;
    stateRef.current.targetMouseY = mousePos.y;
  }, [mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const isMobile = width < 768;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Generate Multi-Layer Deep Space Starfield
    const starCount = isMobile ? 110 : 240;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random() * 0.85 + 0.15,
      size: Math.random() * 1.35 + 0.35,
      hue: Math.random() > 0.78 ? 'cyan' : Math.random() > 0.55 ? 'amber' : 'white',
      twinkleOffset: Math.random() * Math.PI * 2
    }));

    // Generate 3D Accretion Disk Particles
    const diskCount = isMobile ? 160 : 360;
    const diskParticles = Array.from({ length: diskCount }, () => {
      const radiusNorm = Math.pow(Math.random(), 1.45); // Denser near inner photon ring
      return {
        r: 1.18 + radiusNorm * 2.45, // In units of Schwarzschild radius
        angle: Math.random() * Math.PI * 2,
        speed: (0.0045 + Math.random() * 0.004) / Math.pow(1 + radiusNorm, 1.15),
        thickness: (Math.random() - 0.5) * 0.14,
        alpha: 0.25 + (1 - radiusNorm) * 0.65,
        size: 0.9 + (1 - radiusNorm) * 2.1,
        temp: Math.random() // Controls ice-white / electric-cyan / restrained-amber mix
      };
    });

    let time = 0;

    const render = () => {
      time += reducedMotion ? 0.001 : 0.012;

      // Smooth interpolation for camera & scroll
      const st = stateRef.current;
      st.scroll += (st.targetScroll - st.scroll) * 0.06;
      st.mouseX += (st.targetMouseX - st.mouseX) * 0.05;
      st.mouseY += (st.targetMouseY - st.mouseY) * 0.05;

      const s = st.scroll;

      // Background cosmic gradient shifting subtly with scroll depth
      const bgGrad = ctx.createRadialGradient(
        width * (0.5 + st.mouseX * 0.04),
        height * (0.44 - s * 0.18),
        10,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.95
      );
      bgGrad.addColorStop(0, '#07111F');
      bgGrad.addColorStop(0.55, '#04070E');
      bgGrad.addColorStop(1, '#030407');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Black hole center position & scale linked to scroll + mouse parallax
      const bhX = width * (isMobile ? 0.5 : 0.64 - s * 0.14) + st.mouseX * 26;
      const bhY = height * (isMobile ? 0.36 : 0.48 - s * 0.12) + st.mouseY * 18;
      const baseRadius = Math.min(width, height) * (isMobile ? 0.13 : 0.145);
      const scaleFactor = 1 + Math.sin(s * Math.PI) * 0.22 - s * 0.12;
      const rs = baseRadius * scaleFactor; // Event horizon radius

      // Disk tilt angle responds to scroll & cursor Y
      const diskTilt = 0.23 + s * 0.18 + st.mouseY * 0.04;
      const diskRoll = -0.19 + s * 0.15 + st.mouseX * 0.03;
      const cosRoll = Math.cos(diskRoll);
      const sinRoll = Math.sin(diskRoll);

      // 1. Render Starfield with Real-Time Gravitational Lensing Deflection
      const einsteinRadiusSq = rs * rs * (2.6 + Math.sin(s * Math.PI) * 0.8);
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        // Multi-layer vertical parallax on scroll
        const parallaxY = ((star.y + 1) * 0.5 * height - s * height * (0.65 / star.z)) % height;
        const rawY = parallaxY < 0 ? parallaxY + height : parallaxY;
        const rawX = ((star.x + 1) * 0.5 * width - st.mouseX * (18 / star.z) + width) % width;

        // Vector from black hole center to star
        const dx = rawX - bhX;
        const dy = rawY - bhY;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        // Skip stars swallowed inside photon shadow
        if (dist < rs * 1.02) continue;

        // Gravitational deflection pushes star positions outward near the event horizon
        const deflection = einsteinRadiusSq / Math.max(distSq, rs * rs);
        const lensedX = rawX + dx * deflection * 0.55;
        const lensedY = rawY + dy * deflection * 0.55;

        const twinkle = 0.55 + 0.45 * Math.sin(time * 1.5 + star.twinkleOffset);
        const alpha = Math.min(1, (0.3 + (1 - star.z) * 0.65) * twinkle);

        if (star.hue === 'cyan') {
          ctx.fillStyle = `rgba(118, 229, 255, ${alpha})`;
        } else if (star.hue === 'amber') {
          ctx.fillStyle = `rgba(240, 182, 109, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(243, 246, 250, ${alpha})`;
        }

        ctx.beginPath();
        ctx.arc(lensedX, lensedY, star.size * (1 + deflection * 0.35), 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Volumetric Relativistic Light Rays / Outer Halo Glow
      const outerGlow = ctx.createRadialGradient(bhX, bhY, rs * 0.85, bhX, bhY, rs * 4.2);
      outerGlow.addColorStop(0, 'rgba(240, 182, 109, 0.22)');
      outerGlow.addColorStop(0.32, 'rgba(118, 229, 255, 0.08)');
      outerGlow.addColorStop(0.65, 'rgba(7, 17, 31, 0.18)');
      outerGlow.addColorStop(1, 'rgba(3, 4, 7, 0)');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(bhX, bhY, rs * 4.2, 0, Math.PI * 2);
      ctx.fill();

      // 3. Gravitational Lensed Upper & Lower Einstein Rings (Behind Disk)
      ctx.save();
      ctx.translate(bhX, bhY);
      ctx.rotate(diskRoll);

      // Upper gravitational arch (light from back of disk bent over the top)
      const upperRingGrad = ctx.createRadialGradient(0, -rs * 0.18, rs * 0.9, 0, 0, rs * 1.95);
      upperRingGrad.addColorStop(0, 'rgba(243, 246, 250, 0)');
      upperRingGrad.addColorStop(0.5, 'rgba(240, 182, 109, 0.34)');
      upperRingGrad.addColorStop(0.72, 'rgba(118, 229, 255, 0.16)');
      upperRingGrad.addColorStop(1, 'rgba(3, 4, 7, 0)');

      ctx.strokeStyle = upperRingGrad;
      ctx.lineWidth = rs * 0.28;
      ctx.beginPath();
      ctx.ellipse(0, 0, rs * 1.42, rs * 1.18, 0, Math.PI * 1.04, Math.PI * 1.96);
      ctx.stroke();

      // Lower gravitational arch (secondary lensed image underneath)
      ctx.lineWidth = rs * 0.18;
      ctx.beginPath();
      ctx.ellipse(0, 0, rs * 1.36, rs * 1.12, 0, Math.PI * 0.06, Math.PI * 0.94);
      ctx.stroke();
      ctx.restore();

      // 4. Helper to draw 3D Accretion Disk Particles (Back half first, then Black Hole Shadow, then Front half)
      const drawDiskHalf = (isFront) => {
        for (let i = 0; i < diskParticles.length; i++) {
          const p = diskParticles[i];
          if (!reducedMotion) {
            p.angle = (p.angle + p.speed * (1 + s * 0.55)) % (Math.PI * 2);
          }
          const sinA = Math.sin(p.angle);
          // sinA > 0 is front half of tilted disk, sinA <= 0 is back half
          if ((isFront && sinA < 0) || (!isFront && sinA >= 0)) continue;

          const cosA = Math.cos(p.angle);
          const orbitR = p.r * rs;

          // Local disk coordinates
          const lx = cosA * orbitR;
          let ly = sinA * orbitR * diskTilt + p.thickness * rs;

          // Gravitational lensing warps the back half of the disk upward over the singularity!
          if (!isFront) {
            const warpFactor = Math.exp(-Math.abs(cosA) * 1.6) * (1.35 / p.r);
            ly -= warpFactor * rs * 0.95;
          }

          // Rotate by diskRoll
          const screenX = bhX + lx * cosRoll - ly * sinRoll;
          const screenY = bhY + lx * sinRoll + ly * cosRoll;

          // Relativistic Doppler Beaming: cosA < 0 (left side) is approaching observer -> brighter & bluer/ice-white
          // cosA > 0 (right side) is receding -> warmer amber & slightly dimmer
          const doppler = 1 - cosA * 0.38;
          const alpha = Math.min(0.95, p.alpha * doppler);

          if (cosA < -0.25 && p.temp > 0.45) {
            ctx.fillStyle = `rgba(118, 229, 255, ${alpha})`; // Electric cyan shift
          } else if (cosA < 0.1 && p.temp > 0.65) {
            ctx.fillStyle = `rgba(243, 246, 250, ${alpha})`; // Ice white core
          } else {
            ctx.fillStyle = `rgba(240, 182, 109, ${alpha})`; // Restrained amber
          }

          // Draw elongated orbital streak
          ctx.save();
          ctx.translate(screenX, screenY);
          ctx.rotate(diskRoll + Math.atan2(cosA * diskTilt, -sinA));
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * (2.6 + doppler), p.size * 0.52, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      };

      // Render Back Accretion Disk
      drawDiskHalf(false);

      // 5. Event Horizon Shadow & Innermost Photon Sphere Ring
      ctx.save();
      ctx.beginPath();
      ctx.arc(bhX, bhY, rs, 0, Math.PI * 2);
      ctx.fillStyle = '#020305';
      ctx.shadowColor = 'rgba(240, 182, 109, 0.65)';
      ctx.shadowBlur = 28;
      ctx.fill();
      ctx.restore();

      // Razor-thin relativistic photon ring on the edge of the event horizon
      const photonGrad = ctx.createLinearGradient(bhX - rs, bhY, bhX + rs, bhY);
      photonGrad.addColorStop(0, 'rgba(118, 229, 255, 0.85)');
      photonGrad.addColorStop(0.45, 'rgba(243, 246, 250, 0.9)');
      photonGrad.addColorStop(1, 'rgba(240, 182, 109, 0.55)');
      ctx.strokeStyle = photonGrad;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(bhX, bhY, rs * 1.02, 0, Math.PI * 2);
      ctx.stroke();

      // 6. Equatorial Accretion Disk Continuous Glow Band (Front Crossing)
      ctx.save();
      ctx.translate(bhX, bhY);
      ctx.rotate(diskRoll);
      const planeGrad = ctx.createLinearGradient(-rs * 3.4, 0, rs * 3.4, 0);
      planeGrad.addColorStop(0, 'rgba(118, 229, 255, 0)');
      planeGrad.addColorStop(0.22, 'rgba(118, 229, 255, 0.25)');
      planeGrad.addColorStop(0.42, 'rgba(243, 246, 250, 0.52)');
      planeGrad.addColorStop(0.68, 'rgba(240, 182, 109, 0.34)');
      planeGrad.addColorStop(1, 'rgba(240, 182, 109, 0)');
      ctx.fillStyle = planeGrad;
      ctx.beginPath();
      ctx.ellipse(0, rs * 0.08, rs * 3.3, rs * diskTilt * 0.52, 0, 0, Math.PI);
      ctx.fill();
      ctx.restore();

      // Render Front Accretion Disk
      drawDiskHalf(true);

      if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

// ============================================================================
// BESPOKE ABSTRACT PROJECT VISUALIZERS (NO FAKE SCREENSHOTS)
// ============================================================================
function ProjectVisual({ type }) {
  if (type === 'honeypot') {
    return (
      <div className="relative w-full h-48 bg-[#07111F]/90 border-b border-white/10 overflow-hidden p-4 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#9AA5B5]">
          <span className="flex items-center gap-1.5 text-[#76E5FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#76E5FF] animate-ping" />
            INTERCEPT_STREAM // FASTAPI
          </span>
          <span className="px-1.5 py-0.5 bg-[#F0B66D]/15 text-[#F0B66D] border border-[#F0B66D]/30 rounded">
            INDICATOR_EXTRACTED
          </span>
        </div>

        {/* Simulated Conversation Threat Graph */}
        <svg className="w-full h-20 overflow-visible" viewBox="0 0 320 70">
          <defs>
            <linearGradient id="threatWave" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#76E5FF" stopOpacity="0.2" />
              <stop offset="55%" stopColor="#76E5FF" stopOpacity="0.85" />
              <stop offset="80%" stopColor="#F0B66D" stopOpacity="1" />
              <stop offset="100%" stopColor="#F0B66D" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M 0 48 Q 35 44, 65 46 T 125 38 T 175 45 T 215 14 T 255 24 T 320 36"
            fill="none"
            stroke="url(#threatWave)"
            strokeWidth="2"
          />
          <line x1="215" y1="6" x2="215" y2="64" stroke="#F0B66D" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="125" cy="38" r="3" fill="#76E5FF" />
          <circle cx="215" cy="14" r="4.5" fill="#F0B66D" />
          <text x="222" y="18" fill="#F0B66D" fontSize="8" fontFamily="monospace">
            PHISHING_URI_DETECTED
          </text>
        </svg>

        <div className="grid grid-cols-3 gap-2 text-[9px] font-mono">
          <div className="bg-[#030407]/80 border border-white/5 px-2 py-1 rounded">
            <span className="text-[#9AA5B5] block">PAYLOAD</span>
            <span className="text-[#F3F6FA]">JSON // VERIFIED</span>
          </div>
          <div className="bg-[#030407]/80 border border-white/5 px-2 py-1 rounded">
            <span className="text-[#9AA5B5] block">SCHEMA</span>
            <span className="text-[#76E5FF]">OPENAPI 3.1</span>
          </div>
          <div className="bg-[#030407]/80 border border-[#F0B66D]/30 px-2 py-1 rounded">
            <span className="text-[#9AA5B5] block">STATUS</span>
            <span className="text-[#F0B66D]">FLAGGED</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'aqi') {
    return (
      <div className="relative w-full h-48 bg-[#07111F]/90 border-b border-white/10 overflow-hidden p-4 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="text-[#76E5FF]">SENSOR // MQ-135 ANALOG</span>
          <span className="text-[#9AA5B5]">PPM TELEMETRY</span>
        </div>

        <div className="flex items-center justify-center gap-6 my-auto">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="rgba(243,246,250,0.08)" strokeWidth="6" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#76E5FF"
                strokeWidth="6"
                strokeDasharray="175 251"
                strokeLinecap="round"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="#F0B66D"
                strokeWidth="2"
                strokeDasharray="4 6"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-mono">
              <span className="text-xs font-bold text-[#F3F6FA]">MQ135</span>
              <span className="text-[8px] text-[#76E5FF]">ACTIVE</span>
            </div>
          </div>

          <div className="flex-1 space-y-2 font-mono text-[10px]">
            <div className="flex justify-between items-center border-b border-white/5 pb-1">
              <span className="text-[#9AA5B5]">GAS SAMPLING</span>
              <span className="text-[#76E5FF]">REAL-TIME</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-1">
              <span className="text-[#9AA5B5]">CONTROLLER</span>
              <span className="text-[#F3F6FA]">ARDUINO C++</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#9AA5B5]">BUZZER ALERT</span>
              <span className="text-[#F0B66D]">THRESHOLD ARMED</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'distributor') {
    return (
      <div className="relative w-full h-48 bg-[#07111F]/90 border-b border-white/10 overflow-hidden p-4 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="text-[#F0B66D]">COMMERCIAL PORTAL // B2B</span>
          <span className="text-[#9AA5B5]">AUTO-ELECTRICAL</span>
        </div>

        {/* Architectural Product Grid & Marquee Preview */}
        <div className="my-auto space-y-2.5">
          <div className="grid grid-cols-3 gap-2">
            {['STARTERS & ALTERNATORS', 'WIRING HARNESS', 'OEM SENSORS'].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#030407]/90 border border-white/10 p-2.5 rounded flex flex-col justify-between h-16"
              >
                <div className="w-4 h-1 bg-[#F0B66D]/70 rounded-full" />
                <span className="text-[8px] font-mono text-[#F3F6FA] tracking-wider leading-tight">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-[#030407]/70 border border-white/5 px-3 py-1.5 rounded flex items-center justify-between text-[9px] font-mono text-[#9AA5B5]">
            <span>BRAND MARQUEE ENGINE</span>
            <span className="text-[#76E5FF]">RESPONSIVE UI</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'sentiment') {
    return (
      <div className="relative w-full h-48 bg-[#07111F]/90 border-b border-white/10 overflow-hidden p-4 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="text-[#76E5FF]">NLP PIPELINE // TOKENIZER</span>
          <span className="text-[#F0B66D]">SARCASM_DETECTOR</span>
        </div>

        <div className="my-auto space-y-2 font-mono text-[10px]">
          <div className="bg-[#030407]/85 border border-white/10 p-2 rounded flex items-center justify-between">
            <span className="text-[#9AA5B5] truncate pr-2">"Oh great, another outage right on schedule..."</span>
            <span className="px-1.5 py-0.5 text-[8px] bg-[#F0B66D]/15 text-[#F0B66D] border border-[#F0B66D]/40 rounded shrink-0">
              SARCASM // IRONIC
            </span>
          </div>
          <div className="bg-[#030407]/85 border border-white/10 p-2 rounded flex items-center justify-between">
            <span className="text-[#9AA5B5] truncate pr-2">"The new update improved response speed."</span>
            <span className="px-1.5 py-0.5 text-[8px] bg-[#76E5FF]/15 text-[#76E5FF] border border-[#76E5FF]/40 rounded shrink-0">
              POSITIVE // 0.94
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] font-mono text-[#9AA5B5]">
          <span>VECTOR EMBEDDINGS</span>
          <span className="text-[#F3F6FA]">CLASSIFICATION MATRIX</span>
        </div>
      </div>
    );
  }

  // Fallback for Archive Projects (Tally / ReachInbox / Portfolio)
  return (
    <div className="relative w-full h-40 bg-[#07111F]/80 border-b border-white/10 overflow-hidden p-4 flex flex-col justify-between select-none">
      <div className="flex items-center justify-between text-[10px] font-mono text-[#9AA5B5]">
        <span className="text-[#76E5FF]">SYSTEM ARCHITECTURE</span>
        <span>VERIFIED MODULE</span>
      </div>
      <div className="my-auto flex items-center gap-3">
        <div className="flex-1 h-12 bg-[#030407]/80 border border-white/10 rounded p-2 flex items-end gap-1.5">
          {[40, 75, 55, 90, 65, 95, 80].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded-t ${i % 2 === 0 ? 'bg-[#76E5FF]/60' : 'bg-[#F0B66D]/60'}`}
            />
          ))}
        </div>
      </div>
      <div className="text-[9px] font-mono text-[#9AA5B5] flex justify-between">
        <span>TELEMETRY STREAM</span>
        <span className="text-[#F0B66D]">ACTIVE</span>
      </div>
    </div>
  );
}

// ============================================================================
// 3D TILT INTERACTIVE PROJECT CARD
// ============================================================================
function ProjectCard({ project }) {
  const cardRef = useRef(null);

  const handlePointerMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
    el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
  };

  const handlePointerLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="spatial-card rounded-2xl bg-[#11151D]/75 border border-white/10 overflow-hidden flex flex-col justify-between transition-all duration-300 backdrop-blur-md group"
    >
      <div>
        <ProjectVisual type={project.visualType} />

        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between gap-2 text-[11px] font-mono mb-3">
            <span className="text-[#76E5FF] tracking-widest uppercase">{project.code}</span>
            <span className="text-[#9AA5B5] px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10">
              {project.category}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#F3F6FA] tracking-tight mb-3 group-hover:text-[#76E5FF] transition-colors font-display">
            {project.title}
          </h3>

          <p className="text-sm text-[#9AA5B5] leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono text-[#F3F6FA]/85 bg-[#030407]/70 border border-white/10 px-2.5 py-1 rounded-md"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-7 py-4 border-t border-white/10 bg-[#030407]/50 flex items-center justify-between gap-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#9AA5B5] hover:text-[#F3F6FA] transition-colors"
        >
          <Github size={14} />
          <span>Source Code</span>
        </a>

        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#F0B66D] hover:text-[#76E5FF] transition-colors"
          >
            <span>Launch Live System</span>
            <ArrowUpRight size={14} />
          </a>
        ) : (
          <span className="text-[11px] font-mono text-[#9AA5B5]/60">
            REPOSITORY ARCHIVE
          </span>
        )}
      </div>
    </article>
  );
}

// ============================================================================
// MAIN APPLICATION
// ============================================================================
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCompactNav, setIsCompactNav] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showExtendedArchive, setShowExtendedArchive] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState('ai-ml');

  // TARS Assistant State
  const [isTarsExpanded, setIsTarsExpanded] = useState(false);
  const [isTarsDismissed, setIsTarsDismissed] = useState(false);
  const [honesty, setHonesty] = useState(90);
  const [humor, setHumor] = useState(75);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'ai',
      content:
        'TARS Mechanical Unit online. Honesty calibrated to 90%. Ask me about Nayan Choraria’s AI projects, engineering stack, or academic background at Jain University.'
    }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Contextual TARS status readout linked to active section
  const tarsStatusReadout = useMemo(() => {
    switch (activeSection) {
      case 'home':
        return 'System ready. Gargantua orbital lock stable.';
      case 'about':
        return 'Inspecting operator dossier: Jain University // BCA AI.';
      case 'projects':
        return 'Exploring project archive... Choose a mission to inspect.';
      case 'skills':
        return 'Mapping technical constellation & system dependencies.';
      case 'contact':
        return 'Transceiver aligned. Ready to initialize contact.';
      default:
        return 'System ready.';
    }
  }, [activeSection]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 250);
    document.documentElement.style.scrollBehavior = 'smooth';

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    // Mouse Parallax Listener
    const handlePointerMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: nx, y: ny });
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Scroll Progress & Compact Navigation Listener
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      setScrollProgress(progress);
      setIsCompactNav(scrollTop > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Section Reveal & Active Navigation Observer
    const sectionElements = document.querySelectorAll('section[id]');
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.28 }
    );
    sectionElements.forEach((sec) => navObserver.observe(sec));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal-section').forEach((el) => revealObserver.observe(el));

    // Keyboard Shortcuts (Cmd/Ctrl + K for TARS, Esc to close)
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsTarsDismissed(false);
        setIsTarsExpanded((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsTarsExpanded(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      navObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isTarsExpanded) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiMessages, isTarsExpanded]);

  const copyEmail = () => {
    const email = PORTFOLIO_DATA.profile.email;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email);
    } else {
      const el = document.createElement('textarea');
      el.value = email;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Local Deterministic Fallback Responder when no API key is configured
  const generateLocalTarsResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('project') || q.includes('work') || q.includes('honeypot') || q.includes('scam') || q.includes('aqi') || q.includes('balaji') || q.includes('sentiment')) {
      return `Nayan's primary mission archive features 4 core systems: Honeypot Scam Detection (FastAPI threat analysis), AQI Monitor Dashboard (Arduino & MQ135 IoT telemetry), Sri Balaji Distributors Website (live commercial portal), and Social Media Sentiment Analysis (NLP & sarcasm detection).`;
    }
    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language')) {
      return `Technical arsenal verified: Python, TypeScript, JavaScript, C/C++, React, Next.js, FastAPI, Node.js, PostgreSQL, Appwrite, and Machine Learning/NLP workflows.`;
    }
    if (q.includes('education') || q.includes('university') || q.includes('student') || q.includes('about') || q.includes('who')) {
      return `Nayan Choraria is a BCA Artificial Intelligence student at Jain University, Bengaluru, focusing on intelligent software systems, full-stack architecture, and applied machine learning.`;
    }
    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach')) {
      return `Direct communication channel is open at ${PORTFOLIO_DATA.profile.email} or via GitHub (@nayan2452005) and LinkedIn.`;
    }
    return `TARS telemetry confirms Nayan Choraria specializes in AI/ML, full-stack web engineering, and interactive digital systems at Jain University. Ask about his Honeypot Scam Detection, AQI Monitor, Sri Balaji portal, or NLP sentiment analysis projects.`;
  };

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const userText = aiInput.trim();
    setAiMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setAiInput('');
    setIsAiLoading(true);

    try {
      const proxyUrl = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_AI_PROXY_URL : '';
      const envApiKey = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GEMINI_API_KEY : '';

      if (!proxyUrl && !envApiKey) {
        // Graceful local response when no environment key is present
        await new Promise((r) => setTimeout(r, 450));
        setAiMessages((prev) => [
          ...prev,
          { role: 'ai', content: generateLocalTarsResponse(userText) }
        ]);
        return;
      }

      const endpoint =
        proxyUrl ||
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${envApiKey}`;

      const systemPrompt = `You are TARS, the segmented mechanical assistant inspired by Interstellar, representing Nayan Choraria's portfolio.
Honesty parameter: ${honesty}%, Humor parameter: ${humor}%.
Profile: Nayan Choraria, BCA Artificial Intelligence Student at Jain University, Bengaluru, India.
Projects:
1. Honeypot Scam Detection (AI-assisted system for detecting suspicious conversations and extracting scam indicators; FastAPI, Swagger UI, Postman).
2. AQI Monitor Dashboard (IoT air quality monitoring with Arduino IDE, MQ135 sensor, C++, threshold alerts).
3. Sri Balaji Distributors Website (Modern commercial website for an auto-electrical spare parts distributor; live at https://sri-balaji-distributors.onrender.com).
4. Social Media Sentiment Analysis (Machine learning/NLP project for sentiment classification and sarcasm detection).
Additional projects: AI Tally Business Analytics (React, Recharts, Appwrite, Groq API) and ReachInbox Email Platform (Next.js, PostgreSQL, OAuth).
Do not invent fake metrics or awards. Keep responses concise (under 3 sentences) with crisp mechanical precision.`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userText }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });

      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();
      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        generateLocalTarsResponse(userText);
      setAiMessages((prev) => [...prev, { role: 'ai', content: reply }]);
    } catch {
      setAiMessages((prev) => [
        ...prev,
        { role: 'ai', content: generateLocalTarsResponse(userText) }
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', code: '01' },
    { id: 'about', label: 'About', code: '02' },
    { id: 'projects', label: 'Projects', code: '03' },
    { id: 'skills', label: 'Skills', code: '04' },
    { id: 'contact', label: 'Contact', code: '05' }
  ];

  const currentSkillObj =
    PORTFOLIO_DATA.skills.find((s) => s.id === activeSkillCategory) ||
    PORTFOLIO_DATA.skills[0];

  return (
    <div
      className={`min-h-screen bg-[#030407] text-[#F3F6FA] selection:bg-[#76E5FF]/20 selection:text-[#76E5FF] antialiased overflow-x-hidden transition-opacity duration-700 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');

        :root {
          --bg-void: #030407;
          --bg-space: #07111F;
          --bg-graphite: #11151D;
          --text-ice: #F3F6FA;
          --text-silver: #9AA5B5;
          --accent-cyan: #76E5FF;
          --accent-amber: #F0B66D;
        }

        body {
          background-color: #030407;
          color: #F3F6FA;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }

        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }

        /* Subtle Spatial Card Illumination */
        .spatial-card {
          position: relative;
          will-change: transform;
          box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.85);
        }

        .spatial-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            520px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(118, 229, 255, 0.09),
            rgba(240, 182, 109, 0.04) 40%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
          z-index: 1;
        }

        .spatial-card:hover {
          border-color: rgba(118, 229, 255, 0.35);
        }

        .spatial-card:hover::before {
          opacity: 1;
        }

        .spatial-card > * {
          position: relative;
          z-index: 2;
        }

        /* Section Reveal Transitions */
        .reveal-section {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-section {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .spatial-card {
            transform: none !important;
          }
        }
      `}</style>

      {/* 3D Gargantua Black Hole & Relativistic Starfield Canvas */}
      <GargantuaCanvas
        scrollProgress={scrollProgress}
        mousePos={mousePos}
        reducedMotion={reducedMotion}
      />

      {/* Subtle Orbital Path Lines Connecting Spatial Layers */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-35"
      >
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <ellipse
            cx="920"
            cy={420 - scrollProgress * 160}
            rx={560 + scrollProgress * 120}
            ry={210 + scrollProgress * 45}
            fill="none"
            stroke="rgba(118, 229, 255, 0.12)"
            strokeWidth="1"
            strokeDasharray="6 10"
          />
          <ellipse
            cx="920"
            cy={420 - scrollProgress * 160}
            rx={740 + scrollProgress * 180}
            ry={310 + scrollProgress * 70}
            fill="none"
            stroke="rgba(240, 182, 109, 0.1)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* ====================================================================
          4. NAVIGATION — MISSION CONTROL
      ==================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
        <nav
          aria-label="Primary Navigation"
          className={`pointer-events-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-[#030407]/75 backdrop-blur-xl transition-all duration-300 flex items-center justify-between ${
            isCompactNav ? 'py-2.5 px-5 shadow-[0_10px_30px_rgba(0,0,0,0.75)]' : 'py-3.5 px-6'
          }`}
        >
          {/* Brand Identity & TARS 4-Slab Emblem */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-8 h-7 rounded bg-[#11151D] border border-white/15 p-1 flex items-center justify-center gap-0.5 group-hover:border-[#76E5FF]/60 transition-colors">
              <span className="w-1 h-full bg-[#9AA5B5] group-hover:bg-[#76E5FF] transition-colors" />
              <span className="w-1 h-4/5 bg-[#F3F6FA]" />
              <span className="w-1 h-full bg-[#9AA5B5]" />
              <span className="w-1 h-full bg-[#F0B66D]" />
            </div>
            <div>
              <span className="font-display font-bold text-sm tracking-tight text-[#F3F6FA] block leading-none">
                {PORTFOLIO_DATA.profile.name}
              </span>
              <span className="font-mono text-[9px] text-[#9AA5B5] tracking-widest uppercase block mt-1">
                MISSION CONTROL // AI
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-[#11151D]/70 border border-white/5 rounded-xl p-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#76E5FF]/15 text-[#76E5FF] border border-[#76E5FF]/30'
                      : 'text-[#9AA5B5] hover:text-[#F3F6FA] hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-60">{item.code}</span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* System Status & TARS Trigger */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#11151D] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#76E5FF] animate-pulse" />
              <span className="font-mono text-[10px] text-[#9AA5B5] tracking-wider">
                SYSTEM STATUS: <strong className="text-[#F3F6FA]">ONLINE</strong>
              </span>
            </div>

            <button
              onClick={() => {
                setIsTarsDismissed(false);
                setIsTarsExpanded(true);
              }}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#11151D] hover:bg-[#11151D]/90 border border-[#F0B66D]/35 text-xs font-mono text-[#F3F6FA] hover:border-[#F0B66D] transition-colors"
              title="Open TARS Assistant (Cmd/Ctrl + K)"
            >
              <Terminal size={13} className="text-[#F0B66D]" />
              <span>TARS</span>
              <kbd className="text-[9px] text-[#9AA5B5] bg-black/50 px-1.5 py-0.5 rounded border border-white/10">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={isMenuOpen}
              className="md:hidden p-2 rounded-lg bg-[#11151D] border border-white/10 text-[#F3F6FA]"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Drawer */}
        {isMenuOpen && (
          <div className="pointer-events-auto fixed inset-x-4 top-20 rounded-2xl bg-[#07111F]/95 border border-white/15 backdrop-blur-2xl p-6 md:hidden shadow-2xl z-50">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 font-mono text-[10px] text-[#9AA5B5]">
              <span>NAVIGATION MATRIX</span>
              <span className="text-[#76E5FF]">SYSTEM STATUS: ONLINE</span>
            </div>
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-white/5 text-base font-display font-medium text-[#F3F6FA]"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-[#76E5FF]">{item.code}</span>
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsTarsDismissed(false);
                  setIsTarsExpanded(true);
                }}
                className="mt-2 w-full py-3 rounded-xl bg-[#F0B66D] text-[#030407] font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Terminal size={14} /> Initialize TARS Assistant
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ====================================================================
          MAIN SPATIAL CONTENT
      ==================================================================== */}
      <main className="relative z-10">
        {/* ==================================================================
            2. HERO SECTION — ENTER THE UNIVERSE
        ================================================================== */}
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center px-6 pt-28 pb-20 relative"
        >
          <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 reveal-section reveal-visible">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#11151D]/80 border border-white/10 backdrop-blur-md mb-8">
                <span className="w-2 h-2 rounded-full bg-[#F0B66D]" />
                <span className="font-mono text-[11px] text-[#F3F6FA] tracking-wider uppercase">
                  {PORTFOLIO_DATA.profile.role} // {PORTFOLIO_DATA.profile.university}
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.4rem] font-bold tracking-tight text-[#F3F6FA] leading-[1.06] mb-6">
                Building Intelligence{' '}
                <span className="bg-gradient-to-r from-[#F3F6FA] via-[#76E5FF] to-[#F0B66D] bg-clip-text text-transparent">
                  Beyond the Ordinary.
                </span>
              </h1>

              <p className="text-base sm:text-xl text-[#9AA5B5] max-w-2xl leading-relaxed mb-10 font-normal">
                I explore the intersection of artificial intelligence, software engineering, and
                intelligent digital experiences.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#projects"
                  className="px-7 py-4 rounded-xl bg-[#F3F6FA] text-[#030407] font-display font-semibold text-sm tracking-wide hover:bg-[#76E5FF] transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(118,229,255,0.2)]"
                >
                  <span>Explore My Work</span>
                  <ChevronRight size={16} />
                </a>

                <a
                  href="#contact"
                  className="px-7 py-4 rounded-xl bg-[#11151D]/80 hover:bg-[#11151D] text-[#F3F6FA] border border-white/15 hover:border-[#F0B66D]/60 font-display font-medium text-sm tracking-wide transition-all flex items-center justify-center gap-2 backdrop-blur-md"
                >
                  <Radio size={15} className="text-[#F0B66D]" />
                  <span>Initialize Contact</span>
                </a>
              </div>

              {/* Technical Coordinates Metadata Bar */}
              <div className="mt-16 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl font-mono text-xs">
                <div>
                  <span className="text-[10px] text-[#9AA5B5] block uppercase">COORDINATES</span>
                  <span className="text-[#F3F6FA] mt-0.5 block">BENGALURU // 12.97° N</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#9AA5B5] block uppercase">CORE FOCUS</span>
                  <span className="text-[#76E5FF] mt-0.5 block">AI / ML & FULL-STACK</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-[#9AA5B5] block uppercase">GRAVITATIONAL LENS</span>
                  <span className="text-[#F0B66D] mt-0.5 block">
                    {(1 + scrollProgress * 2.4).toFixed(2)} RS // ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column Orbital Telemetry Readout Framing Gargantua */}
            <div className="lg:col-span-4 hidden lg:flex flex-col items-end justify-end h-full pointer-events-none">
              <div className="w-64 p-4 rounded-2xl bg-[#07111F]/65 border border-white/10 backdrop-blur-md font-mono text-[11px] space-y-2.5">
                <div className="flex items-center justify-between text-[#F0B66D] border-b border-white/10 pb-2">
                  <span>GARGANTUA // SINGULARITY</span>
                  <Compass size={13} />
                </div>
                <div className="flex justify-between text-[#9AA5B5]">
                  <span>ACCRETION DOPPLER</span>
                  <span className="text-[#76E5FF]">RELATIVISTIC</span>
                </div>
                <div className="flex justify-between text-[#9AA5B5]">
                  <span>INCLINATION</span>
                  <span className="text-[#F3F6FA]">{(13.2 + scrollProgress * 18).toFixed(1)}°</span>
                </div>
                <div className="flex justify-between text-[#9AA5B5]">
                  <span>SCROLL HORIZON</span>
                  <span className="text-[#F0B66D]">{(scrollProgress * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            5. ABOUT SECTION — HUMAN BEHIND THE SYSTEM
        ================================================================== */}
        <section id="about" className="py-28 px-6 relative border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 items-start reveal-section">
              {/* Left Column: Oversized Editorial Typography & Orbital Visual */}
              <div className="lg:col-span-6 lg:sticky lg:top-28">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-[#76E5FF] uppercase tracking-widest mb-4">
                  <span>02 // HUMAN BEHIND THE SYSTEM</span>
                </div>

                <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F3F6FA] tracking-tight leading-[1.12] mb-8">
                  Curiosity is the Engine.{' '}
                  <span className="text-[#F0B66D]">Intelligence is the Direction.</span>
                </h2>

                {/* Subtle Orbital Diagram Card */}
                <div className="p-6 rounded-2xl bg-[#11151D]/70 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#9AA5B5] mb-4">
                    <span>SYSTEM TRAJECTORY</span>
                    <span className="text-[#76E5FF]">JAIN UNIVERSITY // BCA AI</span>
                  </div>

                  <svg className="w-full h-32" viewBox="0 0 400 110">
                    <ellipse
                      cx="200"
                      cy="55"
                      rx="170"
                      ry="38"
                      fill="none"
                      stroke="rgba(118,229,255,0.22)"
                      strokeWidth="1"
                      strokeDasharray="4 6"
                    />
                    <ellipse
                      cx="200"
                      cy="55"
                      rx="110"
                      ry="24"
                      fill="none"
                      stroke="rgba(240,182,109,0.3)"
                      strokeWidth="1"
                    />
                    <circle cx="200" cy="55" r="10" fill="#07111F" stroke="#F0B66D" strokeWidth="2" />
                    <circle cx="90" cy="55" r="5" fill="#76E5FF" />
                    <text x="65" y="76" fill="#F3F6FA" fontSize="9" fontFamily="monospace">
                      AI / ML
                    </text>
                    <circle cx="310" cy="55" r="5" fill="#F0B66D" />
                    <text x="280" y="76" fill="#F3F6FA" fontSize="9" fontFamily="monospace">
                      FULL-STACK
                    </text>
                    <circle cx="200" cy="17" r="4" fill="#F3F6FA" />
                    <text x="168" y="11" fill="#9AA5B5" fontSize="9" fontFamily="monospace">
                      DATA SYSTEMS
                    </text>
                  </svg>
                </div>
              </div>

              {/* Right Column: Concise Introduction & Technical Metadata */}
              <div className="lg:col-span-6 space-y-6">
                <div className="p-7 sm:p-8 rounded-2xl bg-[#11151D]/75 border border-white/10 backdrop-blur-md space-y-5">
                  <p className="text-base sm:text-lg text-[#F3F6FA] leading-relaxed font-medium">
                    I am Nayan Choraria, a BCA Artificial Intelligence student at Jain University in
                    Bengaluru, focused on bridging machine learning concepts with reliable,
                    well-engineered software applications.
                  </p>
                  <p className="text-sm sm:text-base text-[#9AA5B5] leading-relaxed">
                    My approach to problem-solving starts with understanding the underlying data and
                    system constraints—whether that means designing FastAPI services for scam
                    indicator extraction, programming microcontroller firmware for environmental
                    sensing, or building responsive full-stack web interfaces.
                  </p>
                  <p className="text-sm sm:text-base text-[#9AA5B5] leading-relaxed">
                    I value clarity, structural maintainability, and thoughtful user interfaces that
                    make complex technology feel intuitive.
                  </p>
                </div>

                {/* Areas of Technical Interest */}
                <div className="p-7 rounded-2xl bg-[#11151D]/75 border border-white/10 backdrop-blur-md">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[#F0B66D] mb-4">
                    // AREAS OF TECHNICAL INTEREST
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {PORTFOLIO_DATA.profile.interests.map((interest, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#030407]/70 border border-white/10 flex items-start gap-3"
                      >
                        <span className="font-mono text-[11px] text-[#76E5FF] mt-0.5">
                          0{idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-[#F3F6FA]">
                          {interest}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic & Leadership Metadata */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-[#11151D]/75 border border-white/10">
                    <span className="font-mono text-[10px] text-[#76E5FF] uppercase tracking-widest block mb-1">
                      ACADEMIC FOUNDATION
                    </span>
                    <h4 className="font-display font-bold text-base text-[#F3F6FA]">
                      BCA — Artificial Intelligence
                    </h4>
                    <p className="text-xs text-[#9AA5B5] mt-1">
                      {PORTFOLIO_DATA.profile.university}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#11151D]/75 border border-white/10">
                    <span className="font-mono text-[10px] text-[#F0B66D] uppercase tracking-widest block mb-1">
                      LEADERSHIP & COMMUNITY
                    </span>
                    <h4 className="font-display font-bold text-base text-[#F3F6FA]">
                      {PORTFOLIO_DATA.profile.leadership.role} @{' '}
                      {PORTFOLIO_DATA.profile.leadership.organization}
                    </h4>
                    <p className="text-xs text-[#9AA5B5] mt-1">
                      {PORTFOLIO_DATA.profile.leadership.summary}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            6. PROJECTS SECTION — MISSION ARCHIVE
        ================================================================== */}
        <section id="projects" className="py-28 px-6 relative border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 reveal-section">
              <div>
                <div className="font-mono text-xs text-[#76E5FF] uppercase tracking-widest mb-3">
                  03 // MISSION ARCHIVE
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F3F6FA] tracking-tight">
                  Selected Engineering Work
                </h2>
              </div>
              <p className="text-sm text-[#9AA5B5] max-w-md">
                Interactive spatial archive spanning AI threat detection, IoT telemetry, commercial
                web architecture, and natural language processing.
              </p>
            </div>

            {/* Primary 4 Showcase Projects */}
            <div className="grid md:grid-cols-2 gap-7 reveal-section">
              {PORTFOLIO_DATA.featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {/* Optional Toggle for Additional Existing Portfolio Projects */}
            <div className="mt-12 text-center reveal-section">
              <button
                onClick={() => setShowExtendedArchive((prev) => !prev)}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#11151D] hover:bg-[#11151D]/90 border border-white/15 hover:border-[#76E5FF]/50 text-xs font-mono uppercase tracking-wider text-[#F3F6FA] transition-all"
              >
                <Layers size={14} className="text-[#76E5FF]" />
                <span>
                  {showExtendedArchive
                    ? 'Hide Extended Mission Logs'
                    : `Inspect Extended Mission Logs (+${PORTFOLIO_DATA.additionalArchive.length})`}
                </span>
              </button>
            </div>

            {showExtendedArchive && (
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                {PORTFOLIO_DATA.additionalArchive.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ==================================================================
            7. SKILLS SECTION — TECHNICAL ARSENAL
        ================================================================== */}
        <section id="skills" className="py-28 px-6 relative border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 reveal-section">
              <div>
                <div className="font-mono text-xs text-[#F0B66D] uppercase tracking-widest mb-3">
                  04 // TECHNICAL ARSENAL
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F3F6FA] tracking-tight">
                  System Constellation
                </h2>
              </div>
              <p className="text-sm text-[#9AA5B5] max-w-md">
                Select or hover any subsystem node to inspect active technologies and cross-domain
                architectural links.
              </p>
            </div>

            {/* Interactive System Map Grid */}
            <div className="grid lg:grid-cols-12 gap-8 items-start reveal-section">
              {/* Left 7-Node Constellation Selector */}
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3.5">
                {PORTFOLIO_DATA.skills.map((skill) => {
                  const isSelected = activeSkillCategory === skill.id;
                  const isConnected = currentSkillObj.connections?.includes(skill.id);

                  return (
                    <button
                      key={skill.id}
                      onClick={() => setActiveSkillCategory(skill.id)}
                      onMouseEnter={() => setActiveSkillCategory(skill.id)}
                      className={`text-left p-5 rounded-2xl border transition-all duration-300 backdrop-blur-md ${
                        isSelected
                          ? 'bg-[#07111F]/95 border-[#76E5FF] shadow-[0_0_25px_rgba(118,229,255,0.15)]'
                          : isConnected
                          ? 'bg-[#11151D]/80 border-[#F0B66D]/45'
                          : 'bg-[#11151D]/60 border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] mb-2">
                        <span className={isSelected ? 'text-[#76E5FF]' : 'text-[#9AA5B5]'}>
                          {skill.code}
                        </span>
                        {isSelected ? (
                          <span className="px-2 py-0.5 rounded bg-[#76E5FF]/15 text-[#76E5FF]">
                            PRIMARY NODE
                          </span>
                        ) : isConnected ? (
                          <span className="px-2 py-0.5 rounded bg-[#F0B66D]/15 text-[#F0B66D]">
                            LINKED NODE
                          </span>
                        ) : null}
                      </div>

                      <h3 className="font-display font-bold text-base text-[#F3F6FA] mb-1">
                        {skill.category}
                      </h3>
                      <p className="text-xs text-[#9AA5B5] line-clamp-2">{skill.description}</p>
                    </button>
                  );
                })}
              </div>

              {/* Right Active Node Telemetry Inspector */}
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="p-7 rounded-2xl bg-[#07111F]/90 border border-[#76E5FF]/35 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                    <div>
                      <span className="font-mono text-[10px] text-[#76E5FF] uppercase tracking-widest block">
                        ACTIVE SUBSYSTEM // {currentSkillObj.code}
                      </span>
                      <h3 className="font-display text-2xl font-bold text-[#F3F6FA] mt-1">
                        {currentSkillObj.category}
                      </h3>
                    </div>
                    <Cpu size={22} className="text-[#F0B66D]" />
                  </div>

                  <p className="text-sm text-[#9AA5B5] leading-relaxed mb-6">
                    {currentSkillObj.description}
                  </p>

                  <div className="mb-6">
                    <span className="font-mono text-[10px] text-[#9AA5B5] uppercase tracking-wider block mb-3">
                      VERIFIED TECHNOLOGIES & TOOLS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentSkillObj.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-[#030407]/90 border border-[#76E5FF]/30 font-mono text-xs text-[#F3F6FA] flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#76E5FF]" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Connected Constellation Nodes */}
                  <div className="pt-4 border-t border-white/10">
                    <span className="font-mono text-[10px] text-[#F0B66D] uppercase tracking-wider block mb-2.5">
                      INTERCONNECTED DOMAINS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentSkillObj.connections.map((connId) => {
                        const conn = PORTFOLIO_DATA.skills.find((s) => s.id === connId);
                        if (!conn) return null;
                        return (
                          <button
                            key={connId}
                            onClick={() => setActiveSkillCategory(connId)}
                            className="text-[11px] font-mono text-[#9AA5B5] hover:text-[#F0B66D] bg-white/[0.03] border border-white/10 px-2.5 py-1 rounded transition-colors"
                          >
                            ↔ {conn.category}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            9. CONTACT SECTION — ESTABLISH CONNECTION
        ================================================================== */}
        <section id="contact" className="py-32 px-6 relative border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center reveal-section">
            {/* Orbital Transceiver Emblem */}
            <div className="relative w-20 h-20 mx-auto mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#76E5FF]/30 animate-ping opacity-20" />
              <div className="w-16 h-16 rounded-2xl bg-[#11151D] border border-[#F0B66D]/45 flex items-center justify-center text-[#F0B66D] shadow-[0_0_30px_rgba(240,182,109,0.15)]">
                <Radio size={26} />
              </div>
            </div>

            <div className="font-mono text-xs text-[#76E5FF] uppercase tracking-widest mb-3">
              05 // ESTABLISH CONNECTION
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#F3F6FA] tracking-tight mb-5">
              Have an Interesting Mission?
            </h2>

            <p className="text-base sm:text-lg text-[#9AA5B5] max-w-xl mx-auto leading-relaxed mb-12">
              I'm interested in building useful technology, exploring new ideas, and collaborating
              on meaningful projects.
            </p>

            {/* Primary Contact Actions */}
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
              <button
                onClick={copyEmail}
                className="p-4 rounded-xl bg-[#11151D]/90 hover:bg-[#11151D] border border-white/15 hover:border-[#76E5FF] text-[#F3F6FA] transition-all flex items-center justify-center gap-3 group"
              >
                {copied ? (
                  <Check size={18} className="text-[#76E5FF]" />
                ) : (
                  <Mail size={18} className="text-[#F0B66D] group-hover:text-[#76E5FF] transition-colors" />
                )}
                <span className="font-mono text-xs sm:text-sm font-medium">
                  {copied ? 'Coordinates Copied to Clipboard' : PORTFOLIO_DATA.profile.email}
                </span>
              </button>

              <a
                href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                className="p-4 rounded-xl bg-[#F3F6FA] hover:bg-[#76E5FF] text-[#030407] font-display font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Transmit Direct Email</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            {/* Social & Optional Resume Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 max-w-2xl mx-auto">
              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#11151D]/75 border border-white/10 hover:border-[#76E5FF]/50 text-xs font-mono text-[#F3F6FA] flex items-center gap-2.5 transition-all"
              >
                <Github size={16} className="text-[#76E5FF]" />
                <span>GitHub // nayan2452005</span>
                <ArrowUpRight size={13} className="opacity-60" />
              </a>

              <a
                href={PORTFOLIO_DATA.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#11151D]/75 border border-white/10 hover:border-[#F0B66D]/50 text-xs font-mono text-[#F3F6FA] flex items-center gap-2.5 transition-all"
              >
                <Linkedin size={16} className="text-[#F0B66D]" />
                <span>LinkedIn // Nayan Choraria</span>
                <ArrowUpRight size={13} className="opacity-60" />
              </a>

              {PORTFOLIO_DATA.profile.resumeUrl && (
                <a
                  href={PORTFOLIO_DATA.profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#11151D]/75 border border-white/10 hover:border-[#F3F6FA]/50 text-xs font-mono text-[#F3F6FA] flex items-center gap-2.5 transition-all"
                >
                  <FileText size={16} className="text-[#F3F6FA]" />
                  <span>Download Resume</span>
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================================
          8. TARS-INSPIRED INTERACTIVE MECHANICAL ASSISTANT
      ==================================================================== */}
      {!isTarsDismissed && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
          {/* Compact Docked TARS Monolith Readout */}
          {!isTarsExpanded && (
            <div className="flex items-center gap-3 p-2.5 pl-3.5 rounded-2xl bg-[#11151D]/95 border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl max-w-xs sm:max-w-sm">
              {/* Segmented 4-Slab Mechanical Form */}
              <button
                onClick={() => setIsTarsExpanded(true)}
                className="flex items-center gap-3 text-left group"
                title="Expand TARS Interface"
              >
                <div className="w-7 h-9 bg-[#030407] border border-white/15 p-1 grid grid-cols-4 gap-0.5 items-center shrink-0">
                  <span className="h-full bg-[#9AA5B5] group-hover:bg-[#76E5FF] transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <span className="h-4/5 bg-[#F3F6FA] group-hover:translate-y-0.5 transition-transform duration-300" />
                  <span className="h-full bg-[#9AA5B5] group-hover:-translate-y-0.5 transition-transform duration-300" />
                  <span className="h-full bg-[#F0B66D]" />
                </div>

                <div className="pr-1">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[#F0B66D] uppercase tracking-wider">
                    <span>TARS UNIT // READY</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#76E5FF] animate-pulse" />
                  </div>
                  <p className="font-mono text-[11px] text-[#F3F6FA] line-clamp-1 mt-0.5">
                    {tarsStatusReadout}
                  </p>
                </div>
              </button>

              <button
                onClick={() => setIsTarsExpanded(true)}
                className="p-2 rounded-lg bg-white/5 hover:bg-[#76E5FF]/20 text-[#76E5FF] transition-colors"
                aria-label="Open TARS Chat"
              >
                <MessageSquare size={14} />
              </button>

              <button
                onClick={() => setIsTarsDismissed(true)}
                className="p-1.5 rounded-lg text-[#9AA5B5] hover:text-[#F3F6FA] transition-colors"
                aria-label="Dismiss TARS Assistant"
                title="Dismiss TARS"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Expanded TARS Mechanical Modal Interface */}
      {isTarsExpanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="TARS Interactive Assistant"
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/75 backdrop-blur-md"
        >
          <div
            className="fixed inset-0"
            onClick={() => setIsTarsExpanded(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-xl rounded-2xl bg-[#07111F] border border-[#76E5FF]/35 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
            {/* Mechanical Header */}
            <div className="px-5 py-3.5 bg-[#11151D] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#030407] border border-white/15 p-0.5 grid grid-cols-4 gap-0.5">
                  <span className="bg-[#76E5FF]" />
                  <span className="bg-[#F3F6FA]" />
                  <span className="bg-[#9AA5B5]" />
                  <span className="bg-[#F0B66D]" />
                </div>
                <div>
                  <span className="font-mono text-xs font-semibold text-[#F3F6FA] tracking-wider uppercase block">
                    TARS // SEGMENTED TELEMETRY ASSISTANT
                  </span>
                  <span className="font-mono text-[10px] text-[#76E5FF] block">
                    {tarsStatusReadout}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsTarsExpanded(false)}
                className="p-1.5 rounded-lg bg-white/5 text-[#9AA5B5] hover:text-[#F3F6FA]"
                aria-label="Minimize TARS Modal"
              >
                <Minimize2 size={15} />
              </button>
            </div>

            {/* Honesty & Humor Calibration Sliders */}
            <div className="px-5 py-2.5 bg-[#030407]/80 border-b border-white/10 grid grid-cols-2 gap-4 font-mono text-[10px]">
              <label className="flex items-center gap-2 text-[#9AA5B5]">
                <span>HONESTY:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={honesty}
                  onChange={(e) => setHonesty(Number(e.target.value))}
                  className="w-full accent-[#76E5FF] h-1 bg-white/10 rounded"
                />
                <span className="text-[#76E5FF] w-8 text-right">{honesty}%</span>
              </label>

              <label className="flex items-center gap-2 text-[#9AA5B5]">
                <span>HUMOR:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={humor}
                  onChange={(e) => setHumor(Number(e.target.value))}
                  className="w-full accent-[#F0B66D] h-1 bg-white/10 rounded"
                />
                <span className="text-[#F0B66D] w-8 text-right">{humor}%</span>
              </label>
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="px-5 py-2 bg-[#07111F] border-b border-white/5 flex flex-wrap gap-1.5">
              {[
                'Summarize Nayan’s 4 core projects',
                'What is his AI/ML stack?',
                'Tell me about Jain University BCA AI'
              ].map((promptText, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setAiInput(promptText)}
                  className="text-[10px] font-mono text-[#9AA5B5] hover:text-[#76E5FF] bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 px-2.5 py-1 rounded transition-colors"
                >
                  {promptText}
                </button>
              ))}
            </div>

            {/* Message Log */}
            <div className="p-5 max-h-[45vh] overflow-y-auto space-y-3.5 font-mono text-xs">
              {aiMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border ${
                    msg.role === 'user'
                      ? 'bg-[#11151D] border-white/15 ml-8 text-[#F3F6FA]'
                      : 'bg-[#030407]/85 border-[#76E5FF]/25 mr-6 text-[#F3F6FA]'
                  }`}
                >
                  <div className="text-[9px] uppercase tracking-widest mb-1 text-[#9AA5B5]">
                    {msg.role === 'user' ? 'OPERATOR // QUERY' : 'TARS // RESPONSE'}
                  </div>
                  <p className="leading-relaxed font-sans text-xs sm:text-sm">{msg.content}</p>
                </div>
              ))}
              {isAiLoading && (
                <div className="p-3.5 rounded-xl bg-[#030407]/80 border border-[#F0B66D]/30 mr-6 flex items-center gap-2.5 text-xs font-mono text-[#F0B66D]">
                  <Loader2 size={14} className="animate-spin" />
                  <span>ANALYZING ARCHIVE TELEMETRY...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleAiSubmit}
              className="p-3 bg-[#030407] border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask TARS about projects, skills, or contact coordinates..."
                className="flex-1 bg-[#11151D] border border-white/10 focus:border-[#76E5FF] rounded-xl px-3.5 py-2.5 text-xs text-[#F3F6FA] placeholder:text-[#9AA5B5]/60 focus:outline-none font-mono"
                autoFocus
              />
              <button
                type="submit"
                disabled={isAiLoading || !aiInput.trim()}
                className="px-4 py-2.5 rounded-xl bg-[#76E5FF] text-[#030407] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#F3F6FA] disabled:opacity-40 transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ====================================================================
          FOOTER
      ==================================================================== */}
      <footer className="relative z-10 py-8 px-6 border-t border-white/10 bg-[#030407]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#9AA5B5]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F0B66D]" />
            <span>© {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}</span>
          </div>
          <div>
            <span>BCA ARTIFICIAL INTELLIGENCE // JAIN UNIVERSITY, BENGALURU</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
