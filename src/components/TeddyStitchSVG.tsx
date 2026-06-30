import React from 'react';

export interface StitchColors {
  base: string;
  shadow: string;
  belly: string;
  nose: string;
  eye: string;
}

export function getStitchColors(colorName: string): StitchColors {
  const resolvedColor = (colorName || '').toLowerCase();
  
  if (resolvedColor.includes('pink') || resolvedColor.includes('cotton')) {
    return { base: "#E87EB8", shadow: "#C04A90", belly: "#F5C0DC", nose: "#6A1A45", eye: "#C03080" };
  }
  if (resolvedColor.includes('white') || resolvedColor.includes('polar')) {
    return { base: "#e4e4e7", shadow: "#a1a1aa", belly: "#fafafa", nose: "#3f3f46", eye: "#52525b" };
  }
  if (resolvedColor.includes('blue') || resolvedColor.includes('classic')) {
    return { base: "#4A90D9", shadow: "#2A5FA8", belly: "#A8CDEF", nose: "#1A2F5A", eye: "#1A6BC4" };
  }
  if (resolvedColor.includes('midnight') || resolvedColor.includes('dark')) {
    return { base: "#1E3A6E", shadow: "#0D1F3C", belly: "#3A6EA8", nose: "#050D1A", eye: "#0A2A5A" };
  }
  if (resolvedColor.includes('purple') || resolvedColor.includes('grape') || resolvedColor.includes('galaxy')) {
    return { base: "#8B68D4", shadow: "#5A3AA8", belly: "#C4AEEC", nose: "#2A1060", eye: "#5A2AB8" };
  }
  if (resolvedColor.includes('beige') || resolvedColor.includes('cream')) {
    return { base: "#e8e0d0", shadow: "#c8b898", belly: "#f5f0e0", nose: "#78350f", eye: "#5a2d0c" };
  }
  if (resolvedColor.includes('gold') || resolvedColor.includes('caramel') || resolvedColor.includes('yellow')) {
    return { base: "#fbbf24", shadow: "#d97706", belly: "#fef3c7", nose: "#78350f", eye: "#b45309" };
  }
  if (resolvedColor.includes('black')) {
    return { base: "#3f3f46", shadow: "#18181b", belly: "#71717a", nose: "#09090b", eye: "#18181b" };
  }
  if (resolvedColor.includes('green') || resolvedColor.includes('mint') || resolvedColor.includes('lime')) {
    return { base: "#5ABFA8", shadow: "#2E8C78", belly: "#A0DDD4", nose: "#0E3D35", eye: "#1A8070" };
  }
  if (resolvedColor.includes('grey') || resolvedColor.includes('gray')) {
    return { base: "#9ca3af", shadow: "#4b5563", belly: "#e5e7eb", nose: "#111827", eye: "#1f2937" };
  }
  if (resolvedColor.includes('brown')) {
    return { base: "#b45309", shadow: "#78350f", belly: "#ffedd5", nose: "#451a03", eye: "#451a03" };
  }
  if (resolvedColor.includes('orange') || resolvedColor.includes('sunset')) {
    return { base: "#E8784A", shadow: "#B84A20", belly: "#F5B898", nose: "#5A1E08", eye: "#C04820" };
  }
  return { base: "#4A90D9", shadow: "#2A5FA8", belly: "#A8CDEF", nose: "#1A2F5A", eye: "#1A6BC4" };
}

