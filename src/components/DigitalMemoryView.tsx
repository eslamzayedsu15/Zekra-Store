import React, { useState, useEffect } from 'react';
import { DigitalMemory } from '../types';
import { DEMO_DIGITAL_MEMORY } from '../data/mockData';
import {
  Play,
  Pause,
  Volume2,
  Calendar,
  Heart,
  Share2,
  Lock,
  Unlock,
  Sparkles,
  ArrowRight,
  Music,
  Video,
  Image as ImageIcon,
  Check,
} from 'lucide-react';

interface DigitalMemoryViewProps {
  memory?: DigitalMemory;
  onBackToStore: () => void;
}

export const DigitalMemoryView: React.FC<DigitalMemoryViewProps> = ({
  memory = DEMO_DIGITAL_MEMORY,
  onBackToStore,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(25);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Audio play simulation
  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const toggleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikesCount((c) => c + 1);
    } else {
      setLiked(false);
      setLikesCount((c) => Math.max(1, c - 1));
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#2B101A] pb-24 selection:bg-[#EFA0A8]/30 selection:text-[#35101F]">
      {/* Discreet Memory Top Bar */}
      <div className="sticky top-0 z-30 bg-[#FFF9F5]/90 backdrop-blur-md border-b border-[#F1DDE0] px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToStore}
            className="flex items-center gap-1.5 text-xs text-[#806B72] hover:text-[#35101F] transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للمتجر</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[#D96A78] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ذِكرى خاصة ومشفرة</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 text-[#35101F] hover:bg-[#F1DDE0] rounded-full transition-colors relative cursor-pointer"
              title="نسخ رابط الذكرى"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#35101F] text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap shadow-md">
                  تم نسخ الرابط!
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Memory Hero Banner */}
        <div className="bg-white rounded-3xl overflow-hidden border border-[#F1DDE0] shadow-sm">
          <div className="relative aspect-[4/3] w-full bg-stone-900">
            <img
              src={memory.coverImage}
              alt={memory.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            {/* Floating Date Badge */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#35101F] flex items-center gap-1.5 shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-[#D96A78]" />
              <span>{memory.date || memory.specialDate}</span>
            </div>

            {/* Bottom Title in Cover */}
            <div className="absolute bottom-4 right-4 left-4 text-white text-right">
              <span className="text-xs text-[#EFA0A8] font-medium block mb-1">
                {memory.recipients || memory.coupleNames}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold">{memory.title}</h1>
            </div>
          </div>

          {/* Emotional Message Box */}
          <div className="p-6 text-right space-y-4">
            <p className="text-sm leading-relaxed text-[#2B101A] whitespace-pre-line font-light">
              {memory.personalMessage || memory.loveMessage}
            </p>

            <div className="pt-3 border-t border-[#F1DDE0] flex items-center justify-between text-xs text-[#806B72]">
              <div className="flex items-center gap-1.5">
                <span>بكل حب،</span>
                <span className="font-semibold text-[#35101F]">{memory.senderName || memory.coupleNames}</span>
              </div>

              <button
                onClick={toggleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  liked
                    ? 'bg-[#EFA0A8]/30 text-[#D96A78]'
                    : 'bg-[#FFF9F5] text-[#806B72] hover:text-[#D96A78]'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-[#D96A78]' : ''}`} />
                <span className="font-mono">{likesCount}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dedicated Audio / Song Player */}
        {(memory.song || memory.songTitle) && (
          <div className="bg-white rounded-2xl p-5 border border-[#F1DDE0] shadow-xs flex items-center gap-4 text-right">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-12 h-12 rounded-full bg-[#35101F] text-white flex items-center justify-center flex-shrink-0 shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              {isPlayingAudio ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ms-0.5 fill-white" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between text-xs font-bold text-[#35101F] mb-1">
                <span className="truncate">{memory.song?.title || memory.songTitle || 'أغنية اللحظات الخاصة'}</span>
                <Music className="w-3.5 h-3.5 text-[#D96A78] flex-shrink-0" />
              </div>
              <div className="text-[11px] text-[#806B72] truncate mb-2">
                {memory.song?.artist || 'موسيقى رومانسية مخصصة'}
              </div>

              {/* Progress Line */}
              <div className="w-full bg-[#F1DDE0] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#D96A78] h-full rounded-full transition-all duration-300"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Photo Gallery Grid */}
        {(memory.gallery || memory.galleryImages) && (
          <div className="bg-white rounded-3xl p-6 border border-[#F1DDE0] shadow-xs space-y-4 text-right">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#35101F]">ألبوم الصور المرفقة</h3>
              <ImageIcon className="w-4 h-4 text-[#D96A78]" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(memory.gallery || memory.galleryImages || []).map((imgUrl: string, i: number) => (
                <div
                  key={i}
                  onClick={() => setSelectedPhoto(imgUrl)}
                  className="aspect-square rounded-2xl overflow-hidden bg-[#FFF9F5] border border-[#F1DDE0] cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <img
                    src={imgUrl}
                    alt={`صورة ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Card */}
        {memory.videoUrl && (
          <div className="bg-white rounded-3xl p-6 border border-[#F1DDE0] shadow-xs space-y-4 text-right">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#35101F]">مقطع فيديو الذكرى</h3>
              <Video className="w-4 h-4 text-[#D96A78]" />
            </div>

            <div
              onClick={() => setShowVideoModal(true)}
              className="relative aspect-video rounded-2xl overflow-hidden bg-black cursor-pointer group"
            >
              <img
                src={memory.coverImage}
                alt="معاينة الفيديو"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-14 h-14 rounded-full bg-white/90 text-[#35101F] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 ms-1 fill-[#35101F]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security & Encrypted footer notice */}
        <div className="text-center py-4 text-xs text-[#806B72] flex items-center justify-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-[#D96A78]" />
          <span>هذه الصفحة خاصة ومشفرة ومحفوظة عبر ذِكرى</span>
        </div>
      </div>

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fadeIn"
        >
          <img
            src={selectedPhoto}
            alt="تكبير الصورة"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl"
          />
        </div>
      )}

      {/* Video Modal Simulation */}
      {showVideoModal && (
        <div
          onClick={() => setShowVideoModal(false)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-black rounded-3xl overflow-hidden border border-white/20 aspect-video flex items-center justify-center text-white relative"
          >
            <p className="text-xs text-white/70">معاينة مقطع الفيديو المرتبط بالبرواز</p>
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 p-2 bg-white/20 rounded-full text-white hover:bg-white/40"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
