/**
 * Birthday Celebration Interactive Engine
 * Features:
 * - Web Audio API Synthesizer (Chime Music Box for Happy Birthday & sound FX)
 * - Confetti cannon animations
 * - Interactive blowable candles with smoke simulation
 * - 3D Greeting Card Flip
 * - Surprise Gift Box unpacking
 * - Balloon popping mini-game with score & sound FX
 * - Wish generator with floating sky lanterns
 * - Live URL customizer (?name=...&age=...) with share link generator
 */

// -------------------------------------------------------------
// State Management & URL Parameters
// -------------------------------------------------------------
const state = {
  name: 'Rachana',
  age: 24,
  candlesLit: 5,
  candlesTotal: 5,
  balloonsPopped: 0,
  musicPlaying: false,
  cardOpened: false,
  giftOpened: false,
};

// Parse URL params for easy sharing (e.g. ?name=Alex&age=21)
function initFromUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const nameParam = urlParams.get('name');
  const ageParam = urlParams.get('age');

  if (nameParam && nameParam.trim() !== '') {
    state.name = nameParam.trim();
  }
  if (ageParam && !isNaN(parseInt(ageParam))) {
    state.age = parseInt(ageParam);
  }

  updateNameAndAgeDisplays();
}

function updateNameAndAgeDisplays() {
  document.querySelectorAll('.recipient-name').forEach(el => {
    el.textContent = state.name;
  });
  document.querySelectorAll('.recipient-age').forEach(el => {
    el.textContent = state.age;
  });
}

// -------------------------------------------------------------
// Web Audio Synthesizer (Music Box & Sound FX)
// -------------------------------------------------------------
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play pleasant music box bell chime tone
function playChimeTone(freq, duration = 0.8, delay = 0, gainLevel = 0.2) {
  const ctx = getAudioContext();
  const startTime = ctx.currentTime + delay;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Bell/celesta timbre with sine + triangle harmonics
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startTime);

  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

// Satisfying Balloon Pop Sound Effect
function playPopSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch (e) {
    console.warn(e);
  }
}

// Happy Birthday Chime Melody Notes (Hz)
const NOTES = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.00,
  A4: 440.00,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
};

const happyBirthdayScore = [
  { note: NOTES.C4, dur: 0.35, pause: 0.4 },
  { note: NOTES.C4, dur: 0.25, pause: 0.3 },
  { note: NOTES.D4, dur: 0.6, pause: 0.7 },
  { note: NOTES.C4, dur: 0.6, pause: 0.7 },
  { note: NOTES.F4, dur: 0.6, pause: 0.7 },
  { note: NOTES.E4, dur: 1.1, pause: 1.2 },

  { note: NOTES.C4, dur: 0.35, pause: 0.4 },
  { note: NOTES.C4, dur: 0.25, pause: 0.3 },
  { note: NOTES.D4, dur: 0.6, pause: 0.7 },
  { note: NOTES.C4, dur: 0.6, pause: 0.7 },
  { note: NOTES.G4, dur: 0.6, pause: 0.7 },
  { note: NOTES.F4, dur: 1.1, pause: 1.2 },

  { note: NOTES.C4, dur: 0.35, pause: 0.4 },
  { note: NOTES.C4, dur: 0.25, pause: 0.3 },
  { note: NOTES.C5, dur: 0.7, pause: 0.8 },
  { note: NOTES.A4, dur: 0.7, pause: 0.8 },
  { note: NOTES.F4, dur: 0.6, pause: 0.7 },
  { note: NOTES.E4, dur: 0.6, pause: 0.7 },
  { note: NOTES.D4, dur: 1.0, pause: 1.1 },

  { note: NOTES.B4, dur: 0.35, pause: 0.4 },
  { note: NOTES.B4, dur: 0.25, pause: 0.3 },
  { note: NOTES.A4, dur: 0.7, pause: 0.8 },
  { note: NOTES.F4, dur: 0.7, pause: 0.8 },
  { note: NOTES.G4, dur: 0.7, pause: 0.8 },
  { note: NOTES.F4, dur: 1.4, pause: 1.6 },
];

let musicTimer = null;

