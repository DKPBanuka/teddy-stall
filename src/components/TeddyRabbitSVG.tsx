import React from 'react';

export interface RabbitColors {
  base: string;
  shadow: string;
  belly: string;
  nose: string;
  innerEar: string;
  eye: string;
}

export function getRabbitColors(colorName: string): RabbitColors {
  const resolvedColor = (colorName || '').toLowerCase();
  
  if (resolvedColor.includes('bubblegum') || (resolvedColor.includes('pink') && !resolvedColor.includes('sakura'))) {
    return { base: "#F4A7C0", shadow: "#D4749A", belly: "#FDE8F0", nose: "#B83A70", innerEar: "#FFD0E4", eye: "#6A1A40" };
  }
  if (resolvedColor.includes('sky') || resolvedColor.includes('blue')) {
    return { base: "#A8C8E8", shadow: "#6A9AC4", belly: "#DCF0FC", nose: "#C46090", innerEar: "#E0C8F0", eye: "#1A3A60" };
  }
  if (resolvedColor.includes('mint') || resolvedColor.includes('green')) {
    return { base: "#A8D8C8", shadow: "#5A9E88", belly: "#E0F5EE", nose: "#8B4A6A", innerEar: "#C8ECDC", eye: "#1A3A2E" };
  }
  if (resolvedColor.includes('lavender') || resolvedColor.includes('purple')) {
    return { base: "#C4B0E0", shadow: "#8A6AB8", belly: "#EEE8F8", nose: "#C46090", innerEar: "#E8D8F8", eye: "#2A1A50" };
  }
  if (resolvedColor.includes('honey') || resolvedColor.includes('caramel') || resolvedColor.includes('amber') || resolvedColor.includes('yellow') || resolvedColor.includes('gold')) {
    return { base: "#E8C07A", shadow: "#B88A38", belly: "#FDF0D0", nose: "#B84A20", innerEar: "#F8D8A0", eye: "#3A1E08" };
  }
  if (resolvedColor.includes('berry') || resolvedColor.includes('rose')) {
    return { base: "#C07898", shadow: "#8A4068", belly: "#F0D0DC", nose: "#8A2050", innerEar: "#E8B0C8", eye: "#2A0818" };
  }
  if (resolvedColor.includes('midnight') || resolvedColor.includes('velvet') || resolvedColor.includes('dark') || resolvedColor.includes('black')) {
    return { base: "#4A3A6A", shadow: "#20183A", belly: "#7A68A8", nose: "#D070A0", innerEar: "#7850A0", eye: "#C0A8E8" };
  }
  if (resolvedColor.includes('sakura')) {
    return { base: "#F0C0C8", shadow: "#D88898", belly: "#FDE8EC", nose: "#D04868", innerEar: "#FADCE2", eye: "#5A1A28" };
  }
  if (resolvedColor.includes('ocean') || resolvedColor.includes('mist') || resolvedColor.includes('cyan')) {
    return { base: "#88C0C8", shadow: "#3A8090", belly: "#D0EDF0", nose: "#A04878", innerEar: "#B8E0E8", eye: "#0A2830" };
  }
  
  // Default: Snow Bunny
  return { base: "#EDE0D4", shadow: "#C4A898", belly: "#FAF5F0", nose: "#E8829A", innerEar: "#F5B8C8", eye: "#3A2A1E" };
}

