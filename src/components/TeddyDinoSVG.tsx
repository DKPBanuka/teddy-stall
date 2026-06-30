import React from 'react';

export interface DinoColors {
  body: string;
  belly: string;
  spikes: string;
  accent: string;
}

export function getDinoColors(colorName: string): DinoColors {
  const resolvedColor = (colorName || '').toLowerCase();
  
  if (resolvedColor.includes('pink')) {
    return { body: "#f472b6", belly: "#fbcfe8", spikes: "#db2777", accent: "#9d174d" };
  }
  if (resolvedColor.includes('white')) {
    return { body: "#e4e4e7", belly: "#fafafa", spikes: "#a1a1aa", accent: "#52525b" };
  }
  if (resolvedColor.includes('blue')) {
    return { body: "#60a5fa", belly: "#bfdbfe", spikes: "#2563eb", accent: "#1e3a8a" };
  }
  if (resolvedColor.includes('purple')) {
    return { body: "#c084fc", belly: "#e9d5ff", spikes: "#9333ea", accent: "#581c87" };
  }
  if (resolvedColor.includes('beige') || resolvedColor.includes('cream')) {
    return { body: "#fef3c7", belly: "#fffbeb", spikes: "#fde047", accent: "#b45309" };
  }
  if (resolvedColor.includes('gold') || resolvedColor.includes('caramel') || resolvedColor.includes('yellow')) {
    return { body: "#fbbf24", belly: "#fef3c7", spikes: "#d97706", accent: "#78350f" };
  }
  if (resolvedColor.includes('black')) {
    return { body: "#3f3f46", belly: "#71717a", spikes: "#18181b", accent: "#09090b" };
  }
  if (resolvedColor.includes('green')) {
    return { body: "#10b981", belly: "#a7f3d0", spikes: "#059669", accent: "#065f46" };
  }
  if (resolvedColor.includes('grey') || resolvedColor.includes('gray')) {
    return { body: "#9ca3af", belly: "#e5e7eb", spikes: "#4b5563", accent: "#1f2937" };
  }
  if (resolvedColor.includes('brown')) {
    return { body: "#b45309", belly: "#ffedd5", spikes: "#78350f", accent: "#451a03" };
  }
  if (resolvedColor.includes('red')) {
    return { body: "#ef4444", belly: "#fee2e2", spikes: "#dc2626", accent: "#7f1d1d" };
  }
  return { body: "#9ca3af", belly: "#e5e7eb", spikes: "#4b5563", accent: "#1f2937" };
}

