import { INITIAL_DOCUMENTS } from './documentsLogic';

export interface ArticleItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  likes: number;
  comments: number;
  featured?: boolean;
}

export interface EventItem {
  id: string;
  day: string;
  month: string;
  location: string;
  time: string;
  accentColor: 'green' | 'yellow' | 'red';
  title: string;
  description: string;
}

export interface CategoryCardItem {
  id: string;
  label: string;
  description: string;
}

export interface QuickNavItem {
  id: string;
  label: string;
  targetSection: string;
}

export interface NavDropdownItem {
  id: string;
  label: string;
  hasDropdown: boolean;
  subItems?: string[];
}

export interface HeroSlide {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
}

export const BRAND_NAME = 'SN221';
export const BRAND_TAGLINE = 'Blog & Actualité du Sénégal';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    number: '01',
    title: "SN221 : l'actualité, le blog et les voix du Sénégal.",
    subtitle:
      "De l'actualité nationale aux chroniques de blog, en passant par la culture, l'innovation et notre histoire, suivez tout ce qui fait vivre le Sénégal.",
    ctaLabel: "Lire l'actualité",
  },
  {
    id: 'slide-2',
    number: '02',
    title: 'Dakar, Saint-Louis, Ziguinchor : le Sénégal en direct.',
    subtitle:
      'Reportages de terrain, initiatives locales et grands dossiers économiques et citoyens à travers nos 14 régions.',
    ctaLabel: 'Explorer les régions',
  },
  {
    id: 'slide-3',
    number: '03',
    title: 'Chroniques, tech, culture et regards de la diaspora.',
    subtitle:
      'Des billets de blog engagés, des portraits de créateurs et des analyses sur les transformations de la société sénégalaise.',
    ctaLabel: 'Découvrir le blog',
  },
  {
    id: 'slide-4',
    number: '04',
    title: 'La Place des Sénégalais : votre voix sur SN221.',
    subtitle:
      "Rejoignez l'espace de discussion ouvert pour débattre de l'actualité, partager vos idées et raconter votre quotidien.",
    ctaLabel: 'Rejoindre la communauté',
  },
];

export const NAV_ITEMS: NavDropdownItem[] = [
  {
    id: 'actualites',
    label: 'Actualités',
    hasDropdown: true,
    subItems: ['À la une', 'Société & Économie', 'Éducation & Jeunesse', 'Sport & Diaspora'],
  },
  {
    id: 'blog',
    label: 'Blog',
    hasDropdown: true,
    subItems: ['Chroniques & Opinions', 'Tech & Innovation', 'Portraits', 'Lifestyle & Voyages'],
  },
  {
    id: 'culture',
    label: 'Culture',
    hasDropdown: true,
    subItems: ['Arts & Musique', 'Cinéma & Littérature', 'Langues & Traditions', 'Patrimoine UNESCO'],
  },
  {
    id: 'histoire',
    label: 'Histoire',
    hasDropdown: true,
    subItems: ['Royaumes anciens', 'Grandes figures', 'Mémoire de Gorée', 'Indépendance'],
  },
  {
    id: 'regions',
    label: 'Régions',
    hasDropdown: true,
    subItems: ['Dakar', 'Thiès', 'Saint-Louis', 'Ziguinchor', 'Sine-Saloum'],
  },
  {
    id: 'communaute',
    label: 'Communauté',
    hasDropdown: false,
  },
];

export const QUICK_NAV_ITEMS: QuickNavItem[] = [
  { id: 'actualites', label: 'Actualités', targetSection: 'a-la-une' },
  { id: 'blog-recits', label: 'Blog & Récits', targetSection: 'articles-populaires' },
  { id: 'culture', label: 'Culture', targetSection: 'par-categories' },
  { id: 'evenements', label: 'Événements', targetSection: 'prochains-evenements' },
  { id: 'nos-regions', label: 'Nos Régions', targetSection: 'par-categories' },
  { id: 'galerie', label: 'Galerie', targetSection: 'galerie-historique' },
];

