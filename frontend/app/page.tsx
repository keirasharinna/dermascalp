"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Upload, ShieldCheck, Activity, AlertCircle, ScanSearch,
  Microscope, CheckCircle2, XCircle, Stethoscope, X, ChevronRight,
  Brain, Zap, Eye, BookOpen, FlaskConical, Cpu
} from "lucide-react";

import { 
  CONDITION_DATA, 
  CONDITIONS_ENCYCLOPEDIA, 
  AI_TECH_SECTIONS, 
  PROTOCOL_TABS_DATA,
  Severity 
} from "./data";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

const IconMap: Record<string, React.ElementType> = {
  Brain, Eye, Zap, Cpu, BookOpen, FlaskConical
};

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-white/10 rounded-xl ${className}`} />;
}

function ConditionsPage({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedCondition = CONDITIONS_ENCYCLOPEDIA.find((c) => c.id === selected);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto overlay-fade-in" style={{ background: "rgba(4,10,20,0.97)", backdropFilter: "blur(20px)" }}>
      <div className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(32,178,170,0.06) 0%, transparent 70%)" }} />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)" }} />
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 relative z-10">
        <div className="flex items-start justify-between mb-10 page-slide-in">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-8 bg-[#20B2AA] rounded-full" />
              <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#20B2AA]">Dermascalp Encyclopedia</p>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">Kondisi Klinis</h1>
            <p className="text-white/50 mt-2 text-sm font-medium">Kondisi yang dideteksi oleh sistem AI Dermascalp</p>
          </div>
          <button onClick={onClose} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/60 hover:text-white mt-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!selected ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 page-slide-in">
            {CONDITIONS_ENCYCLOPEDIA.map((cond, i) => (
              <button key={cond.id} onClick={() => setSelected(cond.id)} className="card-hover text-left p-6 rounded-2xl border border-white/10 bg-white/[0.03] relative overflow-hidden group" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${cond.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border ${cond.tagColor} mb-4`}>{cond.tag}</span>
                  <h3 className="text-xl font-black text-white tracking-tight mb-1">{cond.name}</h3>
                  <p className="text-xs text-white/40 font-medium mb-4">{cond.subtitle}</p>
                  <p className="text-sm text-white/60 leading-relaxed line-clamp-3">{cond.description}</p>
                  <div className="mt-5 flex items-center gap-2" style={{ color: cond.accentColor }}>
                    <span className="text-xs font-bold tracking-wider uppercase">Pelajari lebih lanjut</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : selectedCondition ? (
          <div className="page-slide-in">
            <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8 group">
              <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Kembali ke daftar kondisi
            </button>
            <div className="rounded-3xl border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="p-8 md:p-12 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${selectedCondition.accentColor}12 0%, transparent 60%)` }}>
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${selectedCondition.accentColor}15 0%, transparent 70%)` }} />
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider border ${selectedCondition.tagColor} mb-6`}>{selectedCondition.tag}</span>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">{selectedCondition.name}</h2>
                <p className="text-sm font-medium mb-6" style={{ color: selectedCondition.accentColor }}>{selectedCondition.subtitle}</p>
                <p className="text-white/70 leading-relaxed text-base max-w-2xl">{selectedCondition.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border" style={{ borderColor: `${selectedCondition.accentColor}40`, color: selectedCondition.accentColor, background: `${selectedCondition.accentColor}10` }}>
                  📊 {selectedCondition.prevalence}
                </div>
              </div>
              <div className="p-8 md:p-12 border-t border-white/5">
                <p className="text-xs tracking-[0.3em] uppercase font-black text-white/40 mb-8">Faktor Penyebab</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCondition.causes.map((cause, i) => (
                    <div key={i} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-black" style={{ background: `${selectedCondition.accentColor}15`, color: selectedCondition.accentColor }}>{String(i + 1).padStart(2, "0")}</div>
                        <div>
                          <p className="text-sm font-black text-white mb-1.5">{cause.title}</p>
                          <p className="text-xs text-white/55 leading-relaxed">{cause.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ProtocolPage({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("routine");
  const tab = PROTOCOL_TABS_DATA.find((t) => t.id === activeTab)!;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto overlay-fade-in" style={{ background: "rgba(4,10,20,0.97)", backdropFilter: "blur(20px)" }}>
      <div className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(32,178,170,0.05) 0%, transparent 70%)" }} />
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 relative z-10">
        <div className="flex items-start justify-between mb-10 page-slide-in">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-8 bg-[#20B2AA] rounded-full" />
              <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#20B2AA]">Dermascalp Protocol</p>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">Protokol Perawatan</h1>
            <p className="text-white/50 mt-2 text-sm font-medium">Panduan berbasis sains untuk kesehatan kulit kepala optimal</p>
          </div>
          <button onClick={onClose} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/60 hover:text-white mt-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 mb-8 page-slide-in flex-wrap">
          {PROTOCOL_TABS_DATA.map((t) => {
            const Icon = IconMap[t.iconName];
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase border transition-all ${activeTab === t.id ? "tab-active" : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"}`}>
                {Icon && <Icon className="w-4 h-4" />} {t.label}
              </button>
            );
          })}
        </div>

        <div className="page-slide-in" key={activeTab}>
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">{tab.content.title}</h2>
            <p className="text-white/40 mt-1 text-sm">{tab.content.subtitle}</p>
          </div>
          {activeTab === "routine" && "items" in tab.content && (
            <div className="space-y-4">
              {(tab.content as any).items.map((item: any, i: number) => (
                <div key={i} className="card-hover p-6 md:p-8 rounded-2xl border border-white/10 bg-white/[0.03] flex gap-6">
                  <div className="text-3xl font-black text-white/10 shrink-0 leading-none mt-1">{item.step}</div>
                  <div className="flex-1">
                    <h3 className="text-base font-black text-white mb-3">{item.title}</h3>
                    <p className="text-sm text-white/65 leading-relaxed mb-4">{item.desc}</p>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#20B2AA]/5 border border-[#20B2AA]/20">
                      <span className="text-[#20B2AA] text-xs mt-0.5">⚡</span>
                      <p className="text-xs text-[#20B2AA]/80 font-medium leading-relaxed">{item.highlight}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "myths" && "myths" in tab.content && (
            <div className="space-y-4">
              {(tab.content as any).myths.map((item: any, i: number) => (
                <div key={i} className="card-hover rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <span className={`shrink-0 px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest uppercase ${item.verdict === "MITOS" ? "bg-red-400/10 text-red-400 border border-red-400/30" : "bg-yellow-400/10 text-yellow-400 border border-yellow-400/30"}`}>{item.verdict}</span>
                    </div>
                    <p className="text-base font-black text-white mb-4 leading-snug">"{item.myth}"</p>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-[#20B2AA] shrink-0 mt-0.5" />
                      <p className="text-sm text-white/65 leading-relaxed">{item.fact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "ingredients" && "ingredients" in tab.content && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(tab.content as any).ingredients.map((ing: any, i: number) => (
                <div key={i} className="card-hover p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-lg font-black text-white">{ing.name}</p>
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border mt-1 inline-block" style={{ color: ing.color, borderColor: `${ing.color}40`, background: `${ing.color}10` }}>{ing.type}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black" style={{ color: ing.color }}>{ing.efficacy}%</p>
                      <p className="text-[9px] text-white/30 uppercase tracking-wider">Efikasi</p>
                    </div>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full mb-4 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${ing.efficacy}%`, background: ing.color }} />
                  </div>
                  <p className="text-[10px] font-bold tracking-wider uppercase text-white/30 mb-1">Untuk</p>
                  <p className="text-xs text-white/60 mb-4">{ing.usage}</p>
                  <p className="text-[10px] font-bold tracking-wider uppercase text-white/30 mb-1">Cara Kerja</p>
                  <p className="text-xs text-white/55 leading-relaxed mb-4">{ing.mechanism}</p>
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-400/5 border border-yellow-400/15">
                    <AlertCircle className="w-3 h-3 text-yellow-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-yellow-400/70 leading-relaxed">{ing.caution}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TechPage({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto overlay-fade-in" style={{ background: "rgba(4,10,20,0.97)", backdropFilter: "blur(20px)" }}>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(32,178,170,0.04) 0%, transparent 70%)" }} />
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 relative z-10">
        <div className="flex items-start justify-between mb-10 page-slide-in">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-8 bg-[#20B2AA] rounded-full" />
              <p className="text-[10px] tracking-[0.4em] uppercase font-bold text-[#20B2AA]">Dermascalp Technology</p>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">Teknologi AI</h1>
            <p className="text-white/50 mt-2 text-sm font-medium">Bagaimana deep learning menganalisis kulit kepala kamu</p>
          </div>
          <button onClick={onClose} className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/60 hover:text-white mt-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="page-slide-in mb-8 p-8 md:p-10 rounded-3xl border border-[#20B2AA]/20 bg-[#20B2AA]/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(32,178,170,0.1) 0%, transparent 70%)" }} />
          <p className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#20B2AA] mb-4">Konsep Inti</p>
          <p className="text-xl md:text-2xl font-black text-white leading-snug mb-4">Dermascalp bukan sekadar AI biasa.<br /><span className="text-[#20B2AA]">Ini adalah sistem diagnosis yang bisa menjelaskan pikirannya.</span></p>
          <p className="text-white/60 text-sm leading-relaxed max-w-xl">Kebanyakan AI adalah "black box" — memberikan jawaban tanpa penjelasan. Dermascalp dirancang dengan prinsip explainable AI (XAI): setiap prediksi dilengkapi dengan visualisasi mengapa AI mengambil keputusan tersebut.</p>
        </div>

        <div className="space-y-4 page-slide-in">
          {AI_TECH_SECTIONS.map((section, i) => {
            const Icon = IconMap[section.iconName];
            return (
              <details key={i} className="group rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden card-hover">
                <summary className="flex items-center gap-5 p-6 md:p-8 cursor-pointer list-none">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#20B2AA]/10 border border-[#20B2AA]/20 flex items-center justify-center text-[#20B2AA] shrink-0">
                    {Icon && <Icon className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-black text-white">{section.title}</h3>
                    <p className="text-xs text-white/40 mt-0.5 line-clamp-1 group-open:hidden">{section.content.substring(0, 80)}...</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-white/5 pt-6">
                  <p className="text-sm text-white/70 leading-relaxed mb-4">{section.content}</p>
                  <div className="p-4 rounded-xl bg-[#20B2AA]/5 border border-[#20B2AA]/15">
                    <p className="text-xs text-[#20B2AA]/80 leading-relaxed">{section.detail}</p>
                  </div>
                </div>
              </details>
            );
          })}
        </div>

        <div className="page-slide-in mt-8 p-8 rounded-3xl border border-white/10 bg-white/[0.02]">
          <p className="text-xs tracking-[0.3em] uppercase font-black text-white/30 mb-8">Alur Kerja Sistem</p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0">
            {[
              { step: "01", label: "Input Foto", sub: "JPG/PNG kulit kepala" },
              { step: "02", label: "Preprocessing", sub: "Resize, normalisasi, augmentasi" },
              { step: "03", label: "Feature Extraction", sub: "32 lapisan CNN" },
              { step: "04", label: "Classification", sub: "Softmax output 7 kelas" },
              { step: "05", label: "Grad-CAM", sub: "Visualisasi keputusan" },
            ].map((item, i, arr) => (
              <React.Fragment key={i}>
                <div className="flex md:flex-col items-center gap-3 md:gap-2 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#20B2AA]/10 border border-[#20B2AA]/20 flex items-center justify-center text-[11px] font-black text-[#20B2AA] shrink-0">{item.step}</div>
                  <div className="md:text-center">
                    <p className="text-xs font-black text-white">{item.label}</p>
                    <p className="text-[10px] text-white/35 mt-0.5">{item.sub}</p>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="md:text-center shrink-0 text-white/20">
                    <ChevronRight className="w-4 h-4 hidden md:block" />
                    <div className="w-px h-4 bg-white/20 ml-5 md:hidden" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="page-slide-in mt-6 p-5 rounded-2xl border border-white/5 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
          <p className="text-[11px] text-white/30 leading-relaxed uppercase tracking-wider font-bold">Dermascalp adalah alat bantu skrining, bukan pengganti diagnosis medis profesional. Akurasi model bergantung pada kualitas foto dan kondisi pencahayaan. Selalu konsultasikan hasil dengan dokter Sp.KK untuk penanganan definitif.</p>
        </div>
      </div>
    </div>
  );
}

function FrostPanel({ onAnalyze }: { onAnalyze: () => void }) {
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const frostRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apply = () => {
      const canvas = maskCanvasRef.current;
      const frost = frostRef.current;
      const wrap = wrapRef.current;
      if (!canvas || !frost || !wrap) return;

      const W = wrap.offsetWidth;
      const H = wrap.offsetHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";

      const ctx = canvas.getContext("2d")!;
      ctx.scale(dpr, dpr);

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "destination-out";
      const fontSize = Math.round(W * 2 * 0.15);
      ctx.font = `900 ${fontSize}px 'Geist', 'Roboto Flex', Arial Black, sans-serif`;
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(0,0,0,1)";
      const xOffset = W - (W * 0.02);
      const maxWidth = W - 32;
      ctx.fillText("DERMA", xOffset, H * 0.36, maxWidth);

      const dataURL = canvas.toDataURL("image/png");
      frost.style.maskImage = `url(${dataURL})`;
      frost.style.webkitMaskImage = `url(${dataURL})`;
      frost.style.maskSize = "100% 100%";
      frost.style.webkitMaskSize = "100% 100%";
    };

    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(apply); } else { setTimeout(apply, 300); }
    const ro = new ResizeObserver(() => { if (document.fonts && document.fonts.ready) { document.fonts.ready.then(apply); } else { apply(); }});
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-y-0 left-0 z-20" style={{ width: "50%" }}>
      <canvas ref={maskCanvasRef} className="hidden" aria-hidden="true" />
      <div ref={frostRef} className="absolute inset-0 backdrop-blur-xl border-r border-white/20 z-10" style={{ background: "rgba(255, 255, 255, 0.20)" }} />
      <div className="absolute inset-0 flex flex-col justify-end px-10 pb-[160px] z-40 pointer-events-none">
        <div className="w-[90%] pr-4 pointer-events-auto">
          <p className="text-lg lg:text-xl font-black leading-snug text-white drop-shadow-xl" style={{ textShadow: "0 4px 16px rgba(0,0,0,0.4)" }}>Take control of your wellness with an accurate and transparent analysis directly from your device.</p>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-[17px] font-bold tracking-[0.2em] text-white uppercase">
            <button onClick={onAnalyze} className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:bg-white/20 hover:border-white/40 transition-all flex items-center gap-2 group text-white cursor-pointer">
              MULAI ANALISIS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Navbar({ onAnalyze, onOpenPage }: { onAnalyze: () => void; onOpenPage: (page: string) => void; }) {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-10 py-5 md:py-7 text-white pointer-events-none">
      <div className="flex items-center gap-2 font-black tracking-tighter text-base md:text-lg uppercase pointer-events-auto">
        <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#20B2AA] rounded-sm" /> Dermascalp.
      </div>
      <nav className="hidden md:flex gap-4 text-[15px] font-bold tracking-[0.15em] uppercase opacity-90 pointer-events-auto">
        <button onClick={() => onOpenPage("conditions")} className="px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all cursor-pointer">Kondisi Klinis</button>
        <button onClick={() => onOpenPage("protocol")} className="px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all cursor-pointer">Protokol Perawatan</button>
        <button onClick={() => onOpenPage("tech")} className="px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all cursor-pointer">Teknologi AI</button>
      </nav>
      <div className="md:hidden pointer-events-auto flex flex-col gap-1.5 cursor-pointer" onClick={onAnalyze}>
        <div className="w-6 h-0.5 bg-white/80" /> <div className="w-6 h-0.5 bg-white/80" /> <div className="w-4 h-0.5 bg-white/80" />
      </div>
    </header>
  );
}

function MobileHero({ onAnalyze, onOpenPage }: { onAnalyze: () => void; onOpenPage: (page: string) => void; }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="absolute inset-0 z-30 flex flex-col">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.30) 35%, rgba(10,22,40,0.70) 65%, rgba(10,22,40,0.97) 100%)" }} />
      <div className="h-[72px] shrink-0" />
      {menuOpen && (
        <div className="absolute inset-0 z-50 flex flex-col overlay-fade-in" style={{ background: "rgba(4,10,20,0.97)", backdropFilter: "blur(20px)" }}>
          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center gap-2 font-black tracking-tighter text-base uppercase text-white"><div className="w-2 h-2 bg-[#20B2AA] rounded-sm" /> Dermascalp.</div>
            <button onClick={() => setMenuOpen(false)} className="p-2 rounded-full bg-white/10 text-white/70"><X className="w-5 h-5" /></button>
          </div>
          <div className="flex-1 flex flex-col justify-center px-6 gap-4">
            {[{ label: "Kondisi Klinis", sub: "Ensiklopedia 7 kondisi", page: "conditions" }, { label: "Protokol Perawatan", sub: "Panduan berbasis sains", page: "protocol" }, { label: "Teknologi AI", sub: "Cara kerja CNN & Grad-CAM", page: "tech" }].map((item) => (
              <button key={item.page} onClick={() => { onOpenPage(item.page); setMenuOpen(false); }} className="text-left p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#20B2AA]/40 transition-all">
                <p className="text-base font-black text-white">{item.label}</p>
                <p className="text-xs text-white/40 mt-1">{item.sub}</p>
              </button>
            ))}
            <button onClick={() => { onAnalyze(); setMenuOpen(false); }} className="mt-2 flex items-center justify-center gap-3 py-4 rounded-full font-black text-sm tracking-wider uppercase text-[#0a1628] bg-[#20B2AA]">
              MULAI ANALISIS <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
        <div className="absolute w-[260px] h-[260px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(32,178,170,0.18) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
        <div className="mobile-hero-title text-center relative z-10">
          <p className="text-[10px] tracking-[0.35em] uppercase font-bold text-[#20B2AA] mb-4">✦ AI Scalp Analysis ✦</p>
          <h1 className="font-black text-white uppercase leading-none select-none" style={{ fontSize: "clamp(3.2rem, 18vw, 5rem)", letterSpacing: "-0.04em", textShadow: "0 0 60px rgba(32,178,170,0.25), 0 4px 32px rgba(0,0,0,0.5)" }}>DERMA</h1>
          <h1 className="font-black uppercase leading-none select-none" style={{ fontSize: "clamp(3.2rem, 18vw, 5rem)", letterSpacing: "-0.04em", color: "#20B2AA", textShadow: "0 0 40px rgba(32,178,170,0.5)" }}>SCALP</h1>
        </div>
      </div>
      <div className="mobile-hero-content px-6 pb-12 flex flex-col items-center gap-5 relative z-10">
        <div className="w-12 h-px bg-white/20" />
        <p className="text-sm font-semibold text-white/75 text-center leading-relaxed max-w-[280px]" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>Take control of your wellness with an accurate and transparent analysis.</p>
        <button onClick={onAnalyze} className="flex items-center gap-3 px-7 py-3.5 rounded-full font-black text-sm tracking-[0.15em] uppercase text-[#0a1628] bg-[#20B2AA] shadow-[0_0_32px_rgba(32,178,170,0.5)] hover:bg-[#25ccc3] transition-all active:scale-95">MULAI ANALISIS <ArrowRight className="w-4 h-4" /></button>
        <div className="flex gap-3 mt-1"><button onClick={() => setMenuOpen(true)} className="text-[10px] tracking-[0.25em] uppercase font-bold text-white/40 hover:text-white/70 transition-colors px-3 py-1.5 rounded-full border border-white/10">Menu ↗</button></div>
        <div className="flex flex-col items-center gap-2 opacity-40"><p className="text-[9px] tracking-[0.3em] uppercase text-white font-bold">Scroll</p><div className="w-px h-6 bg-white/50 relative overflow-hidden"><div className="w-full h-full bg-white animate-scroll-down" /></div></div>
      </div>
    </div>
  );
}

function HeroSection({ onAnalyze, onOpenPage }: { onAnalyze: () => void; onOpenPage: (page: string) => void; }) {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video src="/bg-video.mp4" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0 z-5 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(10,22,40,0.2) 0%, rgba(10,22,40,0.1) 60%, rgba(10,22,40,0.85) 100%)" }} />
      <div className="hidden md:block">
        <FrostPanel onAnalyze={onAnalyze} />
        <div className="absolute right-5 bottom-[60px] z-40 pointer-events-none flex items-end">
          <h1 className="font-black text-white uppercase select-none m-0 p-0 leading-none" style={{ fontSize: "14vw", letterSpacing: "-0.05em", textShadow: "0 0 80px rgba(0,0,0,0.3)" }}>SCALP</h1>
        </div>
        <div onClick={onAnalyze} className="absolute bottom-[160px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-40 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
          <div className="w-px h-12 bg-white/30 relative overflow-hidden"><div className="w-full h-full bg-white animate-scroll-down" /></div>
        </div>
      </div>
      <div className="md:hidden"><MobileHero onAnalyze={onAnalyze} onOpenPage={onOpenPage} /></div>
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-45" style={{ height: "20vh", background: "linear-gradient(to top, #0a1628 0%, #0a1628 5%, rgba(10,22,40,0.92) 20%, rgba(10,22,40,0.6) 50%, rgba(10,22,40,0) 100%)" }} />
      <Navbar onAnalyze={onAnalyze} onOpenPage={onOpenPage} />
    </section>
  );
}

function RadialGauge({ value, color }: { value: number; color: string }) {
  const radius = 50, stroke = 8, normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  return (
    <div className="relative flex items-center justify-center w-24 h-24 md:w-36 md:h-36 shrink-0">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        <circle stroke="rgba(255,255,255,0.1)" fill="transparent" strokeWidth={stroke} r={normalizedRadius} cx={radius} cy={radius} />
        <circle stroke="currentColor" fill="transparent" strokeWidth={stroke} strokeDasharray={`${circumference} ${circumference}`} style={{ strokeDashoffset, transition: "stroke-dashoffset 1.5s ease-in-out" }} strokeLinecap="round" r={normalizedRadius} cx={radius} cy={radius} className={color} />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl md:text-4xl font-black text-white">{value}<span className="text-base md:text-xl">%</span></span>
      </div>
    </div>
  );
}

function AnalyzerSection() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  type PredictionResult = {
    conditionKey: string;
    conditionName: string;
    probability: number;
    severity: Severity;
    rawSeverityText: string;
    rawSeverityColor: string;
  };

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [heatmap, setHeatmap] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!file) { setPreviewUrl(null); return; }
    const u = URL.createObjectURL(file);
    setPreviewUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
      setErrorMsg(null);
    }
  };

  const startAnalysis = async () => {
    if (!file) return;
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setResult(null);
    setShowHeatmap(false);
    setHeatmap(null);
    setErrorMsg(null);

    try {
      const formData = new FormData();
formData.append("file", file);

const response = await fetch(`${API_URL}/predict`, {
  method: "POST",
  body: formData,
  signal: abortRef.current.signal,
});

if (!response.ok) {
  const errText = await response.text();
  throw new Error(`Server error ${response.status}: ${errText}`);
}

const data = await response.json();

      const prob = Math.round((data.confidence || 0) * 100);
      let mappedSeverity: Severity = 'ringan';
      
      if (prob >= 92) {
        mappedSeverity = 'parah';
      } else if (prob >= 85) {
        mappedSeverity = 'sedang';
      }

      const cleanConditionName = data.predicted_class ? data.predicted_class.replace(/_/g, ' ') : 'Tidak Diketahui';
      
      setResult({
        conditionKey: data.predicted_class,
        conditionName: cleanConditionName,
        probability: prob,
        severity: mappedSeverity,
        rawSeverityText: data.severity?.level || 'NORMAL — KONDISI AMAN',
        rawSeverityColor: data.severity?.color || 'green'
      });

      if (data.gradcam_heatmap) {
        setHeatmap(data.gradcam_heatmap);
      } else {
        setHeatmap(previewUrl);
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return; 
      console.error(err);
      setErrorMsg(err.message || "Gagal memproses gambar. Pastikan server AI berjalan.");
    } finally {
      if (abortRef.current && !abortRef.current.signal.aborted) {
        setLoading(false);
      }
    }
  };

  const conditionData = result
    ? (CONDITION_DATA[result.conditionKey] || CONDITION_DATA["Default"])[result.severity]
    : null;

  return (
    <section id="analyzer" style={{ scrollMarginTop: 0 }} className="relative min-h-screen text-white pt-0 pb-16 md:pb-24 px-4 md:px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: "40px 40px", backgroundPosition: "-1px -1px", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 80px, black 280px)", maskImage: "linear-gradient(to bottom, transparent 0%, transparent 80px, black 280px)" }} />
      <div className="absolute -top-[10%] -left-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#20B2AA]/15 rounded-full blur-[120px] pointer-events-none animate-float-slow z-0" />
      <div className="absolute top-[40%] -right-[10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#007BFF]/10 rounded-full blur-[150px] pointer-events-none animate-float-delayed z-0" />
      
      {result && conditionData && (
        <div className={`absolute bottom-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] ${conditionData.glowColor} opacity-10 rounded-full blur-[150px] pointer-events-none z-0`} />
      )}
      
      <div className="max-w-5xl mx-auto relative z-10 animate-gentle-fade">
        <div className="pt-[100px] md:pt-[160px]">
          <div className="mb-10 md:mb-16">
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter uppercase text-white drop-shadow-lg" style={{ fontFamily: "var(--font-abcdfont, 'Geist', sans-serif)" }}>ANALYZER</h2>
            <p className="text-[#20B2AA] mt-2 md:mt-3 text-xs md:text-sm font-bold tracking-[0.2em] uppercase drop-shadow-md flex items-center gap-2">
              <Microscope className="w-3 h-3 md:w-4 md:h-4" /> Sistem Inferensi Deep Learning
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 flex items-start gap-3 page-slide-in">
               <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
               <div>
                  <h4 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-1">ANALISIS DITOLAK</h4>
                  <p className="text-sm text-red-400/80 leading-relaxed">{errorMsg}</p>
               </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
            <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()} className="group relative border-2 border-dashed border-white/20 hover:border-white/50 bg-black/20 backdrop-blur-xl rounded-3xl cursor-pointer transition-all min-h-[260px] md:min-h-[340px] flex flex-col items-center justify-center shadow-2xl overflow-hidden">
              <input type="file" ref={fileInputRef} onChange={(e) => { if(e.target.files) { setFile(e.target.files[0]); setErrorMsg(null); } }} className="hidden" accept="image/*" />
              {previewUrl ? (
                <div className="absolute inset-0 w-full h-full">
                  <img src={previewUrl} alt="Preview" className={`w-full h-full object-cover transition-all duration-500 ${loading ? "opacity-40 grayscale" : "opacity-80 group-hover:opacity-100"}`} />
                  {loading && (
                    <>
                      <div className="absolute inset-0 bg-[#20B2AA]/20 mix-blend-overlay" />
                      <div className="absolute left-0 right-0 h-1 bg-[#20B2AA] shadow-[0_0_15px_#20B2AA] animate-scan z-20" />
                    </>
                  )}
                  {!loading && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-4 md:pb-6">
                      <p className="text-xs md:text-sm font-bold text-white bg-black/40 px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-md flex items-center gap-2"><ScanSearch className="w-3 h-3 md:w-4 md:h-4" /> Ganti Gambar</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center p-8 md:p-12 text-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#20B2AA]/20 rounded-full animate-pulse-ring" />
                    <div className="w-14 h-14 md:w-20 md:h-20 bg-white/10 rounded-full flex items-center justify-center relative z-10 border border-white/20"><Upload className="w-6 h-6 md:w-8 md:h-8 text-white/70" /></div>
                  </div>
                  <p className="text-xs md:text-sm font-bold mt-5 md:mt-8 text-white uppercase tracking-wider">Unggah Foto Medis</p>
                  <p className="text-xs text-white/40 mt-2 md:mt-3 font-medium">Klik atau seret file JPG/PNG</p>
                </div>
              )}
            </div>
            <div className="bg-black/20 backdrop-blur-xl border border-white/10 text-white p-6 md:p-10 rounded-3xl flex flex-col justify-between min-h-[260px] md:h-[340px] shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 -top-10 opacity-5 pointer-events-none"><ShieldCheck className="w-32 h-32 md:w-48 md:h-48" /></div>
              <div className="relative z-10">
                <h3 className="text-xs md:text-sm font-bold tracking-widest uppercase text-white flex items-center gap-2"><Activity className="w-3 h-3 md:w-4 md:h-4 text-[#20B2AA]" /> Clinical Guidelines</h3>
                <ul className="mt-5 md:mt-8 space-y-3 md:space-y-5 text-xs md:text-sm font-medium text-white/80">
                  <li className="flex items-start gap-3"><span className="text-[#20B2AA] mt-0.5">✦</span> Foto dalam kondisi penerangan terang.</li>
                  <li className="flex items-start gap-3"><span className="text-[#20B2AA] mt-0.5">✦</span> Fokus tepat di area kulit kepala bermasalah.</li>
                  <li className="flex items-start gap-3"><span className="text-[#20B2AA] mt-0.5">✦</span> Bebas dari penghalang visual (jepit rambut, dll).</li>
                </ul>
              </div>
              <button onClick={startAnalysis} disabled={!file || loading} className={`relative z-10 mt-4 md:mt-0 w-full py-3 md:py-4 text-xs md:text-sm font-black uppercase tracking-widest transition-all rounded-full overflow-hidden ${file && !loading ? "bg-white hover:bg-white/90 text-[#0a1628] shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transform hover:-translate-y-1" : "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"}`}>
                {loading ? <span className="flex items-center justify-center gap-2"><Activity className="w-3 h-3 md:w-4 md:h-4 animate-spin" /> Memproses...</span> : "Execute Tensor Analysis"}
              </button>
            </div>
          </div>
          {loading && (
            <div className="mt-8 md:mt-12 space-y-4 relative z-20">
              <div className="p-6 md:p-10 bg-white/5 border border-white/20 rounded-3xl space-y-6">
                <SkeletonBlock className="h-5 w-48" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <SkeletonBlock className="h-24 w-24 rounded-full" />
                    <SkeletonBlock className="h-8 w-40" />
                    <SkeletonBlock className="h-16 w-full" />
                  </div>
                  <SkeletonBlock className="h-48 w-full rounded-2xl" />
                </div>
              </div>
            </div>
          )}
          {result && conditionData && (
            <div className="mt-8 md:mt-12 space-y-4 md:space-y-6 animate-fade-in relative z-20">
              <div className="p-6 md:p-10 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6 md:mb-10 pb-4 md:pb-5 border-b border-white/10">
                  <Stethoscope className={`w-4 h-4 md:w-6 md:h-6 ${conditionData.urgencyColor}`} />
                  <p className="text-[10px] md:text-[11px] tracking-widest uppercase font-black text-white/70">Diagnostic Summary Report</p>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
                  <div>
                    <div className="flex items-center gap-5 md:gap-8">
                      <RadialGauge value={result.probability} color={conditionData.urgencyColor} />
                      <div>
                        <p className="text-[10px] tracking-widest uppercase font-bold text-white/50 mb-1">Confidence Score</p>
                        <p className="text-xs md:text-sm font-medium text-white/70 leading-snug">Probabilitas kecocokan citra dengan model CNN.</p>
                      </div>
                    </div>
                    <div className="mt-6 md:mt-10">
                      <p className="text-[10px] tracking-widest uppercase font-bold text-white/50">Kondisi Klinis Terdeteksi</p>
                      <p className="text-xl md:text-3xl font-black text-white mt-1 md:mt-2 uppercase tracking-tight drop-shadow-md">{result.conditionName}</p>
                    </div>
                    <div className="mt-5 md:mt-8 bg-black/30 p-4 md:p-5 rounded-2xl border border-white/10 backdrop-blur-md relative overflow-hidden">
                      <div className={`absolute top-0 left-0 w-1 h-full ${conditionData.glowColor}`} />
                      <p className="text-[10px] tracking-widest uppercase font-bold text-white/50 mb-1 flex items-center gap-2 pl-2"><AlertCircle className="w-3 h-3" /> Tingkat Keparahan</p>
                      <p 
                        className="text-sm md:text-lg font-black uppercase tracking-widest pl-2" 
                        style={{ 
                          color: result.rawSeverityColor === 'red' ? '#f87171' : 
                                result.rawSeverityColor === 'yellow' ? '#facc15' : 
                                result.rawSeverityColor === 'green' ? '#4ade80' : 'white' 
                        }}
                      >
                        {result.rawSeverityText}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between bg-black/10 p-5 md:p-8 rounded-3xl border border-white/5">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase font-black text-[#20B2AA] mb-3 md:mb-4 flex items-center gap-2"><Microscope className="w-3 h-3 md:w-4 md:h-4" /> Insight Deep Learning (Grad-CAM)</p>
                      <p className="text-sm md:text-[15px] text-white/80 leading-relaxed font-medium">{conditionData.heatmapInsight}</p>
                    </div>
                    <div className="mt-6 pt-5 border-t border-white/10">
                      <label className="flex items-center gap-3 cursor-pointer text-[11px] md:text-xs font-bold uppercase tracking-wider text-white hover:text-white/80 transition-colors">
                        <input type="checkbox" checked={showHeatmap} onChange={() => setShowHeatmap(!showHeatmap)} className="rounded border-white/30 bg-black/50 text-[#20B2AA] focus:ring-[#20B2AA] w-4 h-4 cursor-pointer" /> Toggle Grad-CAM Heatmap
                      </label>
                      {showHeatmap && (
                        <div className="mt-4 h-36 md:h-48 rounded-xl flex items-center justify-center overflow-hidden relative border border-white/10 shadow-inner bg-black/50">
                          {heatmap ? (
                            <img src={heatmap} alt="Grad-CAM Heatmap" className="w-full h-full object-cover opacity-90" />
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <Activity className="w-4 h-4 animate-pulse text-[#20B2AA]" />
                              <span className="text-[10px] text-white/40 uppercase tracking-widest">Memuat Visualisasi...</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="p-6 md:p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl">
                  <div className="flex items-center gap-3 mb-5 md:mb-6"><CheckCircle2 className="w-4 h-4 md:w-6 md:h-6 text-[#20B2AA]" /><p className="text-[11px] tracking-widest uppercase font-black text-white">Sangat Disarankan</p></div>
                  <ul className="space-y-4 md:space-y-5">
                    {conditionData.dos.map((d, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-white/80 leading-relaxed"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#20B2AA] shrink-0 shadow-[0_0_8px_#20B2AA]" />{d}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 md:p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl">
                  <div className="flex items-center gap-3 mb-5 md:mb-6"><XCircle className="w-4 h-4 md:w-6 md:h-6 text-red-400" /><p className="text-[11px] tracking-widest uppercase font-black text-white">Wajib Dihindari</p></div>
                  <ul className="space-y-4 md:space-y-5">
                    {conditionData.donts.map((d, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-white/80 leading-relaxed"><div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 shadow-[0_0_8px_#f87171]" />{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-6 md:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 md:p-8 opacity-5 pointer-events-none"><ShieldCheck className="w-32 h-32 md:w-64 md:h-64" /></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6 md:mb-8">
                    <p className="text-[11px] tracking-[0.15em] md:tracking-[0.2em] uppercase font-black text-white">Rekomendasi Produk</p>
                    <span className="px-2 py-1 bg-white/10 rounded-full text-[9px] font-bold tracking-widest uppercase text-white/50 border border-white/10">ID Region</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {conditionData.products.map((p, i) => (
                      <div key={i} className="group p-4 md:p-6 bg-black/30 border border-white/10 hover:border-white/40 hover:bg-black/40 transition-all rounded-2xl flex flex-col justify-between backdrop-blur-sm relative overflow-hidden">
                        <div>
                          <span className="inline-block px-2 py-1 bg-white/10 rounded-full text-[9px] tracking-[0.15em] uppercase font-bold text-white mb-3">{p.type}</span>
                          <p className="text-base md:text-xl font-black text-white leading-snug tracking-tight">{p.name}</p>
                        </div>
                        <p className="text-xs md:text-[13px] text-white/70 mt-4 pt-4 border-t border-white/10 leading-relaxed"><span className="font-bold text-[#20B2AA] block mb-1 uppercase tracking-widest text-[9px]">Saran AI:</span>{p.reason}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 md:mt-10 bg-black/40 px-4 md:px-6 py-3 md:py-4 rounded-xl border border-white/5 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-[0.1em] font-bold">Disclaimer: Rekomendasi ini dibuat oleh algoritma dan bukan pengganti diagnosis medis resmi. Konsultasikan dengan dokter Sp.KK untuk penanganan lanjut.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function AnalyzerPage() {
  const [activePage, setActivePage] = useState<string | null>(null);

  const scrollToAnalyzer = () => {
    setActivePage(null);
    setTimeout(() => document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <div className="min-h-screen">
      <HeroSection onAnalyze={scrollToAnalyzer} onOpenPage={setActivePage} />
      <AnalyzerSection />
      {activePage === "conditions" && <ConditionsPage onClose={() => setActivePage(null)} />}
      {activePage === "protocol" && <ProtocolPage onClose={() => setActivePage(null)} />}
      {activePage === "tech" && <TechPage onClose={() => setActivePage(null)} />}
    </div>
  );
}