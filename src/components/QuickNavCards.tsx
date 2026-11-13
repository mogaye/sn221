import React from 'react';
import { QUICK_NAV_ITEMS } from '../utils/portalLogic';

interface QuickNavCardsProps {
  onNavigateSection: (sectionId: string) => void;
}

function QuickNavIcon({ id }: { id: string }) {
  switch (id) {
    case 'actualites':
      return (
        <svg viewBox="0 0 48 40" className="w-10 h-9" fill="none" aria-hidden="true">
          <rect x="7" y="7" width="28" height="26" rx="3" fill="#E8F3E8" stroke="#065E18" strokeWidth="2.2" />
          <path d="M35 13H39C40.1 13 41 13.9 41 15V29C41 31.2 39.2 33 37 33H11" stroke="#065E18" strokeWidth="2.2" strokeLinecap="round" />
          <rect x="12" y="12" width="10" height="7" rx="1" fill="#065E18" />
          <path d="M25 14H31M25 18H31M12 23H31M12 28H26" stroke="#065E18" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'blog-recits':
      return (
        <svg viewBox="0 0 48 40" className="w-10 h-9" fill="none" aria-hidden="true">
          <path d="M24 11C19 8 11 8 6 10V32C11 30 19 30 24 33V11Z" fill="#F2D000" stroke="#065E18" strokeWidth="1.6" />
          <path d="M24 11C29 8 37 8 42 10V32C37 30 29 30 24 33V11Z" fill="#E8F3E8" stroke="#065E18" strokeWidth="1.6" />
          <path d="M11 16H19M11 21H19M29 16H37M29 21H37" stroke="#065E18" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'culture':
      return (
        <svg viewBox="0 0 48 40" className="w-10 h-9" fill="none" aria-hidden="true">
          <circle cx="24" cy="12" r="5" fill="#065E18" />
          <path d="M15 32C15 24.5 19 20 24 20C29 20 33 24.5 33 32H15Z" fill="#065E18" />
          <circle cx="12" cy="15" r="3.8" fill="#18782B" />
          <path d="M5 32C5 26 8 22.5 12 22.5C14.2 22.5 16 23.6 17 25.5" stroke="#18782B" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="36" cy="15" r="3.8" fill="#18782B" />
          <path d="M43 32C43 26 40 22.5 36 22.5C33.8 22.5 32 23.6 31 25.5" stroke="#18782B" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case 'evenements':
      return (
        <svg viewBox="0 0 48 40" className="w-10 h-9" fill="none" aria-hidden="true">
          <rect x="8" y="8" width="32" height="26" rx="3" fill="#FFFFFF" stroke="#065E18" strokeWidth="2.2" />
          <path d="M8 14H40V10C40 8.9 39.1 8 38 8H10C8.9 8 8 8.9 8 10V14Z" fill="#065E18" />
          <rect x="15" y="4" width="3" height="7" rx="1.5" fill="#065E18" />
          <rect x="30" y="4" width="3" height="7" rx="1.5" fill="#065E18" />
          <rect x="13" y="18" width="5" height="4" rx="0.8" fill="#065E18" />
          <rect x="21.5" y="18" width="5" height="4" rx="0.8" fill="#F2D000" />
          <rect x="30" y="18" width="5" height="4" rx="0.8" fill="#065E18" />
          <rect x="13" y="25" width="5" height="4" rx="0.8" fill="#065E18" />
          <rect x="21.5" y="25" width="5" height="4" rx="0.8" fill="#065E18" />
          <rect x="30" y="25" width="5" height="4" rx="0.8" fill="#E31B23" />
        </svg>
      );
    case 'nos-regions':
      return (
        <svg viewBox="0 0 48 40" className="w-10 h-9" fill="none" aria-hidden="true">
          <path
            d="M24 5C17.4 5 12 10.4 12 17C12 25.5 24 36 24 36C24 36 36 25.5 36 17C36 10.4 30.6 5 24 5Z"
            fill="#065E18"
          />
          <circle cx="24" cy="16.5" r="4.8" fill="#FFFFFF" />
          <ellipse cx="24" cy="36.5" rx="9" ry="1.8" fill="#065E18" opacity="0.25" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 48 40" className="w-10 h-9" fill="none" aria-hidden="true">
          <rect x="7" y="7" width="34" height="26" rx="3" fill="#FFFDF2" stroke="#065E18" strokeWidth="2.2" />
          <circle cx="16.5" cy="15" r="3.2" fill="#F2D000" />
          <path d="M9 31L19 20L26 27L31 21L39 31H9Z" fill="#065E18" />
        </svg>
      );
  }
}

export function QuickNavCards({ onNavigateSection }: QuickNavCardsProps) {
  return (
    <section className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-5 pb-4" aria-label="Accès rapides">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {QUICK_NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigateSection(item.targetSection)}
            className="bg-white rounded-xl py-4 px-3 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col items-center justify-center hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer group"
          >
            <QuickNavIcon id={item.id} />
            <span className="mt-2 text-[13px] font-extrabold text-[#142016] whitespace-nowrap">
              {item.label}
            </span>
            {/* Tiny centered tri-color underline bar */}
            <span
              className="mt-1.5 w-12 h-[2.5px] flex rounded-full overflow-hidden"
              aria-hidden="true"
            >
              <span className="w-1/3 bg-[#00853F]" />
              <span className="w-1/3 bg-[#FDEF42]" />
              <span className="w-1/3 bg-[#E31B23]" />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
