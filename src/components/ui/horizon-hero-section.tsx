import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

gsap.registerPlugin(ScrollTrigger);

interface ThreeRefs {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  composer: EffectComposer | null;
  stars: THREE.Points[];
  nebula: THREE.Mesh | null;
  mountains: THREE.Mesh[];
  animationId: number | null;
  targetCameraX?: number;
  targetCameraY?: number;
  targetCameraZ?: number;
  locations?: number[];
}

interface HorizonHeroProps {
  name?: string;
  title?: string;
  subtitle?: string;
}

// Code snippet auto-typer
const CODE_LINES = [
  { text: 'const engineer = {',         color: 'text-purple-400' },
  { text: '  name: "James Ouko",',      color: 'text-green-400' },
  { text: '  role: "Senior SWE",',      color: 'text-green-400' },
  { text: '  stack: [',                 color: 'text-blue-400' },
  { text: '    "React", "Node.js",',    color: 'text-yellow-300' },
  { text: '    "Flutter", "AWS",',      color: 'text-yellow-300' },
  { text: '    "Spring Boot",',         color: 'text-yellow-300' },
  { text: '  ],',                       color: 'text-blue-400' },
  { text: '  available: true,',         color: 'text-[#cc005f]' },
  { text: '  hire: () => {',            color: 'text-purple-400' },
  { text: '    return "Let\'s build";', color: 'text-green-400' },
  { text: '  }',                        color: 'text-purple-400' },
  { text: '};',                         color: 'text-purple-400' },
];

const useCodeTyper = (speed = 28) => {
  const [lineIndex, setLineIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [lines, setLines] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (lineIndex >= CODE_LINES.length) return;
    const current = CODE_LINES[lineIndex].text;
    if (charIndex < current.length) {
      const t = setTimeout(() => setCharIndex(c => c + 1), speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLines(l => [...l, current]);
        setLineIndex(i => i + 1);
        setCharIndex(0);
      }, 60);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex, speed]);

  const currentPartial = lineIndex < CODE_LINES.length
    ? CODE_LINES[lineIndex].text.slice(0, charIndex)
    : '';

  return { lines, currentPartial, lineIndex };
};

