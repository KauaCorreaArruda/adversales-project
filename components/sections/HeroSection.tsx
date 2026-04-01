"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  {
    title: "ADVERSALES",
    sub1: "Demanda qualificada massiva,",
    sub2: "integrada com vendas. Do anúncio ao fechamento.",
  },
  {
    title: "DEMANDA",
    sub1: "Anúncios de precisão que atraem decisores.",
    sub2: "Não leads — oportunidades reais de negócio.",
  },
  {
    title: "VENDAS",
    sub1: "Funil automatizado com IA.",
    sub2: "Seu time só entra quando o lead já está quente.",
  },
];

export default function HeroSection() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const flashRef      = useRef<HTMLDivElement>(null);
  const menuRef       = useRef<HTMLDivElement>(null);
  const badgeRef      = useRef<HTMLDivElement>(null);
  const ctaRef        = useRef<HTMLDivElement>(null);
  const scrollProgRef = useRef<HTMLDivElement>(null);

  // 3 title refs
  const title0Ref = useRef<HTMLHeadingElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);

  // 3 subtitle refs
  const sub0Ref = useRef<HTMLDivElement>(null);
  const sub1Ref = useRef<HTMLDivElement>(null);
  const sub2Ref = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [isReady, setIsReady] = useState(false);
  const currentPhase = useRef(0);
  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });

  const threeRefs = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    renderer: THREE.WebGLRenderer | null;
    composer: EffectComposer | null;
    stars: THREE.Points[];
    nebula: THREE.Mesh | null;
    atm: THREE.Mesh | null;
    mountains: THREE.Mesh[];
    animationId: number | null;
    targetCameraX?: number;
    targetCameraY?: number;
    targetCameraZ?: number;
    locations?: number[];
  }>({
    scene: null, camera: null, renderer: null, composer: null,
    stars: [], nebula: null, atm: null, mountains: [], animationId: null,
  });

  const titleRefs = useMemo(
    () => [title0Ref, title1Ref, title2Ref],
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const subRefs = useMemo(
    () => [sub0Ref, sub1Ref, sub2Ref],
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // ─── THREE.JS INIT ───────────────────────────────────────────────────────────
  useEffect(() => {
    const { current: refs } = threeRefs;

    try {

    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

    refs.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    refs.camera.position.set(0, 20, 100);

    refs.renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: true, alpha: true });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.5;

    refs.composer = new EffectComposer(refs.renderer);
    refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
    refs.composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.8, 0.4, 0.85));

    // Stars
    for (let i = 0; i < 3; i++) {
      const count = 5000;
      const positions = new Float32Array(count * 3);
      const colors    = new Float32Array(count * 3);
      const sizes     = new Float32Array(count);
      for (let j = 0; j < count; j++) {
        const r = 200 + Math.random() * 800;
        const t = Math.random() * Math.PI * 2;
        const p = Math.acos(Math.random() * 2 - 1);
        positions[j*3]   = r * Math.sin(p) * Math.cos(t);
        positions[j*3+1] = r * Math.sin(p) * Math.sin(t);
        positions[j*3+2] = r * Math.cos(p);
        const c = new THREE.Color();
        const ch = Math.random();
        if (ch < 0.7)      c.setHSL(0,   0,   0.8 + Math.random() * 0.2);
        else if (ch < 0.9) c.setHSL(0.08, 0.5, 0.8);
        else               c.setHSL(0.6,  0.5, 0.8);
        colors[j*3] = c.r; colors[j*3+1] = c.g; colors[j*3+2] = c.b;
        sizes[j] = Math.random() * 2 + 0.5;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("color",    new THREE.BufferAttribute(colors,    3));
      geo.setAttribute("size",     new THREE.BufferAttribute(sizes,     1));
      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: i } },
        vertexShader: `
          attribute float size; attribute vec3 color; varying vec3 vColor;
          uniform float time; uniform float depth;
          void main() {
            vColor = color; vec3 pos = position;
            float a = time * 0.05 * (1.0 - depth * 0.3);
            mat2 rot = mat2(cos(a),-sin(a),sin(a),cos(a));
            pos.xy = rot * pos.xy;
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            gl_FragColor = vec4(vColor, 1.0 - smoothstep(0.0, 0.5, d));
          }`,
        transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const pts = new THREE.Points(geo, mat);
      refs.scene!.add(pts);
      refs.stars.push(pts);
    }

    // Nebula
    const nebGeo = new THREE.PlaneGeometry(8000, 4000, 100, 100);
    const nebMat = new THREE.ShaderMaterial({
      uniforms: {
        time:    { value: 0 },
        color1:  { value: new THREE.Color(0x0033ff) },
        color2:  { value: new THREE.Color(0xff0066) },
        opacity: { value: 0.3 },
      },
      vertexShader: `
        varying vec2 vUv; varying float vElev; uniform float time;
        void main() {
          vUv = uv; vec3 pos = position;
          float e = sin(pos.x*0.01+time)*cos(pos.y*0.01+time)*20.0;
          pos.z += e; vElev = e;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
        }`,
      fragmentShader: `
        uniform vec3 color1; uniform vec3 color2;
        uniform float opacity; uniform float time;
        varying vec2 vUv; varying float vElev;
        void main() {
          float m = sin(vUv.x*10.0+time)*cos(vUv.y*10.0+time);
          vec3 col = mix(color1, color2, m*0.5+0.5);
          float a = opacity * (1.0 - length(vUv-0.5)*2.0);
          gl_FragColor = vec4(col, a*(1.0+vElev*0.01));
        }`,
      transparent: true, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false,
    });
    refs.nebula = new THREE.Mesh(nebGeo, nebMat);
    refs.nebula.position.z = -1050;
    refs.scene!.add(refs.nebula);

    // Mountains
    const layers = [
      { z: -50,  h: 60,  color: 0x1a1a2e, op: 1.0 },
      { z: -100, h: 80,  color: 0x16213e, op: 0.8 },
      { z: -150, h: 100, color: 0x0f3460, op: 0.6 },
      { z: -200, h: 120, color: 0x0a4668, op: 0.4 },
    ];
    layers.forEach((layer, idx) => {
      const pts: THREE.Vector2[] = [];
      for (let i = 0; i <= 50; i++) {
        const x = (i/50 - 0.5) * 1000;
        const y = Math.sin(i*0.1)*layer.h + Math.sin(i*0.05)*layer.h*0.5 + Math.random()*layer.h*0.2 - 100;
        pts.push(new THREE.Vector2(x, y));
      }
      pts.push(new THREE.Vector2(5000, -300), new THREE.Vector2(-5000, -300));
      const shape = new THREE.Shape(pts);
      const geo   = new THREE.ShapeGeometry(shape);
      const mat   = new THREE.MeshBasicMaterial({ color: layer.color, transparent: true, opacity: layer.op, side: THREE.DoubleSide });
      const mesh  = new THREE.Mesh(geo, mat);
      mesh.position.set(0, layer.z, layer.z);
      mesh.userData = { baseZ: layer.z, index: idx };
      refs.scene!.add(mesh);
      refs.mountains.push(mesh);
    });

    // Atmosphere
    const atmGeo = new THREE.SphereGeometry(600, 32, 32);
    const atmMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        varying vec3 vNorm;
        void main() { vNorm = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader: `
        varying vec3 vNorm; uniform float time;
        void main() {
          float i = pow(0.7 - dot(vNorm,vec3(0,0,1)), 2.0);
          vec3 atm = vec3(0.3,0.6,1.0)*i*(sin(time*2.0)*0.1+0.9);
          gl_FragColor = vec4(atm, i*0.25);
        }`,
      side: THREE.BackSide, blending: THREE.AdditiveBlending, transparent: true,
    });
    refs.atm = new THREE.Mesh(atmGeo, atmMat);
    refs.scene!.add(refs.atm);

    // Store initial mountain z positions
    refs.locations = refs.mountains.map(m => m.position.z);

    // Animate loop
    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      refs.stars.forEach(s => { (s.material as THREE.ShaderMaterial).uniforms.time.value = t; });
      if (refs.nebula) (refs.nebula.material as THREE.ShaderMaterial).uniforms.time.value = t * 0.5;
      if (
        refs.camera &&
        refs.targetCameraX !== undefined &&
        refs.targetCameraY !== undefined &&
        refs.targetCameraZ !== undefined
      ) {
        const s = 0.05;
        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * s;
        smoothCameraPos.current.y += (refs.targetCameraY - smoothCameraPos.current.y) * s;
        smoothCameraPos.current.z += (refs.targetCameraZ - smoothCameraPos.current.z) * s;
        refs.camera.position.set(
          smoothCameraPos.current.x + Math.sin(t*0.1)*2,
          smoothCameraPos.current.y + Math.cos(t*0.15)*1,
          smoothCameraPos.current.z
        );
        refs.camera.lookAt(0, 10, -600);
      }
      refs.mountains.forEach((m, i) => {
        const pf = 1 + i * 0.5;
        m.position.x = Math.sin(t*0.1)*2*pf;
        m.position.y = 50 + Math.cos(t*0.15)*pf;
      });
      refs.composer?.render();
    };
    animate();

    } catch (e) {
      console.error("[HeroSection] Three.js init error:", e);
    } finally {
      setIsReady(true);
    }

    const onResize = () => {
      if (!refs.camera || !refs.renderer || !refs.composer) return;
      refs.camera.aspect = window.innerWidth / window.innerHeight;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      refs.animationId = null;
      window.removeEventListener("resize", onResize);
      refs.stars.forEach(s => { s.geometry.dispose(); (s.material as THREE.Material).dispose(); });
      refs.stars = [];
      refs.mountains.forEach(m => { m.geometry.dispose(); (m.material as THREE.Material).dispose(); });
      refs.mountains = [];
      refs.locations = [];
      if (refs.nebula) { refs.nebula.geometry.dispose(); (refs.nebula.material as THREE.Material).dispose(); refs.nebula = null; }
      if (refs.atm) { refs.atm.geometry.dispose(); (refs.atm.material as THREE.Material).dispose(); refs.atm = null; }
      if (refs.renderer) { refs.renderer.dispose(); refs.renderer = null; }
      refs.scene = null;
      refs.camera = null;
      refs.composer = null;
    };
  }, []);

  // ─── GSAP ENTRANCE (phase 0 — ADVERSALES) ────────────────────────────────────
  useEffect(() => {
    if (!isReady) return;

    // Show phase-0 elements, hide phases 1+2
    gsap.set([menuRef.current, title0Ref.current, sub0Ref.current,
               badgeRef.current, ctaRef.current, scrollProgRef.current], { visibility: "visible", opacity: 1 });
    gsap.set([title1Ref.current, title2Ref.current, sub1Ref.current, sub2Ref.current], { visibility: "hidden", opacity: 0 });

    const tl = gsap.timeline();

    if (menuRef.current)
      tl.from(menuRef.current, { x: -100, opacity: 0, duration: 1, ease: "power3.out" });

    if (badgeRef.current)
      tl.from(badgeRef.current, { y: -24, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.4");

    if (title0Ref.current) {
      const chars = title0Ref.current.querySelectorAll(".title-char");
      tl.fromTo(chars, { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, stagger: 0.05, ease: "power4.out" }, "-=0.3");
    }

    if (sub0Ref.current) {
      const lines = sub0Ref.current.querySelectorAll(".subtitle-line");
      tl.fromTo(lines, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.18, ease: "power3.out" }, "-=0.7");
    }

    if (ctaRef.current)
      tl.fromTo(ctaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4");

    if (scrollProgRef.current)
      tl.fromTo(scrollProgRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.5");

    return () => { tl.kill(); };
  }, [isReady]);

  // ─── SCROLL HANDLER ──────────────────────────────────────────────────────────
  useEffect(() => {
    const transitionPhase = (prevPhase: number, nextPhase: number) => {
      // Animate OUT previous title + subtitle
      if (prevPhase >= 0) {
        const prevTitle = titleRefs[prevPhase].current;
        const prevSub   = subRefs[prevPhase].current;
        if (prevTitle) {
          gsap.killTweensOf(prevTitle.querySelectorAll(".title-char"));
          gsap.to(prevTitle.querySelectorAll(".title-char"), { y: -80, opacity: 0, duration: 0.4, stagger: 0.02, ease: "power3.in",
            onComplete: () => { gsap.set(prevTitle, { visibility: "hidden" }); } });
        }
        if (prevSub) {
          gsap.killTweensOf(prevSub.querySelectorAll(".subtitle-line"));
          gsap.to(prevSub.querySelectorAll(".subtitle-line"), { y: -30, opacity: 0, duration: 0.3, stagger: 0.1, ease: "power2.in",
            onComplete: () => { gsap.set(prevSub, { visibility: "hidden" }); } });
        }
      }

      // Animate IN new title + subtitle
      const newTitle = titleRefs[nextPhase].current;
      const newSub   = subRefs[nextPhase].current;
      if (newTitle) {
        gsap.set(newTitle, { visibility: "visible" });
        const chars = newTitle.querySelectorAll(".title-char");
        gsap.killTweensOf(chars);
        gsap.fromTo(chars, { y: 120, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.04, ease: "power4.out", delay: 0.05 });
      }
      if (newSub) {
        gsap.set(newSub, { visibility: "visible" });
        const lines = newSub.querySelectorAll(".subtitle-line");
        gsap.killTweensOf(lines);
        gsap.fromTo(lines, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: "power3.out", delay: 0.2 });
      }

      // Flash explosion when VENDAS appears
      if (nextPhase === 2 && flashRef.current) {
        gsap.killTweensOf(flashRef.current);
        gsap.fromTo(flashRef.current, { opacity: 0 }, {
          opacity: 0.85, duration: 0.12, ease: "power2.in",
          onComplete: () => { gsap.to(flashRef.current!, { opacity: 0, duration: 0.55, ease: "power2.out" }); },
        });
      }
    };

    const handleScroll = () => {
      const scrollY    = window.scrollY;
      const heroHeight = containerRef.current?.offsetHeight ?? window.innerHeight * 3;
      const progress   = Math.min(scrollY / heroHeight, 1);
      setScrollProgress(progress);

      const phase = progress >= 0.60 ? 2 : progress >= 0.30 ? 1 : 0;
      setCurrentSection(phase + 1);

      if (currentPhase.current !== phase) {
        transitionPhase(currentPhase.current, phase);
        currentPhase.current = phase;
      }

      // Camera travel
      const { current: refs } = threeRefs;
      const camPos = [
        { x: 0, y: 30, z: 300 },
        { x: 0, y: 35, z: -50 },
        { x: 0, y: 45, z: -400 },
        { x: 0, y: 50, z: -700 },
      ];
      const sf = progress * 3;
      const si = Math.min(Math.floor(sf), 2);
      const sp = sf - si;
      const cp = camPos[si], np = camPos[si + 1] ?? cp;
      refs.targetCameraX = cp.x + (np.x - cp.x) * sp;
      refs.targetCameraY = cp.y + (np.y - cp.y) * sp;
      refs.targetCameraZ = cp.z + (np.z - cp.z) * sp;

      // Mountains parallax
      refs.mountains.forEach((m, i) => {
        if (progress > 0.80) m.position.z = 600000;
        else if (refs.locations) m.position.z = refs.locations[i];
      });
      if (refs.nebula && refs.mountains[3])
        refs.nebula.position.z = refs.mountains[3].position.z;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Flash explosion overlay */}
      <div ref={flashRef} className="hero-flash" />

      <div ref={containerRef} className="hero-container">
        <canvas ref={canvasRef} className="hero-canvas" />

        {/* Side menu */}
        <div ref={menuRef} className="side-menu" style={{ visibility: "hidden" }}>
          <div className="menu-icon"><span /><span /><span /></div>
          <div className="vertical-text">ADVERSALES</div>
        </div>

        {/* Main hero content */}
        <div className="hero-content">

          {/* Badge */}
          <div ref={badgeRef} className="hero-badge" style={{ visibility: "hidden" }}>
            <span className="hero-badge-dot" />
            <span className="hero-badge-text">
              Infraestrutura de Receita para B2B, SaaS e Empresas de Serviço Online
            </span>
          </div>

          {/* ── Title wrapper: 3 overlapping headlines ── */}
          <div className="hero-title-wrapper">

            {/* Phase 0 — ADVERSALES */}
            <h1 ref={title0Ref} className="hero-title-main" style={{ visibility: "hidden" }}>
              {PHASES[0].title.split("").map((c, i) => <span key={i} className="title-char">{c}</span>)}
            </h1>

            {/* Phase 1 — DEMANDA */}
            <h1 ref={title1Ref} className="hero-title-main hero-title-overlay" style={{ visibility: "hidden" }}>
              {PHASES[1].title.split("").map((c, i) => <span key={i} className="title-char">{c}</span>)}
            </h1>

            {/* Phase 2 — VENDAS */}
            <h1 ref={title2Ref} className="hero-title-main hero-title-overlay" style={{ visibility: "hidden" }}>
              {PHASES[2].title.split("").map((c, i) => <span key={i} className="title-char">{c}</span>)}
            </h1>
          </div>

          {/* ── Subtitle wrapper: 3 overlapping subheadlines ── */}
          <div className="hero-subtitle-wrapper">

            {/* Subheadline 0 */}
            <div ref={sub0Ref} className="hero-subtitle" style={{ visibility: "hidden" }}>
              <p className="subtitle-line">{PHASES[0].sub1}</p>
              <p className="subtitle-line">{PHASES[0].sub2}</p>
            </div>

            {/* Subheadline 1 */}
            <div ref={sub1Ref} className="hero-subtitle hero-subtitle-overlay" style={{ visibility: "hidden" }}>
              <p className="subtitle-line">{PHASES[1].sub1}</p>
              <p className="subtitle-line">{PHASES[1].sub2}</p>
            </div>

            {/* Subheadline 2 */}
            <div ref={sub2Ref} className="hero-subtitle hero-subtitle-overlay" style={{ visibility: "hidden" }}>
              <p className="subtitle-line">{PHASES[2].sub1}</p>
              <p className="subtitle-line">{PHASES[2].sub2}</p>
            </div>
          </div>

          {/* CTA */}
          <div ref={ctaRef} className="hero-cta" style={{ visibility: "hidden" }}>
            <a href="#problema" className="hero-cta-btn">
              Quero saber mais
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div ref={scrollProgRef} className="scroll-progress" style={{ visibility: "hidden" }}>
          <div className="scroll-text">SCROLL</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${scrollProgress * 100}%` }} />
          </div>
          <div className="section-counter">
            {String(currentSection).padStart(2, "0")} / 03
          </div>
        </div>
      </div>
    </>
  );
}
