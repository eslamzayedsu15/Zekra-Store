import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface ProductGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: { url: string; alt: string; caption: string; tag?: string }[];
  initialIndex?: number;
}

export const ProductGalleryModal: React.FC<ProductGalleryModalProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setIsZoomed(false);
  }, [initialIndex, isOpen]);

  // Keyboard navigation & escape listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        // RTL next
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === 'ArrowLeft') {
        // RTL prev
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length, onClose]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 40; // min swipe distance

    if (diff > threshold) {
      // Swipe left -> next image in RTL
      setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    } else if (diff < -threshold) {
      // Swipe right -> prev image in RTL
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-stone-950/95 text-stone-100 backdrop-blur-md select-none transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      {/* Top action bar */}
      <div
        className="flex items-center justify-between px-4 sm:px-8 py-4 border-b border-white/10 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">
            {currentIndex + 1} / {images.length}
          </span>
          {currentImage?.tag && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-white/10 text-stone-200 border border-white/10">
              {currentImage.tag}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
            title={isZoomed ? 'تصغير' : 'تكبير'}
            aria-label="Toggle zoom"
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
            title="إغلاق المعرض"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main image viewer area with swipe */}
      <div
        className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous button (RTL) */}
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-stone-900/70 border border-white/10 text-white hover:bg-stone-800 transition-all shadow-lg active:scale-95"
          aria-label="Previous image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Next button (RTL) */}
        <button
          type="button"
          onClick={() => setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-stone-900/70 border border-white/10 text-white hover:bg-stone-800 transition-all shadow-lg active:scale-95"
          aria-label="Next image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Displayed Image */}
        <div className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center">
          <img
            key={currentImage?.url}
            src={currentImage?.url}
            alt={currentImage?.alt || 'صورة المنتج'}
            className={`max-w-full max-h-[72vh] object-contain rounded-xl transition-all duration-300 ${
              isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </div>
      </div>

      {/* Bottom captions and thumbnail strip */}
      <div
        className="px-4 sm:px-8 py-3 bg-stone-950/80 border-t border-white/10 flex flex-col items-center gap-3 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {currentImage?.caption && (
          <p className="text-center text-xs sm:text-sm text-stone-300 max-w-xl font-medium">
            {currentImage.caption}
          </p>
        )}

        {/* Thumbnails */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setCurrentIndex(idx);
                setIsZoomed(false);
              }}
              className={`relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                currentIndex === idx
                  ? 'border-amber-400 scale-105 shadow-md'
                  : 'border-white/20 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
