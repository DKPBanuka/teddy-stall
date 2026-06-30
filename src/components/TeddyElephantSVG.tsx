import React from 'react';

export interface ElephantColors {
  body: string;
  belly: string;
  ears: string;
  accent: string;
  trunk: string;
}

export function getElephantColors(colorName: string): ElephantColors {
  const resolvedColor = (colorName || '').toLowerCase();
  
  if (resolvedColor.includes('pink')) {
    return { body: "#e8c5d0", belly: "#f5d8e0", ears: "#d0a8b8", accent: "#b88898", trunk: "#c8a8b8" };
  }
  if (resolvedColor.includes('white')) {
    return { body: "#e4e4e7", belly: "#fafafa", ears: "#d4d4d8", accent: "#71717a", trunk: "#a1a1aa" };
  }
  if (resolvedColor.includes('blue')) {
    return { body: "#b8d0e8", belly: "#d0e0f0", ears: "#98b8d8", accent: "#7898b8", trunk: "#a8c0d8" };
  }
  if (resolvedColor.includes('purple')) {
    return { body: "#c8b8d8", belly: "#d8c8e8", ears: "#b0a0c8", accent: "#9888b0", trunk: "#b8a8c8" };
  }
  if (resolvedColor.includes('beige') || resolvedColor.includes('cream')) {
    return { body: "#e8e0d0", belly: "#f5f0e0", ears: "#d8d0b8", accent: "#c8b898", trunk: "#d8d0c0" };
  }
  if (resolvedColor.includes('gold') || resolvedColor.includes('caramel') || resolvedColor.includes('yellow')) {
    return { body: "#fbbf24", belly: "#fef3c7", ears: "#f59e0b", accent: "#b45309", trunk: "#d97706" };
  }
  if (resolvedColor.includes('black')) {
    return { body: "#3f3f46", belly: "#71717a", ears: "#27272a", accent: "#09090b", trunk: "#18181b" };
  }
  if (resolvedColor.includes('green')) {
    return { body: "#b8c8b0", belly: "#d0e0c8", ears: "#a0b098", accent: "#889880", trunk: "#a8b8a0" };
  }
  if (resolvedColor.includes('grey') || resolvedColor.includes('gray')) {
    return { body: "#9aa8b8", belly: "#c5d0e0", ears: "#7a8898", accent: "#5a6878", trunk: "#8a98a8" };
  }
  if (resolvedColor.includes('brown')) {
    return { body: "#b45309", belly: "#ffedd5", ears: "#78350f", accent: "#451a03", trunk: "#92400e" };
  }
  if (resolvedColor.includes('red')) {
    return { body: "#ef4444", belly: "#fee2e2", ears: "#b91c1c", accent: "#7f1d1d", trunk: "#dc2626" };
  }
  return { body: "#9aa8b8", belly: "#c5d0e0", ears: "#7a8898", accent: "#5a6878", trunk: "#8a98a8" };
}

