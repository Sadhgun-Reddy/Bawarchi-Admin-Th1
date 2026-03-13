import React from 'react';
import { ReviewDocument } from './types';

interface DocumentRepositoryProps {
    documents: ReviewDocument[];
    onViewDocument: (docId: string, url: string) => void;
    isDark: boolean;
}

export const DocumentRepository: React.FC<DocumentRepositoryProps> = ({ documents, onViewDocument, isDark }) => {
    return (
        <div className={`p-6 w-full ${isDark ? 'glass-card' : 'tech-card'} mb-6`}>
            <h2 className={`text-lg font-bold mb-4 uppercase tracking-wider flex items-center gap-2
        ${isDark ? 'text-[#8B5CF6]' : 'text-black border-b-2 border-dashed border-black pb-2'}
      `} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                <span className="material-symbols-outlined text-[20px]">folder_open</span>
                Document Repository
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {documents.map(doc => (
                    <div
                        key={doc.id}
                        className={`flex items-center justify-between p-4 cursor-pointer transition-all duration-200 group
              ${isDark
                                ? 'bg-white/5 border border-white/10 rounded-sm hover:border-[#8B5CF6] hover:bg-white/10'
                                : 'bg-white border border-black sharp-corners hover:bg-gray-50'
                            }
            `}
                        onClick={() => onViewDocument(doc.id, doc.url)}
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            <span className={`material-symbols-outlined text-[24px] ${isDark ? 'text-gray-400 group-hover:text-[#8B5CF6]' : 'text-gray-600'}`}>
                                description
                            </span>
                            <div className="truncate">
                                <p className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-black'}`}>{doc.name}</p>
                                {doc.size && <p className={`text-xs font-mono mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{doc.size}</p>}
                            </div>
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onViewDocument(doc.id, doc.url);
                            }}
                            className={`text-xs font-bold uppercase tracking-wider
                ${isDark
                                    ? 'text-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap'
                                    : 'text-[#7C3AED] underline underline-offset-4 decoration-2 decoration-[#7C3AED]/30 hover:decoration-[#7C3AED]'
                                }
              `}
                        >
                            Verify
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
