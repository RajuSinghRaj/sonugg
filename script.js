/* ==========================================================================
   RAKSHA BANDHAN SURPRISE - JAVASCRIPT CONTROLLER
   ========================================================================== */

/* --------------------------------------------------------------------------
   EASY CONFIGURATION BLOCK
   Customize sister's name, photo captions, song, and final messages here!
   -------------------------------------------------------------------------- */
const CONFIG = {
  // Sister's name to display in the report
  sisterName: "Sonuuuuuuuu ggggg ❤️",

  // Audio file path
  songPath: "assets/audio/rakhi-song.mp3",

  // 13 Media items (10 Photos + 3 Videos) mixed for Sonuuuuuuuu ggggg & Thothee
  mediaList: [
    { type: "photo", src: "assets/photos/photo1.jpg", caption: "Certified Thothee 😌❤️", id: 1, filename: "photo1.jpg" },
    { type: "photo", src: "assets/photos/photo2.jpg", caption: "Rare footage of Sonuuuuuuuu ggggg 📸", id: 2, filename: "photo2.jpg" },
    { type: "video", src: "assets/videos/video1.mp4", caption: "Live Thothee action video 🎥✨", id: 1, filename: "video1.mp4" },
    { type: "photo", src: "assets/photos/photo3.jpg", caption: "Okay fine, you look nice here Thothee 😂", id: 3, filename: "photo3.jpg" },
    { type: "photo", src: "assets/photos/photo4.jpg", caption: "Evidence collected against Thothee 🔍", id: 4, filename: "photo4.jpg" },
    { type: "video", src: "assets/videos/video2.mp4", caption: "Cutest video clip of Sonuuuuuuuu ggggg 🎬❤️", id: 2, filename: "video2.mp4" },
    { type: "photo", src: "assets/photos/photo5.jpg", caption: "Best memory with Sonuuuuuuuu ggggg ❤️", id: 5, filename: "photo5.jpg" },
    { type: "video", src: "assets/videos/video3.mp4", caption: "Sister madness caught on camera 😂🎥", id: 3, filename: "video3.mp4" },
    { type: "photo", src: "assets/photos/photo6.jpg", caption: "Partner in crime forever 🕵️‍♀️", id: 6, filename: "photo6.jpg" },
    { type: "photo", src: "assets/photos/photo7.jpg", caption: "Stealing my food as usual 🍕", id: 7, filename: "photo7.jpg" },
    { type: "photo", src: "assets/photos/photo8.jpg", caption: "Drama queen Sonuuuuuuuu ggggg 👑", id: 8, filename: "photo8.jpg" },
    { type: "photo", src: "assets/photos/photo9.jpg", caption: "Always giving unwanted advice 🗣️", id: 9, filename: "photo9.jpg" },
    { type: "photo", src: "assets/photos/photo10.jpg", caption: "Best Thothee sister in the world 🌍❤️", id: 10, filename: "photo10.jpg" }
  ],

  // Sister Report Stats
  reportStats: [
    { label: "Annoying Me", value: 98, display: "98%" },
    { label: "Being Awesome", value: 100, display: "100%" },
    { label: "Giving Unwanted Advice", value: 101, display: "101%" },
    { label: "Stealing Food", value: 87, display: "87%" },
    { label: "Being A Good Sister", value: 100, display: "∞%" }
  ],

  // Final emotional message content
  finalMessage: {
    tagline: "Okay, jokes aside...",
    quote: `"Some people become family by birth,\nand some people become family because\nlife puts them next door. ❤️"`,
    personalNote: "Really glad you're my sister, Sonuuuuuuuu ggggg ❤️",
    wishes: "Happy Raksha Bandhan, Thothee! 🧿❤️"
  }
};

/* --------------------------------------------------------------------------
   WEB AUDIO API SOUND SYNTHESIZER (No external audio files needed!)
   Generates paper rustle wrap swoosh, success bell chimes, and pops.
   -------------------------------------------------------------------------- */