export function TeddyElephantSVG({ colors, className, size }: { colors: ElephantColors; className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.08))" }}
    >
      {/* ── TAIL ── */}
      <path
        d="M 255 210 Q 270 205 275 215 Q 280 225 270 230"
        stroke={colors.body}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="272" cy="228" r="5" fill={colors.body} />

      {/* ── BODY ── */}
      <ellipse cx="165" cy="200" rx="85" ry="88" fill={colors.body} />

      {/* ── BELLY ── */}
      <ellipse cx="162" cy="215" rx="52" ry="58" fill={colors.belly} />
      <line x1="162" y1="165" x2="162" y2="268" stroke={colors.accent} strokeWidth="1.2" strokeDasharray="5 4" strokeLinecap="round" opacity="0.45" />

      {/* ── LEFT LEG ── */}
      <ellipse cx="115" cy="268" rx="30" ry="38" fill={colors.body} />
      <ellipse cx="108" cy="292" rx="28" ry="14" fill={colors.accent} />
      <circle cx="92" cy="288" r="6" fill={colors.accent} opacity="0.7" />
      <circle cx="108" cy="286" r="6" fill={colors.accent} opacity="0.7" />
      <circle cx="124" cy="288" r="6" fill={colors.accent} opacity="0.7" />

      {/* ── RIGHT LEG ── */}
      <ellipse cx="215" cy="268" rx="30" ry="38" fill={colors.body} />
      <ellipse cx="222" cy="292" rx="28" ry="14" fill={colors.accent} />
      <circle cx="206" cy="288" r="6" fill={colors.accent} opacity="0.7" />
      <circle cx="222" cy="286" r="6" fill={colors.accent} opacity="0.7" />
      <circle cx="238" cy="288" r="6" fill={colors.accent} opacity="0.7" />

      {/* ── LEFT ARM ── */}
      <ellipse cx="92" cy="205" rx="18" ry="32" fill={colors.body} transform="rotate(15 92 205)" />
      <circle cx="78" cy="225" r="14" fill={colors.body} />
      <circle cx="78" cy="228" r="8" fill={colors.accent} opacity="0.6" />
      <circle cx="72" cy="222" r="4" fill={colors.accent} opacity="0.5" />
      <circle cx="84" cy="222" r="4" fill={colors.accent} opacity="0.5" />

      {/* ── RIGHT ARM ── */}
      <ellipse cx="235" cy="205" rx="18" ry="32" fill={colors.body} transform="rotate(-15 235 205)" />
      <circle cx="249" cy="225" r="14" fill={colors.body} />
      <circle cx="249" cy="228" r="8" fill={colors.accent} opacity="0.6" />
      <circle cx="243" cy="222" r="4" fill={colors.accent} opacity="0.5" />
      <circle cx="255" cy="222" r="4" fill={colors.accent} opacity="0.5" />

      {/* ── HEAD ── */}
      <ellipse cx="155" cy="135" rx="65" ry="58" fill={colors.body} />

      {/* ── BIG ELEPHANT EARS ── */}
      <ellipse cx="75" cy="130" rx="32" ry="42" fill={colors.ears} transform="rotate(-10 75 130)" />
      <ellipse cx="82" cy="135" rx="20" ry="28" fill={colors.belly} transform="rotate(-10 82 135)" opacity="0.7" />
      <ellipse cx="235" cy="130" rx="32" ry="42" fill={colors.ears} transform="rotate(10 235 130)" />
      <ellipse cx="228" cy="135" rx="20" ry="28" fill={colors.belly} transform="rotate(10 228 135)" opacity="0.7" />

      {/* ── TRUNK ── */}
      <path
        d="M 140 165 Q 155 190 155 210 Q 155 230 145 240 Q 135 250 145 255 Q 155 260 165 250 Q 175 240 175 220 Q 175 190 170 165"
        fill={colors.trunk}
      />
      <path d="M 145 175 Q 155 178 165 175" stroke={colors.body} strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M 143 190 Q 155 193 167 190" stroke={colors.body} strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M 142 205 Q 155 208 168 205" stroke={colors.body} strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M 145 220 Q 155 223 165 220" stroke={colors.body} strokeWidth="2" fill="none" opacity="0.5" />
      <circle cx="152" cy="252" r="8" fill={colors.trunk} />
      <circle cx="150" cy="250" r="4" fill={colors.trunk} opacity="0.8" />

      {/* ── EYES ── */}
      <circle cx="128" cy="125" r="16" fill="white" />
      <circle cx="182" cy="125" r="16" fill="white" />
      <circle cx="130" cy="127" r="10" fill={colors.accent} />
      <circle cx="184" cy="127" r="10" fill={colors.accent} />
      <circle cx="131" cy="128" r="6" fill="#1a1a2e" />
      <circle cx="185" cy="128" r="6" fill="#1a1a2e" />
      <circle cx="134" cy="124" r="3" fill="white" />
      <circle cx="128" cy="130" r="1.5" fill="white" opacity="0.7" />
      <circle cx="188" cy="124" r="3" fill="white" />
      <circle cx="182" cy="130" r="1.5" fill="white" opacity="0.7" />

      {/* ── EYEBROWS ── */}
      <path d="M 115 108 Q 128 102 142 108" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M 168 108 Q 182 102 195 108" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />

      {/* ── CHEEK BLUSH ── */}
      <ellipse cx="108" cy="145" rx="14" ry="10" fill="#ff9eb5" opacity="0.35" />
      <ellipse cx="202" cy="145" rx="14" ry="10" fill="#ff9eb5" opacity="0.35" />

      {/* ── TUMMY HEART ── */}
      <path
        d="M 162 200 C 162 200 155 192 150 192 C 145 192 142 196 142 200 C 142 208 150 215 162 222 C 174 215 182 208 182 200 C 182 196 179 192 174 192 C 169 192 162 200 162 200"
        fill={colors.ears}
        opacity="0.5"
      />

      {/* ── BACK LEGS ── */}
      <ellipse cx="105" cy="255" rx="22" ry="28" fill={colors.body} />
      <ellipse cx="225" cy="255" rx="22" ry="28" fill={colors.body} />
    </svg>
  );
}
