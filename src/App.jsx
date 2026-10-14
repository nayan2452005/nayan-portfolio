import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import {
  ArrowUpRight, Github, Linkedin, Menu, X,
  Cpu, Mail, Check, Terminal,
  ChevronRight, Loader2, Radio,
  Layers, FileText, Minimize2, MessageSquare, Globe
} from 'lucide-react';

// ============================================================================
// EDITABLE PORTFOLIO CONFIGURATIO
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
        "A modern, responsive business website built for an auto-electrical spare parts wholesale distributor. Features a refined landing experience, brand marquee, and scalable component architecture.",
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
      description: "Creating responsive, accessible, and refined user interfaces with modern React tooling.",
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
// THREE.JS VOXEL WORLD (MINECRAFT-INSPIRED BIOMES)
// ============================================================================
function VoxelWorldCanvas({ scrollProgress, mousePos, reducedMotion }) {
  const mountRef = useRef(null);
  const stateRef = useRef({ scroll: 0, targetScroll: 0, mouseX: 0, mouseY: 0, targetMouseX: 0, targetMouseY: 0 });

  useEffect(() => { stateRef.current.targetScroll = scrollProgress; }, [scrollProgress]);
  useEffect(() => {
    stateRef.current.targetMouseX = mousePos.x;
    stateRef.current.targetMouseY = mousePos.y;
  }, [mousePos]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const mobile = window.innerWidth < 700;
    const scene = new THREE.Scene();
    const initialSky = new THREE.Color('#18372C');
    scene.background = initialSky;
    scene.fog = new THREE.Fog(initialSky, 24, 64);

    const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 140);
    camera.position.set(0, 7.2, 22);
    camera.lookAt(0, -0.6, -6);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !mobile, powerPreference: 'low-power' });
    } catch (error) {
      // Preserve the portfolio when WebGL is unavailable or blocked by the browser.
      mount.classList.add('voxel-webgl-fallback');
      return () => mount.classList.remove('voxel-webgl-fallback');
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.domElement.className = 'fixed inset-0 w-full h-full pointer-events-none z-0';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xDDEED1, 0x263729, 2.0));
    const sunLight = new THREE.DirectionalLight(0xFFF1C8, 3.0);
    sunLight.position.set(-8, 16, 9);
    scene.add(sunLight);
    const fillLight = new THREE.PointLight(0x65A844, 8, 38, 2);
    fillLight.position.set(4, 5, 1);
    scene.add(fillLight);

    const box = new THREE.BoxGeometry(1, 1, 1);
    const mats = {
      grass: new THREE.MeshStandardMaterial({ color: '#5FAE49', roughness: 1 }),
      dirt: new THREE.MeshStandardMaterial({ color: '#765333', roughness: 1 }),
      stone: new THREE.MeshStandardMaterial({ color: '#747B70', roughness: 1 }),
      wood: new THREE.MeshStandardMaterial({ color: '#75502F', roughness: 1 }),
      leaf: new THREE.MeshStandardMaterial({ color: '#43863C', roughness: 1 }),
      leafLight: new THREE.MeshStandardMaterial({ color: '#62A94B', roughness: 1 }),
      cloud: new THREE.MeshStandardMaterial({ color: '#E4EDDB', roughness: 1, transparent: true, opacity: 0.76 }),
      sun: new THREE.MeshStandardMaterial({ color: '#F0C75E', emissive: '#83662A', emissiveIntensity: 0.5, roughness: 0.55 }),
      star: new THREE.MeshBasicMaterial({ color: '#E8E1FF', transparent: true, opacity: 0.7 })
    };
    const dummy = new THREE.Object3D();
    const instanced = (material, count) => {
      const mesh = new THREE.InstancedMesh(box, material, Math.max(1, count));
      mesh.instanceMatrix.setUsage(THREE.StaticDrawUsage);
      mesh.frustumCulled = false;
      scene.add(mesh);
      return mesh;
    };

    // Hundreds of terrain cubes are instanced for a real 3D voxel landscape with low draw-call overhead.
    const cols = [];
    for (let z = -15; z <= 9; z++) {
      for (let x = -16; x <= 16; x++) {
        const height = Math.round(-0.15 + Math.sin(x * 0.31) * 0.72 + Math.sin(z * 0.28 + x * 0.13) * 0.52 + Math.max(0, Math.abs(x) - 8) * 0.11);
        cols.push({ x, y: height, z });
      }
    }
    const grassBlocks = instanced(mats.grass, cols.length);
    const dirtBlocks = instanced(mats.dirt, cols.length * 2);
    const stoneBlocks = instanced(mats.stone, cols.length * 2);
    cols.forEach(({ x, y, z }, i) => {
      dummy.position.set(x, y, z); dummy.scale.set(1, 1, 1); dummy.updateMatrix(); grassBlocks.setMatrixAt(i, dummy.matrix);
      for (let layer = 1; layer <= 2; layer++) {
        dummy.position.set(x, y - layer, z); dummy.updateMatrix(); dirtBlocks.setMatrixAt(i * 2 + layer - 1, dummy.matrix);
      }
      for (let layer = 3; layer <= 4; layer++) {
        dummy.position.set(x, y - layer, z); dummy.updateMatrix(); stoneBlocks.setMatrixAt(i * 2 + layer - 3, dummy.matrix);
      }
    });
    [grassBlocks, dirtBlocks, stoneBlocks].forEach(mesh => { mesh.instanceMatrix.needsUpdate = true; });

    // Stepped voxel mountains form a distant horizon.
    const mountains = [];
    const makeMountain = (cx, cz, width, height) => {
      for (let row = 0; row < height; row++) {
        const rowWidth = Math.max(1, width - row * 2);
        for (let ix = 0; ix < rowWidth; ix++) {
          mountains.push({ x: cx - rowWidth / 2 + ix, y: row - 0.25, z: cz, grass: row === height - 1 });
        }
      }
    };
    makeMountain(-13, -18, 14, 7); makeMountain(-3, -21, 18, 9); makeMountain(10, -19, 15, 8); makeMountain(19, -21, 12, 6);
    const mountainGrass = instanced(mats.grass, mountains.filter(m => m.grass).length);
    const mountainStone = instanced(mats.stone, mountains.filter(m => !m.grass).length);
    let miGrass = 0; let miStone = 0;
    mountains.forEach(m => {
      dummy.position.set(m.x, m.y, m.z); dummy.updateMatrix();
      if (m.grass) mountainGrass.setMatrixAt(miGrass++, dummy.matrix); else mountainStone.setMatrixAt(miStone++, dummy.matrix);
    });
    mountainGrass.instanceMatrix.needsUpdate = true; mountainStone.instanceMatrix.needsUpdate = true;

    const treeGroups = [];
    const addTree = (x, z, scale) => {
      const group = new THREE.Group();
      group.position.set(x, Math.round(-0.15 + Math.sin(x * 0.31) * 0.72 + Math.sin(z * 0.28 + x * 0.13) * 0.52) + 0.5, z);
      group.scale.setScalar(scale);
      const cube = (mat, px, py, pz, sx = 1, sy = 1, sz = 1) => {
        const mesh = new THREE.Mesh(box, mat); mesh.position.set(px, py, pz); mesh.scale.set(sx, sy, sz); group.add(mesh);
      };
      cube(mats.wood, 0, 1, 0, 0.8, 2.4, 0.8);
      cube(mats.leaf, 0, 2.8, 0, 2.7, 1.6, 2.5);
      cube(mats.leafLight, -0.75, 3.65, 0.2, 1.6, 1.35, 1.7);
      cube(mats.leaf, 0.75, 3.55, -0.25, 1.65, 1.45, 1.6);
      cube(mats.leafLight, 0, 4.25, 0, 1.7, 1.05, 1.7);
      scene.add(group); treeGroups.push(group);
    };
    (mobile ? [-12, -7, 7, 12] : [-14, -10, -6, 5, 9, 13]).forEach((x, i) => addTree(x, -5 + (i % 3) * 3, 0.8 + (i % 3) * 0.12));

    const cloudGroups = [];
    const makeCloud = (x, y, z, scale) => {
      const group = new THREE.Group();
      [[0,0,0],[1,0,0],[-1,0,0],[2,0,0],[0,0.55,0],[1,0.55,0],[-1,0.55,0]].forEach(([bx,by,bz]) => {
        const cube = new THREE.Mesh(box, mats.cloud);
        cube.position.set(bx * 0.86, by * 0.86, bz); cube.scale.set(1.08, 0.7, 0.85); group.add(cube);
      });
      group.position.set(x,y,z); group.scale.setScalar(scale); scene.add(group); cloudGroups.push(group);
    };
    makeCloud(-10, 7, -10, 1.1); makeCloud(2, 8, -14, 0.9); makeCloud(12, 6.5, -8, 1.0);
    const sunCube = new THREE.Mesh(box, mats.sun); sunCube.position.set(9, 8.5, -18); sunCube.scale.set(2.4, 2.4, 2.4); scene.add(sunCube);

    const stars = [];
    for (let i = 0; i < (mobile ? 22 : 46); i++) {
      const star = new THREE.Mesh(box, mats.star);
      star.position.set(((i * 17.31) % 36) - 18, 4 + ((i * 7.97) % 10), -13 - ((i * 3.17) % 12));
      star.scale.setScalar(i % 7 === 0 ? 0.16 : 0.075); star.visible = false; scene.add(star); stars.push(star);
    }

    const stopData = [
      { at: 0, sky: '#18372C', grass: '#5FAE49', dirt: '#765333', stone: '#747B70', light: '#FFF1C8' },
      { at: 0.36, sky: '#171F1D', grass: '#596B4E', dirt: '#514838', stone: '#606760', light: '#C7D4BC' },
      { at: 0.65, sky: '#3A211B', grass: '#9A4A2A', dirt: '#582E22', stone: '#4B3931', light: '#FF8A48' },
      { at: 0.84, sky: '#28203F', grass: '#786296', dirt: '#40334E', stone: '#625675', light: '#B9A4FA' },
      { at: 1, sky: '#1C1B31', grass: '#6F5D8D', dirt: '#352D47', stone: '#514664', light: '#B9A4FA' }
    ].map(d => ({ ...d, sky: new THREE.Color(d.sky), grass: new THREE.Color(d.grass), dirt: new THREE.Color(d.dirt), stone: new THREE.Color(d.stone), light: new THREE.Color(d.light) }));
    const mixed = new THREE.Color();
    let frameId = 0; let time = 0; let disposed = false;
    const resize = () => {
      const w = window.innerWidth; const h = window.innerHeight;
      camera.aspect = w / Math.max(h, 1); camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, w < 700 ? 1 : 1.5)); renderer.setSize(w, h);
    };
    const render = () => {
      if (disposed) return;
      const st = stateRef.current;
      st.scroll += (st.targetScroll - st.scroll) * 0.065;
      st.mouseX += (st.targetMouseX - st.mouseX) * 0.06;
      st.mouseY += (st.targetMouseY - st.mouseY) * 0.06;
      const progress = THREE.MathUtils.clamp(st.scroll, 0, 1);
      if (!reducedMotion) time += 0.008;
      let lo = stopData[0]; let hi = stopData[stopData.length - 1];
      for (let i = 0; i < stopData.length - 1; i++) {
        if (progress >= stopData[i].at && progress <= stopData[i + 1].at) { lo = stopData[i]; hi = stopData[i + 1]; break; }
      }
      const t = THREE.MathUtils.clamp((progress - lo.at) / Math.max(0.001, hi.at - lo.at), 0, 1);
      const tint = (target, a, b) => target.lerpColors(a, b, t);
      tint(mixed, lo.sky, hi.sky); scene.background.copy(mixed); scene.fog.color.copy(mixed); scene.fog.far = 58 - progress * 7;
      tint(mats.grass.color, lo.grass, hi.grass); tint(mats.dirt.color, lo.dirt, hi.dirt); tint(mats.stone.color, lo.stone, hi.stone); tint(sunLight.color, lo.light, hi.light);
      fillLight.color.copy(mixed).lerp(new THREE.Color('#65A844'), 0.16); fillLight.intensity = 8 - progress * 2.2;
      cloudGroups.forEach((cloud, i) => { if (!reducedMotion) cloud.position.x += 0.003 * (i % 2 ? -1 : 1); if (cloud.position.x > 24) cloud.position.x = -24; if (cloud.position.x < -24) cloud.position.x = 24; cloud.visible = progress < 0.55; });
      treeGroups.forEach((tree, i) => { tree.visible = progress < 0.47; if (!reducedMotion) tree.rotation.z = Math.sin(time * 0.5 + i) * 0.012; });
      sunCube.visible = progress < 0.62;
      stars.forEach((star, i) => { star.visible = progress > 0.22; if (!reducedMotion) mats.star.opacity = 0.42 + Math.sin(time * 1.5 + i) * 0.18; });
      camera.position.x += (st.mouseX * 1.15 - camera.position.x) * 0.03;
      camera.position.y += (6.8 + st.mouseY * -0.48 + progress * 0.5 - camera.position.y) * 0.025;
      camera.position.z += (22 - progress * 5.5 - camera.position.z) * 0.025;
      camera.lookAt(st.mouseX * 0.45, -0.8 + progress * 0.5, -6 + progress * 7.5);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };
    window.addEventListener('resize', resize, { passive: true }); render();
    return () => {
      disposed = true; window.removeEventListener('resize', resize); if (frameId) cancelAnimationFrame(frameId);
      scene.traverse(object => { if (object instanceof THREE.Mesh || object instanceof THREE.InstancedMesh) { if (object.geometry !== box) object.geometry.dispose(); } });
      box.dispose(); Object.values(mats).forEach(material => material.dispose()); renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [reducedMotion]);

  return <div ref={mountRef} aria-hidden="true" className="fixed inset-0 pointer-events-none z-0" />;
}

