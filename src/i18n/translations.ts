export const LOCALES = ['en', 'es', 'pt', 'de', 'fr', 'ja'] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, { name: string; flag: string; htmlLang: string; ogLocale: string }> = {
  en: { name: 'English', flag: '🇺🇸', htmlLang: 'en', ogLocale: 'en_US' },
  es: { name: 'Español', flag: '🇪🇸', htmlLang: 'es', ogLocale: 'es_ES' },
  pt: { name: 'Português', flag: '🇧🇷', htmlLang: 'pt', ogLocale: 'pt_BR' },
  de: { name: 'Deutsch', flag: '🇩🇪', htmlLang: 'de', ogLocale: 'de_DE' },
  fr: { name: 'Français', flag: '🇫🇷', htmlLang: 'fr', ogLocale: 'fr_FR' },
  ja: { name: '日本語', flag: '🇯🇵', htmlLang: 'ja', ogLocale: 'ja_JP' },
};

export interface TranslationDictionary {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    brandSubtitle: string;
    languageLabel: string;
    toggleTheme: string;
    supportDeveloper: string;
    supportShort: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    pillPrivacy: string;
    pillSpeed: string;
    pillFree: string;
  };
  upscaler: {
    dropzoneTitle: string;
    dropzoneSubtitle: string;
    dropzoneBrowse: string;
    dropzoneFormats: string;
    trySampleLabel: string;
    samplePortrait: string;
    sampleArchitecture: string;
    sampleIllustration: string;
    scaleLabel: string;
    qualityLabel: string;
    qualityBalanced: string;
    qualityUltra: string;
    firstTimeDownloadNotice: string;
    ultraSelectedNotice: string;
    cachedNotice: string;
    modeLabel: string;
    modeStandard: string;
    modeCrisp: string;
    formatLabel: string;
    btnStartUpscale: string;
    btnRecalculate: string;
    btnNewImage: string;
    btnDownload: string;
    statusModelLoading: string;
    statusReadingFile: string;
    statusUpscaling: string;
    statusPostProcessing: string;
    statusComplete: string;
    gpuActiveBadge: string;
    labelBefore: string;
    labelAfter: string;
    sliderHint: string;
    originalSize: string;
    upscaledSize: string;
    processingTime: string;
    privacyGuarantee: string;
    zoomIn: string;
    zoomReset: string;
    errorInvalidType: string;
    errorGeneral: string;
  };
  showcase: {
    badge: string;
    sectionTitle: string;
    sectionSubtitle: string;
    dragHint: string;
    labelOriginal: string;
    labelEnhanced: string;
    btnTestSample: string;
    portraitTab: string;
    portraitDesc: string;
    architectureTab: string;
    architectureDesc: string;
    animeTab: string;
    animeDesc: string;
  };
  features: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  faq: {
    sectionTitle: string;
    items: Array<{
      q: string;
      a: string;
    }>;
  };
  footer: {
    tagline: string;
    privacyNote: string;
    supportPrompt: string;
    supportButton: string;
    copyright: string;
  };
}

