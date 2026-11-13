import React, { useRef, useState } from 'react';
import {
  ArrowRight,
  Bell,
  BookmarkCheck,
  BookmarkPlus,
  CheckCircle2,
  EyeOff,
  FileText,
  Flag,
  Heart,
  Image as ImageIcon,
  MessageSquare,
  Pin,
  Plus,
  Search,
  Share2,
  ShieldCheck,
  User,
  X,
} from 'lucide-react';
import {
  AttachmentType,
  COMMUNITY_CATEGORIES,
  COMMUNITY_MEMBERS,
  CommunityMember,
  CommunityNotification,
  CommunityPost,
  INITIAL_COMMUNITY_POSTS,
  INITIAL_NOTIFICATIONS,
  addCommentToPost,
  addReplyToComment,
  createCommunityPost,
  filterCommunityPosts,
  moderateCommunityPost,
  reportCommunityPost,
} from '../utils/communityLogic';
import { SenegalMiniFlag } from './SenegalGraphics';

interface CommunityPageProps {
  onShowToast: (message: string) => void;
}

export function CommunityPage({ onShowToast }: CommunityPageProps) {
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [followedTopics, setFollowedTopics] = useState<Record<string, boolean>>({
    'histoire-memoire': true,
    'culture-traditions': true,
  });
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [activeReplyTarget, setActiveReplyTarget] = useState<string | null>(null);

  // Composer state
  const [composerOpen, setComposerOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategoryId, setNewCategoryId] = useState('histoire-memoire');
  const [attachmentType, setAttachmentType] = useState<AttachmentType>('none');
  const [attachmentName, setAttachmentName] = useState('');
  const [composerError, setComposerError] = useState<string | null>(null);

  // Notifications, Member profile, Reporting & Moderation
  const [notifications, setNotifications] = useState<CommunityNotification[]>(INITIAL_NOTIFICATIONS);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<CommunityMember | null>(null);
  const [reportingPostId, setReportingPostId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [moderatorMode, setModeratorMode] = useState(false);

  const composerSectionRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const pushNotification = (text: string) => {
    setNotifications((prev) => [
      { id: `notif-${Date.now()}`, text, timeAgo: "À l'instant", read: false },
      ...prev,
    ]);
  };

  const handleJoinDiscussion = () => {
    setComposerOpen(true);
    window.setTimeout(() => {
      composerSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const res = createCommunityPost({
      title: newTitle,
      content: newContent,
      categoryId: newCategoryId,
      attachmentType,
      attachmentName,
    });
    if (!res.ok) {
      setComposerError(res.error);
      return;
    }
    setPosts((prev) => [res.post, ...prev]);
    setNewTitle('');
    setNewContent('');
    setAttachmentType('none');
    setAttachmentName('');
    setComposerError(null);
    setComposerOpen(false);
    pushNotification(`Votre discussion « ${res.post.title} » a été publiée.`);
    onShowToast('Publication ajoutée sur SN221 — La Place des Sénégalais.');
  };

  const handleToggleLike = (post: CommunityPost) => {
    const currentlyLiked = Boolean(likedPosts[post.id]);
    setLikedPosts((prev) => ({ ...prev, [post.id]: !currentlyLiked }));
    setPosts((prev) =>
      prev.map((p) =>
        p.id === post.id ? { ...p, likes: p.likes + (currentlyLiked ? -1 : 1) } : p
      )
    );
  };

  const handleShare = (post: CommunityPost) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, shares: p.shares + 1 } : p))
    );
    onShowToast(`Discussion partagée : « ${post.title} »`);
  };

  const handleSubmitComment = (postId: string) => {
    const text = commentInputs[postId] ?? '';
    if (!text.trim()) return;
    setPosts((prev) => addCommentToPost(prev, postId, text));
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
    pushNotification('Nouveau commentaire ajouté à la discussion.');
  };

  const handleSubmitReply = (postId: string, commentId: string) => {
    const key = `${postId}:${commentId}`;
    const text = replyInputs[key] ?? '';
    if (!text.trim()) return;
    setPosts((prev) => addReplyToComment(prev, postId, commentId, text));
    setReplyInputs((prev) => ({ ...prev, [key]: '' }));
    setActiveReplyTarget(null);
    pushNotification('Réponse publiée dans le fil de discussion.');
  };

  const handleToggleFollowTopic = (catId: string, catName: string) => {
    const next = !followedTopics[catId];
    setFollowedTopics((prev) => ({ ...prev, [catId]: next }));
    onShowToast(next ? `Vous suivez désormais « ${catName} ».` : `Sujet « ${catName} » retiré.`);
  };

  const handleConfirmReport = (postId: string) => {
    setPosts((prev) => reportCommunityPost(prev, postId, reportReason));
    setReportingPostId(null);
    setReportReason('');
    pushNotification('Signalement transmis à la modération.');
    onShowToast('Publication signalée pour examen.');
  };

  const handleModerate = (postId: string, action: 'hide' | 'approve' | 'toggle-pin') => {
    setPosts((prev) => moderateCommunityPost(prev, postId, action));
    const msgMap = {
      hide: 'Publication masquée par la modération.',
      approve: 'Publication approuvée.',
      'toggle-pin': 'Épinglage mis à jour.',
    };
    onShowToast(msgMap[action]);
  };

  const filteredPosts = filterCommunityPosts(posts, {
    query: searchQuery,
    categoryId: selectedCategory,
    includeHidden: moderatorMode,
  }).sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)));

  const trendingPosts = posts.filter((p) => p.status === 'published').slice(0, 3);

  return (
    <div className="pb-10">
      {/* Thin top tri-color accent stripe right below header */}
      <div className="h-[3px] w-full flex" aria-hidden="true">
        <div className="w-1/3 bg-[#00853F]" />
        <div className="w-1/3 bg-[#FDEF42]" />
        <div className="w-1/3 bg-[#E31B23]" />
      </div>

      {/* Community Hero Banner */}
      <section className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-4">
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#064E15] text-white overflow-hidden px-6 sm:px-10 py-8 sm:py-10 shadow-[0_6px_22px_rgba(6,78,21,0.22)]">
          {/* Decorative national flag corner ribbons */}
          <svg
            viewBox="0 0 1160 220"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-90"
            aria-hidden="true"
          >
            <path d="M 1160 0 L 1160 135 C 1060 95 960 40 890 0 Z" fill="#00853F" />
            <path d="M 1160 65 L 1160 170 C 1060 140 990 100 935 60 Z" fill="#FDEF42" opacity="0.92" />
            <path d="M 1160 125 L 1160 220 L 980 220 C 1045 180 1105 150 1160 125 Z" fill="#E31B23" />
          </svg>

          <div className="relative z-10 max-w-[760px]">
            <p className="text-[12px] sm:text-[13px] font-bold text-[#FDEF42]">
              Nos voix, nos idées, notre Sénégal.
            </p>
            <h1 className="mt-1.5 text-[26px] sm:text-[36px] font-extrabold leading-tight">
              La Place des Sénégalais
            </h1>
            <p className="mt-3 text-[13px] sm:text-[15px] text-white/95 leading-relaxed">
              « Bienvenue dans un espace où les idées se rencontrent, où les expériences se partagent et où chaque voix a sa place. Que vous soyez passionné d&apos;histoire, amoureux de culture, étudiant, chercheur ou simplement curieux, prenez part aux conversations qui font vivre le Sénégal. »
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleJoinDiscussion}
                className="bg-[#F6D300] hover:bg-[#e7c500] text-[#111812] text-[13px] font-extrabold px-5 py-2.5 rounded-full inline-flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
              >
                <span>Rejoindre la discussion</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* En-tête + Barre de recherche + Actions Notifications / Modération */}
      <section className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2.5 text-[20px] font-extrabold text-[#111812]">
                <SenegalMiniFlag />
                <span>La parole est à vous.</span>
              </h2>
              <p className="mt-1 text-[13px] text-[#4C594E]">
                Un Sénégal, mille expériences, des conversations sans frontières.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Notifications bell */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setNotificationsOpen((prev) => !prev);
                    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
                  }}
                  aria-label={`Notifications (${unreadCount} non lues)`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gray-200 text-[12px] font-bold text-[#1A241C] hover:border-[#064E15] hover:text-[#064E15] cursor-pointer"
                >
                  <Bell className="w-4 h-4" aria-hidden="true" />
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="bg-[#E31B23] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full tabular-nums">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-3 z-30">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                      <span className="text-[12px] font-extrabold text-[#111812]">
                        Notifications récentes
                      </span>
                      <button
                        type="button"
                        onClick={() => setNotificationsOpen(false)}
                        aria-label="Fermer les notifications"
                        className="text-gray-400 hover:text-[#111812] cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="divide-y divide-gray-100 max-h-56 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className="py-2.5 text-[12px]">
                          <p className="text-[#1A241C] font-medium">{n.text}</p>
                          <p className="text-[11px] text-gray-500 mt-0.5">{n.timeAgo}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Moderator mode toggle */}
              <button
                type="button"
                onClick={() => setModeratorMode((prev) => !prev)}
                aria-pressed={moderatorMode}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-bold border cursor-pointer transition-colors ${
                  moderatorMode
                    ? 'bg-[#064E15] text-white border-[#064E15]'
                    : 'border-gray-200 text-[#1A241C] hover:border-[#064E15]'
                }`}
              >
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>Modération</span>
              </button>

              {/* Primary CTA: Créer une publication */}
              <button
                type="button"
                onClick={() => setComposerOpen((prev) => !prev)}
                className="bg-[#064E15] hover:bg-[#053D11] text-white text-[13px] font-bold px-4 py-2 rounded-full inline-flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Créer une publication</span>
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-4 flex items-center gap-2.5 bg-[#F4F6F4] border border-gray-200 rounded-full px-4 py-2 focus-within:border-[#064E15]">
            <Search className="w-4 h-4 text-[#4C594E] shrink-0" aria-hidden="true" />
            <label htmlFor="community-search" className="sr-only">
              Rechercher une discussion, un sujet ou un membre
            </label>
            <input
              id="community-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une discussion, un sujet ou un membre..."
              className="w-full bg-transparent text-[13px] text-[#1A241C] placeholder:text-gray-500 outline-none"
            />
          </div>
        </div>
      </section>

      {/* Post / Discussion Composer */}
      {composerOpen && (
        <section
          ref={composerSectionRef}
          aria-label="Créer une publication"
          className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-5"
        >
          <form
            onSubmit={handlePublish}
            className="bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(6,78,21,0.1)] border border-[#064E15]/20 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-extrabold text-[#111812]">
                Créer une publication
              </h3>
              <button
                type="button"
                onClick={() => setComposerOpen(false)}
                aria-label="Fermer le formulaire de publication"
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-3">
              <div>
                <label htmlFor="new-post-title" className="block text-[12px] font-bold text-[#1A241C] mb-1">
                  Titre de la discussion
                </label>
                <input
                  id="new-post-title"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex : Quels récits régionaux souhaitez-vous partager ?"
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-[13px] outline-none focus:border-[#064E15]"
                />
              </div>

              <div>
                <label htmlFor="new-post-category" className="block text-[12px] font-bold text-[#1A241C] mb-1">
                  Catégorie
                </label>
                <select
                  id="new-post-category"
                  value={newCategoryId}
                  onChange={(e) => setNewCategoryId(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-[13px] bg-white outline-none focus:border-[#064E15]"
                >
                  {COMMUNITY_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="new-post-content" className="block text-[12px] font-bold text-[#1A241C] mb-1">
                Votre message
              </label>
              <textarea
                id="new-post-content"
                rows={3}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Exprimez votre point de vue, posez une question ou partagez un souvenir..."
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-[13px] outline-none focus:border-[#064E15]"
              />
            </div>

            {/* Text / Photo / Document selector */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAttachmentType('none')}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-bold border cursor-pointer ${
                    attachmentType === 'none'
                      ? 'bg-[#EAF3EA] border-[#064E15] text-[#064E15]'
                      : 'border-gray-200 text-[#4C594E]'
                  }`}
                >
                  Texte seul
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAttachmentType('photo');
                    if (!attachmentName) setAttachmentName('Archive_photographique_Senegal.jpg');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold border cursor-pointer ${
                    attachmentType === 'photo'
                      ? 'bg-[#EAF3EA] border-[#064E15] text-[#064E15]'
                      : 'border-gray-200 text-[#4C594E]'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Ajouter une photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAttachmentType('document');
                    if (!attachmentName) setAttachmentName('Document_historique.pdf');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold border cursor-pointer ${
                    attachmentType === 'document'
                      ? 'bg-[#EAF3EA] border-[#064E15] text-[#064E15]'
                      : 'border-gray-200 text-[#4C594E]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Joindre un document</span>
                </button>
              </div>

              <button
                type="submit"
                className="bg-[#064E15] hover:bg-[#053D11] text-white text-[13px] font-bold px-5 py-2 rounded-full cursor-pointer"
              >
                Publier dans la communauté
              </button>
            </div>

            {attachmentType !== 'none' && (
              <div className="flex items-center gap-2 bg-[#F4F6F4] rounded-xl px-3.5 py-2">
                {attachmentType === 'photo' ? (
                  <ImageIcon className="w-4 h-4 text-[#064E15]" />
                ) : (
                  <FileText className="w-4 h-4 text-[#064E15]" />
                )}
                <label htmlFor="attachment-name" className="sr-only">
                  Nom du fichier joint
                </label>
                <input
                  id="attachment-name"
                  type="text"
                  value={attachmentName}
                  onChange={(e) => setAttachmentName(e.target.value)}
                  className="flex-1 bg-transparent text-[12px] font-medium outline-none"
                  placeholder="Nom du fichier ou légende..."
                />
              </div>
            )}

            {composerError && (
              <p role="alert" className="text-[12px] font-semibold text-[#E31B23]">
                {composerError}
              </p>
            )}
          </form>
        </section>
      )}

      {/* Main 2-Column Community Layout */}
      <section className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
          {/* LEFT: Catégories + Fil d'actualité */}
          <div className="space-y-6 min-w-0">
            {/* Explorer les discussions (8 categories) */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-gray-100">
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <h2 className="flex items-center gap-2.5 text-[18px] font-extrabold text-[#111812]">
                  <SenegalMiniFlag />
                  <span>Explorer les discussions</span>
                </h2>
                {selectedCategory !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className="text-[12px] font-bold text-[#064E15] hover:underline cursor-pointer"
                  >
                    Tout afficher
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COMMUNITY_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const isFollowed = Boolean(followedTopics[cat.id]);
                  return (
                    <div
                      key={cat.id}
                      className={`rounded-xl p-3.5 border transition-colors ${
                        isSelected
                          ? 'bg-[#EAF3EA] border-[#064E15]'
                          : 'bg-[#F9FAF9] border-gray-100 hover:border-[#064E15]/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedCategory((prev) => (prev === cat.id ? 'all' : cat.id))
                          }
                          className="text-left flex-1 cursor-pointer"
                        >
                          <h3 className="text-[13px] font-extrabold text-[#111812]">{cat.name}</h3>
                          <p className="mt-1 text-[12px] text-[#4C594E] leading-snug">
                            {cat.description}
                          </p>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleFollowTopic(cat.id, cat.name)}
                          aria-label={isFollowed ? `Ne plus suivre ${cat.name}` : `Suivre ${cat.name}`}
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 cursor-pointer ${
                            isFollowed
                              ? 'bg-[#064E15] text-white'
                              : 'bg-white border border-gray-200 text-[#1A241C] hover:border-[#064E15]'
                          }`}
                        >
                          {isFollowed ? (
                            <>
                              <BookmarkCheck className="w-3 h-3" />
                              <span>Suivi</span>
                            </>
                          ) : (
                            <>
                              <BookmarkPlus className="w-3 h-3" />
                              <span>Suivre</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Fil d'actualité : Les conversations du moment */}
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <h2 className="flex items-center gap-2.5 text-[20px] font-extrabold text-[#111812]">
                  <SenegalMiniFlag />
                  <span>Les conversations du moment</span>
                </h2>
                <span className="text-[12px] font-bold text-[#4C594E] tabular-nums">
                  {filteredPosts.length} discussion{filteredPosts.length > 1 ? 's' : ''}
                </span>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
                  <p className="text-[14px] font-bold text-[#111812]">
                    Aucune discussion ne correspond à votre recherche.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-3 text-[13px] font-bold text-[#064E15] hover:underline cursor-pointer"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPosts.map((post) => {
                    const isLiked = Boolean(likedPosts[post.id]);
                    const isCommentsOpen = Boolean(expandedComments[post.id]);
                    const member = COMMUNITY_MEMBERS.find((m) => m.id === post.authorId);

                    return (
                      <article
                        key={post.id}
                        className={`bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border ${
                          post.status === 'hidden'
                            ? 'border-[#E31B23]/40 opacity-75'
                            : post.pinned
                            ? 'border-[#064E15]/30'
                            : 'border-gray-100'
                        }`}
                      >
                        {/* Author & Metadata */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => member && setSelectedMember(member)}
                              aria-label={`Voir le profil de ${post.authorName}`}
                              className="w-10 h-10 rounded-full bg-[#EAF3EA] text-[#064E15] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[#d7ebd7]"
                            >
                              <User className="w-5 h-5" aria-hidden="true" />
                            </button>
                            <div>
                              <button
                                type="button"
                                onClick={() => member && setSelectedMember(member)}
                                className="text-[14px] font-extrabold text-[#111812] hover:text-[#064E15] cursor-pointer text-left"
                              >
                                {post.authorName}
                              </button>
                              <p className="text-[12px] text-[#4C594E]">
                                {post.timeAgo} · {post.categoryName}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {post.pinned && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#064E15]">
                                <Pin className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>À la une</span>
                              </span>
                            )}
                            {post.reported && (
                              <span className="text-[11px] font-bold text-[#E31B23]">
                                Signalée
                              </span>
                            )}
                            {post.status === 'hidden' && (
                              <span className="text-[11px] font-bold text-[#E31B23]">
                                Masquée
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title & Content */}
                        <h3 className="mt-3.5 text-[17px] font-extrabold text-[#111812] leading-snug">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-[14px] text-[#2B372D] leading-relaxed">
                          {post.content}
                        </p>

                        {/* Attachment preview if photo or document */}
                        {post.attachmentType !== 'none' && (
                          <div className="mt-3 rounded-xl bg-[#F4F6F4] border border-gray-200 px-3.5 py-2.5 inline-flex items-center gap-2 text-[12px] font-bold text-[#064E15]">
                            {post.attachmentType === 'photo' ? (
                              <ImageIcon className="w-4 h-4" aria-hidden="true" />
                            ) : (
                              <FileText className="w-4 h-4" aria-hidden="true" />
                            )}
                            <span>{post.attachmentName || 'Pièce jointe'}</span>
                          </div>
                        )}

                        {/* Actions row */}
                        <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-4 text-[13px] font-bold text-[#142016]">
                            <button
                              type="button"
                              onClick={() => handleToggleLike(post)}
                              className={`inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                                isLiked ? 'text-[#E31B23]' : 'hover:text-[#064E15]'
                              }`}
                            >
                              <Heart
                                className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`}
                                aria-hidden="true"
                              />
                              <span>J&apos;aime</span>
                              <span className="tabular-nums text-[#4C594E]">({post.likes})</span>
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setExpandedComments((prev) => ({
                                  ...prev,
                                  [post.id]: !prev[post.id],
                                }))
                              }
                              className="inline-flex items-center gap-1.5 hover:text-[#064E15] cursor-pointer"
                            >
                              <MessageSquare className="w-4 h-4" aria-hidden="true" />
                              <span className="tabular-nums">
                                {post.comments.length} commentaire{post.comments.length > 1 ? 's' : ''}
                              </span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleShare(post)}
                              className="inline-flex items-center gap-1.5 hover:text-[#064E15] cursor-pointer"
                            >
                              <Share2 className="w-4 h-4" aria-hidden="true" />
                              <span>Partager</span>
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setReportingPostId((prev) => (prev === post.id ? null : post.id))
                            }
                            className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#4C594E] hover:text-[#E31B23] cursor-pointer"
                          >
                            <Flag className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Signaler</span>
                          </button>
                        </div>

                        {/* Report inline box */}
                        {reportingPostId === post.id && (
                          <div className="mt-3 p-3 rounded-xl bg-[#FBEAEA] border border-[#E31B23]/25 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <input
                              type="text"
                              value={reportReason}
                              onChange={(e) => setReportReason(e.target.value)}
                              placeholder="Motif du signalement..."
                              className="flex-1 bg-white rounded-lg px-3 py-1.5 text-[12px] outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleConfirmReport(post.id)}
                              className="bg-[#E31B23] text-white text-[12px] font-bold px-3.5 py-1.5 rounded-lg cursor-pointer"
                            >
                              Confirmer
                            </button>
                          </div>
                        )}

                        {/* Moderator controls */}
                        {moderatorMode && (
                          <div className="mt-3 p-2.5 rounded-xl bg-[#EAF3EA] flex flex-wrap items-center gap-2 text-[12px]">
                            <span className="font-extrabold text-[#064E15]">Modération :</span>
                            <button
                              type="button"
                              onClick={() => handleModerate(post.id, 'toggle-pin')}
                              className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg font-bold text-[#1A241C] cursor-pointer"
                            >
                              <Pin className="w-3 h-3" />
                              <span>{post.pinned ? 'Désépingler' : 'Épingler'}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleModerate(post.id, 'approve')}
                              className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg font-bold text-[#064E15] cursor-pointer"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Approuver</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleModerate(post.id, 'hide')}
                              className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg font-bold text-[#E31B23] cursor-pointer"
                            >
                              <EyeOff className="w-3 h-3" />
                              <span>Masquer</span>
                            </button>
                          </div>
                        )}

                        {/* Comments & Replies Thread */}
                        {isCommentsOpen && (
                          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                            <div className="flex gap-2">
                              <label htmlFor={`comment-${post.id}`} className="sr-only">
                                Écrire un commentaire
                              </label>
                              <input
                                id={`comment-${post.id}`}
                                type="text"
                                value={commentInputs[post.id] ?? ''}
                                onChange={(e) =>
                                  setCommentInputs((prev) => ({
                                    ...prev,
                                    [post.id]: e.target.value,
                                  }))
                                }
                                placeholder="Ajouter un commentaire..."
                                className="flex-1 rounded-full bg-[#F4F6F4] px-4 py-2 text-[12px] outline-none focus:ring-1 focus:ring-[#064E15]"
                              />
                              <button
                                type="button"
                                onClick={() => handleSubmitComment(post.id)}
                                className="bg-[#064E15] text-white text-[12px] font-bold px-4 py-2 rounded-full cursor-pointer"
                              >
                                Commenter
                              </button>
                            </div>

                            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                              {post.comments.map((comment) => {
                                const replyKey = `${post.id}:${comment.id}`;
                                return (
                                  <div
                                    key={comment.id}
                                    className="bg-[#F9FAF9] rounded-xl p-3 border border-gray-100"
                                  >
                                    <div className="flex items-center justify-between text-[12px]">
                                      <span className="font-extrabold text-[#111812]">
                                        {comment.author}
                                      </span>
                                      <span className="text-gray-500">{comment.timeAgo}</span>
                                    </div>
                                    <p className="mt-1 text-[12px] text-[#2B372D]">
                                      {comment.text}
                                    </p>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setActiveReplyTarget((prev) =>
                                          prev === replyKey ? null : replyKey
                                        )
                                      }
                                      className="mt-1.5 text-[11px] font-bold text-[#064E15] hover:underline cursor-pointer"
                                    >
                                      Répondre
                                    </button>

                                    {comment.replies.length > 0 && (
                                      <div className="mt-2 pl-3 border-l-2 border-[#064E15]/25 space-y-2">
                                        {comment.replies.map((reply) => (
                                          <div key={reply.id} className="text-[12px]">
                                            <span className="font-bold text-[#111812]">
                                              {reply.author}
                                            </span>{' '}
                                            <span className="text-gray-500 text-[11px]">
                                              · {reply.timeAgo}
                                            </span>
                                            <p className="text-[#2B372D] mt-0.5">{reply.text}</p>
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {activeReplyTarget === replyKey && (
                                      <div className="mt-2 flex gap-2">
                                        <input
                                          type="text"
                                          value={replyInputs[replyKey] ?? ''}
                                          onChange={(e) =>
                                            setReplyInputs((prev) => ({
                                              ...prev,
                                              [replyKey]: e.target.value,
                                            }))
                                          }
                                          placeholder="Votre réponse..."
                                          className="flex-1 rounded-full bg-white border border-gray-200 px-3 py-1.5 text-[12px] outline-none"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => handleSubmitReply(post.id, comment.id)}
                                          className="bg-[#064E15] text-white text-[11px] font-bold px-3 py-1.5 rounded-full cursor-pointer"
                                        >
                                          Répondre
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR: Ce qui fait parler la communauté + Les voix les plus actives */}
          <aside className="space-y-5">
            {/* Colonne latérale: Ce qui fait parler la communauté */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100">
              <h2 className="flex items-center gap-2 text-[15px] font-extrabold text-[#111812]">
                <SenegalMiniFlag className="w-3 h-4" />
                <span>Ce qui fait parler la communauté</span>
              </h2>
              <div className="mt-3 divide-y divide-gray-100">
                {trendingPosts.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(item.categoryId);
                      setExpandedComments((prev) => ({ ...prev, [item.id]: true }));
                    }}
                    className="w-full text-left py-3 first:pt-1 last:pb-0 hover:text-[#064E15] cursor-pointer"
                  >
                    <p className="text-[11px] font-bold text-[#064E15]">{item.categoryName}</p>
                    <p className="text-[12px] font-bold text-[#111812] leading-snug mt-0.5">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-[#4C594E] mt-1 tabular-nums">
                      {item.comments.length} commentaire{item.comments.length > 1 ? 's' : ''} · {item.likes} J&apos;aime
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Membres: Les voix les plus actives */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100">
              <h2 className="flex items-center gap-2 text-[15px] font-extrabold text-[#111812]">
                <SenegalMiniFlag className="w-3 h-4" />
                <span>Les voix les plus actives</span>
              </h2>
              <div className="mt-3 space-y-3">
                {COMMUNITY_MEMBERS.map((member) => (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => setSelectedMember(member)}
                    className="w-full flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#F9FAF9] hover:bg-[#EAF3EA] transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-9 h-9 rounded-full bg-[#064E15] text-white flex items-center justify-center shrink-0">
                        <User className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[13px] font-extrabold text-[#111812] truncate">
                          {member.name}
                        </p>
                        <p className="text-[11px] text-[#4C594E] truncate">
                          {member.role} · {member.region}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#064E15] shrink-0" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Bas de page Communauté */}
      <section className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-8">
        <div className="rounded-2xl bg-[#065416] text-white px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_6px_18px_rgba(6,84,22,0.22)]">
          <p className="text-[16px] sm:text-[18px] font-extrabold text-center sm:text-left">
            Une idée à partager ? La conversation commence avec vous.
          </p>
          <button
            type="button"
            onClick={handleJoinDiscussion}
            className="bg-[#F6D300] hover:bg-[#e7c500] text-[#111812] text-[13px] font-extrabold px-5 py-2.5 rounded-full inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>Créer une publication</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* Member Profile Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Profil de ${selectedMember.name}`}
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              aria-label="Fermer le profil"
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#064E15] text-white flex items-center justify-center shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-[18px] font-extrabold text-[#111812]">{selectedMember.name}</h3>
                <p className="text-[12px] font-semibold text-[#064E15]">
                  {selectedMember.role} · {selectedMember.region}
                </p>
              </div>
            </div>
            <p className="mt-4 text-[13px] text-[#2B372D] leading-relaxed">
              {selectedMember.bio}
            </p>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-6 text-[12px] font-bold text-[#111812] tabular-nums">
              <span>{selectedMember.postsCount} publications</span>
              <span>{selectedMember.commentsCount} commentaires</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
