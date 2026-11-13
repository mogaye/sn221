import React from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../utils/portalLogic';

interface HeroBannerProps {
  activeSlide: number;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onOpenSlideDetail: (slideIndex: number) => void;
}

export function HeroBanner({
  activeSlide,
  onPrevSlide,
  onNextSlide,
  onOpenSlideDetail,
}: HeroBannerProps) {
  const current = HERO_SLIDES[activeSlide] ?? HERO_SLIDES[0];

  return (
    <section aria-label="Bannière principale" className="relative w-full">
      {/* Thin top tri-color accent stripe right below header */}
      <div className="h-[3px] w-full flex" aria-hidden="true">
        <div className="w-1/3 bg-[#00853F]" />
        <div className="w-1/3 bg-[#FDEF42]" />
        <div className="w-1/3 bg-[#E31B23]" />
      </div>

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-4">
        <div className="relative min-h-[260px] sm:min-h-[330px] md:min-h-[370px] lg:min-h-[390px] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_6px_22px_rgba(0,0,0,0.12)] flex items-center">
          {/* Sole Hero Background Image */}
          <img
            src="/assets/aistudio/Monument_africain_au_coucher_du_soleil___Dakar_694dbcc4.png"
            alt="Monument de la Renaissance Africaine au coucher du soleil à Dakar"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-[76%_42%] sm:object-center select-none"
          />

          {/* Subtle Left Scrim for WCAG text readability over sunset */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#04240B]/75 via-[#04240B]/40 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Left-Aligned Hero Copy */}
          <div className="relative z-10 w-full py-8 sm:py-10 px-12 sm:px-16">
            <div className="w-full max-w-[540px]">
              <h1 className="text-[22px] sm:text-[32px] md:text-[38px] font-extrabold text-white leading-[1.15] tracking-tight drop-shadow-sm [text-wrap:balance]">
                {current.title}
              </h1>
              <p className="mt-3 sm:mt-4 text-[13px] sm:text-[15px] md:text-[16px] text-white/95 leading-relaxed max-w-[490px] drop-shadow-xs">
                {current.subtitle}
              </p>

              <button
                type="button"
                onClick={() => onOpenSlideDetail(activeSlide)}
                className="mt-5 sm:mt-6 inline-flex items-center gap-2.5 bg-[#064E15] hover:bg-[#053D11] text-white text-[13px] sm:text-[14px] font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-md transition-all cursor-pointer group whitespace-nowrap"
              >
                <span>{current.ctaLabel}</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          {/* Left Carousel Arrow */}
          <button
            type="button"
            onClick={onPrevSlide}
            aria-label="Diapositive précédente"
            className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#064E15] hover:bg-[#053D11] text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          </button>

          {/* Right Carousel Arrow */}
          <button
            type="button"
            onClick={onNextSlide}
            aria-label="Diapositive suivante"
            className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#064E15] hover:bg-[#053D11] text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