const CodeSnippet = () => {
  const { lines, currentPartial, lineIndex } = useCodeTyper(22);

  return (
    <div
      className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-20 w-72 rounded-xl overflow-hidden"
      style={{
        background: 'rgba(10,10,15,0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(204,0,95,0.08)',
      }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-white/20 text-[10px] tracking-[0.2em] font-mono">engineer.ts</span>
      </div>
      {/* Code body */}
      <div className="px-4 py-4 font-mono text-[11px] leading-6 min-h-[200px]">
        {lines.map((line, i) => (
          <div key={i} className={CODE_LINES[i]?.color ?? 'text-white/60'}>{line}</div>
        ))}
        {lineIndex < CODE_LINES.length && (
          <div className={CODE_LINES[lineIndex]?.color ?? 'text-white/60'}>
            {currentPartial}
            <span className="animate-pulse text-[#cc005f]">▋</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Typewriter hook
const useTypewriter = (words: string[], speed = 80, pause = 2000) => {
  const [displayed, setDisplayed] = React.useState('');
  const [wordIndex, setWordIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIndex(c => c + 1);
        }
      } else {
        setDisplayed(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setDeleting(false);
          setWordIndex(w => w + 1);
          setCharIndex(0);
        } else {
          setCharIndex(c => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return displayed;
};

export const Component = ({ name = 'Dev Ouko', title = 'FULL STACK DEVELOPER', subtitle = 'Building the future, one line at a time' }: HorizonHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const totalSections = 2;

  const typewriterText = useTypewriter([
    'Full Stack Web Developer',
    'Mobile App Engineer',
    'API Architect',
    'React & Node.js Expert',
    'Flutter Developer',
    'Cloud & DevOps Engineer',
  ], 70, 2200);

  const threeRefs = useRef<ThreeRefs>({
    scene: null, camera: null, renderer: null, composer: null,
    stars: [], nebula: null, mountains: [], animationId: null
  });

  useEffect(() => {
    const refs = threeRefs.current;

    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

    refs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    refs.camera.position.z = 100;
    refs.camera.position.y = 20;

    refs.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: true, alpha: true });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.5;

    refs.composer = new EffectComposer(refs.renderer);
    refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.8, 0.4, 0.85);
    refs.composer.addPass(bloomPass);

    createStarField(refs);
    createNebula(refs);
    createMountains(refs);
    createAtmosphere(refs);
    getLocation(refs);
    animate(refs);
    setIsReady(true);

    const handleResize = () => {
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener('resize', handleResize);
      refs.stars.forEach(s => { s.geometry.dispose(); (s.material as THREE.Material).dispose(); });
      refs.mountains.forEach(m => { m.geometry.dispose(); (m.material as THREE.Material).dispose(); });
      if (refs.nebula) { refs.nebula.geometry.dispose(); (refs.nebula.material as THREE.Material).dispose(); }
      if (refs.renderer) refs.renderer.dispose();
    };
  }, []);

  const createStarField = (refs: ThreeRefs) => {
    const starCount = 5000;
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);
      for (let j = 0; j < starCount; j++) {
        const radius = 200 + Math.random() * 800;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[j * 3 + 2] = radius * Math.cos(phi);
        const color = new THREE.Color();
        const c = Math.random();
        if (c < 0.7) color.setHSL(0, 0, 0.8 + Math.random() * 0.2);
        else if (c < 0.9) color.setHSL(0.08, 0.5, 0.8);
        else color.setHSL(0.6, 0.5, 0.8);
        colors[j * 3] = color.r; colors[j * 3 + 1] = color.g; colors[j * 3 + 2] = color.b;
        sizes[j] = Math.random() * 2 + 0.5;
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: i } },
        vertexShader: `attribute float size;attribute vec3 color;varying vec3 vColor;uniform float time;uniform float depth;void main(){vColor=color;vec3 pos=position;float angle=time*0.05*(1.0-depth*0.3);mat2 rot=mat2(cos(angle),-sin(angle),sin(angle),cos(angle));pos.xy=rot*pos.xy;vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);gl_PointSize=size*(300.0/-mvPosition.z);gl_Position=projectionMatrix*mvPosition;}`,
        fragmentShader: `varying vec3 vColor;void main(){float dist=length(gl_PointCoord-vec2(0.5));if(dist>0.5)discard;float opacity=1.0-smoothstep(0.0,0.5,dist);gl_FragColor=vec4(vColor,opacity);}`,
        transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
      });
      const stars = new THREE.Points(geometry, material);
      refs.scene!.add(stars);
      refs.stars.push(stars);
    }
  };

  const createNebula = (refs: ThreeRefs) => {
    const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
    const material = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, color1: { value: new THREE.Color(0x0033ff) }, color2: { value: new THREE.Color(0xcc005f) }, opacity: { value: 0.3 } },
      vertexShader: `varying vec2 vUv;varying float vElevation;uniform float time;void main(){vUv=uv;vec3 pos=position;float elevation=sin(pos.x*0.01+time)*cos(pos.y*0.01+time)*20.0;pos.z+=elevation;vElevation=elevation;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);}`,
      fragmentShader: `uniform vec3 color1;uniform vec3 color2;uniform float opacity;uniform float time;varying vec2 vUv;varying float vElevation;void main(){float mixFactor=sin(vUv.x*10.0+time)*cos(vUv.y*10.0+time);vec3 color=mix(color1,color2,mixFactor*0.5+0.5);float alpha=opacity*(1.0-length(vUv-vec2(0.5))*2.0);alpha*=1.0+vElevation*0.01;gl_FragColor=vec4(color,alpha);}`,
      transparent: true, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false
    });
    const nebula = new THREE.Mesh(geometry, material);
    nebula.position.z = -1050;
    refs.scene!.add(nebula);
    refs.nebula = nebula;
  };

  const createMountains = (refs: ThreeRefs) => {
    const layers = [
      { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
      { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
      { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
      { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 }
    ];
    layers.forEach((layer, index) => {
      const points: THREE.Vector2[] = [];
      const segments = 50;
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments - 0.5) * 1000;
        const y = Math.sin(i * 0.1) * layer.height + Math.sin(i * 0.05) * layer.height * 0.5 + Math.random() * layer.height * 0.2 - 100;
        points.push(new THREE.Vector2(x, y));
      }
      points.push(new THREE.Vector2(5000, -300));
      points.push(new THREE.Vector2(-5000, -300));
      const shape = new (THREE as any).Shape(points);
      const geometry = new THREE.ShapeGeometry(shape);
      const material = new THREE.MeshBasicMaterial({ color: layer.color, transparent: true, opacity: layer.opacity, side: THREE.DoubleSide });
      const mountain = new THREE.Mesh(geometry, material);
      mountain.position.z = layer.distance;
      mountain.position.y = layer.distance;
      mountain.userData = { baseZ: layer.distance, index };
      refs.scene!.add(mountain);
      refs.mountains.push(mountain);
    });
  };

  const createAtmosphere = (refs: ThreeRefs) => {
    const geometry = new THREE.SphereGeometry(600, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `varying vec3 vNormal;void main(){vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader: `varying vec3 vNormal;uniform float time;void main(){float intensity=pow(0.7-dot(vNormal,vec3(0.0,0.0,1.0)),2.0);vec3 atmosphere=vec3(0.3,0.6,1.0)*intensity;float pulse=sin(time*2.0)*0.1+0.9;atmosphere*=pulse;gl_FragColor=vec4(atmosphere,intensity*0.25);}`,
      side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true
    });
    refs.scene!.add(new THREE.Mesh(geometry, material));
  };

  const getLocation = (refs: ThreeRefs) => {
    refs.locations = refs.mountains.map(m => m.position.z);
  };

  const animate = (refs: ThreeRefs) => {
    refs.animationId = requestAnimationFrame(() => animate(refs));
    const time = Date.now() * 0.001;
    refs.stars.forEach(s => { if ((s.material as THREE.ShaderMaterial).uniforms) (s.material as THREE.ShaderMaterial).uniforms.time.value = time; });
    if (refs.nebula && (refs.nebula.material as THREE.ShaderMaterial).uniforms) (refs.nebula.material as THREE.ShaderMaterial).uniforms.time.value = time * 0.5;
    if (refs.camera && refs.targetCameraX !== undefined) {
      const sf = 0.05;
      smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * sf;
      smoothCameraPos.current.y += (refs.targetCameraY! - smoothCameraPos.current.y) * sf;
      smoothCameraPos.current.z += (refs.targetCameraZ! - smoothCameraPos.current.z) * sf;
      refs.camera.position.x = smoothCameraPos.current.x + Math.sin(time * 0.1) * 2;
      refs.camera.position.y = smoothCameraPos.current.y + Math.cos(time * 0.15) * 1;
      refs.camera.position.z = smoothCameraPos.current.z;
      refs.camera.lookAt(0, 10, -600);
    }
    refs.mountains.forEach((m, i) => {
      m.position.x = Math.sin(time * 0.1) * 2 * (1 + i * 0.5);
      m.position.y = 50 + Math.cos(time * 0.15) * 1 * (1 + i * 0.5);
    });
    if (refs.composer) refs.composer.render();
  };

  useEffect(() => {
    if (!isReady) return;
    gsap.set([menuRef.current, titleRef.current, subtitleRef.current, scrollProgressRef.current], { visibility: 'visible' });
    const tl = gsap.timeline();
    if (menuRef.current) tl.from(menuRef.current, { x: -100, opacity: 0, duration: 1, ease: 'power3.out' });
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.title-char');
      tl.from(chars, { y: 200, opacity: 0, duration: 1.5, stagger: 0.05, ease: 'power4.out' }, '-=0.5');
    }
    if (subtitleRef.current) {
      const lines = subtitleRef.current.querySelectorAll('.subtitle-line');
      tl.from(lines, { y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }, '-=0.8');
    }
    if (scrollProgressRef.current) tl.from(scrollProgressRef.current, { opacity: 0, y: 50, duration: 1, ease: 'power2.out' }, '-=0.5');
    return () => { tl.kill(); };
  }, [isReady]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Only track scroll within the hero container (300vh)
      const heroHeight = containerRef.current ? containerRef.current.offsetHeight - window.innerHeight : window.innerHeight * 2;
      const progress = Math.min(scrollY / heroHeight, 1);
      const isPastHero = scrollY > heroHeight;
      // Hide fixed overlays when past the hero
      [menuRef, titleRef, subtitleRef, scrollProgressRef].forEach(ref => {
        if (ref.current) ref.current.style.opacity = isPastHero ? '0' : '1';
      });
      if (canvasRef.current) canvasRef.current.style.opacity = isPastHero ? '0' : '1';
      setScrollProgress(progress);
      const newSection = Math.floor(progress * totalSections);
      setCurrentSection(newSection);
      const refs = threeRefs.current;
      const totalProgress = progress * totalSections;
      const sectionProgress = totalProgress % 1;
      const cameraPositions = [
        { x: 0, y: 30, z: 300 },
        { x: 0, y: 40, z: -50 },
        { x: 0, y: 50, z: -700 }
      ];
      const currentPos = cameraPositions[newSection] || cameraPositions[0];
      const nextPos = cameraPositions[newSection + 1] || currentPos;
      refs.targetCameraX = currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
      refs.targetCameraY = currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
      refs.targetCameraZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;
      refs.mountains.forEach((mountain, i) => {
        const speed = 1 + i * 0.9;
        if (progress > 0.7) { mountain.position.z = 600000; }
        else if (refs.locations) { mountain.position.z = refs.locations[i]; }
        if (refs.nebula) refs.nebula.position.z = mountain.position.z;
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalSections]);

  return (
    <div ref={containerRef} className="hero-container relative">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />

      {/* Side menu */}
      <div ref={menuRef} className="fixed left-8 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4" style={{ visibility: 'hidden' }}>
        <div className="flex flex-col gap-1.5 cursor-pointer">
          <span className="block w-6 h-0.5 bg-[#cc005f]"></span>
          <span className="block w-4 h-0.5 bg-[#cc005f]"></span>
          <span className="block w-6 h-0.5 bg-[#cc005f]"></span>
        </div>
      </div>

      {/* Hero content */}
      <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-10 pointer-events-none">
        <h1 ref={titleRef} className="font-black tracking-widest text-6xl md:text-8xl lg:text-9xl overflow-hidden" style={{ visibility: 'hidden', fontFamily: 'Inter, sans-serif', letterSpacing: '0.15em' }}>
          {name.toUpperCase().split(' ').map((word, wi) => (
            <span key={wi} className={wi === 0 ? 'text-white' : 'text-[#cc005f]'}>
              {word.split('').map((char, i) => (
                <span key={i} className="title-char inline-block">{char}</span>
              ))}
              {wi < name.split(' ').length - 1 && <span className="title-char inline-block">&nbsp;</span>}
            </span>
          ))}
        </h1>
        <div ref={subtitleRef} className="mt-6 text-center px-4" style={{ visibility: 'hidden' }}>
          <p className="subtitle-line text-sm md:text-base tracking-[0.3em] uppercase font-light mb-1" style={{ minHeight: '1.5em' }}>
            <span className="text-white/80">{typewriterText}</span>
            <span className="text-[#cc005f] animate-pulse">|</span>
          </p>
          <p className="subtitle-line text-white/35 text-xs tracking-[0.35em] uppercase font-light mt-2">{subtitle}</p>

          {/* Quick stats */}
          <div className="subtitle-line flex items-center justify-center gap-6 mt-6">
            {[
              { value: '6+', label: 'Years' },
              { value: '40+', label: 'Projects' },
              { value: '15+', label: 'Clients' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-0.5">
                <span className="text-white text-lg font-bold tracking-wide">{value}</span>
                <span className="text-white/30 text-[10px] tracking-[0.25em] uppercase font-light">{label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="subtitle-line flex items-center justify-center gap-4 mt-6 pointer-events-auto">
            <a
              href="#projects"
              onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-6 py-2.5 rounded-lg text-xs tracking-[0.2em] uppercase font-light text-white transition-all duration-300"
              style={{ background: 'rgba(204,0,95,0.85)', border: '1px solid rgba(204,0,95,0.5)' }}
            >
              View Work
            </a>
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-6 py-2.5 rounded-lg text-xs tracking-[0.2em] uppercase font-light text-white/70 hover:text-white transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              Hire Me
            </a>
          </div>

          {/* Available badge */}
          <div className="subtitle-line flex items-center justify-center gap-2 mt-5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-light">Available for new projects</span>
          </div>
        </div>
      </div>

      {/* Scroll progress */}
      <div ref={scrollProgressRef} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2" style={{ visibility: 'hidden' }}>
        <div className="text-white/50 text-xs tracking-[0.4em] uppercase">Scroll</div>
        <div className="w-32 h-px bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-[#cc005f] transition-all duration-100" style={{ width: `${scrollProgress * 100}%` }} />
        </div>
        <div className="text-white/40 text-xs tracking-widest">
          {String(currentSection).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
        </div>
      </div>

      {/* Scroll sections */}
      <div className="relative z-10" style={{ height: '300vh' }}>
        <section className="h-screen" />
        <section className="h-screen" />
        <section className="h-screen" />
      </div>
    </div>
  );
};