class SoundSynth {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Paper Wrap / Rustle Swoosh sound effect synthesized dynamically
  playWrapSound() {
    try {
      this.init();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.25; // 250ms sound
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate white noise for paper rustle
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter to sound like paper swoosh
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2400, this.ctx.currentTime + 0.25);
      filter.Q.value = 1.5;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch (e) {
      console.warn("Web Audio API not allowed or supported yet.");
    }
  }

  // Pentatonic Bell Chime sound when Rakhi is tied
  playSuccessChime() {
    try {
      this.init();
      if (!this.ctx) return;

      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        const startTime = this.ctx.currentTime + (idx * 0.12);
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.25, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 1.3);
      });
    } catch (e) {
      console.warn("Web Audio API chime failed.", e);
    }
  }

  // Soft click / pop for button taps
  playPopSound() {
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch (e) {
      // Ignore audio context lock
    }
  }
}

const soundFX = new SoundSynth();

/* --------------------------------------------------------------------------
   MAIN APPLICATION STATE & INITIALIZATION
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initBackgroundParticles();
  initLoadingScreen();
  initHeroSection();
  initMusicPlayer();
  renderGallery();
  initSisterReport();
  initRakhiTying();
  initFinalMessage();
  initReplayButton();
});

/* --------------------------------------------------------------------------
   BACKGROUND PARTICLES (Hearts & Sparkles)
   -------------------------------------------------------------------------- */
function initBackgroundParticles() {
  const container = document.getElementById("particles-bg");
  if (!container) return;

  const symbols = ["❤️", "💖", "✨", "🌸", "🧿", "✨"];
  const particleCount = 18;

  for (let i = 0; i < particleCount; i++) {
    const el = document.createElement("div");
    el.className = "particle";
    el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = `${Math.random() * 100}vw`;
    el.style.fontSize = `${Math.random() * 1.2 + 0.8}rem`;
    el.style.animationDuration = `${Math.random() * 6 + 6}s`;
    el.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(el);
  }
}

/* --------------------------------------------------------------------------
   1. LOADING SCREEN LOGIC
   -------------------------------------------------------------------------- */
function initLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");
  const loadingText = document.getElementById("loading-text");
  const progressBar = document.getElementById("loading-progress");
  const loadingSubtext = document.getElementById("loading-subtext");

  const steps = [
    { progress: 25, text: "Preparing something special...", subtext: "Configuring surprise..." },
    { progress: 55, text: "Scanning for Sonuuuuuuuu ggggg...", subtext: "Analyzing chaos levels..." },
    { progress: 85, text: "Thothee found ❤️", subtext: "Verification complete!" },
    { progress: 100, text: "Loading Rakhi.exe...", subtext: "Ready for Sonuuuuuuuu ggggg! ✨" }
  ];

  let currentStep = 0;

  function nextStep() {
    if (currentStep < steps.length) {
      const step = steps[currentStep];
      progressBar.style.width = `${step.progress}%`;
      loadingText.innerText = step.text;
      loadingSubtext.innerText = step.subtext;
      currentStep++;
      setTimeout(nextStep, 700);
    } else {
      setTimeout(() => {
        loadingScreen.classList.add("fade-out");
        mainContent.classList.remove("hidden-init");
        mainContent.classList.add("fade-in");
        window.scrollTo(0, 0);
      }, 400);
    }
  }

  setTimeout(nextStep, 300);
}

/* --------------------------------------------------------------------------
   2. HERO & ESCAPE MODAL LOGIC
   -------------------------------------------------------------------------- */
