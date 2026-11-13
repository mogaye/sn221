export type AttachmentType = 'none' | 'photo' | 'document';

export interface CommunityCategory {
  id: string;
  name: string;
  description: string;
}

export interface CommunityComment {
  id: string;
  author: string;
  timeAgo: string;
  text: string;
  replies: Array<{
    id: string;
    author: string;
    timeAgo: string;
    text: string;
  }>;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  timeAgo: string;
  categoryId: string;
  categoryName: string;
  title: string;
  content: string;
  attachmentType: AttachmentType;
  attachmentName?: string;
  likes: number;
  shares: number;
  comments: CommunityComment[];
  pinned?: boolean;
  reported?: boolean;
  reportReason?: string;
  status: 'published' | 'hidden';
}

export interface CommunityMember {
  id: string;
  name: string;
  role: string;
  region: string;
  bio: string;
  postsCount: number;
  commentsCount: number;
}

export interface CommunityNotification {
  id: string;
  text: string;
  timeAgo: string;
  read: boolean;
}

export const COMMUNITY_CATEGORIES: CommunityCategory[] = [
  {
    id: 'debat',
    name: 'Le Sénégal en débat',
    description: 'Société, idées, opinions et réflexions.',
  },
  {
    id: 'histoire-memoire',
    name: 'Histoire et mémoire',
    description: 'Événements, témoignages et recherches historiques.',
  },
  {
    id: 'culture-traditions',
    name: 'Culture et traditions',
    description: 'Nos langues, nos coutumes et nos expressions culturelles.',
  },
  {
    id: 'vie-quotidienne',
    name: 'Vie quotidienne',
    description: 'Éducation, travail, expériences et réalités sociales.',
  },
  {
    id: 'nos-regions',
    name: 'Nos régions',
    description: 'Discussions autour de Dakar, Thiès, Saint-Louis, Ziguinchor et des autres régions.',
  },
  {
    id: 'jeunesse-avenir',
    name: 'Jeunesse et avenir',
    description: 'Projets, innovations, ambitions et perspectives.',
  },
  {
    id: 'questions-reponses',
    name: 'Questions et réponses',
    description: 'Demander, apprendre et partager ses connaissances.',
  },
  {
    id: 'souvenirs-temoignages',
    name: 'Souvenirs et témoignages',
    description: 'Raconter les histoires vécues et les souvenirs de famille.',
  },
];

export const COMMUNITY_MEMBERS: CommunityMember[] = [
  {
    id: 'mem-1',
    name: 'Un membre de la communauté',
    role: 'Passionné d’histoire',
    region: 'Dakar',
    bio: 'Contribue régulièrement aux échanges sur les figures méconnues de l’histoire sénégalaise et la transmission intergénérationnelle.',
    postsCount: 14,
    commentsCount: 42,
  },
  {
    id: 'mem-2',
    name: 'Aminata Diop',
    role: 'Chercheuse en patrimoine',
    region: 'Saint-Louis',
    bio: 'Travaille sur les archives photographiques de Ndar et la valorisation de la mémoire orale.',
    postsCount: 19,
    commentsCount: 64,
  },
  {
    id: 'mem-3',
    name: 'Moussa Ndiaye',
    role: 'Enseignant d’histoire',
    region: 'Thiès',
    bio: 'Anime des cercles de lecture autour des royaumes du Cayor, du Djolof et du Baol.',
    postsCount: 11,
    commentsCount: 38,
  },
  {
    id: 'mem-4',
    name: 'Fatou Binetou Sarr',
    role: 'Étudiante & auteure',
    region: 'Ziguinchor',
    bio: 'S’intéresse aux cultures de Casamance, aux langues nationales et aux projets portés par la jeunesse.',
    postsCount: 9,
    commentsCount: 29,
  },
];

