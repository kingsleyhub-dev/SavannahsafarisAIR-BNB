import { CSSProperties } from "react";

/**
 * AnimatedSafariLogo
 * ------------------
 * Layered SVG recreation of the Savannah Safaris Airbnb logo.
 *
 * Why a hand-built SVG instead of the uploaded PNG?
 *   The brief calls for *individually* animated elements (birds flying
 *   on curved paths with wing-flap, a giraffe slowly grazing, leaves
 *   that quiver only where the giraffe nibbles). A flat PNG cannot be
 *   decomposed into these layers, so we recreate the composition in
 *   close visual fidelity to the source artwork while keeping each
 *   element addressable for animation.
 *
 * All motion is CSS-keyframe driven (defined in index.css) so it's
 * GPU-friendly and automatically disabled under
 * `prefers-reduced-motion: reduce`.
 */
export const AnimatedSafariLogo = ({ className = "", style }: { className?: string; style?: CSSProperties }) => {
  return (
    <svg
      viewBox="0 0 800 760"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Savannah Safaris Airbnb — animated safari scene with tree, lodge, giraffe and birds"
      className={className}
      style={style}
    >
      <defs>
        {/* Soft pale-green sun disc behind the scene */}
        <radialGradient id="sun" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#e8f5b8" />
          <stop offset="70%" stopColor="#cfe89a" />
          <stop offset="100%" stopColor="#bcd987" stopOpacity="0.6" />
        </radialGradient>
        {/* Tree canopy gradient */}
        <linearGradient id="canopy" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3f7a1f" />
          <stop offset="100%" stopColor="#22591a" />
        </linearGradient>
        <linearGradient id="canopyHi" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5b9c34" />
          <stop offset="100%" stopColor="#3a7a1d" />
        </linearGradient>
        {/* Lodge wood gradient */}
        <linearGradient id="lodge" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4a7a2c" />
          <stop offset="100%" stopColor="#2f5418" />
        </linearGradient>
        {/* Path */}
        <linearGradient id="path" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e8d49a" />
          <stop offset="100%" stopColor="#c9a86a" />
        </linearGradient>
        {/* Subtle drop shadow for the whole scene */}
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="2" result="off" />
          <feComponentTransfer in="off" result="trans"><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
          <feMerge><feMergeNode in="trans" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ---------- BACKDROP SUN DISC ---------- */}
      <ellipse cx="420" cy="260" rx="320" ry="220" fill="url(#sun)" />

      {/* ---------- BIRDS (sky layer, behind tree silhouette edge) ---------- */}
      {/* Each bird sits on its own group whose transform is animated to fly
          along a gentle curved path (translate + rotate). The two <path>
          strokes inside flap independently for a wing motion. */}
      <g className="safari-bird safari-bird-1" style={{ transformOrigin: "560px 180px" }}>
        <Bird x={560} y={180} scale={1} />
      </g>
      <g className="safari-bird safari-bird-2" style={{ transformOrigin: "620px 210px" }}>
        <Bird x={620} y={210} scale={0.85} />
      </g>
      <g className="safari-bird safari-bird-3" style={{ transformOrigin: "600px 290px" }}>
        <Bird x={600} y={290} scale={0.7} />
      </g>

      {/* ---------- DISTANT HILLS ---------- */}
      <path d="M60 470 Q 200 400 360 460 T 740 470 L 740 520 L 60 520 Z" fill="#5a8d35" opacity="0.55" />

      {/* ---------- TREE ---------- */}
      <g filter="url(#softShadow)">
        {/* Trunk + branches */}
        <path
          d="M250 470
             C 248 420 244 360 250 300
             C 252 270 268 250 282 248
             M 252 360 C 230 350 210 330 195 305
             M 254 320 C 280 310 310 295 335 285
             M 256 290 C 240 275 225 260 215 240"
          stroke="#4a3a1c"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        {/* Canopy — large flat-topped acacia silhouette */}
        <path
          d="M120 240
             Q 140 150 260 140
             Q 380 130 470 175
             Q 540 205 520 245
             Q 500 280 430 285
             Q 340 295 240 285
             Q 150 278 120 240 Z"
          fill="url(#canopy)"
        />
        {/* Canopy highlight */}
        <path
          d="M170 215
             Q 220 170 320 165
             Q 410 165 470 195
             Q 430 215 350 218
             Q 250 222 170 215 Z"
          fill="url(#canopyHi)"
          opacity="0.85"
        />
        {/* Animated leaf cluster — only the tip the giraffe reaches toward sways */}
        <g className="safari-leaves" style={{ transformOrigin: "490px 235px" }}>
          <ellipse cx="495" cy="232" rx="38" ry="16" fill="#3f7a1f" />
          <ellipse cx="510" cy="225" rx="22" ry="9" fill="#5b9c34" opacity="0.9" />
        </g>
      </g>

      {/* ---------- LODGE / HOUSE ---------- */}
      <g filter="url(#softShadow)">
        <path d="M340 470 L 340 360 L 430 290 L 520 360 L 520 470 Z" fill="url(#lodge)" />
        {/* Roof line */}
        <path d="M330 365 L 430 285 L 530 365" stroke="#1f3a10" strokeWidth="6" fill="none" strokeLinejoin="round" />
        {/* Door */}
        <rect x="410" y="395" width="40" height="75" rx="3" fill="#cfe89a" />
        <rect x="412" y="397" width="36" height="71" rx="2" fill="#e8f5b8" opacity="0.6" />
        {/* Plank lines */}
        <path d="M340 400 L 410 400 M 450 400 L 520 400 M 340 430 L 410 430 M 450 430 L 520 430"
              stroke="#1f3a10" strokeWidth="1.5" opacity="0.4" />
      </g>

      {/* ---------- PATH ---------- */}
      <path d="M430 470 Q 440 510 410 555 Q 380 600 430 640 L 480 640 Q 460 595 470 555 Q 480 510 470 470 Z"
            fill="url(#path)" opacity="0.95" />

      {/* ---------- SMALL GIRAFFE (background) ---------- */}
      <g className="safari-giraffe-small" style={{ transformOrigin: "595px 470px" }} filter="url(#softShadow)">
        {/* body */}
        <path d="M575 460 L 615 460 L 618 415 L 608 410 L 600 430 L 590 430 L 582 410 L 572 415 Z" fill="#2f5418" />
        {/* neck — animated */}
        <g className="safari-giraffe-small-neck" style={{ transformOrigin: "600px 415px" }}>
          <path d="M598 418 L 612 418 L 618 360 L 608 358 Z" fill="#2f5418" />
          <ellipse cx="615" cy="356" rx="9" ry="6" fill="#2f5418" />
        </g>
      </g>

      {/* ---------- LARGE GIRAFFE (foreground, animated grazing) ---------- */}
      <g filter="url(#softShadow)">
        {/* Legs + body stay still */}
        <path
          d="M650 470
             L 650 410
             L 660 405
             L 668 430
             L 680 430
             L 688 405
             L 698 410
             L 710 405
             L 716 430
             L 728 430
             L 734 405
             L 744 410
             L 744 470 Z"
          fill="#2c4f15"
        />
        {/* Tail */}
        <path d="M650 415 Q 642 425 644 440" stroke="#2c4f15" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Neck + head — pivots from the shoulder so the head drifts up to the
            leaves, pauses, then comes back down. A nested chew group adds a
            tiny repeating mouth motion. */}
        <g className="safari-giraffe-neck" style={{ transformOrigin: "735px 410px" }}>
          <path
            d="M725 412
               L 745 412
               L 752 320
               L 740 318 Z"
            fill="#2c4f15"
          />
          {/* Head */}
          <g className="safari-giraffe-head" style={{ transformOrigin: "748px 318px" }}>
            <ellipse cx="752" cy="312" rx="14" ry="9" fill="#2c4f15" />
            {/* Ossicones */}
            <path d="M746 300 L 744 290 M 756 300 L 758 290" stroke="#2c4f15" strokeWidth="3" strokeLinecap="round" />
            {/* Mouth — chew loop */}
            <g className="safari-giraffe-chew" style={{ transformOrigin: "763px 314px" }}>
              <ellipse cx="763" cy="314" rx="4" ry="2.5" fill="#1f3a10" />
            </g>
          </g>
        </g>
      </g>

      {/* ---------- FOREGROUND PLANTS ---------- */}
      <g>
        {/* Left grass clump */}
        <Plant x={120} y={500} />
        {/* Right grass clump */}
        <Plant x={680} y={500} />
        {/* Mounds */}
        <ellipse cx="280" cy="500" rx="90" ry="22" fill="#3f7a1f" />
        <ellipse cx="540" cy="500" rx="80" ry="18" fill="#3f7a1f" />
        <ellipse cx="200" cy="510" rx="70" ry="16" fill="#5b9c34" opacity="0.85" />
      </g>

      {/* ---------- BRAND TEXT (static, never distorted) ---------- */}
      <g>
        <text
          x="400"
          y="640"
          textAnchor="middle"
          fontFamily="'Brush Script MT','Lucida Handwriting',cursive"
          fontStyle="italic"
          fontWeight="700"
          fontSize="78"
          fill="#22591a"
        >
          Savannah Safaris
        </text>
        {/* Decorative dashes */}
        <line x1="220" y1="680" x2="280" y2="680" stroke="#5b9c34" strokeWidth="2" />
        <line x1="520" y1="680" x2="580" y2="680" stroke="#5b9c34" strokeWidth="2" />
        <text
          x="400"
          y="695"
          textAnchor="middle"
          fontFamily="'Ubuntu','Inter',sans-serif"
          fontWeight="500"
          fontSize="40"
          letterSpacing="14"
          fill="#5b9c34"
        >
          AIRBNB
        </text>
      </g>
    </svg>
  );
};

/* ---------- Subcomponents ---------- */

const Bird = ({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {/* Two wing strokes that flap on their own keyframe */}
    <path className="safari-wing safari-wing-l" d="M-18 0 Q -9 -10 0 0" stroke="#1f3a10" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <path className="safari-wing safari-wing-r" d="M0 0 Q 9 -10 18 0" stroke="#1f3a10" strokeWidth="3.5" fill="none" strokeLinecap="round" />
  </g>
);

const Plant = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M0 10 L -8 -30 M 0 10 L 0 -40 M 0 10 L 8 -30 M 0 10 L -16 -20 M 0 10 L 16 -20"
          stroke="#3f7a1f" strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M0 10 L -4 -25 M 0 10 L 4 -25"
          stroke="#5b9c34" strokeWidth="4" strokeLinecap="round" fill="none" />
    <ellipse cx="0" cy="14" rx="40" ry="8" fill="#3f7a1f" opacity="0.8" />
  </g>
);