export const FEATURED_ARTICLE: ArticleItem = {
  id: 'feat-1',
  category: 'Actualité',
  title: "Sénégal numérique : comment la jeunesse réinvente l'économie locale de Dakar aux régions",
  summary:
    "Entre startups technologiques, créativité culturelle et initiatives citoyennes, une nouvelle génération façonne le Sénégal d'aujourd'hui tout en s'appuyant sur ses valeurs.",
  likes: 34,
  comments: 9,
  featured: true,
};

export const SECONDARY_ARTICLES: ArticleItem[] = [
  {
    id: 'sec-1',
    category: 'Blog',
    title: 'Chronique : vivre au rythme de Dakar entre tradition et modernité',
    summary: 'Regard sur les mutations urbaines, la mobilité et les nouveaux espaces de création.',
    likes: 19,
    comments: 5,
  },
  {
    id: 'sec-2',
    category: 'Culture',
    title: 'Saint-Louis, Gorée et Casamance : le tourisme culturel en plein essor',
    summary: 'Festivals, patrimoine vivant et initiatives locales dynamisent nos territoires.',
    likes: 22,
    comments: 6,
  },
];

export const POPULAR_ARTICLES: ArticleItem[] = [
  {
    id: 'pop-1',
    category: 'Actualité',
    title: 'Bilan et perspectives de la campagne agricole dans le bassin arachidier.',
    summary:
      'Tour d’horizon des rendements, de la modernisation rurale et des attentes des producteurs locaux.',
    likes: 45,
    comments: 12,
  },
  {
    id: 'pop-2',
    category: 'Blog',
    title: "L'essor du cinéma et des séries sénégalaises sur la scène internationale.",
    summary:
      'Une nouvelle vague de réalisateurs et scénaristes porte nos histoires bien au-delà des frontières.',
    likes: 38,
    comments: 9,
  },
  {
    id: 'pop-3',
    category: 'Histoire',
    title: "De l'empire du Djolof à aujourd'hui : ce que l'histoire nous apprend.",
    summary:
      'Comment les héritages politiques et sociaux anciens éclairent les débats du Sénégal contemporain.',
    likes: 29,
    comments: 6,
  },
  {
    id: 'pop-4',
    category: 'Société',
    title: 'Entrepreneuriat de la diaspora : ces projets qui transforment nos régions.',
    summary:
      'Agrotech, santé et formation professionnelle : focus sur les passerelles entre le Sénégal et sa diaspora.',
    likes: 26,
    comments: 7,
  },
];

export const CATEGORIES_DATA: CategoryCardItem[] = [
  {
    id: 'cat-actualites',
    label: 'Actualités',
    description: 'Économie, société, éducation et grands dossiers du moment.',
  },
  {
    id: 'cat-blog',
    label: 'Blog & Opinions',
    description: 'Chroniques, tribunes, tech, lifestyle et récits personnels.',
  },
  {
    id: 'cat-culture',
    label: 'Culture & Sport',
    description: 'Arts, musique, littérature, traditions et exploits sportifs.',
  },
  {
    id: 'cat-histoire-regions',
    label: 'Histoire & Régions',
    description: 'Mémoire nationale, figures historiques et vie de nos terroirs.',
  },
];

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    day: '25',
    month: 'Nov',
    location: 'Dakar',
    time: '10h',
    accentColor: 'green',
    title: 'Forum SN221 : Médias, Jeunesse & Tech',
    description:
      'Tables rondes sur le journalisme citoyen, les créateurs de contenu et l’innovation numérique au Sénégal.',
  },
  {
    id: 'evt-2',
    day: '12',
    month: 'Déc',
    location: 'Saint-Louis',
    time: '15h',
    accentColor: 'yellow',
    title: 'Festival Culturel et Patrimoine de Ndar',
    description:
      'Rencontres littéraires, expositions photo contemporaines et balades sur l’île historique.',
  },
  {
    id: 'evt-3',
    day: '18',
    month: 'Déc',
    location: 'Thiès',
    time: '11h',
    accentColor: 'red',
    title: 'Rencontres de l’Entrepreneuriat Régional',
    description:
      'Échanges entre porteurs de projets, artisans et investisseurs locaux autour de l’économie verte.',
  },
  {
    id: 'evt-4',
    day: '27',
    month: 'Déc',
    location: 'Ziguinchor',
    time: '16h',
    accentColor: 'green',
    title: 'Festival des arts, musiques et terroirs',
    description:
      'Célébration des langues, gastronomies et initiatives culturelles vivantes de la Casamance.',
  },
];

