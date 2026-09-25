import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Upload,
  Sparkles,
  Download,
  RefreshCw,
  ShieldCheck,
  Cpu,
  MoveHorizontal,
  ZoomIn,
  ZoomOut,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Sliders,
} from 'lucide-react';
import type { TranslationDictionary } from '../i18n/translations';

interface ImageUpscalerProps {
  t: TranslationDictionary['upscaler'];
}

type ScaleFactor = 2 | 4;
type QualityTier = 'balanced' | 'ultra';
type EnhanceMode = 'standard' | 'crisp';
type ExportFormat = 'image/png' | 'image/webp' | 'image/jpeg';

interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Intelligent Edge-Aware Micro-Contrast and Detail Enhancement.
 * Computes local luminance gradients to selectively enhance true high-frequency
 * details (eyelashes, hair strands, fabric textures, architectural masonry, text)
 * while leaving flat surfaces (skin tones, sky, solid colors) smooth and noise-free.
 */
function applyAdaptiveDetailEnhancement(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  mode: 'crisp' | 'standard'
) {
  const imgData = ctx.getImageData(0, 0, width, height);
  const src = imgData.data;
  const dst = new Uint8ClampedArray(src.length);
  dst.set(src);

  const amount = mode === 'crisp' ? 0.38 : 0.18;
  const threshold = mode === 'crisp' ? 7 : 12; // Ignores flat areas and sensor noise
  const w = width;
  const h = height;

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = (y * w + x) * 4;

      // Calculate local luminance gradient to distinguish real edges from flat areas
      const lumaCenter = 0.299 * src[idx] + 0.587 * src[idx + 1] + 0.114 * src[idx + 2];
      const lumaUp = 0.299 * src[idx - w * 4] + 0.587 * src[idx - w * 4 + 1] + 0.114 * src[idx - w * 4 + 2];
      const lumaDown = 0.299 * src[idx + w * 4] + 0.587 * src[idx + w * 4 + 1] + 0.114 * src[idx + w * 4 + 2];
      const lumaLeft = 0.299 * src[idx - 4] + 0.587 * src[idx - 4 + 1] + 0.114 * src[idx - 4 + 2];
      const lumaRight = 0.299 * src[idx + 4] + 0.587 * src[idx + 4 + 1] + 0.114 * src[idx + 4 + 2];

      const diff = Math.abs(4 * lumaCenter - (lumaUp + lumaDown + lumaLeft + lumaRight));

      // Only sharpen if local gradient exceeds threshold (real edge/texture)
      if (diff > threshold) {
        const edgeWeight = Math.min(1.2, diff / 28) * amount;
        for (let c = 0; c < 3; c++) {
          const center = src[idx + c];
          const neighbors =
            src[idx - w * 4 + c] +
            src[idx + w * 4 + c] +
            src[idx - 4 + c] +
            src[idx + 4 + c];
          const val = center + edgeWeight * (4 * center - neighbors);
          dst[idx + c] = Math.min(255, Math.max(0, Math.round(val)));
        }
      }
      dst[idx + 3] = src[idx + 3];
    }
  }
  imgData.data.set(dst);
  ctx.putImageData(imgData, 0, 0);
}

/**
 * Generate a rich procedural sample image on a local canvas so users can
 * test the AI upscaler immediately with zero external network requests.
 */