export const translations: Record<Locale, TranslationDictionary> = {
  en: {
    meta: {
      title: 'UpscaleImage | Free Local AI Image Enhancer',
      description:
        'A 100% client-side, zero-server AI image upscaler built with UpscalerJS & TensorFlow.js. Enhance and upscale JPEG, PNG, and WebP images directly in your browser with total privacy.',
      keywords:
        'AI image upscaler, free image enhancer, local AI upscaler, UpscalerJS, TensorFlow.js super resolution, private image upscaler, upscale photo browser',
    },
    nav: {
      brandSubtitle: 'Local AI Super Resolution',
      languageLabel: 'Language',
      toggleTheme: 'Toggle Light/Dark Mode',
      supportDeveloper: 'Support the Developer',
      supportShort: 'Support',
    },
    hero: {
      badge: '100% Client-Side AI • Zero Server Uploads • WebGL Accelerated',
      titleStart: 'Upscale & Enhance Images with ',
      titleHighlight: 'Local Browser AI',
      subtitle:
        'Restore crisp details and boost image resolution up to 4x using neural networks running directly on your device GPU. Your photos never leave your computer.',
      pillPrivacy: '100% Private (Offline Capable)',
      pillSpeed: 'WebGL GPU Accelerated',
      pillFree: 'No Watermarks or Sign-up',
    },
    upscaler: {
      dropzoneTitle: 'Drag & drop your image here',
      dropzoneSubtitle: 'or click to select a file from your device',
      dropzoneBrowse: 'Select Image File',
      dropzoneFormats: 'Supports JPEG, PNG, WebP • Processed 100% in browser memory',
      trySampleLabel: 'No photo handy? Test instantly with a sample:',
      samplePortrait: 'Macro Nature',
      sampleArchitecture: 'Cyberpunk City',
      sampleIllustration: 'Digital Artwork',
      scaleLabel: 'Upscale Factor',
      qualityLabel: 'Model Quality Tier',
      qualityBalanced: '⚡ Balanced',
      qualityUltra: '💎 Ultra HD',
      firstTimeDownloadNotice: 'Downloading Ultra HD Neural Weights (~30MB)... This runs once and caches permanently in your browser for instant future runs!',
      ultraSelectedNotice: 'Ultra HD Mode Active • Will download ~30MB AI weights when you upload or process an image.',
      cachedNotice: 'Ultra HD Model loaded from browser cache (Zero latency)',
      modeLabel: 'AI Enhancement Mode',
      modeStandard: 'Neural Super Resolution (Balanced)',
      modeCrisp: 'Neural SR + Micro-Contrast Sharpen',
      formatLabel: 'Export Format',
      btnStartUpscale: 'Upscale Image Now',
      btnRecalculate: 'Re-Enhance Image',
      btnNewImage: 'Upload New Image',
      btnDownload: 'Download Enhanced Image',
      statusModelLoading: 'Loading UpscalerJS Neural Model into Browser Cache...',
      statusReadingFile: 'Decoding image tensor into local memory...',
      statusUpscaling: 'Executing local AI Super-Resolution on TensorFlow.js...',
      statusPostProcessing: 'Reconstructing high-definition canvas & sharpening details...',
      statusComplete: 'AI Enhancement Complete!',
      gpuActiveBadge: 'TensorFlow.js WebGL Engine Active',
      labelBefore: 'ORIGINAL',
      labelAfter: 'AI UPSCALED',
      sliderHint: 'Drag the slider left or right to inspect pixel restoration',
      originalSize: 'Original Resolution',
      upscaledSize: 'Enhanced Resolution',
      processingTime: 'Local Inference Time',
      privacyGuarantee: 'Zero bytes uploaded. Processed 100% locally on your hardware.',
      zoomIn: 'Toggle 2x Loupe Zoom',
      zoomReset: 'Fit View',
      errorInvalidType: 'Please upload a valid JPEG, PNG, or WebP image.',
      errorGeneral: 'An error occurred during AI processing. Try a smaller image or reload.',
    },
    showcase: {
      badge: 'Interactive Visual Showcase',
      sectionTitle: 'See the AI Super-Resolution Difference',
      sectionSubtitle: 'Drag the slider to inspect before and after comparisons across portraits, architecture, and digital illustrations.',
      dragHint: 'Drag slider to compare Before & After',
      labelOriginal: 'BEFORE (Low-Res / Compressed)',
      labelEnhanced: 'AFTER (4x AI Super-Resolution)',
      btnTestSample: 'Test this sample in AI Upscaler',
      portraitTab: 'Portrait Details',
      portraitDesc: 'Restores fine skin pores, individual eyelashes, and natural hair strands without plastic smoothing.',
      architectureTab: 'Architecture & Textures',
      architectureDesc: 'Reconstructs complex stone masonry, brick edges, and window frames from pixelated photos.',
      animeTab: 'Anime & Illustration',
      animeDesc: 'Sharpens hand-drawn line art and cleans JPEG compression artifacts with smooth color fills.',
    },
    features: {
      sectionTitle: 'Why Choose Local Browser AI Upscaling?',
      sectionSubtitle: 'Engineered for uncompromising privacy, crystal-clear super-resolution, and zero cloud latency.',
      items: [
        {
          title: 'Absolute Zero-Server Privacy',
          description:
            'Unlike traditional cloud enhancers that upload your sensitive photos to remote servers, UpscaleImage processes every pixel inside your browser sandbox.',
        },
        {
          title: 'UpscalerJS & TensorFlow.js Engine',
          description:
            'Powered by pre-trained Convolutional Neural Networks (ESRGAN-Slim) cached directly in your browser and executed via hardware WebGL acceleration.',
        },
        {
          title: 'Interactive Pixel Comparison',
          description:
            'Inspect before-and-after quality in real time with our responsive split-screen comparison slider and lossless high-resolution export.',
        },
      ],
    },
    faq: {
      sectionTitle: 'Frequently Asked Questions',
      items: [
        {
          q: 'Are my images ever uploaded to a server?',
          a: 'Never. All image reading, TensorFlow.js tensor inference, and canvas exports happen strictly locally inside your browser. Once the AI model loads, you can even disconnect from the internet and keep upscaling.',
        },
        {
          q: 'Which image formats are supported?',
          a: 'You can drag and drop JPEG (.jpg, .jpeg), PNG (.png with full alpha transparency preservation), and WebP (.webp) files.',
        },
        {
          q: 'Why does it process in tiles/patches with a live progress bar?',
          a: 'Processing an image in intelligent overlapping tiles prevents browser GPU out-of-memory errors and delivers smooth, real-time progress updates even on mobile devices and laptops.',
        },
      ],
    },
    footer: {
      tagline: '100% Client-Side AI Image Super Resolution. Built with Astro, React Islands, Tailwind CSS & UpscalerJS.',
      privacyNote: 'Privacy First: Zero cookies, zero tracking, zero server uploads.',
      supportPrompt: 'Enjoying free, ad-free local AI tools?',
      supportButton: 'Buy Me a Coffee',
      copyright: 'All rights reserved.',
    },
  },
  es: {
    meta: {
      title: 'UpscaleImage | Mejorador de Imágenes con IA Local Gratis',
      description:
        'Escalador de imágenes con IA 100% del lado del cliente y sin servidor, creado con UpscalerJS y TensorFlow.js. Mejora imágenes JPEG, PNG y WebP con privacidad absoluta.',
      keywords:
        'escalador de imágenes IA, mejorar calidad de imagen gratis, super resolución local, UpscalerJS, TensorFlow.js, aumentar resolución foto',
    },
    nav: {
      brandSubtitle: 'Súper Resolución IA Local',
      languageLabel: 'Idioma',
      toggleTheme: 'Cambiar modo claro/oscuro',
      supportDeveloper: 'Apoyar al Desarrollador',
      supportShort: 'Apoyar',
    },
    hero: {
      badge: 'IA 100% en tu Navegador • Cero Subidas al Servidor • Aceleración WebGL',
      titleStart: 'Aumenta y Mejora tus Imágenes con ',
      titleHighlight: 'IA Local en tu Dispositivo',
      subtitle:
        'Restaura detalles nítidos y multiplica la resolución hasta 4x mediante redes neuronales ejecutadas directamente en la GPU de tu navegador. Tus fotos nunca salen de tu equipo.',
      pillPrivacy: '100% Privado (Sin Servidor)',
      pillSpeed: 'Acelerado por GPU WebGL',
      pillFree: 'Sin Marcas de Agua ni Registro',
    },
    upscaler: {
      dropzoneTitle: 'Arrastra y suelta tu imagen aquí',
      dropzoneSubtitle: 'o haz clic para seleccionar un archivo de tu dispositivo',
      dropzoneBrowse: 'Seleccionar Imagen',
      dropzoneFormats: 'Soporta JPEG, PNG, WebP • Procesado 100% en la memoria local',
      trySampleLabel: '¿No tienes una imagen a mano? Prueba con un ejemplo:',
      samplePortrait: 'Naturaleza Macro',
      sampleArchitecture: 'Ciudad Cyberpunk',
      sampleIllustration: 'Arte Digital',
      scaleLabel: 'Factor de Escalado',
      qualityLabel: 'Nivel de Calidad del Modelo',
      qualityBalanced: '⚡ Equilibrado',
      qualityUltra: '💎 Ultra HD',
      firstTimeDownloadNotice: 'Descargando pesos Ultra HD (~30MB)... ¡Se guardan en caché para usos futuros instantáneos!',
      ultraSelectedNotice: 'Modo Ultra HD activo • Descargará ~30MB de pesos al procesar la primera imagen.',
      cachedNotice: 'Modelo Ultra HD cargado desde el caché del navegador',
      modeLabel: 'Modo de Mejora IA',
      modeStandard: 'Súper Resolución Neuronal (Equilibrado)',
      modeCrisp: 'Súper Resolución + Nitidez Micro-Contraste',
      formatLabel: 'Formato de Salida',
      btnStartUpscale: 'Mejorar Imagen Ahora',
      btnRecalculate: 'Volver a Procesar',
      btnNewImage: 'Subir Otra Imagen',
      btnDownload: 'Descargar Imagen Mejorada',
      statusModelLoading: 'Cargando modelo neuronal UpscalerJS en la caché del navegador...',
      statusReadingFile: 'Decodificando tensor de imagen en memoria local...',
      statusUpscaling: 'Ejecutando Súper Resolución IA local con TensorFlow.js...',
      statusPostProcessing: 'Reconstruyendo lienzo de alta definición y enfocando detalles...',
      statusComplete: '¡Mejora con IA Completada!',
      gpuActiveBadge: 'Motor TensorFlow.js WebGL Activo',
      labelBefore: 'ORIGINAL',
      labelAfter: 'IA MEJORADA',
      sliderHint: 'Desliza el control hacia la izquierda o derecha para comparar los píxeles',
      originalSize: 'Resolución Original',
      upscaledSize: 'Resolución Mejorada',
      processingTime: 'Tiempo de Inferencia',
      privacyGuarantee: 'Cero bytes subidos a internet. Procesado 100% localmente.',
      zoomIn: 'Zoom Lupa 2x',
      zoomReset: 'Ajustar Vista',
      errorInvalidType: 'Por favor selecciona una imagen válida en formato JPEG, PNG o WebP.',
      errorGeneral: 'Ocurrió un error al procesar la imagen. Intenta con una imagen más pequeña.',
    },
    showcase: {
      badge: 'Demostración Visual Interactiva',
      sectionTitle: 'Descubre la Diferencia de la Superresolución IA',
      sectionSubtitle: 'Desliza para comparar el antes y después en retratos, arquitectura e ilustraciones digitales.',
      dragHint: 'Desliza para comparar el Antes y Después',
      labelOriginal: 'ANTES (Baja Resolución)',
      labelEnhanced: 'DESPUÉS (4x Superresolución IA)',
      btnTestSample: 'Probar esta muestra en el Mejorador IA',
      portraitTab: 'Detalles de Retrato',
      portraitDesc: 'Restaura poros finos, pestañas individuales y cabello natural sin efecto plástico.',
      architectureTab: 'Arquitectura y Texturas',
      architectureDesc: 'Reconstruye mampostería de piedra compleja y bordes nítidos a partir de fotos pixeladas.',
      animeTab: 'Anime e Ilustración',
      animeDesc: 'Afina trazos de dibujo y elimina artefactos de compresión JPEG con colores limpios.',
    },
    features: {
      sectionTitle: '¿Por qué elegir nuestro Escalador IA Local?',
      sectionSubtitle: 'Diseñado para ofrecer privacidad absoluta, súper resolución cristalina y cero latencia en la nube.',
      items: [
        {
          title: 'Privacidad Absoluta Sin Servidores',
          description:
            'A diferencia de otras herramientas en la nube, UpscaleImage procesa cada píxel directamente dentro de tu navegador sin enviar datos a terceros.',
        },
        {
          title: 'Motor UpscalerJS y TensorFlow.js',
          description:
            'Impulsado por redes neuronales convolucionales preentrenadas almacenadas en caché y aceleradas mediante WebGL en tu propia tarjeta gráfica.',
        },
        {
          title: 'Comparador Interactivo Antes/Después',
          description:
            'Inspecciona la restauración de detalles en tiempo real con nuestro deslizador interactivo y descarga en alta resolución sin pérdidas.',
        },
      ],
    },
    faq: {
      sectionTitle: 'Preguntas Frecuentes',
      items: [
        {
          q: '¿Mis fotos se suben a algún servidor externo?',
          a: 'Nunca. Todo el procesamiento neuronal con TensorFlow.js ocurre dentro de tu propio navegador web. Tus archivos permanecen 100% privados en tu dispositivo.',
        },
        {
          q: '¿Qué formatos de imagen son compatibles?',
          a: 'Puedes arrastrar y soltar imágenes en formato JPEG (.jpg, .jpeg), PNG (.png con transparencia) y WebP (.webp).',
        },
        {
          q: '¿Por qué se procesa por bloques con una barra de progreso?',
          a: 'El procesamiento inteligente por mosaicos evita que la memoria GPU del navegador se sature y permite mostrar el progreso en tiempo real en móviles y ordenadores.',
        },
      ],
    },
    footer: {
      tagline: 'Súper Resolución de Imágenes con IA 100% en el Navegador. Creado con Astro, React, Tailwind y UpscalerJS.',
      privacyNote: 'Privacidad Primero: Cero servidores, cero rastreo, 100% local.',
      supportPrompt: '¿Te gusta esta herramienta gratuita y sin anuncios?',
      supportButton: 'Invítame a un Café',
      copyright: 'Todos los derechos reservados.',
    },
  },
  pt: {
    meta: {
      title: 'UpscaleImage | Melhorador de Imagens IA Local Gratuito',
      description:
        'Aumente a resolução de imagens com IA 100% no navegador e sem servidor usando UpscalerJS e TensorFlow.js. Melhore fotos JPEG, PNG e WebP com total privacidade.',
      keywords:
        'melhorar qualidade de imagem IA, aumentar resolução foto grátis, upscaler de imagem local, UpscalerJS, TensorFlow.js, super resolução navegador',
    },
    nav: {
      brandSubtitle: 'Super Resolução IA Local',
      languageLabel: 'Idioma',
      toggleTheme: 'Alternar Tema Claro/Escuro',
      supportDeveloper: 'Apoiar o Desenvolvedor',
      supportShort: 'Apoiar',
    },
    hero: {
      badge: 'IA 100% no Navegador • Zero Uploads para Servidores • Aceleração WebGL',
      titleStart: 'Aumente e Melhore Imagens com ',
      titleHighlight: 'IA Local no Navegador',
      subtitle:
        'Restaure detalhes nítidos e amplie a resolução em até 4x usando redes neurais executadas diretamente na GPU do seu dispositivo. Suas fotos nunca saem do seu computador.',
      pillPrivacy: '100% Privado (Zero Nuvem)',
      pillSpeed: 'Aceleração GPU WebGL',
      pillFree: 'Sem Marca d’Água ou Cadastro',
    },
    upscaler: {
      dropzoneTitle: 'Arraste e solte sua imagem aqui',
      dropzoneSubtitle: 'ou clique para escolher um arquivo do seu dispositivo',
      dropzoneBrowse: 'Selecionar Imagem',
      dropzoneFormats: 'Suporta JPEG, PNG, WebP • Processado 100% na memória local',
      trySampleLabel: 'Sem imagem agora? Teste instantaneamente com um exemplo:',
      samplePortrait: 'Natureza Macro',
      sampleArchitecture: 'Cidade Cyberpunk',
      sampleIllustration: 'Arte Digital',
      scaleLabel: 'Fator de Ampliação',
      qualityLabel: 'Nível de Qualidade do Modelo',
      qualityBalanced: '⚡ Equilibrado',
      qualityUltra: '💎 Ultra HD',
      firstTimeDownloadNotice: 'Baixando pesos Ultra HD (~30MB)... Ficarão salvos em cache para uso instantâneo!',
      ultraSelectedNotice: 'Modo Ultra HD ativo • Baixará ~30MB de pesos na primeira imagem escalada.',
      cachedNotice: 'Modelo Ultra HD carregado do cache do navegador',
      modeLabel: 'Modo de Aprimoramento IA',
      modeStandard: 'Super Resolução Neural (Equilibrado)',
      modeCrisp: 'Super Resolução + Nitidez de Detalhes',
      formatLabel: 'Formato de Exportação',
      btnStartUpscale: 'Melhorar Imagem Agora',
      btnRecalculate: 'Reprocessar Imagem',
      btnNewImage: 'Enviar Nova Imagem',
      btnDownload: 'Baixar Imagem em Alta Resolução',
      statusModelLoading: 'Carregando modelo neural UpscalerJS no cache do navegador...',
      statusReadingFile: 'Decodificando tensor da imagem na memória local...',
      statusUpscaling: 'Executando Super Resolução IA local via TensorFlow.js...',
      statusPostProcessing: 'Reconstruindo imagem em alta definição e refinando bordas...',
      statusComplete: 'Aprimoramento com IA Concluído!',
      gpuActiveBadge: 'Motor TensorFlow.js WebGL Ativo',
      labelBefore: 'ORIGINAL',
      labelAfter: 'IA AMPLIADA',
      sliderHint: 'Arraste o controle deslizante para comparar o antes e o depois',
      originalSize: 'Resolução Original',
      upscaledSize: 'Resolução Ampliada',
      processingTime: 'Tempo de Processamento',
      privacyGuarantee: 'Zero bytes enviados. Processado 100% localmente no seu aparelho.',
      zoomIn: 'Alternar Zoom 2x',
      zoomReset: 'Ajustar Tela',
      errorInvalidType: 'Envie uma imagem válida nos formatos JPEG, PNG ou WebP.',
      errorGeneral: 'Erro durante o processamento local. Tente uma imagem menor.',
    },
    showcase: {
      badge: 'Demonstração Visual Interativa',
      sectionTitle: 'Veja a Diferença da Super-Resolução com IA',
      sectionSubtitle: 'Arraste o controle para comparar antes e depois em retratos, arquitetura e ilustrações.',
      dragHint: 'Arraste para comparar Antes e Depois',
      labelOriginal: 'ANTES (Baixa Resolução)',
      labelEnhanced: 'DEPOIS (4x Super-Resolução IA)',
      btnTestSample: 'Testar esta amostra no Upscaler IA',
      portraitTab: 'Detalhes de Retrato',
      portraitDesc: 'Restaura poros da pele, cílios individuais e fios de cabelo sem efeito artificial.',
      architectureTab: 'Arquitetura e Texturas',
      architectureDesc: 'Reconstrói alvenaria de pedra e contornos nítidos a partir de imagens com poucos pixels.',
      animeTab: 'Anime e Ilustração',
      animeDesc: 'Acentua traços manuais e elimina ruídos de compressão JPEG com transições perfeitas.',
    },
    features: {
      sectionTitle: 'Por que usar Super Resolução IA Local?',
      sectionSubtitle: 'Projetado para máxima privacidade, nitidez impressionante e velocidade direto no navegador.',
      items: [
        {
          title: 'Privacidade Total Sem Servidor',
          description:
            'Suas imagens confidenciais ou pessoais nunca são enviadas para a internet. Todo o cálculo neural ocorre localmente no seu próprio navegador.',
        },
        {
          title: 'Tecnologia UpscalerJS & TensorFlow.js',
          description:
            'Modelos neurais pré-treinados baixados diretamente para o cache do navegador com aceleração de hardware WebGL.',
        },
        {
          title: 'Comparação Interativa Antes e Depois',
          description:
            'Analise cada detalhe restaurado usando o controle deslizante interativo antes de baixar sua imagem em alta definição.',
        },
      ],
    },
    faq: {
      sectionTitle: 'Perguntas Frequentes',
      items: [
        {
          q: 'Minhas fotos são enviadas para algum servidor?',
          a: 'Não! Todo o processamento acontece exclusivamente na memória e GPU do seu próprio dispositivo através do TensorFlow.js.',
        },
        {
          q: 'Quais formatos de arquivo são aceitos?',
          a: 'Você pode carregar arquivos JPEG (.jpg, .jpeg), PNG (.png incluindo fundo transparente) e WebP (.webp).',
        },
        {
          q: 'Por que o processamento é feito em blocos com barra de progresso?',
          a: 'Dividir a imagem em blocos inteligentes evita travamentos de memória na placa de vídeo e garante fluidez tanto no celular quanto no computador.',
        },
      ],
    },
    footer: {
      tagline: 'Super Resolução de Imagens IA 100% Client-Side. Feito com Astro, React Islands, Tailwind CSS e UpscalerJS.',
      privacyNote: 'Privacidade em Primeiro Lugar: Sem servidores, sem rastreamento.',
      supportPrompt: 'Gostou desta ferramenta gratuita e sem anúncios?',
      supportButton: 'Pague-me um Café',
      copyright: 'Todos os direitos reservados.',
    },
  },
  de: {
    meta: {
      title: 'UpscaleImage | Kostenloser Lokaler KI-Bildverbesserer',
      description:
        'Ein 100% clientseitiger, serverloser KI-Bild-Upscaler mit UpscalerJS und TensorFlow.js. Verbessern und skalieren Sie JPEG-, PNG- und WebP-Bilder lokal im Browser.',
      keywords:
        'KI Bild Upscaler, Bildqualität verbessern kostenlos, lokaler AI Image Enhancer, UpscalerJS, TensorFlow.js Super Resolution, Fotos hochskalieren Browser',
    },
    nav: {
      brandSubtitle: 'Lokale KI-Super-Resolution',
      languageLabel: 'Sprache',
      toggleTheme: 'Hell-/Dunkelmodus umschalten',
      supportDeveloper: 'Entwickler unterstützen',
      supportShort: 'Unterstützen',
    },
    hero: {
      badge: '100% Client-Seitige KI • Keine Server-Uploads • WebGL-Beschleunigt',
      titleStart: 'Bilder hochskalieren & schärfen mit ',
      titleHighlight: 'Lokaler Browser-KI',
      subtitle:
        'Stellen Sie gestochen scharfe Details wieder her und erhöhen Sie die Bildauflösung bis zu 4x mit neuronalen Netzen direkt auf Ihrer Geräte-GPU. Ihre Fotos verlassen niemals Ihren Computer.',
      pillPrivacy: '100% Privat (Kein Cloud-Upload)',
      pillSpeed: 'WebGL GPU-Beschleunigt',
      pillFree: 'Ohne Wasserzeichen & Ohne Login',
    },
    upscaler: {
      dropzoneTitle: 'Bild hierher ziehen und ablegen',
      dropzoneSubtitle: 'oder klicken, um eine Datei von Ihrem Gerät auszuwählen',
      dropzoneBrowse: 'Bilddatei auswählen',
      dropzoneFormats: 'Unterstützt JPEG, PNG, WebP • 100% lokal im Arbeitsspeicher verarbeitet',
      trySampleLabel: 'Kein eigenes Bild zur Hand? Sofort mit einem Beispiel testen:',
      samplePortrait: 'Makro-Natur',
      sampleArchitecture: 'Cyberpunk-Stadt',
      sampleIllustration: 'Digitale Kunst',
      scaleLabel: 'Skalierungsfaktor',
      qualityLabel: 'Modell-Qualitätsstufe',
      qualityBalanced: '⚡ Schnell',
      qualityUltra: '💎 Ultra HD',
      firstTimeDownloadNotice: 'Ultra-HD-Gewichte (~30MB) werden geladen... Dauerhaft im Browser-Cache gespeichert!',
      ultraSelectedNotice: 'Ultra HD Modus aktiv • Lädt einmalig ~30MB KI-Gewichte beim ersten Erstellen.',
      cachedNotice: 'Ultra-HD-Modell aus dem Browser-Cache geladen',
      modeLabel: 'KI-Verbesserungsmodus',
      modeStandard: 'Neuronale Super-Resolution (Ausgewogen)',
      modeCrisp: 'Neuronale SR + Mikrokontrast-Schärfung',
      formatLabel: 'Exportformat',
      btnStartUpscale: 'Bild jetzt hochskalieren',
      btnRecalculate: 'Neu berechnen',
      btnNewImage: 'Neues Bild wählen',
      btnDownload: 'Verbessertes Bild herunterladen',
      statusModelLoading: 'Lade neuronales UpscalerJS-Modell in den Browser-Cache...',
      statusReadingFile: 'Dekodiere Bild-Tensor in den lokalen Speicher...',
      statusUpscaling: 'Führe lokale KI-Super-Resolution über TensorFlow.js aus...',
      statusPostProcessing: 'Rekonstruiere hochauflösendes Bild & verfeinere Kanten...',
      statusComplete: 'KI-Bildverbesserung abgeschlossen!',
      gpuActiveBadge: 'TensorFlow.js WebGL-Engine Aktiv',
      labelBefore: 'ORIGINAL',
      labelAfter: 'KI-SKALIERT',
      sliderHint: 'Bewegen Sie den Schieberegler nach links oder rechts für den Vorher/Nachher-Vergleich',
      originalSize: 'Originalauflösung',
      upscaledSize: 'Neue Auflösung',
      processingTime: 'Lokale Rechenzeit',
      privacyGuarantee: 'Null Bytes hochgeladen. 100% lokal auf Ihrer Hardware berechnet.',
      zoomIn: '2x Lupen-Zoom',
      zoomReset: 'Ansicht anpassen',
      errorInvalidType: 'Bitte laden Sie ein gültiges JPEG-, PNG- oder WebP-Bild hoch.',
      errorGeneral: 'Bei der Verarbeitung ist ein Fehler aufgetreten. Bitte versuchen Sie ein kleineres Bild.',
    },
    showcase: {
      badge: 'Interaktive visuelle Demonstration',
      sectionTitle: 'Erleben Sie den Unterschied der KI-Superauflösung',
      sectionSubtitle: 'Ziehen Sie den Schieberegler für Vorher-Nachher-Vergleiche bei Porträts, Architektur und Illustrationen.',
      dragHint: 'Schieberegler ziehen für Vorher & Nachher',
      labelOriginal: 'VORHER (Geringe Auflösung)',
      labelEnhanced: 'NACHHER (4x KI-Superauflösung)',
      btnTestSample: 'Dieses Beispiel im KI-Upscaler testen',
      portraitTab: 'Porträtdetails',
      portraitDesc: 'Stellt feine Hautporen, Wimpern und Haarsträhnen ohne Plastikeffekt präzise wieder her.',
      architectureTab: 'Architektur & Texturen',
      architectureDesc: 'Rekonstruiert komplexes Mauerwerk und scharfe Kanten aus pixeligen Fotos.',
      animeTab: 'Anime & Illustration',
      animeDesc: 'Schärft Linienzeichnungen und beseitigt Kompressionsartefakte mit makellosen Farbflächen.',
    },
    features: {
      sectionTitle: 'Warum lokales KI-Upscaling im Browser?',
      sectionSubtitle: 'Entwickelt für kompromisslosen Datenschutz, brillante Bildschärfe und sofortige Ergebnisse.',
      items: [
        {
          title: 'Absolute Privatsphäre ohne Server',
          description:
            'Im Gegensatz zu Cloud-Tools werden Ihre Bilder niemals hochgeladen. Jedes Pixel wird lokal in Ihrer geschützten Browser-Sandbox verarbeitet.',
        },
        {
          title: 'UpscalerJS & TensorFlow.js Engine',
          description:
            'Nutzt vortrainierte neuronale Super-Resolution-Modelle im Browser-Cache mit direkter WebGL-Hardwarebeschleunigung.',
        },
        {
          title: 'Interaktiver Vorher/Nachher-Vergleich',
          description:
            'Überprüfen Sie die Detailverbesserung live mit dem interaktiven Bildschieberegler und speichern Sie das Ergebnis verlustfrei ab.',
        },
      ],
    },
    faq: {
      sectionTitle: 'Häufig gestellte Fragen (FAQ)',
      items: [
        {
          q: 'Werden meine Bilder auf einen Server hochgeladen?',
          a: 'Nein, niemals. Die gesamte KI-Berechnung über TensorFlow.js findet zu 100 % lokal auf Ihrem eigenen Endgerät statt.',
        },
        {
          q: 'Welche Bildformate werden unterstützt?',
          a: 'Sie können JPEG (.jpg, .jpeg), PNG (.png inklusive transparenter Hintergründe) sowie WebP (.webp) direkt verarbeiten.',
        },
        {
          q: 'Warum wird das Bild in Kacheln mit Fortschrittsbalken berechnet?',
          a: 'Die intelligente Kachelverarbeitung schützt vor Grafikspeicher-Überlastung und sorgt für eine flüssige Live-Fortschrittsanzeige auf Desktop und Mobilgeräten.',
        },
      ],
    },
    footer: {
      tagline: '100% Client-Seitige KI-Bildverbesserung. Entwickelt mit Astro, React Islands, Tailwind CSS & UpscalerJS.',
      privacyNote: 'Datenschutz garantiert: Keine Server-Uploads, kein Tracking.',
      supportPrompt: 'Gefällt Ihnen dieses kostenlose, werbefreie KI-Tool?',
      supportButton: 'Spendiere mir einen Kaffee',
      copyright: 'Alle Rechte vorbehalten.',
    },
  },
  fr: {
    meta: {
      title: 'UpscaleImage | Amélioration d’Image IA Locale Gratuite',
      description:
        'Agrandisseur d’image IA 100% côté client et sans serveur propulsé par UpscalerJS et TensorFlow.js. Améliorez vos images JPEG, PNG et WebP localement avec une confidentialité totale.',
      keywords:
        'agrandir image IA, améliorer qualité photo gratuit, super résolution locale, UpscalerJS, TensorFlow.js, upscaler image sans serveur',
    },
    nav: {
      brandSubtitle: 'Super Résolution IA Locale',
      languageLabel: 'Langue',
      toggleTheme: 'Basculer le thème clair/sombre',
      supportDeveloper: 'Soutenir le Développeur',
      supportShort: 'Soutenir',
    },
    hero: {
      badge: 'IA 100% Côté Client • Aucun Envoi Serveur • Accélération WebGL',
      titleStart: 'Agrandissez et Subblimez vos Images avec ',
      titleHighlight: 'l’IA Locale du Navigateur',
      subtitle:
        'Restaurez des détails nets et multipliez la résolution jusqu’à 4x grâce aux réseaux neuronaux exécutés directement sur le GPU de votre appareil. Vos photos ne quittent jamais votre ordinateur.',
      pillPrivacy: '100% Privé (Zéro Serveur)',
      pillSpeed: 'Accéléré par GPU WebGL',
      pillFree: 'Sans Filigrane ni Inscription',
    },
    upscaler: {
      dropzoneTitle: 'Glissez et déposez votre image ici',
      dropzoneSubtitle: 'ou cliquez pour sélectionner un fichier depuis votre appareil',
      dropzoneBrowse: 'Sélectionner une Image',
      dropzoneFormats: 'Compatible JPEG, PNG, WebP • Traité à 100% dans la mémoire locale',
      trySampleLabel: 'Pas d’image sous la main ? Testez immédiatement avec un exemple :',
      samplePortrait: 'Macro Nature',
      sampleArchitecture: 'Ville Cyberpunk',
      sampleIllustration: 'Art Numérique',
      scaleLabel: 'Facteur d’Agrandissement',
      qualityLabel: 'Niveau de Qualité du Modèle',
      qualityBalanced: '⚡ Équilibré',
      qualityUltra: '💎 Ultra HD',
      firstTimeDownloadNotice: 'Téléchargement des poids Ultra HD (~30 Mo)... Mis en cache pour traitements futurs !',
      ultraSelectedNotice: 'Mode Ultra HD actif • Téléchargera ~30 Mo de poids lors de la première image.',
      cachedNotice: 'Modèle Ultra HD chargé depuis le cache du navigateur',
      modeLabel: 'Mode d’Amélioration IA',
      modeStandard: 'Super Résolution Neuronale (Équilibré)',
      modeCrisp: 'Super Résolution + Netteté Micro-Contraste',
      formatLabel: 'Format d’Exportation',
      btnStartUpscale: 'Agrandir l’Image Maintenant',
      btnRecalculate: 'Relancer le Traitement',
      btnNewImage: 'Charger une Autre Image',
      btnDownload: 'Télécharger l’Image Améliorée',
      statusModelLoading: 'Chargement du modèle neuronal UpscalerJS dans le cache du navigateur...',
      statusReadingFile: 'Décodage du tenseur d’image en mémoire locale...',
      statusUpscaling: 'Exécution de la Super Résolution IA locale via TensorFlow.js...',
      statusPostProcessing: 'Reconstruction haute définition et affinage des détails...',
      statusComplete: 'Amélioration IA Terminée !',
      gpuActiveBadge: 'Moteur TensorFlow.js WebGL Actif',
      labelBefore: 'ORIGINAL',
      labelAfter: 'IA AGRANDIE',
      sliderHint: 'Faites glisser le curseur à gauche ou à droite pour comparer avant/après',
      originalSize: 'Résolution Originale',
      upscaledSize: 'Résolution Améliorée',
      processingTime: 'Temps d’Inférence Local',
      privacyGuarantee: 'Zéro octet envoyé en ligne. Traité à 100% localement sur votre appareil.',
      zoomIn: 'Zoom Loupe 2x',
      zoomReset: 'Ajuster la Vue',
      errorInvalidType: 'Veuillez importer une image valide au format JPEG, PNG ou WebP.',
      errorGeneral: 'Une erreur est survenue lors du traitement IA. Essayez une image plus légère.',
    },
    showcase: {
      badge: 'Démonstration Visuelle Interactive',
      sectionTitle: 'Découvrez la Puissance de la Super-Résolution IA',
      sectionSubtitle: 'Faites glisser le curseur pour comparer avant et après sur des portraits, de l’architecture et des illustrations.',
      dragHint: 'Glissez pour comparer Avant et Après',
      labelOriginal: 'AVANT (Basse Résolution)',
      labelEnhanced: 'APRÈS (4x Super-Résolution IA)',
      btnTestSample: 'Tester cet exemple dans l’Upscaler IA',
      portraitTab: 'Détails de Portrait',
      portraitDesc: 'Restaure la texture des pores, les cils et les cheveux naturels sans efeito lissé artificiel.',
      architectureTab: 'Architecture & Textures',
      architectureDesc: 'Reconstruit la maçonnerie et les arêtes nettes à partir de photos pixélisées.',
      animeTab: 'Anime & Illustration',
      animeDesc: 'Précise les contours de dessin et élimine les bruits de compression JPEG.',
    },
    features: {
      sectionTitle: 'Pourquoi Choisir la Super Résolution IA Locale ?',
      sectionSubtitle: 'Conçu pour une confidentialité absolue, une netteté remarquable et zéro latence serveur.',
      items: [
        {
          title: 'Confidentialité Absolue Sans Serveur',
          description:
            'Contrairement aux services cloud qui téléversent vos photos privées, UpscaleImage traite chaque pixel à l’intérieur de votre navigateur.',
        },
        {
          title: 'Moteur UpscalerJS & TensorFlow.js',
          description:
            'Propulsé par des réseaux de neurones pré-entraînés mis en cache dans votre navigateur et accélérés par WebGL sur votre carte graphique.',
        },
        {
          title: 'Curseur Comparatif Avant / Après',
          description:
            'Inspectez la restauration des pixels en temps réel grâce à notre comparateur interactif fluide et téléchargez sans perte.',
        },
      ],
    },
    faq: {
      sectionTitle: 'Questions Fréquentes',
      items: [
        {
          q: 'Mes images sont-elles envoyées sur un serveur distant ?',
          a: 'Jamais. La lecture du fichier, l’inférence TensorFlow.js et la génération de l’image finale s’effectuent à 100 % sur votre propre machine.',
        },
        {
          q: 'Quels sont les formats d’image pris en charge ?',
          a: 'Vous pouvez glisser-déposer des fichiers JPEG (.jpg, .jpeg), PNG (.png avec transparence préservée) et WebP (.webp).',
        },
        {
          q: 'Pourquoi le traitement s’effectue-t-il par blocs avec une barre de progression ?',
          a: 'Le découpage en tuiles évite la saturation de la mémoire vidéo (VRAM) du navigateur et offre un suivi fluide en temps réel sur mobile comme sur ordinateur.',
        },
      ],
    },
    footer: {
      tagline: 'Super Résolution d’Image IA 100% Côté Client. Créé avec Astro, React Islands, Tailwind CSS & UpscalerJS.',
      privacyNote: 'Priorité à la Vie Privée : Zéro serveur, zéro pistage.',
      supportPrompt: 'Vous appréciez cet outil gratuit et sans publicité ?',
      supportButton: 'Offrez-moi un Café',
      copyright: 'Tous droits réservés.',
    },
  },
  ja: {
    meta: {
      title: 'UpscaleImage | 無料のローカルAI画像高画質化・拡大ツール',
      description:
        'UpscalerJSとTensorFlow.jsを搭載した100%クライアントサイド・サーバー不要のAI画像アップスケーラー。ブラウザ上でJPEG・PNG・WebP画像を完全なプライバシーで高画質化します。',
      keywords:
        'AI 画像高画質化, 画像拡大 無料, ローカルAI アップスケーラー, UpscalerJS, TensorFlow.js 超解像, ブラウザ 画像綺麗にする',
    },
    nav: {
      brandSubtitle: 'ローカルAI超解像エンジン',
      languageLabel: '言語',
      toggleTheme: 'ライト/ダークモード切替',
      supportDeveloper: '開発者を支援する',
      supportShort: '支援する',
    },
    hero: {
      badge: '100%ブラウザ内AI処理 • サーバー送信ゼロ • WebGL GPU高速化',
      titleStart: 'デバイス内蔵の',
      titleHighlight: 'ローカルAIで画像を高画質拡大',
      subtitle:
        'お使いのデバイスのGPU上で直接動作するニューラルネットワークにより、ディテールを鮮明に復元し解像度を最大4倍に向上。大切な写真が外部サーバーに送信されることは一切ありません。',
      pillPrivacy: '100%プライベート（外部送信なし）',
      pillSpeed: 'WebGL GPUハードウェア高速処理',
      pillFree: '透かしなし・登録不要・完全無料',
    },
    upscaler: {
      dropzoneTitle: 'ここに画像をドラッグ＆ドロップ',
      dropzoneSubtitle: 'またはクリックしてデバイスから画像ファイルを選択',
      dropzoneBrowse: '画像ファイルを選択',
      dropzoneFormats: 'JPEG, PNG, WebP 対応 • 100%ブラウザメモリ内で安全に処理',
      trySampleLabel: '手元に画像がありませんか？サンプル画像で今すぐ体験：',
      samplePortrait: 'マクロ自然風景',
      sampleArchitecture: 'サイバーパンク都市',
      sampleIllustration: 'デジタルイラスト',
      scaleLabel: '拡大倍率',
      qualityLabel: 'AIモデル品質モード',
      qualityBalanced: '⚡ 高速バランス',
      qualityUltra: '💎 Ultra HD',
      firstTimeDownloadNotice: 'Ultra HD AI重みデータ（約30MB）をダウンロード中... キャッシュに保存されます！',
      ultraSelectedNotice: 'Ultra HDモード有効 • 初回画像処理時に約30MBのAI重みをダウンロードします。',
      cachedNotice: 'ブラウザキャッシュからUltra HDモデルを高速展開完了',
      modeLabel: 'AI高画質化モード',
      modeStandard: 'AI超解像（バランス重視）',
      modeCrisp: 'AI超解像＋ディテール輪郭強調',
      formatLabel: '保存フォーマット',
      btnStartUpscale: 'AI高画質化を開始',
      btnRecalculate: '設定を変更して再処理',
      btnNewImage: '別の画像をアップロード',
      btnDownload: '高画質化した画像を保存',
      statusModelLoading: 'UpscalerJS ニューラルモデルをブラウザキャッシュに読み込み中...',
      statusReadingFile: 'ローカルメモリへ画像テンソルをデコード中...',
      statusUpscaling: 'TensorFlow.js によるローカルAI超解像処理を実行中...',
      statusPostProcessing: '高精細キャンバスの再構築とディテール補正を実行中...',
      statusComplete: 'AI高画質化が完了しました！',
      gpuActiveBadge: 'TensorFlow.js WebGL エンジン稼働中',
      labelBefore: '元画像 (BEFORE)',
      labelAfter: 'AI高画質化 (AFTER)',
      sliderHint: 'スライダーを左右に動かしてピクセルの復元効果を比較できます',
      originalSize: '元の解像度',
      upscaledSize: '拡大後の解像度',
      processingTime: 'ローカル処理時間',
      privacyGuarantee: '通信アップロード0バイト。すべてお使いの端末内で処理されました。',
      zoomIn: '2倍ルーペ拡大',
      zoomReset: '全体表示',
      errorInvalidType: '有効な JPEG、PNG、または WebP 画像を選択してください。',
      errorGeneral: 'AI処理中にエラーが発生しました。より小さい画像でお試しください。',
    },
    showcase: {
      badge: 'インタラクティブ実例デモ',
      sectionTitle: 'AI超解像の劇的な画質向上を体験',
      sectionSubtitle: 'スライダーを動かして、ポートレート・建築・アニメイラストの画質向上前後の変化を確認できます。',
      dragHint: 'スライダーを左右にドラッグして比較',
      labelOriginal: '処理前（低解像度・ノイズあり）',
      labelEnhanced: '処理後（4倍 AI超解像）',
      btnTestSample: 'この画像をAI拡大ツールで試す',
      portraitTab: '人物ポートレート',
      portraitDesc: '肌の質感や毛穴、まつ毛の1本1本まで不自然な塗りつぶし感なく自然に復元します。',
      architectureTab: '建築・風景テクスチャ',
      architectureDesc: 'ブロック状に潰れた建物の石壁や窓枠のエッジをくっきりと鮮明に再構築します。',
      animeTab: 'アニメ・イラスト',
      animeDesc: '繊細な主線をシャープに整え、JPEG圧縮ブロックノイズをきれいに除去します。',
    },
    features: {
      sectionTitle: 'ローカルブラウザAI超解像が選ばれる理由',
      sectionSubtitle: '徹底したプライバシー保護、鮮明な超解像アルゴリズム、クラウド待ち時間ゼロを実現。',
      items: [
        {
          title: 'サーバー送信ゼロの完全プライバシー',
          description:
            '一般的なクラウド型ツールとは異なり、画像は一切外部サーバーへ送信されません。すべてのピクセル処理はお使いのブラウザ内で完結します。',
        },
        {
          title: 'UpscalerJS & TensorFlow.js 搭載',
          description:
            '事前学習済みの超解像ニューラルネットワークをブラウザにキャッシュし、WebGLを通じてデバイスのGPUで高速に推論を実行します。',
        },
        {
          title: 'リアルタイム比較スライダー',
          description:
            '処理前後のディテール改善をインタラクティブな分割スライダーで即座に比較し、劣化のない高解像度ファイルとして保存できます。',
        },
      ],
    },
    faq: {
      sectionTitle: 'よくある質問（FAQ）',
      items: [
        {
          q: 'アップロードした画像が外部サーバーに保存されることはありますか？',
          a: '一切ありません。ファイルの読み込みからTensorFlow.jsによるAI超解像推論、画像の書き出しまで100%お使いのブラウザ内だけで行われます。',
        },
        {
          q: '対応している画像形式は何ですか？',
          a: 'JPEG（.jpg, .jpeg）、透過PNG（.png）、およびWebP（.webp）形式に対応しています。',
        },
        {
          q: 'なぜタイル分割で進捗バーを表示しながら処理するのですか？',
          a: '画像をインテリジェントな小領域（パッチ）に分割して推論することで、ブラウザのGPUメモリ不足を防ぎ、スマートフォンからPCまで安定したリアルタイム進捗表示を可能にしています。',
        },
      ],
    },
    footer: {
      tagline: '100%クライアントサイドAI画像超解像ツール。Astro、React Islands、Tailwind CSS、UpscalerJSで構築。',
      privacyNote: 'プライバシー最優先：サーバー送信なし・トラッキングなし。',
      supportPrompt: '広告なし・完全無料のローカルAIツールを気に入っていただけましたか？',
      supportButton: '開発者にコーヒーを贈る',
      copyright: 'All rights reserved.',
    },
  },
};

export function getTranslation(locale: string | undefined): TranslationDictionary {
  if (locale && locale in translations) {
    return translations[locale as Locale];
  }
  return translations.en;
}

export function getLocalizedPath(locale: Locale): string {
  return locale === 'en' ? '/' : `/${locale}/`;
}
