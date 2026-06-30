import React from 'react';

export interface UnicornColors {
  body: string;
  belly: string;
  horn: string;
  mane: string;
  accent: string;
}

export function getUnicornColors(colorName: string): UnicornColors {
  const resolvedColor = (colorName || '').toLowerCase();
  
  if (resolvedColor.includes('pink')) {
    return { body: "#f4a7c3", belly: "#fde8f2", horn: "#f9d97e", mane: "#c78fd4", accent: "#b05fa0" };
  }
  if (resolvedColor.includes('white')) {
    return { body: "#e4e4e7", belly: "#fafafa", horn: "#fbbf24", mane: "#fda4af", accent: "#52525b" };
  }
  if (resolvedColor.includes('blue')) {
    return { body: "#6db8e8", belly: "#d0ecfc", horn: "#f9e97e", mane: "#4a90d4", accent: "#1e5fa0" };
  }
  if (resolvedColor.includes('purple')) {
    return { body: "#a98be0", belly: "#e2d8f8", horn: "#f9d97e", mane: "#7a5cc8", accent: "#4e30a0" };
  }
  if (resolvedColor.includes('beige') || resolvedColor.includes('cream')) {
    return { body: "#fef3c7", belly: "#fffbeb", horn: "#fde047", mane: "#f0a29e", accent: "#b45309" };
  }
  if (resolvedColor.includes('gold') || resolvedColor.includes('caramel') || resolvedColor.includes('yellow')) {
    return { body: "#f0c040", belly: "#fdf0b0", horn: "#e8a020", mane: "#c89010", accent: "#906000" };
  }
  if (resolvedColor.includes('black')) {
    return { body: "#3f3f46", belly: "#71717a", horn: "#fbbf24", mane: "#a1a1aa", accent: "#09090b" };
  }
  if (resolvedColor.includes('green')) {
    return { body: "#6dd4b8", belly: "#c8f5ea", horn: "#f9e07e", mane: "#3db89a", accent: "#1a8a6e" };
  }
  if (resolvedColor.includes('grey') || resolvedColor.includes('gray')) {
    return { body: "#7090c8", belly: "#c8d8f0", horn: "#f9d97e", mane: "#4060a0", accent: "#203870" };
  }
  if (resolvedColor.includes('brown')) {
    return { body: "#b45309", belly: "#ffedd5", horn: "#fde047", mane: "#78350f", accent: "#451a03" };
  }
  if (resolvedColor.includes('red')) {
    return { body: "#e05c8a", belly: "#f8c8da", horn: "#f9e07e", mane: "#b03060", accent: "#7a1040" };
  }
  return { body: "#f4a7c3", belly: "#fde8f2", horn: "#f9d97e", mane: "#c78fd4", accent: "#b05fa0" };
}