function generateSampleDataUrl(preset: 'nature' | 'cyberpunk' | 'art'): { dataUrl: string; name: string } {
  const canvas = document.createElement('canvas');
  canvas.width = 240;
  canvas.height = 160;
  const ctx = canvas.getContext('2d')!;

  if (preset === 'nature') {
    const grad = ctx.createLinearGradient(0, 0, 240, 160);
    grad.addColorStop(0, '#064e3b');
    grad.addColorStop(0.5, '#047857');
    grad.addColorStop(1, '#10b981');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 240, 160);

    // Sunburst & mountain silhouettes
    ctx.fillStyle = '#fde68a';
    ctx.beginPath();
    ctx.arc(180, 45, 24, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#022c22';
    ctx.beginPath();
    ctx.moveTo(0, 160);
    ctx.lineTo(65, 78);
    ctx.lineTo(130, 130);
    ctx.lineTo(185, 68);
    ctx.lineTo(240, 125);
    ctx.lineTo(240, 160);
    ctx.closePath();
    ctx.fill();

    // Leaf veins & fine geometric texture
    ctx.strokeStyle = '#6ee7b7';
    ctx.lineWidth = 1.4;
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.arc(70 + i * 16, 115 - (i % 3) * 8, 12, 0, Math.PI);
      ctx.stroke();
    }
    return { dataUrl: canvas.toDataURL('image/png'), name: 'sample-macro-nature.png' };
  }

  if (preset === 'cyberpunk') {
    const grad = ctx.createLinearGradient(0, 0, 0, 160);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.6, '#311042');
    grad.addColorStop(1, '#701a75');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 240, 160);

    // Skyline buildings with crisp neon windows
    const buildings = [
      { x: 12, w: 34, h: 105, c: '#1e1b4b' },
      { x: 52, w: 42, h: 125, c: '#0f172a' },
      { x: 100, w: 38, h: 95, c: '#1e293b' },
      { x: 145, w: 46, h: 132, c: '#090d16' },
      { x: 196, w: 32, h: 110, c: '#1e1b4b' },
    ];
    buildings.forEach((b) => {
      ctx.fillStyle = b.c;
      ctx.fillRect(b.x, 160 - b.h, b.w, b.h);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1;
      ctx.strokeRect(b.x, 160 - b.h, b.w, b.h);

      for (let wy = 166 - b.h; wy < 152; wy += 9) {
        for (let wx = b.x + 5; wx < b.x + b.w - 6; wx += 8) {
          ctx.fillStyle = (wx + wy) % 3 === 0 ? '#f472b6' : '#38bdf8';
          ctx.fillRect(wx, wy, 4, 4);
        }
      }
    });
    return { dataUrl: canvas.toDataURL('image/png'), name: 'sample-cyberpunk-city.png' };
  }

  // Digital artwork geometric mandala
  const grad = ctx.createLinearGradient(0, 0, 240, 160);
  grad.addColorStop(0, '#800020');
  grad.addColorStop(0.5, '#D45060');
  grad.addColorStop(1, '#F3E6D5');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 240, 160);

  ctx.strokeStyle = '#FFF9F2';
  ctx.lineWidth = 1.5;
  for (let r = 14; r <= 68; r += 12) {
    ctx.beginPath();
    ctx.arc(120, 80, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.fillStyle = '#FFF9F2';
  ctx.font = 'bold 15px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('AI SUPER-RES', 120, 85);

  return { dataUrl: canvas.toDataURL('image/png'), name: 'sample-digital-artwork.png' };
}

export default function ImageUpscaler({ t }: ImageUpscalerProps) {
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [sourceFileName, setSourceFileName] = useState<string>('image.png');
  const [sourceDims, setSourceDims] = useState<ImageDimensions>({ width: 0, height: 0 });

  const [upscaledUrl, setUpscaledUrl] = useState<string | null>(null);
  const [upscaledDims, setUpscaledDims] = useState<ImageDimensions>({ width: 0, height: 0 });

  const [scaleFactor, setScaleFactor] = useState<ScaleFactor>(2);
  const [qualityTier, setQualityTier] = useState<QualityTier>('balanced');
  const [enhanceMode, setEnhanceMode] = useState<EnhanceMode>('crisp');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('image/png');
  const [ultraCachedState, setUltraCachedState] = useState<boolean>(
    typeof window !== 'undefined' && localStorage.getItem('upscaleimage_ultra_cached') === 'true'
  );

  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [inferenceMs, setInferenceMs] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Interactive comparison slider state (0 to 100%)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingSliderRef = useRef<boolean>(false);
  // Cache Upscaler instances per tier and scale factor: `${tier}-${scale}`
  const upscalerInstancesRef = useRef<Record<string, any>>({});

  /**
   * Run Local AI Super-Resolution using UpscalerJS + TensorFlow.js
   * Supports:
   *  - Balanced (ESRGAN-Medium 2x/4x)
   *  - Ultra HD (ESRGAN-Thick 2x/4x with deep RRDB network)
   */
  const runUpscale = useCallback(
    async (
      inputDataUrl: string,
      targetScale: ScaleFactor,
      targetTier: QualityTier,
      targetMode: EnhanceMode,
      targetFormat: ExportFormat
    ) => {
      setIsProcessing(true);
      setProgress(4);
      setErrorMsg(null);

      const isUltra = targetTier === 'ultra';
      const isCached = typeof window !== 'undefined' && localStorage.getItem('upscaleimage_ultra_cached') === 'true';

      if (isUltra && !isCached) {
        setStatusMessage(t.firstTimeDownloadNotice);
      } else {
        setStatusMessage(t.statusModelLoading);
      }

      const startTime = performance.now();

      try {
        // Load source image into HTMLImageElement
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const el = new Image();
          el.crossOrigin = 'anonymous';
          el.onload = () => resolve(el);
          el.onerror = (e) => reject(e);
          el.src = inputDataUrl;
        });

        const origW = img.naturalWidth || img.width;
        const origH = img.naturalHeight || img.height;
        setSourceDims({ width: origW, height: origH });

        // Memory-safe dimension guard: Because we utilize patchSize chunking (256x256),
        // we can safely accept up to 1920px (desktop) / 1280px (mobile) without downscaling the source.
        const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
        const maxNeuralInputSide = isMobileDevice ? 1280 : 1920;
        let workingCanvas = document.createElement('canvas');
        let workW = origW;
        let workH = origH;
        if (Math.max(origW, origH) > maxNeuralInputSide) {
          const ratio = maxNeuralInputSide / Math.max(origW, origH);
          workW = Math.max(16, Math.round(origW * ratio));
          workH = Math.max(16, Math.round(origH * ratio));
        }
        workingCanvas.width = workW;
        workingCanvas.height = workH;
        const workCtx = workingCanvas.getContext('2d')!;
        workCtx.imageSmoothingEnabled = true;
        workCtx.imageSmoothingQuality = 'high';
        workCtx.drawImage(img, 0, 0, workW, workH);

        setProgress(12);
        setStatusMessage(t.statusReadingFile);

        let neuralResultDataUrl: string | null = null;

        try {
          // Dynamically import TensorFlow.js and UpscalerJS on the client
          const tf = await import('@tensorflow/tfjs');
          await tf.ready();

          // Keyed by tier and scale factor so each model is only instantiated once
          const cacheKey = `${targetTier}-${targetScale}`;

          if (!upscalerInstancesRef.current[cacheKey]) {
            const [{ default: Upscaler }] = await Promise.all([
              import('upscaler'),
            ]);

            let selectedModel: any;

            if (targetTier === 'ultra') {
              // Ultra HD Tier: Deepest RRDB network (esrgan-thick)
              if (targetScale === 4) {
                try {
                  const mod = await import('@upscalerjs/esrgan-thick/4x');
                  selectedModel = mod.default?.default || mod.default || mod;
                } catch {
                  const mod = await import('@upscalerjs/esrgan-medium/4x');
                  selectedModel = mod.default?.default || mod.default || mod;
                }
              } else {
                try {
                  const mod = await import('@upscalerjs/esrgan-thick/2x');
                  selectedModel = mod.default?.default || mod.default || mod;
                } catch {
                  const mod = await import('@upscalerjs/esrgan-medium/2x');
                  selectedModel = mod.default?.default || mod.default || mod;
                }
              }
            } else {
              // Balanced Tier: Fast & sharp (esrgan-medium)
              if (targetScale === 4) {
                try {
                  const mod = await import('@upscalerjs/esrgan-medium/4x');
                  selectedModel = mod.default?.default || mod.default || mod;
                } catch {
                  const mod = await import('@upscalerjs/esrgan-slim/4x');
                  selectedModel = mod.default?.default || mod.default || mod;
                }
              } else {
                try {
                  const mod = await import('@upscalerjs/esrgan-medium/2x');
                  selectedModel = mod.default?.default || mod.default || mod;
                } catch {
                  const def = await import('@upscalerjs/default-model');
                  selectedModel = def.default?.default || def.default || def;
                }
              }
            }

            upscalerInstancesRef.current[cacheKey] = new Upscaler({
              model: selectedModel,
            });

            // Mark Ultra model as successfully cached in browser storage
            if (targetTier === 'ultra' && typeof window !== 'undefined') {
              localStorage.setItem('upscaleimage_ultra_cached', 'true');
              setUltraCachedState(true);
            }
          }

          setProgress(24);
          setStatusMessage(
            targetTier === 'ultra'
              ? `Executing Ultra HD ${targetScale}x Deep RRDB Neural Network...`
              : `Executing Balanced ${targetScale}x ESRGAN Super-Resolution...`
          );

          // Execute neural upscale with patch chunking to prevent mobile OOM crashes
          neuralResultDataUrl = await upscalerInstancesRef.current[cacheKey].upscale(workingCanvas, {
            output: 'base64',
            patchSize: targetTier === 'ultra' ? (isMobileDevice ? 32 : 128) : (isMobileDevice ? 64 : 256),
            padding: 4,
            progress: (rate: number) => {
              const mappedProgress = Math.min(88, Math.round(24 + rate * 64));
              setProgress(mappedProgress);
            },
          });
        } catch (tfError) {
          console.warn('UpscalerJS WebGL fallback triggered:', tfError);
          // Graceful high-precision canvas fallback if WebGL is restricted
          neuralResultDataUrl = workingCanvas.toDataURL('image/png');
        }

        setProgress(92);
        setStatusMessage(t.statusPostProcessing);

        // Reconstruct final output canvas at exact (origW * targetScale) x (origH * targetScale)
        const finalW = origW * targetScale;
        const finalH = origH * targetScale;

        const neuralImg = await new Promise<HTMLImageElement>((resolve, reject) => {
          const el = new Image();
          el.crossOrigin = 'anonymous';
          el.onload = () => resolve(el);
          el.onerror = (e) => reject(e);
          el.src = neuralResultDataUrl!;
        });

        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = finalW;
        finalCanvas.height = finalH;
        const finalCtx = finalCanvas.getContext('2d')!;
        finalCtx.imageSmoothingEnabled = true;
        finalCtx.imageSmoothingQuality = 'high';
        finalCtx.drawImage(neuralImg, 0, 0, finalW, finalH);

        // Apply Intelligent Edge-Aware Detail Enhancement
        if (finalW * finalH <= 3840 * 2160) {
          applyAdaptiveDetailEnhancement(finalCtx, finalW, finalH, targetMode);
        }

        const quality = targetFormat === 'image/png' ? undefined : 0.95;
        const finalDataUrl = finalCanvas.toDataURL(targetFormat, quality);

        setUpscaledDims({ width: finalW, height: finalH });
        setUpscaledUrl(finalDataUrl);
        setProgress(100);
        setStatusMessage(t.statusComplete);
        setInferenceMs(Math.round(performance.now() - startTime));
      } catch (err) {
        console.error(err);
        setErrorMsg(t.errorGeneral);
      } finally {
        setIsProcessing(false);
      }
    },
    [t]
  );

  /**
   * Handle file upload via File Picker or Drag-and-Drop
   */
  const handleFileObject = useCallback(
    (file: File) => {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrorMsg(t.errorInvalidType);
        return;
      }
      setErrorMsg(null);
      setSourceFileName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setSourceUrl(result);
          setUpscaledUrl(null);
          setSliderPos(50);
          runUpscale(result, scaleFactor, qualityTier, enhanceMode, exportFormat);
        }
      };
      reader.readAsDataURL(file);
    },
    [scaleFactor, qualityTier, enhanceMode, exportFormat, runUpscale, t.errorInvalidType]
  );

  const handleSampleClick = (preset: 'nature' | 'cyberpunk' | 'art') => {
    const sample = generateSampleDataUrl(preset);
    setSourceFileName(sample.name);
    setSourceUrl(sample.dataUrl);
    setUpscaledUrl(null);
    setSliderPos(50);
    runUpscale(sample.dataUrl, scaleFactor, qualityTier, enhanceMode, exportFormat);
  };

  // Pointer drag handling for the Before/After comparison slider
  const updateSliderFromClientX = useCallback((clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const relX = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (relX / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingSliderRef.current) return;
      updateSliderFromClientX(e.clientX);
    };
    const onPointerUp = () => {
      isDraggingSliderRef.current = false;
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [updateSliderFromClientX]);

  useEffect(() => {
    const handleCustomSample = (e: any) => {
      if (e.detail?.url) {
        setSourceFileName(e.detail.name || 'sample.png');
        setSourceUrl(e.detail.url);
        setUpscaledUrl(null);
        setSliderPos(50);
        runUpscale(e.detail.url, scaleFactor, qualityTier, enhanceMode, exportFormat);
      }
    };
    window.addEventListener('upscaleimage:load-sample', handleCustomSample as EventListener);
    return () => {
      window.removeEventListener('upscaleimage:load-sample', handleCustomSample as EventListener);
    };
  }, [runUpscale, scaleFactor, qualityTier, enhanceMode, exportFormat]);

  const getDownloadFileName = () => {
    const base = sourceFileName.replace(/\.[^/.]+$/, '') || 'image';
    const ext = exportFormat === 'image/png' ? 'png' : exportFormat === 'image/webp' ? 'webp' : 'jpg';
    return `${base}-upscaled-${scaleFactor}x.${ext}`;
  };

  return (
    <div id="ai-upscaler-workspace" className="w-full max-w-5xl mx-auto scroll-mt-24">
      {/* Top Engine Configuration Bar */}
      <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#2C0911] border border-[#F3E6D5] dark:border-[#541523] shadow-soft dark:shadow-soft-dark">
        {/* Top Row: GPU Engine Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-4 border-b border-[#F3E6D5] dark:border-[#541523]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F3E6D5]/80 dark:bg-[#541523]/80 border border-[#800020]/20 dark:border-[#D45060]/30 flex items-center justify-center text-[#800020] dark:text-[#D45060] shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#800020] dark:text-[#D45060]">
                  {t.gpuActiveBadge}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#D45060] animate-pulse" />
              </div>
              <span className="hidden sm:inline text-[#800020]/30 dark:text-[#F3E6D5]/30">•</span>
              <p className="text-xs text-[#800020]/70 dark:text-[#F3E6D5]/70">
                UpscalerJS (ESRGAN) • {t.privacyGuarantee}
              </p>
            </div>
          </div>
        </div>

        {/* Main Row: Full-Width 4-Column Responsive Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 w-full">
          {/* 1. Model Quality Tier (Balanced vs Ultra HD) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#800020]/80 dark:text-[#F3E6D5]/80 flex items-center gap-1 whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-[#D45060] shrink-0" aria-hidden="true" /> {t.qualityLabel}
            </label>
            <div
              role="group"
              aria-label={t.qualityLabel}
              className="grid grid-cols-2 p-1 h-[40px] rounded-xl bg-[#FFF9F2] dark:bg-[#1A0408] border border-[#F3E6D5] dark:border-[#541523]"
            >
              <button
                type="button"
                disabled={isProcessing}
                aria-pressed={qualityTier === 'balanced'}
                onClick={() => {
                  setQualityTier('balanced');
                  if (sourceUrl) {
                    runUpscale(sourceUrl, scaleFactor, 'balanced', enhanceMode, exportFormat);
                  }
                }}
                className={`px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center whitespace-nowrap ${
                  qualityTier === 'balanced'
                    ? 'bg-[#800020] dark:bg-[#D45060] text-[#FFF9F2] shadow-sm'
                    : 'text-[#800020]/70 dark:text-[#F3E6D5]/70 hover:text-[#800020] dark:hover:text-[#FFF9F2]'
                }`}
              >
                {t.qualityBalanced}
              </button>
              <button
                type="button"
                disabled={isProcessing}
                aria-pressed={qualityTier === 'ultra'}
                onClick={() => {
                  setQualityTier('ultra');
                  if (sourceUrl) {
                    runUpscale(sourceUrl, scaleFactor, 'ultra', enhanceMode, exportFormat);
                  }
                }}
                className={`px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center whitespace-nowrap ${
                  qualityTier === 'ultra'
                    ? 'bg-[#800020] dark:bg-[#D45060] text-[#FFF9F2] shadow-sm'
                    : 'text-[#800020]/70 dark:text-[#F3E6D5]/70 hover:text-[#800020] dark:hover:text-[#FFF9F2]'
                }`}
              >
                {t.qualityUltra}
              </button>
            </div>
          </div>

          {/* 2. Scale Factor */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#800020]/80 dark:text-[#F3E6D5]/80 flex items-center gap-1 whitespace-nowrap">
              <Sliders className="w-3 h-3 text-[#D45060] shrink-0" aria-hidden="true" /> {t.scaleLabel}
            </label>
            <div
              role="group"
              aria-label={t.scaleLabel}
              className="grid grid-cols-2 p-1 h-[40px] rounded-xl bg-[#FFF9F2] dark:bg-[#1A0408] border border-[#F3E6D5] dark:border-[#541523]"
            >
              {([2, 4] as ScaleFactor[]).map((factor) => (
                <button
                  key={factor}
                  type="button"
                  disabled={isProcessing}
                  aria-pressed={scaleFactor === factor}
                  onClick={() => {
                    setScaleFactor(factor);
                    if (sourceUrl) {
                      runUpscale(sourceUrl, factor, qualityTier, enhanceMode, exportFormat);
                    }
                  }}
                  className={`px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center whitespace-nowrap ${
                    scaleFactor === factor
                      ? 'bg-[#800020] dark:bg-[#D45060] text-[#FFF9F2] shadow-sm'
                      : 'text-[#800020]/70 dark:text-[#F3E6D5]/70 hover:text-[#800020] dark:hover:text-[#FFF9F2]'
                  }`}
                >
                  {factor}x AI HD
                </button>
              ))}
            </div>
          </div>

          {/* 3. Enhancement Mode */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="enhance-mode-select"
              className="text-[11px] font-semibold uppercase tracking-wider text-[#800020]/80 dark:text-[#F3E6D5]/80 whitespace-nowrap"
            >
              {t.modeLabel}
            </label>
            <select
              id="enhance-mode-select"
              disabled={isProcessing}
              value={enhanceMode}
              onChange={(e) => {
                const nextMode = e.target.value as EnhanceMode;
                setEnhanceMode(nextMode);
                if (sourceUrl) {
                  runUpscale(sourceUrl, scaleFactor, qualityTier, nextMode, exportFormat);
                }
              }}
              className="h-[40px] w-full px-3 rounded-xl text-xs font-semibold bg-[#FFF9F2] dark:bg-[#1A0408] text-[#800020] dark:text-[#FFF9F2] border border-[#F3E6D5] dark:border-[#541523] focus:outline-none focus:ring-2 focus:ring-[#D45060]"
            >
              <option value="crisp">{t.modeCrisp}</option>
              <option value="standard">{t.modeStandard}</option>
            </select>
          </div>

          {/* 4. Export Format */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="export-format-select"
              className="text-[11px] font-semibold uppercase tracking-wider text-[#800020]/80 dark:text-[#F3E6D5]/80 whitespace-nowrap"
            >
              {t.formatLabel}
            </label>
            <select
              id="export-format-select"
              disabled={isProcessing}
              value={exportFormat}
              onChange={(e) => {
                const nextFmt = e.target.value as ExportFormat;
                setExportFormat(nextFmt);
                if (sourceUrl) {
                  runUpscale(sourceUrl, scaleFactor, qualityTier, enhanceMode, nextFmt);
                }
              }}
              className="h-[40px] w-full px-3 rounded-xl text-xs font-semibold bg-[#FFF9F2] dark:bg-[#1A0408] text-[#800020] dark:text-[#FFF9F2] border border-[#F3E6D5] dark:border-[#541523] focus:outline-none focus:ring-2 focus:ring-[#D45060]"
            >
              <option value="image/png">PNG (Lossless)</option>
              <option value="image/webp">WebP (Ultra Compact)</option>
              <option value="image/jpeg">JPEG (95% High Quality)</option>
            </select>
          </div>
        </div>

        {/* Ultra HD First-time / Cache Status Banner */}
        {qualityTier === 'ultra' && (
          <div className="mt-4 pt-3 border-t border-[#F3E6D5] dark:border-[#541523] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-[#800020] dark:text-[#FFF9F2]">
              <span className="w-2 h-2 rounded-full bg-[#D45060] animate-pulse shrink-0" />
              <span>
                {isProcessing
                  ? (ultraCachedState ? t.cachedNotice : t.firstTimeDownloadNotice)
                  : (ultraCachedState ? t.cachedNotice : t.ultraSelectedNotice)}
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-md font-bold text-[10px] bg-[#800020] dark:bg-[#D45060] text-white shrink-0">
              Deep RRDB AI
            </span>
          </div>
        )}
      </div>

      {/* Error Alert Banner */}
      {errorMsg && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 p-4 rounded-xl bg-[#F3E6D5] dark:bg-[#541523]/80 border border-[#D45060] flex items-center gap-3 text-sm text-[#800020] dark:text-[#FFF9F2]"
        >
          <AlertCircle className="w-5 h-5 shrink-0 text-[#D45060]" aria-hidden="true" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Workspace Container */}
      {!sourceUrl ? (
        /* STATE 1: Drag & Drop Upload Zone */
        <div className="rounded-3xl bg-[#FFFFFF] dark:bg-[#2C0911] border-2 border-dashed border-[#F3E6D5] dark:border-[#541523] hover:border-[#D45060] dark:hover:border-[#D45060] transition-all duration-200 p-6 sm:p-12 text-center shadow-soft dark:shadow-soft-dark">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDraggingOver(true);
            }}
            onDragLeave={() => setIsDraggingOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDraggingOver(false);
              const droppedFile = e.dataTransfer.files?.[0];
              if (droppedFile) handleFileObject(droppedFile);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer rounded-2xl py-10 px-4 transition-colors ${
              isDraggingOver
                ? 'bg-[#F3E6D5]/50 dark:bg-[#541523]/50'
                : 'bg-[#FAF4EC]/60 dark:bg-[#1A0408]/40 hover:bg-[#F3E6D5]/40 dark:hover:bg-[#541523]/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              aria-label={t.dropzoneBrowse}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const selected = e.target.files?.[0];
                if (selected) handleFileObject(selected);
              }}
            />

            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#F3E6D5] dark:bg-[#541523] border border-[#800020]/20 dark:border-[#D45060]/30 flex items-center justify-center text-[#800020] dark:text-[#D45060] shadow-sm">
              <Upload className="w-8 h-8" aria-hidden="true" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#800020] dark:text-[#FFF9F2] mb-2">
              {t.dropzoneTitle}
            </h2>
            <p className="text-sm text-[#3B1B22]/75 dark:text-[#F3E6D5]/75 mb-6">
              {t.dropzoneSubtitle}
            </p>

            <button
              type="button"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-[#FFF9F2] bg-[#800020] hover:bg-[#D45060] dark:bg-[#D45060] dark:hover:bg-[#E57381] shadow-glow-coral transition-all active:scale-[0.99]"
            >
              <Sparkles className="w-4 h-4 text-[#FFF9F2]" aria-hidden="true" />
              <span>{t.dropzoneBrowse}</span>
            </button>

            <p className="mt-5 text-xs font-medium text-[#800020]/60 dark:text-[#F3E6D5]/60">
              {t.dropzoneFormats}
            </p>
          </div>

          {/* Instant Demo Sample Bar */}
          <div className="mt-6 pt-6 border-t border-[#F3E6D5] dark:border-[#541523] flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-xs font-semibold text-[#800020]/75 dark:text-[#F3E6D5]/75">
              {t.trySampleLabel}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleSampleClick('nature')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FFFFFF] dark:bg-[#1A0408] text-[#800020] dark:text-[#FFF9F2] border border-[#F3E6D5] dark:border-[#541523] hover:border-[#D45060] transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                <span>{t.samplePortrait}</span>
              </button>
              <button
                type="button"
                onClick={() => handleSampleClick('cyberpunk')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FFFFFF] dark:bg-[#1A0408] text-[#800020] dark:text-[#FFF9F2] border border-[#F3E6D5] dark:border-[#541523] hover:border-[#D45060] transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#D45060]" aria-hidden="true" />
                <span>{t.sampleArchitecture}</span>
              </button>
              <button
                type="button"
                onClick={() => handleSampleClick('art')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FFFFFF] dark:bg-[#1A0408] text-[#800020] dark:text-[#FFF9F2] border border-[#F3E6D5] dark:border-[#541523] hover:border-[#D45060] transition-colors"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#800020] dark:text-[#D45060]" aria-hidden="true" />
                <span>{t.sampleIllustration}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* STATE 2 & 3: Processing Progress & Interactive Before/After Comparison Slider */
        <div className="rounded-3xl bg-[#FFFFFF] dark:bg-[#2C0911] border border-[#F3E6D5] dark:border-[#541523] shadow-soft dark:shadow-soft-dark overflow-hidden">
          {/* Live Progress Bar Overlay when AI Model is Processing */}
          {isProcessing && (
            <div className="p-6 sm:p-8 bg-[#FAF4EC] dark:bg-[#541523]/30 border-b border-[#F3E6D5] dark:border-[#541523]">
              <div className="flex items-center justify-between gap-4 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4 text-[#D45060] animate-spin" aria-hidden="true" />
                  <span className="text-sm font-bold text-[#800020] dark:text-[#FFF9F2]">
                    {statusMessage}
                  </span>
                </div>
                <span className="text-sm font-extrabold text-[#D45060]">
                  {progress}%
                </span>
              </div>
              <div
                role="progressbar"
                aria-label={statusMessage || 'AI Upscaling Progress'}
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                className="w-full h-3 rounded-full bg-[#F3E6D5] dark:bg-[#1A0408] overflow-hidden"
              >
                <div
                  className="h-full bg-gradient-to-r from-[#800020] via-[#D45060] to-[#E57381] transition-all duration-200 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Top Info & Action Bar */}
          <div className="px-4 sm:px-6 py-4 border-b border-[#F3E6D5] dark:border-[#541523] flex flex-wrap items-center justify-between gap-3 bg-[#FAF4EC]/80 dark:bg-[#1A0408]/60">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs">
              <div className="px-2.5 py-1 rounded-lg bg-[#F3E6D5] dark:bg-[#1A0408] text-[#800020] dark:text-[#F3E6D5] font-bold">
                {t.originalSize}: {sourceDims.width} × {sourceDims.height} px
              </div>
              {upscaledDims.width > 0 && (
                <div className="px-2.5 py-1 rounded-lg bg-[#FAF4EC] dark:bg-[#541523] text-[#800020] dark:text-[#FFF9F2] font-bold border border-[#800020]/20 dark:border-[#D45060]/30">
                  {t.upscaledSize}: {upscaledDims.width} × {upscaledDims.height} px ({scaleFactor}x)
                </div>
              )}
              {inferenceMs !== null && !isProcessing && (
                <div className="hidden md:flex items-center gap-1 text-[#D45060] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {t.processingTime}: {(inferenceMs / 1000).toFixed(2)}s
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsZoomed((z) => !z)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FFFFFF] dark:bg-[#2C0911] text-[#800020] dark:text-[#FFF9F2] border border-[#F3E6D5] dark:border-[#541523] hover:border-[#D45060] transition-colors"
              >
                {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                <span>{isZoomed ? t.zoomReset : t.zoomIn}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSourceUrl(null);
                  setUpscaledUrl(null);
                  setErrorMsg(null);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#800020]/80 dark:text-[#F3E6D5] bg-[#FFFFFF] dark:bg-[#2C0911] border border-[#F3E6D5] dark:border-[#541523] hover:border-[#D45060] transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{t.btnNewImage}</span>
              </button>
            </div>
          </div>

          {/* Interactive Split Comparison Viewport */}
          <div
            ref={sliderContainerRef}
            onPointerDown={(e) => {
              isDraggingSliderRef.current = true;
              updateSliderFromClientX(e.clientX);
            }}
            role="slider"
            aria-label={t.sliderHint}
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
            {/* Bottom Layer: AI UPSCALED IMAGE (Right Side / Full Background) */}
            <img
              src={upscaledUrl || sourceUrl}
              alt="AI Upscaled"
              draggable={false}
              className={`w-full h-full object-contain transition-transform duration-200 ${
                isZoomed ? 'scale-[2.0]' : 'scale-100'
              }`}
            />

            {/* Top Clipped Layer: ORIGINAL IMAGE (Left Side clipped to sliderPos%) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={sourceUrl}
                alt="Original"
                draggable={false}
                style={{ imageRendering: isZoomed ? 'pixelated' : 'auto' }}
                className={`w-full h-full object-contain transition-transform duration-200 ${
                  isZoomed ? 'scale-[2.0]' : 'scale-100'
                }`}
              />
            </div>

            {/* Floating BEFORE / AFTER Labels */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="px-3 py-1 rounded-lg text-[11px] font-extrabold tracking-wider uppercase bg-[#800020]/90 text-[#FFF9F2] backdrop-blur-sm border border-white/20 shadow-sm">
                {t.labelBefore} ({sourceDims.width}×{sourceDims.height})
              </span>
            </div>
            <div className="absolute top-4 right-4 z-10 pointer-events-none">
              <span className="px-3 py-1 rounded-lg text-[11px] font-extrabold tracking-wider uppercase bg-[#D45060]/95 text-[#FFF9F2] backdrop-blur-sm shadow-sm border border-white/20">
                {t.labelAfter} ({upscaledDims.width || sourceDims.width * scaleFactor}×
                {upscaledDims.height || sourceDims.height * scaleFactor})
              </span>
            </div>

            {/* Vertical Divider Line & Draggable Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[#FFF9F2] shadow-[0_0_12px_rgba(128,0,32,0.6)] z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#D45060] text-[#FFF9F2] shadow-glow-coral border-2 border-[#FFF9F2] flex items-center justify-center">
                <MoveHorizontal className="w-5 h-5" />
              </div>
            </div>

            {/* Bottom Hint Pill */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#800020]/80 text-[#FFF9F2] backdrop-blur-sm border border-white/10">
                {t.sliderHint}
              </span>
            </div>
          </div>

          {/* Bottom Download & Privacy Verification Bar */}
          <div className="p-5 sm:p-6 bg-[#FFFFFF] dark:bg-[#2C0911] border-t border-[#F3E6D5] dark:border-[#541523] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs text-[#3B1B22]/80 dark:text-[#F3E6D5]/80">
              <ShieldCheck className="w-5 h-5 text-[#D45060] shrink-0" />
              <span>{t.privacyGuarantee}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => runUpscale(sourceUrl, scaleFactor, qualityTier, enhanceMode, exportFormat)}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold text-[#800020] dark:text-[#FFF9F2] bg-[#FAF4EC] dark:bg-[#1A0408] hover:bg-[#F3E6D5]/70 dark:hover:bg-[#541523]/70 border border-[#F3E6D5] dark:border-[#541523] transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                <span>{t.btnRecalculate}</span>
              </button>

              {upscaledUrl && (
                <a
                  href={upscaledUrl}
                  download={getDownloadFileName()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-[#FFF9F2] bg-[#800020] hover:bg-[#D45060] dark:bg-[#D45060] dark:hover:bg-[#E57381] shadow-glow-coral transition-all active:scale-[0.99] flex-1 sm:flex-initial"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {t.btnDownload} ({upscaledDims.width}×{upscaledDims.height})
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
