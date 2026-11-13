import React from 'react';

/**
 * Senegal Map Silhouette filled with the National Flag (Green, Yellow with Green Star, Red)
 * Matches the header and footer brand graphic in the mockup.
 */
export function SenegalMapLogo({ className = 'w-20 h-14' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 125"
      className={className}
      aria-label="Carte du Sénégal aux couleurs nationales"
      role="img"
    >
      <defs>
        <clipPath id="senegal-map-clip">
          {/* Authentic Senegal geographic silhouette including Cap-Vert peninsula and Casamance */}
          <path d="M 38 35 L 49 23 L 66 15 L 88 12 L 108 16 L 122 25 L 138 37 L 154 55 L 166 74 L 170 95 L 156 105 L 132 108 L 106 107 L 95 100 L 75 98 L 68 91 L 52 94 L 30 98 L 14 98 L 16 86 L 30 82 L 42 78 L 28 73 L 18 67 L 11 58 L 24 52 L 32 45 Z" />
        </clipPath>
        <linearGradient id="map-shine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.14" />
        </linearGradient>
      </defs>

      {/* Subtle drop shadow behind map */}
      <g clipPath="url(#senegal-map-clip)">
        <rect x="0" y="0" width="60" height="125" fill="#00853F" />
        <rect x="60" y="0" width="60" height="125" fill="#FDEF42" />
        <rect x="120" y="0" width="60" height="125" fill="#E31B23" />
        {/* Green five-pointed star centered in yellow band */}
        <polygon
          points="90,41 94.5,54.5 108.8,54.5 97.2,62.8 101.6,76.3 90,68 78.4,76.3 82.8,62.8 71.2,54.5 85.5,54.5"
          fill="#00853F"
        />
        <rect x="0" y="0" width="180" height="125" fill="url(#map-shine)" />
      </g>
    </svg>
  );
}

/**
 * Small vertical Senegal flag marker shown on the left of every section title.
 */
export function SenegalMiniFlag({ className = 'w-3.5 h-5' }: { className?: string }) {
  return (
    <span
      className={`inline-flex overflow-hidden rounded-[3px] shadow-xs shrink-0 ${className}`}
      aria-hidden="true"
    >
      <span className="w-1/3 h-full bg-[#00853F]" />
      <span className="w-1/3 h-full bg-[#FDEF42]" />
      <span className="w-1/3 h-full bg-[#E31B23]" />
    </span>
  );
}

/**
 * Subtle mountain peaks placeholder graphic inside Par Catégories & Galerie Historique cards.
 */
export function MountainPlaceholder({ variant = 'light' }: { variant?: 'light' | 'gallery' }) {
  return (
    <svg
      viewBox="0 0 240 150"
      className="w-full h-full object-cover select-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect
        width="240"
        height="150"
        fill={variant === 'gallery' ? '#CFD3D1' : '#D2D6D4'}
      />
      <path
        d="M 25 150 L 88 55 L 148 150 Z"
        fill={variant === 'gallery' ? '#BFC4C1' : '#C3C8C5'}
      />
      <path
        d="M 105 150 L 160 72 L 218 150 Z"
        fill={variant === 'gallery' ? '#B6BBB8' : '#BAC0BC'}
      />
    </svg>
  );
}

/**
 * Golden line-art silhouette of Dakar's Monument de la Renaissance Africaine
 * displayed in the bottom-right corner of the footer.
 */
