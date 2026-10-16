# 🎉 Birthday Celebration Web App

A modern, interactive, and luxury birthday celebration web application crafted with **HTML**, **Tailwind CSS**, and **JavaScript**.

---

## ✨ Features

- 🎂 **Interactive Multi-Tier Cake & Candles**: Blow out glowing candles individually or all at once with smoke simulation, victory fanfare sound, and celebration confetti.
- 💌 **3D Flip Greeting Card**: Realistic 3D perspective fold-out birthday letter with handwritten script typography.
- 🎁 **Surprise Gift Box Unboxing**: Tap to untie the golden ribbon and reveal a customized VIP birthday pass.
- 🎈 **Arcade Balloon Popping Mini-Game**: Interactive floating balloons that pop with sound effects and cheerful messages.
- 🎶 **Synthesized "Happy Birthday" Theme Song**: Pure Web Audio API chime box music that works offline with zero external audio file dependencies.
- 🏮 **Make a Wish & Sky Lantern Wall**: Release glowing wishes into the night sky and leave blessings on the community wishes wall.
- ⚙️ **Personalization & Shareable Link**: Edit the recipient's name and age via the interactive modal or URL parameters (`?name=YourFriend&age=25`) and copy a shareable link.
- 💎 **Luxury Glassmorphism Aesthetics**: Built with high-end palettes (Champagne Gold, Rose Gold, Midnight Obsidian) and smooth responsive micro-animations.

---

## 🚀 Quick Start

### Option 1: Instant Browser Preview (No build step required)
Simply double-click or open [index.html](file:///c:/Users/CG-LENOVO/Documents/birthday/index.html) in your favorite web browser (or use VS Code Live Server). Tailwind CSS and all interactive features are fully configured to work out-of-the-box!

### Option 2: Vite Development Server
If you'd like to run it with a modern dev server and bundler:

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build
```

---

## 📤 Push to GitHub & Fix `src refspec main`

If you encountered `error: src refspec main does not match any` during your initial push, it happened because git had no committed files yet. Now that the project files are created, run:

```bash
# 1. Stage all project files
git add .

# 2. Commit your files
git commit -m "feat: initialize interactive birthday celebration project"

# 3. Ensure branch is main
git branch -M main

# 4. Push to your GitHub repository
git push -u origin main
```

---

## 🌐 Deploy to GitHub Pages (Free 1-Click Hosting)

1. Go to your repository on GitHub: `https://github.com/rachanasoum29/birthday`
2. Click **Settings** > **Pages** (in the left sidebar).
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Within a minute, your website will be live at `https://rachanasoum29.github.io/birthday/`!

---

## 🎨 Project Structure

```
birthday/
├── index.html           # Main luxury birthday celebration experience
├── package.json         # Project metadata and dependencies (Vite, Tailwind CSS)
├── tailwind.config.js   # Custom theme, colors, fonts, and animation keyframes
├── postcss.config.js    # PostCSS configuration
├── .gitignore           # Git ignore rules
├── README.md            # Documentation and instructions
└── src/
    ├── style.css        # Tailwind directives, glassmorphism, and 3D card styling
    └── main.js          # Web Audio synth, candle blower, balloon game & sharing engine
```
