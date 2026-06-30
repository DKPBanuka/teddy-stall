import React from 'react';

export interface PenguinColors {
  body: string;
  belly: string;
  beak: string;
  feet: string;
  accent: string;
  scarf: string;
}

export function getPenguinColors(colorName: string): PenguinColors {
  const resolvedColor = (colorName || '').toLowerCase();
  
  if (resolvedColor.includes('pink')) {
    return { body: "#c06080", belly: "#fde8f0", beak: "#f0a030", feet: "#e07818", accent: "#8c3055", scarf: "#f090b0" };
  }
  if (resolvedColor.includes('white')) {
    return { body: "#3f3f46", belly: "#f4f4f5", beak: "#fbbf24", feet: "#f59e0b", accent: "#18181b", scarf: "#f43f5e" };
  }
  if (resolvedColor.includes('blue') || resolvedColor.includes('arctic')) {
    return { body: "#6aaed4", belly: "#e8f6ff", beak: "#f0c050", feet: "#d4a030", accent: "#2e7aaa", scarf: "#e8e8ff" };
  }
  if (resolvedColor.includes('purple') || resolvedColor.includes('midnight')) {
    return { body: "#3a2d60", belly: "#e8e0ff", beak: "#f0b040", feet: "#c89020", accent: "#20164a", scarf: "#9060e0" };
  }
  if (resolvedColor.includes('beige') || resolvedColor.includes('cream')) {
    return { body: "#e8e0d0", belly: "#f5f0e0", beak: "#f0a030", feet: "#e08820", accent: "#c8b898", scarf: "#e05050" };
  }
  if (resolvedColor.includes('gold') || resolvedColor.includes('caramel') || resolvedColor.includes('yellow')) {
    return { body: "#8c6030", belly: "#faecd8", beak: "#e09020", feet: "#c07010", accent: "#5a3a10", scarf: "#e0b060" };
  }
  if (resolvedColor.includes('black')) {
    return { body: "#2d3a52", belly: "#f0f4ff", beak: "#f0a030", feet: "#e08820", accent: "#1a2338", scarf: "#e05050" };
  }
  if (resolvedColor.includes('green') || resolvedColor.includes('forest')) {
    return { body: "#2d5240", belly: "#e0f5ec", beak: "#f0b040", feet: "#d09020", accent: "#183428", scarf: "#50c878" };
  }
  if (resolvedColor.includes('grey') || resolvedColor.includes('gray')) {
    return { body: "#4b5563", belly: "#f3f4f6", beak: "#f59e0b", feet: "#d97706", accent: "#1f2937", scarf: "#dc2626" };
  }
  if (resolvedColor.includes('brown')) {
    return { body: "#8c6030", belly: "#faecd8", beak: "#e09020", feet: "#c07010", accent: "#5a3a10", scarf: "#e0b060" };
  }
  if (resolvedColor.includes('red') || resolvedColor.includes('coral') || resolvedColor.includes('dusk')) {
    return { body: "#c05848", belly: "#fde8e4", beak: "#f0a030", feet: "#d08018", accent: "#8a2e22", scarf: "#ff8060" };
  }
  return { body: "#2d3a52", belly: "#f0f4ff", beak: "#f0a030", feet: "#e08820", accent: "#1a2338", scarf: "#e05050" };
}