export function RenaissanceMonument({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 210"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* Rolling hill silhouette */}
      <path
        d="M 10 205 Q 115 170 210 162 Q 290 156 420 132"
        stroke="#D4C000"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Left female figure with flowing dress & extended arm */}
      <path
        d="M 192 162 L 198 118 L 208 98 L 214 86 L 222 98 L 224 134 L 228 160"
        stroke="#D4C000"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
      <circle cx="213" cy="79" r="5.5" stroke="#D4C000" strokeWidth="2.2" />
      <path
        d="M 206 102 L 182 128 L 168 148 L 195 138"
        stroke="#D4C000"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      {/* Central monumental man figure */}
      <path
        d="M 234 159 L 234 114 L 238 74 L 248 56 L 260 68 L 266 110 L 274 154"
        stroke="#D4C000"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="249" cy="48" r="6.5" stroke="#D4C000" strokeWidth="2.4" />
      {/* Muscular shoulder and raised arm holding child */}
      <path
        d="M 258 64 L 275 38 L 284 26"
        stroke="#D4C000"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      {/* Child held aloft pointing forward */}
      <circle cx="288" cy="18" r="4.5" stroke="#D4C000" strokeWidth="2.2" />
      <path
        d="M 284 24 L 282 40 L 292 44 M 289 27 L 308 22"
        stroke="#D4C000"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Vertical fold & architectural ribs */}
      <path
        d="M 244 82 L 246 158 M 256 80 L 261 155 M 224 116 L 237 122 M 266 116 L 282 124"
        stroke="#D4C000"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      {/* Secondary bronze/hill spires on right */}
      <path
        d="M 278 153 L 286 92 L 296 92 L 302 148 M 308 147 L 315 112 L 323 112 L 328 144"
        stroke="#D4C000"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Five circular white social icons (YouTube, Facebook, X, Instagram, LinkedIn)
 * matching both the top utility bar and the footer.
 */
export function SocialIconsRow({
  size = 'sm',
  onAction,
}: {
  size?: 'sm' | 'md';
  onAction?: (network: string) => void;
}) {
  const btnCls =
    size === 'sm'
      ? 'w-5 h-5 rounded-full bg-white text-[#064E15] flex items-center justify-center hover:scale-105 transition-transform'
      : 'w-7 h-7 rounded-full bg-white text-[#044411] flex items-center justify-center hover:scale-105 transition-transform';

  const iconCls = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  const networks = [
    {
      name: 'YouTube',
      svg: (
        <svg viewBox="0 0 24 24" className={iconCls} fill="currentColor" aria-hidden="true">
          <path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.948C18.15 5.6 12 5.6 12 5.6s-6.15 0-7.86.453A2.75 2.75 0 0 0 2.2 8.001 28.7 28.7 0 0 0 1.75 12a28.7 28.7 0 0 0 .45 3.999 2.75 2.75 0 0 0 1.94 1.948c1.71.453 7.86.453 7.86.453s6.15 0 7.86-.453a2.75 2.75 0 0 0 1.94-1.948c.3-1.31.45-2.65.45-3.999a28.7 28.7 0 0 0-.45-3.999ZM10 14.75v-5.5l4.8 2.75-4.8 2.75Z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      svg: (
        <svg viewBox="0 0 24 24" className={iconCls} fill="currentColor" aria-hidden="true">
          <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.24-1.46 1.5-1.46h1.6V4.45c-.28-.04-1.24-.12-2.36-.12-2.33 0-3.93 1.42-3.93 4.04v2.13H7.75v3h2.56V21h3.19Z" />
        </svg>
      ),
    },
    {
      name: 'X',
      svg: (
        <svg viewBox="0 0 24 24" className={iconCls} fill="currentColor" aria-hidden="true">
          <path d="M18.244 3.5h2.9l-6.33 7.235L22.26 20.5h-5.83l-4.566-5.97L6.64 20.5H3.74l6.77-7.74L3.37 3.5h5.98l4.13 5.456L18.244 3.5Zm-1.018 15.27h1.607L8.48 5.14H6.755l10.471 13.63Z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      svg: (
        <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="3.8" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      svg: (
        <svg viewBox="0 0 24 24" className={iconCls} fill="currentColor" aria-hidden="true">
          <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5C4.14 3.5 3.25 4.39 3.25 5.5C3.25 6.6 4.14 7.5 5.25 7.5C6.35 7.5 7.25 6.6 7.25 5.5C7.25 4.39 6.35 3.5 5.25 3.5ZM20.44 13.02C20.44 9.88 18.76 8.22 16.16 8.22C14.37 8.22 13.48 9.2 13.02 9.93V8.5H9.65C9.7 9.48 9.65 19.5 9.65 19.5H13.02V13.36C13.02 13.02 13.05 12.69 13.15 12.45C13.42 11.78 14.03 11.09 15.07 11.09C16.41 11.09 17.06 12.11 17.06 13.6V19.5H20.44V13.02Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {networks.map((net) => (
        <button
          key={net.name}
          type="button"
          onClick={() => onAction?.(net.name)}
          aria-label={`Suivre sur ${net.name}`}
          className={btnCls}
        >
          {net.svg}
        </button>
      ))}
    </div>
  );
}
