import React from 'react';

export interface DogColors {
  body: string;
  belly: string;
  ears: string;
  accent: string;
}

export function getDogColors(colorName: string): DogColors {
  const resolvedColor = (colorName || '').toLowerCase();
  
  if (resolvedColor.includes('pink')) {
    return { body: "#fbcfe8", belly: "#fdf2f8", ears: "#f472b6", accent: "#db2777" };
  }
  if (resolvedColor.includes('white') || resolvedColor.includes('polar') || resolvedColor.includes('cream')) {
    return { body: "#f4f4f5", belly: "#ffffff", ears: "#e4e4e7", accent: "#71717a" };
  }
  if (resolvedColor.includes('blue')) {
    return { body: "#bfdbfe", belly: "#eff6ff", ears: "#60a5fa", accent: "#2563eb" };
  }
  if (resolvedColor.includes('purple')) {
    return { body: "#e9d5ff", belly: "#faf5ff", ears: "#c084fc", accent: "#7e22ce" };
  }
  if (resolvedColor.includes('beige') || resolvedColor.includes('gold') || resolvedColor.includes('yellow')) {
    return { body: "#fde68a", belly: "#fffbeb", ears: "#fbbf24", accent: "#d97706" };
  }
  if (resolvedColor.includes('black') || resolvedColor.includes('grey') || resolvedColor.includes('gray')) {
    return { body: "#4b5563", belly: "#f3f4f6", ears: "#1f2937", accent: "#111827" };
  }
  if (resolvedColor.includes('brown') || resolvedColor.includes('caramel') || resolvedColor.includes('cinnamon')) {
    return { body: "#d97706", belly: "#fffbeb", ears: "#b45309", accent: "#78350f" };
  }
  
  // Default Brown / Golden pup
  return { body: "#d97706", belly: "#fffbeb", ears: "#b45309", accent: "#78350f" };
}