function initHeroSection() {
  const acceptBtn = document.getElementById("accept-fate-btn");
  const escapeBtn = document.getElementById("try-escape-btn");
  const escapeModal = document.getElementById("escape-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      soundFX.playPopSound();
      const gallerySec = document.getElementById("gallery");
      if (gallerySec) {
        gallerySec.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (escapeBtn) {
    escapeBtn.addEventListener("click", () => {
      soundFX.playPopSound();
      if (escapeModal) escapeModal.classList.remove("hidden");
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      soundFX.playPopSound();
      if (escapeModal) escapeModal.classList.add("hidden");
    });
  }
}

/* --------------------------------------------------------------------------
   3. FLOATING MUSIC PLAYER
   -------------------------------------------------------------------------- */
function initMusicPlayer() {
  const musicBtn = document.getElementById("music-btn");
  const bgAudio = document.getElementById("bg-audio");
  const musicText = musicBtn ? musicBtn.querySelector(".music-text") : null;
  const soundWave = document.getElementById("sound-wave");
  const musicToast = document.getElementById("music-toast");

  if (!musicBtn || !bgAudio) return;

  // Set audio source from config and ensure infinite looping
  bgAudio.loop = true;
  bgAudio.volume = 1;
  const sourceElem = bgAudio.querySelector("source");
  if (sourceElem) {
    sourceElem.src = CONFIG.songPath;
    bgAudio.load();
  }

  let isPlaying = false;
  let hasUnmuted = false;

  function setPlayingUI() {
    isPlaying = true;
    if (musicText) musicText.innerText = "Pause Music";
    if (soundWave) soundWave.classList.add("playing");
    if (musicToast) musicToast.classList.add("hidden");
  }

  function setPausedUI() {
    isPlaying = false;
    if (musicText) musicText.innerText = "Play Music";
    if (soundWave) soundWave.classList.remove("playing");
  }

  // Aggressive autoplay: try unmuted first, fall back to muted + unmute on interaction
  function tryAutoplay() {
    // Try unmuted play first (works on some browsers/desktop)
    bgAudio.muted = false;
    bgAudio.play().then(() => {
      setPlayingUI();
      hasUnmuted = true;
    }).catch(() => {
      // Unmuted blocked — start muted (always allowed by browsers)
      bgAudio.muted = true;
      bgAudio.play().then(() => {
        setPlayingUI();
        // Unmute on the very first user interaction
        listenForInteraction();
      }).catch(() => {
        // Even muted failed — wait for any interaction
        listenForInteraction();
      });
    });
  }

  function listenForInteraction() {
    if (hasUnmuted) return;
    const events = ["click", "touchstart", "pointerdown", "scroll", "mousemove", "keydown", "wheel"];
    
    const unmute = () => {
      if (hasUnmuted) return;
      hasUnmuted = true;
      bgAudio.muted = false;
      bgAudio.play().then(() => {
        setPlayingUI();
      }).catch(() => {});
      events.forEach(evt => document.removeEventListener(evt, unmute, { capture: true }));
    };

    events.forEach(evt => document.addEventListener(evt, unmute, { capture: true, once: false }));
  }

  // Start immediately
  tryAutoplay();

  // Also retry after a short delay (some browsers allow after page settles)
  setTimeout(() => {
    if (!isPlaying || bgAudio.muted) tryAutoplay();
  }, 1000);
  setTimeout(() => {
    if (!isPlaying || bgAudio.muted) tryAutoplay();
  }, 3000);

  // Manual Music Toggle Button
  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    soundFX.playPopSound();

    if (!isPlaying) {
      bgAudio.muted = false;
      hasUnmuted = true;
      bgAudio.play().then(() => {
        setPlayingUI();
      }).catch((err) => {
        console.log("Audio play error / missing file:", err);
        if (musicToast) {
          musicToast.classList.remove("hidden");
          setTimeout(() => {
            musicToast.classList.add("hidden");
          }, 4000);
        }
      });
    } else {
      bgAudio.pause();
      setPausedUI();
    }
  });
}


/* --------------------------------------------------------------------------
   4. PHOTO GALLERY RENDERER (10 POLAROID CARDS + PAPER WRAP SOUND)
   -------------------------------------------------------------------------- */
