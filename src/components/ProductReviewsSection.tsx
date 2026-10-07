import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  Heart,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Quote,
  ThumbsUp,
  MapPin,
  Calendar,
} from 'lucide-react';
import { PAYMENT_CONFIG } from '../data/mockData';

interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  occasion: string;
  frameColor: 'فريم أسود' | 'فريم أبيض';
  verified: boolean;
  content: string;
  helpfulCount: number;
}

const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'مريم هشام',
    location: 'القاهرة · المعادي',
    rating: 5,
    date: 'منذ 3 أيام',
    occasion: 'ذكرى زواج',
    frameColor: 'فريم أسود',
    verified: true,
    content:
      'البرواز طلع أحلى من الصور بمراحل! تفاصيل الأكريليك فخمة وواضحة جداً، ولما قرّبنا الموبايل وشوفنا الفيديو والأغنية اللي اخترناها، جوزي اتأثر جداً بالهدية. شكراً لذِكرى على الذوق والسرعة والتغليف الراقي 🤍',
    helpfulCount: 24,
  },
  {
    id: 'rev-2',
    author: 'عمر الشناوي',
    location: 'الإسكندرية · سموحة',
    rating: 5,
    date: 'منذ أسبوع',
    occasion: 'هدية خطوبة',
    frameColor: 'فريم أسود',
    verified: true,
    content:
      'فكرة عبقرية ومختلفة تماماً عن أي هدية تقليدية. الخطوات كانت سهلة جداً، والتنسيق على واتساب كان قمة في الاحترام والرقي. دفعت العربون إنستا باي والأوردر وصلني في ميعاده بالظبط متغلف بطريقة ملكية.',
    helpfulCount: 19,
  },
  {
    id: 'rev-3',
    author: 'سارة عبد الرحمن',
    location: 'الجيزة · الشيخ زايد',
    rating: 5,
    date: 'منذ أسبوعين',
    occasion: 'عيد ميلاد والدتي',
    frameColor: 'فريم أبيض',
    verified: true,
    content:
      'الفريم الأبيض تحفة ونقي جداً ومريح للعين. حطينا فيه صورة العيلة مع تسجيل صوتي للأحفاد وفيديوهات قديمة، ماما بكت من الفرحة لما كود الـ QR فتح الذكريات على موبايلها فوراً. شكراً على الهدية اللي ليها معنى بجد.',
    helpfulCount: 31,
  },
  {
    id: 'rev-4',
    author: 'كريم الدسوقي',
    location: 'الدقهلية · المنصورة',
    rating: 5,
    date: 'منذ 3 أسابيع',
    occasion: 'هدية تخرج',
    frameColor: 'فريم أسود',
    verified: true,
    content:
      'أجمل هدية عملتها لأختي في تخرجها. الأكريليك خفيف وآمن ومش بيتعرض للكسر زي الزجاج، وجودة الألوان في الطباعة واضحة جداً. وصفحة الذكريات سهلة وأضفنا عليها صور الحفلة ومقاطع الفيديو براحتنا.',
    helpfulCount: 15,
  },
  {
    id: 'rev-5',
    author: 'نورهان مصطفى',
    location: 'الغربية · طنطا',
    rating: 5,
    date: 'منذ شهر',
    occasion: 'مولود جديد',
    frameColor: 'فريم أبيض',
    verified: true,
    content:
      'أول مرة أطلب حاجة أونلاين وتطلع أجمل بكتير من توقعاتي! وثقنا في البرواز أول صورة للبيبي وصوت نبضات قلبه في السونار. الفريق على واتساب متعاون لأقصى درجة لحد ما اخترنا التصميم المظبوط. 10/10 بجد 🤍',
    helpfulCount: 22,
  },
  {
    id: 'rev-6',
    author: 'أحمد رفعت',
    location: 'القاهرة · مصر الجديدة',
    rating: 5,
    date: 'منذ شهر',
    occasion: 'هدية كتب كتاب',
    frameColor: 'فريم أسود',
    verified: true,
    content:
      'التجربة من أول الطلب لحد الاستلام كانت ممتازة. فكرة دفع 50 ج.م بس عربون والباقي عند الاستلام بتديك أمان عالي جداً. والبرواز في الحقيقة بيبان كأنه قطعة ديكور فخمة في الصالون.',
    helpfulCount: 28,
  },
];

