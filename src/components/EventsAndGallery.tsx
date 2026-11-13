import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Mail, MapPin } from 'lucide-react';
import {
  EventItem,
  GALLERY_SLIDES,
  UPCOMING_EVENTS,
  validateNewsletterEmail,
} from '../utils/portalLogic';
import { MountainPlaceholder, SenegalMiniFlag } from './SenegalGraphics';

interface EventsAndGalleryProps {
  gallerySlide: number;
  onChangeGallerySlide: (idx: number) => void;
  onPrevGallery: () => void;
  onNextGallery: () => void;
  onOpenEvent: (event: EventItem) => void;
  onOpenGalleryItem: (item: { id: string; title: string; period?: string }) => void;
  onViewAll: (section: string) => void;
}

const ACCENT_STYLES: Record<EventItem['accentColor'], { border: string; tint: string }> = {
  green: { border: 'border-t-[#065C18]', tint: 'bg-[#EAF1EA]' },
  yellow: { border: 'border-t-[#F4D000]', tint: 'bg-[#FCF6D8]' },
  red: { border: 'border-t-[#E31B23]', tint: 'bg-[#FBEAEA]' },
};

export function EventsAndGallery({
  gallerySlide,
  onChangeGallerySlide,
  onPrevGallery,
  onNextGallery,
  onOpenEvent,
  onOpenGalleryItem,
  onViewAll,
}: EventsAndGalleryProps) {
  const [bannerEmail, setBannerEmail] = useState('');
  const [bannerFeedback, setBannerFeedback] = useState<{ valid: boolean; message: string } | null>(null);

  const currentGalleryItems = GALLERY_SLIDES[gallerySlide] ?? GALLERY_SLIDES[0];

  const handleBannerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateNewsletterEmail(bannerEmail);
    setBannerFeedback(res);
    if (res.valid) {
      setBannerEmail('');
    }
  };

  return (
    <div className="max-w-[1160px] mx-auto px-4 sm:px-6 space-y-9 pb-10">
      {/* Prochains Événements */}
      <section id="prochains-evenements" aria-label="Prochains Événements">
        <div className="flex items-start justify-between gap-4 mb-3.5">
          <div>
            <h2 className="flex items-center gap-2.5 text-[20px] font-extrabold text-[#111812]">
              <SenegalMiniFlag />
              <span>Prochains Événements</span>
            </h2>
            <p className="mt-1 text-[13px] text-[#4C594E]">
              Forums, festivals, rencontres citoyennes et rendez-vous culturels à travers le Sénégal.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onViewAll('Prochains Événements')}
            className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0A5C1B] hover:underline cursor-pointer shrink-0 mt-1"
          >
            <span>Voir tout</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {UPCOMING_EVENTS.map((evt) => {
            const style = ACCENT_STYLES[evt.accentColor];
            return (
              <button
                key={evt.id}
                type="button"
                onClick={() => onOpenEvent(evt)}
                className={`bg-white rounded-xl border-t-[5px] ${style.border} shadow-[0_2px_10px_rgba(0,0,0,0.06)] p-3.5 text-left hover:-translate-y-0.5 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  {/* Tinted top header box with white date badge */}
                  <div className={`${style.tint} rounded-lg p-2.5 h-[82px]`}>
                    <div className="bg-white rounded-lg w-12 h-14 flex flex-col items-center justify-center shadow-xs">
                      <span className="text-[20px] font-extrabold leading-none text-[#111812] tabular-nums">
                        {evt.day}
                      </span>
                      <span className="text-[11px] font-bold text-[#111812] mt-0.5">
                        {evt.month}
                      </span>
                    </div>
                  </div>

                  {/* Real Event Name & Description */}
                  <div className="mt-3">
                    <h3 className="text-[14px] font-extrabold text-[#111812] leading-snug">
                      {evt.title}
                    </h3>
                    <p className="mt-1.5 text-[12px] text-[#4C594E] leading-relaxed line-clamp-3">
                      {evt.description}
                    </p>
                  </div>
                </div>

                {/* Location & Time */}
                <div className="mt-4 pt-2.5 border-t border-gray-100 flex items-center gap-4 text-[11px] font-bold text-[#142016]">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#111812]" aria-hidden="true" />
                    <span>{evt.location}</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#111812]" aria-hidden="true" />
                    <span>{evt.time}</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Galerie & Reportages */}
      <section id="galerie-historique" aria-label="Galerie et Reportages">
        <div className="flex items-start justify-between gap-4 mb-3.5">
          <div>
            <h2 className="flex items-center gap-2.5 text-[20px] font-extrabold text-[#111812]">
              <SenegalMiniFlag />
              <span>Galerie &amp; Reportages</span>
            </h2>
            <p className="mt-1 text-[13px] text-[#4C594E]">
              Reportages photo d&apos;actualité, scènes de vie et archives visuelles du Sénégal.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onViewAll('Galerie & Reportages')}
            className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0A5C1B] hover:underline cursor-pointer shrink-0 mt-1"
          >
            <span>Voir tout</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentGalleryItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpenGalleryItem(item)}
                className="relative rounded-xl overflow-hidden aspect-[16/10] shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:opacity-95 transition-opacity cursor-pointer group text-left"
              >
                <MountainPlaceholder variant="gallery" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#04240B]/80 via-[#04240B]/35 to-transparent p-3">
                  <p className="text-[11px] font-semibold text-[#FDEF42]">{item.period}</p>
                  <p className="text-[12px] font-bold text-white leading-snug">{item.title}</p>
                </div>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onPrevGallery}
            aria-label="Galerie précédente"
            className="absolute -left-3 sm:-left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#064E15] hover:bg-[#053D11] text-white flex items-center justify-center shadow-md cursor-pointer z-10"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onNextGallery}
            aria-label="Galerie suivante"
            className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#064E15] hover:bg-[#053D11] text-white flex items-center justify-center shadow-md cursor-pointer z-10"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* 4 pagination dots */}
        <div
          className="mt-4 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Pages de la galerie"
        >
          {GALLERY_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === gallerySlide}
              aria-label={`Page galerie ${idx + 1}`}
              onClick={() => onChangeGallerySlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                idx === gallerySlide ? 'bg-[#064E15]' : 'bg-[#B3B8B4] hover:bg-[#8E958F]'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Grande Newsletter CTA Banner */}
      <section
        aria-label="Inscription aux actualités"
        className="relative rounded-2xl bg-[#065416] overflow-hidden px-6 sm:px-10 py-6 shadow-[0_6px_18px_rgba(6,84,22,0.22)]"
      >
        <svg
          viewBox="0 0 1160 120"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          aria-hidden="true"
        >
          <path d="M 0 55 Q 65 102 190 120 L 0 120 Z" fill="#FDEF42" opacity="0.92" />
          <path d="M 0 85 Q 55 112 130 120 L 0 120 Z" fill="#00853F" />
          <path d="M 1160 10 C 1105 55 1030 95 940 120 L 1160 120 Z" fill="#FDEF42" opacity="0.9" />
          <path d="M 1160 45 C 1110 82 1055 105 1000 120 L 1160 120 Z" fill="#E31B23" />
        </svg>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-white max-w-xl">
            <Mail className="w-12 h-10 stroke-[1.7] shrink-0" aria-hidden="true" />
            <div>
              <h2 className="text-[20px] font-extrabold leading-tight">
                Restez connecté à SN221.
              </h2>
              <p className="text-[12px] text-white/95 mt-0.5 leading-relaxed">
                Actualités, billets de blog, débats de société et patrimoine : recevez nos meilleures publications.
              </p>
            </div>
          </div>

          <form onSubmit={handleBannerSubmit} className="w-full md:w-auto" noValidate>
            <div className="bg-white rounded-full p-1 flex items-center w-full md:w-[445px] shadow-sm">
              <label htmlFor="banner-newsletter-email" className="sr-only">
                Votre adresse e-mail
              </label>
              <input
                id="banner-newsletter-email"
                type="email"
                value={bannerEmail}
                onChange={(e) => setBannerEmail(e.target.value)}
                placeholder="Votre adresse e-mail..."
                className="flex-1 min-w-0 bg-transparent px-4 py-1.5 text-[13px] text-[#1A241C] placeholder:text-gray-400 outline-none"
              />
              <button
                type="submit"
                className="bg-[#F6D300] hover:bg-[#e7c500] text-[#111812] text-[12px] sm:text-[13px] font-extrabold px-4 sm:px-5 py-2 rounded-full inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap cursor-pointer transition-colors"
              >
                <span>Rejoindre notre liste</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            {bannerFeedback && (
              <p
                role="status"
                className={`mt-2 text-[11px] font-semibold text-center md:text-left ${
                  bannerFeedback.valid ? 'text-[#FDEF42]' : 'text-red-200'
                }`}
              >
                {bannerFeedback.message}
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
