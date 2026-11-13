export type DocumentCategory =
  | 'Budgets & Lois'
  | 'Statistiques & Économie'
  | 'Archives & Histoire'
  | 'Rapports publics';

export interface DocumentKeyMetric {
  label: string;
  value: string;
}

export interface DocumentSectionSummary {
  heading: string;
  points: string[];
}

export interface SenegalDocumentItem {
  id: string;
  title: string;
  category: DocumentCategory;
  source: string;
  publishedDate: string;
  pagesLabel?: string;
  summary: string;
  fileUrl?: string;
  externalUrl?: string;
  downloadFileName?: string;
  featured?: boolean;
  keyMetrics?: DocumentKeyMetric[];
  sections?: DocumentSectionSummary[];
}

export const DOCUMENT_CATEGORIES: Array<'Tous' | DocumentCategory> = [
  'Tous',
  'Budgets & Lois',
  'Statistiques & Économie',
  'Archives & Histoire',
  'Rapports publics',
];

export const BUDGET_2027_MSHP_PDF_URL =
  '/assets/aistudio/SYNTHESE_Rapport_PRESENTATION_PROJET_BUDGET_2027_Version_06112026_22450f4c.pdf';
export const ALLOCUTION_MEFP_2027_PDF_URL =
  '/assets/aistudio/allocution-du-mefp-cfcb-07-11-2026-vf_joyxxij1sgfwoogwsfuu4_5779431d.pdf';
export const DOSSIER_PRESSE_MSHP_2027_PDF_URL =
  '/assets/aistudio/Dossier_de_presse_Budget_2027_MSHP_a01dfcd7.pdf';
export const DISCOURS_MESRI_2027_PDF_URL =
  '/assets/aistudio/MESRI__CF_2027__DISCOURS_DU_MINISTRE__06112026_e6916aba.pdf';
export const RAPPORT_INTEGRAL_MSHP_2027_PDF_URL =
  '/assets/aistudio/Rapport_PRESENTATION_BUDGET_2027_DAGE_PLFI_06112026_171cd323.pdf';