export function TeddyPenguinSVG({ colors, className, size }: { colors: PenguinColors; className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.08))" }}
    >
      {/* ── FEET ── */}
      <ellipse cx="118" cy="318" rx="34" ry="16" fill={colors.feet} transform="rotate(-10 118 318)" />
      <ellipse cx="100" cy="316" rx="14" ry="10" fill={colors.feet} transform="rotate(-15 100 316)" />
      <ellipse cx="120" cy="312" rx="13" ry="9"  fill={colors.feet} />
      <ellipse cx="138" cy="316" rx="12" ry="9"  fill={colors.feet} transform="rotate(12 138 316)" />

      <ellipse cx="202" cy="318" rx="34" ry="16" fill={colors.feet} transform="rotate(10 202 318)" />
      <ellipse cx="184" cy="316" rx="12" ry="9"  fill={colors.feet} transform="rotate(-12 184 316)" />
      <ellipse cx="202" cy="312" rx="13" ry="9"  fill={colors.feet} />
      <ellipse cx="220" cy="316" rx="14" ry="10" fill={colors.feet} transform="rotate(15 220 316)" />

      {/* ── BODY ── */}
      <ellipse cx="160" cy="228" rx="80" ry="96" fill={colors.body} />
      <ellipse cx="160" cy="244" rx="50" ry="72" fill={colors.belly} />
      <line x1="160" y1="178" x2="160" y2="308" stroke={colors.accent} strokeWidth="1.2" strokeDasharray="5 4" strokeLinecap="round" opacity="0.2" />
      <circle cx="160" cy="268" r="6"   fill={colors.accent} opacity="0.2" />
      <circle cx="160" cy="268" r="3"   fill={colors.accent} opacity="0.18" />

      {/* ── FLIPPERS ── */}
      <ellipse cx="82"  cy="230" rx="22" ry="54" fill={colors.body}   transform="rotate(12 82 230)"  />
      <ellipse cx="76"  cy="234" rx="13" ry="40" fill={colors.accent} transform="rotate(12 76 234)"  opacity="0.55" />

      <ellipse cx="238" cy="230" rx="22" ry="54" fill={colors.body}   transform="rotate(-12 238 230)" />
      <ellipse cx="244" cy="234" rx="13" ry="40" fill={colors.accent} transform="rotate(-12 244 234)" opacity="0.55" />

      {/* ── SCARF ── */}
      <ellipse cx="160" cy="168" rx="72" ry="18" fill={colors.scarf} />
      <ellipse cx="160" cy="174" rx="68" ry="12" fill={colors.scarf} opacity="0.6" />
      <ellipse cx="160" cy="168" rx="72" ry="6" fill="white" opacity="0.18" />
      <ellipse cx="96"  cy="172" rx="18" ry="14" fill={colors.scarf} transform="rotate(-15 96 172)" />
      <ellipse cx="78"  cy="184" rx="12" ry="20" fill={colors.scarf} transform="rotate(-25 78 184)" />
      <ellipse cx="68"  cy="200" rx="10" ry="16" fill={colors.scarf} transform="rotate(-35 68 200)" opacity="0.85" />
      <line x1="88"  y1="160" x2="232" y2="160" stroke="white" strokeWidth="2.5" opacity="0.18" strokeLinecap="round" />
      <line x1="88"  y1="176" x2="232" y2="176" stroke="white" strokeWidth="2"   opacity="0.15" strokeLinecap="round" />

      {/* ── HEAD ── */}
      <ellipse cx="160" cy="116" rx="64" ry="60" fill={colors.body} />
      <ellipse cx="160" cy="124" rx="44" ry="46" fill={colors.belly} />

      {/* ── TEDDY BUMPS ── */}
      <circle cx="106" cy="72" r="20" fill={colors.body} />
      <circle cx="106" cy="72" r="12" fill={colors.accent} opacity="0.4" />
      <circle cx="214" cy="72" r="20" fill={colors.body} />
      <circle cx="214" cy="72" r="12" fill={colors.accent} opacity="0.4" />

      {/* ── EYES ── */}
      <circle cx="136" cy="108" r="19" fill="white" />
      <circle cx="184" cy="108" r="19" fill="white" />
      <circle cx="138" cy="110" r="13" fill={colors.accent} />
      <circle cx="186" cy="110" r="13" fill={colors.accent} />
      <circle cx="140" cy="112" r="7.5" fill="#0a0a1a" />
      <circle cx="188" cy="112" r="7.5" fill="#0a0a1a" />
      <circle cx="144" cy="107" r="3.2" fill="white" />
      <circle cx="137" cy="116" r="1.8" fill="white" opacity="0.75" />
      <circle cx="192" cy="107" r="3.2" fill="white" />
      <circle cx="185" cy="116" r="1.8" fill="white" opacity="0.75" />
      <line x1="122" y1="97"  x2="126" y2="91" stroke={colors.accent} strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
      <line x1="132" y1="92"  x2="133" y2="85" stroke={colors.accent} strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
      <line x1="141" y1="90"  x2="141" y2="83" stroke={colors.accent} strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
      <line x1="198" y1="97"  x2="194" y2="91" stroke={colors.accent} strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
      <line x1="188" y1="92"  x2="187" y2="85" stroke={colors.accent} strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
      <line x1="179" y1="90"  x2="179" y2="83" stroke={colors.accent} strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />

      {/* ── BEAK ── */}
      <ellipse cx="160" cy="136" rx="16" ry="10" fill={colors.beak} />
      <ellipse cx="160" cy="143" rx="13" ry="8"  fill={colors.beak} opacity="0.8" />
      <line x1="148" y1="138" x2="172" y2="138" stroke={colors.accent} strokeWidth="1.8" strokeLinecap="round" opacity="0.4" />
      <ellipse cx="155" cy="134" rx="5" ry="3" fill="white" opacity="0.25" />

      {/* ── CHEEK BLUSH ── */}
      <ellipse cx="118" cy="128" rx="16" ry="10" fill="#ff9eb5" opacity="0.32" />
      <ellipse cx="202" cy="128" rx="16" ry="10" fill="#ff9eb5" opacity="0.32" />

      {/* ── SMILE ── */}
      <path d="M 148 150 Q 160 162 172 150" stroke={colors.beak} strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.7" />

      {/* ── DECORATIVE ── */}
      <text x="46"  y="200" fontSize="13" opacity="0.38" fill={colors.belly}>❄</text>
      <text x="260" y="195" fontSize="11" opacity="0.32" fill={colors.belly}>❄</text>
      <text x="145" y="346" fontSize="10" opacity="0.28" fill={colors.belly}>❄</text>
      <text x="54"  y="270" fontSize="9"  opacity="0.22" fill={colors.belly}>✦</text>
      <text x="258" y="265" fontSize="9"  opacity="0.22" fill={colors.belly}>✦</text>
    </svg>
  );
}
