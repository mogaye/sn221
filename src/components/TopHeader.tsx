import React, { useState } from 'react';
import { CalendarDays, ChevronDown, Home, Menu, Search, X } from 'lucide-react';
import { NAV_ITEMS } from '../utils/portalLogic';
import { SenegalMapLogo, SocialIconsRow } from './SenegalGraphics';

interface TopHeaderProps {
  activeNav: string;
  onSelectNav: (id: string, subItem?: string) => void;
  onOpenSearch: () => void;
  onSocialClick: (network: string) => void;
}

export function TopHeader({
  activeNav,
  onSelectNav,
  onOpenSearch,
  onSocialClick,
}: TopHeaderProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      {/* Top Dark Green Utility Bar */}
      <div className="bg-[#064E15] text-white">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 h-8 flex items-center justify-between text-[12px] font-semibold">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <CalendarDays className="w-3.5 h-3.5 text-white shrink-0" aria-hidden="true" />
            <span>Aujourd&apos;hui : 12 Nov. 2026</span>
          </div>
          <SocialIconsRow size="sm" onAction={onSocialClick} />
        </div>
      </div>

      {/* Main White Navigation Bar */}
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between gap-4">
        {/* Left: Senegal Flag Map Logo + SN221 Wordmark */}
        <div className="flex items-center gap-4 lg:gap-7">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onSelectNav('accueil');
            }}
            className="shrink-0 flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#064E15] rounded-md"
            aria-label="SN221 — Blog & Actualité du Sénégal - Accueil"
          >
            <SenegalMapLogo className="w-[68px] sm:w-[76px] h-[48px] sm:h-[52px]" />
            <div className="leading-none">
              <span className="text-[19px] sm:text-[21px] font-black tracking-tight text-[#064E15]">
                SN<span className="text-[#E31B23]">221</span>
              </span>
              <span className="block text-[9.5px] font-bold uppercase tracking-wider text-[#4C594E] mt-0.5 whitespace-nowrap">
                Blog &amp; Actu
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2.5 xl:gap-4" aria-label="Navigation principale">
            <button
              type="button"
              onClick={() => {
                setOpenDropdown(null);
                onSelectNav('accueil');
              }}
              className={`inline-flex items-center gap-1.5 px-3 xl:px-4 py-1.5 rounded-full text-[13px] font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeNav === 'accueil'
                  ? 'bg-[#064E15] text-white'
                  : 'text-[#1A241C] hover:text-[#064E15]'
              }`}
            >
              <Home className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Accueil</span>
            </button>

            {NAV_ITEMS.map((item) => {
              const isOpen = openDropdown === item.id;
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    aria-expanded={item.hasDropdown ? isOpen : undefined}
                    onClick={() => {
                      if (item.hasDropdown) {
                        setOpenDropdown(isOpen ? null : item.id);
                      } else {
                        setOpenDropdown(null);
                        onSelectNav(item.id);
                      }
                    }}
                    className={`inline-flex items-center gap-1 text-[13px] font-bold whitespace-nowrap shrink-0 px-1.5 xl:px-2 py-1.5 rounded-full transition-colors cursor-pointer ${
                      activeNav === item.id
                        ? 'bg-[#064E15] text-white px-3'
                        : 'text-[#1A241C] hover:text-[#064E15]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-150 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </button>

                  {item.hasDropdown && isOpen && item.subItems && (
                    <div className="absolute left-0 top-full pt-1.5 w-52 z-50">
                      <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-1.5">
                        {item.subItems.map((sub) => (
                          <button
                            key={sub}
                            type="button"
                            onClick={() => {
                              setOpenDropdown(null);
                              onSelectNav(item.id, sub);
                            }}
                            className="w-full text-left px-4 py-2 text-[13px] font-medium text-[#1A241C] hover:bg-[#EAF3EA] hover:text-[#064E15] transition-colors cursor-pointer"
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Right: Search Icon & Mobile Menu Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Rechercher dans le portail"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#1A241C] hover:bg-[#EAF3EA] hover:text-[#064E15] transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5 stroke-[2.2]" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#1A241C] hover:bg-[#EAF3EA] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          <button
            type="button"
            onClick={() => {
              onSelectNav('accueil');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-[14px] font-bold bg-[#064E15] text-white flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Accueil</span>
          </button>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelectNav(item.id);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-[14px] font-semibold text-[#1A241C] hover:bg-[#EAF3EA] flex items-center justify-between"
            >
              <span>{item.label}</span>
              {item.hasDropdown && <ChevronDown className="w-4 h-4 opacity-60" />}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