function playHappyBirthdaySong() {
  if (state.musicPlaying) return;
  state.musicPlaying = true;
  updateMusicButtonUI();

  let accumulatedDelay = 0;
  happyBirthdayScore.forEach((item) => {
    playChimeTone(item.note, item.dur, accumulatedDelay, 0.25);
    accumulatedDelay += item.pause;
  });

  // Loop song after playing
  musicTimer = setTimeout(() => {
    if (state.musicPlaying) {
      state.musicPlaying = false;
      playHappyBirthdaySong();
    }
  }, accumulatedDelay * 1000 + 800);
}

function stopHappyBirthdaySong() {
  state.musicPlaying = false;
  if (musicTimer) clearTimeout(musicTimer);
  updateMusicButtonUI();
}

function toggleMusic() {
  if (state.musicPlaying) {
    stopHappyBirthdaySong();
  } else {
    playHappyBirthdaySong();
  }
}

function updateMusicButtonUI() {
  const btn = document.getElementById('music-toggle-btn');
  const wave = document.getElementById('music-wave');
  if (!btn) return;

  if (state.musicPlaying) {
    btn.innerHTML = `<span class="text-xl">🎵</span> <span>Pause Melody</span>`;
    btn.classList.add('border-gold-400', 'text-gold-300', 'shadow-gold-500/20');
    if (wave) wave.classList.remove('hidden');
  } else {
    btn.innerHTML = `<span class="text-xl">🎶</span> <span>Play Birthday Song</span>`;
    btn.classList.remove('border-gold-400', 'text-gold-300', 'shadow-gold-500/20');
    if (wave) wave.classList.add('hidden');
  }
}

// -------------------------------------------------------------
// Confetti System
// -------------------------------------------------------------
function fireConfetti(options = {}) {
  // If canvas-confetti is loaded on window
  if (typeof window.confetti === 'function') {
    const defaults = {
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#D4AF37', '#F43F5E', '#A78BFA', '#38BDF8', '#FCD34D', '#FFF1F2'],
    };
    window.confetti({ ...defaults, ...options });
  } else {
    // Fallback lightweight DOM confetti
    spawnDomConfetti(options.particleCount || 40);
  }
}

function fireGrandCelebration() {
  fireConfetti({ particleCount: 100, spread: 80, origin: { x: 0.2, y: 0.6 } });
  setTimeout(() => {
    fireConfetti({ particleCount: 100, spread: 80, origin: { x: 0.8, y: 0.6 } });
  }, 250);
  setTimeout(() => {
    fireConfetti({ particleCount: 150, spread: 100, origin: { x: 0.5, y: 0.4 } });
  }, 500);
}

