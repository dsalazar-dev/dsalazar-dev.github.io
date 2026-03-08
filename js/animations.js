/* ============================================================
   ANIMATIONS — Canvas particle network + scroll reveals
   ============================================================ */

/* ── Canvas Neural Network Background ── */
(function initCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const ctx = canvas.getContext('2d');

  const CONFIG = {
    nodeCount:       52,
    connectionDist:  140,
    nodeSpeed:       0.25,
    nodeRadius:      1.5,
    lineOpacityMax:  0.18,
    colors: {
      node:       'rgba(99, 102, 241, ',
      line:       'rgba(99, 102, 241, ',
      nodeCyan:   'rgba(34, 211, 238, ',
    },
  };

  let nodes = [];
  let raf;
  let W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createNode() {
    const isCyan = Math.random() < 0.15;
    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      vx:   (Math.random() - 0.5) * CONFIG.nodeSpeed,
      vy:   (Math.random() - 0.5) * CONFIG.nodeSpeed,
      r:    Math.random() * 1.5 + 0.8,
      cyan: isCyan,
      opacity: Math.random() * 0.5 + 0.3,
    };
  }

  function init() {
    resize();
    nodes = [];
    for (let i = 0; i < CONFIG.nodeCount; i++) {
      nodes.push(createNode());
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Update positions
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    }

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.connectionDist) {
          const opacity = (1 - dist / CONFIG.connectionDist) * CONFIG.lineOpacityMax;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = CONFIG.colors.line + opacity + ')';
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      const color = n.cyan ? CONFIG.colors.nodeCyan : CONFIG.colors.node;
      ctx.fillStyle = color + n.opacity + ')';
      ctx.fill();
    }

    raf = requestAnimationFrame(draw);
  }

  // Throttled resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(raf);
      init();
      draw();
    }, 200);
  });

  init();
  draw();

  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      draw();
    }
  });
})();

/* ── Scroll Reveal — Intersection Observer ── */
(function initReveal() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    // Make all reveal elements visible immediately
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* ── Typing effect for hero eyebrow (optional subtle touch) ── */
(function initTyping() {
  const el = document.querySelector('.hero-eyebrow-text');
  if (!el) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const text = el.textContent.trim();
  el.textContent = '';
  el.style.opacity = '1';

  let i = 0;
  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 55);
    }
  }

  setTimeout(type, 600);
})();
