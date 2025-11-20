// Client-side carousel + modal logic (cleaned)
// - Reads plans JSON from DOM (#plans-data)
// - Reads i18n strings from DOM (#plans-i18n)
// - Creates accessible dots with aria-current
// - Uses scrollIntoView for dot navigation
// - Pointer drag with pointer events and momentum
// - Keyboard navigation (Left/Right/Home/End)
// - Lazy-loads React modal components and provides focus-trap, Escape close, overlay click fallback
// - Locks body scroll while modal open

import React from 'react';
import { createRoot } from 'react-dom/client';

function getPlansDataFromDom() {
  const el = document.getElementById('plans-data');
  if (!el) {
    console.warn('plans-data element not found in DOM');
    return [];
  }
  try {
    return JSON.parse(el.textContent || el.innerText || '[]');
  } catch (err) {
    console.error('Failed to parse plans-data JSON:', err);
    return [];
  }
}

function getI18nFromDom() {
  const el = document.getElementById('plans-i18n');
  if (!el) return { carouselLabel: 'Plans carousel', goToSlide: 'Go to slide {{index}}', subscribeLabel: 'Subscribe' };
  try {
    return JSON.parse(el.textContent || el.innerText || '{}');
  } catch (err) {
    console.error('Failed to parse plans-i18n JSON:', err);
    return { carouselLabel: 'Plans carousel', goToSlide: 'Go to slide {{index}}', subscribeLabel: 'Subscribe' };
  }
}

const i18n = getI18nFromDom();

let subscriptionModalRoot = null;
let socialModalRoot = null;
let lastFocusedEl = null;
let selectedPlan = null;

function createModalWrapper(container, id) {
  const overlay = document.createElement('div');
  overlay.className = 'plans-modal-overlay';
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.zIndex = '9999';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.background = 'rgba(0,0,0,0.4)';
  overlay.tabIndex = -1;

  const modalDiv = document.createElement('div');
  modalDiv.id = id;
  modalDiv.setAttribute('role', 'dialog');
  modalDiv.setAttribute('aria-modal', 'true');
  overlay.appendChild(modalDiv);
  container.appendChild(overlay);
  return { overlay, modalDiv };
}

function setupFocusTrap(overlay, onClose) {
  const focusSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  const keyHandler = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === 'Tab') {
      const nodes = Array.from(overlay.querySelectorAll(focusSelector)).filter(n => n.offsetParent !== null);
      if (nodes.length === 0) {
        e.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    }
  };
  overlay.addEventListener('keydown', keyHandler);
  return keyHandler; // return handler so caller can remove it on close
}

