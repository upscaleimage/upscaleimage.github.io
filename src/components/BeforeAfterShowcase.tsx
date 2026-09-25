import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  User,
  Landmark,
  Palette,
  MoveHorizontal,
  Sparkles,
  CheckCircle2,
  Sliders,
} from 'lucide-react';
import type { TranslationDictionary } from '../i18n/translations';

interface BeforeAfterShowcaseProps {
  t: TranslationDictionary['showcase'];
}

type CategoryId = 'portrait' | 'architecture' | 'anime';

interface ShowcaseItem {
  id: CategoryId;
  title: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  thumbImg: string;
  sampleInputPng: string;
  sampleFileName: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
}

export default function BeforeAfterShowcase({ t }: BeforeAfterShowcaseProps) {
  const [activeTab, setActiveTab] = useState<CategoryId>('portrait');
  const [sliderPos, setSliderPos] = useState<number>(50);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  const items: Record<CategoryId, ShowcaseItem> = {
    portrait: {
      id: 'portrait',
      title: t.portraitTab,
      description: t.portraitDesc,
      beforeImg: '/samples/portrait-before.webp',
      afterImg: '/samples/portrait-after.webp',
      thumbImg: '/samples/portrait-thumb.webp',
      sampleInputPng: '/samples/portrait-lowres-input.png',
      sampleFileName: 'sample-portrait-freckles.png',
      icon: User,
      tags: ['Skin Pores & Freckles', 'Natural Eyelashes', 'No Plastic Blur'],
    },
    architecture: {
      id: 'architecture',
      title: t.architectureTab,
      description: t.architectureDesc,
      beforeImg: '/samples/architecture-before.webp',
      afterImg: '/samples/architecture-after.webp',
      thumbImg: '/samples/architecture-thumb.webp',
      sampleInputPng: '/samples/architecture-lowres-input.png',
      sampleFileName: 'sample-gothic-cathedral.png',
      icon: Landmark,
      tags: ['Stone Masonry', 'Intricate Arches', 'Window Tracery'],
    },
    anime: {
      id: 'anime',
      title: t.animeTab,
      description: t.animeDesc,
      beforeImg: '/samples/anime-before.webp',
      afterImg: '/samples/anime-after.webp',
      thumbImg: '/samples/anime-thumb.webp',
      sampleInputPng: '/samples/anime-lowres-input.png',
      sampleFileName: 'sample-fantasy-heroine.png',
      icon: Palette,
      tags: ['Razor-Sharp Line Art', 'Zero Block Noise', 'Vibrant Gradients'],
    },
  };

  const currentItem = items[activeTab];

  // Pointer drag calculation
  const updateSliderFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relX = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (relX / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      updateSliderFromClientX(e.clientX);
    };
    const onPointerUp = () => {
      isDraggingRef.current = false;
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [updateSliderFromClientX]);

  // Click to test in the interactive upscaler above
  const handleTestInUpscaler = () => {
    // Dispatch custom event to populate the ImageUpscaler component
    window.dispatchEvent(
      new CustomEvent('upscaleimage:load-sample', {
        detail: {
          url: currentItem.sampleInputPng,
          name: currentItem.sampleFileName,
        },
      })
    );

    // Smooth scroll to upscaler tool
    const upscalerEl = document.getElementById('ai-upscaler-workspace');
    if (upscalerEl) {
      upscalerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#F3E6D5] dark:bg-[#541523]/80 text-[#800020] dark:text-[#FFF9F2] border border-[#800020]/20 dark:border-[#D45060]/30 mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#D45060]" />
          <span>{t.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#800020] dark:text-[#FFF9F2] tracking-tight mb-3">
          {t.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-[#3B1B22]/80 dark:text-[#F3E6D5]/80 leading-relaxed">
          {t.sectionSubtitle}
        </p>
      </div>

      {/* Category Tab Bar */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 flex-wrap">
        {(Object.keys(items) as CategoryId[]).map((catId) => {
          const cat = items[catId];
          const IconComp = cat.icon;
          const isActive = activeTab === catId;
          return (
            <button
              key={catId}
              type="button"
              aria-pressed={isActive}
              onClick={() => {
                setActiveTab(catId);
                setSliderPos(50);
              }}
              className={`inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-[#800020] dark:bg-[#D45060] text-[#FFF9F2] shadow-glow-coral scale-105'
                  : 'bg-[#FFFFFF] dark:bg-[#2C0911] text-[#800020] dark:text-[#F3E6D5] border border-[#F3E6D5] dark:border-[#541523] hover:border-[#D45060]'
              }`}
            >
              <img
                src={cat.thumbImg}
                alt={cat.title}
                className="w-5 h-5 rounded-md object-cover border border-white/20"
                loading="lazy"
                decoding="async"
                width={20}
                height={20}
              />
              <IconComp className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{cat.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Comparison Card */}
      <div className="rounded-3xl bg-[#FFFFFF] dark:bg-[#2C0911] border border-[#F3E6D5] dark:border-[#541523] shadow-soft dark:shadow-soft-dark overflow-hidden">
        {/* Comparison Viewport */}
        <div
          ref={containerRef}
          onPointerDown={(e) => {
            isDraggingRef.current = true;
            updateSliderFromClientX(e.clientX);
          }}
          role="slider"
          aria-label={t.dragHint}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPos)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setSliderPos((p) => Math.max(0, p - 5));
            if (e.key === 'ArrowRight') setSliderPos((p) => Math.min(100, p + 5));
          }}
          className="relative w-full h-[360px] sm:h-[480px] md:h-[540px] bg-checkerboard select-none overflow-hidden cursor-ew-resize focus:outline-none"
        >
          {/* Bottom Layer: AFTER (4x AI Super-Resolution) */}
          <img
            src={currentItem.afterImg}
            alt={`${currentItem.title} - AI Upscaled After`}
            draggable={false}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            width={800}
            height={600}
          />

          {/* Top Clipped Layer: BEFORE (Low-Res / Pixelated) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <img
              src={currentItem.beforeImg}
              alt={`${currentItem.title} - Original Low-Res Before`}
              draggable={false}
              style={{ imageRendering: 'pixelated' }}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={800}
              height={600}
            />
          </div>

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <span className="px-3.5 py-1.5 rounded-xl text-xs font-black tracking-wider uppercase bg-[#800020]/90 text-[#FFF9F2] backdrop-blur-md border border-white/20 shadow-md">
              {t.labelOriginal}
            </span>
          </div>

          <div className="absolute top-4 right-4 z-10 pointer-events-none">
            <span className="px-3.5 py-1.5 rounded-xl text-xs font-black tracking-wider uppercase bg-[#D45060]/95 text-[#FFF9F2] backdrop-blur-md border border-white/20 shadow-glow-coral">
              {t.labelEnhanced}
            </span>
          </div>

          {/* Vertical Split Line & Handle */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-[#FFF9F2] shadow-[0_0_15px_rgba(212,80,96,0.8)] z-20 pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#D45060] text-[#FFF9F2] shadow-glow-coral border-2 border-[#FFF9F2] flex items-center justify-center cursor-ew-resize">
              <MoveHorizontal className="w-5 h-5 animate-pulse" />
            </div>
          </div>

          {/* Bottom Center Interaction Hint */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#800020]/80 text-[#FFF9F2] backdrop-blur-md border border-white/10 shadow-sm">
              {t.dragHint}
            </span>
          </div>
        </div>

        {/* Bottom Details & CTA Bar */}
        <div className="p-5 sm:p-6 bg-[#FAF4EC]/80 dark:bg-[#1A0408]/60 border-t border-[#F3E6D5] dark:border-[#541523] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#800020] dark:text-[#FFF9F2]">
                {currentItem.title}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-md font-bold bg-[#F3E6D5] dark:bg-[#541523] text-[#800020] dark:text-[#D45060]">
                4x Super-Resolution
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#3B1B22]/75 dark:text-[#F3E6D5]/75 max-w-xl leading-relaxed">
              {currentItem.description}
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {currentItem.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#FFFFFF] dark:bg-[#2C0911] text-[#800020] dark:text-[#F3E6D5] border border-[#F3E6D5] dark:border-[#541523]"
                >
                  <CheckCircle2 className="w-3 h-3 text-[#D45060]" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Action Button: Test in live upscaler */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end pt-2 md:pt-0">
            {/* Quick Slider Position Buttons */}
            <div className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-[#FFFFFF] dark:bg-[#2C0911] border border-[#F3E6D5] dark:border-[#541523] text-xs font-bold text-[#800020] dark:text-[#F3E6D5]">
              <button
                type="button"
                onClick={() => setSliderPos(25)}
                className={`px-2 py-1 rounded-lg ${sliderPos === 25 ? 'bg-[#800020] text-white' : 'hover:bg-[#F3E6D5]/50'}`}
              >
                25%
              </button>
              <button
                type="button"
                onClick={() => setSliderPos(50)}
                className={`px-2 py-1 rounded-lg ${sliderPos === 50 ? 'bg-[#800020] text-white' : 'hover:bg-[#F3E6D5]/50'}`}
              >
                50%
              </button>
              <button
                type="button"
                onClick={() => setSliderPos(75)}
                className={`px-2 py-1 rounded-lg ${sliderPos === 75 ? 'bg-[#800020] text-white' : 'hover:bg-[#F3E6D5]/50'}`}
              >
                75%
              </button>
            </div>

            <button
              type="button"
              onClick={handleTestInUpscaler}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#FFF9F2] bg-[#800020] hover:bg-[#D45060] dark:bg-[#D45060] dark:hover:bg-[#E57381] shadow-glow-coral transition-all active:scale-[0.98] w-full md:w-auto"
            >
              <Sparkles className="w-4 h-4 text-[#FFF9F2]" />
              <span>{t.btnTestSample}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
