# Anjana's React Portfolio Redesign (2026) - v2.2

## 1. Project Context
* **Stack:** Vite + React + Tailwind CSS.
* **Goal:** High-performance "Dark Data" aesthetic using CSS-only graphics (No heavy image files).

## 2. Design Rules
* **Theme:** "Cyberpunk Financial Terminal".
    * **Background:** Deepest Slate (\`#020617\`) with a perspective grid.
    * **Primary Color:** Cyan-400 (\`#22d3ee\`) for active states/data.
    * **Secondary:** Slate-500 (\`#64748b\`) for passive UI.
* **Typography:**
    * \`font-mono\`: For headers, code blocks, and the sidebar.
    * \`font-sans\`: For long-form text (Bio, Experience).

## 3. COMPONENT: The "Command Rail" (Sidebar)
* **Status:** Implemented (Lucide Icons, No Emojis).
* **Behavior:** Fixed left rail, glassmorphism, tech numbering (01, 02).

## 4. VISUAL ENGINE (Graphics Update)
### A. The "Cyber Grid" Background
* **Requirement:** Replace static background with a dynamic CSS Grid.
* **Specs:**
    * **Base:** Radial gradient fading from Slate-900 to Black.
    * **Texture:** A 24px x 24px grid pattern using \`linear-gradient\`.
    * **Depth:** Use a mask (\`mask-image: radial-gradient\`) so the grid fades out at the edges (Vignette effect).
    * **Ambiance:** Two large, slow-moving blurred orbs (Cyan & Blue) in the background to create a "Glow" effect.

### B. The "AI Core" Hero Graphic
* **Requirement:** Replace the profile picture with an Abstract Data Visualization.
* **Specs:**
    * **Concept:** A "Processing Core" or "Neural Node".
    * **Construction:** * 3 Concentric Rings created with \`div\` borders.
        * **Ring 1 (Outer):** Slow clockwise rotation (3