import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ALLOCUTION_MEFP_2027_PDF_URL,
  BUDGET_2027_MSHP_PDF_URL,
  DISCOURS_MESRI_2027_PDF_URL,
  DOSSIER_PRESSE_MSHP_2027_PDF_URL,
  INITIAL_DOCUMENTS,
  RAPPORT_INTEGRAL_MSHP_2027_PDF_URL,
  createDocumentEntry,
  filterDocuments,
} from './documentsLogic';

test('INITIAL_DOCUMENTS includes all 5 uploaded Budget 2027 official PDFs', () => {
  const expectedUrls = [
    ALLOCUTION_MEFP_2027_PDF_URL,
    DISCOURS_MESRI_2027_PDF_URL,
    DOSSIER_PRESSE_MSHP_2027_PDF_URL,
    RAPPORT_INTEGRAL_MSHP_2027_PDF_URL,
    BUDGET_2027_MSHP_PDF_URL,
  ];
  for (const url of expectedUrls) {
    const found = INITIAL_DOCUMENTS.find((d) => d.fileUrl === url);
    assert.ok(found, `Missing PDF document for ${url}`);
    assert.ok(found.keyMetrics && found.keyMetrics.length === 4);
    assert.ok(found.sections && found.sections.length === 3);
  }
});

test('filterDocuments filters by query and category accurately', () => {
  const all = filterDocuments(INITIAL_DOCUMENTS, { query: '', category: 'Tous' });
  assert.equal(all.length, INITIAL_DOCUMENTS.length);

  const mefpMatch = filterDocuments(INITIAL_DOCUMENTS, {
    query: 'Cheikh Diba',
    category: 'Budgets & Lois',
  });
  assert.equal(mefpMatch.length, 1);
  assert.equal(mefpMatch[0].id, 'doc-allocution-mefp-2027');

  const mesriMatch = filterDocuments(INITIAL_DOCUMENTS, {
    query: 'Matam',
    category: 'Budgets & Lois',
  });
  assert.equal(mesriMatch.length, 1);
  assert.equal(mesriMatch[0].id, 'doc-mesri-discours-2027');

  const statsOnly = filterDocuments(INITIAL_DOCUMENTS, {
    query: '',
    category: 'Statistiques & Économie',
  });
  assert.equal(statsOnly.length, 1);
  assert.match(statsOnly[0].title, /ANSD/);
});

test('createDocumentEntry validates inputs and creates PDF or link records', () => {
  const bad = createDocumentEntry({
    title: '',
    category: 'Rapports publics',
    source: 'MSHP',
    summary: 'Résumé',
  });
  assert.equal(bad.ok, false);

  const badUrl = createDocumentEntry({
    title: 'Rapport test',
    category: 'Rapports publics',
    source: 'ANSD',
    summary: 'Données économiques',
    externalUrl: 'ftp://invalide',
  });
  assert.equal(badUrl.ok, false);

  const ok = createDocumentEntry({
    title: 'Rapport annuel énergie',
    category: 'Rapports publics',
    source: 'Ministère de l’Énergie',
    summary: 'Bilan énergétique national.',
    externalUrl: 'https://www.sec.gouv.sn',
  });
  assert.equal(ok.ok, true);
  if (ok.ok) {
    assert.equal(ok.doc.title, 'Rapport annuel énergie');
    assert.equal(ok.doc.pagesLabel, 'Lien officiel');
  }
});