// BLOCK-BUILT PROJECT VISUAL PREVIEWS
// ============================================================================
function ProjectVisual({ type }) {
  const palette = {
    distributor: { label: 'WAREHOUSE BUILD', blocks: ['#5D963F', '#7B593A', '#8A8F83', '#436E38'], object: 'STORE FRONT' },
    honeypot: { label: 'REDSTONE LAB', blocks: ['#9A4B2E', '#494D49', '#6C3028', '#B56742'], object: 'SIGNAL DETECTED' },
    aqi: { label: 'FOREST SENSOR', blocks: ['#5BAA56', '#397A49', '#6AABBA', '#8FCB7A'], object: 'AIR QUALITY' },
    sentiment: { label: 'ENCHANTED NLP', blocks: ['#5B8C48', '#4279A1', '#9A6DB4', '#6DBB86'], object: 'TEXT CLASSIFIED' },
    tally: { label: 'CRAFTING LEDGER', blocks: ['#5A9147', '#6E7D63', '#C3A34D', '#466846'], object: 'ANALYTICS READY' },
    reachinbox: { label: 'REDSTONE MAIL', blocks: ['#6F8A59', '#5A77A2', '#AD8750', '#536B43'], object: 'QUEUE AUTOMATED' },
    portfolio: { label: 'BUILDER WORLD', blocks: ['#6DAA4D', '#8A6740', '#5A8151', '#9DBA67'], object: 'WORLD LOADED' }
  };
  const config = palette[type] || palette.portfolio;
  const cubes = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    tone: config.blocks[(i * 7 + Math.floor(i / 5) * 3) % config.blocks.length],
    visible: ((i * 3 + Math.floor(i / 5)) % 7 !== 0)
  }));

  return (
    <div className={`relative w-full h-44 overflow-hidden border-b border-white/10 select-none pixel-grid voxel-scene voxel-scene-${type}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#203A2D] via-[#172719] to-[#10170F]" />
      <div className="absolute left-5 top-4 z-10 flex items-center gap-2 font-mono text-[9px] tracking-widest text-[#DCE8D5]">
        <span className="voxel-dot" /> {config.label}
      </div>
      <div className="absolute right-4 top-4 z-10 px-2 py-1 text-[8px] font-mono bg-[#10170F]/85 text-[#9FE37B] border border-[#65A844]/30">{config.object}</div>
      <div className="absolute left-0 right-0 bottom-0 h-10 bg-[#493728] border-t-4 border-[#65A844]" />
      <div className="absolute left-[14%] bottom-10 flex items-end gap-1.5 z-[2]">
        <div className="w-8 h-8 bg-[#6E5033] border-t-4 border-[#78B954] shadow-[inset_-5px_0_0_rgba(0,0,0,.18)]" />
        <div className="w-8 h-14 bg-[#6E5033] border-t-4 border-[#78B954] shadow-[inset_-5px_0_0_rgba(0,0,0,.18)]" />
        <div className="w-8 h-10 bg-[#6E5033] border-t-4 border-[#78B954] shadow-[inset_-5px_0_0_rgba(0,0,0,.18)]" />
      </div>
      <div className="absolute right-[16%] bottom-10 z-[2] grid grid-cols-5 gap-0.5 rotate-[-5deg]">
        {cubes.map((cube) => (
          <span key={cube.id} className="block w-5 h-5 sm:w-6 sm:h-6 border border-black/20 shadow-[inset_2px_2px_0_rgba(255,255,255,.12),inset_-3px_-3px_0_rgba(0,0,0,.16)]" style={{ background: cube.visible ? cube.tone : 'transparent', opacity: cube.visible ? 1 : 0.12 }} />
        ))}
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[4.25rem] z-[3] w-16 h-5 bg-[#7B9E5B]/40 border border-[#A6CD80]/40" />
      <div className="absolute bottom-3 left-5 z-10 flex items-center gap-2 text-[9px] font-mono text-white/70">
        <span className="w-2 h-2 bg-[#65A844]" /> BLOCKS GENERATED <span className="text-[#DCE8D5]">{String(type).toUpperCase()}</span>
      </div>
    </div>
  );
}

// ============================================================================
// 3D TILT PROJECT CARD WITH SPOTLIGHT TRACKING
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

    const rotateX = ((y - centerY) / centerY) * -3.2;
    const rotateY = ((x - centerX) / centerX) * 3.2;

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
      className="spatial-card rounded-2xl bg-[#182217]/85 border border-white/[0.08] overflow-hidden flex flex-col justify-between transition-all duration-300 backdrop-blur-md group"
    >
      <div>
        <ProjectVisual type={project.visualType} />

        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between gap-2 text-xs font-mono mb-3">
            <span className="text-[#9CB09A]">{project.category}</span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] border ${
                isLive
                  ? 'bg-[#65A844]/10 text-[#65A844] border-[#65A844]/35'
                  : 'bg-white/[0.03] text-[#9CB09A] border-white/10'
              }`}
            >
              {project.status}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-[#F0F4EA] tracking-tight mb-3 group-hover:text-[#65A844] transition-colors font-display">
            {project.title}
          </h3>

          <p className="text-sm text-[#9CB09A] leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono text-[#DCE8D5] bg-[#0D150D]/80 border border-white/[0.08] px-2.5 py-1 rounded-md"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-7 py-4 border-t border-white/[0.07] bg-[#111910]/70 flex items-center justify-between gap-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#9CB09A] hover:text-[#F0F4EA] transition-colors"
        >
          <Github size={14} />
          <span>GitHub</span>
        </a>

        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#65A844] hover:text-[#F0F4EA] transition-colors"
          >
            <Globe size={13} />
            <span>Live Demo</span>
            <ArrowUpRight size={14} />
          </a>
        ) : (
          <span className="text-[11px] font-mono text-[#74836E]">
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
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  // Custom Mouse Cursor DOM Refs
  const cursorDotRef = useRef(null);
  const cursorFollowerRef = useRef(null);
  const cursorRaw = useRef({ x: -100, y: -100 });
  const cursorSmooth = useRef({ x: -100, y: -100 });

  // CRAFT Assistant State
  const [isTarsExpanded, setIsTarsExpanded] = useState(false);
  const [isTarsDismissed, setIsTarsDismissed] = useState(false);
  const [honesty, setHonesty] = useState(90);
  const [humor, setHumor] = useState(75);
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'ai',
      content:
        "Hi! I'm CRAFT, Nayan's portfolio assistant. Ask me about his live projects, AI & full-stack skills, or his studies at Jain University."
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

  // Spotlight tracking for non-project cards
  const handleSurfaceMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    document.documentElement.style.scrollBehavior = 'smooth';

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    // Custom Sleek Mouse Pointer Animation (Desktop Fine Pointer)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    let cursorRafId;

    const handleMouseMove = (e) => {
      cursorRaw.current = { x: e.clientX, y: e.clientY };

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }

      // Detect interactive element hover for magnetic cursor expansion
      const target = e.target;
      const interactive =
        target &&
        target.closest &&
        target.closest('a, button, input, [role="button"]');
      setIsHoveringInteractive(Boolean(interactive));

      // Normalized coordinates for subtle 3D scene parallax
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: nx, y: ny });
    };

    const animateFollower = () => {
      cursorSmooth.current.x += (cursorRaw.current.x - cursorSmooth.current.x) * 0.16;
      cursorSmooth.current.y += (cursorRaw.current.y - cursorSmooth.current.y) * 0.16;

      if (cursorFollowerRef.current) {
        cursorFollowerRef.current.style.transform = `translate3d(${cursorSmooth.current.x - 18}px, ${cursorSmooth.current.y - 18}px, 0)`;
      }
      cursorRafId = requestAnimationFrame(animateFollower);
    };

    if (isFinePointer) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      cursorRafId = requestAnimationFrame(animateFollower);
    }

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
      if (isFinePointer) {
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(cursorRafId);
      }
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

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const userText = aiInput.trim();
    setAiMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setAiInput('');
    setIsAiLoading(true);

    const systemPrompt = `You are CRAFT, a friendly Minecraft-inspired assistant on Nayan Choraria's personal portfolio website.
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
      className={`min-h-screen bg-[#10170F] text-[#F0F4EA] selection:bg-[#65A844]/25 selection:text-[#F0F4EA] antialiased overflow-x-hidden transition-opacity duration-700 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Press+Start+2P&family=Space+Grotesk:wght@500;600;700&display=swap');

        @media (pointer: fine) and (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }

        body {
          background-color: #10170F;
          color: #F0F4EA;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }

        .minecraft-label {
          font-family: 'Press Start 2P', monospace;
          letter-spacing: -0.035em;
          text-shadow: 2px 2px 0 rgba(0,0,0,0.32);
        }

        .voxel-panel {
          border-radius: 4px !important;
          box-shadow: 0 7px 0 rgba(0,0,0,0.22), inset 0 0 0 1px rgba(255,255,255,0.035);
          image-rendering: pixelated;
        }

        .pixel-grid {
          background-image: linear-gradient(rgba(161, 197, 141, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(161, 197, 141, 0.055) 1px, transparent 1px);
          background-size: 18px 18px;
        }

        .voxel-dot {
          width: 8px; height: 8px; display: inline-block; background: #65A844;
          box-shadow: 3px 3px 0 rgba(0,0,0,0.35);
        }

        .voxel-scene { isolation: isolate; }
        .voxel-webgl-fallback { background: linear-gradient(to bottom, #17372c 0%, #233c2b 57%, #5fae49 57%, #477f38 61%, #765333 61%, #493728 82%, #152017 82%); }
        .voxel-webgl-fallback::after { content: ''; position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(10,20,10,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(10,20,10,.08) 1px, transparent 1px); background-size: 26px 26px; }

        .voxel-scene::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(135deg, rgba(255,255,255,.055), transparent 38%, rgba(0,0,0,.18)); }
        .voxel-scene-honeypot { filter: saturate(.9); }
        .voxel-scene-aqi { background-color: #1B3B27; }
        .voxel-scene-sentiment { background-color: #1E3125; }
        .voxel-scene-tally { background-color: #273521; }
        .voxel-scene-reachinbox { background-color: #222E23; }
        .voxel-scene-portfolio { background-color: #203A2D; }

        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }

        /* Voxel-style Card Spotlight */
        .spatial-card {
          position: relative;
          will-change: transform;
          border-radius: 4px !important;
          box-shadow: 0 10px 0 rgba(0,0,0,0.22), 0 20px 50px -20px rgba(0, 0, 0, 0.9);
        }

        .spatial-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(101, 168, 68, 0.08),
            rgba(255, 255, 255, 0.03) 40%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 1;
        }

        .spatial-card:hover {
          border-color: rgba(101, 168, 68, 0.6);
          box-shadow: 0 12px 0 rgba(0,0,0,0.22), 0 0 0 2px rgba(101,168,68,0.08);
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

      {/* ====================================================================
          CUSTOM LUXURY MOUSE POINTER (DOT + SMOOTH FOLLOWER RING)
      ==================================================================== */}
      <div
        ref={cursorFollowerRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-9 h-9 pointer-events-none z-[9999] hidden md:flex items-center justify-center will-change-transform"
      >
        <div
          className={`rounded-none border-2 transition-all duration-200 ease-out flex items-center justify-center ${
            isHoveringInteractive
              ? 'w-10 h-10 border-[#65A844] bg-[#65A844]/10 scale-110'
              : 'w-7 h-7 border-white/35 bg-white/[0.02]'
          }`}
        />
      </div>
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 w-2 h-2 rounded-none pointer-events-none z-[10000] hidden md:block will-change-transform transition-colors duration-200 ${
          isHoveringInteractive
            ? 'bg-[#65A844] shadow-[0_0_12px_#65A844]'
            : 'bg-[#F0F4EA] shadow-[0_0_8px_rgba(255,255,255,0.8)]'
        }`}
      />

      {/* Animated Minecraft-Inspired Voxel World */}
      <VoxelWorldCanvas
        scrollProgress={scrollProgress}
        mousePos={mousePos}
        reducedMotion={reducedMotion}
      />

      {/* Subtle Minecraft grid overlay */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-25 pixel-grid"
      >
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path d={`M -30 ${610-scrollProgress*180} h 170 v -28 h 110 v 28 h 210 v -28 h 120 v 28 h 180 v -28 h 150`} fill="none" stroke="rgba(101,168,68,0.18)" strokeWidth="2" strokeDasharray="8 10" />
        </svg>
      </div>

      {/* ====================================================================
          NAVIGATION BAR
      ==================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
        <nav
          aria-label="Primary Navigation"
          className={`pointer-events-auto w-full max-w-6xl rounded-2xl border border-white/[0.08] bg-[#111910]/80 backdrop-blur-xl transition-all duration-300 flex items-center justify-between ${
            isCompactNav ? 'py-2.5 px-5 shadow-[0_10px_30px_rgba(0,0,0,0.85)]' : 'py-3.5 px-6'
          }`}
        >
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-8 h-7 rounded bg-[#202D20] border border-white/15 p-1 flex items-center justify-center gap-0.5 group-hover:border-[#65A844]/60 transition-colors">
              <span className="w-1 h-full bg-[#9CB09A] group-hover:bg-[#65A844] transition-colors" />
              <span className="w-1 h-4/5 bg-[#F0F4EA]" />
              <span className="w-1 h-full bg-[#9CB09A]" />
              <span className="w-1 h-full bg-[#65A844]" />
            </div>
            <div>
              <span className="font-display font-bold text-sm tracking-tight text-[#F0F4EA] block leading-none">
                {PORTFOLIO_DATA.profile.name}
              </span>
              <span className="font-mono text-[10px] text-[#9CB09A] block mt-1">
                VOXEL BUILDER // PORTFOLIO
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1 bg-[#182217] border border-white/[0.06] rounded-xl p-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white/[0.08] text-[#F0F4EA] border border-[#65A844]/35'
                      : 'text-[#9CB09A] hover:text-[#F0F4EA] hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#182217] border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#65A844] animate-pulse" />
              <span className="font-mono text-[10px] text-[#9CB09A]">
                Available for Projects
              </span>
            </div>

            <button
              onClick={() => {
                setIsTarsDismissed(false);
                setIsTarsExpanded(true);
              }}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#202D20] hover:bg-[#16161B] border border-[#65A844]/35 text-xs font-mono text-[#F0F4EA] hover:border-[#65A844] transition-colors"
              title="Open CRAFT Assistant (Cmd/Ctrl + K)"
            >
              <Terminal size={13} className="text-[#65A844]" />
              <span>Ask CRAFT</span>
              <kbd className="text-[9px] text-[#9CB09A] bg-black/60 px-1.5 py-0.5 rounded border border-white/10">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={isMenuOpen}
              className="md:hidden p-2 rounded-lg bg-[#202D20] border border-white/10 text-[#F0F4EA]"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="pointer-events-auto fixed inset-x-4 top-20 rounded-2xl bg-[#141D14]/95 border border-white/15 backdrop-blur-2xl p-6 md:hidden shadow-2xl z-50">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2.5 px-3 rounded-lg hover:bg-white/5 text-base font-display font-medium text-[#F0F4EA]"
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
                className="mt-3 w-full py-3 rounded-xl bg-[#65A844] text-[#10170F] font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Terminal size={14} /> Ask CRAFT Assistant
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
              <div className="inline-flex items-center gap-3 px-3.5 py-2 bg-[#182217]/90 border border-[#65A844]/40 backdrop-blur-md mb-8 voxel-panel">
                <span className="voxel-dot" />
                <span className="font-mono text-xs text-[#DCE8D5]">
                  OVERWORLD SPAWN · {PORTFOLIO_DATA.profile.role}
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.4rem] font-bold tracking-tight text-[#F0F4EA] leading-[1.06] mb-6">
                Building Intelligence{' '}
                <span className="bg-gradient-to-r from-[#FFFFFF] via-[#B6F08A] to-[#317D3E] bg-clip-text text-transparent">
                  One Block at a Time.
                </span>
              </h1>

              <p className="text-base sm:text-xl text-[#9CB09A] max-w-2xl leading-relaxed mb-10 font-normal">
                I build useful digital experiences at the intersection of artificial intelligence, software engineering, and creative technology.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#projects"
                  className="px-7 py-4 bg-[#65A844] text-[#10170F] font-display font-bold text-sm tracking-wide hover:bg-[#8AD45C] transition-all flex items-center justify-center gap-2 shadow-[0_6px_0_#376F2D] active:translate-y-1 active:shadow-none voxel-panel"
                >
                  <span>Explore My World</span>
                  <ChevronRight size={16} />
                </a>

                <a
                  href="#contact"
                  className="px-7 py-4 rounded-xl bg-[#182217]/85 hover:bg-[#263626] text-[#F0F4EA] border border-white/15 hover:border-[#65A844]/60 font-display font-medium text-sm tracking-wide transition-all flex items-center justify-center gap-2 backdrop-blur-md"
                >
                  <Mail size={15} className="text-[#65A844]" />
                  <span>Contact the Builder</span>
                </a>
              </div>

              <div className="mt-16 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-xl font-mono text-xs">
                <div>
                  <span className="text-[10px] text-[#74836E] block uppercase">SPAWN POINT</span>
                  <span className="text-[#F0F4EA] mt-0.5 block">Bengaluru, India</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#74836E] block uppercase">CRAFTING FOCUS</span>
                  <span className="text-[#65A844] mt-0.5 block">AI / ML & Full-Stack</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-[#74836E] block uppercase">UNIVERSITY</span>
                  <span className="text-[#DCE8D5] mt-0.5 block">Jain University</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            ABOUT SECTION
        ================================================================== */}
        <section id="about" className="py-28 px-6 relative border-t border-white/[0.08]">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 items-start reveal-section">
              <div className="lg:col-span-6 lg:sticky lg:top-28">
                <div className="font-mono text-xs text-[#65A844] uppercase tracking-widest mb-4">
                  The Builder
                </div>

                <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F0F4EA] tracking-tight leading-[1.12] mb-8">
                  Every Builder Has a Beginning.{' '}
                  <span className="text-[#65A844]">Intelligence is the Direction.</span>
                </h2>

                <div
                  onMouseMove={handleSurfaceMouseMove}
                  className="spatial-card p-6 rounded-2xl bg-[#182217]/80 border border-white/[0.08] backdrop-blur-md"
                >
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#9CB09A] mb-4">
                    <span>CORE DISCIPLINES</span>
                    <span className="text-[#65A844]">BCA AI · JAIN UNIVERSITY</span>
                  </div>

                  <svg className="w-full h-32" viewBox="0 0 400 110">
                    <ellipse
                      cx="200"
                      cy="55"
                      rx="170"
                      ry="38"
                      fill="none"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1"
                      strokeDasharray="4 6"
                    />
                    <ellipse
                      cx="200"
                      cy="55"
                      rx="110"
                      ry="24"
                      fill="none"
                      stroke="rgba(101,168,68,0.3)"
                      strokeWidth="1"
                    />
                    <circle cx="200" cy="55" r="10" fill="#152017" stroke="#65A844" strokeWidth="1.75" />
                    <circle cx="90" cy="55" r="4.5" fill="#F0F4EA" />
                    <text x="65" y="76" fill="#DCE8D5" fontSize="9" fontFamily="monospace">
                      AI / ML
                    </text>
                    <circle cx="310" cy="55" r="4.5" fill="#65A844" />
                    <text x="280" y="76" fill="#DCE8D5" fontSize="9" fontFamily="monospace">
                      Full-Stack
                    </text>
                    <circle cx="200" cy="17" r="4" fill="#9CB09A" />
                    <text x="165" y="11" fill="#9CB09A" fontSize="9" fontFamily="monospace">
                      Data Systems
                    </text>
                  </svg>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div
                  onMouseMove={handleSurfaceMouseMove}
                  className="spatial-card p-7 sm:p-8 rounded-2xl bg-[#182217]/80 border border-white/[0.08] backdrop-blur-md space-y-5"
                >
                  <p className="text-base sm:text-lg text-[#F0F4EA] leading-relaxed font-medium">
                    I'm Nayan Choraria, a BCA Artificial Intelligence student at Jain University in
                    Bengaluru, passionate about combining machine learning with practical,
                    well-crafted software.
                  </p>
                  <p className="text-sm sm:text-base text-[#9CB09A] leading-relaxed">
                    Whether I'm building FastAPI services for scam detection, programming sensors
                    for real-time air quality monitoring, or developing full-stack web applications,
                    I focus on clean architecture, reliability, and intuitive user experiences.
                  </p>
                </div>

                <div
                  onMouseMove={handleSurfaceMouseMove}
                  className="spatial-card p-7 rounded-2xl bg-[#182217]/80 border border-white/[0.08] backdrop-blur-md"
                >
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#65A844] mb-4">
                    Areas of Interest
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {PORTFOLIO_DATA.profile.interests.map((interest, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#111910]/80 border border-white/[0.07] flex items-start gap-3"
                      >
                        <span className="font-mono text-[11px] text-[#65A844] mt-0.5">
                          0{idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-[#DCE8D5]">
                          {interest}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div
                    onMouseMove={handleSurfaceMouseMove}
                    className="spatial-card p-6 rounded-2xl bg-[#182217]/80 border border-white/[0.08]"
                  >
                    <span className="font-mono text-[10px] text-[#65A844] uppercase tracking-wider block mb-1">
                      Education
                    </span>
                    <h4 className="font-display font-bold text-base text-[#F0F4EA]">
                      BCA — Artificial Intelligence
                    </h4>
                    <p className="text-xs text-[#9CB09A] mt-1">
                      {PORTFOLIO_DATA.profile.university}
                    </p>
                  </div>

                  <div
                    onMouseMove={handleSurfaceMouseMove}
                    className="spatial-card p-6 rounded-2xl bg-[#182217]/80 border border-white/[0.08]"
                  >
                    <span className="font-mono text-[10px] text-[#9CB09A] uppercase tracking-wider block mb-1">
                      Leadership
                    </span>
                    <h4 className="font-display font-bold text-base text-[#F0F4EA]">
                      {PORTFOLIO_DATA.profile.leadership.role} ·{' '}
                      {PORTFOLIO_DATA.profile.leadership.organization}
                    </h4>
                    <p className="text-xs text-[#9CB09A] mt-1">
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
        <section id="projects" className="py-28 px-6 relative border-t border-white/[0.08]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 reveal-section">
              <div>
                <div className="font-mono text-xs text-[#65A844] uppercase tracking-widest mb-3">
                  Crafted Builds
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F0F4EA] tracking-tight">
                  Projects
                </h2>
              </div>
              <p className="text-sm text-[#9CB09A] max-w-md">
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
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#182217] hover:bg-[#273A27] border border-white/15 hover:border-[#65A844]/50 text-xs font-mono text-[#F0F4EA] transition-all"
              >
                <Layers size={14} className="text-[#65A844]" />
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
        <section id="skills" className="py-28 px-6 relative border-t border-white/[0.08]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 reveal-section">
              <div>
                <div className="font-mono text-xs text-[#65A844] uppercase tracking-widest mb-3">
                  Resources & Skills
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#F0F4EA] tracking-tight">
                  Your Crafting Inventory
                </h2>
              </div>
              <p className="text-sm text-[#9CB09A] max-w-md">
                Choose a resource category to explore the tools and technologies in my developer inventory.
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
                          ? 'bg-[#121217]/95 border-[#65A844] shadow-[0_0_25px_rgba(101,168,68,0.12)]'
                          : isConnected
                          ? 'bg-[#182217]/85 border-white/20'
                          : 'bg-[#182217]/60 border-white/[0.07] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] mb-2">
                        <span className={isSelected ? 'text-[#65A844]' : 'text-[#9CB09A]'}>
                          {skill.items.length} Skills
                        </span>
                        {isSelected ? (
                          <span className="px-2 py-0.5 rounded bg-[#65A844]/15 text-[#65A844]">
                            Selected
                          </span>
                        ) : isConnected ? (
                          <span className="px-2 py-0.5 rounded bg-white/[0.06] text-[#DCE8D5]">
                            Related
                          </span>
                        ) : null}
                      </div>

                      <h3 className="font-display font-bold text-base text-[#F0F4EA] mb-1">
                        {skill.category}
                      </h3>
                      <p className="text-xs text-[#9CB09A] line-clamp-2">{skill.description}</p>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="p-7 rounded-2xl bg-[#182217]/95 border border-[#65A844]/35 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                    <div>
                      <span className="font-mono text-[10px] text-[#65A844] uppercase tracking-wider block">
                        Inventory Details
                      </span>
                      <h3 className="font-display text-2xl font-bold text-[#F0F4EA] mt-1">
                        {currentSkillObj.category}
                      </h3>
                    </div>
                    <Cpu size={22} className="text-[#65A844]" />
                  </div>

                  <p className="text-sm text-[#9CB09A] leading-relaxed mb-6">
                    {currentSkillObj.description}
                  </p>

                  <div className="mb-6">
                    <span className="font-mono text-[10px] text-[#9CB09A] uppercase tracking-wider block mb-3">
                      Items in Inventory
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentSkillObj.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-[#111910] border border-white/15 font-mono text-xs text-[#F0F4EA] flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#65A844]" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <span className="font-mono text-[10px] text-[#65A844] uppercase tracking-wider block mb-2.5">
                      Related Resources
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {currentSkillObj.connections.map((connId) => {
                        const conn = PORTFOLIO_DATA.skills.find((s) => s.id === connId);
                        if (!conn) return null;
                        return (
                          <button
                            key={connId}
                            onClick={() => setActiveSkillCategory(connId)}
                            className="text-[11px] font-mono text-[#9CB09A] hover:text-[#65A844] bg-white/[0.03] border border-white/10 px-2.5 py-1 rounded transition-colors"
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
        <section id="contact" className="py-32 px-6 relative border-t border-white/[0.08]">
          <div className="max-w-4xl mx-auto text-center reveal-section">
            <div className="relative w-20 h-20 mx-auto mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#65A844]/25 animate-ping opacity-20" />
              <div className="w-16 h-16 rounded-2xl bg-[#182217] border border-[#65A844]/45 flex items-center justify-center text-[#65A844] shadow-[0_0_30px_rgba(101,168,68,0.12)]">
                <Radio size={26} />
              </div>
            </div>

            <div className="font-mono text-xs text-[#65A844] uppercase tracking-widest mb-3">
              Open a Portal
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#F0F4EA] tracking-tight mb-5">
              Ready for the Next Build?
            </h2>

            <p className="text-base sm:text-lg text-[#9CB09A] max-w-xl mx-auto leading-relaxed mb-12">
              I'm always open to interesting ideas, collaborative builds, and meaningful technology projects.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
              <button
                onClick={copyEmail}
                className="p-4 rounded-xl bg-[#182217] hover:bg-[#263626] border border-white/15 hover:border-[#65A844] text-[#F0F4EA] transition-all flex items-center justify-center gap-3 group"
              >
                {copied ? (
                  <Check size={18} className="text-[#65A844]" />
                ) : (
                  <Mail size={18} className="text-[#65A844] transition-colors" />
                )}
                <span className="font-mono text-xs sm:text-sm font-medium">
                  {copied ? 'Email Copied!' : PORTFOLIO_DATA.profile.email}
                </span>
              </button>

              <a
                href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                className="p-4 rounded-xl bg-[#F0F4EA] hover:bg-[#65A844] text-[#10170F] font-display font-semibold text-sm transition-all flex items-center justify-center gap-2"
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
                className="px-6 py-3.5 rounded-xl bg-[#182217]/85 border border-white/10 hover:border-[#65A844]/50 text-xs font-mono text-[#F0F4EA] flex items-center gap-2.5 transition-all"
              >
                <Github size={16} className="text-[#65A844]" />
                <span>GitHub</span>
                <ArrowUpRight size={13} className="opacity-60" />
              </a>

              <a
                href={PORTFOLIO_DATA.profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#182217]/85 border border-white/10 hover:border-[#65A844]/50 text-xs font-mono text-[#F0F4EA] flex items-center gap-2.5 transition-all"
              >
                <Linkedin size={16} className="text-[#65A844]" />
                <span>LinkedIn</span>
                <ArrowUpRight size={13} className="opacity-60" />
              </a>

              {PORTFOLIO_DATA.profile.resumeUrl && (
                <a
                  href={PORTFOLIO_DATA.profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-[#182217]/85 border border-white/10 hover:border-[#F0F4EA]/50 text-xs font-mono text-[#F0F4EA] flex items-center gap-2.5 transition-all"
                >
                  <FileText size={16} className="text-[#F0F4EA]" />
                  <span>Resume</span>
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================================
          CRAFT INTERACTIVE ASSISTANT
      ==================================================================== */}
      {!isTarsDismissed && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
          {!isTarsExpanded && (
            <div className="flex items-center gap-3 p-2.5 pl-3.5 rounded-2xl bg-[#182217]/95 border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.9)] backdrop-blur-xl max-w-xs sm:max-w-sm">
              <button
                onClick={() => setIsTarsExpanded(true)}
                className="flex items-center gap-3 text-left group"
                title="Open CRAFT Assistant"
              >
                <div className="w-7 h-9 bg-[#0D150D] border border-white/15 p-1 grid grid-cols-4 gap-0.5 items-center shrink-0">
                  <span className="h-full bg-[#9CB09A] group-hover:bg-[#65A844] transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <span className="h-4/5 bg-[#F0F4EA] group-hover:translate-y-0.5 transition-transform duration-300" />
                  <span className="h-full bg-[#9CB09A] group-hover:-translate-y-0.5 transition-transform duration-300" />
                  <span className="h-full bg-[#65A844]" />
                </div>

                <div className="pr-1">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[#65A844] uppercase tracking-wider">
                    <span>CRAFT Assistant</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#65A844] animate-pulse" />
                  </div>
                  <p className="font-mono text-[11px] text-[#DCE8D5] line-clamp-1 mt-0.5">
                    {tarsStatusReadout}
                  </p>
                </div>
              </button>

              <button
                onClick={() => setIsTarsExpanded(true)}
                className="p-2 rounded-lg bg-white/5 hover:bg-[#65A844]/20 text-[#65A844] transition-colors"
                aria-label="Open CRAFT Chat"
              >
                <MessageSquare size={14} />
              </button>

              <button
                onClick={() => setIsTarsDismissed(true)}
                className="p-1.5 rounded-lg text-[#9CB09A] hover:text-[#F0F4EA] transition-colors"
                aria-label="Dismiss CRAFT Assistant"
                title="Hide CRAFT"
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
          aria-label="CRAFT Assistant"
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div
            className="fixed inset-0"
            onClick={() => setIsTarsExpanded(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-xl rounded-2xl bg-[#141D14] border border-[#65A844]/35 shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col">
            <div className="px-5 py-3.5 bg-[#202D20] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#10170F] border border-white/15 p-0.5 grid grid-cols-4 gap-0.5">
                  <span className="bg-[#9CB09A]" />
                  <span className="bg-[#F0F4EA]" />
                  <span className="bg-[#9CB09A]" />
                  <span className="bg-[#65A844]" />
                </div>
                <div>
                  <span className="font-mono text-xs font-semibold text-[#F0F4EA] block">
                    CRAFT Portfolio Assistant
                  </span>
                  <span className="font-mono text-[10px] text-[#65A844] block">
                    Powered by Groq LLaMA
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsTarsExpanded(false)}
                className="p-1.5 rounded-lg bg-white/5 text-[#9CB09A] hover:text-[#F0F4EA]"
                aria-label="Minimize CRAFT Modal"
              >
                <Minimize2 size={15} />
              </button>
            </div>

            <div className="px-5 py-2.5 bg-[#111910] border-b border-white/10 grid grid-cols-2 gap-4 font-mono text-[10px]">
              <label className="flex items-center gap-2 text-[#9CB09A]">
                <span>HONESTY:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={honesty}
                  onChange={(e) => setHonesty(Number(e.target.value))}
                  className="w-full accent-[#F0F4EA] h-1 bg-white/10 rounded"
                />
                <span className="text-[#F0F4EA] w-8 text-right">{honesty}%</span>
              </label>

              <label className="flex items-center gap-2 text-[#9CB09A]">
                <span>HUMOR:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={humor}
                  onChange={(e) => setHumor(Number(e.target.value))}
                  className="w-full accent-[#65A844] h-1 bg-white/10 rounded"
                />
                <span className="text-[#65A844] w-8 text-right">{humor}%</span>
              </label>
            </div>

            <div className="px-5 py-2 bg-[#141D14] border-b border-white/5 flex flex-wrap gap-1.5">
              {[
                'Tell me about Nayan’s live projects',
                'What is his tech stack?',
                'How can I contact Nayan?'
              ].map((promptText, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setAiInput(promptText)}
                  className="text-[10px] font-mono text-[#9CB09A] hover:text-[#65A844] bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 px-2.5 py-1 rounded transition-colors"
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
                      ? 'bg-[#263626] border-white/15 ml-8 text-[#F0F4EA]'
                      : 'bg-[#111910] border-[#65A844]/25 mr-6 text-[#F0F4EA]'
                  }`}
                >
                  <div className="font-mono text-[9px] uppercase tracking-wider mb-1 text-[#9CB09A]">
                    {msg.role === 'user' ? 'You' : 'CRAFT'}
                  </div>
                  <p className="leading-relaxed font-sans text-xs sm:text-sm">{msg.content}</p>
                </div>
              ))}
              {isAiLoading && (
                <div className="p-3.5 rounded-xl bg-[#111910] border border-[#65A844]/30 mr-6 flex items-center gap-2.5 text-xs font-mono text-[#65A844]">
                  <Loader2 size={14} className="animate-spin" />
                  <span>Thinking...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form
              onSubmit={handleAiSubmit}
              className="p-3 bg-[#111910] border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask about projects, skills, or experience..."
                className="flex-1 bg-[#202D20] border border-white/10 focus:border-[#65A844] rounded-xl px-3.5 py-2.5 text-xs text-[#F0F4EA] placeholder:text-[#74836E] focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                disabled={isAiLoading || !aiInput.trim()}
                className="px-4 py-2.5 rounded-xl bg-[#65A844] text-[#10170F] font-mono text-xs font-semibold hover:bg-[#F0F4EA] disabled:opacity-40 transition-colors"
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
      <footer className="relative z-10 py-8 px-6 border-t border-white/[0.08] bg-[#10170F]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#9CB09A]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#65A844]" />
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
