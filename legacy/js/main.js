(() => {
  "use strict";

  const TOTAL_FRAMES = 197;
  const PRIORITY_FRAMES = 22;
  const images = Array(TOTAL_FRAMES).fill(null);
  const requested = new Set();

  const hero = document.querySelector(".scroll-hero");
  const canvas = document.querySelector("#heroCanvas");
  const process = document.querySelector(".process-section");
  const processTrack = document.querySelector(".process-line");
  const header = document.querySelector(".site-header");
  const loader = document.querySelector(".site-loader");
  const loaderBar = document.querySelector(".loader-track span");
  const loaderText = document.querySelector(".site-loader p");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-header nav");
  const quoteForm = document.querySelector(".quote-form");

  document.querySelectorAll("[data-unit-count]").forEach((container) => {
    const count = Number(container.getAttribute("data-unit-count")) || 0;
    for (let index = 0; index < count; index += 1) {
      const unit = document.createElement(container.classList.contains("rack-grid") ? "span" : "i");
      if (container.classList.contains("rack-grid") && (index % 7 === 0 || index % 11 === 0)) {
        unit.className = "is-orange";
      }
      container.appendChild(unit);
    }
  });

  document.querySelectorAll(".hero-copy h1, .hero-copy h2").forEach((heading) => {
    heading.classList.add("hero-word-title");
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => {
      if (!node.textContent?.trim()) return;
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) return;
        const word = document.createElement("span");
        word.className = "hero-word";
        word.textContent = part;
        fragment.appendChild(word);
      });
      node.replaceWith(fragment);
    });
  });

  if (!hero || !canvas) return;

  const context = canvas.getContext("2d", { alpha: false });
  if (!context) return;
  let priorityLoaded = 0;
  let currentFrame = 0;
  let currentStage = -1;
  let currentProcessStage = -1;
  let animationFrame = null;

  document.body.classList.add("is-loading");

  const framePath = (index) =>
    `hero-frames/frame-${String(index + 1).padStart(3, "0")}.webp`;

  const drawCover = (image) => {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
    const width = Math.round(window.innerWidth * ratio);
    const height = Math.round(window.innerHeight * ratio);

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const imageRatio = image.naturalWidth / image.naturalHeight;
    const canvasRatio = width / height;
    let sourceWidth = image.naturalWidth;
    let sourceHeight = image.naturalHeight;
    let sourceX = 0;
    let sourceY = 0;

    if (imageRatio > canvasRatio) {
      sourceWidth = image.naturalHeight * canvasRatio;
      sourceX = (image.naturalWidth - sourceWidth) / 2;
    } else {
      sourceHeight = image.naturalWidth / canvasRatio;
      sourceY = (image.naturalHeight - sourceHeight) / 2;
    }

    context.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      width,
      height
    );
  };

  const nearestLoaded = (target) => {
    if (images[target]) return images[target];

    for (let offset = 1; offset < TOTAL_FRAMES; offset += 1) {
      const before = target - offset;
      const after = target + offset;
      if (before >= 0 && images[before]) return images[before];
      if (after < TOTAL_FRAMES && images[after]) return images[after];
    }

    return null;
  };

  const renderFrame = (index) => {
    const image = nearestLoaded(index);
    if (image) drawCover(image);
  };

  const finishLoader = () => {
    window.setTimeout(() => {
      loader?.classList.add("site-loader--hidden");
      loader?.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-loading");
    }, 380);
  };

  const requestFrame = (index, priority = false) => {
    if (index < 0 || index >= TOTAL_FRAMES || requested.has(index)) return;

    requested.add(index);
    const image = new Image();
    image.decoding = "async";
    image.src = framePath(index);

    image.addEventListener("load", () => {
      images[index] = image;

      if (priority) {
        priorityLoaded += 1;
        const progress = Math.round((priorityLoaded / PRIORITY_FRAMES) * 100);
        if (loaderBar) loaderBar.style.width = `${progress}%`;
        if (loaderText) loaderText.textContent = `Preparando tu experiencia · ${progress}%`;

        if (priorityLoaded === PRIORITY_FRAMES) {
          renderFrame(currentFrame);
          finishLoader();
        }
      }

      if (Math.abs(index - currentFrame) <= 2) renderFrame(currentFrame);
    });
  };

  for (let index = 0; index < PRIORITY_FRAMES; index += 1) {
    requestFrame(index, true);
  }

  window.setTimeout(() => {
    let index = PRIORITY_FRAMES;

    const loadBatch = () => {
      const end = Math.min(index + 14, TOTAL_FRAMES);
      for (; index < end; index += 1) requestFrame(index);
      if (index < TOTAL_FRAMES) window.setTimeout(loadBatch, 70);
    };

    loadBatch();
  }, 500);

  const setStage = (stage) => {
    if (stage === currentStage) return;
    currentStage = stage;

    document.querySelectorAll(".hero-copy").forEach((item, index) => {
      item.classList.toggle("is-active", index === stage);
    });

    document.querySelectorAll(".hero-timeline span").forEach((item, index) => {
      item.classList.toggle("is-active", index === stage);
    });
  };

  const revealHeroWords = (progress) => {
    const starts = [0, 0.31, 0.63];
    const ends = [0.23, 0.54, 0.84];
    document.querySelectorAll(".hero-copy").forEach((copy, copyIndex) => {
      const localProgress = Math.min(
        Math.max((progress - starts[copyIndex]) / (ends[copyIndex] - starts[copyIndex]), 0),
        1
      );
      const words = copy.querySelectorAll(".hero-word");
      const visibleWords = Math.ceil(localProgress * words.length);
      words.forEach((word, wordIndex) => {
        word.classList.toggle("is-visible", wordIndex < visibleWords);
      });
      copy.classList.toggle("is-started", localProgress > 0.015);
      copy.classList.toggle("is-written", localProgress > 0.66);
    });
  };

  const setProcessStage = (stage) => {
    if (stage === currentProcessStage) return;
    currentProcessStage = stage;
    document.querySelectorAll(".process-line article").forEach((item, index) => {
      item.classList.toggle("is-active", index === stage);
    });
  };

  const updateHero = () => {
    animationFrame = null;
    const rect = hero.getBoundingClientRect();
    const scrollable = Math.max(hero.offsetHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
    const closeProgress = Math.min(Math.max((progress - 0.9) / 0.1, 0), 1);

    currentFrame = Math.min(
      Math.round(progress * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1
    );

    hero.style.setProperty("--close-progress", String(closeProgress));
    requestFrame(currentFrame);

    for (let offset = 1; offset <= 5; offset += 1) {
      requestFrame(currentFrame + offset);
      requestFrame(currentFrame - offset);
    }

    renderFrame(currentFrame);
    setStage(progress < 0.31 ? 0 : progress < 0.63 ? 1 : 2);
    revealHeroWords(progress);

    if (process) {
      const processRect = process.getBoundingClientRect();
      const processScrollable = Math.max(process.offsetHeight - window.innerHeight, 1);
      const processProgress = Math.min(Math.max(-processRect.top / processScrollable, 0), 1);
      process.style.setProperty("--process-progress", String(processProgress));
      if (processTrack) {
        const maxShift = Math.max(processTrack.scrollWidth - window.innerWidth + 48, 0);
        processTrack.style.transform = `translate3d(${-processProgress * maxShift}px, 0, 0)`;
      }
      setProcessStage(Math.min(Math.floor(processProgress * 4), 3));
    }
  };

  let lastScrollY = window.scrollY;
  const requestHeroUpdate = () => {
    const nextScrollY = window.scrollY;
    const scrollingDown = nextScrollY > lastScrollY + 4;
    const scrollingUp = nextScrollY < lastScrollY - 4;
    if (nextScrollY > 110 && scrollingDown) header?.classList.add("is-hidden");
    if (nextScrollY < 72 || scrollingUp) header?.classList.remove("is-hidden");
    lastScrollY = nextScrollY;
    if (animationFrame === null) {
      animationFrame = window.requestAnimationFrame(updateHero);
    }
  };

  window.addEventListener("scroll", requestHeroUpdate, { passive: true });
  window.addEventListener("resize", () => {
    renderFrame(currentFrame);
    updateHero();
  }, { passive: true });
  updateHero();

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("is-open");
    navigation?.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle?.classList.remove("is-open");
      navigation.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  quoteForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(quoteForm);
    const body = [
      `Empresa: ${data.get("empresa") || ""}`,
      `Contacto: ${data.get("nombre") || ""}`,
      `Teléfono: ${data.get("telefono") || ""}`,
      `Correo: ${data.get("correo") || ""}`,
      `Servicio: ${data.get("servicio") || ""}`,
      `Volumen aproximado: ${data.get("volumen") || ""}`,
    ].join("\n");

    window.location.href =
      `mailto:ventas@prime-express.pe?subject=${encodeURIComponent("Solicitud de propuesta logística")}` +
      `&body=${encodeURIComponent(body)}`;
  });
})();