async function renderSubscriptionModal(isOpen) {
  const container = document.getElementById('plans-modal-container');
  if (!container) return;

  if (subscriptionModalRoot) return; // already open

  const { overlay, modalDiv } = createModalWrapper(container, 'subscription-modal-root');
  document.body.style.overflow = 'hidden';

  // overlay click fallback closes modal when clicking outside modalDiv
  const overlayClick = (e) => {
    if (e.target === overlay) onClose();
  };

  const onClose = () => {
    try { subscriptionModalRoot && subscriptionModalRoot.unmount(); } catch (e) { console.warn(e); }
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    subscriptionModalRoot = null;
    document.body.style.overflow = '';
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') lastFocusedEl.focus();
  };

  try {
    const mod = await import('../components/SubscriptionModal.jsx');
    const SubscriptionModal = mod.default ?? mod.SubscriptionModal ?? ((props) => React.createElement('div', null, 'Missing component'));

    const lang = document.documentElement.lang || 'es';
    subscriptionModalRoot = createRoot(modalDiv);
    subscriptionModalRoot.render(React.createElement(SubscriptionModal, { isOpen, onClose, selectedPlan, lang }));

    const keyHandler = setupFocusTrap(overlay, onClose);
    overlay.addEventListener('click', overlayClick);

    setTimeout(() => {
      const first = overlay.querySelector('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
      if (first) first.focus();
    }, 50);
  } catch (err) {
    console.error('Error loading SubscriptionModal:', err);
    document.body.style.overflow = '';
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }
}

async function renderSocialModal(isOpen) {
  const container = document.getElementById('plans-modal-container');
  if (!container) return;

  if (socialModalRoot) return; // already open

  const { overlay, modalDiv } = createModalWrapper(container, 'social-modal-root');
  document.body.style.overflow = 'hidden';

  const overlayClick = (e) => {
    if (e.target === overlay) onClose();
  };

  const onClose = () => {
    try { socialModalRoot && socialModalRoot.unmount(); } catch (e) { console.warn(e); }
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    socialModalRoot = null;
    document.body.style.overflow = '';
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') lastFocusedEl.focus();
  };

  try {
    const mod = await import('../components/SocialImpactModal.jsx');
    const SocialImpactModal = mod.default ?? mod.SocialImpactModal ?? ((props) => React.createElement('div', null, 'Missing component'));

    const lang = document.documentElement.lang || 'es';
    socialModalRoot = createRoot(modalDiv);
    socialModalRoot.render(React.createElement(SocialImpactModal, { isOpen, onClose, lang }));

    const keyHandler = setupFocusTrap(overlay, onClose);
    overlay.addEventListener('click', overlayClick);

    setTimeout(() => {
      const first = overlay.querySelector('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
      if (first) first.focus();
    }, 50);
  } catch (err) {
    console.error('Error loading SocialImpactModal:', err);
    document.body.style.overflow = '';
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }
}

function initPlansCarousel() {
  const carousel = document.querySelector('[data-carousel="mobile"]');
  if (!carousel) return;

  const carouselContainer = carousel.closest('.carousel-container');
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const dotsContainer = carouselContainer?.querySelector('.carousel-dots');
  if (!dotsContainer || slides.length === 0) return;

  dotsContainer.innerHTML = '';
  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.type = 'button';
    dot.dataset.index = String(index);
    const goToSlideTemplate = i18n.goToSlide || 'Go to slide {{index}}';
    dot.setAttribute('aria-label', goToSlideTemplate.replace('{{index}}', String(index + 1)));
    if (slides[index].id) dot.setAttribute('aria-controls', slides[index].id);
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      slide.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
    dotsContainer.appendChild(dot);
  });

  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let lastX = 0;
  let startScrollLeft = 0;
  let velocityX = 0;
  let lastTime = 0;
  let rafId = null;
  const dragThreshold = 5;
  let hasMoved = false;

  const applyMomentum = () => {
    if (Math.abs(velocityX) > 0.5) {
      carousel.scrollLeft -= velocityX;
      velocityX *= 0.92; // Smoother friction like Embla
      rafId = requestAnimationFrame(applyMomentum);
    } else {
      velocityX = 0;
      rafId = null;
    }
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left click
    
    isDragging = true;
    hasMoved = false;
    carousel.style.cursor = 'grabbing';
    carousel.style.userSelect = 'none';
    carousel.style.scrollSnapType = 'none'; // Disable snap during drag
    
    startX = e.pageX;
    currentX = e.pageX;
    lastX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
    lastTime = performance.now();
    velocityX = 0;
    
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    currentX = e.pageX;
    const deltaX = currentX - startX;
    
    if (!hasMoved && Math.abs(deltaX) > dragThreshold) {
      hasMoved = true;
    }
    
    if (hasMoved) {
      const now = performance.now();
      const deltaTime = now - lastTime;
      const distance = currentX - lastX;
      
      const targetScroll = startScrollLeft - deltaX;
      carousel.scrollLeft = targetScroll;
      
      if (deltaTime > 0) {
        velocityX = (distance / deltaTime) * 16; // Normalize to ~60fps
      }
      
      lastX = currentX;
      lastTime = now;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    isDragging = false;
    carousel.style.cursor = 'grab';
    carousel.style.userSelect = '';
    
    setTimeout(() => {
      if (!isDragging) {
        carousel.style.scrollSnapType = 'x mandatory';
      }
    }, 50);
    
    if (hasMoved && Math.abs(velocityX) > 0.5) {
      applyMomentum();
    }
  };

  carousel.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  
  carousel.addEventListener('click', (e) => {
    if (hasMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  const updateActiveDot = () => {
    const carouselRect = carousel.getBoundingClientRect();
    const centerX = carouselRect.left + carouselRect.width / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    slides.forEach((slide, index) => {
      const slideRect = slide.getBoundingClientRect();
      const slideCenterX = slideRect.left + slideRect.width / 2;
      const distance = Math.abs(centerX - slideCenterX);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((d, i) => {
      const isCurrent = i === closestIndex;
      d.classList.toggle('active', isCurrent);
      if (isCurrent) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
    });
  };

  carousel.addEventListener('scroll', updateActiveDot, { passive: true });
  setTimeout(updateActiveDot, 100);

  if (carouselContainer) {
    carouselContainer.addEventListener('keydown', (e) => {
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      const activeIndex = Array.from(dots).findIndex(d => d.classList.contains('active'));
      if (e.key === 'ArrowLeft') {
        const prev = Math.max(0, activeIndex - 1);
        slides[prev].scrollIntoView({ behavior: 'smooth', inline: 'center' });
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        const next = Math.min(slides.length - 1, activeIndex + 1);
        slides[next].scrollIntoView({ behavior: 'smooth', inline: 'center' });
        e.preventDefault();
      } else if (e.key === 'Home') {
        slides[0].scrollIntoView({ behavior: 'smooth', inline: 'center' });
        e.preventDefault();
      } else if (e.key === 'End') {
        slides[slides.length - 1].scrollIntoView({ behavior: 'smooth', inline: 'center' });
        e.preventDefault();
      }
    });
  }

  const cleanup = () => {
    try { carousel.removeEventListener('mousedown', handleMouseDown); } catch (e) {}
    try { document.removeEventListener('mousemove', handleMouseMove); } catch (e) {}
    try { document.removeEventListener('mouseup', handleMouseUp); } catch (e) {}
  };
  window.addEventListener('beforeunload', cleanup);
}

function initPlanButtons() {
  const plansData = getPlansDataFromDom();
  const buttons = document.querySelectorAll('button[data-plan-id]');
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const planId = button.dataset.planId;
      const plan = plansData.find(p => p.id === planId) || null;
      selectedPlan = plan;
      lastFocusedEl = button;
      if (planId === 'social') {
        renderSocialModal(true);
      } else {
        renderSubscriptionModal(true);
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initPlansCarousel();
    initPlanButtons();
  });
} else {
  initPlansCarousel();
  initPlanButtons();
}
