import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  ExternalLink,
  Eye,
  FileText,
  FolderOpen,
  Link as LinkIcon,
  Plus,
  Search,
  Upload,
  X,
} from 'lucide-react';
import {
  DOCUMENT_CATEGORIES,
  DocumentCategory,
  INITIAL_DOCUMENTS,
  SenegalDocumentItem,
  createDocumentEntry,
  filterDocuments,
} from '../utils/documentsLogic';
import { SenegalMiniFlag } from './SenegalGraphics';

interface DocumentsPageProps {
  onShowToast: (message: string) => void;
}

export function DocumentsPage({ onShowToast }: DocumentsPageProps) {
  const [documents, setDocuments] = useState<SenegalDocumentItem[]>(INITIAL_DOCUMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Tous' | DocumentCategory>('Tous');
  const [activePdfDoc, setActivePdfDoc] = useState<SenegalDocumentItem | null>(
    INITIAL_DOCUMENTS[0]
  );
  const [readerOpen, setReaderOpen] = useState(true);
  const [readerMode, setReaderMode] = useState<'summary' | 'pdf'>('summary');

  // Add document form state
  const [composerOpen, setComposerOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<DocumentCategory>('Budgets & Lois');
  const [newSource, setNewSource] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newExternalUrl, setNewExternalUrl] = useState('');
  const [uploadedFileUrl, setUploadedFileUrl] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const filteredDocs = filterDocuments(documents, {
    query: searchQuery,
    category: selectedCategory,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setUploadedFileUrl(objectUrl);
    setUploadedFileName(file.name);
    if (!newTitle.trim()) {
      setNewTitle(file.name.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' '));
    }
    setFormError(null);
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    const res = createDocumentEntry({
      title: newTitle,
      category: newCategory,
      source: newSource,
      summary: newSummary,
      fileUrl: uploadedFileUrl || undefined,
      externalUrl: newExternalUrl || undefined,
      downloadFileName: uploadedFileName || undefined,
    });

    if (!res.ok) {
      setFormError(res.error);
      return;
    }

    setDocuments((prev) => [res.doc, ...prev]);
    if (res.doc.fileUrl) {
      setActivePdfDoc(res.doc);
      setReaderMode('pdf');
      setReaderOpen(true);
    }
    setNewTitle('');
    setNewSource('');
    setNewSummary('');
    setNewExternalUrl('');
    setUploadedFileUrl('');
    setUploadedFileName('');
    setFormError(null);
    setComposerOpen(false);
    onShowToast(`Document ajouté sur SN221 : « ${res.doc.title} »`);
  };

  return (
    <div className="pb-10">
      {/* Thin top tri-color accent stripe right below header */}
      <div className="h-[3px] w-full flex" aria-hidden="true">
        <div className="w-1/3 bg-[#00853F]" />
        <div className="w-1/3 bg-[#FDEF42]" />
        <div className="w-1/3 bg-[#E31B23]" />
      </div>

      {/* Hero Banner */}
      <section className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-4">
        <div className="relative rounded-2xl sm:rounded-3xl bg-[#064E15] text-white overflow-hidden px-6 sm:px-10 py-8 sm:py-10 shadow-[0_6px_22px_rgba(6,78,21,0.22)]">
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

          <div className="relative z-10 max-w-[780px]">
            <p className="text-[12px] sm:text-[13px] font-bold text-[#FDEF42]">
              SN221 · Centre de Ressources Documentaires
            </p>
            <h1 className="mt-1.5 text-[26px] sm:text-[36px] font-extrabold leading-tight">
              Documents &amp; Rapports du Sénégal
            </h1>
            <p className="mt-3 text-[13px] sm:text-[15px] text-white/95 leading-relaxed">
              Consultez, lisez en ligne et téléchargez les rapports budgétaires, textes officiels, statistiques publiques et dossiers documentaires sur le Sénégal.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setActivePdfDoc(documents.find((d) => d.fileUrl) ?? INITIAL_DOCUMENTS[0]);
                  setReaderMode('summary');
                  setReaderOpen(true);
                }}
                className="bg-[#F6D300] hover:bg-[#e7c500] text-[#111812] text-[13px] font-extrabold px-5 py-2.5 rounded-full inline-flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>Consulter le rapport Budget 2027</span>
              </button>

              <button
                type="button"
                onClick={() => setComposerOpen((prev) => !prev)}
                className="bg-white/15 hover:bg-white/25 text-white border border-white/30 text-[13px] font-bold px-5 py-2.5 rounded-full inline-flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Ajouter un document</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Add Document Form */}
      {composerOpen && (
        <section className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-5" aria-label="Ajouter un document">
          <form
            onSubmit={handleAddDocument}
            className="bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(6,78,21,0.1)] border border-[#064E15]/20 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-extrabold text-[#111812]">
                Ajouter un PDF ou un lien officiel sur SN221
              </h2>
              <button
                type="button"
                onClick={() => setComposerOpen(false)}
                aria-label="Fermer le formulaire d'ajout de document"
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <label htmlFor="doc-title" className="block text-[12px] font-bold text-[#1A241C] mb-1">
                  Titre du document
                </label>
                <input
                  id="doc-title"
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex : Loi de finances 2027 ou Rapport ANSD"
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-[13px] outline-none focus:border-[#064E15]"
                />
              </div>

              <div>
                <label htmlFor="doc-category" className="block text-[12px] font-bold text-[#1A241C] mb-1">
                  Catégorie
                </label>
                <select
                  id="doc-category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as DocumentCategory)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-[13px] bg-white outline-none focus:border-[#064E15]"
                >
                  {DOCUMENT_CATEGORIES.filter((c): c is DocumentCategory => c !== 'Tous').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label htmlFor="doc-source" className="block text-[12px] font-bold text-[#1A241C] mb-1">
                  Source / Institution
                </label>
                <input
                  id="doc-source"
                  type="text"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  placeholder="Ex : Ministère, ANSD, Archives.sn, UCAD..."
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-[13px] outline-none focus:border-[#064E15]"
                />
              </div>

              <div>
                <label htmlFor="doc-url" className="block text-[12px] font-bold text-[#1A241C] mb-1">
                  Lien officiel (ou importez un PDF ci-dessous)
                </label>
                <input
                  id="doc-url"
                  type="url"
                  value={newExternalUrl}
                  onChange={(e) => setNewExternalUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-[13px] outline-none focus:border-[#064E15]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="doc-summary" className="block text-[12px] font-bold text-[#1A241C] mb-1">
                Résumé
              </label>
              <textarea
                id="doc-summary"
                rows={2}
                value={newSummary}
                onChange={(e) => setNewSummary(e.target.value)}
                placeholder="Décrivez brièvement le contenu du document..."
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-[13px] outline-none focus:border-[#064E15]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAF3EA] text-[#064E15] text-[12px] font-bold cursor-pointer hover:bg-[#dcecdc]">
                <Upload className="w-4 h-4" aria-hidden="true" />
                <span>{uploadedFileName ? `PDF sélectionné : ${uploadedFileName}` : 'Importer un fichier PDF'}</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>

              <button
                type="submit"
                className="bg-[#064E15] hover:bg-[#053D11] text-white text-[13px] font-bold px-5 py-2 rounded-full cursor-pointer"
              >
                Publier le document
              </button>
            </div>

            {formError && (
              <p role="alert" className="text-[12px] font-semibold text-[#E31B23]">
                {formError}
              </p>
            )}
          </form>
        </section>
      )}

      {/* Document Reader & Structured Synthesis */}
      {readerOpen && activePdfDoc?.fileUrl && (
        <section className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-6" aria-label="Consultation du document">
          <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.07)] border border-gray-100 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="inline-block bg-[#064E15] text-white text-[11px] font-bold px-3 py-0.5 rounded-full">
                  {activePdfDoc.category} · {activePdfDoc.publishedDate}
                </span>
                <h2 className="mt-1.5 text-[16px] sm:text-[18px] font-extrabold text-[#111812] leading-snug">
                  {activePdfDoc.title}
                </h2>
                <p className="text-[12px] text-[#4C594E] mt-0.5">{activePdfDoc.source}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {activePdfDoc.sections && activePdfDoc.sections.length > 0 && (
                  <div className="inline-flex rounded-full bg-[#F4F6F4] p-0.5">
                    <button
                      type="button"
                      onClick={() => setReaderMode('summary')}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-bold cursor-pointer transition-colors ${
                        readerMode === 'summary'
                          ? 'bg-[#064E15] text-white'
                          : 'text-[#1A241C] hover:text-[#064E15]'
                      }`}
                    >
                      Synthèse détaillée
                    </button>
                    <button
                      type="button"
                      onClick={() => setReaderMode('pdf')}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-bold cursor-pointer transition-colors ${
                        readerMode === 'pdf'
                          ? 'bg-[#064E15] text-white'
                          : 'text-[#1A241C] hover:text-[#064E15]'
                      }`}
                    >
                      Aperçu PDF
                    </button>
                  </div>
                )}

                <a
                  href={activePdfDoc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#EAF3EA] hover:bg-[#dcecdc] text-[#064E15] text-[12px] font-bold px-3.5 py-2 rounded-full inline-flex items-center gap-1.5"
                >
                  <span>Ouvrir le PDF</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>

                <a
                  href={activePdfDoc.fileUrl}
                  download={activePdfDoc.downloadFileName || 'document-sn221.pdf'}
                  className="bg-[#F6D300] hover:bg-[#e7c500] text-[#111812] text-[12px] font-extrabold px-4 py-2 rounded-full inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Télécharger</span>
                </a>

                <button
                  type="button"
                  onClick={() => setReaderOpen(false)}
                  aria-label="Réduire la fiche document"
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {activePdfDoc.keyMetrics && activePdfDoc.keyMetrics.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-[#F9FAF9] border-b border-gray-100">
                {activePdfDoc.keyMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="bg-white rounded-xl p-3 border border-gray-100 shadow-2xs"
                  >
                    <p className="text-[11px] font-semibold text-[#4C594E]">{metric.label}</p>
                    <p className="mt-1 text-[16px] font-extrabold text-[#064E15] tabular-nums">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {readerMode === 'summary' && activePdfDoc.sections && activePdfDoc.sections.length > 0 ? (
              <div className="p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-3 gap-4 bg-white">
                {activePdfDoc.sections.map((section) => (
                  <div
                    key={section.heading}
                    className="rounded-xl bg-[#F9FAF9] border border-gray-100 p-4"
                  >
                    <h3 className="text-[13px] font-extrabold text-[#064E15] leading-snug">
                      {section.heading}
                    </h3>
                    <ul className="mt-2.5 space-y-2 text-[12px] text-[#2B372D] leading-relaxed list-disc pl-4">
                      {section.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#EEF2EE] p-2 sm:p-4">
                <iframe
                  src={activePdfDoc.fileUrl}
                  title={activePdfDoc.title}
                  className="w-full h-[460px] sm:h-[600px] rounded-xl bg-white border border-gray-200"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Search & Document Catalog */}
      <section className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-6">
        <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2.5 text-[20px] font-extrabold text-[#111812]">
                <SenegalMiniFlag />
                <span>Bibliothèque documentaire SN221</span>
              </h2>
              <p className="mt-1 text-[13px] text-[#4C594E]">
                {filteredDocs.length} ressource{filteredDocs.length > 1 ? 's' : ''} disponible{filteredDocs.length > 1 ? 's' : ''}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-[#F4F6F4] border border-gray-200 rounded-full px-4 py-2 w-full md:w-[340px] focus-within:border-[#064E15]">
              <Search className="w-4 h-4 text-[#4C594E] shrink-0" aria-hidden="true" />
              <label htmlFor="documents-search" className="sr-only">
                Rechercher un document
              </label>
              <input
                id="documents-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un rapport, loi, statistique..."
                className="w-full bg-transparent text-[13px] text-[#1A241C] outline-none"
              />
            </div>
          </div>

          {/* Category filter pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {DOCUMENT_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#064E15] text-white'
                      : 'bg-[#F4F6F4] text-[#1A241C] hover:bg-[#EAF3EA]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards grid */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocs.length === 0 ? (
            <div className="md:col-span-2 bg-white rounded-2xl p-8 text-center border border-gray-100">
              <FolderOpen className="w-8 h-8 text-[#064E15] mx-auto" aria-hidden="true" />
              <p className="mt-2 text-[14px] font-bold text-[#111812]">
                Aucun document ne correspond à votre recherche.
              </p>
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <article
                key={doc.id}
                className={`bg-white rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border flex flex-col justify-between ${
                  doc.featured ? 'border-[#064E15]/30' : 'border-gray-100'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-[#EAF3EA] text-[#064E15] text-[11px] font-bold px-3 py-1 rounded-full">
                      {doc.fileUrl ? (
                        <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : (
                        <LinkIcon className="w-3.5 h-3.5" aria-hidden="true" />
                      )}
                      <span>{doc.category}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-[#4C594E]">
                      {doc.pagesLabel} · {doc.publishedDate}
                    </span>
                  </div>

                  <h3 className="mt-3 text-[16px] font-extrabold text-[#111812] leading-snug">
                    {doc.title}
                  </h3>
                  <p className="mt-1 text-[12px] font-semibold text-[#064E15]">{doc.source}</p>
                  <p className="mt-2 text-[13px] text-[#2B372D] leading-relaxed">{doc.summary}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2.5">
                  {doc.fileUrl && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setActivePdfDoc(doc);
                          setReaderMode(doc.sections && doc.sections.length > 0 ? 'summary' : 'pdf');
                          setReaderOpen(true);
                          window.scrollTo({ top: 180, behavior: 'smooth' });
                        }}
                        className="bg-[#064E15] hover:bg-[#053D11] text-white text-[12px] font-bold px-4 py-2 rounded-full inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Lire sur le site</span>
                      </button>
                      <a
                        href={doc.fileUrl}
                        download={doc.downloadFileName || 'document-sn221.pdf'}
                        className="bg-[#F4F6F4] hover:bg-[#EAF3EA] text-[#111812] text-[12px] font-bold px-4 py-2 rounded-full inline-flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Télécharger</span>
                      </a>
                    </>
                  )}

                  {doc.externalUrl && (
                    <a
                      href={doc.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#EAF3EA] hover:bg-[#dcecdc] text-[#064E15] text-[12px] font-bold px-4 py-2 rounded-full inline-flex items-center gap-1.5"
                    >
                      <span>Accéder au portail</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
