import React from 'react';

interface KitchenGalleryProps {
    galleryUrls: string[];
    isDark: boolean;
}

export const KitchenGallery: React.FC<KitchenGalleryProps> = ({ galleryUrls, isDark }) => {
    if (!galleryUrls || galleryUrls.length === 0) return null;

    return (
        <div className={`p-6 w-full ${isDark ? 'glass-card' : 'tech-card'}`}>
            <h2 className={`text-lg font-bold mb-4 uppercase tracking-wider flex items-center gap-2
        ${isDark ? 'text-[#8B5CF6]' : 'text-black border-b-2 border-dashed border-black pb-2'}
      `} style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                Facility Inspection
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {galleryUrls.map((url, idx) => (
                    <div
                        key={idx}
                        className={`relative aspect-[4/3] overflow-hidden group transition-all duration-300
              ${isDark ? 'rounded-sm ring-1 ring-white/10 hover:ring-[#8B5CF6] hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'border border-black sharp-corners hover:border-[#7C3AED] hover:border-2'}
            `}
                    >
                        <img
                            src={url}
                            alt={`Facility view ${idx + 1}`}
                            className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500 hover:scale-105 hover:brightness-110"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