function spawnDomConfetti(count = 30) {
  const container = document.body;
  const colors = ['#D4AF37', '#F43F5E', '#A78BFA', '#38BDF8', '#FCD34D'];

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    const size = Math.random() * 8 + 6;
    const color = colors[Math.floor(Math.random() * colors.length)];

    piece.className = 'fixed pointer-events-none z-50 rounded-sm';
    piece.style.width = `${size}px`;
    piece.style.height = `${size * 1.5}px`;
    piece.style.backgroundColor = color;
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.top = '-20px';
    piece.style.transition = `transform ${Math.random() * 2 + 2}s cubic-bezier(0.25, 1, 0.5, 1), opacity 2.5s ease-out`;

    container.appendChild(piece);

    requestAnimationFrame(() => {
      const xOffset = (Math.random() - 0.5) * 300;
      const yOffset = window.innerHeight + 100;
      const rot = Math.random() * 720;
      piece.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rot}deg)`;
      piece.style.opacity = '0';
    });

    setTimeout(() => piece.remove(), 3500);
  }
}

// -------------------------------------------------------------
// Interactive Cake & Candle Blowing
// -------------------------------------------------------------
function initCandles() {
  const candles = document.querySelectorAll('.candle-item');
  state.candlesTotal = candles.length;
  state.candlesLit = candles.length;
  updateCandlesCountText();

  candles.forEach((candle, idx) => {
    candle.addEventListener('click', () => extinguishCandle(candle, idx));
  });

  const blowAllBtn = document.getElementById('blow-all-btn');
  if (blowAllBtn) {
    blowAllBtn.addEventListener('click', blowAllCandles);
  }

  const relightBtn = document.getElementById('relight-btn');
  if (relightBtn) {
    relightBtn.addEventListener('click', relightCandles);
  }
}

function extinguishCandle(candleEl, idx) {
  const flame = candleEl.querySelector('.flame');
  if (!flame || flame.classList.contains('extinguished')) return;

  flame.classList.add('extinguished');
  state.candlesLit = Math.max(0, state.candlesLit - 1);
  updateCandlesCountText();

  // Create smoke puff
  createSmoke(candleEl);

  // Play gentle extinguish chime
  playChimeTone(600 + idx * 80, 0.4, 0, 0.15);

  if (state.candlesLit === 0) {
    onAllCandlesBlown();
  }
}

function createSmoke(parentEl) {
  const smoke = document.createElement('div');
  smoke.className = 'smoke-puff';
  smoke.style.top = '0px';
  smoke.style.left = '50%';
  smoke.style.transform = 'translateX(-50%)';
  parentEl.appendChild(smoke);
  setTimeout(() => smoke.remove(), 1600);
}

function blowAllCandles() {
  const candles = document.querySelectorAll('.candle-item');
  candles.forEach((candle, idx) => {
    setTimeout(() => {
      extinguishCandle(candle, idx);
    }, idx * 100);
  });
}

function relightCandles() {
  const candles = document.querySelectorAll('.candle-item');
  candles.forEach((candle) => {
    const flame = candle.querySelector('.flame');
    if (flame) flame.classList.remove('extinguished');
  });
  state.candlesLit = candles.length;
  updateCandlesCountText();

  const wishAlert = document.getElementById('wish-granted-banner');
  if (wishAlert) wishAlert.classList.add('hidden');
}

function updateCandlesCountText() {
  const text = document.getElementById('candles-status-text');
  if (!text) return;

  if (state.candlesLit === 0) {
    text.innerHTML = `<span class="text-emerald-400 font-semibold">✨ All Candles Blown! Your wish is on its way to the stars! ✨</span>`;
  } else {
    text.innerHTML = `Candles remaining: <strong class="text-gold-400">${state.candlesLit}</strong> of ${state.candlesTotal} (Click flames to blow!)`;
  }
}

function onAllCandlesBlown() {
  fireGrandCelebration();
  playChimeTone(NOTES.C5, 0.8, 0.1, 0.3);
  playChimeTone(NOTES.E5, 0.9, 0.25, 0.3);
  playChimeTone(NOTES.G4, 1.2, 0.4, 0.35);

  const banner = document.getElementById('wish-granted-banner');
  if (banner) {
    banner.classList.remove('hidden');
    banner.classList.add('animate-bounce');
    setTimeout(() => banner.classList.remove('animate-bounce'), 1800);
  }
}

// -------------------------------------------------------------
// 3D Greeting Card Flip
// -------------------------------------------------------------
function initGreetingCard() {
  const card = document.getElementById('greeting-card');
  const openBtn = document.getElementById('toggle-card-btn');

  function toggleCard() {
    state.cardOpened = !state.cardOpened;
    if (card) {
      if (state.cardOpened) {
        card.classList.add('card-open');
        fireConfetti({ particleCount: 50, spread: 60 });
        playChimeTone(NOTES.E5, 0.5, 0, 0.2);
        if (openBtn) openBtn.innerHTML = `<span>Close Card 💌</span>`;
      } else {
        card.classList.remove('card-open');
        if (openBtn) openBtn.innerHTML = `<span>Open Birthday Card 💌</span>`;
      }
    }
  }

  if (card) card.addEventListener('click', toggleCard);
  if (openBtn) openBtn.addEventListener('click', toggleCard);
}

// -------------------------------------------------------------
// Mystery Gift Box Interaction
// -------------------------------------------------------------
function initGiftBox() {
  const giftBox = document.getElementById('mystery-gift-box');
  const giftLid = document.getElementById('gift-lid');
  const giftContent = document.getElementById('gift-reveal-content');
  const giftPrompt = document.getElementById('gift-click-prompt');

  if (!giftBox) return;

  giftBox.addEventListener('click', () => {
    if (state.giftOpened) return;
    state.giftOpened = true;

    // Open animations
    if (giftLid) giftLid.classList.add('gift-lid-opened');
    if (giftPrompt) giftPrompt.classList.add('hidden');
    if (giftContent) {
      giftContent.classList.remove('opacity-0', 'scale-75', 'pointer-events-none');
      giftContent.classList.add('opacity-100', 'scale-100');
    }

    playChimeTone(NOTES.G4, 0.3, 0);
    playChimeTone(NOTES.C5, 0.4, 0.15);
    playChimeTone(NOTES.E5, 0.6, 0.3);

    fireGrandCelebration();
  });
}

// -------------------------------------------------------------
// Interactive Balloon Popping Game
// -------------------------------------------------------------
function initBalloonGame() {
  const playground = document.getElementById('balloon-playground');
  const scoreCounter = document.getElementById('popped-counter');
  if (!playground) return;

  const balloonColors = [
    { bg: 'from-pink-500 to-rose-600', shadow: 'rgba(244,63,94,0.4)', text: 'Happy Birthday!' },
    { bg: 'from-amber-400 to-yellow-600', shadow: 'rgba(212,175,55,0.4)', text: 'Good Health!' },
    { bg: 'from-purple-500 to-indigo-600', shadow: 'rgba(167,139,250,0.4)', text: 'Endless Joy!' },
    { bg: 'from-cyan-400 to-blue-600', shadow: 'rgba(56,189,248,0.4)', text: 'Big Dreams!' },
    { bg: 'from-emerald-400 to-teal-600', shadow: 'rgba(52,211,153,0.4)', text: 'Much Love!' },
    { bg: 'from-fuchsia-400 to-pink-600', shadow: 'rgba(232,121,249,0.4)', text: 'Sweet Smiles!' },
  ];

  function spawnBalloon() {
    if (!playground) return;
    const balloon = document.createElement('div');
    const config = balloonColors[Math.floor(Math.random() * balloonColors.length)];

    const startX = Math.random() * 85 + 5;
    const size = Math.random() * 25 + 60; // 60px to 85px
    const duration = Math.random() * 4 + 7; // 7s to 11s

    balloon.className = `balloon absolute rounded-full bg-gradient-to-t ${config.bg} cursor-pointer shadow-lg flex items-center justify-center text-center p-2 text-white font-medium select-none`;
    balloon.style.width = `${size}px`;
    balloon.style.height = `${size * 1.25}px`;
    balloon.style.left = `${startX}%`;
    balloon.style.bottom = '-110px';
    balloon.style.boxShadow = `0 10px 25px -4px ${config.shadow}`;
    balloon.style.animation = `balloonRise ${duration}s linear forwards`;

    // Inner string
    balloon.innerHTML = `
      <span class="text-[10px] tracking-tight leading-tight drop-shadow font-semibold pointer-events-none">${config.text}</span>
      <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-white/40"></div>
    `;

    // Pop on click
    balloon.addEventListener('click', (e) => {
      e.stopPropagation();
      playPopSound();
      state.balloonsPopped++;
      if (scoreCounter) scoreCounter.textContent = state.balloonsPopped;

      balloon.classList.add('balloon-popped');
      fireConfetti({
        particleCount: 20,
        spread: 45,
        origin: {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        },
      });

      setTimeout(() => balloon.remove(), 260);
    });

    playground.appendChild(balloon);

    // Remove after rise completion
    setTimeout(() => {
      if (balloon.parentNode) balloon.remove();
    }, duration * 1000);
  }

  // Inject animation keyframe for rising balloons
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    @keyframes balloonRise {
      0% { transform: translateY(0) rotate(0deg); opacity: 0; }
      5% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(-750px) rotate(15deg); opacity: 0; }
    }
  `;
  document.head.appendChild(styleTag);

  // Spawn initial set
  for (let i = 0; i < 4; i++) {
    setTimeout(spawnBalloon, i * 600);
  }

  // Periodic spawn
  setInterval(spawnBalloon, 2200);
}