export function TeddyStitchSVG({ colors, className, size }: { colors: StitchColors; className?: string; size?: number }) {
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
      <circle cx="248" cy="234" r="14" fill={colors.shadow} opacity="0.9" />
      <circle cx="248" cy="234" r="9"  fill={colors.base}  opacity="0.7" />

      {/* ── STITCH LARGE SIDED EARS (Stitch characteristic) ── */}
      {/* Left Ear */}
      <ellipse cx="65" cy="115" rx="46" ry="26" fill={colors.base} transform="rotate(-32 65 115)" />
      <ellipse cx="72" cy="118" rx="34" ry="18" fill={colors.belly} transform="rotate(-32 72 118)" opacity="0.8" />
      {/* Right Ear */}
      <ellipse cx="255" cy="115" rx="46" ry="26" fill={colors.base} transform="rotate(32 255 115)" />
      <ellipse cx="248" cy="118" rx="34" ry="18" fill={colors.belly} transform="rotate(32 248 118)" opacity="0.8" />

      {/* ── BODY ── */}
      <ellipse cx="160" cy="218" rx="90" ry="92" fill={colors.base} />
      <ellipse cx="158" cy="232" rx="56" ry="68" fill={colors.belly} />
      
      {/* Stitch lines */}
      <line x1="158" y1="172" x2="158" y2="292" stroke={colors.shadow} strokeWidth="1.3" strokeDasharray="5 4" strokeLinecap="round" opacity="0.25" />
      <circle cx="158" cy="256" r="7"   fill={colors.shadow} opacity="0.22" />
      <circle cx="158" cy="256" r="3.5" fill={colors.shadow} opacity="0.2"  />

      {/* ── LEGS ── */}
      <ellipse cx="112" cy="282" rx="30" ry="36" fill={colors.base} />
      <ellipse cx="106" cy="308" rx="32" ry="15" fill={colors.belly} />
      <circle cx="90"  cy="303" r="8" fill={colors.belly} />
      <circle cx="106" cy="300" r="8" fill={colors.belly} />
      <circle cx="122" cy="303" r="8" fill={colors.belly} />
      <ellipse cx="106" cy="308" rx="16" ry="8" fill={colors.shadow} opacity="0.25" />

      <ellipse cx="208" cy="282" rx="30" ry="36" fill={colors.base} />
      <ellipse cx="214" cy="308" rx="32" ry="15" fill={colors.belly} />
      <circle cx="198" cy="303" r="8" fill={colors.belly} />
      <circle cx="214" cy="300" r="8" fill={colors.belly} />
      <circle cx="230" cy="303" r="8" fill={colors.belly} />
      <ellipse cx="214" cy="308" rx="16" ry="8" fill={colors.shadow} opacity="0.25" />

      {/* ── ARMS ── */}
      <ellipse cx="82"  cy="210" rx="24" ry="42" fill={colors.base} transform="rotate(15 82 210)" />
      <circle  cx="62"  cy="240" r="18"  fill={colors.base} />
      <circle  cx="62"  cy="244" r="11"  fill={colors.belly} opacity="0.8" />
      <circle  cx="62"  cy="245" r="5.5" fill={colors.shadow} opacity="0.28" />

      <ellipse cx="238" cy="210" rx="24" ry="42" fill={colors.base} transform="rotate(-15 238 210)" />
      <circle  cx="258" cy="240" r="18"  fill={colors.base} />
      <circle  cx="258" cy="244" r="11"  fill={colors.belly} opacity="0.8" />
      <circle  cx="258" cy="245" r="5.5" fill={colors.shadow} opacity="0.28" />

      {/* ── HEAD ── */}
      <ellipse cx="158" cy="118" rx="72" ry="68" fill={colors.base} />

      {/* Tuft of hair on head */}
      <path d="M 158 50 Q 158 40 152 35 Q 162 38 160 50" fill={colors.base} />

      {/* ── WIDE STITCH SNOUT / MUZZLE ── */}
      <ellipse cx="158" cy="148" rx="34" ry="24" fill={colors.belly} />
      <ellipse cx="158" cy="136" rx="16" ry="12" fill={colors.nose} />
      <ellipse cx="153" cy="132" rx="6"  ry="4.5" fill="white" opacity="0.35" />

      {/* Smile path */}
      <path d="M 144 150 Q 158 164 172 150" stroke={colors.nose} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />

      {/* ── WIDE ALIEN EYES ── */}
      <circle cx="130" cy="104" r="20" fill="white" />
      <circle cx="186" cy="104" r="20" fill="white" />
      <circle cx="132" cy="106" r="14" fill={colors.eye} />
      <circle cx="188" cy="106" r="14" fill={colors.eye} />
      <circle cx="134" cy="108" r="8"  fill="#0a0a18" />
      <circle cx="190" cy="108" r="8"  fill="#0a0a18" />
      <circle cx="138" cy="103" r="3.5" fill="white" />
      <circle cx="130" cy="113" r="2"   fill="white" opacity="0.7" />
      <circle cx="194" cy="103" r="3.5" fill="white" />
      <circle cx="186" cy="113" r="2"   fill="white" opacity="0.7" />

      {/* Eyelashes / Eyebrows */}
      <path d="M 116 88 Q 130 80 144 88" stroke={colors.shadow} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.55" />
      <path d="M 172 88 Q 186 80 200 88" stroke={colors.shadow} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.55" />

      {/* Cheek blush */}
      <ellipse cx="108" cy="124" rx="18" ry="12" fill="#ff9eb5" opacity="0.30" />
      <ellipse cx="208" cy="124" rx="18" ry="12" fill="#ff9eb5" opacity="0.30" />

      {/* Decorative Sparkles */}
      <text x="248" y="170" fontSize="12" opacity="0.35" fill={colors.belly}>✦</text>
      <text x="40"  y="175" fontSize="10" opacity="0.30" fill={colors.belly}>✦</text>
      <text x="150" y="328" fontSize="9"  opacity="0.25" fill={colors.belly}>✦</text>
    </svg>
  );
}
