import React from 'react';

export interface BearColors {
  body: string;
  belly: string;
  ear: string;
  nose: string;
  accent: string;
  patch: string;
}

export function getBearColors(colorName: string): BearColors {
  const resolvedColor = (colorName || '').toLowerCase();
  
  if (resolvedColor.includes('pink')) {
    return { body: "#b04878", belly: "#f8d0e4", ear: "#883060", nose: "#4a1030", accent: "#701848", patch: "#d878a0" };
  }
  if (resolvedColor.includes('white') || resolvedColor.includes('polar')) {
    return { body: "#e8e4d8", belly: "#fff8f0", ear: "#c8c0b0", nose: "#7a6858", accent: "#6a5848", patch: "#f0ece0" };
  }
  if (resolvedColor.includes('blue') || resolvedColor.includes('blueberry')) {
    return { body: "#5a6ea8", belly: "#d8e0f8", ear: "#3a508a", nose: "#1a2848", accent: "#283878", patch: "#8898c8" };
  }
  if (resolvedColor.includes('purple')) {
    return { body: "#7c3aed", belly: "#edd8f8", ear: "#5b21b6", nose: "#1e1b4b", accent: "#4c1d95", patch: "#c084fc" };
  }
  if (resolvedColor.includes('beige') || resolvedColor.includes('cream')) {
    return { body: "#e8e0d0", belly: "#f5f0e0", ear: "#d8d0b8", nose: "#c8b898", accent: "#78350f", patch: "#d8d0c0" };
  }
  if (resolvedColor.includes('gold') || resolvedColor.includes('caramel') || resolvedColor.includes('yellow') || resolvedColor.includes('honey')) {
    return { body: "#e0a030", belly: "#fdecc0", ear: "#c07810", nose: "#6a3308", accent: "#8a5000", patch: "#f0c860" };
  }
  if (resolvedColor.includes('black') || resolvedColor.includes('panda')) {
    return { body: "#2a2a2a", belly: "#f5f5f5", ear: "#1a1a1a", nose: "#1a1a1a", accent: "#111111", patch: "#e8e8e8" };
  }
  if (resolvedColor.includes('green') || resolvedColor.includes('matcha')) {
    return { body: "#6a9a60", belly: "#d0eecc", ear: "#488040", nose: "#204818", accent: "#386030", patch: "#90c080" };
  }
  if (resolvedColor.includes('grey') || resolvedColor.includes('gray')) {
    return { body: "#9ca3af", belly: "#f3f4f6", ear: "#4b5563", nose: "#111827", accent: "#1f2937", patch: "#d1d5db" };
  }
  if (resolvedColor.includes('brown') || resolvedColor.includes('cinnamon')) {
    return { body: "#a0522d", belly: "#f0cba8", ear: "#7a3818", nose: "#3a1408", accent: "#5a2810", patch: "#c87848" };
  }
  if (resolvedColor.includes('red')) {
    return { body: "#ef4444", belly: "#fee2e2", ear: "#b91c1c", nose: "#7f1d1d", accent: "#991b1b", patch: "#fca5a5" };
  }
  return { body: "#c8913a", belly: "#f5dfa8", ear: "#a86e20", nose: "#5a2d0c", accent: "#7a4810", patch: "#e8b870" };
}

