import React, { useState } from 'react';
import { ArrowRight, Forward, Mail, MessageSquare, ThumbsUp } from 'lucide-react';
import {
  ArticleItem,
  CATEGORIES_DATA,
  CategoryCardItem,
  FEATURED_ARTICLE,
  POPULAR_ARTICLES,
  SECONDARY_ARTICLES,
  validateNewsletterEmail,
} from '../utils/portalLogic';
import { MountainPlaceholder, SenegalMiniFlag } from './SenegalGraphics';

interface MainContentGridProps {
  likedIds: Record<string, boolean>;
  onToggleLike: (id: string) => void;
  onOpenArticle: (article: ArticleItem) => void;
  onOpenCategory: (category: CategoryCardItem) => void;
  onShareArticle: (article: ArticleItem) => void;
  onViewAll: (section: string) => void;
}

export function MainContentGrid({
  likedIds,
  onToggleLike,
  onOpenArticle,
  onOpenCategory,
  onShareArticle,
  onViewAll,
}: MainContentGridProps) {
  const [sidebarEmail, setSidebarEmail] = useState('');
  const [sidebarFeedback, setSidebarFeedback] = useState<{ valid: boolean; message: string } | null>(null);

  const handleSidebarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateNewsletterEmail(sidebarEmail);
    setSidebarFeedback(res);
    if (res.valid) {
      setSidebarEmail('');
    }
  };

  const getLikeCount = (article: ArticleItem) =>
    article.likes + (likedIds[article.id] ? 1 : 0);

  return (
    <section className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-3 pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
        {/* LEFT COLUMN: À la Une + Par Catégories */}
        <div className="space-y-8 min-w-0">
          {/* À la Une */}
          <div id="a-la-une">
            <div className="flex items-start justify-between gap-4 mb-3.5">
              <div>
                <h2 className="flex items-center gap-2.5 text-[20px] font-extrabold text-[#111812]">
                  <SenegalMiniFlag />
                  <span>À la Une</span>
                </h2>
                <p className="mt-1 text-[13px] text-[#4C594E]">
                  L&apos;essentiel de l&apos;actualité sénégalaise, des analyses de fond et des billets de blog qui comptent.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onViewAll('À la Une')}
                className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0A5C1B] hover:underline cursor-pointer shrink-0 mt-1"
              >
                <span>Voir tout</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              {/* Large Left Featured Card */}
              <article className="bg-gradient-to-br from-[#D5DCD6] to-[#E8ECE8] rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex flex-col justify-between min-h-[268px]">
                <div>
                  <span className="inline-block bg-[#064E15] text-white text-[12px] font-bold px-4 py-1 rounded-full">
                    {FEATURED_ARTICLE.category}
                  </span>
                </div>

                <div className="mt-5 space-y-2">
                  <h3 className="text-[18px] font-extrabold text-[#111812] leading-snug">
                    {FEATURED_ARTICLE.title}
                  </h3>
                  <p className="text-[13px] text-[#2B372D] leading-relaxed">
                    {FEATURED_ARTICLE.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-black/10 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[13px] font-bold text-[#142016]">
                    <button
                      type="button"
                      onClick={() => onToggleLike(FEATURED_ARTICLE.id)}
                      aria-label={`J'aime (${getLikeCount(FEATURED_ARTICLE)})`}
                      className={`inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                        likedIds[FEATURED_ARTICLE.id] ? 'text-[#064E15]' : 'hover:text-[#064E15]'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4 fill-current" aria-hidden="true" />
                      <span className="tabular-nums">{getLikeCount(FEATURED_ARTICLE)}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenArticle(FEATURED_ARTICLE)}
                      aria-label={`Commentaires (${FEATURED_ARTICLE.comments})`}
                      className="inline-flex items-center gap-1.5 hover:text-[#064E15] cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" aria-hidden="true" />
                      <span className="tabular-nums">{FEATURED_ARTICLE.comments}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onShareArticle(FEATURED_ARTICLE)}
                      aria-label="Partager l'article à la une"
                      className="inline-flex items-center text-[#142016] hover:text-[#064E15] cursor-pointer"
                    >
                      <Forward className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenArticle(FEATURED_ARTICLE)}
                    aria-label={`Lire l'article : ${FEATURED_ARTICLE.title}`}
                    className="w-8 h-8 rounded-full bg-[#064E15] hover:bg-[#053D11] text-white flex items-center justify-center shadow-xs transition-transform hover:scale-105 cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>

              {/* Right Column: 2 Stacked Secondary Cards */}
              <div className="flex flex-col gap-4 justify-between">
                {SECONDARY_ARTICLES.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-gray-100 flex items-stretch gap-3.5 flex-1"
                  >
                    <div
                      className="w-[76px] rounded-lg bg-gradient-to-br from-[#CBD3CC] to-[#E2E6E2] shrink-0 overflow-hidden"
                      aria-hidden="true"
                    >
                      <MountainPlaceholder />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[14px] font-extrabold text-[#111812] leading-snug">
                          {article.title}
                        </h3>
                        <p className="mt-1 text-[12px] text-[#4C594E] leading-snug line-clamp-2">
                          {article.summary}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-[12px] font-bold text-[#142016]">
                          <button
                            type="button"
                            onClick={() => onToggleLike(article.id)}
                            aria-label={`J'aime (${getLikeCount(article)})`}
                            className={`inline-flex items-center gap-1 cursor-pointer ${
                              likedIds[article.id] ? 'text-[#064E15]' : 'hover:text-[#064E15]'
                            }`}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" aria-hidden="true" />
                            <span className="tabular-nums">{getLikeCount(article)}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onOpenArticle(article)}
                            aria-label={`Commentaires (${article.comments})`}
                            className="inline-flex items-center gap-1 hover:text-[#064E15] cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                            <span className="tabular-nums">{article.comments}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onShareArticle(article)}
                            aria-label={`Partager ${article.title}`}
                            className="inline-flex items-center text-gray-400 hover:text-[#064E15] cursor-pointer"
                          >
                            <Forward className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onOpenArticle(article)}
                          aria-label={`Lire l'article : ${article.title}`}
                          className="w-7 h-7 rounded-full bg-[#064E15] hover:bg-[#053D11] text-white flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shrink-0"
                        >
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Par Catégories */}
          <div id="par-categories">
            <div className="flex items-start justify-between gap-4 mb-3.5">
              <div>
                <h2 className="flex items-center gap-2.5 text-[20px] font-extrabold text-[#111812]">
                  <SenegalMiniFlag />
                  <span>Par Catégories</span>
                </h2>
                <p className="mt-1 text-[13px] text-[#4C594E]">
                  Quatre rubriques pour suivre l&apos;actualité, le blog, la culture et l&apos;histoire du Sénégal.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onViewAll('Par Catégories')}
                className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0A5C1B] hover:underline cursor-pointer shrink-0 mt-1"
              >
                <span>Voir tout</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {CATEGORIES_DATA.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onOpenCategory(cat)}
                  className="relative rounded-xl overflow-visible pb-3 group cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[#064E15]"
                >
                  <div className="relative rounded-xl overflow-hidden min-h-[148px] bg-[#D8DFD9] shadow-[0_2px_10px_rgba(0,0,0,0.06)] p-3.5 pb-6 flex flex-col justify-between">
                    <div className="absolute inset-0 opacity-45 pointer-events-none" aria-hidden="true">
                      <MountainPlaceholder />
                    </div>
                    <p className="relative z-10 text-[12px] font-semibold text-[#1A241C] leading-snug">
                      {cat.description}
                    </p>
                  </div>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#064E15] group-hover:bg-[#053D11] text-white text-[12px] font-bold px-4 py-1 rounded-full whitespace-nowrap shadow-sm transition-colors">
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR: Newsletter + Articles Populaires */}
        <aside className="space-y-5">
          {/* Newsletter Card */}
          <div className="bg-[#064E15] rounded-2xl p-5 shadow-[0_4px_14px_rgba(6,78,21,0.2)] text-white">
            <div className="flex items-start gap-3.5">
              <Mail className="w-10 h-9 stroke-[1.7] text-white shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h2 className="text-[17px] font-extrabold leading-tight">
                  L&apos;info SN221 en continu.
                </h2>
                <p className="text-[11px] text-white/90 mt-1 leading-relaxed">
                  Une sélection d&apos;actualités, de billets de blog et de dossiers à recevoir directement dans votre boîte mail.
                </p>
              </div>
            </div>

            <form onSubmit={handleSidebarSubmit} className="mt-4" noValidate>
              <div className="bg-white rounded-full p-0.5 flex items-center shadow-inner">
                <label htmlFor="sidebar-newsletter-email" className="sr-only">
                  Votre adresse e-mail
                </label>
                <input
                  id="sidebar-newsletter-email"
                  type="email"
                  value={sidebarEmail}
                  onChange={(e) => setSidebarEmail(e.target.value)}
                  placeholder="Votre adresse e-mail..."
                  className="flex-1 min-w-0 bg-transparent px-3.5 py-1.5 text-[12px] text-[#1A241C] placeholder:text-gray-400 outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#F6D300] hover:bg-[#e7c500] text-[#111812] text-[12px] font-extrabold px-3.5 py-2 rounded-full inline-flex items-center gap-1 shrink-0 whitespace-nowrap border-2 border-[#064E15] cursor-pointer transition-colors"
                >
                  <span>S&apos;abonner</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
              {sidebarFeedback && (
                <p
                  role="status"
                  className={`mt-2 text-[11px] font-semibold ${
                    sidebarFeedback.valid ? 'text-[#FDEF42]' : 'text-red-200'
                  }`}
                >
                  {sidebarFeedback.message}
                </p>
              )}
            </form>
          </div>

          {/* Articles Populaires Card */}
          <div
            id="articles-populaires"
            className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h2 className="flex items-center gap-2 text-[15px] font-extrabold text-[#111812]">
                  <SenegalMiniFlag className="w-3 h-4" />
                  <span>Articles Populaires</span>
                </h2>
                <p className="mt-1 text-[11px] text-[#4C594E] leading-snug">
                  Les articles d&apos;actualité et billets de blog les plus lus sur SN221.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onViewAll('Articles Populaires')}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0A5C1B] hover:underline cursor-pointer shrink-0 mt-0.5"
              >
                <span>Voir tout</span>
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {POPULAR_ARTICLES.map((article) => (
                <article
                  key={article.id}
                  className="py-3 first:pt-2 last:pb-1 flex items-center gap-3"
                >
                  <div
                    className="w-12 h-12 rounded-lg bg-[#D7DCD8] overflow-hidden shrink-0"
                    aria-hidden="true"
                  >
                    <MountainPlaceholder />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[12px] font-bold text-[#111812] leading-snug">
                      {article.title}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-3 text-[11px] font-bold text-[#142016]">
                      <button
                        type="button"
                        onClick={() => onToggleLike(article.id)}
                        aria-label={`J'aime (${getLikeCount(article)})`}
                        className="inline-flex items-center gap-1 cursor-pointer hover:text-[#064E15]"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-[#064E15] fill-[#064E15]" aria-hidden="true" />
                        <span className="tabular-nums">{getLikeCount(article)}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenArticle(article)}
                        aria-label={`Commentaires (${article.comments})`}
                        className="inline-flex items-center gap-1 cursor-pointer hover:text-[#064E15]"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#1A241C] fill-[#1A241C]" aria-hidden="true" />
                        <span className="tabular-nums">{article.comments}</span>
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenArticle(article)}
                    aria-label={`Lire l'article : ${article.title}`}
                    className="w-6 h-6 rounded-full bg-[#064E15] hover:bg-[#053D11] text-white flex items-center justify-center shrink-0 transition-transform hover:scale-105 cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