export function TeddyDogSVG({ colors, className, size }: { colors: DogColors; className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.08))" }}
    >
      {/* ── TAIL ── */}
      <path
        d="M 248 218 Q 268 202 276 214 Q 284 226 266 230"
        stroke={colors.body}
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="272" cy="216" r="6.5" fill={colors.ears} />

      {/* ── LEGS ── */}
      <ellipse cx="112" cy="268" rx="28" ry="34" fill={colors.body} />
      <ellipse cx="106" cy="292" rx="30" ry="14" fill={colors.ears} />
      <circle cx="91"  cy="288" r="7" fill={colors.ears} />
      <circle cx="106" cy="285" r="7" fill={colors.ears} />
      <circle cx="121" cy="288" r="7" fill={colors.ears} />

      <ellipse cx="204" cy="268" rx="28" ry="34" fill={colors.body} />
      <ellipse cx="210" cy="292" rx="30" ry="14" fill={colors.ears} />
      <circle cx="195" cy="288" r="7" fill={colors.ears} />
      <circle cx="210" cy="285" r="7" fill={colors.ears} />
      <circle cx="225" cy="288" r="7" fill={colors.ears} />

      {/* ── BODY ── */}
      <ellipse cx="160" cy="208" rx="88" ry="86" fill={colors.body} />
      {/* Spot pattern on the body */}
      <ellipse cx="196" cy="226" rx="22" ry="26" fill={colors.ears} opacity="0.3" />
      <ellipse cx="230" cy="180" rx="14" ry="18" fill={colors.ears} opacity="0.25" />
      
      {/* Belly panel */}
      <ellipse cx="158" cy="220" rx="54" ry="60" fill={colors.belly} />
      <line x1="158" y1="164" x2="158" y2="274" stroke={colors.accent} strokeWidth="1.2" strokeDasharray="5 4" strokeLinecap="round" opacity="0.25" />

      {/* ── ARMS ── */}
      <ellipse cx="86"  cy="204" rx="18" ry="30" fill={colors.body} transform="rotate(18 86 204)" />
      <circle cx="71"   cy="222" r="14" fill={colors.body} />
      <circle cx="71"   cy="225" r="8.5" fill={colors.ears} opacity="0.65" />

      <ellipse cx="230" cy="204" rx="18" ry="30" fill={colors.body} transform="rotate(-18 230 204)" />
      <circle cx="245"  cy="222" r="14" fill={colors.body} />
      <circle cx="245"  cy="225" r="8.5" fill={colors.ears} opacity="0.65" />

      {/* ── HEAD ── */}
      <ellipse cx="158" cy="120" rx="66" ry="60" fill={colors.body} />

      {/* Cute patch spot behind left eye */}
      <ellipse cx="128" cy="114" rx="24" ry="22" fill={colors.ears} opacity="0.7" />

      {/* ── FLOPPY ORGANIC DOG EARS ── */}
      {/* Left Floppy Ear */}
      <path
        d="M 112 95 C 80 95 72 130 76 155 C 80 175 102 175 110 160 C 118 140 118 110 112 95 Z"
        fill={colors.ears}
      />
      <path
        d="M 110 102 C 86 102 80 128 84 148 C 87 163 102 163 108 152 C 114 136 114 114 110 102 Z"
        fill={colors.belly}
        opacity="0.8"
      />

      {/* Right Floppy Ear */}
      <path
        d="M 206 95 C 238 95 246 130 242 155 C 238 175 216 175 208 160 C 200 140 200 110 206 95 Z"
        fill={colors.ears}
      />
      <path
        d="M 208 102 C 232 102 238 128 234 148 C 231 163 216 163 210 152 C 204 136 204 114 208 102 Z"
        fill={colors.belly}
        opacity="0.8"
      />

      {/* Snout */}
      <ellipse cx="158" cy="142" rx="32" ry="22" fill={colors.belly} />
      
      {/* Philtrum, mouth, and tongue */}
      <path d="M 158 136 L 158 147" stroke={colors.accent} strokeWidth="1.8" />
      <path d="M 148 147 Q 158 153 168 147" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M 154 148 Q 158 160 162 148 Z" fill="#ff708a" />

      {/* Dog Nose */}
      <ellipse cx="158" cy="133" rx="10" ry="7.5" fill="#18181b" />
      <ellipse cx="154" cy="130" rx="3"  ry="1.8" fill="white" opacity="0.4" />

      {/* ── EYES ── */}
      <circle cx="132" cy="112" r="17" fill="white" />
      <circle cx="184" cy="112" r="17" fill="white" />
      <circle cx="134" cy="114" r="11" fill={colors.accent} />
      <circle cx="186" cy="114" r="11" fill={colors.accent} />
      <circle cx="136" cy="115" r="6.5" fill="#1a1030" />
      <circle cx="188" cy="115" r="6.5" fill="#1a1030" />
      <circle cx="140" cy="110" r="3"   fill="white" />
      <circle cx="133" cy="118" r="1.8" fill="white" opacity="0.75" />
      <circle cx="192" cy="110" r="3"   fill="white" />
      <circle cx="185" cy="118" r="1.8" fill="white" opacity="0.75" />

      {/* Eyebrows */}
      <path d="M 120 92 Q 132 86 144 92" stroke={colors.accent} strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M 172 92 Q 184 86 196 92" stroke={colors.accent} strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.5" />

      {/* Cheek blush */}
      <ellipse cx="112" cy="130" rx="15" ry="9" fill="#ff9eb5" opacity="0.32" />
      <ellipse cx="204" cy="130" rx="15" ry="9" fill="#ff9eb5" opacity="0.32" />

      {/* Collar and golden Tag */}
      <path d="M 124 163 Q 158 176 192 163" stroke={colors.accent} strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="158" cy="175" r="6.5" fill="#facc15" stroke={colors.accent} strokeWidth="1.2" />

      {/* Tummy button */}
      <circle cx="158" cy="230" r="6" fill={colors.ears} opacity="0.35" />

      {/* Sparkles */}
      <text x="68"  y="178" fontSize="13" opacity="0.55" fill={colors.ears}>✦</text>
      <text x="238" y="172" fontSize="11" opacity="0.45" fill={colors.ears}>✦</text>
    </svg>
  );
}
