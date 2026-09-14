// ============================================================
// KARAN — Developer Portfolio (TypeScript Source)
// Fully typed interfaces, responsive interactions & animation engines
// ============================================================

interface TechChip {
  name: string;
  icon?: string;
  invert?: boolean;
  textOnly?: boolean;
}

interface FeatureItem {
  title: string;
  desc: string;
}

interface ProjectData {
  title: string;
  domain: string;
  image: string;
  status: string;
  statusClass: string;
  github: string;
  link: string;
  summary: string;
  sections: string[];
  frontend: TechChip[];
  backend: TechChip[];
  features: FeatureItem[];
}

interface ShapeItem {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  type: string;
  angle: number;
  spinSpeed: number;
  vx: number;
  vy: number;
  hover: number;
  pulsePhase: number;
}

interface MouseState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  active: boolean;
}

interface RippleItem {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

interface BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  decay: number;
  type: string;
}

interface Vector3D {
  x: number;
  y: number;
  z: number;
}

(function () {
  'use strict';

  // ============================================================
  // 1. THEME TOGGLER (DARK / LIGHT)
  // ============================================================
  const themeToggle = document.getElementById('themeToggle');
  const detailThemeToggle = document.getElementById('detailThemeToggle');

  function getTheme(): string {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }

  function setTheme(theme: string): void {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }

  function toggleTheme(): void {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  if (detailThemeToggle) {
    detailThemeToggle.addEventListener('click', toggleTheme);
  }

  // ============================================================
  // 2. DYNAMIC ROLE ROTATOR
  // ============================================================
  const roleEl = document.getElementById('roleText');
  if (roleEl) {
    const roles: string[] = [
      'Frontend developer',
      'Learning fullstack'
    ];
    let roleIndex: number = 0;

    setInterval(() => {
      roleEl.style.opacity = '0';
      roleEl.style.filter = 'blur(4px)';

      setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        roleEl.textContent = roles[roleIndex];
        roleEl.style.opacity = '1';
        roleEl.style.filter = 'blur(0)';
      }, 300);
    }, 3200);
  }

  // ============================================================
  // 3. EXPERIENCES & EDUCATION ACCORDION
  // ============================================================
  const accordionCards = document.querySelectorAll('.exp-accordion-card');
  accordionCards.forEach((card) => {
    const headerBtn = card.querySelector('.exp-header-btn');
    if (!headerBtn) return;

    function toggleAccordion(): void {
      const isOpen = card.classList.toggle('is-open');
      headerBtn.setAttribute('aria-expanded', String(isOpen));
    }

    headerBtn.addEventListener('click', toggleAccordion);
    headerBtn.addEventListener('keydown', (e: Event) => {
      const ke = e as KeyboardEvent;
      if (ke.key === 'Enter' || ke.key === ' ') {
        ke.preventDefault();
        toggleAccordion();
      }
    });
  });

  // ============================================================
  // 4. COPY EMAIL & TOAST NOTIFICATION
  // ============================================================
  const copyBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toastNotice');

  function showToast(customMsg?: string): void {
    if (!toast) return;
    if (customMsg) toast.textContent = customMsg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = copyBtn.getAttribute('data-email') || 'karansingh2829kf@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('Opening Gmail & email copied! 🚀');
        }).catch(() => {
          showToast('Opening Gmail... 🚀');
        });
      } else {
        showToast('Opening Gmail & email copied! 🚀');
      }
    });
  }

  // ============================================================
  // 5. LIVE TICKING GMT CLOCK IN FOOTER
  // ============================================================
  const clockEl = document.getElementById('footerLiveClock');
  function updateLiveClock(): void {
    if (!clockEl) return;
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const offsetMin = -now.getTimezoneOffset();
    const offsetSign = offsetMin >= 0 ? '+' : '-';
    const absOffset = Math.abs(offsetMin);
    const offsetHours = Math.floor(absOffset / 60);
    const offsetMins = absOffset % 60;
    const gmtString = 'GMT' + offsetSign + offsetHours + (offsetMins > 0 ? ':' + String(offsetMins).padStart(2, '0') : '');

    clockEl.textContent = `${dayName}, ${monthName} ${date}, ${year} | ${hours}:${minutes}:${seconds} ${gmtString}`;
  }
  updateLiveClock();
  setInterval(updateLiveClock, 1000);

  // ============================================================
  // 6. VISITOR COUNTER (STARTS FROM 100)
  // ============================================================
  function formatOrdinal(n: number): string {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  function initVisitorCounter(): void {
    const counterEl = document.getElementById('visitorCount');
    if (!counterEl) return;
    const stored = localStorage.getItem('karan_visitor_counter');
    let visits = stored ? parseInt(stored, 10) : 100;
    if (isNaN(visits) || visits < 100) {
      visits = 100;
    } else {
      visits++;
    }
    localStorage.setItem('karan_visitor_counter', String(visits));
    counterEl.textContent = formatOrdinal(visits);
  }

  // ============================================================
  // 7. AUTO-SCROLL PROJECT PREVIEWS ON HOMEPAGE
  // ============================================================
  function initAutoScrollProjects(): void {
    function setupScroller(containerId: string, imgId: string, badgeId: string, progressId: string, sections: string[], delay: number): void {
      const box = document.getElementById(containerId);
      const img = document.getElementById(imgId) as HTMLImageElement;
      const badge = document.getElementById(badgeId);
      const progress = document.getElementById(progressId);
      if (!box || !img) return;

      let current = 0;
      let paused = false;

      box.addEventListener('mouseenter', () => { paused = true; });
      box.addEventListener('mouseleave', () => { paused = false; });
      box.addEventListener('touchstart', () => { paused = true; }, { passive: true });
      box.addEventListener('touchend', () => { paused = false; });

      setInterval(() => {
        if (paused) return;
        const maxScroll = Math.max(0, img.clientHeight - (box.clientHeight - 24));
        if (maxScroll <= 0) return;

        current = (current + 1) % sections.length;
        const targetY = Math.round((current / (sections.length - 1)) * maxScroll);
        img.style.transform = `translateY(-${targetY}px)`;

        if (badge && sections[current]) {
          badge.textContent = sections[current];
        }
        if (progress) {
          progress.style.width = Math.round((current / (sections.length - 1)) * 100) + '%';
        }
      }, delay);
    }

    setupScroller(
      'cosmoAutoScrollBox',
      'cosmoAutoScrollImg',
      'cosmoSectionBadge',
      'cosmoScrollProgress',
      [
        "Editorial Lookbook · Hero",
        "New Arrivals 12-Piece Grid",
        "Don't Shop Around Showcase",
        "Dresses & Tops Highlights",
        "Accessories & Denim Gallery",
        "VIP Newsletter & Footer"
      ],
      2400
    );

    setupScroller(
      'rideplusAutoScrollBox',
      'rideplusAutoScrollImg',
      'rideplusSectionBadge',
      'rideplusScrollProgress',
      [
        "Carpooling · Platform Hero",
        "Route Search & Live Booking",
        "Verified Driver Profiles",
        "Fair-Share Fare Splitting",
        "Safety Guidelines & Reviews",
        "RidePlus Community Footer"
      ],
      2200
    );
  }

  // ============================================================
  // 8. INTERACTIVE PROJECT DETAILS SYSTEM
  // ============================================================
  const projectsData: Record<string, ProjectData> = {
    rideplus: {
      title: "RIDEPLUS",
      domain: "rideplus.ravindertech.me",
      image: "RidePlus.png",
      status: "Completed",
      statusClass: "bg-blue-600 text-white",
      github: "https://github.com/weakcoder2829",
      link: "https://rideplus.ravindertech.me",
      summary: "Collaborative hackathon team project. An intelligent carpooling platform enabling commuters to publish or join rides, split travel expenses, connect with verified drivers, and reduce road congestion and carbon footprint through reliable route matching.",
      sections: [
        "Share Rides & Travel Smarter · Hero",
        "Route Search & Ride Booking Engine",
        "How It Works · 3 Simple Steps",
        "Driver & Commuter Safety Standards",
        "Verified Passenger Testimonials & Reviews",
        "About Us & Environmental Impact",
        "Join RidePlus Community & Download",
        "Platform Navigation & Corporate Footer"
      ],
      frontend: [
        { name: "Next.js 14", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Mapbox GL", textOnly: true },
        { name: "WebSockets", textOnly: true },
        { name: "Clerk Auth", textOnly: true },
        { name: "AWS S3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" }
      ],
      backend: [
        { name: "Next.js Server Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "Prisma ORM", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg", invert: true },
        { name: "Docker Compose", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Langchain", textOnly: true },
        { name: "Gemini AI", textOnly: true },
        { name: "Socket.io", textOnly: true },
        { name: "AWS EC2", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" }
      ],
      features: [
        {
          title: "Carpooling & Fare Splitting Platform",
          desc: "Allows drivers and commuters to publish or book intercity rides with automated fair-share fuel cost calculations, transparent seat availability, and flexible pickup points."
        },
        {
          title: "RAG-Powered Intelligent Chatbot",
          desc: "Built a Retrieval-Augmented Generation (RAG) assistant leveraging Langchain and Google Gemini AI to query structured ride schedules, FAQs, and routing details in natural language."
        },
        {
          title: "Real-Time WebSockets Driver-Rider Chat",
          desc: "Instant low-latency messaging layer allowing passengers and verified drivers to coordinate meeting points and receive live trip updates."
        },
        {
          title: "Mapbox GL Geospatial Route Discovery",
          desc: "Integrated Mapbox Directions API for live polyline navigation, interactive route distance calculation, and visual waypoints."
        },
        {
          title: "Containerized Cloud Deployment",
          desc: "Fully containerized architecture with Docker Compose, automated database migrations via Prisma, and deployed on AWS with high availability."
        }
      ]
    },
    cosmo: {
      title: "COSMO E-COMMERCE",
      domain: "cosmo-ecom.vercel.app",
      image: "cosmo-women.png",
      status: "Building",
      statusClass: "bg-amber-500 text-white font-semibold shadow-xs",
      github: "https://github.com/weakcoder2829",
      link: "https://cosmo-ecom.vercel.app",
      summary: "Modern high-end fashion e-commerce storefront featuring interactive editorial hero showcases with pricing hotspots, dynamic catalogs, cart & wishlist management, and responsive mega-menu navigation.",
      sections: [
        "Editorial Lookbook & Hotspot Pricing Pins",
        "New Arrivals 12-Piece Apparel Grid",
        "Don't Shop Around Visual Category Showcase",
        "Dresses & Tops Editorial Highlights",
        "Denim, Skirts & Leather Accessories",
        "Newsletter VIP Subscription Club",
        "Cosmo Store Directory & Payment Gateways"
      ],
      frontend: [
        { name: "JavaScript (ES6+)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "HTML5 Semantic UI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3 Grid & Variables", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Cart Engine", textOnly: true },
        { name: "Wishlist State", textOnly: true },
        { name: "Responsive Drawer", textOnly: true },
        { name: "Vercel Edge", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", invert: true }
      ],
      backend: [
        { name: "LocalStorage State Engine", textOnly: true },
        { name: "Static Edge CDN", textOnly: true },
        { name: "Vercel Edge Network", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", invert: true },
        { name: "SEO Optimization", textOnly: true },
        { name: "Schema.org Markup", textOnly: true },
        { name: "Performance Pipeline", textOnly: true }
      ],
      features: [
        {
          title: "Interactive Editorial Lookbook with Pricing Pins",
          desc: "Hero photo spread embedded with interactive visual hotspot markers (Rs. 1,499.00 and Rs. 2,299.00) that allow shoppers to inspect and buy featured outfits right from the editorial."
        },
        {
          title: "Curated 12-Piece New Arrivals Catalog Grid",
          desc: "High-density product showcase featuring dresses, knitwear, tailored trousers, bags, and outer garments with hover state transitions and quick-view actions."
        },
        {
          title: "Visual Department Lookbook ('Don't Shop Around')",
          desc: "Large-format editorial photography cards segmenting core collections: Dresses, Tops & Shirts, Jeans & Skirts, and Accessories."
        },
        {
          title: "Persistent Cart & Wishlist State Management",
          desc: "Client-side state architecture using LocalStorage to synchronize cart items, quantity counters, coupon discounts, and subtotal calculations across browser tabs."
        },
        {
          title: "Responsive Drawer Mega Navigation",
          desc: "Touch-optimized mobile drawer with multi-department classification (Ladies, Men, Kids, Home) and instant search integration."
        }
      ]
    }
  };

  let detailAutoScrollTimer: any = null;
  let detailCurrentStep = 0;
  let detailIsPaused = false;
  let detailManualPaused = false;
  let detailTotalSteps = 1;
  let detailSections: string[] = [];

  function stopDetailAutoScroll(): void {
    if (detailAutoScrollTimer) {
      clearInterval(detailAutoScrollTimer);
      detailAutoScrollTimer = null;
    }
    detailCurrentStep = 0;
    detailIsPaused = false;
    detailManualPaused = false;
  }

  function startDetailAutoScroll(sections: string[]): void {
    stopDetailAutoScroll();
    detailSections = sections || [];
    detailTotalSteps = detailSections.length || 1;

    const box = document.getElementById('detailAutoScrollBox');
    const img = document.getElementById('detailPreviewImg') as HTMLImageElement;
    const badge = document.getElementById('detailSectionBadge');
    const progress = document.getElementById('detailScrollProgress');
    const playIcon = document.getElementById('detailPlayIcon');
    const pauseIcon = document.getElementById('detailPauseIcon');

    if (!box || !img) return;

    function stepScroll(): void {
      if (detailIsPaused || detailManualPaused) return;

      const boxHeight = box.clientHeight - 32;
      const imgHeight = img.clientHeight;
      if (imgHeight <= boxHeight) return;

      const maxScroll = imgHeight - boxHeight;
      const fraction = detailCurrentStep / (detailTotalSteps - 1);
      const translateY = -Math.round(fraction * maxScroll);

      img.style.transform = `translateY(${translateY}px)`;

      if (badge && detailSections[detailCurrentStep]) {
        badge.textContent = detailSections[detailCurrentStep];
      }

      if (progress) {
        progress.style.width = Math.round(fraction * 100) + '%';
      }

      detailCurrentStep++;
      if (detailCurrentStep >= detailTotalSteps) {
        detailCurrentStep = 0;
      }
    }

    img.style.transform = 'translateY(0px)';
    if (progress) progress.style.width = '0%';
    if (badge && detailSections[0]) badge.textContent = detailSections[0];
    if (playIcon) playIcon.classList.add('hidden');
    if (pauseIcon) pauseIcon.classList.remove('hidden');

    if (img.complete && img.naturalHeight > 0) {
      setTimeout(stepScroll, 600);
    } else {
      img.onload = () => {
        setTimeout(stepScroll, 600);
      };
    }

    detailAutoScrollTimer = setInterval(stepScroll, 2200);
  }

  function renderTechChips(items: TechChip[]): string {
    if (!items || !items.length) return '';
    return items.map((item) => {
      let iconHtml = '';
      if (item.icon) {
        const styleAttr = item.invert ? 'style="filter:invert(1);"' : '';
        iconHtml = `<img class="w-3.5 h-3.5 object-contain select-none shrink-0" src="${item.icon}" alt="" ${styleAttr}>`;
      }
      return `<div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-xs font-medium text-zinc-800 dark:text-zinc-200 shadow-2xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors select-none">${iconHtml}<span>${item.name}</span></div>`;
    }).join('');
  }

  function renderFeaturesList(features: FeatureItem[]): string {
    if (!features || !features.length) return '';
    return features.map((feat) => {
      return `<li class="flex items-start gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span><div><strong class="font-semibold text-zinc-950 dark:text-white">${feat.title}</strong> — ${feat.desc}</div></li>`;
    }).join('');
  }

  function openProjectDetails(projectId: string, updateHash?: boolean): void {
    const data = projectsData[projectId];
    if (!data) return;

    const mainView = document.getElementById('mainPortfolioView');
    const detailsView = document.getElementById('projectDetailsView');
    if (!detailsView) return;

    const previewImg = document.getElementById('detailPreviewImg') as HTMLImageElement;
    if (previewImg) {
      previewImg.src = data.image;
      previewImg.alt = data.title + ' preview';
    }

    const domainBar = document.getElementById('detailDomainBar') as HTMLAnchorElement;
    const domainText = document.getElementById('detailDomainText');
    if (domainBar) domainBar.href = data.link || '#';
    if (domainText) domainText.textContent = data.domain || 'live-project.dev';

    const titleEl = document.getElementById('detailTitle');
    if (titleEl) titleEl.textContent = data.title;

    const summaryEl = document.getElementById('detailSummary');
    if (summaryEl) summaryEl.textContent = data.summary;

    const githubLink = document.getElementById('detailGithubLink') as HTMLAnchorElement;
    if (githubLink) githubLink.href = data.github || 'https://github.com';

    const liveLink = document.getElementById('detailLiveLink') as HTMLAnchorElement;
    if (liveLink) liveLink.href = data.link || '#';

    const statusBadge = document.getElementById('detailStatusBadge');
    if (statusBadge) {
      statusBadge.textContent = data.status || 'Completed';
      statusBadge.className = 'inline-flex items-center px-3 py-1.5 rounded-sm text-xs font-semibold select-none shadow-xs ' + (data.statusClass || 'bg-blue-600 text-white');
    }

    const frontendContainer = document.getElementById('detailFrontendChips');
    if (frontendContainer) frontendContainer.innerHTML = renderTechChips(data.frontend);

    const backendContainer = document.getElementById('detailBackendChips');
    if (backendContainer) backendContainer.innerHTML = renderTechChips(data.backend);

    const featuresList = document.getElementById('detailFeaturesList');
    if (featuresList) featuresList.innerHTML = renderFeaturesList(data.features);

    if (mainView) mainView.style.display = 'none';
    detailsView.classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    startDetailAutoScroll(data.sections);

    if (updateHash !== false) {
      history.pushState(null, '', '#project-' + projectId);
    }
  }

  function closeProjectDetails(updateHash?: boolean): void {
    stopDetailAutoScroll();

    const mainView = document.getElementById('mainPortfolioView');
    const detailsView = document.getElementById('projectDetailsView');
    if (!detailsView) return;

    detailsView.classList.add('hidden');
    if (mainView) mainView.style.display = '';

    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (updateHash !== false) {
      if (window.location.hash.indexOf('#project-') === 0) {
        history.pushState(null, '', '#projects');
      }
    }
  }

  function initProjectDetails(): void {
    const cosmoBox = document.getElementById('cosmoAutoScrollBox');
    if (cosmoBox) {
      cosmoBox.addEventListener('click', (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest('a')) return;
        openProjectDetails('cosmo');
      });
    }

    const rideplusBox = document.getElementById('rideplusAutoScrollBox');
    if (rideplusBox) {
      rideplusBox.addEventListener('click', (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest('a')) return;
        openProjectDetails('rideplus');
      });
    }

    const detailButtons = document.querySelectorAll('.open-project-details-btn');
    detailButtons.forEach((btn) => {
      btn.addEventListener('click', (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        const pid = btn.getAttribute('data-project');
        if (pid) openProjectDetails(pid);
      });
    });

    const backTopBtn = document.getElementById('backToProjectsHeaderBtn');
    if (backTopBtn) {
      backTopBtn.addEventListener('click', () => {
        closeProjectDetails();
      });
    }

    const backBottomBtn = document.getElementById('backToProjectsBottomBtn');
    if (backBottomBtn) {
      backBottomBtn.addEventListener('click', () => {
        closeProjectDetails();
      });
    }

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        const detailsView = document.getElementById('projectDetailsView');
        if (detailsView && !detailsView.classList.contains('hidden')) {
          closeProjectDetails();
        }
      }
    });

    const detailBox = document.getElementById('detailAutoScrollBox');
    if (detailBox) {
      detailBox.addEventListener('mouseenter', () => {
        detailIsPaused = true;
      });
      detailBox.addEventListener('mouseleave', () => {
        if (!detailManualPaused) {
          detailIsPaused = false;
        }
      });

      detailBox.addEventListener('wheel', (e: WheelEvent) => {
        e.preventDefault();
        detailIsPaused = true;
        const img = document.getElementById('detailPreviewImg') as HTMLImageElement;
        if (!img) return;
        let currentY = 0;
        const match = img.style.transform.match(/translateY\((-?\d+)px\)/);
        if (match && match[1]) {
          currentY = parseInt(match[1], 10);
        }
        const boxHeight = detailBox.clientHeight - 32;
        const maxScroll = img.clientHeight - boxHeight;
        if (maxScroll <= 0) return;
        const newY = Math.min(0, Math.max(-maxScroll, currentY - e.deltaY * 0.8));
        img.style.transform = `translateY(${Math.round(newY)}px)`;
        const fraction = Math.abs(newY) / maxScroll;
        const progress = document.getElementById('detailScrollProgress');
        if (progress) progress.style.width = Math.round(fraction * 100) + '%';
      }, { passive: false });
    }

    const scrollToggleBtn = document.getElementById('detailAutoScrollToggle');
    if (scrollToggleBtn) {
      scrollToggleBtn.addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation();
        detailManualPaused = !detailManualPaused;
        detailIsPaused = detailManualPaused;
        const playIcon = document.getElementById('detailPlayIcon');
        const pauseIcon = document.getElementById('detailPauseIcon');
        if (detailManualPaused) {
          if (playIcon) playIcon.classList.remove('hidden');
          if (pauseIcon) pauseIcon.classList.add('hidden');
        } else {
          if (playIcon) playIcon.classList.add('hidden');
          if (pauseIcon) pauseIcon.classList.remove('hidden');
        }
      });
    }

    const scrollToTopBtn = document.getElementById('detailScrollToTopBtn');
    if (scrollToTopBtn) {
      scrollToTopBtn.addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation();
        detailCurrentStep = 0;
        const img = document.getElementById('detailPreviewImg') as HTMLImageElement;
        const progress = document.getElementById('detailScrollProgress');
        const badge = document.getElementById('detailSectionBadge');
        if (img) img.style.transform = 'translateY(0px)';
        if (progress) progress.style.width = '0%';
        if (badge && detailSections[0]) badge.textContent = detailSections[0];
      });
    }

    function handleHash(): void {
      const hash = window.location.hash;
      if (hash === '#project-rideplus') {
        openProjectDetails('rideplus', false);
      } else if (hash === '#project-cosmo') {
        openProjectDetails('cosmo', false);
      } else {
        const detailsView = document.getElementById('projectDetailsView');
        if (detailsView && !detailsView.classList.contains('hidden')) {
          closeProjectDetails(false);
        }
      }
    }

    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    handleHash();
  }

  // ============================================================
  // 9. CAL.COM BOOKING MODAL (MINIMALIST CARD)
  // ============================================================
  function initCalBookingModal(): void {
    const modal = document.getElementById('calBookingModal');
    if (!modal) return;
    const closeBtn = document.getElementById('closeCalModalBtn');
    const triggers = document.querySelectorAll('.book-call-trigger, #bookCallBtn');

    function openModal(): void {
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal(): void {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    triggers.forEach((btn) => {
      btn.addEventListener('click', (e: Event) => {
        const me = e as MouseEvent;
        if (me.ctrlKey || me.metaKey || me.shiftKey || me.which === 2 || me.button === 1) return;
        e.preventDefault();
        openModal();
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e: Event) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if ((e.key === 'Escape' || e.key === 'Esc') && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  }

  // ============================================================
  // 10. INTERACTIVE BLUEPRINT GRID & REACTIVE SHAPES
  // ============================================================
  function initBlueprintGrid(): void {
    const canvas = document.getElementById('interactiveGridCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const mouse: MouseState = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 160,
      active: false
    };

    const ripples: RippleItem[] = [];
    const burstParticles: BurstParticle[] = [];
    let shapes: ShapeItem[] = [];
    const shapeTypes = ['diamond', 'crosshair', 'circle-target', 'isometric-cube', 'hexagon', 'bracket-node'];

    function resizeCanvas(): void {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initShapes();
    }

    function initShapes(): void {
      shapes = [];
      const cols = Math.max(3, Math.floor(width / 220));
      const rows = Math.max(3, Math.floor(height / 200));
      const count = Math.min(cols * rows, 20);

      const cellW = width / cols;
      const cellH = height / rows;

      let idx = 0;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          if (idx >= count) break;
          const posX = c * cellW + cellW * (0.25 + Math.random() * 0.5);
          const posY = r * cellH + cellH * (0.25 + Math.random() * 0.5);

          shapes.push({
            id: idx + 1,
            x: posX,
            y: posY,
            baseX: posX,
            baseY: posY,
            size: 14 + Math.random() * 12,
            type: shapeTypes[idx % shapeTypes.length],
            angle: Math.random() * Math.PI * 2,
            spinSpeed: (Math.random() - 0.5) * 0.012,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            hover: 0,
            pulsePhase: Math.random() * Math.PI * 2
          });
          idx++;
        }
      }
    }

    window.addEventListener('mousemove', (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    });

    window.addEventListener('touchmove', (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.active = false;
    });

    window.addEventListener('pointerdown', (e: PointerEvent) => {
      const px = e.clientX;
      const py = e.clientY;

      ripples.push({
        x: px,
        y: py,
        radius: 0,
        maxRadius: Math.min(width, height) * 0.45,
        alpha: 0.85,
        speed: 5.5
      });

      for (let i = 0; i < 8; i++) {
        const ang = (Math.PI * 2 / 8) * i + Math.random() * 0.4;
        const spd = 2 + Math.random() * 3.5;
        burstParticles.push({
          x: px,
          y: py,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          size: 3 + Math.random() * 4,
          life: 1,
          decay: 0.02 + Math.random() * 0.02,
          type: Math.random() > 0.5 ? 'diamond' : 'cross'
        });
      }
    });

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function drawShape(s: ShapeItem, isDark: boolean, time: number): void {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.angle);

      const scale = 1 + s.hover * 0.35 + Math.sin(time * 0.002 + s.pulsePhase) * 0.06;
      ctx.scale(scale, scale);

      const baseColor = isDark
        ? (s.hover > 0.1 ? `rgba(96, 165, 250, ${0.4 + s.hover * 0.6})` : 'rgba(147, 197, 253, 0.22)')
        : (s.hover > 0.1 ? `rgba(37, 99, 235, ${0.5 + s.hover * 0.5})` : 'rgba(59, 130, 246, 0.25)');

      const accentColor = isDark ? '#38bdf8' : '#2563eb';

      if (s.hover > 0.15) {
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = 10 * s.hover;
      }

      ctx.strokeStyle = baseColor;
      ctx.lineWidth = 1.25;

      const sz = s.size;

      switch (s.type) {
        case 'diamond':
          ctx.beginPath();
          ctx.moveTo(0, -sz);
          ctx.lineTo(sz, 0);
          ctx.lineTo(0, sz);
          ctx.lineTo(-sz, 0);
          ctx.closePath();
          ctx.stroke();

          if (s.hover > 0.2) {
            ctx.beginPath();
            ctx.moveTo(0, -sz * 0.5);
            ctx.lineTo(sz * 0.5, 0);
            ctx.lineTo(0, sz * 0.5);
            ctx.lineTo(-sz * 0.5, 0);
            ctx.closePath();
            ctx.stroke();
          }

          ctx.fillStyle = baseColor;
          ctx.beginPath();
          ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
          ctx.fill();
          break;

        case 'crosshair':
          ctx.beginPath();
          ctx.moveTo(-sz, 0);
          ctx.lineTo(sz, 0);
          ctx.moveTo(0, -sz);
          ctx.lineTo(0, sz);
          ctx.stroke();

          const brk = sz * 0.6;
          const gap = sz * 0.95;
          ctx.beginPath();
          ctx.moveTo(-gap, -gap + brk); ctx.lineTo(-gap, -gap); ctx.lineTo(-gap + brk, -gap);
          ctx.moveTo(gap - brk, -gap); ctx.lineTo(gap, -gap); ctx.lineTo(gap, -gap + brk);
          ctx.moveTo(-gap, gap - brk); ctx.lineTo(-gap, gap); ctx.lineTo(-gap + brk, gap);
          ctx.moveTo(gap - brk, gap); ctx.lineTo(gap, gap); ctx.lineTo(gap, gap - brk);
          ctx.stroke();
          break;

        case 'circle-target':
          ctx.beginPath();
          ctx.arc(0, 0, sz * 0.85, 0, Math.PI * 2);
          ctx.stroke();

          if (s.hover > 0.1) {
            ctx.beginPath();
            ctx.arc(0, 0, sz * 0.45, 0, Math.PI * 2);
            ctx.setLineDash([2, 3]);
            ctx.stroke();
            ctx.setLineDash([]);
          }

          ctx.beginPath();
          ctx.moveTo(0, -sz * 0.85); ctx.lineTo(0, -sz * 1.15);
          ctx.moveTo(sz * 0.85, 0); ctx.lineTo(sz * 1.15, 0);
          ctx.moveTo(0, sz * 0.85); ctx.lineTo(0, sz * 1.15);
          ctx.moveTo(-sz * 0.85, 0); ctx.lineTo(-sz * 1.15, 0);
          ctx.stroke();
          break;

        case 'isometric-cube':
          const h = sz * 0.9;
          const w = sz * 0.78;
          ctx.beginPath();
          ctx.moveTo(0, -h);
          ctx.lineTo(w, -h * 0.5);
          ctx.lineTo(w, h * 0.5);
          ctx.lineTo(0, h);
          ctx.lineTo(-w, h * 0.5);
          ctx.lineTo(-w, -h * 0.5);
          ctx.closePath();
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(0, 0); ctx.lineTo(0, -h);
          ctx.moveTo(0, 0); ctx.lineTo(w, h * 0.5);
          ctx.moveTo(0, 0); ctx.lineTo(-w, h * 0.5);
          ctx.stroke();
          break;

        case 'hexagon':
          ctx.beginPath();
          for (let a = 0; a < 6; a++) {
            const ang = (Math.PI / 3) * a;
            const hx = Math.cos(ang) * sz;
            const hy = Math.sin(ang) * sz;
            if (a === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();

          if (s.hover > 0.2) {
            ctx.beginPath();
            ctx.arc(0, 0, 2, 0, Math.PI * 2);
            ctx.fillStyle = accentColor;
            ctx.fill();
          }
          break;

        case 'bracket-node':
          const bw = sz * 1.1;
          const bh = sz * 0.75;
          ctx.strokeRect(-bw * 0.5, -bh * 0.5, bw, bh);

          if (s.hover > 0.25) {
            ctx.font = '8px "Fira Code", monospace';
            ctx.fillStyle = isDark ? '#93c5fd' : '#1d4ed8';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('0' + s.id, 0, 0);
          } else {
            ctx.beginPath();
            ctx.moveTo(-3, 0); ctx.lineTo(3, 0);
            ctx.moveTo(0, -3); ctx.lineTo(0, 3);
            ctx.stroke();
          }
          break;
      }

      ctx.restore();

      if (s.hover > 0.4) {
        ctx.save();
        ctx.font = '9px "Fira Code", monospace';
        ctx.fillStyle = isDark ? `rgba(147, 197, 253, ${s.hover})` : `rgba(30, 64, 175, ${s.hover})`;
        ctx.fillText(
          `[${Math.round(s.x)},${Math.round(s.y)}]`,
          s.x + s.size * 1.2,
          s.y - s.size * 0.8
        );
        ctx.restore();
      }
    }

    function renderLoop(now: number): void {
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains('dark');

      const gridSize = 48;
      const dotBaseColor = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)';
      const dotActiveColor = isDark ? 'rgba(96, 165, 250, 0.7)' : 'rgba(37, 99, 235, 0.6)';

      ctx.lineWidth = 1;

      for (let gx = 0; gx < width; gx += gridSize) {
        for (let gy = 0; gy < height; gy += gridSize) {
          const dx = gx - mouse.x;
          const dy = gy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let renderX = gx;
          let renderY = gy;
          let dotRadius = 1;

          if (mouse.active && dist < mouse.radius) {
            const factor = 1 - dist / mouse.radius;
            const angle = Math.atan2(dy, dx);
            const push = factor * 9;
            renderX += Math.cos(angle) * push;
            renderY += Math.sin(angle) * push;

            dotRadius = 1 + factor * 2;
            ctx.fillStyle = dotActiveColor;

            if (dist < 80) {
              ctx.strokeStyle = isDark ? 'rgba(147, 197, 253, 0.25)' : 'rgba(37, 99, 235, 0.2)';
              ctx.beginPath();
              ctx.moveTo(renderX - 4, renderY);
              ctx.lineTo(renderX + 4, renderY);
              ctx.moveTo(renderX, renderY - 4);
              ctx.lineTo(renderX, renderY + 4);
              ctx.stroke();
            }
          } else {
            ctx.fillStyle = dotBaseColor;
          }

          ctx.beginPath();
          ctx.arc(renderX, renderY, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let rIdx = ripples.length - 1; rIdx >= 0; rIdx--) {
        const rip = ripples[rIdx];
        rip.radius += rip.speed;
        rip.alpha -= 0.016;

        if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
          ripples.splice(rIdx, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = isDark
          ? `rgba(56, 189, 248, ${rip.alpha * 0.45})`
          : `rgba(37, 99, 235, ${rip.alpha * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      for (let pIdx = burstParticles.length - 1; pIdx >= 0; pIdx--) {
        const p = burstParticles[pIdx];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= p.decay;

        if (p.life <= 0) {
          burstParticles.splice(pIdx, 1);
          continue;
        }

        ctx.save();
        ctx.strokeStyle = isDark
          ? `rgba(96, 165, 250, ${p.life})`
          : `rgba(37, 99, 235, ${p.life})`;
        ctx.lineWidth = 1;

        if (p.type === 'diamond') {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - p.size);
          ctx.lineTo(p.x + p.size, p.y);
          ctx.lineTo(p.x, p.y + p.size);
          ctx.lineTo(p.x - p.size, p.y);
          ctx.closePath();
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.moveTo(p.x - p.size, p.y);
          ctx.lineTo(p.x + p.size, p.y);
          ctx.moveTo(p.x, p.y - p.size);
          ctx.lineTo(p.x, p.y + p.size);
          ctx.stroke();
        }
        ctx.restore();
      }

      shapes.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 30 || s.x > width - 30) s.vx *= -1;
        if (s.y < 30 || s.y > height - 30) s.vy *= -1;

        s.angle += s.spinSpeed * (1 + s.hover * 2.5);

        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (mouse.active && dist < mouse.radius * 1.25) {
          const targetHover = 1 - (dist / (mouse.radius * 1.25));
          s.hover += (targetHover - s.hover) * 0.18;

          const pullAngle = Math.atan2(-dy, -dx);
          s.x += Math.cos(pullAngle) * s.hover * 1.8;
          s.y += Math.sin(pullAngle) * s.hover * 1.8;

          ctx.save();
          ctx.strokeStyle = isDark
            ? `rgba(56, 189, 248, ${s.hover * 0.35})`
            : `rgba(37, 99, 235, ${s.hover * 0.3})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();
          ctx.restore();
        } else {
          s.hover += (0 - s.hover) * 0.08;
        }

        for (let i = 0; i < ripples.length; i++) {
          const rip = ripples[i];
          const rDist = Math.hypot(s.x - rip.x, s.y - rip.y);
          if (Math.abs(rDist - rip.radius) < 18) {
            s.spinSpeed = (Math.random() - 0.5) * 0.08;
            s.hover = Math.min(1, s.hover + 0.5);
          }
        }

        drawShape(s, isDark, now);
      });

      requestAnimationFrame(renderLoop);
    }

    requestAnimationFrame(renderLoop);
  }

  // ============================================================
  // 11. FALLING CHERRY BLOSSOM (SAKURA) PARTICLES
  // ============================================================
  function initCherryBlossoms(): void {
    const canvases = document.querySelectorAll('.cherry-blossom-canvas, #cherryBlossomCanvas');
    if (!canvases.length) return;

    function project3D(x: number, y: number, z: number, angleX: number, angleY: number, angleZ: number): Vector3D {
      const cosZ = Math.cos(angleZ), sinZ = Math.sin(angleZ);
      const x1 = x * cosZ - y * sinZ;
      const y1 = x * sinZ + y * cosZ;
      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const u = x1 * cosY + z * sinY;
      const d = -x1 * sinY + z * cosY;
      const cosX = Math.cos(angleX), sinX = Math.sin(angleX);
      return {
        x: u,
        y: y1 * cosX - d * sinX,
        z: y1 * sinX + d * cosX
      };
    }

    function createPetalSprite(styleIdx: number): HTMLImageElement | null {
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 128;
      pCanvas.height = 128;
      const pCtx = pCanvas.getContext('2d');
      if (!pCtx) return null;

      pCtx.scale(2, 2);

      pCtx.beginPath();
      pCtx.moveTo(32, 6);
      pCtx.bezierCurveTo(12, 16, 10, 44, 32, 58);
      pCtx.bezierCurveTo(54, 44, 52, 16, 32, 6);

      const grad = pCtx.createLinearGradient(32, 6, 32, 58);
      if (styleIdx === 0) {
        grad.addColorStop(0, '#ffe4e6');
        grad.addColorStop(0.4, '#fbcfe8');
        grad.addColorStop(1, '#f472b6');
      } else if (styleIdx === 1) {
        grad.addColorStop(0, '#fff1f2');
        grad.addColorStop(0.5, '#fda4af');
        grad.addColorStop(1, '#fb7185');
      } else {
        grad.addColorStop(0, '#fdf2f8');
        grad.addColorStop(0.5, '#f472b6');
        grad.addColorStop(1, '#db2777');
      }

      pCtx.fillStyle = grad;
      pCtx.fill();

      pCtx.strokeStyle = 'rgba(244, 114, 182, 0.45)';
      pCtx.lineWidth = 0.75;
      pCtx.stroke();

      pCtx.beginPath();
      pCtx.moveTo(32, 10);
      pCtx.quadraticCurveTo(31, 32, 32, 50);
      pCtx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
      pCtx.lineWidth = 0.75;
      pCtx.stroke();

      const img = new Image();
      img.src = pCanvas.toDataURL();
      return img;
    }

    const petalSprites = [createPetalSprite(0), createPetalSprite(1), createPetalSprite(2)].filter(Boolean) as HTMLImageElement[];
    if (!petalSprites.length) return;

    canvases.forEach((cvsEl) => {
      const cvs = cvsEl as HTMLCanvasElement;
      const ctx = cvs.getContext('2d');
      if (!ctx) return;

      let w = 0;
      let h = 0;
      const petals: any[] = [];
      const numPetals = 48;

      function resize(): void {
        const rect = cvs.parentElement ? cvs.parentElement.getBoundingClientRect() : cvs.getBoundingClientRect();
        w = cvs.width = Math.max(300, Math.floor(rect.width));
        h = cvs.height = Math.max(200, Math.floor(rect.height));
      }

      class Petal {
        size: number = 0;
        width: number = 0;
        height: number = 0;
        x: number = 0;
        y: number = 0;
        windFactor: number = 0;
        vx: number = 0;
        vy: number = 0;
        waveOffset: number = 0;
        waveSpeed: number = 0;
        angleX: number = 0;
        angleY: number = 0;
        angleZ: number = 0;
        spinX: number = 0;
        spinY: number = 0;
        spinZ: number = 0;
        opacity: number = 0;
        sprite: HTMLImageElement = petalSprites[0];

        constructor(initialScatter: boolean) {
          this.reset(initialScatter);
        }

        reset(initialScatter: boolean): void {
          this.size = 11 + Math.random() * 15;
          this.width = this.size;
          this.height = this.size * (1.1 + Math.random() * 0.35);

          this.x = Math.random() * (w + 80) - 40;
          this.y = initialScatter ? Math.random() * h : -this.height - Math.random() * 80;

          this.windFactor = 0.35 + Math.random() * 0.65;
          this.vx = (Math.random() - 0.5) * 0.5;
          this.vy = 0.75 + Math.random() * 1.35;

          this.waveOffset = Math.random() * Math.PI * 2;
          this.waveSpeed = 0.015 + Math.random() * 0.02;

          this.angleX = Math.random() * Math.PI * 2;
          this.angleY = Math.random() * Math.PI * 2;
          this.angleZ = Math.random() * Math.PI * 2;

          this.spinX = (Math.random() - 0.5) * 0.035;
          this.spinY = (Math.random() - 0.5) * 0.035;
          this.spinZ = (Math.random() - 0.5) * 0.025;

          this.opacity = 0.55 + Math.random() * 0.4;
          this.sprite = petalSprites[Math.floor(Math.random() * petalSprites.length)];
        }

        update(): void {
          this.waveOffset += this.waveSpeed;
          const windPush = Math.sin(this.waveOffset) * 1.1 + 0.5;
          this.vx += (windPush - this.vx) * 0.04;

          this.x += this.vx;
          this.y += this.vy;

          this.angleX += this.spinX;
          this.angleY += this.spinY;
          this.angleZ += this.spinZ;

          if (this.y > h + 30 || this.x > w + 60 || this.x < -60) {
            this.reset(false);
          }
        }

        draw(): void {
          const p1 = project3D(1, 0, 0, this.angleX, this.angleY, this.angleZ);
          const p2 = project3D(0, 1, 0, this.angleX, this.angleY, this.angleZ);

          ctx!.save();
          ctx!.translate(this.x, this.y);
          ctx!.transform(p1.x, p1.y, p2.x, p2.y, 0, 0);
          ctx!.globalAlpha = this.opacity;
          ctx!.drawImage(this.sprite, -this.width / 2, -this.height / 2, this.width, this.height);
          ctx!.restore();
        }
      }

      function init(): void {
        resize();
        petals.length = 0;
        for (let i = 0; i < numPetals; i++) {
          petals.push(new Petal(true));
        }
        loop();
      }

      function loop(): void {
        ctx!.clearRect(0, 0, w, h);
        for (let i = 0; i < petals.length; i++) {
          petals[i].update();
          petals[i].draw();
        }
        requestAnimationFrame(loop);
      }

      window.addEventListener('resize', resize);
      init();
    });
  }

  // ============================================================
  // INITIALIZE ON DOM READY
  // ============================================================
  function initAll(): void {
    initVisitorCounter();
    initAutoScrollProjects();
    initProjectDetails();
    initCalBookingModal();
    initBlueprintGrid();
    initCherryBlossoms();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