export const INITIAL_DOCUMENTS: SenegalDocumentItem[] = [
  {
    id: 'doc-allocution-mefp-2027',
    title:
      'Allocution du Ministre de l’Économie, des Finances et du Plan (Cheikh Diba) — Projet de Loi de Finances Initiale 2027',
    category: 'Budgets & Lois',
    source: 'Ministère de l’Économie, des Finances et du Plan (MEFP)',
    publishedDate: '7 novembre 2026',
    pagesLabel: '11 pages · PDF',
    summary:
      'Présentation générale du PLFI 2027 devant l’Assemblée nationale : cadrage macroéconomique, accord FMI (2,2 Mds USD), réduction du déficit à 4,7 % du PIB, doublement des Bourses de sécurité familiale (140 Mds FCFA) et apurement de 480 Mds FCFA d’arriérés au secteur privé.',
    fileUrl: ALLOCUTION_MEFP_2027_PDF_URL,
    downloadFileName: 'Allocution_MEFP_PLFI_2027_Senegal.pdf',
    featured: true,
    keyMetrics: [
      { label: 'Recettes budget général', value: '5 653,9 Mds FCFA' },
      { label: 'Dépenses budget général', value: '7 005,6 Mds FCFA' },
      { label: 'Déficit budgétaire 2027', value: '4,7 % du PIB' },
      { label: 'Arriérés secteur privé payés', value: '480 Mds FCFA' },
    ],
    sections: [
      {
        heading: 'Cadrage macroéconomique & Redressement',
        points: [
          'Croissance 2025 à 6,75 % (2,2 % hors hydrocarbures) et projection prudente de 1,5 % pour 2027',
          'Accord technique avec le FMI (1er septembre 2026) : programme 2027-2029 doté de 2,2 Mds USD (1 243 Mds FCFA) aligné sur « Jubbanti Koom »',
          'Déficit global ramené de 7,6 % à 4,7 % du PIB et déficit primaire réduit à 0,2 % du PIB (47,7 Mds FCFA)',
        ],
      },
      {
        heading: 'Priorités sociales & Relance économique',
        points: [
          'Doublement des Bourses de sécurité familiale (de 70 à 140 Mds FCFA) au profit de 1 000 649 ménages vulnérables',
          '480 Mds FCFA consacrés au règlement des arriérés dus aux PME et entreprises (1 280 Mds cumulés 2025-2027)',
          'Grands projets : 5 hôpitaux, 12 LYNAQE, 15 000 salles connectées, second pont de Ziguinchor, pont de Rosso et rail Dakar-Tambacounda',
        ],
      },
      {
        heading: 'Réformes fiscales, Énergie & Institutions',
        points: [
          'Nouveau Code général des impôts et Code des douanes, facturation électronique et traçabilité intégrale via SYSBUDGEP',
          'Réorientation des subventions énergétiques avec préservation du gaz butane domestique et tarif social d’électricité',
          'Dotations 2027 : Présidence (223,86 Mds), Primature (32,37 Mds), Assemblée nationale (21,11 Mds), Cour des comptes (13,07 Mds)',
        ],
      },
    ],
  },
  {
    id: 'doc-mesri-discours-2027',
    title:
      'Note introductive du Ministre — Projet de budget 2027 du Ministère de l’Enseignement supérieur, de la Recherche et de l’Innovation (MESRI)',
    category: 'Budgets & Lois',
    source: 'Ministère de l’Enseignement supérieur, de la Recherche et de l’Innovation',
    publishedDate: '6 novembre 2026',
    pagesLabel: '9 pages · PDF',
    summary:
      'Exposé du budget 2027 du MESRI arrêté à 303,7 Mds FCFA : ouverture des universités de Matam et du Sénégal oriental (Tambacounda), construction de 8 ISEP, achèvement du recrutement de 500 enseignants-chercheurs, réforme des œuvres sociales (42 778 lits) et programme spatial SENSAT.',
    fileUrl: DISCOURS_MESRI_2027_PDF_URL,
    downloadFileName: 'Discours_Ministre_MESRI_Budget_2027.pdf',
    featured: true,
    keyMetrics: [
      { label: 'Budget MESRI 2027 (CP)', value: '303,7 Mds FCFA' },
      { label: 'Éducation supérieure', value: '154,7 Mds FCFA' },
      { label: 'Œuvres sociales', value: '135,3 Mds FCFA' },
      { label: 'Étudiants accueillis (2025)', value: '250 676' },
    ],
    sections: [
      {
        heading: 'État du secteur & Performances récentes',
        points: [
          '250 676 étudiants accueillis en 2025 (près de 53 % de jeunes femmes) et 96 631 bacheliers enregistrés en 2026 (+25 %)',
          'Taux de réussite de 96,8 % dans les ISEP et 396 entreprises créées grâce à l’accompagnement de 4 753 étudiants en incubateurs',
          'Défis identifiés : capacité du parc public (65 833 places), normalisation du calendrier académique et interconnexion des fichiers bourses/universités',
        ],
      },
      {
        heading: 'Carte universitaire & Ressources humaines',
        points: [
          '4,7 Mds FCFA de crédits de fonctionnement pour ouvrir les universités de Matam et du Sénégal oriental (Tambacounda) et leurs CROUS',
          'Poursuite de 8 ISEP via le projet ESPOIR-Jeunes (21,6 Mds programmés en 2027) et de l’ISEP de Mbacké (2 Mds)',
          '7,2 Mds FCFA inscrits pour achever le recrutement des 500 enseignants-chercheurs et formateurs',
        ],
      },
      {
        heading: 'Œuvres sociales, Recherche & Espace',
        points: [
          '135,3 Mds FCFA pour les œuvres sociales (dont 79,1 Mds de bourses et 52,7 Mds aux CROUS) et capacité portée à 42 778 lits dès 2027',
          'Programme spatial SENSAT : préparation du deuxième satellite et de la constellation Ninki Nanka',
          'Montée en charge de la Cité du Savoir (génétique, biotechnologie, nanosciences, physique nucléaire, supercalculateur)',
        ],
      },
    ],
  },
  {
    id: 'doc-dossier-presse-mshp-2027',
    title:
      'Dossier de presse — Projet de budget 2027 du Ministère de la Santé et de l’Hygiène publique',
    category: 'Rapports publics',
    source: 'MSHP · Cellule de Communication (Dakar)',
    publishedDate: '9 novembre 2026',
    pagesLabel: '13 pages · PDF',
    summary:
      'Synthèse presse complète du budget 2027 de la Santé (246,67 Mds FCFA) : messages clés, tableaux comparatifs 2026-2027, santé numérique (IA sur DHIS2, DPI dans 51 structures), souveraineté pharmaceutique, grands chantiers hospitaliers et indicateurs de performance.',
    fileUrl: DOSSIER_PRESSE_MSHP_2027_PDF_URL,
    downloadFileName: 'Dossier_de_presse_Budget_2027_MSHP.pdf',
    featured: true,
    keyMetrics: [
      { label: 'Budget total MSHP 2027', value: '246,67 Mds FCFA' },
      { label: 'Hors personnel (RI)', value: '121,81 Mds FCFA' },
      { label: 'Mesures nouvelles obtenues', value: '25,73 Mds FCFA' },
      { label: 'Infrastructures aux normes', value: '70,7 % (2025)' },
    ],
    sections: [
      {
        heading: 'L’essentiel & Nouveaux financements',
        points: [
          'Première déclinaison des 3 programmes issus de la Lettre de politique sectorielle (LPS) 2025-2029',
          'Ressources extérieures à 33,20 Mds FCFA dont projet NATANGUÉ de la Banque mondiale (12,3 Mds) et Aristide Le Dantec (4,3 Mds)',
          'Subventions d’exploitation relevées (+4,91 Mds) pour les EPS (Le Dantec, Abbass Ndao, Grand Yoff, CHU Fann), le SAMU et la SEN-PNA',
        ],
      },
      {
        heading: 'Santé numérique & Souveraineté pharmaceutique',
        points: [
          'Dossier patient informatisé déployé dans 51 structures (PAENS), carte numérique de santé et 250 agents de données formés avec IA intégrée au DHIS2',
          'Sérialisation des médicaments contre la contrefaçon, accréditation ISO 17025 et plan de maturation niveau 4 OMS pour l’ARP',
          'Relance de l’industrie pharmaceutique locale et 31 projets de phytomédicaments identifiés vers 2035',
        ],
      },
      {
        heading: 'Grands chantiers & Résultats récents',
        points: [
          'Hôpital Aristide Le Dantec (11,30 Mds), Hôpital régional de Thiès (9,60 Mds, JICA), siège de l’ARP (40 Mds), Diakhaye (1,77 Md)',
          'Hôpital niveau 3 de Tivaouane (300 lits) mis en service, 31 ambulances médicalisées et 37 échographes livrés en 2026',
          'Couverture RR1 passée à 87 %, décès aux urgences réduits à 1,6 % et 3 670 demandes de soins coûteux satisfaites',
        ],
      },
    ],
  },
  {
    id: 'doc-rapport-integral-dage-2027',
    title:
      'Rapport de présentation du projet de budget 2027 du MSHP — Version intégrale PLFI (DAGE)',
    category: 'Rapports publics',
    source: 'République du Sénégal · MSHP / DAGE',
    publishedDate: '6 novembre 2026',
    pagesLabel: '82 pages · PDF',
    summary:
      'Document technique complet (82 pages) présentant la cartographie administrative des services, l’évaluation détaillée des indicateurs 2024-2025, le bilan technique et financier au T3 2026, ainsi que l’ensemble des tableaux de répartition des crédits PLFI 2027.',
    fileUrl: RAPPORT_INTEGRAL_MSHP_2027_PDF_URL,
    downloadFileName: 'Rapport_Integral_Budget_2027_MSHP_DAGE.pdf',
    featured: true,
    keyMetrics: [
      { label: 'Crédits PLFI 2027', value: '246,67 Mds FCFA' },
      { label: 'Exécution budget 2025', value: '97,19 %' },
      { label: 'Exécution au T3 2026', value: '69,43 %' },
      { label: 'Investissements Offre de soins', value: '43,48 Mds FCFA' },
    ],
    sections: [
      {
        heading: 'Cartographie & Bilan technique 2025-2026',
        points: [
          'Évaluation exhaustive des programmes Pilotage, Santé de base, Santé de référence et Protection sociale (Tableaux 1 à 6)',
          'Réseau national d’oxygène : 7 usines de production PSA et 35 centrales VPSA en exploitation dans les EPS',
          'Suivi trimestriel 2026 des chantiers : Aristide Le Dantec, CNO Diamniadio, Pôles mère-enfant HOGIP, Ndioum et Tambacounda',
        ],
      },
      {
        heading: 'Bilan financier & Exécution T3 2026',
        points: [
          'Gestion 2025 : 96,62 Mds FCFA ordonnancés sur 99,41 Mds FCFA ouverts hors personnel et ressources extérieures (97,19 %)',
          'Au 3e trimestre 2026 : 75,11 Mds FCFA ordonnancés sur 108,19 Mds FCFA (69,43 %, dont 89,48 % sur Pilotage)',
          'Programmation pluriannuelle 2027-2029 portée à 318,77 Mds FCFA sur ressources internes hors personnel',
        ],
      },
      {
        heading: 'Ventilation détaillée par nature & projets (PLFI 2027)',
        points: [
          'Personnel RI : 91,66 Mds FCFA · Biens & services : 54,72 Mds FCFA · Transferts courants : 52,26 Mds FCFA',
          'Investissements exécutés par l’État : 12,75 Mds FCFA (RI) et 31,52 Mds FCFA (RE) · Transferts en capital : 3,76 Mds FCFA',
          'Tableau 14 : détail complet des projets (9 centres de santé 1 Md, Diakhaye 1,77 Md, équipements 3,90 Mds, Le Dantec 11,30 Mds)',
        ],
      },
    ],
  },
  {
    id: 'doc-budget-2027-mshp',
    title:
      'Synthèse — Rapport de présentation du projet de budget 2027 du Ministère de la Santé et de l’Hygiène Publique (Version Assemblée Nationale)',
    category: 'Budgets & Lois',
    source: 'République du Sénégal · MSHP / DAGE',
    publishedDate: 'Novembre 2026',
    pagesLabel: '15 pages · PDF',
    summary:
      'Synthèse du rapport de performance 2025-2026 et perspectives stratégiques 2027 : bilan financier, programme Pilotage, Prévention et Offre de soins de qualité, reconstruction de l’hôpital Aristide Le Dantec, souveraineté pharmaceutique et financement des vaccins.',
    fileUrl: BUDGET_2027_MSHP_PDF_URL,
    downloadFileName: 'Synthese_Rapport_Budget_2027_MSHP_Senegal.pdf',
    keyMetrics: [
      { label: 'Projet de budget 2027', value: '246,67 Mds FCFA' },
      { label: 'Évolution vs LFI 2026', value: '+13,53 %' },
      { label: 'Ressources internes', value: '86,54 %' },
      { label: 'Offre de soins de qualité', value: '49,82 %' },
    ],
    sections: [
      {
        heading: 'Répartition des crédits PLFI 2027 (246 665 796 462 FCFA)',
        points: [
          'Offre de soins de qualité : 122 888 421 028 FCFA (49,82 %)',
          'Pilotage, coordination et gestion administrative : 98 968 474 640 FCFA (40,12 %)',
          'Prévention et promotion de la santé : 24 808 900 794 FCFA (10,06 %)',
          'Financement global : 213,47 Mds FCFA sur ressources internes (86,54 %) et 33,20 Mds FCFA sur ressources extérieures (13,46 %)',
        ],
      },
      {
        heading: 'Réalisations phares & Bilan financier',
        points: [
          'Exécution budgétaire 2025 à 97,19 % (contre 89,57 % en 2024) et couverture des infrastructures aux normes passée à 70,7 % (26 structures normalisées)',
          'Couverture vaccinale RR1 portée à 87 % (+23 points) et 92 % des districts ayant détecté et contrôlé les épidémies',
          'Au 30 septembre 2026 : 69,43 % d’exécution (75,11 Mds FCFA ordonnancés sur 108,19 Mds FCFA de crédits ouverts)',
        ],
      },
      {
        heading: 'Perspectives & Mesures nouvelles 2027',
        points: [
          'Reconstruction de l’hôpital Aristide Le Dantec, réhabilitation de l’hôpital de Thiès et clinique du diabète et de l’hypertension à Touba',
          'Construction du siège de l’ARP (40 Mds FCFA), souveraineté pharmaceutique et digitalisation du dossier patient',
          'Vaccins PEV (6,17 Mds FCFA), primes des agents de santé et Bajenu Gox, et subventions aux EPS, SAMU et SEN-PNA',
        ],
      },
    ],
  },
  {
    id: 'doc-archives-sn',
    title: 'Archives.sn — Lois, décrets, journaux officiels et budgets du Sénégal',
    category: 'Budgets & Lois',
    source: 'Portail public Archives.sn',
    publishedDate: 'Mise à jour continue',
    pagesLabel: 'Portail officiel',
    summary:
      'Répertoire classé par année des lois de finances, décrets, communiqués du Conseil des ministres, journaux officiels et rapports d’audit de la République du Sénégal.',
    externalUrl: 'https://archives.sn',
  },
  {
    id: 'doc-ansd',
    title: 'ANSD — Statistiques officielles, économie et recensements (RGPH)',
    category: 'Statistiques & Économie',
    source: 'Agence Nationale de la Statistique et de la Démographie',
    publishedDate: '2026',
    pagesLabel: 'Portail officiel',
    summary:
      'Publications officielles sur la démographie, l’inflation, les comptes nationaux, l’emploi et les enquêtes socio-économiques dans les 14 régions du Sénégal.',
    externalUrl: 'https://www.ansd.sn',
  },
  {
    id: 'doc-vie-publique',
    title: 'Vie-Publique.sn — Rapports publics et textes institutionnels',
    category: 'Rapports publics',
    source: 'Vie-Publique.sn',
    publishedDate: 'Mise à jour continue',
    pagesLabel: 'Portail documentaire',
    summary:
      'Accès citoyen aux rapports de la Cour des comptes, de l’OFNAC, aux projets de lois et aux documents stratégiques nationaux.',
    externalUrl: 'https://www.vie-publique.sn',
  },
  {
    id: 'doc-archives-nationales',
    title: 'Archives Nationales du Sénégal — Fonds historiques et dépôt légal',
    category: 'Archives & Histoire',
    source: 'Direction des Archives du Sénégal',
    publishedDate: 'Fonds patrimoniaux',
    pagesLabel: 'Portail officiel',
    summary:
      'Conservation et consultation des archives publiques de la République du Sénégal, fonds historiques de l’AOF et Bibliothèque des Archives.',
    externalUrl: 'https://archivesdusenegal.gouv.sn',
  },
];

