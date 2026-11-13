import React from 'react';
import { Download, ExternalLink, FileText } from 'lucide-react';
import { BUDGET_2027_MSHP_PDF_URL } from '../utils/documentsLogic';
import { SenegalMiniFlag } from './SenegalGraphics';

export function HomeDocumentSpotlight() {
  return (
    <section
      id="document-budget-2027"
      aria-label="Document officiel à la une"
      className="max-w-[1160px] mx-auto px-4 sm:px-6 pt-2 pb-4"
    >
      {/* Texte amorce */}
      <div className="mb-3.5">
        <h2 className="flex items-center gap-2.5 text-[20px] font-extrabold text-[#111812]">
          <SenegalMiniFlag />
          <span>À lire : Budget Santé 2027</span>
        </h2>
        <p className="mt-1 text-[13px] text-[#4C594E]">
          Où va le budget de la santé au Sénégal en 2027 ? Consultez directement le rapport officiel présenté à l’Assemblée nationale et son résumé essentiel.
        </p>
      </div>

      {/* Bloc simple : PDF en premier à gauche, résumé bref et explicite à côté */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-gray-100 grid grid-cols-1 md:grid-cols-[310px_1fr] gap-5 items-center">
        {/* 1. Le PDF en premier */}
        <div className="rounded-xl bg-[#F4F6F4] border border-gray-200 p-4 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 bg-[#064E15] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              <FileText className="w-3 h-3" aria-hidden="true" />
              <span>PDF officiel</span>
            </span>
            <span className="text-[11px] font-semibold text-[#4C594E]">15 pages · Nov. 2026</span>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-3.5 text-center shadow-2xs">
            <div className="mx-auto w-8 h-5 rounded-xs overflow-hidden flex mb-2" aria-hidden="true">
              <span className="w-1/3 bg-[#00853F]" />
              <span className="w-1/3 bg-[#FDEF42]" />
              <span className="w-1/3 bg-[#E31B23]" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#4C594E]">
              République du Sénégal · MSHP
            </p>
            <p className="mt-1 text-[13px] font-extrabold text-[#111812] leading-snug">
              Rapport de présentation du projet de budget 2027
            </p>
            <p className="mt-1 text-[11px] text-[#4C594E]">Version Assemblée nationale</p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={BUDGET_2027_MSHP_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#064E15] hover:bg-[#053D11] text-white text-[12px] font-bold px-3 py-2 rounded-full inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Ouvrir le PDF</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <a
              href={BUDGET_2027_MSHP_PDF_URL}
              download="Rapport_Budget_2027_MSHP_Senegal.pdf"
              className="bg-[#F6D300] hover:bg-[#e7c500] text-[#111812] text-[12px] font-extrabold px-3.5 py-2 rounded-full inline-flex items-center justify-center gap-1.5 transition-colors shrink-0"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Télécharger</span>
            </a>
          </div>
        </div>

        {/* 2. À côté : résumé bref mais explicite et simple */}
        <div className="space-y-3 min-w-0">
          <h3 className="text-[17px] font-extrabold text-[#111812] leading-snug">
            L’essentiel du budget 2027 de la Santé en 3 points
          </h3>
          <p className="text-[13px] text-[#2B372D] leading-relaxed">
            Pour 2027, le Ministère de la Santé et de l’Hygiène Publique prévoit{' '}
            <strong className="text-[#064E15]">246,67 milliards FCFA</strong> (+13,53 % par rapport à 2026), financés à 86,54 % par les ressources nationales.
          </p>
          <ul className="space-y-1.5 text-[13px] text-[#2B372D] leading-relaxed list-disc pl-5">
            <li>
              <strong>Soins et hôpitaux (49,82 %) :</strong> reconstruction d’Aristide Le Dantec, réhabilitation à Thiès et clinique spécialisée à Touba.
            </li>
            <li>
              <strong>Prévention et vaccins :</strong> 6,17 milliards FCFA pour la vaccination et la lutte contre le SIDA, la tuberculose et le cancer.
            </li>
            <li>
              <strong>Personnel et médicaments :</strong> primes des agents de santé et des Bajenu Gox, appui aux hôpitaux (EPS, SAMU) et siège de l’ARP.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
