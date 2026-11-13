import test from 'node:test';
import assert from 'node:assert/strict';
import {
  COMMUNITY_CATEGORIES,
  INITIAL_COMMUNITY_POSTS,
  addCommentToPost,
  addReplyToComment,
  createCommunityPost,
  filterCommunityPosts,
  moderateCommunityPost,
  reportCommunityPost,
} from './communityLogic';

test('COMMUNITY_CATEGORIES contains all 8 required categories', () => {
  assert.equal(COMMUNITY_CATEGORIES.length, 8);
  assert.equal(COMMUNITY_CATEGORIES[0].name, 'Le Sénégal en débat');
  assert.equal(COMMUNITY_CATEGORIES[7].name, 'Souvenirs et témoignages');
});

test('createCommunityPost validates title and content and creates post with attachment', () => {
  const emptyTitle = createCommunityPost({
    title: '  ',
    content: 'Texte',
    categoryId: 'debat',
  });
  assert.equal(emptyTitle.ok, false);

  const emptyContent = createCommunityPost({
    title: 'Titre',
    content: '   ',
    categoryId: 'debat',
  });
  assert.equal(emptyContent.ok, false);

  const valid = createCommunityPost({
    title: 'Archive familiale de Saint-Louis',
    content: 'Voici une lettre de 1958 conservée par mon grand-père.',
    categoryId: 'souvenirs-temoignages',
    attachmentType: 'document',
    attachmentName: 'Lettre_1958.pdf',
  });
  assert.equal(valid.ok, true);
  if (valid.ok) {
    assert.equal(valid.post.categoryName, 'Souvenirs et témoignages');
    assert.equal(valid.post.attachmentType, 'document');
    assert.equal(valid.post.attachmentName, 'Lettre_1958.pdf');
  }
});

test('addCommentToPost and addReplyToComment append comments and nested replies', () => {
  const afterComment = addCommentToPost(INITIAL_COMMUNITY_POSTS, 'post-1', 'Très bon sujet !');
  const post = afterComment.find((p) => p.id === 'post-1')!;
  assert.equal(post.comments.length, 13);

  const targetCommentId = post.comments[0].id;
  const afterReply = addReplyToComment(afterComment, 'post-1', targetCommentId, 'Bien vu !');
  const updatedComment = afterReply.find((p) => p.id === 'post-1')!.comments[0];
  assert.equal(updatedComment.replies.length, 2);
});

test('reportCommunityPost and moderateCommunityPost manage moderation lifecycle', () => {
  const reported = reportCommunityPost(INITIAL_COMMUNITY_POSTS, 'post-2', 'Hors sujet');
  assert.equal(reported.find((p) => p.id === 'post-2')?.reported, true);

  const hidden = moderateCommunityPost(reported, 'post-2', 'hide');
  const visibleFeed = filterCommunityPosts(hidden, { query: '', categoryId: 'all' });
  assert.equal(visibleFeed.some((p) => p.id === 'post-2'), false);

  const modFeed = filterCommunityPosts(hidden, {
    query: '',
    categoryId: 'all',
    includeHidden: true,
  });
  assert.equal(modFeed.some((p) => p.id === 'post-2'), true);

  const approved = moderateCommunityPost(hidden, 'post-2', 'approve');
  assert.equal(approved.find((p) => p.id === 'post-2')?.status, 'published');
  assert.equal(approved.find((p) => p.id === 'post-2')?.reported, false);
});