const INITIAL_COMMENTS: CommunityComment[] = [
  {
    id: 'c-1',
    author: 'Aminata Diop',
    timeAgo: 'Il y a 18 minutes',
    text: 'Ndaté Yalla Mbodj du Waalo mérite une place centrale dans nos manuels pour son rôle diplomatique et sa résistance.',
    replies: [
      {
        id: 'r-1',
        author: 'Moussa Ndiaye',
        timeAgo: 'Il y a 10 minutes',
        text: 'Tout à fait d’accord, ainsi que Maba Diakhou Bâ et Aline Sitoé Diatta dont l’héritage inspire encore beaucoup les élèves.',
      },
    ],
  },
  {
    id: 'c-2',
    author: 'Fatou Binetou Sarr',
    timeAgo: 'Il y a 12 minutes',
    text: 'On pourrait aussi citer Bouna Alboury Ndiaye ou encore les femmes signares et résistantes méconnues des régions.',
    replies: [],
  },
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorId: 'mem-1',
    authorName: 'Un membre de la communauté',
    timeAgo: 'Il y a 25 minutes',
    categoryId: 'histoire-memoire',
    categoryName: 'Histoire et mémoire',
    title:
      "Quelle personnalité sénégalaise mériterait, selon vous, d'être davantage connue par les jeunes générations ?",
    content:
      "Nous connaissons certaines grandes figures de notre histoire, mais beaucoup d'autres restent peu racontées. Partagez vos propositions et expliquez pourquoi.",
    attachmentType: 'none',
    likes: 18,
    shares: 4,
    comments: Array.from({ length: 12 }, (_, idx) =>
      INITIAL_COMMENTS[idx] ?? {
        id: `c-seed-${idx + 1}`,
        author: idx % 2 === 0 ? 'Moussa Ndiaye' : 'Aminata Diop',
        timeAgo: `Il y a ${idx + 2} minutes`,
        text: 'Contribution archivée sur les grandes figures méconnues de nos terroirs.',
        replies: [],
      }
    ),
    pinned: true,
    status: 'published',
  },
  {
    id: 'post-2',
    authorId: 'mem-2',
    authorName: 'Aminata Diop',
    timeAgo: 'Il y a 2 heures',
    categoryId: 'culture-traditions',
    categoryName: 'Culture et traditions',
    title: 'Préserver nos proverbes en wolof, pulaar, sérère, diola, mandingue et soninké',
    content:
      'Quelles expressions ou sagesses transmises par vos grands-parents continuez-vous d’utiliser au quotidien ? Partagez leur sens et leur origine.',
    attachmentType: 'document',
    attachmentName: 'Recueil_proverbes_Senegal.pdf',
    likes: 24,
    shares: 7,
    comments: [
      {
        id: 'c-201',
        author: 'Fatou Binetou Sarr',
        timeAgo: 'Il y a 1 heure',
        text: 'Merci pour ce document ! La transmission des proverbes passe aussi par le théâtre et la radio locale.',
        replies: [],
      },
    ],
    status: 'published',
  },
  {
    id: 'post-3',
    authorId: 'mem-4',
    authorName: 'Fatou Binetou Sarr',
    timeAgo: 'Il y a 5 heures',
    categoryId: 'nos-regions',
    categoryName: 'Nos régions',
    title: 'Carnet de route entre Ziguinchor, Saint-Louis et Thiès : quels lieux recommandez-vous ?',
    content:
      'Pour les vacances, plusieurs jeunes souhaitent redécouvrir le pays autrement. Quels sites historiques ou lieux de mémoire conseillez-vous dans votre région ?',
    attachmentType: 'photo',
    attachmentName: 'Patrimoine_regions_Senegal.jpg',
    likes: 31,
    shares: 9,
    comments: [
      {
        id: 'c-301',
        author: 'Un membre de la communauté',
        timeAgo: 'Il y a 3 heures',
        text: 'Ne manquez pas les villages de Carabane, Podor et les mégalithes de Sine Ngayène.',
        replies: [],
      },
    ],
    status: 'published',
  },
];

