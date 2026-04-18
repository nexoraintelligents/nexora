# Nexora: Premium 3D Architecture & Working Process

Based on the massive Stripe/Linear-tier visual overhaul, here is the modernized 3D architecture driving the **Nexora** platform:

## 1. Project Structure Overview
Nexora has been structurally bifurcated. The application runs a hybrid architecture where the standard DOM React Tree is seamlessly backed by an ultra-lightweight WebGL Canvas layer executing completely off the main thread.

``` text
Root/src
├── pages/
│   ├── Home (Standard Landing Array)
│   ├── Services (Heavy Parallax Service Engine)
│   ├── Pricing (Tiered Strategic Models)
│   ├── Contact (Active Engagement Channel)
│   ├── Login / SignUp
├── components/
│   ├── 3d/ (0-Allocation WebGL Space)
│   │   ├── Scene.tsx (Central Environment Orchestrator)
│   │   ├── CyberGrid.tsx (Drifting BufferGeometry)
│   │   ├── ParticleField.tsx (Organic Swarm Matrix)
│   │   └── AIOrb.tsx (MeshDistort Core)
│   ├── ui/ (Complex Physics Arrays)
│   │   ├── FeatureCard3D.tsx (±14° standard parallax)
│   │   ├── ServiceCard3D.tsx (±9° heavy hierarchy parallax)
│   │   └── [shadcn defaults]
│   ├── AIDemo.tsx (Interactive Signal Analysis)
│   ├── DashboardPreview.tsx (Intelligence Command Center)
│   ├── AIMovingLines.tsx (Canvas-based Neural Pathing)
│   ├── WelcomeScreen.tsx (Initial Entry Sequence)
│   └── Layout Shells (Hero, Features, About, Footer, etc.)
├── lib/
│   ├── gemini.ts (Google Gemini AI Integration)
└── context/
    ├── AuthContext.tsx (Global Session Management)
```

## 2. Technology Stack & Core Engines
- **Frontend Framework:** React 19 + TypeScript + Vite 6
- **AI Engine:** Google Gemini Pro (`@google/genai`) for real-time strategic insights.
- **3D Context Layer:** `@react-three/fiber`, `three`, `@react-three/drei`
- **Physics Layer:** `motion/react` (Framer Motion v12 value/springs decoupled from State Render)
- **Data Visualization:** `recharts` (Hardware-accelerated SVG/Canvas charting)
- **Styling Architecture:** Tailwind CSS v4, Glassmorphic variables, strict CSS composite masks.
- **Typography Tokens:** `DM Sans` (Structural body), `DM Mono` (Data-nodes / Stats)

## 3. High-Performance WebGL Pipeline
We enforce exceptionally strict memory allocation tracking across the 3D ecosystem to guarantee sub-millisecond frame rendering:

### The WebGL Rulebook (`src/components/3d/`)
- **Scene Orchestration:** `Scene.tsx` handles lighting (`Environment`), global `ambientLight`, and component instantiation with `Float` wrappers for organic movement.
- All `<Canvas>` implementations run strictly with `powerPreference: "low-power"`, `antialias: false`, and `alpha: true`.
- **Zero-Allocation Frame Loops:** The 60fps `useFrame` logic strictly manipulates raw indexing across `Float32Array` buffers.
- `.map`, `.forEach`, array spreads `[...]`, and object instantiations `{}` are banned inside frame bounds to eliminate Garbage Collection stutter.

### The Spatial UI Engine (`src/components/ui/`)
- `FeatureCard3D` and `ServiceCard3D` calculate localized Pythagorean distances entirely using `useMotionValue` and `useTransform`.
- **Z-Space Interaction:** Items calculate explicit Z-indices based on array index positioning (e.g. `10px -> 15px -> 20px`), tearing themselves off the background.
- Glare tracking and strict XOR `.WebkitMask` clipping ensures glow borders process purely via the GPU.

## 4. Intelligent Components & Data Visualization
- **AI Signal Analysis:** `AIDemo` connects to the `gemini-3-flash-preview` model via a dedicated server-side utility in `src/lib/gemini.ts`.
- **Command Center:** `DashboardPreview` utilizes `recharts` with custom gradient fills and glassmorphic overlays to visualize high-velocity business data.
- **Canvas Interaction:** `AIMovingLines` provides a lightweight interactive background layer using raw Canvas 2D API for neural-network-like visuals.

## 5. Layout & Typographic Choreography
- **Asymmetric Typography:** Titles use staggered `motion.span` arrays. Accent words trigger 3-stop gradient backgrounds via `WebkitBackgroundClip`.
- **Dual Ambient Light Leaks:** Broad `#04070f` voids are punctuated by absolute-positioned divs with `120px` blur generating multi-spectral light-leaks.

## 6. Build Mechanics
Vite 6 packages the standard tree alongside heavy raw mathematics libraries, producing optimized `.js` chunk payloads with native HMR tracking and automated compression.