export function TeddyDinoSVG({ colors, className, size }: { colors: DinoColors; className?: string; size?: number }) {
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
      <ellipse cx="258" cy="210" rx="28" ry="16" fill={colors.body} transform="rotate(-20 258 210)" />
      <ellipse cx="278" cy="222" rx="16" ry="10" fill={colors.body} transform="rotate(-30 278 222)" />
      <ellipse cx="293" cy="232" rx="9" ry="7" fill={colors.body} transform="rotate(-35 293 232)" />

      {/* ── BACK SPIKES ── */}
      {/* spike 1 */}
      <ellipse cx="120" cy="84" rx="11" ry="22" fill={colors.spikes} transform="rotate(-18 120 84)" />
      {/* spike 2 */}
      <ellipse cx="148" cy="68" rx="11" ry="24" fill={colors.spikes} transform="rotate(-5 148 68)" />
      {/* spike 3 */}
      <ellipse cx="178" cy="66" rx="10" ry="22" fill={colors.spikes} transform="rotate(10 178 66)" />
      {/* spike 4 */}
      <ellipse cx="205" cy="74" rx="9" ry="19" fill={colors.spikes} transform="rotate(22 205 74)" />

      {/* ── BODY ── */}
      <ellipse cx="165" cy="185" rx="82" ry="90" fill={colors.body} />

      {/* ── BELLY ── */}
      <ellipse cx="160" cy="200" rx="50" ry="62" fill={colors.belly} />

      {/* belly stitch lines (teddy detail) */}
      <line x1="160" y1="148" x2="160" y2="255" stroke={colors.spikes} strokeWidth="1.2" strokeDasharray="5 4" strokeLinecap="round" opacity="0.45" />

      {/* ── LEFT LEG ── */}
      <ellipse cx="115" cy="255" rx="28" ry="36" fill={colors.body} />
      {/* foot */}
      <ellipse cx="108" cy="278" rx="28" ry="14" fill={colors.accent} />
      {/* toe bumps */}
      <circle cx="92" cy="274" r="7" fill={colors.accent} />
      <circle cx="108" cy="272" r="7" fill={colors.accent} />
      <circle cx="124" cy="274" r="7" fill={colors.accent} />

      {/* ── RIGHT LEG ── */}
      <ellipse cx="210" cy="255" rx="28" ry="36" fill={colors.body} />
      {/* foot */}
      <ellipse cx="218" cy="278" rx="28" ry="14" fill={colors.accent} />
      {/* toe bumps */}
      <circle cx="202" cy="274" r="7" fill={colors.accent} />
      <circle cx="218" cy="272" r="7" fill={colors.accent} />
      <circle cx="234" cy="274" r="7" fill={colors.accent} />

      {/* ── LEFT ARM ── */}
      <ellipse cx="95" cy="190" rx="18" ry="30" fill={colors.body} transform="rotate(20 95 190)" />
      <circle cx="80" cy="210" r="14" fill={colors.body} />
      {/* paw pad */}
      <circle cx="80" cy="213" r="8" fill={colors.accent} opacity="0.7" />
      <circle cx="74" cy="207" r="4" fill={colors.accent} opacity="0.6" />
      <circle cx="86" cy="207" r="4" fill={colors.accent} opacity="0.6" />

      {/* ── RIGHT ARM ── */}
      <ellipse cx="232" cy="190" rx="18" ry="30" fill={colors.body} transform="rotate(-20 232 190)" />
      <circle cx="247" cy="210" r="14" fill={colors.body} />
      {/* paw pad */}
      <circle cx="247" cy="213" r="8" fill={colors.accent} opacity="0.7" />
      <circle cx="241" cy="207" r="4" fill={colors.accent} opacity="0.6" />
      <circle cx="253" cy="207" r="4" fill={colors.accent} opacity="0.6" />

      {/* ── HEAD ── */}
      <ellipse cx="155" cy="118" rx="62" ry="58" fill={colors.body} />

      {/* ── HEAD SPIKES ── */}
      <ellipse cx="118" cy="68" rx="8" ry="16" fill={colors.spikes} transform="rotate(-30 118 68)" />
      <ellipse cx="138" cy="60" rx="8" ry="17" fill={colors.spikes} transform="rotate(-10 138 60)" />
      <ellipse cx="160" cy="58" rx="8" ry="17" fill={colors.spikes} transform="rotate(5 160 58)" />
      <ellipse cx="181" cy="63" rx="7" ry="15" fill={colors.spikes} transform="rotate(22 181 63)" />

      {/* ── EARS (teddy rounded ears) ── */}
      <circle cx="107" cy="78" r="18" fill={colors.body} />
      <circle cx="107" cy="78" r="11" fill={colors.belly} opacity="0.8" />
      <circle cx="200" cy="78" r="18" fill={colors.body} />
      <circle cx="200" cy="78" r="11" fill={colors.belly} opacity="0.8" />

      {/* ── SNOUT ── */}
      <ellipse cx="155" cy="138" rx="32" ry="22" fill={colors.belly} />
      {/* nostrils */}
      <ellipse cx="146" cy="133" rx="5" ry="4" fill={colors.accent} opacity="0.6" />
      <ellipse cx="164" cy="133" rx="5" ry="4" fill={colors.accent} opacity="0.6" />

      {/* ── SMILE ── */}
      <path
        d="M 138 144 Q 155 158 172 144"
        stroke={colors.accent}
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />

      {/* ── EYES ── */}
      {/* left eye white */}
      <circle cx="131" cy="108" r="16" fill="white" />
      {/* right eye white */}
      <circle cx="178" cy="108" r="16" fill="white" />
      {/* left iris */}
      <circle cx="133" cy="110" r="10" fill={colors.accent} />
      {/* right iris */}
      <circle cx="180" cy="110" r="10" fill={colors.accent} />
      {/* left pupil */}
      <circle cx="135" cy="111" r="6" fill="#1a1a2e" />
      {/* right pupil */}
      <circle cx="182" cy="111" r="6" fill="#1a1a2e" />
      {/* eye shine left */}
      <circle cx="138" cy="107" r="2.5" fill="white" />
      <circle cx="132" cy="113" r="1.5" fill="white" opacity="0.7" />
      {/* eye shine right */}
      <circle cx="185" cy="107" r="2.5" fill="white" />
      <circle cx="179" cy="113" r="1.5" fill="white" opacity="0.7" />

      {/* ── CHEEK BLUSH ── */}
      <ellipse cx="112" cy="126" rx="14" ry="9" fill="#ff9eb5" opacity="0.35" />
      <ellipse cx="198" cy="126" rx="14" ry="9" fill="#ff9eb5" opacity="0.35" />

      {/* ── TUMMY BUTTON ── */}
      <circle cx="160" cy="212" r="6" fill={colors.spikes} opacity="0.4" />
      <circle cx="160" cy="212" r="3.5" fill={colors.spikes} opacity="0.3" />
    </svg>
  );
}
