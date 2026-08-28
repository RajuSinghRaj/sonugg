# 🧿 Raksha Bandhan Personalized Surprise Web App

A complete, handmade paper-styled, mobile-first Raksha Bandhan surprise website created using pure **HTML5**, **CSS3**, and **Vanilla JavaScript**. 

It features paper/scrapbook aesthetics, dynamic paper-wrap audio feedback using Web Audio API synthesis, 10 polaroid memory cards with image fallback support, an interactive SVG Rakhi tying animation, sister report stats, floating music player, and full customization options.

---

## 📁 Project Structure

```
rakhi/
├── index.html            # Main web page layout
├── style.css             # Scrapbook design system, animations & responsive layout
├── script.js             # CONFIG block, Web Audio synth, interactive Rakhi, gallery renderer
├── assets/
│   ├── photos/           # Folder for 10 photos (photo1.jpg to photo10.jpg)
│   │   └── README.txt
│   ├── videos/           # Folder for 3 video clips (video1.mp4 to video3.mp4)
│   │   └── README.txt
│   └── audio/            # Folder for background song (rakhi-song.mp3)
│       └── README.txt
└── README.md             # Customization & Deployment guide
```

---

## 📸 Adding Your 10 Photos & 3 Video Clips

### 1. Adding Photos (10 Photos):
Copy your 10 photos into `assets/photos/` renamed to:
- `photo1.jpg`
- `photo2.jpg`
- `photo3.jpg`
- `photo4.jpg`
- `photo5.jpg`
- `photo6.jpg`
- `photo7.jpg`
- `photo8.jpg`
- `photo9.jpg`
- `photo10.jpg`

### 2. Adding Videos (3 Clips):
Copy your 3 video clips into `assets/videos/` renamed to:
- `video1.mp4`
- `video2.mp4`
- `video3.mp4`

> **Automatic Video Looping & Mobile Playback**:
> - Videos use `autoplay`, `muted`, `loop`, and `playsinline` so when scrolled into view on mobile (iOS & Android) and desktop, they play automatically and loop seamlessly when finished!
> - When a video card is scrolled out of view, playback pauses to conserve phone battery and performance.
> 
> **Graceful Fallbacks**: If any photo or video file is missing, an artistic paper craft placeholder card is automatically shown — no broken links will ever be displayed!

---

## 🎵 Adding Your Song

1. Pick your favorite Raksha Bandhan song or instrumental MP3 track.
2. Rename it to `rakhi-song.mp3`.
3. Move it into `assets/audio/rakhi-song.mp3`.

> **Note**: Audio does not autoplay automatically to prevent browser block policy. Users click the floating **"🎵 Play Music"** button to start audio playback. If the MP3 file is not uploaded yet, a small notification toast appears cleanly without causing any JavaScript errors.

---

## 🚀 How to Run the Website

### Option 1: Direct File Opening (Easiest)
Simply double click on `index.html` to open it directly in any modern Web Browser (Chrome, Safari, Firefox, Edge).

### Option 2: Local Web Server
You can also run a simple local web server using Node.js or Python:

```bash
# Using Node.js npx serve
npx serve .

# Or using Python 3
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

---

## 🌐 How to Deploy on GitHub Pages (Free Hosting)

To share this link directly with your sister on mobile:

1. Create a new GitHub repository (e.g. `rakhi-surprise`).
2. Push your project files (`index.html`, `style.css`, `script.js`, `assets/`, `README.md`) to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Raksha Bandhan surprise"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/rakhi-surprise.git
   git push -u origin main
   ```
3. Go to your repository on GitHub.
4. Click **Settings** -> **Pages** (under Code and automation).
5. Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
6. Set Branch to `main` / `/ (root)` and click **Save**.
7. In 1–2 minutes, your website will be live at:
   `https://YOUR_USERNAME.github.io/rakhi-surprise/`

---

## ✨ Features Included

- 📱 **Mobile-First Responsive**: Looks great on 375px mobile screens up to 4K desktop displays.
- ✂️ **Handmade Scrapbook Styling**: Kraft paper backgrounds, washi tape strips, polaroid card frames, and handwritten typography.
- 🔊 **Synthesized Web Audio FX**: Dynamic paper wrap swooshes when cards enter view and bell chimes when Rakhi is tied.
- 🧿 **Interactive SVG Rakhi Tying**: Tap "Tie Rakhi 🧿" to wrap the sacred thread around the wrist illustration with sparkle confetti bursts.
- 📝 **Official Sister Report**: Animated percentage bars and verdict stamp.
- 🎵 **Floating Music Control**: Non-intrusive audio player with soundwave indicators and fallback notifications.
- 🔄 **Replay Feature**: Smooth reset and scroll back to top.