export const ProductReviewsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'الكل' | 'فريم أسود' | 'فريم أبيض'>('الكل');
  const [helpfulLiked, setHelpfulLiked] = useState<Record<string, boolean>>({});

  const toggleHelpful = (id: string) => {
    setHelpfulLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredReviews = REVIEWS.filter((r) => {
    if (activeFilter === 'الكل') return true;
    return r.frameColor === activeFilter;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#FFF9F5] border-t border-[#F1DDE0] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F1DDE0] text-[#35101F] text-xs font-semibold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D96A78]" />
            <span>تجارب حقيقية موثقة</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#35101F] tracking-tight">
            آراء وتجارب عملاء ذِكرى
          </h2>

          <p className="text-sm sm:text-base text-[#806B72] font-light leading-relaxed">
            لحظات فرح ومشاعر حقيقية شاركها عملاؤنا بعد استلام برواز الذكريات الذكي في مختلف محافظات مصر.
          </p>
        </div>

        {/* Aggregate Ratings Overview Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F1DDE0] shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Big Score */}
          <div className="flex items-center gap-5 text-right">
            <div className="w-18 h-18 rounded-2xl bg-[#FFF9F5] border border-[#F1DDE0] flex flex-col items-center justify-center text-[#35101F] flex-shrink-0">
              <span className="text-3xl font-extrabold font-mono leading-none">5.0</span>
              <span className="text-[10px] text-[#806B72] font-medium mt-1">من 5</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[#D96A78]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D96A78] text-[#D96A78]" />
                ))}
              </div>
              <h3 className="text-sm font-bold text-[#2B101A]">تقييم ممتاز بنسبة 100%</h3>
              <p className="text-xs text-[#806B72]">
                بناءً على أكثر من 148 طلب مؤكد ومسلم خلال الشهور الماضية
              </p>
            </div>
          </div>

          {/* Trust Guarantees Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFF9F5] border border-[#F1DDE0] text-xs text-[#2B101A]">
              <CheckCircle2 className="w-4 h-4 text-[#D96A78]" />
              <span>طلبات شراء حقيقية مؤكدة</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFF9F5] border border-[#F1DDE0] text-xs text-[#2B101A]">
              <ShieldCheck className="w-4 h-4 text-[#D96A78]" />
              <span>ضمان المعاينة عند الاستلام</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {(['الكل', 'فريم أسود', 'فريم أبيض'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeFilter === tab
                  ? 'bg-[#35101F] text-white shadow-sm'
                  : 'bg-white text-[#806B72] border border-[#F1DDE0] hover:text-[#35101F] hover:bg-[#FFF9F5]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => {
            const isLiked = helpfulLiked[rev.id];
            const displayCount = rev.helpfulCount + (isLiked ? 1 : 0);

            return (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 border border-[#F1DDE0] shadow-xs hover:border-[#D96A78] hover:shadow-md transition-all flex flex-col justify-between space-y-4 text-right"
              >
                {/* Top: Author, verified status, occasion badge */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar initial */}
                      <div className="w-10 h-10 rounded-full bg-[#35101F] text-white flex items-center justify-center font-bold text-sm">
                        {rev.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-[#2B101A]">{rev.author}</h4>
                          {rev.verified && (
                            <span
                              title="مشتري مؤكد"
                              className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-[#806B72] mt-0.5">
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-[#C9827F]" />
                            <span>{rev.location}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Frame color badge */}
                    <span className="text-[10px] font-medium px-2 py-1 rounded-lg bg-[#FFF9F5] border border-[#F1DDE0] text-[#35101F]">
                      {rev.frameColor}
                    </span>
                  </div>

                  {/* Rating Stars & Occasion */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D96A78] text-[#D96A78]" />
                      ))}
                    </div>

                    <span className="text-[11px] font-semibold text-[#D96A78] bg-[#EFA0A8]/20 px-2 py-0.5 rounded-full">
                      {rev.occasion}
                    </span>
                  </div>

                  {/* Review Text Body */}
                  <p className="text-xs sm:text-sm text-[#2B101A] font-light leading-relaxed pt-2">
                    “{rev.content}”
                  </p>
                </div>

                {/* Card Footer: Date and Helpful vote */}
                <div className="pt-3 border-t border-[#F1DDE0] flex items-center justify-between text-[11px] text-[#806B72]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{rev.date}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleHelpful(rev.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      isLiked
                        ? 'bg-[#EFA0A8]/20 text-[#35101F] font-bold'
                        : 'text-[#806B72] hover:text-[#35101F] hover:bg-[#FFF9F5]'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#D96A78] text-[#D96A78]' : ''}`} />
                    <span>مفيد ({displayCount})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp Experience Callout */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-[#F1DDE0] shadow-sm text-center max-w-2xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
            <MessageCircle className="w-6 h-6 fill-emerald-600 text-emerald-600" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#2B101A]">
            عايز تشوف تجارب أكتر وصور البرواز على الحقيقة؟
          </h3>
          <p className="text-xs sm:text-sm text-[#806B72] max-w-md mx-auto leading-relaxed">
            تواصل معانا مباشرة على واتساب لمشاهدة نماذج سابقة وتنسيق تصميم هديتك خطوة بخطوة.
          </p>
          <a
            href={`https://wa.me/${PAYMENT_CONFIG.whatsapp.phone}?text=${encodeURIComponent(
              'أهلاً ذِكرى، أود الاطلاع على نماذج وتجارب إضافية لبرواز الذكريات الذكي 🤍'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-3 px-6 bg-[#35101F] hover:bg-[#2B101A] text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>تواصل معنا على واتساب</span>
          </a>
        </div>
      </div>
    </section>
  );
};
