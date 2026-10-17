import React, { useState } from "react";
import { Sliders, Eye, EyeOff, Code, Layers, Sparkles, RefreshCw } from "lucide-react";

interface LayerToggle {
  id: string;
  name: string;
  zIndex: number;
  type: string;
  enabled: boolean;
  color: string;
  description: string;
  gsapProperty: string;
}

export function VectorLayerPlayground() {
  const [scrubProgress, setScrubProgress] = useState(0.85); // 0.0 to 1.0
  const [activeTab, setActiveTab] = useState<"visual" | "code">("visual");

  const [layers, setLayers] = useState<LayerToggle[]>([
    {
      id: "l1",
      name: "1. Parchment Canvas & Vignette",
      zIndex: 10,
      type: "Canvas / CSS Gradient",
      enabled: true,
      color: "#FFF8F3",
      description: "Warm editorial texture base with soft center radial mask",
      gsapProperty: "transform: scale3d(1.0 -> 1.05)",
    },
    {
      id: "l2",
      name: "2. Molecular Network & Constellations",
      zIndex: 20,
      type: "SVG Path + Circle Mesh",
      enabled: true,
      color: "#E6C594",
      description: "Interconnected evidence nodes with pulsing opacity & glow",
      gsapProperty: "strokeDashoffset: 1000 -> 0, opacity: 0.2 -> 0.85",
    },
    {
      id: "l3",
      name: "3. Anatomical Manuscripts & Notes",
      zIndex: 30,
      type: "DPI Vector / Blend Overlay",
      enabled: true,
      color: "#8C7A6B",
      description: "Da Vinci style handwritten text & scientific lung sketch notes",
      gsapProperty: "transform: translateY(-30px), opacity: 0.9 -> 0.45",
    },
    {
      id: "l4",
      name: "4. DNA Helix Ink Tree Roots",
      zIndex: 40,
      type: "SVG Vector Dual Path",
      enabled: true,
      color: "#2C2623",
      description: "Intricate double-helix pen sketch lines",
      gsapProperty: "strokeDashoffset line draw, opacity: 1.0 -> 0.0 morph",
    },
    {
      id: "l5",
      name: "5. 3D Stacked Books & Page Flip",
      zIndex: 50,
      type: "CSS 3D / WebGL Mesh",
      enabled: true,
      color: "#4A2E2B",
      description: "Leather-bound codex with Y-axis opening page turn",
      gsapProperty: "rotateY: 0deg -> -165deg, translateY: 80px -> 0px",
    },
    {
      id: "l6",
      name: "6. Golden Fountain Pen Nib",
      zIndex: 60,
      type: "SVG Metal Nib Vector",
      enabled: true,
      color: "#D4AF37",
      description: "Handwriting nib with golden gradient & contact shadow",
      gsapProperty: "transform: translate3d(80px, -120px, 0) rotate(-15deg)",
    },
    {
      id: "l7",
      name: "7. 3D Organic Tree Trunk",
      zIndex: 70,
      type: "SVG Path / Bark Texture",
      enabled: true,
      color: "#4A3525",
      description: "Wood trunk erupting from book gutter with bark hollows",
      gsapProperty: "clipPath: inset(100% -> 0%), scaleY: 0.1 -> 1.0",
    },
    {
      id: "l8",
      name: "8. Botanical Leaf Canopy",
      zIndex: 80,
      type: "SVG Group (<g>)",
      enabled: true,
      color: "#486B4F",
      description: "Foliage leaves bursting outward along branch endpoints",
      gsapProperty: "scale: 0 -> 1.2 -> 1.0 stagger",
    },
    {
      id: "l9",
      name: "9. Purple Floral Blossoms",
      zIndex: 90,
      type: "Multi-Petal SVG Component",
      enabled: true,
      color: "#A78BFA",
      description: "Lush botanical flowers with golden center stamens",
      gsapProperty: "scale: 0 -> 1.35 -> 1.0 spring bloom, opacity: 0 -> 1",
    },
    {
      id: "l10",
      name: "10. Vera Watermark Sparkle",
      zIndex: 100,
      type: "SVG Anchor Icon",
      enabled: true,
      color: "#B58A59",
      description: "4-point star brand sparkle fixed in lower right",
      gsapProperty: "opacity: 0.65 -> 1.0 pulse, rotate: 0deg -> 90deg",
    },
  ]);

  const toggleLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, enabled: !l.enabled } : l))
    );
  };

  const isLayerActive = (id: string) => layers.find((l) => l.id === id)?.enabled ?? false;

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 py-12 text-[#2C2623]">
      <div className="mb-8 border-b border-[#E6DCCF] pb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#B58A59] uppercase mb-2">
            <Layers className="w-4 h-4" /> SVG + GSAP Layer Separation Playground
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#2C2623]">10-Layer Independent Vector Sandbox</h2>
        </div>
        <div className="flex items-center gap-2 bg-[#FFF8F3] p-1 rounded-lg border border-[#E6DCCF]">
          <button
            onClick={() => setActiveTab("visual")}
            className={`px-4 py-1.5 rounded-md text-xs font-mono transition-all ${
              activeTab === "visual"
                ? "bg-[#2C2623] text-white shadow-sm"
                : "text-[#8C7A6B] hover:text-[#2C2623]"
            }`}
          >
            Visual Canvas
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`px-4 py-1.5 rounded-md text-xs font-mono transition-all ${
              activeTab === "code"
                ? "bg-[#2C2623] text-white shadow-sm"
                : "text-[#8C7A6B] hover:text-[#2C2623]"
            }`}
          >
            GSAP Code
          </button>
        </div>
      </div>

      {/* Scrub Slider Control */}
      <div className="mb-8 bg-[#FFF8F3] p-6 rounded-xl border border-[#E6DCCF] space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#8C7A6B] font-semibold uppercase flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#B58A59]" /> SIMULATED SCROLL SCRUB PROGRESS
          </span>
          <span className="bg-[#2C2623] text-white px-3 py-1 rounded font-bold">
            {(scrubProgress * 100).toFixed(0)}% (Frame Math: {Math.round(scrubProgress * 239)} / 239)
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={scrubProgress}
          onChange={(e) => setScrubProgress(parseFloat(e.target.value))}
          className="w-full accent-[#2C2623] cursor-pointer h-2 bg-[#E6DCCF] rounded-lg"
        />
        <div className="flex justify-between text-[11px] font-mono text-[#8C7A6B]">
          <span>0% (Pen Ink Macro)</span>
          <span>30% (Books Stacking)</span>
          <span>60% (Trunk Sprout)</span>
          <span>100% (Floral Bloom)</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Visual Vector Playground Preview */}
        <div className="lg:col-span-8 space-y-4">
          {activeTab === "visual" ? (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[#FFF8F3] border border-[#E6DCCF] shadow-lg flex items-center justify-center p-8">
              {/* Layer 1: Parchment Background */}
              {isLayerActive("l1") && (
                <div
                  className="absolute inset-0 bg-cover bg-center pointer-events-none transition-transform duration-300"
                  style={{
                    backgroundImage: `url('${import.meta.env.BASE_URL}hero-bg.png')`,
                    transform: `scale(${1 + scrubProgress * 0.05})`,
                  }}
                />
              )}

              {/* Layer 2: Molecular Node Network */}
              {isLayerActive("l2") && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <g opacity={Math.min(1, scrubProgress * 1.5)}>
                    <circle cx="25%" cy="30%" r="6" fill="#E6C594" />
                    <circle cx="75%" cy="25%" r="8" fill="#E6C594" />
                    <circle cx="85%" cy="65%" r="5" fill="#E6C594" />
                    <line x1="25%" y1="30%" x2="75%" y2="25%" stroke="#E6C594" strokeWidth="1.5" strokeDasharray="6 4" />
                    <line x1="75%" y1="25%" x2="85%" y2="65%" stroke="#E6C594" strokeWidth="1.5" strokeDasharray="6 4" />
                  </g>
                </svg>
              )}

              {/* Layer 5: Stacked Books */}
              {isLayerActive("l5") && scrubProgress > 0.15 && (
                <div
                  className="relative w-72 h-44 rounded-lg bg-[#4A2E2B] shadow-2xl border border-[#6B423D] flex items-center justify-center transition-all duration-500"
                  style={{
                    transform: `translateY(${(1 - Math.min(1, (scrubProgress - 0.15) * 3)) * 60}px) rotateX(${
                      (1 - scrubProgress) * 15
                    }deg)`,
                    opacity: Math.min(1, (scrubProgress - 0.15) * 4),
                  }}
                >
                  <span className="text-[#E6C594] font-serif text-sm font-semibold tracking-wider">
                    VERA RESEARCH CODEX
                  </span>
                  {/* Page flip element */}
                  <div
                    className="absolute inset-y-0 right-0 w-1/2 bg-[#F7F1E5] rounded-r-lg border-l border-[#D4C3A3] shadow-md origin-left transition-transform duration-300"
                    style={{
                      transform: `rotateY(-${Math.min(160, Math.max(0, (scrubProgress - 0.3) * 400))}deg)`,
                    }}
                  />
                </div>
              )}

              {/* Layer 7 & 8 & 9: Tree, Leaves, Blossoms */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1280 720">
                {/* Layer 7: Trunk */}
                {isLayerActive("l7") && scrubProgress > 0.4 && (
                  <path
                    d="M 640 480 C 640 380, 560 300, 480 200 M 640 480 C 640 360, 720 280, 800 180 M 640 480 L 640 220"
                    stroke="#4A3525"
                    strokeWidth="14"
                    strokeLinecap="round"
                    fill="none"
                    style={{
                      strokeDasharray: 1000,
                      strokeDashoffset: 1000 * (1 - Math.min(1, (scrubProgress - 0.4) * 2.5)),
                      transition: "stroke-dashoffset 0.1s linear",
                    }}
                  />
                )}

                {/* Layer 8: Foliage Leaves */}
                {isLayerActive("l8") && scrubProgress > 0.65 && (
                  <g>
                    <circle cx="480" cy="200" r="32" fill="#486B4F" opacity={Math.min(0.85, (scrubProgress - 0.65) * 3)} />
                    <circle cx="800" cy="180" r="36" fill="#486B4F" opacity={Math.min(0.85, (scrubProgress - 0.65) * 3)} />
                    <circle cx="640" cy="220" r="40" fill="#486B4F" opacity={Math.min(0.85, (scrubProgress - 0.65) * 3)} />
                  </g>
                )}

                {/* Layer 9: Floral Blossoms */}
                {isLayerActive("l9") && scrubProgress > 0.75 && (
                  <g>
                    <g
                      transform="translate(480, 200)"
                      style={{
                        transform: `translate(480px, 200px) scale(${Math.min(1, (scrubProgress - 0.75) * 4)})`,
                        transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      }}
                    >
                      <circle r="20" fill="#A78BFA" />
                      <circle r="6" fill="#FBBF24" />
                    </g>
                    <g
                      transform="translate(800, 180)"
                      style={{
                        transform: `translate(800px, 180px) scale(${Math.min(1, (scrubProgress - 0.75) * 4)})`,
                        transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      }}
                    >
                      <circle r="24" fill="#F472B6" />
                      <circle r="7" fill="#FBBF24" />
                    </g>
                  </g>
                )}
              </svg>

              {/* Layer 6: Fountain Pen */}
              {isLayerActive("l6") && (
                <div
                  className="absolute pointer-events-none transition-all duration-300"
                  style={{
                    top: "35%",
                    left: "50%",
                    transform: `translate(${scrubProgress * 120}px, -${scrubProgress * 140}px) rotate(-${
                      scrubProgress * 20
                    }deg)`,
                    opacity: 1 - scrubProgress * 0.8,
                  }}
                >
                  <svg className="w-14 h-14 drop-shadow-xl" viewBox="0 0 64 64">
                    <path d="M 32 0 L 48 32 L 32 64 L 16 32 Z" fill="#D4AF37" />
                  </svg>
                </div>
              )}

              {/* Layer 10: Watermark */}
              {isLayerActive("l10") && (
                <div className="absolute bottom-4 right-4 text-[#B58A59] opacity-80 animate-pulse">
                  <Sparkles className="w-6 h-6" />
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#1E1E1E] text-[#D4D4D4] p-6 rounded-xl font-mono text-xs overflow-x-auto border border-[#333] shadow-lg leading-relaxed">
              <pre>{`// GSAP 3 + ScrollTrigger Vector Layer Animation Timeline
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#hero-experience",
    start: "top top",
    end: "+=400%",
    scrub: 0.8,
    pin: true,
  }
});

// Layer 6: Golden Fountain Pen Lift
tl.to("#fountain-pen", {
  y: -140, x: 120, rotation: -20, opacity: 0, duration: 0.2
}, 0);

// Layer 5: Stacked Books & 3D Page Turn
tl.fromTo("#books-stack", 
  { y: 60, opacity: 0 }, 
  { y: 0, opacity: 1, duration: 0.3 }, 0.15
);
tl.to("#book-page", { rotateY: -160, duration: 0.3 }, 0.3);

// Layer 7: 3D Organic Tree Trunk Growth
tl.fromTo("#tree-trunk-path",
  { strokeDashoffset: 1000 },
  { strokeDashoffset: 0, duration: 0.3, ease: "power2.inOut" }, 0.4
);

// Layer 8 & 9: Leaf Canopy & Floral Spring Bloom
tl.fromTo(".leaf-node", { scale: 0 }, { scale: 1, stagger: 0.05 }, 0.65);
tl.fromTo(".flower-blossom",
  { scale: 0, opacity: 0 },
  { scale: 1, opacity: 1, ease: "back.out(1.7)", stagger: 0.04 }, 0.75
);`}</pre>
            </div>
          )}
        </div>

        {/* Layer Controls Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#FFF8F3] border border-[#E6DCCF] rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="font-serif font-bold text-lg text-[#2C2623] flex items-center justify-between">
              <span>Layer Visibility (10 Layers)</span>
              <button
                onClick={() =>
                  setLayers((prev) => prev.map((l) => ({ ...l, enabled: true })))
                }
                className="text-xs font-mono text-[#B58A59] hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset All
              </button>
            </h3>
            <p className="text-xs text-[#8C7A6B]">
              Toggle individual layers to isolate independent motions and verify z-index composition.
            </p>

            <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
              {layers.map((l) => (
                <div
                  key={l.id}
                  className={`p-3 rounded-lg border text-xs transition-all ${
                    l.enabled
                      ? "bg-white border-[#E6DCCF] shadow-sm"
                      : "bg-black/5 border-transparent opacity-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[#2C2623] font-mono">{l.name}</span>
                    <button
                      onClick={() => toggleLayer(l.id)}
                      className="p-1 rounded hover:bg-black/5 text-[#2C2623]"
                      title={l.enabled ? "Hide Layer" : "Show Layer"}
                    >
                      {l.enabled ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-rose-500" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-[#8C7A6B] mb-1">{l.description}</p>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#B58A59] bg-[#FFF8F3] px-2 py-0.5 rounded border border-[#E6DCCF]">
                    <span>Z: {l.zIndex}</span>
                    <span>•</span>
                    <span className="truncate">{l.gsapProperty}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