export function TeddyRabbitSVG({ colors, className, size }: { colors: RabbitColors; className?: string; size?: number }) {
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
      <circle cx="246" cy="226" r="16" fill={colors.innerEar} opacity="0.9" />
      <circle cx="246" cy="226" r="10" fill={colors.base} opacity="0.7" />

      {/* ── LONG upright ears ── */}
      {/* Left Ear */}
      <ellipse cx="120" cy="54" rx="16" ry="46" fill={colors.base} />
      <ellipse cx="120" cy="58" rx="9"  ry="32" fill={colors.innerEar} opacity="0.85" />
      {/* Right Ear */}
      <ellipse cx="196" cy="54" rx="16" ry="46" fill={colors.base} />
      <ellipse cx="196" cy="58" rx="9"  ry="32" fill={colors.innerEar} opacity="0.85" />

      {/* ── BODY ── */}
      <ellipse cx="160" cy="208" rx="88" ry="86" fill={colors.base} />
      <ellipse cx="158" cy="220" rx="54" ry="60" fill={colors.belly} />
      <line x1="158" y1="164" x2="158" y2="274" stroke={colors.shadow} strokeWidth="1.2" strokeDasharray="5 4" strokeLinecap="round" opacity="0.35" />

      {/* ── LEGS ── */}
      <ellipse cx="112" cy="268" rx="28" ry="34" fill={colors.base} />
      <ellipse cx="106" cy="292" rx="30" ry="14" fill={colors.innerEar} />
      <circle cx="91"  cy="288" r="7" fill={colors.innerEar} />
      <circle cx="106" cy="285" r="7" fill={colors.innerEar} />
      <circle cx="121" cy="288" r="7" fill={colors.innerEar} />

      <ellipse cx="204" cy="268" rx="28" ry="34" fill={colors.base} />
      <ellipse cx="210" cy="292" rx="30" ry="14" fill={colors.innerEar} />
      <circle cx="195" cy="288" r="7" fill={colors.innerEar} />
      <circle cx="210" cy="285" r="7" fill={colors.innerEar} />
      <circle cx="225" cy="288" r="7" fill={colors.innerEar} />

      {/* ── ARMS ── */}
      <ellipse cx="86"  cy="204" rx="18" ry="30" fill={colors.base} transform="rotate(18 86 204)" />
      <circle cx="71"   cy="222" r="14" fill={colors.base} />
      <circle cx="71"   cy="225" r="8.5" fill={colors.innerEar} opacity="0.7" />

      <ellipse cx="230" cy="204" rx="18" ry="30" fill={colors.base} transform="rotate(-18 230 204)" />
      <circle cx="245"  cy="222" r="14" fill={colors.base} />
      <circle cx="245"  cy="225" r="8.5" fill={colors.innerEar} opacity="0.7" />

      {/* ── HEAD ── */}
      <ellipse cx="158" cy="120" rx="66" ry="60" fill={colors.base} />

      {/* Snout */}
      <ellipse cx="158" cy="142" rx="32" ry="22" fill={colors.belly} />
      <ellipse cx="158" cy="133" rx="8"  ry="6.5" fill={colors.nose} />
      {/* smile */}
      <path d="M 144 148 Q 158 160 172 148" stroke={colors.shadow} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
      {/* whiskers */}
      <line x1="120" y1="144" x2="100" y2="140" stroke={colors.shadow} strokeWidth="1.2" opacity="0.45" />
      <line x1="120" y1="150" x2="98"  y2="152" stroke={colors.shadow} strokeWidth="1.2" opacity="0.45" />
      <line x1="196" y1="144" x2="216" y2="140" stroke={colors.shadow} strokeWidth="1.2" opacity="0.45" />
      <line x1="196" y1="150" x2="218" y2="152" stroke={colors.shadow} strokeWidth="1.2" opacity="0.45" />

      {/* ── EYES ── */}
      <circle cx="132" cy="112" r="17" fill="white" />
      <circle cx="184" cy="112" r="17" fill="white" />
      <circle cx="134" cy="114" r="11" fill={colors.eye} />
      <circle cx="186" cy="114" r="11" fill={colors.eye} />
      <circle cx="136" cy="115" r="6.5" fill="#1a1030" />
      <circle cx="188" cy="115" r="6.5" fill="#1a1030" />
      <circle cx="140" cy="110" r="3"   fill="white" />
      <circle cx="133" cy="118" r="1.8" fill="white" opacity="0.75" />
      <circle cx="192" cy="110" r="3"   fill="white" />
      <circle cx="185" cy="118" r="1.8" fill="white" opacity="0.75" />

      {/* Cheek blush */}
      <ellipse cx="112" cy="130" rx="15" ry="9" fill={colors.innerEar} opacity="0.45" />
      <ellipse cx="204" cy="130" rx="15" ry="9" fill={colors.innerEar} opacity="0.45" />

      {/* Tummy button */}
      <circle cx="158" cy="230" r="6" fill={colors.innerEar} opacity="0.4" />

      {/* Sparkles */}
      <text x="68"  y="178" fontSize="13" opacity="0.55" fill={colors.innerEar}>✦</text>
      <text x="238" y="172" fontSize="11" opacity="0.45" fill={colors.innerEar}>✦</text>
    </svg>
  );
}
