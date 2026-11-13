import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BRAND_NAME,
  HERO_SLIDES,
  GALLERY_SLIDES,
  NAV_ITEMS,
  CATEGORIES_DATA,
  wrapIndex,
  validateNewsletterEmail,
  toggleLikeState,
  searchPortalContent,
} from './portalLogic';

test('SN221 brand and navigation include Actualités, Blog, Histoire and Communauté', () => {
  assert.equal(BRAND_NAME, 'SN221');
  assert.equal(NAV_ITEMS.some((item) => item.id === 'actualites' && item.label === 'Actualités'), true);
  assert.equal(NAV_ITEMS.some((item) => item.id === 'blog' && item.label === 'Blog'), true);
  assert.equal(NAV_ITEMS.some((item) => item.id === 'communaute' && item.label === 'Communauté'), true);
  assert.equal(NAV_ITEMS.some((item) => item.id === 'documents'), false);
  assert.equal(CATEGORIES_DATA.some((cat) => cat.label === 'Actualités'), true);
  assert.equal(CATEGORIES_DATA.some((cat) => cat.label === 'Blog & Opinions'), true);
});

test('wrapIndex cycles forward and backward cleanly', () => {
  assert.equal(wrapIndex(0, 1, HERO_SLIDES.length), 1);
  assert.equal(wrapIndex(3, 1, HERO_SLIDES.length), 0);
  assert.equal(wrapIndex(0, -1, HERO_SLIDES.length), 3);
  assert.equal(wrapIndex(2, -1, GALLERY_SLIDES.length), 1);
  assert.equal(wrapIndex(0, 1, 0), 0);
});

test('validateNewsletterEmail rejects empty and invalid emails, accepts valid ones', () => {
  assert.equal(validateNewsletterEmail('').valid, false);
  assert.equal(validateNewsletterEmail('   ').valid, false);
  assert.equal(validateNewsletterEmail('invalide@').valid, false);
  assert.equal(validateNewsletterEmail('dakar.sn').valid, false);
  const ok = validateNewsletterEmail('aminata.diop@senegal.sn');
  assert.equal(ok.valid, true);
  assert.match(ok.message, /SN221/);
});

test('toggleLikeState increments and decrements deterministically', () => {
  const first = toggleLikeState({}, 12, 'feat-1');
  assert.equal(first.count, 13);
  assert.equal(first.nextLiked['feat-1'], true);

  const second = toggleLikeState(first.nextLiked, 12, 'feat-1');
  assert.equal(second.count, 12);
  assert.equal(second.nextLiked['feat-1'], false);
});

test('searchPortalContent filters SN221 news, blog, history, documents and events by query', () => {
  const all = searchPortalContent('');
  assert.ok(all.length >= 12);

  const dakar = searchPortalContent('Dakar');
  assert.ok(dakar.length >= 1);

  const budget = searchPortalContent('Budget 2027');
  assert.ok(budget.length >= 1);

  const djolof = searchPortalContent('Djolof');
  assert.ok(djolof.length >= 1);

  const none = searchPortalContent('zzzzzz_inexistant');
  assert.equal(none.length, 0);
});
