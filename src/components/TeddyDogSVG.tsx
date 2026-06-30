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
        d="M 248 218 Q 268 208 274 218 Q 280 228 266 232"
        stroke={colors.body}
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="270" cy="223" r="5" fill={colors.ears} />

      {/* ── BODY ── */}
      <ellipse cx="160" cy="208" rx="88" ry="86" fill={colors.body} />
      <ellipse cx="158" cy="220" rx="54" ry="60" fill={colors.belly} />
      <line x1="158" y1="164" x2="158" y2="274" stroke={colors.accent} strokeWidth="1.2" strokeDasharray="5 4" strokeLinecap="round" opacity="0.3" />

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

      {/* ── ARMS ── */}
      <ellipse cx="86"  cy="204" rx="18" ry="30" fill={colors.body} transform="rotate(18 86 204)" />
      <circle cx="71"   cy="222" r="14" fill={colors.body} />
      <circle cx="71"   cy="225" r="8.5" fill={colors.ears} opacity="0.65" />

      <ellipse cx="230" cy="204" rx="18" ry="30" fill={colors.body} transform="rotate(-18 230 204)" />
      <circle cx="245"  cy="222" r="14" fill={colors.body} />
      <circle cx="245"  cy="225" r="8.5" fill={colors.ears} opacity="0.65" />

      {/* ── HEAD ── */}
      <ellipse cx="158" cy="120" rx="66" ry="60" fill={colors.body} />

      {/* ── FLOPPY DOG EARS (Flopping downwards) ── */}
      {/* Left Ear */}
      <ellipse cx="90" cy="124" rx="18" ry="38" fill={colors.ears} transform="rotate(-25 90 124)" />
      <ellipse cx="94" cy="128" rx="11" ry="26" fill={colors.belly} transform="rotate(-25 94 128)" opacity="0.75" />
      {/* Right Ear */}
      <ellipse cx="226" cy="124" rx="18" ry="38" fill={colors.ears} transform="rotate(25 226 124)" />
      <ellipse cx="222" cy="128" rx="11" ry="26" fill={colors.belly} transform="rotate(25 222 128)" opacity="0.75" />

      {/* Snout */}
      <ellipse cx="158" cy="142" rx="32" ry="22" fill={colors.belly} />
      <ellipse cx="158" cy="133" rx="10" ry="7.5" fill="#18181b" />
      <ellipse cx="154" cy="130" rx="3"  ry="1.8" fill="white" opacity="0.4" />
      {/* smile */}
      <path d="M 144 148 Q 158 160 172 148" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.75" />

      {/* ── EYES ── */}
      <circle cx="132" cy="112" r="17" fill="white" />
      <circle cx="184" cy="112" r="17" fill="white" />
      <circle cx="134" cy="114" r="11" fill={colors.accent} />
      <circle cx="186" cy="114" r="11" fill={colors.accent} />
      <circle cx="136" cy="115" r="6.5" fill="#1a1030" />
      <circle cx="188" cy="115" r="6.5" fill="#1a1030" />
      <circle cx="140" cy="110" r="3"   fill="white" />
      <circle cx="133" cy="118" r="1.8" fill="white" opacity="0.7" />
      <circle cx="192" cy="110" r="3"   fill="white" />
      <circle cx="185" cy="118" r="1.8" fill="white" opacity="0.7" />

      {/* Eyebrows */}
      <path d="M 120 92 Q 132 86 144 92" stroke={colors.accent} strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M 172 92 Q 184 86 196 92" stroke={colors.accent} strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.5" />

      {/* Cheek blush */}
      <ellipse cx="112" cy="130" rx="15" ry="9" fill="#ff9eb5" opacity="0.32" />
      <ellipse cx="204" cy="130" rx="15" ry="9" fill="#ff9eb5" opacity="0.32" />

      {/* Tummy button */}
      <circle cx="158" cy="230" r="6" fill={colors.ears} opacity="0.35" />

      {/* Sparkles */}
      <text x="68"  y="178" fontSize="13" opacity="0.55" fill={colors.ears}>✦</text>
      <text x="238" y="172" fontSize="11" opacity="0.45" fill={colors.ears}>✦</text>
    </svg>
  );
}