export const GALLERY_SLIDES = [
  [
    { id: 'gal-1', title: 'Dakar en mouvement — Plateau & Corniche', period: 'Reportage 2026' },
    { id: 'gal-2', title: 'Pont Faidherbe — Saint-Louis (Ndar)', period: 'Patrimoine & Ville' },
    { id: 'gal-3', title: 'Artisanat contemporain et création locale', period: 'Dossier Blog' },
    { id: 'gal-4', title: 'Île de Gorée — Mémoire et culture', period: 'Patrimoine UNESCO' },
  ],
  [
    { id: 'gal-5', title: "Place de l'Indépendance — Dakar", period: 'Actualité & Histoire' },
    { id: 'gal-6', title: 'Grande Mosquée de Touba', period: 'Patrimoine spirituel' },
    { id: 'gal-7', title: 'Cases à impluvium de Casamance', period: 'Terroirs & Culture' },
    { id: 'gal-8', title: 'Delta du Saloum — Pêche et écologie', period: 'Reportage Régions' },
  ],
  [
    { id: 'gal-9', title: 'Musée des Civilisations Noires', period: 'Dakar · Culture' },
    { id: 'gal-10', title: 'Phare des Mamelles au crépuscule', period: 'Cap-Vert' },
    { id: 'gal-11', title: 'Port autonome et pêche artisanale', period: 'Économie bleue' },
    { id: 'gal-12', title: 'Fleuve Sénégal à Podor', period: 'Fouta-Toro' },
  ],
  [
    { id: 'gal-13', title: 'Île aux coquillages de Fadiouth', period: 'Sine-Saloum' },
    { id: 'gal-14', title: 'Maison des Esclaves — Gorée', period: 'Mémoire mondiale' },
    { id: 'gal-15', title: 'Chutes de Dindefelo', period: 'Kédougou' },
    { id: 'gal-16', title: 'Monument de la Renaissance Africaine', period: 'Dakar' },
  ],
];

export function wrapIndex(currentIndex: number, delta: number, total: number): number {
  if (total <= 0) return 0;
  return (((currentIndex + delta) % total) + total) % total;
}

export function validateNewsletterEmail(email: string): { valid: boolean; message: string } {
  const trimmed = email.trim();
  if (!trimmed) {
    return { valid: false, message: 'Veuillez saisir votre adresse e-mail.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { valid: false, message: 'Adresse e-mail invalide.' };
  }
  return { valid: true, message: 'Merci ! Vous êtes abonné(e) à la newsletter SN221.' };
}

export function toggleLikeState(
  likedIds: Record<string, boolean>,
  baseLikes: number,
  itemId: string
): { nextLiked: Record<string, boolean>; count: number } {
  const isCurrentlyLiked = Boolean(likedIds[itemId]);
  const nextLiked = { ...likedIds, [itemId]: !isCurrentlyLiked };
  const count = isCurrentlyLiked ? baseLikes : baseLikes + 1;
  return { nextLiked, count };
}

export function searchPortalContent(
  query: string
): Array<{ id: string; category: string; title: string; summary: string }> {
  const q = query.trim().toLowerCase();
  const allItems = [
    FEATURED_ARTICLE,
    ...SECONDARY_ARTICLES,
    ...POPULAR_ARTICLES,
    ...UPCOMING_EVENTS.map((e) => ({
      id: e.id,
      category: `Événement · ${e.day} ${e.month}`,
      title: e.title,
      summary: e.description,
    })),
    ...INITIAL_DOCUMENTS.map((d) => ({
      id: d.id,
      category: `Document · ${d.category}`,
      title: d.title,
      summary: d.summary,
    })),
  ];

  if (!q) return allItems;
  return allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q)
  );
}