export function TeddyBearSVG({ colors, className, size }: { colors: BearColors; className?: string; size?: number }) {
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
      <circle cx="248" cy="234" r="14" fill={colors.patch} opacity="0.9" />
      <circle cx="248" cy="234" r="9"  fill={colors.body}  opacity="0.7" />

      {/* ── BODY ── */}
      <ellipse cx="160" cy="218" rx="90" ry="92" fill={colors.body} />
      <ellipse cx="158" cy="232" rx="56" ry="68" fill={colors.belly} />
      <line x1="158" y1="172" x2="158" y2="292" stroke={colors.accent} strokeWidth="1.3" strokeDasharray="5 4" strokeLinecap="round" opacity="0.25" />
      <line x1="128" y1="208" x2="188" y2="208" stroke={colors.accent} strokeWidth="1" strokeDasharray="4 4" strokeLinecap="round" opacity="0.18" />
      <line x1="120" y1="232" x2="196" y2="232" stroke={colors.accent} strokeWidth="1" strokeDasharray="4 4" strokeLinecap="round" opacity="0.15" />
      <circle cx="158" cy="256" r="7"   fill={colors.accent} opacity="0.22" />
      <circle cx="158" cy="256" r="3.5" fill={colors.accent} opacity="0.2"  />

      {/* ── LEGS ── */}
      <ellipse cx="112" cy="282" rx="30" ry="36" fill={colors.body} />
      <ellipse cx="106" cy="308" rx="32" ry="15" fill={colors.patch} />
      <circle cx="90"  cy="303" r="8" fill={colors.patch} />
      <circle cx="106" cy="300" r="8" fill={colors.patch} />
      <circle cx="122" cy="303" r="8" fill={colors.patch} />
      <ellipse cx="106" cy="308" rx="16" ry="8" fill={colors.accent} opacity="0.25" />
      <circle cx="93"  cy="303" r="4" fill={colors.accent} opacity="0.2" />
      <circle cx="106" cy="300" r="4" fill={colors.accent} opacity="0.2" />
      <circle cx="119" cy="303" r="4" fill={colors.accent} opacity="0.2" />

      <ellipse cx="208" cy="282" rx="30" ry="36" fill={colors.body} />
      <ellipse cx="214" cy="308" rx="32" ry="15" fill={colors.patch} />
      <circle cx="198" cy="303" r="8" fill={colors.patch} />
      <circle cx="214" cy="300" r="8" fill={colors.patch} />
      <circle cx="230" cy="303" r="8" fill={colors.patch} />
      <ellipse cx="214" cy="308" rx="16" ry="8" fill={colors.accent} opacity="0.25" />
      <circle cx="201" cy="303" r="4" fill={colors.accent} opacity="0.2" />
      <circle cx="214" cy="300" r="4" fill={colors.accent} opacity="0.2" />
      <circle cx="227" cy="303" r="4" fill={colors.accent} opacity="0.2" />

      {/* ── ARMS ── */}
      <ellipse cx="82"  cy="210" rx="24" ry="42" fill={colors.body} transform="rotate(15 82 210)" />
      <circle  cx="62"  cy="240" r="18"  fill={colors.body} />
      <circle  cx="62"  cy="244" r="11"  fill={colors.patch} opacity="0.8" />
      <circle  cx="52"  cy="237" r="6"   fill={colors.patch} opacity="0.75" />
      <circle  cx="66"  cy="233" r="6"   fill={colors.patch} opacity="0.75" />
      <circle  cx="76"  cy="240" r="5.5" fill={colors.patch} opacity="0.7" />
      <circle  cx="62"  cy="245" r="5.5" fill={colors.accent} opacity="0.28" />
      <circle  cx="54"  cy="238" r="3"   fill={colors.accent} opacity="0.22" />
      <circle  cx="67"  cy="234" r="3"   fill={colors.accent} opacity="0.22" />

      <ellipse cx="238" cy="210" rx="24" ry="42" fill={colors.body} transform="rotate(-15 238 210)" />
      <circle  cx="258" cy="240" r="18"  fill={colors.body} />
      <circle  cx="258" cy="244" r="11"  fill={colors.patch} opacity="0.8" />
      <circle  cx="248" cy="237" r="6"   fill={colors.patch} opacity="0.75" />
      <circle  cx="262" cy="233" r="6"   fill={colors.patch} opacity="0.75" />
      <circle  cx="272" cy="240" r="5.5" fill={colors.patch} opacity="0.7" />
      <circle  cx="258" cy="245" r="5.5" fill={colors.accent} opacity="0.28" />
      <circle  cx="250" cy="238" r="3"   fill={colors.accent} opacity="0.22" />
      <circle  cx="263" cy="234" r="3"   fill={colors.accent} opacity="0.22" />

      {/* ── HEAD ── */}
      <ellipse cx="158" cy="118" rx="72" ry="68" fill={colors.body} />

      {/* ── EARS ── */}
      <circle cx="98"  cy="66" r="28" fill={colors.body} />
      <circle cx="98"  cy="66" r="18" fill={colors.ear}  />
      <circle cx="98"  cy="66" r="10" fill={colors.belly} opacity="0.6" />

      <circle cx="218" cy="66" r="28" fill={colors.body} />
      <circle cx="218" cy="66" r="18" fill={colors.ear}  />
      <circle cx="218" cy="66" r="10" fill={colors.belly} opacity="0.6" />

      {/* ── MUZZLE & NOSE ── */}
      <ellipse cx="158" cy="148" rx="40" ry="30" fill={colors.patch} />
      <ellipse cx="152" cy="140" rx="18" ry="10" fill="white" opacity="0.18" />
      <ellipse cx="158" cy="136" rx="14" ry="11" fill={colors.nose} />
      <ellipse cx="153" cy="132" rx="5" ry="3.5" fill="white" opacity="0.35" />
      <ellipse cx="162" cy="130" rx="3" ry="2"   fill="white" opacity="0.2"  />

      {/* ── SMILE ── */}
      <path d="M 146 152 Q 158 166 170 152" stroke={colors.nose} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
      <line x1="158" y1="147" x2="158" y2="155" stroke={colors.nose} strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />

      {/* ── EYES ── */}
      <circle cx="130" cy="104" r="20" fill="white" />
      <circle cx="186" cy="104" r="20" fill="white" />
      <circle cx="132" cy="106" r="14" fill={colors.accent} />
      <circle cx="188" cy="106" r="14" fill={colors.accent} />
      <circle cx="134" cy="108" r="8"  fill="#0a0a18" />
      <circle cx="190" cy="108" r="8"  fill="#0a0a18" />
      <circle cx="138" cy="103" r="3.5" fill="white" />
      <circle cx="130" cy="113" r="2"   fill="white" opacity="0.7" />
      <circle cx="194" cy="103" r="3.5" fill="white" />
      <circle cx="186" cy="113" r="2"   fill="white" opacity="0.7" />

      {/* ── EYEBROWS & LASHES ── */}
      <path d="M 116 88 Q 130 80 144 88" stroke={colors.accent} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.55" />
      <path d="M 172 88 Q 186 80 200 88" stroke={colors.accent} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.55" />
      <line x1="115" y1="95"  x2="119" y2="89" stroke={colors.accent} strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
      <line x1="125" y1="89"  x2="126" y2="82" stroke={colors.accent} strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
      <line x1="136" y1="86"  x2="136" y2="79" stroke={colors.accent} strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
      <line x1="201" y1="95"  x2="197" y2="89" stroke={colors.accent} strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
      <line x1="191" y1="89"  x2="190" y2="82" stroke={colors.accent} strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
      <line x1="180" y1="86"  x2="180" y2="79" stroke={colors.accent} strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />

      {/* ── CHEEK BLUSH ── */}
      <ellipse cx="108" cy="124" rx="18" ry="12" fill="#ff9eb5" opacity="0.30" />
      <ellipse cx="208" cy="124" rx="18" ry="12" fill="#ff9eb5" opacity="0.30" />

      {/* ── HONEY POT ACC ── */}
      <ellipse cx="72" cy="230" rx="18" ry="20" fill="#e8b050" opacity="0.9" />
      <rect    x="58"  y="212" width="28" height="6" rx="3" fill="#c88828" opacity="0.9" />
      <path d="M 68 250 Q 66 258 70 264 Q 74 270 76 262 Q 78 256 76 250" fill="#f0c840" opacity="0.85" />
      <ellipse cx="72" cy="230" rx="11" ry="12" fill="#f0c840" opacity="0.5" />
      <ellipse cx="64" cy="220" rx="5"  ry="7"  fill="white" opacity="0.2" />
      <text x="66" y="233" fontSize="8" fill={colors.accent} opacity="0.7" fontFamily="serif">🍯</text>

      {/* ── DECORATIVE ── */}
      <text x="248" y="170" fontSize="12" opacity="0.35" fill={colors.patch}>✦</text>
      <text x="40"  y="175" fontSize="10" opacity="0.30" fill={colors.patch}>✦</text>
      <text x="150" y="328" fontSize="9"  opacity="0.25" fill={colors.patch}>✦</text>
    </svg>
  );
}