export const INITIAL_NOTIFICATIONS: CommunityNotification[] = [
  {
    id: 'notif-1',
    text: 'Aminata Diop a commenté la discussion sur les personnalités sénégalaises.',
    timeAgo: 'Il y a 18 min',
    read: false,
  },
  {
    id: 'notif-2',
    text: 'Nouvelle publication dans Histoire et mémoire.',
    timeAgo: 'Il y a 25 min',
    read: false,
  },
];

export function filterCommunityPosts(
  posts: CommunityPost[],
  options: {
    query: string;
    categoryId: string | 'all';
    includeHidden?: boolean;
  }
): CommunityPost[] {
  const q = options.query.trim().toLowerCase();
  return posts.filter((post) => {
    if (!options.includeHidden && post.status === 'hidden') return false;
    if (options.categoryId !== 'all' && post.categoryId !== options.categoryId) return false;
    if (!q) return true;
    return (
      post.title.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q) ||
      post.authorName.toLowerCase().includes(q) ||
      post.categoryName.toLowerCase().includes(q)
    );
  });
}

export function createCommunityPost(input: {
  title: string;
  content: string;
  categoryId: string;
  authorName?: string;
  attachmentType?: AttachmentType;
  attachmentName?: string;
}): { ok: true; post: CommunityPost } | { ok: false; error: string } {
  const title = input.title.trim();
  const content = input.content.trim();
  if (!title) {
    return { ok: false, error: 'Veuillez saisir un titre pour votre discussion.' };
  }
  if (!content) {
    return { ok: false, error: 'Veuillez écrire votre message avant de publier.' };
  }
  const cat =
    COMMUNITY_CATEGORIES.find((c) => c.id === input.categoryId) ?? COMMUNITY_CATEGORIES[0];

  const post: CommunityPost = {
    id: `post-${Date.now()}`,
    authorId: 'mem-1',
    authorName: input.authorName?.trim() || 'Un membre de la communauté',
    timeAgo: "À l'instant",
    categoryId: cat.id,
    categoryName: cat.name,
    title,
    content,
    attachmentType: input.attachmentType ?? 'none',
    attachmentName: input.attachmentName?.trim() || undefined,
    likes: 0,
    shares: 0,
    comments: [],
    status: 'published',
  };

  return { ok: true, post };
}

export function addCommentToPost(
  posts: CommunityPost[],
  postId: string,
  text: string,
  author = 'Un membre de la communauté'
): CommunityPost[] {
  const clean = text.trim();
  if (!clean) return posts;
  return posts.map((post) =>
    post.id === postId
      ? {
          ...post,
          comments: [
            ...post.comments,
            {
              id: `c-${Date.now()}`,
              author,
              timeAgo: "À l'instant",
              text: clean,
              replies: [],
            },
          ],
        }
      : post
  );
}

export function addReplyToComment(
  posts: CommunityPost[],
  postId: string,
  commentId: string,
  text: string,
  author = 'Un membre de la communauté'
): CommunityPost[] {
  const clean = text.trim();
  if (!clean) return posts;
  return posts.map((post) =>
    post.id === postId
      ? {
          ...post,
          comments: post.comments.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  replies: [
                    ...comment.replies,
                    {
                      id: `r-${Date.now()}`,
                      author,
                      timeAgo: "À l'instant",
                      text: clean,
                    },
                  ],
                }
              : comment
          ),
        }
      : post
  );
}

export function reportCommunityPost(
  posts: CommunityPost[],
  postId: string,
  reason: string
): CommunityPost[] {
  const cleanReason = reason.trim() || 'Contenu à vérifier par la modération';
  return posts.map((post) =>
    post.id === postId ? { ...post, reported: true, reportReason: cleanReason } : post
  );
}

export function moderateCommunityPost(
  posts: CommunityPost[],
  postId: string,
  action: 'hide' | 'approve' | 'toggle-pin'
): CommunityPost[] {
  return posts.map((post) => {
    if (post.id !== postId) return post;
    if (action === 'hide') {
      return { ...post, status: 'hidden' };
    }
    if (action === 'approve') {
      return { ...post, status: 'published', reported: false, reportReason: undefined };
    }
    return { ...post, pinned: !post.pinned };
  });
}