// -------------------------------------------------------------
// Make a Wish System & Sky Lanterns
// -------------------------------------------------------------
function initWishForm() {
  const form = document.getElementById('wish-form');
  const input = document.getElementById('wish-input');
  const authorInput = document.getElementById('wish-author-input');
  const list = document.getElementById('wishes-list');

  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const wishText = input.value.trim();
    const authorText = authorInput.value.trim() || 'A Warm Well-Wisher';

    if (!wishText) return;

    // Create new card in wishes list
    const card = document.createElement('div');
    card.className = 'glass-card p-4 rounded-xl border border-gold-500/30 transform transition-all hover:scale-105 duration-300';
    card.innerHTML = `
      <p class="text-slate-200 text-sm leading-relaxed mb-3">"${escapeHtml(wishText)}"</p>
      <div class="flex items-center justify-between text-xs text-gold-400/90 font-medium pt-2 border-t border-white/5">
        <span>✨ From ${escapeHtml(authorText)}</span>
        <span>Just now</span>
      </div>
    `;

    if (list) {
      list.prepend(card);
    }

    // Sky lantern animation
    spawnSkyLantern(wishText);

    // Success feedback
    fireConfetti({ particleCount: 40, spread: 60 });
    playChimeTone(NOTES.C5, 0.6, 0, 0.2);

    input.value = '';
    authorInput.value = '';
  });
}

