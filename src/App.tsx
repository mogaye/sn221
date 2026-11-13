import React, { useState } from 'react';
import {
  ArticleItem,
  CategoryCardItem,
  EventItem,
  GALLERY_SLIDES,
  HERO_SLIDES,
  wrapIndex,
} from './utils/portalLogic';
import { TopHeader } from './components/TopHeader';
import { HeroBanner } from './components/HeroBanner';
import { QuickNavCards } from './components/QuickNavCards';
import { MainContentGrid } from './components/MainContentGrid';
import { EventsAndGallery } from './components/EventsAndGallery';
import { CommunityPage } from './components/CommunityPage';
import { HomeDocumentSpotlight } from './components/HomeDocumentSpotlight';
import { Footer } from './components/Footer';
import { ModalState, PortalModal } from './components/PortalModal';

export default function App() {
  const [activeNav, setActiveNav] = useState('accueil');
  const [activePage, setActivePage] = useState<'home' | 'community'>('home');
  const [activeSlide, setActiveSlide] = useState(0);
  const [gallerySlide, setGallerySlide] = useState(0);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [modal, setModal] = useState<ModalState>({ type: 'closed' });
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleSelectNav = (id: string, subItem?: string) => {
    setActiveNav(id);

    if (id === 'communaute') {
      setActivePage('community');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setActivePage('home');

    if (subItem) {
      setModal({
        type: 'detail',
        badge: id.charAt(0).toUpperCase() + id.slice(1),
        title: subItem,
        body: `Exploration de la rubrique « ${subItem} » sur SN221 — Blog & Actualité du Sénégal.`,
      });
    } else if (id === 'accueil') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetMap: Record<string, string> = {
        actualites: 'a-la-une',
        blog: 'articles-populaires',
        culture: 'par-categories',
        histoire: 'par-categories',
        evenements: 'prochains-evenements',
        regions: 'par-categories',
      };
      const target = targetMap[id];
      if (target) {
        window.setTimeout(() => {
          document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    }
  };

  const handleToggleLike = (id: string) => {
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenArticle = (article: ArticleItem) => {
    setModal({
      type: 'detail',
      badge: article.category,
      title: article.title,
      body: article.summary,
    });
  };

  const handleOpenCategory = (cat: CategoryCardItem) => {
    setModal({
      type: 'detail',
      badge: 'Catégorie',
      title: cat.label,
      body: cat.description,
    });
  };

  const handleOpenEvent = (evt: EventItem) => {
    setModal({
      type: 'detail',
      badge: 'Événement',
      title: evt.title,
      body: evt.description,
      meta: `${evt.day} ${evt.month} · ${evt.location} · ${evt.time}`,
    });
  };

  const handleOpenGalleryItem = (item: { id: string; title: string; period?: string }) => {
    setModal({
      type: 'detail',
      badge: item.period ? `Galerie · ${item.period}` : 'Galerie SN221',
      title: item.title,
      body: `Reportage et archive visuelle SN221 : ${item.title}.`,
    });
  };

  const handleShareArticle = (article: ArticleItem) => {
    showToast(`Lien copié pour « ${article.title} »`);
  };

  const handleViewAll = (section: string) => {
    setModal({
      type: 'detail',
      badge: 'Collection complète',
      title: section,
      body: `Tous les dossiers et archives de la section « ${section} » sont accessibles depuis la recherche ou les filtres thématiques.`,
    });
  };

  const handleFooterLink = (label: string) => {
    if (label === 'Communauté' || label === 'Discussions') {
      setActiveNav('communaute');
      setActivePage('community');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const map: Record<string, string> = {
      Accueil: 'top',
      Actualités: 'a-la-une',
      Blog: 'articles-populaires',
      Culture: 'par-categories',
      Histoire: 'par-categories',
      Régions: 'par-categories',
      Galerie: 'galerie-historique',
    };
    const id = map[label];
    if (id) {
      setActivePage('home');
      setActiveNav(
        label === 'Accueil'
          ? 'accueil'
          : label === 'Actualités'
          ? 'actualites'
          : label === 'Régions'
          ? 'regions'
          : label.toLowerCase()
      );
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
      return;
    }
    setModal({
      type: 'detail',
      badge: 'Information',
      title: label,
      body: `Page d'information « ${label} » — SN221 · Blog & Actualité du Sénégal (2026).`,
    });
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#F9FAF9] text-[#1A241C]">
      <TopHeader
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        onOpenSearch={() => setModal({ type: 'search' })}
        onSocialClick={(network) => showToast(`SN221 sur ${network}`)}
      />

      <main className="flex-1">
        {activePage === 'community' ? (
          <CommunityPage onShowToast={showToast} />
        ) : (
          <>
            <HeroBanner
              activeSlide={activeSlide}
              onPrevSlide={() => setActiveSlide((prev) => wrapIndex(prev, -1, HERO_SLIDES.length))}
              onNextSlide={() => setActiveSlide((prev) => wrapIndex(prev, 1, HERO_SLIDES.length))}
              onOpenSlideDetail={(idx) => {
                const slide = HERO_SLIDES[idx] ?? HERO_SLIDES[0];
                setModal({
                  type: 'detail',
                  badge: `Dossier ${slide.number}`,
                  title: slide.title,
                  body: slide.subtitle,
                });
              }}
            />

            <QuickNavCards
              onNavigateSection={(sectionId) => {
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <HomeDocumentSpotlight />

            <MainContentGrid
              likedIds={likedIds}
              onToggleLike={handleToggleLike}
              onOpenArticle={handleOpenArticle}
              onOpenCategory={handleOpenCategory}
              onShareArticle={handleShareArticle}
              onViewAll={handleViewAll}
            />

            <EventsAndGallery
              gallerySlide={gallerySlide}
              onChangeGallerySlide={setGallerySlide}
              onPrevGallery={() =>
                setGallerySlide((prev) => wrapIndex(prev, -1, GALLERY_SLIDES.length))
              }
              onNextGallery={() =>
                setGallerySlide((prev) => wrapIndex(prev, 1, GALLERY_SLIDES.length))
              }
              onOpenEvent={handleOpenEvent}
              onOpenGalleryItem={handleOpenGalleryItem}
              onViewAll={handleViewAll}
            />
          </>
        )}
      </main>

      <Footer
        onSelectLink={handleFooterLink}
        onSocialClick={(network) => showToast(`SN221 sur ${network}`)}
      />

      <PortalModal
        modal={modal}
        onClose={() => setModal({ type: 'closed' })}
        onOpenResult={(item) => {
          if (item.category.startsWith('Document ·')) {
            setModal({ type: 'closed' });
            setActivePage('home');
            window.setTimeout(() => {
              document.getElementById('document-budget-2027')?.scrollIntoView({ behavior: 'smooth' });
            }, 50);
            return;
          }
          setModal({
            type: 'detail',
            badge: item.category,
            title: item.title,
            body: item.summary,
          });
        }}
      />

      {toast && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#064E15] text-white text-[12px] font-bold px-4 py-2.5 rounded-full shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