export function TeddyUnicornSVG({ colors, className, size }: { colors: UnicornColors; className?: string; size?: number }) {
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
      <ellipse cx="262" cy="218" rx="22" ry="36" fill={colors.mane} transform="rotate(30 262 218)" opacity="0.95" />
      <ellipse cx="274" cy="234" rx="16" ry="28" fill={colors.body} transform="rotate(40 274 234)" opacity="0.85" />
      <ellipse cx="258" cy="225" rx="14" ry="22" fill={colors.mane} transform="rotate(20 258 225)" opacity="0.7" />
      <ellipse cx="278" cy="248" rx="10" ry="16" fill={colors.mane} transform="rotate(55 278 248)" opacity="0.8" />

      {/* ── BODY ── */}
      <ellipse cx="162" cy="210" rx="88" ry="88" fill={colors.body} />
      <ellipse cx="158" cy="224" rx="54" ry="64" fill={colors.belly} />
      <line x1="158" y1="168" x2="158" y2="278" stroke={colors.accent} strokeWidth="1.2" strokeDasharray="5 4" strokeLinecap="round" opacity="0.3" />

      {/* ── LEGS ── */}
      <ellipse cx="118" cy="272" rx="26" ry="32" fill={colors.body} />
      <ellipse cx="112" cy="295" rx="28" ry="13" fill={colors.accent} />
      <circle cx="97"  cy="291" r="7" fill={colors.accent} />
      <circle cx="112" cy="288" r="7" fill={colors.accent} />
      <circle cx="127" cy="291" r="7" fill={colors.accent} />

      <ellipse cx="206" cy="272" rx="26" ry="32" fill={colors.body} />
      <ellipse cx="212" cy="295" rx="28" ry="13" fill={colors.accent} />
      <circle cx="197" cy="291" r="7" fill={colors.accent} />
      <circle cx="212" cy="288" r="7" fill={colors.accent} />
      <circle cx="227" cy="291" r="7" fill={colors.accent} />

      {/* ── ARMS ── */}
      <ellipse cx="92"  cy="206" rx="20" ry="32" fill={colors.body} transform="rotate(18 92 206)" />
      <circle cx="76"   cy="224" r="15" fill={colors.body} />
      <circle cx="76"   cy="227" r="9"  fill={colors.accent} opacity="0.65" />
      <circle cx="69"   cy="220" r="5"  fill={colors.accent} opacity="0.55" />
      <circle cx="83"   cy="220" r="5"  fill={colors.accent} opacity="0.55" />

      <ellipse cx="233" cy="206" rx="20" ry="32" fill={colors.body} transform="rotate(-18 233 206)" />
      <circle cx="249"  cy="224" r="15" fill={colors.body} />
      <circle cx="249"  cy="227" r="9"  fill={colors.accent} opacity="0.65" />
      <circle cx="242"  cy="220" r="5"  fill={colors.accent} opacity="0.55" />
      <circle cx="256"  cy="220" r="5"  fill={colors.accent} opacity="0.55" />

      {/* ── HEAD ── */}
      <ellipse cx="155" cy="118" rx="64" ry="60" fill={colors.body} />

      {/* ── MANE ── */}
      <circle cx="104" cy="76"  r="20" fill={colors.mane} opacity="0.95" />
      <circle cx="122" cy="60"  r="22" fill={colors.mane} opacity="0.9" />
      <circle cx="145" cy="52"  r="20" fill={colors.mane} opacity="0.85" />
      <circle cx="168" cy="55"  r="18" fill={colors.mane} opacity="0.8" />
      <circle cx="188" cy="64"  r="16" fill={colors.mane} opacity="0.75" />
      <circle cx="100" cy="90"  r="18" fill={colors.mane} opacity="0.9" />
      <circle cx="88"  cy="106" r="15" fill={colors.mane} opacity="0.8" />
      <circle cx="86"  cy="122" r="13" fill={colors.mane} opacity="0.7" />
      <circle cx="92"  cy="136" r="11" fill={colors.mane} opacity="0.6" />
      <circle cx="108" cy="70"  r="10" fill={colors.belly} opacity="0.35" />
      <circle cx="128" cy="56"  r="11" fill={colors.belly} opacity="0.3" />
      <circle cx="150" cy="50"  r="9"  fill={colors.belly} opacity="0.28" />

      {/* ── HORN ── */}
      <ellipse cx="174" cy="62" rx="14" ry="6" fill={colors.horn} opacity="0.3" />
      <polygon points="174,10 162,64 186,64" fill={colors.horn} />
      <line x1="168" y1="56" x2="172" y2="32" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
      <line x1="175" y1="58" x2="178" y2="36" stroke="white" strokeWidth="2"   strokeLinecap="round" opacity="0.4" />
      <circle cx="174" cy="10" r="3.5" fill="white" opacity="0.85" />
      <line x1="174" y1="4"  x2="174" y2="17" stroke={colors.horn} strokeWidth="1.5" opacity="0.7" />
      <line x1="168" y1="10" x2="180" y2="10" stroke={colors.horn} strokeWidth="1.5" opacity="0.7" />

      {/* ── EARS ── */}
      <circle cx="108" cy="76"  r="20" fill={colors.body} />
      <circle cx="108" cy="76"  r="12" fill={colors.belly} opacity="0.75" />
      <circle cx="200" cy="76"  r="20" fill={colors.body} />
      <circle cx="200" cy="76"  r="12" fill={colors.belly} opacity="0.75" />

      {/* ── SNOUT ── */}
      <ellipse cx="155" cy="142" rx="34" ry="24" fill={colors.belly} />
      <ellipse cx="145" cy="138" rx="5.5" ry="4.5" fill={colors.accent} opacity="0.5" />
      <ellipse cx="165" cy="138" rx="5.5" ry="4.5" fill={colors.accent} opacity="0.5" />
      <path d="M 138 150 Q 155 165 172 150" stroke={colors.accent} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.75" />

      {/* ── EYES ── */}
      <circle cx="130" cy="112" r="17" fill="white" />
      <circle cx="180" cy="112" r="17" fill="white" />
      <circle cx="132" cy="114" r="11" fill={colors.accent} />
      <circle cx="182" cy="114" r="11" fill={colors.accent} />
      <circle cx="134" cy="115" r="6.5" fill="#1a1030" />
      <circle cx="184" cy="115" r="6.5" fill="#1a1030" />
      <circle cx="138" cy="110" r="3"   fill="white" />
      <circle cx="131" cy="118" r="1.8" fill="white" opacity="0.7" />
      <circle cx="188" cy="110" r="3"   fill="white" />
      <circle cx="181" cy="118" r="1.8" fill="white" opacity="0.7" />
      <line x1="118" y1="100" x2="122" y2="96" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="126" y1="96"  x2="128" y2="91" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="134" y1="95"  x2="134" y2="90" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="192" y1="100" x2="188" y2="96" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="184" y1="96"  x2="182" y2="91" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="176" y1="95"  x2="176" y2="90" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" opacity="0.7" />

      {/* ── CHEEK BLUSH ── */}
      <ellipse cx="110" cy="130" rx="16" ry="10" fill="#ff9eb5" opacity="0.32" />
      <ellipse cx="200" cy="130" rx="16" ry="10" fill="#ff9eb5" opacity="0.32" />

      {/* ── TUMMY BUTTON ── */}
      <circle cx="158" cy="230" r="6.5" fill={colors.accent} opacity="0.35" />
      <circle cx="158" cy="230" r="3.5" fill={colors.accent} opacity="0.28" />

      {/* ── STARS ── */}
      <text x="68"  y="178" fontSize="13" opacity="0.55" fill={colors.horn}>✦</text>
      <text x="238" y="172" fontSize="11" opacity="0.45" fill={colors.horn}>✦</text>
      <text x="144" y="300" fontSize="10" opacity="0.4"  fill={colors.horn}>✦</text>
      <text x="190" y="310" fontSize="8"  opacity="0.35" fill={colors.horn}>✦</text>
    </svg>
  );
}