function spawnSkyLantern(text) {
  const lantern = document.createElement('div');
  lantern.className = 'fixed z-50 pointer-events-none rounded-t-2xl rounded-b-lg bg-gradient-to-t from-amber-500 to-yellow-200 shadow-2xl p-3 text-night-950 font-bold text-xs flex items-center justify-center text-center';
  lantern.style.width = '100px';
  lantern.style.minHeight = '70px';
  lantern.style.boxShadow = '0 0 35px 12px rgba(245, 158, 11, 0.7)';
  lantern.style.left = `${Math.random() * 60 + 20}vw`;
  lantern.style.bottom = '10px';
  lantern.style.transition = 'transform 6s cubic-bezier(0.2, 0.8, 0.4, 1), opacity 6s ease-in';
  lantern.textContent = `🌟 ${text.slice(0, 25)}`;

  document.body.appendChild(lantern);

  requestAnimationFrame(() => {
    lantern.style.transform = `translateY(-${window.innerHeight + 150}px) scale(0.65)`;
    lantern.style.opacity = '0.3';
  });

  setTimeout(() => lantern.remove(), 6200);
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// -------------------------------------------------------------
// Live Customizer Modal & Share Link
// -------------------------------------------------------------
function initCustomizer() {
  const modal = document.getElementById('customizer-modal');
  const openBtn = document.getElementById('open-customizer-btn');
  const closeBtn = document.getElementById('close-customizer-btn');
  const form = document.getElementById('customizer-form');
  const nameInput = document.getElementById('edit-name');
  const ageInput = document.getElementById('edit-age');
  const copyBtn = document.getElementById('copy-share-btn');
  const copyToast = document.getElementById('copy-toast');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      if (nameInput) nameInput.value = state.name;
      if (ageInput) ageInput.value = state.age;
      modal.classList.remove('hidden');
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (nameInput) state.name = nameInput.value.trim() || 'Rachana';
      if (ageInput) state.age = parseInt(ageInput.value) || 24;

      updateNameAndAgeDisplays();
      if (modal) modal.classList.add('hidden');
      fireGrandCelebration();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const shareUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(state.name)}&age=${encodeURIComponent(state.age)}`;
      
      navigator.clipboard.writeText(shareUrl).then(() => {
        if (copyToast) {
          copyToast.classList.remove('hidden');
          setTimeout(() => copyToast.classList.add('hidden'), 2500);
        }
      }).catch(() => {
        prompt('Copy this customized link:', shareUrl);
      });
    });
  }
}

// -------------------------------------------------------------
// Floating Ambient Particles Generator
// -------------------------------------------------------------
function initParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;

  const count = 35;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 4 + 2;
    p.className = 'particle';
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.backgroundColor = Math.random() > 0.4 ? '#D4AF37' : '#FDA4AF';
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.filter = `blur(${Math.random() * 1.5}px)`;
    p.style.animation = `float ${Math.random() * 4 + 4}s ease-in-out infinite alternate`;
    p.style.animationDelay = `${Math.random() * 5}s`;

    container.appendChild(p);
  }
}

// -------------------------------------------------------------
// Bootstrapping
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initFromUrlParams();
  initParticles();
  initCandles();
  initGreetingCard();
  initGiftBox();
  initBalloonGame();
  initWishForm();
  initCustomizer();

  // Grand Welcome Confetti
  setTimeout(() => {
    fireConfetti({ particleCount: 80, spread: 80 });
  }, 400);

  // Setup Music Toggle
  const musicBtn = document.getElementById('music-toggle-btn');
  if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
  }

  // Celebrate Button
  const celebrateBtn = document.getElementById('celebrate-btn');
  if (celebrateBtn) {
    celebrateBtn.addEventListener('click', () => {
      fireGrandCelebration();
      playChimeTone(NOTES.G4, 0.4, 0);
      playChimeTone(NOTES.C5, 0.5, 0.2);
    });
  }
});