function renderGallery() {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";

  CONFIG.mediaList.forEach((item, idx) => {
    // Slight random rotation for handmade polaroid look
    const rotations = [-3, 2, -4, 3, -2, 4, -3, 2, -1, 3];
    const rot = rotations[idx % rotations.length];

    const card = document.createElement("div");
    card.className = "polaroid-card";
    card.style.setProperty("--rot", `${rot}deg`);
    card.setAttribute("tabindex", "0");

    if (item.type === "photo") {
      card.innerHTML = `
        <div class="tape-strip tape-top-left"></div>
        <div class="tape-strip tape-top-right"></div>
        <div class="photo-frame">
          <img class="photo-img" src="${item.src}" alt="${item.caption}" loading="lazy" />
        </div>
        <div class="photo-caption">${item.caption}</div>
      `;

      const imgEl = card.querySelector(".photo-img");
      let triedJpeg = false;
      imgEl.onerror = () => {
        if (!triedJpeg) {
          triedJpeg = true;
          // Try Windows double extension format photoX.jpg.jpeg or photoX.JPG.jpeg
          imgEl.src = `assets/photos/photo${item.id}.jpg.jpeg`;
        } else {
          const frame = card.querySelector(".photo-frame");
          if (frame) {
            frame.innerHTML = `
              <div class="photo-placeholder">
                <div class="ph-icon">📸</div>
                <div class="ph-title">Photo ${item.id}</div>
                <div class="ph-sub">Add <code>${item.filename}</code> to assets/photos/</div>
              </div>
            `;
          }
        }
      };
    } else if (item.type === "video") {
      card.innerHTML = `
        <div class="tape-strip tape-top-left"></div>
        <div class="tape-strip tape-top-right"></div>
        <div class="media-type-badge">🎥 VIDEO CLIP</div>
        <div class="photo-frame video-frame">
          <video class="photo-video" autoplay muted loop playsinline controls preload="metadata">
            <source src="${item.src}" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
        <div class="photo-caption">${item.caption}</div>
      `;

      const videoEl = card.querySelector(".photo-video");

      // Fallback for missing video file
      videoEl.onerror = () => {
        const frame = card.querySelector(".photo-frame");
        if (frame) {
          frame.innerHTML = `
            <div class="photo-placeholder video-ph">
              <div class="ph-icon">🎥</div>
              <div class="ph-title">Video Clip ${item.id}</div>
              <div class="ph-sub">Add <code>${item.filename}</code> to assets/videos/</div>
            </div>
          `;
        }
      };
    }

    card.addEventListener("mouseenter", () => soundFX.playWrapSound());
    card.addEventListener("click", () => soundFX.playWrapSound());

    grid.appendChild(card);
  });

  // IntersectionObserver to reveal cards and trigger video auto-play loop on scroll!
  const cards = grid.querySelectorAll(".polaroid-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const targetCard = entry.target;
        if (!targetCard.classList.contains("revealed")) {
          targetCard.classList.add("revealed");
          soundFX.playWrapSound();
        }

        // Auto play video when card comes into view on mobile/desktop
        const videoEl = targetCard.querySelector("video");
        if (videoEl) {
          videoEl.play().catch(e => console.log("Autoplay waiting for file or gesture"));
        }
      } else {
        // Pause video when scrolled out of view to save mobile performance
        const videoEl = entry.target.querySelector("video");
        if (videoEl) {
          videoEl.pause();
        }
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
}

/* --------------------------------------------------------------------------
   5. SISTER REPORT LOGIC
   -------------------------------------------------------------------------- */
function initSisterReport() {
  const nameElement = document.getElementById("report-sister-name");
  if (nameElement) {
    nameElement.innerText = CONFIG.sisterName;
  }

  const reportSection = document.getElementById("report");
  if (!reportSection) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateStats();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(reportSection);
}

function animateStats() {
  const statItems = document.querySelectorAll(".stat-item");

  CONFIG.reportStats.forEach((stat, idx) => {
    const item = statItems[idx];
    if (!item) return;

    const fillBar = item.querySelector(".stat-bar-fill");
    const valText = item.querySelector(".stat-value");

    if (fillBar) {
      fillBar.style.width = fillBar.style.getPropertyValue("--target-width") || "100%";
    }

    // Number counter animation
    if (valText) {
      let count = 0;
      const target = stat.value;
      const duration = 1200; // ms
      const stepTime = Math.max(Math.floor(duration / target), 15);

      const timer = setInterval(() => {
        count += 2;
        if (count >= target) {
          count = target;
          valText.innerText = stat.display;
          clearInterval(timer);
        } else {
          valText.innerText = `${count}%`;
        }
      }, stepTime);
    }
  });
}

/* --------------------------------------------------------------------------
   7. INTERACTIVE RAKHI TYING ANIMATION
   -------------------------------------------------------------------------- */
function initRakhiTying() {
  const tieBtn = document.getElementById("tie-rakhi-btn");
  const rakhiCard = document.querySelector(".rakhi-card");
  const statusTitle = document.getElementById("rakhi-status-title");
  const statusSub = document.getElementById("rakhi-status-sub");
  const successBox = document.getElementById("rakhi-success-box");

  if (!tieBtn || !rakhiCard) return;

  let isTied = false;

  tieBtn.addEventListener("click", () => {
    if (isTied) return;
    isTied = true;

    // 1. Play success bell chime synth
    soundFX.playSuccessChime();

    // 2. Add tied class to trigger SVG thread wrap & Rakhi moving animation
    rakhiCard.classList.add("rakhi-tied");

    // 3. Emit Sparkle & Confetti Particles around wrist
    createSparkleBurst(rakhiCard);

    // 4. Update texts smoothly
    tieBtn.disabled = true;
    tieBtn.innerText = "Rakhi Tied ❤️";

    if (statusTitle) statusTitle.innerText = "Rakhi successfully tied! ❤️";
    if (statusSub) statusSub.innerText = "";

    if (successBox) {
      setTimeout(() => {
        successBox.classList.remove("hidden");
      }, 1000);
    }
  });
}

// Sparkle & Confetti Particle Emitter
function createSparkleBurst(container) {
  const wrist = container.querySelector(".wrist-container");
  if (!wrist) return;

  const rect = wrist.getBoundingClientRect();
  const cX = rect.width / 2;
  const cY = rect.height / 2;

  const particleIcons = ["✨", "💖", "🧿", "🎉", "🌟", "💛"];

  for (let i = 0; i < 24; i++) {
    const p = document.createElement("div");
    p.className = "sparkle-burst";
    p.innerText = particleIcons[Math.floor(Math.random() * particleIcons.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 120 + 40;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    p.style.left = `${cX}px`;
    p.style.top = `${cY}px`;
    p.style.setProperty("--tx", `${tx}px`);
    p.style.setProperty("--ty", `${ty}px`);

    wrist.appendChild(p);

    setTimeout(() => p.remove(), 1000);
  }
}

/* --------------------------------------------------------------------------
   8. FINAL MESSAGE POPULATOR
   -------------------------------------------------------------------------- */
function initFinalMessage() {
  const noteEl = document.getElementById("message-personal");
  const wishesEl = document.getElementById("message-wishes");

  if (noteEl && CONFIG.finalMessage.personalNote) {
    noteEl.innerText = CONFIG.finalMessage.personalNote;
  }
  if (wishesEl && CONFIG.finalMessage.wishes) {
    wishesEl.innerText = CONFIG.finalMessage.wishes;
  }
}

/* --------------------------------------------------------------------------
   9. REPLAY BUTTON LOGIC
   -------------------------------------------------------------------------- */
function initReplayButton() {
  const replayBtn = document.getElementById("replay-btn");
  if (!replayBtn) return;

  replayBtn.addEventListener("click", () => {
    soundFX.playPopSound();

    // Reset Rakhi animation
    const rakhiCard = document.querySelector(".rakhi-card");
    const tieBtn = document.getElementById("tie-rakhi-btn");
    const statusTitle = document.getElementById("rakhi-status-title");
    const statusSub = document.getElementById("rakhi-status-sub");
    const successBox = document.getElementById("rakhi-success-box");

    if (rakhiCard) rakhiCard.classList.remove("rakhi-tied");
    if (tieBtn) {
      tieBtn.disabled = false;
      tieBtn.innerText = "Tie Rakhi 🧿";
    }
    if (statusTitle) statusTitle.innerText = "Ready to tie the Rakhi? 🧿";
    if (statusSub) statusSub.innerText = "Tap the button to wrap the sacred thread around the wrist!";
    if (successBox) successBox.classList.add("hidden");

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
