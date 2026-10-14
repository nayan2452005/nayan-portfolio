import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowUpRight, Github, Linkedin, Menu, X,
  Cpu, Mail, Check, Terminal,
  ChevronRight, Loader2, Radio,
  Layers, FileText, Minimize2, MessageSquare, Globe
} from 'lucide-react';

// ============================================================================
// EDITABLE PORTFOLIO CONFIGURATION
// ============================================================================
const PORTFOLIO_DATA = {
  profile: {
    name: "Nayan Choraria",
    role: "BCA Artificial Intelligence Student",
    university: "Jain University, Bengaluru",
    location: "Bengaluru, India",
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
  // Deployed projects with live links are listed first
  featuredProjects: [
    {
      id: "sri-balaji-distributors",
      status: "Live Website",
      title: "Sri Balaji Distributors Website",
      category: "Full-Stack Web Development",
      visualType: "distributor",
      description:
        "A modern, responsive business website built for an auto-electrical spare parts wholesale distributor. Features a clean landing experience, brand marquee, and scalable component architecture.",
      tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Responsive Design"],
      github: "https://github.com/nayan2452005",
      live: "https://sri-balaji-distributors.onrender.com"
    },
    {
      id: "honeypot-scam-detection",
      status: "Live API",
      title: "Honeypot Scam Detection",
      category: "AI & Backend Systems",
      visualType: "honeypot",
      description:
        "An AI-assisted backend service designed to detect suspicious conversations and extract scam-related indicators using structured FastAPI endpoints and behavioral checks.",
      tech: ["Python", "FastAPI", "Swagger UI", "Postman", "REST API"],
      github: "https://github.com/nayan2452005",
      live: "https://agentic-honeypot-a41c.onrender.com/docs"
    },
    {
      id: "aqi-monitor-dashboard",
      status: "Hardware & IoT",
      title: "AQI Monitor Dashboard",
      category: "IoT & Embedded Systems",
      visualType: "aqi",
      description:
        "An IoT-based air quality monitoring system built with an MQ135 gas sensor and Arduino microcontroller to measure gas levels in real time and trigger threshold buzzer alerts.",
      tech: ["Arduino IDE", "MQ135 Sensor", "C / C++", "Circuit Design", "Real-Time Alerts"],
      github: "https://github.com/nayan2452005",
      live: ""
    },
    {
      id: "sentiment-analysis-nlp",
      status: "Machine Learning",
      title: "Social Media Sentiment Analysis",
      category: "Machine Learning & NLP",
      visualType: "sentiment",
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
      status: "Live Website",
      title: "Personal Developer Portfolio",
      category: "Frontend Architecture",
      visualType: "portfolio",
      description:
        "Interactive personal portfolio built with React, Vite, and custom 3D canvas rendering, optimized for smooth performance and deployed on Render.",
      tech: ["React.js", "TypeScript", "Vite", "Tailwind CSS", "Render"],
      github: "https://github.com/nayan2452005",
      live: "https://nayan-portfolio-rrb8.onrender.com"
    },
    {
      id: "ai-tally-analytics",
      status: "In Development",
      title: "AI Tally Business Analytics",
      category: "AI Financial Application",
      visualType: "tally",
      description:
        "A Tally-style business analytics web app with Appwrite authentication, interactive Recharts dashboards (revenue, profit, GST, debtors), and Groq LLaMA insights.",
      tech: ["React", "TypeScript", "Vite", "Recharts", "Appwrite", "Groq API"],
      github: "https://github.com/nayan2452005",
      live: ""
    },
    {
      id: "reachinbox-scheduler",
      status: "Full-Stack",
      title: "ReachInbox – Email Scheduler",
      category: "Full-Stack Web Platform",
      visualType: "reachinbox",
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
      category: "AI & Machine Learning",
      description: "Building intelligent workflows, NLP classification models, and LLM-powered applications.",
      items: ["Machine Learning", "Natural Language Processing", "Sentiment & Sarcasm Detection", "Groq API (LLaMA)", "AI Application Integration"],
      connections: ["languages", "data-analysis", "backend"]
    },
    {
      id: "languages",
      category: "Programming Languages",
      description: "Core languages used across web applications, backend APIs, and microcontroller programming.",
      items: ["Python", "TypeScript", "JavaScript (ES6+)", "C / C++", "Java", "SQL"],
      connections: ["ai-ml", "frontend", "backend"]
    },
    {
      id: "frontend",
      category: "Frontend Development",
      description: "Creating responsive, accessible, and clean user interfaces with modern React tooling.",
      items: ["React.js", "Next.js", "Tailwind CSS", "Bootstrap", "Vite", "HTML5 & CSS3"],
      connections: ["languages", "backend", "tools"]
    },
    {
      id: "backend",
      category: "Backend Development",
      description: "Designing REST APIs, authentication flows, and scalable server-side logic.",
      items: ["FastAPI", "Node.js", "Express.js", "RESTful APIs", "Google OAuth 2.0", "Appwrite"],
      connections: ["languages", "databases", "ai-ml"]
    },
    {
      id: "databases",
      category: "Databases",
      description: "Relational schema modeling, data persistence, and cloud database integration.",
      items: ["PostgreSQL", "SQL Databases", "Appwrite Database", "Firebase"],
      connections: ["backend", "data-analysis"]
    },
    {
      id: "data-analysis",
      category: "Data Analysis & Visualization",
      description: "Turning financial metrics and sensor readings into clear, interactive visual dashboards.",
      items: ["Recharts", "KPI Dashboards", "IoT Sensor Data", "Forecasting Workflows", "Data Visualization"],
      connections: ["ai-ml", "databases"]
    },
    {
      id: "tools",
      category: "Development Tools",
      description: "Everyday workflow tools for version control, API testing, hardware setup, and deployment.",
      items: ["Git & GitHub", "Postman", "Swagger UI / OpenAPI", "Arduino IDE", "Render"],
      connections: ["frontend", "backend"]
    }
  ]
};

// ============================================================================
// 3D GARGANTUA BLACK HOLE & STARFIELD CANVAS
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

    const starCount = isMobile ? 95 : 210;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random() * 0.85 + 0.15,
      size: Math.random() * 1.25 + 0.35,
      hue: Math.random() > 0.8 ? 'cyan' : Math.random() > 0.55 ? 'amber' : 'white',
      twinkleOffset: Math.random() * Math.PI * 2
    }));

    const diskCount = isMobile ? 150 : 340;
    const diskParticles = Array.from({ length: diskCount }, () => {
      const radiusNorm = Math.pow(Math.random(), 1.45);
      return {
        r: 1.18 + radiusNorm * 2.45,
        angle: Math.random() * Math.PI * 2,
        speed: (0.004 + Math.random() * 0.0038) / Math.pow(1 + radiusNorm, 1.15),
        thickness: (Math.random() - 0.5) * 0.13,
        alpha: 0.22 + (1 - radiusNorm) * 0.62,
        size: 0.9 + (1 - radiusNorm) * 2.0,
        temp: Math.random()
      };
    });

    let time = 0;

    const render = () => {
      time += reducedMotion ? 0.001 : 0.011;

      const st = stateRef.current;
      st.scroll += (st.targetScroll - st.scroll) * 0.06;
      st.mouseX += (st.targetMouseX - st.mouseX) * 0.05;
      st.mouseY += (st.targetMouseY - st.mouseY) * 0.05;

      const s = st.scroll;

      const bgGrad = ctx.createRadialGradient(
        width * (0.5 + st.mouseX * 0.04),
        height * (0.44 - s * 0.16),
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

      const bhX = width * (isMobile ? 0.5 : 0.66 - s * 0.15) + st.mouseX * 24;
      const bhY = height * (isMobile ? 0.35 : 0.47 - s * 0.12) + st.mouseY * 16;
      const baseRadius = Math.min(width, height) * (isMobile ? 0.125 : 0.14);
      const scaleFactor = 1 + Math.sin(s * Math.PI) * 0.18 - s * 0.1;
      const rs = baseRadius * scaleFactor;

      const diskTilt = 0.23 + s * 0.16 + st.mouseY * 0.035;
      const diskRoll = -0.18 + s * 0.14 + st.mouseX * 0.025;
      const cosRoll = Math.cos(diskRoll);
      const sinRoll = Math.sin(diskRoll);

      // 1. Starfield with subtle gravitational lensing near the black hole
      const einsteinRadiusSq = rs * rs * (2.5 + Math.sin(s * Math.PI) * 0.7);
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const parallaxY = ((star.y + 1) * 0.5 * height - s * height * (0.55 / star.z)) % height;
        const rawY = parallaxY < 0 ? parallaxY + height : parallaxY;
        const rawX = ((star.x + 1) * 0.5 * width - st.mouseX * (15 / star.z) + width) % width;

        const dx = rawX - bhX;
        const dy = rawY - bhY;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < rs * 1.02) continue;

        const deflection = einsteinRadiusSq / Math.max(distSq, rs * rs);
        const lensedX = rawX + dx * deflection * 0.5;
        const lensedY = rawY + dy * deflection * 0.5;

        const twinkle = 0.6 + 0.4 * Math.sin(time * 1.4 + star.twinkleOffset);
        const alpha = Math.min(1, (0.28 + (1 - star.z) * 0.6) * twinkle);

        if (star.hue === 'cyan') {
          ctx.fillStyle = `rgba(118, 229, 255, ${alpha})`;
        } else if (star.hue === 'amber') {
          ctx.fillStyle = `rgba(240, 182, 109, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(243, 246, 250, ${alpha})`;
        }

        ctx.beginPath();
        ctx.arc(lensedX, lensedY, star.size * (1 + deflection * 0.3), 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Ambient Halo Glow
      const outerGlow = ctx.createRadialGradient(bhX, bhY, rs * 0.85, bhX, bhY, rs * 4.0);
      outerGlow.addColorStop(0, 'rgba(240, 182, 109, 0.2)');
      outerGlow.addColorStop(0.35, 'rgba(118, 229, 255, 0.07)');
      outerGlow.addColorStop(0.65, 'rgba(7, 17, 31, 0.15)');
      outerGlow.addColorStop(1, 'rgba(3, 4, 7, 0)');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(bhX, bhY, rs * 4.0, 0, Math.PI * 2);
      ctx.fill();

      // 3. Gravitational Lensed Upper & Lower Rings
      ctx.save();
      ctx.translate(bhX, bhY);
      ctx.rotate(diskRoll);

      const upperRingGrad = ctx.createRadialGradient(0, -rs * 0.18, rs * 0.9, 0, 0, rs * 1.9);
      upperRingGrad.addColorStop(0, 'rgba(243, 246, 250, 0)');
      upperRingGrad.addColorStop(0.5, 'rgba(240, 182, 109, 0.3)');
      upperRingGrad.addColorStop(0.72, 'rgba(118, 229, 255, 0.14)');
      upperRingGrad.addColorStop(1, 'rgba(3, 4, 7, 0)');

      ctx.strokeStyle = upperRingGrad;
      ctx.lineWidth = rs * 0.26;
      ctx.beginPath();
      ctx.ellipse(0, 0, rs * 1.4, rs * 1.16, 0, Math.PI * 1.04, Math.PI * 1.96);
      ctx.stroke();

      ctx.lineWidth = rs * 0.16;
      ctx.beginPath();
      ctx.ellipse(0, 0, rs * 1.35, rs * 1.1, 0, Math.PI * 0.06, Math.PI * 0.94);
      ctx.stroke();
      ctx.restore();

      // 4. Accretion Disk Particles
      const drawDiskHalf = (isFront) => {
        for (let i = 0; i < diskParticles.length; i++) {
          const p = diskParticles[i];
          if (!reducedMotion) {
            p.angle = (p.angle + p.speed * (1 + s * 0.45)) % (Math.PI * 2);
          }
          const sinA = Math.sin(p.angle);
          if ((isFront && sinA < 0) || (!isFront && sinA >= 0)) continue;

          const cosA = Math.cos(p.angle);
          const orbitR = p.r * rs;

          const lx = cosA * orbitR;
          let ly = sinA * orbitR * diskTilt + p.thickness * rs;

          if (!isFront) {
            const warpFactor = Math.exp(-Math.abs(cosA) * 1.6) * (1.3 / p.r);
            ly -= warpFactor * rs * 0.9;
          }

          const screenX = bhX + lx * cosRoll - ly * sinRoll;
          const screenY = bhY + lx * sinRoll + ly * cosRoll;

          const doppler = 1 - cosA * 0.35;
          const alpha = Math.min(0.92, p.alpha * doppler);

          if (cosA < -0.25 && p.temp > 0.45) {
            ctx.fillStyle = `rgba(118, 229, 255, ${alpha})`;
          } else if (cosA < 0.1 && p.temp > 0.65) {
            ctx.fillStyle = `rgba(243, 246, 250, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(240, 182, 109, ${alpha})`;
          }

          ctx.save();
          ctx.translate(screenX, screenY);
          ctx.rotate(diskRoll + Math.atan2(cosA * diskTilt, -sinA));
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * (2.5 + doppler), p.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      };

      drawDiskHalf(false);

      // 5. Event Horizon Shadow
      ctx.save();
      ctx.beginPath();
      ctx.arc(bhX, bhY, rs, 0, Math.PI * 2);
      ctx.fillStyle = '#020305';
      ctx.shadowColor = 'rgba(240, 182, 109, 0.6)';
      ctx.shadowBlur = 24;
      ctx.fill();
      ctx.restore();

      const photonGrad = ctx.createLinearGradient(bhX - rs, bhY, bhX + rs, bhY);
      photonGrad.addColorStop(0, 'rgba(118, 229, 255, 0.8)');
      photonGrad.addColorStop(0.45, 'rgba(243, 246, 250, 0.85)');
      photonGrad.addColorStop(1, 'rgba(240, 182, 109, 0.5)');
      ctx.strokeStyle = photonGrad;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(bhX, bhY, rs * 1.02, 0, Math.PI * 2);
      ctx.stroke();

      // 6. Front Accretion Band
      ctx.save();
      ctx.translate(bhX, bhY);
      ctx.rotate(diskRoll);
      const planeGrad = ctx.createLinearGradient(-rs * 3.3, 0, rs * 3.3, 0);
      planeGrad.addColorStop(0, 'rgba(118, 229, 255, 0)');
      planeGrad.addColorStop(0.22, 'rgba(118, 229, 255, 0.22)');
      planeGrad.addColorStop(0.42, 'rgba(243, 246, 250, 0.48)');
      planeGrad.addColorStop(0.68, 'rgba(240, 182, 109, 0.3)');
      planeGrad.addColorStop(1, 'rgba(240, 182, 109, 0)');
      ctx.fillStyle = planeGrad;
      ctx.beginPath();
      ctx.ellipse(0, rs * 0.08, rs * 3.2, rs * diskTilt * 0.5, 0, 0, Math.PI);
      ctx.fill();
      ctx.restore();

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
// CLEAN PROJECT VISUAL PREVIEWS
// ============================================================================
function ProjectVisual({ type }) {
  if (type === 'distributor') {
    return (
      <div className="relative w-full h-44 bg-[#07111F]/90 border-b border-white/10 overflow-hidden p-4 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="text-[#F0B66D]">SRI BALAJI DISTRIBUTORS</span>
          <span className="text-[#76E5FF] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#76E5FF]" /> LIVE
          </span>
        </div>

        <div className="my-auto space-y-2">
          <div className="grid grid-cols-3 gap-2">
            {['Starters & Alternators', 'Wiring & Relays', 'OEM Spare Parts'].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#030407]/85 border border-white/10 p-2.5 rounded-lg flex flex-col justify-between h-14"
              >
                <div className="w-4 h-1 bg-[#F0B66D]/80 rounded-full" />
                <span className="text-[9px] font-medium text-[#F3F6FA] leading-tight">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-[#030407]/70 border border-white/5 px-3 py-1.5 rounded-lg flex items-center justify-between text-[10px] font-mono text-[#9AA5B5]">
            <span>Wholesale Brand Showcase</span>
            <span className="text-[#F3F6FA]">Responsive Web</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'honeypot') {
    return (
      <div className="relative w-full h-44 bg-[#07111F]/90 border-b border-white/10 overflow-hidden p-4 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#9AA5B5]">
          <span className="text-[#76E5FF]">FASTAPI SERVICE</span>
          <span className="px-2 py-0.5 bg-[#F0B66D]/15 text-[#F0B66D] border border-[#F0B66D]/30 rounded">
            SCAM INDICATOR FLAGGED
          </span>
        </div>

        <svg className="w-full h-16 overflow-visible" viewBox="0 0 320 65">
          <defs>
            <linearGradient id="threatWaveClean" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#76E5FF" stopOpacity="0.25" />
              <stop offset="55%" stopColor="#76E5FF" stopOpacity="0.85" />
              <stop offset="80%" stopColor="#F0B66D" stopOpacity="1" />
              <stop offset="100%" stopColor="#F0B66D" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path
            d="M 0 45 Q 35 42, 65 44 T 125 36 T 175 42 T 215 14 T 255 24 T 320 35"
            fill="none"
            stroke="url(#threatWaveClean)"
            strokeWidth="2"
          />
          <circle cx="125" cy="36" r="3" fill="#76E5FF" />
          <circle cx="215" cy="14" r="4" fill="#F0B66D" />
          <text x="223" y="17" fill="#F0B66D" fontSize="8" fontFamily="monospace">
            Suspicious Pattern
          </text>
        </svg>

        <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
          <div className="bg-[#030407]/80 border border-white/5 px-2.5 py-1 rounded">
            <span className="text-[#9AA5B5] block text-[8px]">FORMAT</span>
            <span className="text-[#F3F6FA]">JSON API</span>
          </div>
          <div className="bg-[#030407]/80 border border-white/5 px-2.5 py-1 rounded">
            <span className="text-[#9AA5B5] block text-[8px]">DOCS</span>
            <span className="text-[#76E5FF]">Swagger UI</span>
          </div>
          <div className="bg-[#030407]/80 border border-white/5 px-2.5 py-1 rounded">
            <span className="text-[#9AA5B5] block text-[8px]">TESTING</span>
            <span className="text-[#F0B66D]">Postman</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'aqi') {
    return (
      <div className="relative w-full h-44 bg-[#07111F]/90 border-b border-white/10 overflow-hidden p-4 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="text-[#76E5FF]">MQ135 GAS SENSOR</span>
          <span className="text-[#9AA5B5]">REAL-TIME MONITOR</span>
        </div>

        <div className="flex items-center justify-center gap-6 my-auto">
          <div className="relative w-20 h-20 flex items-center justify-center">
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
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-mono">
              <span className="text-xs font-bold text-[#F3F6FA]">AQI</span>
              <span className="text-[8px] text-[#76E5FF]">ACTIVE</span>
            </div>
          </div>

          <div className="flex-1 space-y-1.5 font-mono text-[10px]">
            <div className="flex justify-between items-center border-b border-white/5 pb-1">
              <span className="text-[#9AA5B5]">Sensor</span>
              <span className="text-[#76E5FF]">MQ135</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-1">
              <span className="text-[#9AA5B5]">Microcontroller</span>
              <span className="text-[#F3F6FA]">Arduino IDE</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#9AA5B5]">Safety Alert</span>
              <span className="text-[#F0B66D]">Buzzer Threshold</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'sentiment') {
    return (
      <div className="relative w-full h-44 bg-[#07111F]/90 border-b border-white/10 overflow-hidden p-4 flex flex-col justify-between select-none">
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span className="text-[#76E5FF]">NLP CLASSIFICATION</span>
          <span className="text-[#F0B66D]">SARCASM DETECTION</span>
        </div>

        <div className="my-auto space-y-2 font-mono text-[10px]">
          <div className="bg-[#030407]/85 border border-white/10 p-2 rounded-lg flex items-center justify-between">
            <span className="text-[#9AA5B5] truncate pr-2">"Oh great, another delay right on schedule..."</span>
            <span className="px-2 py-0.5 text-[9px] bg-[#F0B66D]/15 text-[#F0B66D] border border-[#F0B66D]/40 rounded shrink-0">
              Sarcastic
            </span>
          </div>
          <div className="bg-[#030407]/85 border border-white/10 p-2 rounded-lg flex items-center justify-between">
            <span className="text-[#9AA5B5] truncate pr-2">"The new update improved overall speed."</span>
            <span className="px-2 py-0.5 text-[9px] bg-[#76E5FF]/15 text-[#76E5FF] border border-[#76E5FF]/40 rounded shrink-0">
              Positive
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-[#9AA5B5]">
          <span>Text Processing</span>
          <span className="text-[#F3F6FA]">Polarity & Context</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-36 bg-[#07111F]/80 border-b border-white/10 overflow-hidden p-4 flex flex-col justify-between select-none">
      <div className="flex items-center justify-between text-[10px] font-mono text-[#9AA5B5]">
        <span className="text-[#76E5FF]">WEB APPLICATION</span>
        <span>FULL-STACK</span>
      </div>
      <div className="my-auto flex items-center gap-3">
        <div className="flex-1 h-12 bg-[#030407]/80 border border-white/10 rounded-lg p-2 flex items-end gap-1.5">
          {[40, 75, 55, 90, 65, 95, 80].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded-t ${i % 2 === 0 ? 'bg-[#76E5FF]/60' : 'bg-[#F0B66D]/60'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3D TILT PROJECT CARD
// ============================================================================
function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const isLive = Boolean(project.live);

  const handlePointerMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

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
          <div className="flex items-center justify-between gap-2 text-xs font-mono mb-3">
            <span className="text-[#9AA5B5]">{project.category}</span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] border ${
                isLive
                  ? 'bg-[#76E5FF]/10 text-[#76E5FF] border-[#76E5FF]/30'
                  : 'bg-white/[0.04] text-[#9AA5B5] border-white/10'
              }`}
            >
              {project.status}
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
          <span>GitHub</span>
        </a>

        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#F0B66D] hover:text-[#76E5FF] transition-colors"
          >
            <Globe size={13} />
            <span>Live Demo</span>
            <ArrowUpRight size={14} />
          </a>
        ) : (
          <span className="text-[11px] font-mono text-[#9AA5B5]/60">
            Code Repository
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
        "Hi! I'm TARS, Nayan's portfolio assistant. Ask me about his live projects, AI & full-stack skills, or his studies at Jain University."
    }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef(null);

  const tarsStatusReadout = useMemo(() => {
    switch (activeSection) {
      case 'home':
        return 'System ready. Ask me anything.';
      case 'about':
        return 'Viewing background & education.';
      case 'projects':
        return 'Exploring projects. Click a live demo to test.';
      case 'skills':
        return 'Viewing technical skills & tools.';
      case 'contact':
        return 'Ready to connect.';
      default:
        return 'System ready.';
    }
  }, [activeSection]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    document.documentElement.style.scrollBehavior = 'smooth';

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    const handlePointerMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: nx, y: ny });
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
      setScrollProgress(progress);
      setIsCompactNav(scrollTop > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

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

  const generateLocalTarsResponse = (query) => {
    const q = query.toLowerCase();
    if (q.includes('project') || q.includes('work') || q.includes('live') || q.includes('balaji') || q.includes('honeypot') || q.includes('aqi') || q.includes('sentiment')) {
      return `Nayan's deployed projects include the Sri Balaji Distributors Website (live on Render) and the Honeypot Scam Detection API (FastAPI). He has also built an IoT AQI Monitor Dashboard, a Social Media Sentiment Analysis NLP model, an AI Tally Analytics app, and ReachInbox.`;
    }
    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language')) {
      return `Nayan works with Python, TypeScript, JavaScript, C/C++, React, Next.js, FastAPI, Node.js, PostgreSQL, Appwrite, and Machine Learning/NLP tools.`;
    }
    if (q.includes('education') || q.includes('university') || q.includes('student') || q.includes('about') || q.includes('who')) {
      return `Nayan Choraria is a BCA Artificial Intelligence student at Jain University in Bengaluru, focusing on AI applications and full-stack software development.`;
    }
    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach')) {
      return `You can reach Nayan directly at ${PORTFOLIO_DATA.profile.email}, or connect with him on GitHub (@nayan2452005) and LinkedIn.`;
    }
    return `Nayan Choraria is a BCA AI student at Jain University building AI applications and full-stack web systems. Feel free to ask about his Sri Balaji Distributors website, Honeypot Scam Detection API, AQI Monitor, or technical skills!`;
  };

  // Supports Groq API (VITE_GROQ_API_KEY), custom backend proxy (VITE_AI_PROXY_URL), or Gemini fallback
  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const userText = aiInput.trim();
    setAiMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setAiInput('');
    setIsAiLoading(true);

    const systemPrompt = `You are TARS, the helpful and witty assistant on Nayan Choraria's personal portfolio website.
Settings: Honesty ${honesty}%, Humor ${humor}%.
About Nayan Choraria:
- Role: BCA Artificial Intelligence Student at Jain University, Bengaluru, India.
- Leadership: Past Joint Secretary at Marwari Yuva Manch.
- Featured Projects:
  1. Sri Balaji Distributors Website (Live: https://sri-balaji-distributors.onrender.com) - Responsive wholesale business portal built with React, TypeScript, Vite, Tailwind.
  2. Honeypot Scam Detection (Live API Docs: https://agentic-honeypot-a41c.onrender.com/docs) - AI-assisted FastAPI backend for detecting suspicious conversations and extracting scam indicators.
  3. AQI Monitor Dashboard - IoT air quality system using Arduino IDE, MQ135 gas sensor, C++, and buzzer alerts.
  4. Social Media Sentiment Analysis - Machine learning/NLP project for sentiment classification and sarcasm detection.
- Additional Projects: AI Tally Business Analytics (React, Recharts, Appwrite, Groq API) and ReachInbox Email Scheduler (Next.js, Node.js, PostgreSQL, OAuth).
Keep answers clear, friendly, and concise (2 to 3 sentences max). Do not invent fake experience or metrics.`;

    try {
      const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
      const groqKey = env.VITE_GROQ_API_KEY || '';
      const proxyUrl = env.VITE_AI_PROXY_URL || '';
      const geminiKey = env.VITE_GEMINI_API_KEY || '';

      // 1. Primary: Groq API (LLaMA 3.3 70B)
      if (groqKey) {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${groqKey}`
          },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userText }
            ],
            temperature: 0.6,
            max_tokens: 220
          })
        });

        if (!res.ok) throw new Error('Groq API request failed');
        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content?.trim() || generateLocalTarsResponse(userText);
        setAiMessages((prev) => [...prev, { role: 'ai', content: reply }]);
        return;
      }

      // 2. Secondary: Custom Proxy or Gemini API
      if (proxyUrl || geminiKey) {
        const endpoint =
          proxyUrl ||
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${geminiKey}`;

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
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || generateLocalTarsResponse(userText);
        setAiMessages((prev) => [...prev, { role: 'ai', content: reply }]);
        return;
      }

      // 3. Built-in Local Fallback
      await new Promise((r) => setTimeout(r, 400));
      setAiMessages((prev) => [
        ...prev,
        { role: 'ai', content: generateLocalTarsResponse(userText) }
      ]);
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
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
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
            rgba(118, 229, 255, 0.08),
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

        .reveal-section {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
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

      {/* 3D Gargantua Black Hole & Starfield Background */}
      <GargantuaCanvas
        scrollProgress={scrollProgress}
        mousePos={mousePos}
        reducedMotion={reducedMotion}
      />

      {/* Subtle Orbital Lines */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-25"
      >
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <ellipse
            cx="940"
            cy={420 - scrollProgress * 140}
            rx={560 + scrollProgress * 110}
            ry={210 + scrollProgress * 40}
            fill="none"
            stroke="rgba(118, 229, 255, 0.12)"
            strokeWidth="1"
            strokeDasharray="6 10"
          />
        </svg>
      </div>

      {/* ====================================================================
          NAVIGATION BAR
      ==================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
        <nav
          aria-label="Primary Navigation"
          className={`pointer-events-auto w-full max-w-6xl rounded-2xl border border-white/10 bg-[#030407]/75 backdrop-blur-xl transition-all duration-300 flex items-center justify-between ${
            isCompactNav ? 'py-2.5 px-5 shadow-[0_10px_30px_rgba(0,0,0,0.75)]' : 'py-3.5 px-6'
          }`}
        >
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
              <span className="font-mono text-[10px] text-[#9AA5B5] block mt-1">
                AI & Full-Stack Portfolio
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1 bg-[#11151D]/70 border border-white/5 rounded-xl p-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#76E5FF]/15 text-[#76E5FF] border border-[#76E5FF]/30'
                      : 'text-[#9AA5B5] hover:text-[#F3F6FA] hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#11151D] border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#76E5FF] animate-pulse" />
              <span className="font-mono text-[10px] text-[#9AA5B5]">
                Available for Projects
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
              <span>Ask TARS</span>
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

        {isMenuOpen && (
          <div className="pointer-events-auto fixed inset-x-4 top-20 rounded-2xl bg-[#07111F]/95 border border-white/15 backdrop-blur-2xl p-6 md:hidden shadow-2xl z-50">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg hover:bg-white/5 text-base font-display font-medium text-[#F3F6FA]"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsTarsDismissed(false);
                  setIsTarsExpanded(true);
                }}
                className="mt-3 w-full py-3 rounded-xl bg-[#F0B66D] text-[#030407] font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Terminal size={14} /> Ask TARS Assistant
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ====================================================================
          MAIN CONTENT
      ==================================================================== */}
      <main className="relative z-10">
        {/* ==================================================================
            HERO SECTION
        ================================================================== */}
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center px-6 pt-28 pb-20 relative"
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="max-w-3xl reveal-section reveal-visible">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#11151D]/80 border border-white/10 backdrop-blur-md mb-8">
                <span className="w-2 h-2 rounded-full bg-[#F0B66D]" />
                <span className="font-mono text-xs text-[#F3F6FA]">
                  {PORTFOLIO_DATA.profile.role} · {PORTFOLIO_DATA.profile.university}
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
                  <Mail size={15} className="text-[#F0B66D]" />
                  <span>Initialize Contact</span>
                </a>
              </div>

              {/* Clean Quick-Facts Row */}
              <div className="mt-16 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-xl font-mono text-xs">
                <div>
                  <span className="text-[10px] text-[#9AA5B5] block uppercase">LOCATION</span>
                  <span className="text-[#F3F6FA] mt-0.5 block">Bengaluru, India</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#9AA5B5] block uppercase">CORE FOCUS</span>
                  <span className="text-[#76E5FF] mt-0.5 block">AI / ML & Full-Stack</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-[#9AA5B5] block uppercase">UNIVERSITY</span>
                  <span className="text-[#F0B66D] mt-0.5 block">Jain University</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            ABOUT SECTION
        ================================================================== */}
        <section id="about" className="py-28 px-6 relative border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 items-start reveal-section">
              <div className="lg:col-span-6 lg:sticky lg:top-28">
                <div className="font-mono text-xs text-[#76E5FF] uppercase tracking-widest mb-4">
                  About Me
                </div>

                <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F3F6FA] tracking-tight leading-[1.12] mb-8">
                  Curiosity is the Engine.{' '}
                  <span className="text-[#F0B66D]">Intelligence is the Direction.</span>
                </h2>

                <div className="p-6 rounded-2xl bg-[#11151D]/70 border border-white/10 backdrop-blur-md">
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#9AA5B5] mb-4">
                    <span>CORE DISCIPLINES</span>
                    <span className="text-[#76E5FF]">BCA AI · JAIN UNIVERSITY</span>
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
                      Full-Stack
                    </text>
                    <circle cx="200" cy="17" r="4" fill="#F3F6FA" />
                    <text x="165" y="11" fill="#9AA5B5" fontSize="9" fontFamily="monospace">
                      Data Systems
                    </text>
                  </svg>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="p-7 sm:p-8 rounded-2xl bg-[#11151D]/75 border border-white/10 backdrop-blur-md space-y-5">
                  <p className="text-base sm:text-lg text-[#F3F6FA] leading-relaxed font-medium">
                    I'm Nayan Choraria, a BCA Artificial Intelligence student at Jain University in
                    Bengaluru, passionate about combining machine learning with practical,
                    well-crafted software.
                  </p>
                  <p className="text-sm sm:text-base text-[#9AA5B5] leading-relaxed">
                    Whether I'm building FastAPI services for scam detection, programming sensors
                    for real-time air quality monitoring, or developing full-stack web applications,
                    I focus on clean architecture, reliability, and intuitive user experiences.
                  </p>
                </div>

                <div className="p-7 rounded-2xl bg-[#11151D]/75 border border-white/10 backdrop-blur-md">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#F0B66D] mb-4">
                    Areas of Interest
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

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-[#11151D]/75 border border-white/10">
                    <span className="font-mono text-[10px] text-[#76E5FF] uppercase tracking-wider block mb-1">
                      Education
                    </span>
                    <h4 className="font-display font-bold text-base text-[#F3F6FA]">
                      BCA — Artificial Intelligence
                    </h4>
                    <p className="text-xs text-[#9AA5B5] mt-1">
                      {PORTFOLIO_DATA.profile.university}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#11151D]/75 border border-white/10">
                    <span className="font-mono text-[10px] text-[#F0B66D] uppercase tracking-wider block mb-1">
                      Leadership
                    </span>
                    <h4 className="font-display font-bold text-base text-[#F3F6FA]">
                      {PORTFOLIO_DATA.profile.leadership.role} ·{' '}
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
            PROJECTS SECTION (DEPLOYED SHOWN FIRST)
        ================================================================== */}
        <section id="projects" className="py-28 px-6 relative border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 reveal-section">
              <div>
                <div className="font-mono text-xs text-[#76E5FF] uppercase tracking-widest mb-3">
                  Featured Work
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F3F6FA] tracking-tight">
                  Projects
                </h2>
              </div>
              <p className="text-sm text-[#9AA5B5] max-w-md">
                Live deployed applications are featured first, followed by hardware IoT and machine
                learning projects.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-7 reveal-section">
              {PORTFOLIO_DATA.featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <div className="mt-12 text-center reveal-section">
              <button
                onClick={() => setShowExtendedArchive((prev) => !prev)}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#11151D] hover:bg-[#11151D]/90 border border-white/15 hover:border-[#76E5FF]/50 text-xs font-mono text-[#F3F6FA] transition-all"
              >
                <Layers size={14} className="text-[#76E5FF]" />
                <span>
                  {showExtendedArchive
                    ? 'Show Fewer Projects'
                    : `View More Projects (+${PORTFOLIO_DATA.additionalArchive.length})`}
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
            SKILLS SECTION
        ================================================================== */}
        <section id="skills" className="py-28 px-6 relative border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 reveal-section">
              <div>
                <div className="font-mono text-xs text-[#F0B66D] uppercase tracking-widest mb-3">
                  Technical Skills
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F3F6FA] tracking-tight">
                  Skills & Technologies
                </h2>
              </div>
              <p className="text-sm text-[#9AA5B5] max-w-md">
                Select any category to view the languages, frameworks, and tools I use to build
                projects.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start reveal-section">
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
                          ? 'bg-[#07111F]/95 border-[#76E5FF] shadow-[0_0_25px_rgba(118,229,255,0.12)]'
                          : isConnected
                          ? 'bg-[#11151D]/80 border-[#F0B66D]/40'
                          : 'bg-[#11151D]/60 border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] mb-2">
                        <span className={isSelected ? 'text-[#76E5FF]' : 'text-[#9AA5B5]'}>
                          {skill.items.length} Skills
                        </span>
                        {isSelected ? (
                          <span className="px-2 py-0.5 rounded bg-[#76E5FF]/15 text-[#76E5FF]">
                            Selected
                          </span>
                        ) : isConnected ? (
                          <span className="px-2 py-0.5 rounded bg-[#F0B66D]/15 text-[#F0B66D]">
                            Related
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

              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="p-7 rounded-2xl bg-[#07111F]/90 border border-[#76E5FF]/35 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                    <div>
                      <span className="font-mono text-[10px] text-[#76E5FF] uppercase tracking-wider block">
                        Category Details
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
                      Technologies Used
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

                  <div className="pt-4 border-t border-white/10">
                    <span className="font-mono text-[10px] text-[#F0B66D] uppercase tracking-wider block mb-2.5">
                      Related Areas
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
            CONTACT SECTION
        ================================================================== */}
        <section id="contact" className="py-32 px-6 relative border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center reveal-section">
            <div className="relative w-20 h-20 mx-auto mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#76E5FF]/30 animate-ping opacity-20" />
              <div className="w-16 h-16 rounded-2xl bg-[#11151D] border border-[#F0B66D]/45 flex items-center justify-center text-[#F0B66D] shadow-[0_0_30px_rgba(240,182,109,0.15)]">
                <Radio size={26} />
              </div>
            </div>

            <div className="font-mono text-xs text-[#76E5FF] uppercase tracking-widest mb-3">
              Get In Touch
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#F3F6FA] tracking-tight mb-5">
              Have an Interesting Mission?
            </h2>

            <p className="text-base sm:text-lg text-[#9AA5B5] max-w-xl mx-auto leading-relaxed mb-12">
              I'm interested in building useful technology, exploring new ideas, and collaborating
              on meaningful projects.
            </p>

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
                  {copied ? 'Email Copied!' : PORTFOLIO_DATA.profile.email}
                </span>
              </button>

              <a
                href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                className="p-4 rounded-xl bg-[#F3F6FA] hover:bg-[#76E5FF] text-[#030407] font-display font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Send an Email</span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 max-w-2xl mx-auto">
              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#11151D]/75 border border-white/10 hover:border-[#76E5FF]/50 text-xs font-mono text-[#F3F6FA] flex items-center gap-2.5 transition-all"
              >
                <Github size={16} className="text-[#76E5FF]" />
                <span>GitHub</span>
                <ArrowUpRight size={13} className="opacity-60" />
              </a>

              <a
                href={PORTFOLIO_DATA.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#11151D]/75 border border-white/10 hover:border-[#F0B66D]/50 text-xs font-mono text-[#F3F6FA] flex items-center gap-2.5 transition-all"
              >
                <Linkedin size={16} className="text-[#F0B66D]" />
                <span>LinkedIn</span>
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
                  <span>Resume</span>
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================================
          TARS INTERACTIVE ASSISTANT
      ==================================================================== */}
      {!isTarsDismissed && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
          {!isTarsExpanded && (
            <div className="flex items-center gap-3 p-2.5 pl-3.5 rounded-2xl bg-[#11151D]/95 border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl max-w-xs sm:max-w-sm">
              <button
                onClick={() => setIsTarsExpanded(true)}
                className="flex items-center gap-3 text-left group"
                title="Open TARS Assistant"
              >
                <div className="w-7 h-9 bg-[#030407] border border-white/15 p-1 grid grid-cols-4 gap-0.5 items-center shrink-0">
                  <span className="h-full bg-[#9AA5B5] group-hover:bg-[#76E5FF] transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <span className="h-4/5 bg-[#F3F6FA] group-hover:translate-y-0.5 transition-transform duration-300" />
                  <span className="h-full bg-[#9AA5B5] group-hover:-translate-y-0.5 transition-transform duration-300" />
                  <span className="h-full bg-[#F0B66D]" />
                </div>

                <div className="pr-1">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[#F0B66D] uppercase tracking-wider">
                    <span>TARS Assistant</span>
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
                title="Hide TARS"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {isTarsExpanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="TARS Assistant"
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/75 backdrop-blur-md"
        >
          <div
            className="fixed inset-0"
            onClick={() => setIsTarsExpanded(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-xl rounded-2xl bg-[#07111F] border border-[#76E5FF]/35 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
            <div className="px-5 py-3.5 bg-[#11151D] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#030407] border border-white/15 p-0.5 grid grid-cols-4 gap-0.5">
                  <span className="bg-[#76E5FF]" />
                  <span className="bg-[#F3F6FA]" />
                  <span className="bg-[#9AA5B5]" />
                  <span className="bg-[#F0B66D]" />
                </div>
                <div>
                  <span className="font-mono text-xs font-semibold text-[#F3F6FA] block">
                    TARS Portfolio Assistant
                  </span>
                  <span className="font-mono text-[10px] text-[#76E5FF] block">
                    Powered by Groq LLaMA
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

            <div className="px-5 py-2 bg-[#07111F] border-b border-white/5 flex flex-wrap gap-1.5">
              {[
                'Tell me about Nayan’s live projects',
                'What is his tech stack?',
                'How can I contact Nayan?'
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

            <div className="p-5 max-h-[45vh] overflow-y-auto space-y-3.5 text-xs">
              {aiMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border ${
                    msg.role === 'user'
                      ? 'bg-[#11151D] border-white/15 ml-8 text-[#F3F6FA]'
                      : 'bg-[#030407]/85 border-[#76E5FF]/25 mr-6 text-[#F3F6FA]'
                  }`}
                >
                  <div className="font-mono text-[9px] uppercase tracking-wider mb-1 text-[#9AA5B5]">
                    {msg.role === 'user' ? 'You' : 'TARS'}
                  </div>
                  <p className="leading-relaxed font-sans text-xs sm:text-sm">{msg.content}</p>
                </div>
              ))}
              {isAiLoading && (
                <div className="p-3.5 rounded-xl bg-[#030407]/80 border border-[#F0B66D]/30 mr-6 flex items-center gap-2.5 text-xs font-mono text-[#F0B66D]">
                  <Loader2 size={14} className="animate-spin" />
                  <span>Thinking...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form
              onSubmit={handleAiSubmit}
              className="p-3 bg-[#030407] border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask about projects, skills, or experience..."
                className="flex-1 bg-[#11151D] border border-white/10 focus:border-[#76E5FF] rounded-xl px-3.5 py-2.5 text-xs text-[#F3F6FA] placeholder:text-[#9AA5B5]/60 focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                disabled={isAiLoading || !aiInput.trim()}
                className="px-4 py-2.5 rounded-xl bg-[#76E5FF] text-[#030407] font-mono text-xs font-semibold hover:bg-[#F3F6FA] disabled:opacity-40 transition-colors"
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
            <span>BCA Artificial Intelligence · Jain University, Bengaluru</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
