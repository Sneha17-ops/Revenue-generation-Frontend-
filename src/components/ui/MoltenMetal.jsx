'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// GLSL Shaders for MoltenMetal effect
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform float uScale;
  uniform float uDetail;
  uniform float uGlow;
  uniform float uCoreSize;
  uniform float uSwirl;
  uniform float uFold;
  uniform float uBlackPoint;
  uniform float uBrightness;
  uniform float uOpacity;
  uniform float uGrainIntensity;
  uniform float uMouseStrength;

  varying vec2 vUv;

  // 2D Simplex Noise Helper
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                            -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xx33;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yc * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // FBM (Fractal Brownian Motion)
  float fbm(vec2 st, float detail) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      if (float(i) >= detail) break;
      value += amplitude * snoise(st * frequency);
      st *= 2.1;
      amplitude *= 0.5;
    }
    return value;
  }

  // Film Grain Generator
  float random(vec2 p) {
    return fract(sin(dot(p.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 st = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);

    // Apply mouse influence
    st += uMouse * uMouseStrength * 0.2;

    // Scale coordinates
    st *= uScale * 0.8;

    // Swirl and Fold Domain Warping
    float t = uTime * 0.4;
    vec2 q = vec2(0.0);
    q.x = fbm(st + vec2(0.0, 0.0) + t * 0.1, uDetail);
    q.y = fbm(st + vec2(5.2, 1.3) + t * 0.15, uDetail);

    vec2 r = vec2(0.0);
    r.x = fbm(st + uSwirl * q + vec2(1.7, 9.2) + uFold * t, uDetail);
    r.y = fbm(st + uSwirl * q + vec2(8.3, 2.8) + uFold * t, uDetail);

    float f = fbm(st + r, uDetail);

    // Color interpolation using uColor1, uColor2, uColor3
    vec3 color = mix(uColor3, uColor1, clamp(f * f * 4.0, 0.0, 1.0));
    color = mix(color, uColor2, clamp(length(q) * 0.8, 0.0, 1.0));

    // Core glow and specular highlights
    float glowMask = pow(clamp(f * uGlow + uCoreSize, 0.0, 1.0), 2.0);
    color += uColor2 * glowMask * 0.4;

    // Apply brightness and black point offset
    color = (color - vec3(uBlackPoint)) * uBrightness;
    color = max(color, vec3(0.0));

    // Apply subtle film grain
    float grain = (random(vUv + uTime) - 0.5) * uGrainIntensity;
    color += vec3(grain);

    gl_FragColor = vec4(color, uOpacity);
  }
`;

function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  return new THREE.Vector3(
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255
  );
}

export const MoltenMetal = ({
  color1 = "#bcd792",
  color2 = "#d7c387",
  color3 = "#076c4b",
  colorMode = "molten",
  speed = 0.35,
  scale = 4,
  detail = 3,
  glow = 1.6,
  coreSize = 0.1,
  swirl = 1,
  fold = -0.2,
  blackPoint = 0.05,
  brightness = 1.3,
  opacity = 1,
  grain = true,
  grainIntensity = 0.05,
  mouseInteraction = true,
  mouseStrength = 0.3,
  className = "",
  style = {}
}) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const uniformsRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const effectiveSpeed = prefersReducedMotion ? 0.05 : speed;

    const width = containerRef.current.clientWidth || 400;
    const height = containerRef.current.clientHeight || 400;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'low-power'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Clear existing canvas children
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(renderer.domElement);

    // Uniforms
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor1: { value: hexToRgb(color1) },
      uColor2: { value: hexToRgb(color2) },
      uColor3: { value: hexToRgb(color3) },
      uScale: { value: scale },
      uDetail: { value: detail },
      uGlow: { value: glow },
      uCoreSize: { value: coreSize },
      uSwirl: { value: swirl },
      uFold: { value: fold },
      uBlackPoint: { value: blackPoint },
      uBrightness: { value: brightness },
      uOpacity: { value: opacity },
      uGrainIntensity: { value: grain ? grainIntensity : 0.0 },
      uMouseStrength: { value: mouseInteraction ? mouseStrength : 0.0 }
    };
    uniformsRef.current = uniforms;

    // Geometry & Mesh
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      uniforms.uTime.value = elapsedTime * effectiveSpeed * 2.0;

      // Lerp mouse coordinates smoothly
      if (mouseInteraction) {
        mousePosRef.current.x += (mousePosRef.current.targetX - mousePosRef.current.x) * 0.05;
        mousePosRef.current.y += (mousePosRef.current.targetY - mousePosRef.current.y) * 0.05;
        uniforms.uMouse.value.set(mousePosRef.current.x, mousePosRef.current.y);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Mouse Move Handler
    const handleMouseMove = (e) => {
      if (!mouseInteraction || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mousePosRef.current.targetX = x;
      mousePosRef.current.targetY = y;
    };

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      rendererRef.current.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };

    const containerEl = containerRef.current;
    if (mouseInteraction && containerEl) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (mouseInteraction) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (containerEl && renderer.domElement) {
        containerEl.removeChild(renderer.domElement);
      }
    };
  }, [
    color1, color2, color3, colorMode, speed, scale, detail, glow, 
    coreSize, swirl, fold, blackPoint, brightness, opacity, grain, 
    grainIntensity, mouseInteraction, mouseStrength
  ]);

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden pointer-events-none select-none ${className}`}
      style={{ width: '100%', height: '100%', ...style }}
    />
  );
};

export default MoltenMetal;
