"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

export interface GlitterWarpProps {
  /** Width of the component in pixels or CSS value */
  width?: number | string;
  /** Height of the component in pixels or CSS value */
  height?: number | string;
  /** Animation speed multiplier */
  speed?: number;
  /** Star color in hex format */
  color?: string;
  /** Density of stars (higher = more spread out) */
  density?: number;
  /** Star brightness multiplier */
  brightness?: number;
  /** Star size (higher = larger stars) */
  starSize?: number;
  /** Focal depth for perspective (lower = stronger 3D effect) */
  focalDepth?: number;
  /** Turbulence intensity for wavey distortion */
  turbulence?: number;
  /** Whether to automatically play the animation */
  autoPlay?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Content to render on top of the glitter effect */
  children?: React.ReactNode;
}

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : { r: 1, g: 1, b: 1 };
};

const GlitterWarp: React.FC<GlitterWarpProps> = ({
  width = "100%",
  height = "100%",
  speed = 1.0,
  color = "#ffffff",
  density = 15.0,
  brightness = 1.0,
  starSize = 0.1,
  focalDepth = 0.05,
  turbulence = 0.0,
  autoPlay = true,
  className,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  // Segundos ya transcurridos cuando el bucle se detuvo, para reanudar sin salto.
  const acumuladoRef = useRef<number>(0);
  const corriendoRef = useRef<boolean>(false);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  // El color queda fuera de las dependencias del efecto pesado: cambiarlo no
  // puede reconstruir el renderer. El ref se lo acerca al crear el material.
  const colorRef = useRef<string>(color);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const rgb = hexToRgb(colorRef.current);

    const rect = container.getBoundingClientRect();
    const actualWidth = rect.width;
    const actualHeight = rect.height;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        // El plano cubre el viewport exacto: no hay bordes de geometría que
        // suavizar, así que el MSAA sólo costaría un framebuffer multimuestreado.
        antialias: false,
        alpha: true,
        powerPreference: "default",
      });
    } catch (err) {
      console.warn(
        "GlitterWarp: no se pudo crear el contexto WebGL, se omite el fondo animado.",
        err,
      );
      return;
    }
    renderer.setClearColor(0x000000, 0);

    // En táctil el techo baja: sobre un shader decorativo el detalle extra del
    // DPR alto es imperceptible y el buffer cuesta memoria y ancho de banda.
    const esTactil = window.matchMedia("(pointer: coarse)").matches;
    const pixelRatio = Math.min(window.devicePixelRatio, esTactil ? 1.5 : 2);
    renderer.setSize(actualWidth, actualHeight, false);
    renderer.setPixelRatio(pixelRatio);

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const bufferWidth = actualWidth * pixelRatio;
    const bufferHeight = actualHeight * pixelRatio;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(bufferWidth, bufferHeight, 1.0) },
      uColor: { value: new THREE.Vector3(rgb.r, rgb.g, rgb.b) },
      uDensity: { value: density },
      uBrightness: { value: brightness },
      uStarSize: { value: starSize },
      uFocalDepth: { value: focalDepth },
      uTurbulence: { value: turbulence },
    };

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float iTime;
      uniform vec3 iResolution;
      uniform vec3 uColor;
      uniform float uDensity;
      uniform float uBrightness;
      uniform float uStarSize;
      uniform float uFocalDepth;
      uniform float uTurbulence;

      void main() {
        vec2 screenPos = gl_FragCoord.xy;
        vec2 centerOffset = screenPos - (iResolution.xy * 0.5);
        vec2 normalizedCoords = centerOffset / iResolution.y;

        vec3 viewDirection = normalize(vec3(normalizedCoords, uFocalDepth));

        vec3 travelOffset = vec3(0.0, 0.0, iTime);
        vec3 spacePosition = (viewDirection * uDensity) + travelOffset;

        if (uTurbulence > 0.0) {
          spacePosition.x += sin(spacePosition.z * 0.5 + iTime) * uTurbulence;
          spacePosition.y += cos(spacePosition.z * 0.3 + iTime * 0.7) * uTurbulence;
        }

        vec3 gridCell = floor(spacePosition);
        vec3 cellOffset = fract(spacePosition);

        vec3 hashVector = vec3(2.154, -6.21, 0.42);
        vec3 starPosition = fract(cross(gridCell, hashVector));
        starPosition = (starPosition * 0.5) + 0.25;

        float distToStar = distance(cellOffset, starPosition);

        float intensityFalloff = uStarSize - distToStar;
        float starIntensity = max(0.0, intensityFalloff * 10.0 * uBrightness);

        starIntensity = starIntensity * starIntensity;

        if (starIntensity < 0.01) {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
          return;
        }

        vec3 finalColor = uColor * starIntensity;

        gl_FragColor = vec4(finalColor, starIntensity);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneMinusSrcAlphaFactor,
      depthTest: false,
      depthWrite: false,
      premultipliedAlpha: true,
    });

    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    startTimeRef.current = performance.now();

    const movimientoReducido = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const render = () => {
      renderer.render(scene, camera);
    };

    const loop = (t: number) => {
      uniforms.iTime.value = ((t - startTimeRef.current) / 1000) * speed;
      render();
      rafRef.current = requestAnimationFrame(loop);
    };

    const arrancar = () => {
      if (corriendoRef.current) return;
      corriendoRef.current = true;
      // Corre el origen hacia atrás para continuar donde quedó, no desde cero.
      startTimeRef.current = performance.now() - acumuladoRef.current * 1000;
      rafRef.current = requestAnimationFrame(loop);
    };

    const detener = () => {
      if (!corriendoRef.current) return;
      corriendoRef.current = false;
      acumuladoRef.current = (performance.now() - startTimeRef.current) / 1000;
      cancelAnimationFrame(rafRef.current);
    };

    const sincronizar = () => {
      if (autoPlay && !movimientoReducido.matches && !document.hidden) {
        arrancar();
        return;
      }
      detener();
      // Sin bucle hace falta un cuadro explícito; oculto no hay nada que pintar.
      if (!document.hidden) render();
    };

    sincronizar();

    movimientoReducido.addEventListener("change", sincronizar);
    document.addEventListener("visibilitychange", sincronizar);

    const handleResize = () => {
      const newRect = container.getBoundingClientRect();
      const newWidth = newRect.width;
      const newHeight = newRect.height;

      renderer.setSize(newWidth, newHeight, false);

      const newBufferWidth = newWidth * pixelRatio;
      const newBufferHeight = newHeight * pixelRatio;
      uniforms.iResolution.value.set(newBufferWidth, newBufferHeight, 1.0);

      // Con el bucle detenido nadie repintaría el canvas tras el redimensionado.
      render();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      movimientoReducido.removeEventListener("change", sincronizar);
      document.removeEventListener("visibilitychange", sincronizar);
      detener();
      scene.remove(mesh);
      materialRef.current = null;
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [speed, density, brightness, starSize, focalDepth, turbulence, autoPlay]);

  useEffect(() => {
    colorRef.current = color;
    const uColor = materialRef.current?.uniforms.uColor.value;
    if (uColor instanceof THREE.Vector3) {
      const rgb = hexToRgb(color);
      uColor.set(rgb.r, rgb.g, rgb.b);
    }
  }, [color]);

  const widthStyle = typeof width === "number" ? `${width}px` : width;
  const heightStyle = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        width: widthStyle,
        height: heightStyle,
      }}
    >
      <div ref={containerRef} className="absolute inset-0" />
      {children && (
        <div className="relative z-10 w-full h-full pointer-events-none">
          {children}
        </div>
      )}
    </div>
  );
};

GlitterWarp.displayName = "GlitterWarp";

export default GlitterWarp;
