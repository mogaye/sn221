import React from 'react';
import { ArrowUp } from 'lucide-react';
import { RenaissanceMonument, SenegalMapLogo, SocialIconsRow } from './SenegalGraphics';

interface FooterProps {
  onSelectLink: (label: string) => void;
  onSocialClick: (network: string) => void;
}

export function Footer({ onSelectLink, onSocialClick }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#044411] text-white mt-4">
      {/* Floating circular back-to-top button on top-right border */}
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 relative">
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Retour en haut de la page"
          className="absolute right-4 sm:right-6 -top-5 z-20 w-10 h-10 rounded-full bg-[#064E15] hover:bg-[#08631b] border-2 border-white/85 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform hover:-translate-y-0.5"
        >
          <ArrowUp className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
        </button>
      </div>

      {/* Main Footer Content */}
      <div className="relative overflow-hidden">
        {/* Golden African Renaissance Monument silhouette on bottom-right above divider */}
        <RenaissanceMonument className="hidden md:block absolute right-0 bottom-14 w-[320px] lg:w-[370px] h-auto pointer-events-none select-none opacity-95" />

        <div className="relative z-10 max-w-[1160px] mx-auto px-4 sm:px-6 pt-12 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.8fr_0.8fr_1fr] gap-8 items-start">
            {/* Column 1: Senegal Flag Map + SN221 tagline + Social Icons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <SenegalMapLogo className="w-[110px] h-[76px] shrink-0" />
                <div>
                  <p className="text-[18px] font-black tracking-tight text-white">
                    SN<span className="text-[#FDEF42]">221</span>
                  </p>
                  <p className="mt-1 text-[12px] text-white/90 leading-relaxed max-w-[260px]">
                    « L&apos;actualité qui informe, le blog qui inspire et la mémoire qui rassemble le Sénégal. »
                  </p>
                </div>
              </div>

              <div className="pt-1">
                <SocialIconsRow size="md" onAction={onSocialClick} />
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h3 className="text-[14px] font-extrabold text-white">Navigation</h3>
              <div className="mt-1 mb-3 h-[2px] w-12 flex" aria-hidden="true">
                <span className="w-1/2 bg-[#25A544]" />
                <span className="w-1/2 bg-[#FDEF42]" />
              </div>
              <ul className="space-y-2 text-[12px] text-white/90 font-medium">
                {['Accueil', 'Actualités', 'Blog', 'Culture', 'Histoire', 'Régions'].map((label) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => onSelectLink(label)}
                      className="hover:text-[#FDEF42] transition-colors cursor-pointer"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Découvrir */}
            <div>
              <h3 className="text-[14px] font-extrabold text-white">Découvrir</h3>
              <div className="mt-1 mb-3 h-[2px] w-12 flex" aria-hidden="true">
                <span className="w-1/2 bg-[#25A544]" />
                <span className="w-1/2 bg-[#FDEF42]" />
              </div>
              <ul className="space-y-2 text-[12px] text-white/90 font-medium">
                {['Galerie', 'Communauté', 'Discussions', 'FAQ', 'Contact'].map((label) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => onSelectLink(label)}
                      className="hover:text-[#FDEF42] transition-colors cursor-pointer"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Liens utiles */}
            <div>
              <h3 className="text-[14px] font-extrabold text-white">Liens utiles</h3>
              <div className="mt-1 mb-3 h-[2px] w-12 flex" aria-hidden="true">
                <span className="w-1/2 bg-[#25A544]" />
                <span className="w-1/2 bg-[#FDEF42]" />
              </div>
              <ul className="space-y-2 text-[12px] text-white/90 font-medium">
                {[
                  'Mentions légales',
                  'Confidentialité',
                  "Conditions d'utilisation",
                  'Charte de la communauté',
                ].map((label) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => onSelectLink(label)}
                      className="hover:text-[#FDEF42] transition-colors cursor-pointer"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Divider & Copyright Row */}
          <div className="mt-10 pt-5 border-t border-white/25 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-white/90 font-medium">
              © 2026 SN221 · Blog &amp; Actualité du Sénégal. Tous droits réservés.
            </p>
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="w-3.5 h-3.5 rounded-full bg-white/90" />
              <span className="w-3.5 h-3.5 rounded-full bg-white/90" />
              <span className="w-3.5 h-3.5 rounded-full bg-white/90" />
              <span className="w-3.5 h-3.5 rounded-full bg-white/90" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Tri-Color Senegal Bar */}
      <div className="h-3 w-full flex" aria-hidden="true">
        <div className="w-1/3 bg-[#00853F]" />
        <div className="w-1/3 bg-[#FDEF42]" />
        <div className="w-1/3 bg-[#E31B23]" />
      </div>
    </footer>
  );
}