export function filterDocuments(
  docs: SenegalDocumentItem[],
  options: {
    query: string;
    category: 'Tous' | DocumentCategory;
  }
): SenegalDocumentItem[] {
  const q = options.query.trim().toLowerCase();
  return docs.filter((doc) => {
    if (options.category !== 'Tous' && doc.category !== options.category) return false;
    if (!q) return true;
    return (
      doc.title.toLowerCase().includes(q) ||
      doc.summary.toLowerCase().includes(q) ||
      doc.source.toLowerCase().includes(q) ||
      doc.category.toLowerCase().includes(q)
    );
  });
}

export function createDocumentEntry(input: {
  title: string;
  category: DocumentCategory;
  source: string;
  summary: string;
  fileUrl?: string;
  externalUrl?: string;
  downloadFileName?: string;
}): { ok: true; doc: SenegalDocumentItem } | { ok: false; error: string } {
  const title = input.title.trim();
  const source = input.source.trim();
  const summary = input.summary.trim();
  const fileUrl = input.fileUrl?.trim();
  const externalUrl = input.externalUrl?.trim();

  if (!title) {
    return { ok: false, error: 'Veuillez saisir le titre du document.' };
  }
  if (!source) {
    return { ok: false, error: 'Veuillez indiquer la source ou l’institution.' };
  }
  if (!summary) {
    return { ok: false, error: 'Veuillez ajouter un court résumé du document.' };
  }
  if (!fileUrl && !externalUrl) {
    return {
      ok: false,
      error: 'Veuillez importer un fichier PDF ou renseigner un lien officiel.',
    };
  }
  if (externalUrl && !/^https?:\/\//i.test(externalUrl)) {
    return {
      ok: false,
      error: 'Le lien externe doit commencer par http:// ou https://.',
    };
  }

  return {
    ok: true,
    doc: {
      id: `doc-${Date.now()}`,
      title,
      category: input.category,
      source,
      publishedDate: 'Ajouté aujourd’hui',
      pagesLabel: fileUrl ? 'Document PDF' : 'Lien officiel',
      summary,
      fileUrl: fileUrl || undefined,
      externalUrl: externalUrl || undefined,
      downloadFileName: input.downloadFileName,
    },
  };
}
