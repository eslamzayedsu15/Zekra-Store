import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  Sparkles,
  Smartphone,
  QrCode,
  PackageCheck,
  Eye,
} from 'lucide-react';
import { SMART_FRAME_BLACK, SMART_FRAME_CLOSEUP, HERO_IMAGE } from '../data/mockData';

interface Chapter {
  id: string;
  title: string;
  timeSec: number;
  highlight: string;
}

const CHAPTERS: Chapter[] = [
  { id: 'look', title: 'شكل وخامة البرواز', timeSec: 0, highlight: 'أكريليك نقي وتصميم فخم' },
  { id: 'nfc', title: 'تقريب الهاتف بـ NFC', timeSec: 5, highlight: 'فتح فوري بدون أي تطبيق' },
  { id: 'memory', title: 'صفحة الذكريات الخاصة', timeSec: 10, highlight: 'صور، فيديوهات، وتسجيلات' },
  { id: 'box', title: 'محتويات البوكس الفاخر', timeSec: 16, highlight: 'تغليف راقي جاهز للإهداء' },
];

export const ProductVideoSection: React.FC<{ onBuyClick: () => void }> = ({ onBuyClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const totalDuration = 22; // 22 seconds simulated interactive product tour video

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 1;
          // sync chapter
          const matchedIdx = CHAPTERS.slice().reverse().findIndex((c) => next >= c.timeSec);
          if (matchedIdx !== -1) {
            setActiveChapterIndex(CHAPTERS.length - 1 - matchedIdx);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSeek = (timeSec: number, idx: number) => {
    setCurrentTime(timeSec);
    setActiveChapterIndex(idx);
    setIsPlaying(true);
  };

  const currentChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-[#F1DDE0] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#35101F] text-white text-xs font-medium mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#EFA0A8]" />
            <span>عرض تفصيلي للمنتج</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#35101F] tracking-tight mb-3">
            شاهد المنتج قبل الطلب
          </h2>
          <p className="text-sm sm:text-base text-[#806B72] font-light leading-relaxed">
            شوف البرواز بنفسك واعرف فكرته وطريقة استخدامه قبل ما تطلب.
          </p>
        </div>

        {/* Video Player Card */}
        <div className="relative rounded-3xl overflow-hidden bg-[#2B101A] border border-[#35101F] shadow-2xl">
          {/* Main Visual Display */}
          <div className="relative aspect-video w-full flex items-center justify-center overflow-hidden">
            {/* Visual simulation screens based on current chapter */}
            <div className="absolute inset-0">
              {activeChapterIndex === 0 && (
                <div className="relative w-full h-full animate-fadeIn">
                  <img
                    src={SMART_FRAME_BLACK}
                    alt="شكل وخامة البرواز"
                    className="w-full h-full object-cover brightness-90 transform scale-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  <div className="absolute bottom-6 right-6 left-6 text-right text-white">
                    <span className="px-2.5 py-1 rounded-lg bg-[#D96A78] text-white text-[11px] font-bold">
                      الخامة والأبعاد
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold mt-2">
                      أكريليك فائق النقاء بديل للزجاج ومقاوم للصدمات
                    </h3>
                  </div>
                </div>
              )}

              {activeChapterIndex === 1 && (
                <div className="relative w-full h-full animate-fadeIn">
                  <img
                    src={SMART_FRAME_CLOSEUP}
                    alt="تقريب الهاتف بتقنية NFC"
                    className="w-full h-full object-cover brightness-90 transform scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  <div className="absolute bottom-6 right-6 left-6 text-right text-white">
                    <span className="px-2.5 py-1 rounded-lg bg-[#D96A78] text-white text-[11px] font-bold">
                      اللمس الذكي
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold mt-2">
                      مجرد تقريب الهاتف من الشريحة المدمجة يفتح الذكريات فوراً
                    </h3>
                  </div>
                </div>
              )}

              {activeChapterIndex === 2 && (
                <div className="relative w-full h-full animate-fadeIn">
                  <img
                    src={HERO_IMAGE}
                    alt="صفحة الذكريات الخاصة"
                    className="w-full h-full object-cover brightness-90 transform scale-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
                  <div className="absolute bottom-6 right-6 left-6 text-right text-white">
                    <span className="px-2.5 py-1 rounded-lg bg-[#D96A78] text-white text-[11px] font-bold">
                      ألبومك الخاص
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold mt-2">
                      صفحة خاصة مشفرة تضم صوركم، فيديوهاتكم، والأغنية المفضلة
                    </h3>
                  </div>
                </div>
              )}

              {activeChapterIndex === 3 && (
                <div className="relative w-full h-full animate-fadeIn">
                  <img
                    src={SMART_FRAME_BLACK}
                    alt="محتويات البوكس الفاخر"
                    className="w-full h-full object-cover brightness-90 transform scale-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />
                  <div className="absolute bottom-6 right-6 left-6 text-right text-white">
                    <span className="px-2.5 py-1 rounded-lg bg-[#D96A78] text-white text-[11px] font-bold">
                      تغليف هدية فاخر
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold mt-2">
                      يصلك في بوكس هدايا أنيق جاهز لتقديمه مباشرة لمن تحب
                    </h3>
                  </div>
                </div>
              )}
            </div>

            {/* Big Play/Pause Center Button */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#35101F]/80 hover:bg-[#35101F] text-white backdrop-blur-md border border-[#F1DDE0]/30 shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group cursor-pointer"
              aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل الفيديو'}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 sm:w-8 sm:h-8" />
              ) : (
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ms-1" />
              )}
            </button>

            {/* Live Progress Bar Top Overlay */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20">
              <div
                className="h-full bg-[#D96A78] transition-all duration-300"
                style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              />
            </div>
          </div>

          {/* Chapters Navigation Tabs Under Video */}
          <div className="p-4 sm:p-6 bg-[#2B101A] border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handleSeek(ch.timeSec, idx)}
                  className={`p-3 rounded-2xl text-right transition-all cursor-pointer ${
                    activeChapterIndex === idx
                      ? 'bg-white/15 border border-[#D96A78] text-white'
                      : 'bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="text-[11px] font-bold truncate">{ch.title}</div>
                  <div className="text-[10px] text-[#EFA0A8] truncate mt-0.5 font-light">
                    {ch.highlight}
                  </div>
                </button>
              ))}
            </div>

            {/* Video Footer CTA */}
            <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-right text-xs text-white/70">
                <span>جاهز تفرح شريكك بالهدية؟</span>
                <span className="font-bold text-[#EFA0A8] me-2 font-mono">550 ج.م فقط</span>
                <span>(عربون 50 ج.م والباقي عند الاستلام)</span>
              </div>

              <button
                type="button"
                onClick={onBuyClick}
                className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-[#D96A78] hover:bg-[#C9827F] text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
              >
                اطلب بروازك الذكي الآن
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
