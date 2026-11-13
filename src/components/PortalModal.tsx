import React, { useState } from 'react';
import { CalendarDays, MapPin, Search, X } from 'lucide-react';
import { searchPortalContent } from '../utils/portalLogic';

export type ModalState =
  | { type: 'closed' }
  | { type: 'search' }
  | { type: 'detail'; badge: string; title: string; body: string; meta?: string };

interface PortalModalProps {
  modal: ModalState;
  onClose: () => void;
  onOpenResult: (item: { category: string; title: string; summary: string }) => void;
}

export function PortalModal({ modal, onClose, onOpenResult }: PortalModalProps) {
  const [query, setQuery] = useState('');

  if (modal.type === 'closed') return null;

  const results = modal.type === 'search' ? searchPortalContent(query) : [];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={modal.type === 'search' ? 'Rechercher sur le portail' : modal.title}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la fenêtre"
          className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-[#1A241C] flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {modal.type === 'search' ? (
          <div>
            <h2 className="text-[18px] font-extrabold text-[#111812]">
              Rechercher sur SN221
            </h2>
            <div className="mt-3 flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 focus-within:border-[#064E15]">
              <Search className="w-4 h-4 text-gray-500 shrink-0" aria-hidden="true" />
              <label htmlFor="portal-search-input" className="sr-only">
                Mot-clé de recherche
              </label>
              <input
                id="portal-search-input"
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex : Dakar, tech, culture, Djolof, Saint-Louis..."
                className="w-full text-[13px] outline-none bg-transparent text-[#1A241C]"
              />
            </div>

            <div className="mt-4 max-h-72 overflow-y-auto divide-y divide-gray-100">
              {results.length === 0 ? (
                <p className="py-6 text-center text-[13px] text-gray-500">
                  Aucun résultat pour « {query} ».
                </p>
              ) : (
                results.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onOpenResult(item)}
                    className="w-full text-left py-3 px-2 hover:bg-[#EAF3EA] rounded-lg transition-colors cursor-pointer"
                  >
                    <p className="text-[11px] font-bold text-[#064E15]">{item.category}</p>
                    <p className="text-[13px] font-bold text-[#111812] mt-0.5">{item.title}</p>
                    <p className="text-[12px] text-gray-600 line-clamp-2 mt-0.5">{item.summary}</p>
                  </button>
                ))
              )}
            </div>
          </div>
        ) : (
          <div>
            <span className="inline-block bg-[#064E15] text-white text-[11px] font-bold px-3.5 py-1 rounded-full">
              {modal.badge}
            </span>
            <h2 className="mt-3 text-[20px] font-extrabold text-[#111812] leading-snug pr-6">
              {modal.title}
            </h2>
            {modal.meta && (
              <p className="mt-2 inline-flex items-center gap-2 text-[12px] font-semibold text-[#064E15]">
                <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{modal.meta}</span>
              </p>
            )}
            <p className="mt-3 text-[14px] text-gray-700 leading-relaxed">{modal.body}</p>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-[#064E15] hover:bg-[#053D11] text-white text-[13px] font-bold px-5 py-2 rounded-full cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
