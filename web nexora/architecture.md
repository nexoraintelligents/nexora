# Nexora: Premium 3D Architecture & Working Process

Based on the massive Stripe/Linear-tier visual overhaul, here is the modernized 3D architecture driving the **Nexora** platform:

## 1. Project Structure Overview
Nexora has been structurally bifurcated. The application now runs a hybrid architecture where the standard DOM React Tree is seamlessly backed by an ultra-lightweight WebGL Canvas layer executing completely off the main thread.

``` text
Root/src
├── pages/
│   ├── Home (Standard Landing Array)
│   ├── Services (Heavy Parallax Service Engine)
│   ├── Login / SignUp
├── components/
│   ├── 3d/ (0-Allocation WebGL Space)
│   │   ├── CyberGrid.tsx (Drifting BufferGeometry)
│   │   ├── ParticleField.tsx (Organic Swarm Matrix)
│   │   └── AIOrb.tsx (MeshDistort Core)
│   ├── ui/ (Complex Physics Arrays)
│   │   ├── FeatureCard3D.tsx (±14° standard parallax)
│   │   ├── ServiceCard3D.tsx (±9° heavy hierarchy parallax)
│   │   └── [shadcn defaults]
│   ├── Layout Shells
│   │   ├── Features.tsx, About.tsx, Hero.tsx 
│   │   └── (Contains Masked <Canvas> integrations and Asymmetric Typography)
```

## 2. Technology Stack & Core Engines
- **Frontend Framework:** React 19 + TypeScript + Vite 6
- **3D Context Layer:** `@react-three/fiber`, `three`
- **Physics Layer:** `motion/react` (Framer Motion values/springs decoupled from State Render)
- **Styling Architecture:** Tailwind CSS, Glassmorphic variables, strict CSS composite masks (`WebkitMaskComposite: 'xor'`).
- **Typography Tokens:** `DM Sans` (Structural body), `DM Mono` (Data-nodes / Stats)

## 3. High-Performance WebGL Pipeline
We enforce exceptionally strict memory allocation tracking across the 3D ecosystem to guarantee sub-millisecond frame rendering:

### The WebGL Rulebook (`src/components/3d/`)
- All `<Canvas>` implementations run strictly with `powerPreference: "low-power"`, `antialias: false`, and `alpha: true`.
- **Zero-Allocation Frame Loops:** The 60fps `useFrame` logic strictly manipulates raw indexing across `Float32Array` buffers (initiated perfectly via `useMemo()`). 
- `.map`, `.forEach`, array spreads `[...]`, and object instantiations `{}` are outright banned inside the frame bounds to dodge Javascript Garbage Collection stutter.
- Background canvases are merged into the black void utilizing `.maskImage: radial-gradient/ellipse` trickery to prevent hard layout cutoffs.

### The Spatial UI Engine (`src/components/ui/`)
Our cards and horizontal banners natively render inside 3D Perspective CSS boxes.
- `FeatureCard3D` and `ServiceCard3D` calculate localized Pythagorean distances entirely using `useMotionValue` and `useTransform` logic. They track exactly where your cursor exists within normalized `[-1, 1]` ranges and react accordingly. 
- **Array Depth (`translateZ`)**: Items inside arrays calculate explicit Z-indices based on array index positioning (e.g. `10px -> 15px -> 20px`), tearing themselves off the background.
- Glare tracking, `.feTurbulence` topological noise, and strict XOR `.WebkitMask` clipping ensures intense glow borders process purely via the GPU layer. 

## 4. Layout & Typographic Choreography
The structural scaffolding supporting our 3D components follows a heavily controlled "Stripe/Linear" aesthetic pattern:
- **Asymmetric Typography:** Titles are broken into word-by-word cascades utilizing staggered `motion.span` arrays. Accent words natively trigger complex 3-stop gradient backgrounds utilizing `WebkitBackgroundClip`.
- **Monospaced Data Anchors:** Standard paragraphs are heavily supplemented by `//` code-comment statistics styled via `DM Mono` rendering raw system specifications for a hyper-modern edge.
- **Dual Ambient Light Leaks:** Broad `#04070f` voids are punctuated exclusively by absolute-positioned `<divs>` bluring at `120px` generating Indigo, Cyan, Emerald, and Fuchsia light-leaks mapping perfectly behind the 3D components context.

## 5. Build Mechanics
Vite natively packages the standard tree structure alongside the heavy raw mathematics libraries, producing `.js` chunk payloads cleanly optimized for modern browsers through automated compression algorithms and HMR tracking.