import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { PAYMENT_CONFIG } from '../data/mockData';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [contactVal, setContactVal] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactVal.trim() || !message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setContactVal('');
      setMessage('');
    }, 2000);
  };

  const whatsappDirect =
    `https://wa.me/${PAYMENT_CONFIG.whatsapp.phone}?text=` +
    encodeURIComponent('مرحباً فريق ذِكرى، أود الاستفسار عن تفاصيل الهدايا والتصميم المخصص.');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-12">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="text-3xl font-bold text-[#35101F]">تواصل معنا</h1>
        <p className="text-xs sm:text-sm text-[#806B72] leading-relaxed">
          فريق خدمة عملاء ذِكرى مستعد لمساعدتك في اختيار الهدية المثالية وتنسيق التصميم في أي وقت.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* WhatsApp Card */}
        <a
          href={whatsappDirect}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-6 rounded-3xl border border-[#F1DDE0] shadow-sm hover:border-[#D96A78] transition-all flex flex-col items-center text-center space-y-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
            <MessageCircle className="w-6 h-6 fill-emerald-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#35101F]">محادثة واتساب فوري</h3>
            <p className="text-xs text-[#806B72] mt-1">الرد خلال دقائق لمعاينة الصور</p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 mt-auto">تواصل عبر واتساب ↗</span>
        </a>

        {/* Phone Call Card */}
        <a
          href={`tel:+${PAYMENT_CONFIG.whatsapp.phone}`}
          className="bg-white p-6 rounded-3xl border border-[#F1DDE0] shadow-sm hover:border-[#D96A78] transition-all flex flex-col items-center text-center space-y-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#FFF9F5] border border-[#F1DDE0] flex items-center justify-center text-[#35101F] group-hover:scale-110 transition-transform">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#35101F]">اتصال هاتفي</h3>
            <p className="text-xs text-[#806B72] mt-1">يومياً من 10 ص حتى 10 م</p>
          </div>
          <span className="text-xs font-semibold text-[#D96A78] mt-auto">اتصل الآن ↗</span>
        </a>

        {/* Working Hours Card */}
        <div className="bg-white p-6 rounded-3xl border border-[#F1DDE0] shadow-sm flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF9F5] border border-[#F1DDE0] flex items-center justify-center text-[#C9827F]">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#35101F]">مواعيد العمل والشحن</h3>
            <p className="text-xs text-[#806B72] mt-1">الشحن متاح لكافة أنحاء مصر</p>
          </div>
          <span className="text-xs font-semibold text-[#806B72] mt-auto">طوال أيام الأسبوع</span>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#F1DDE0] shadow-sm max-w-xl mx-auto">
        <h2 className="text-base font-bold text-[#35101F] mb-4 text-center">أرسل لنا رسالة سريعة</h2>

        {submitted ? (
          <div className="p-6 text-center space-y-2 bg-[#FFF9F5] rounded-2xl border border-[#F1DDE0]">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="text-sm font-bold text-[#35101F]">شكراً لتواصلك معنا!</h3>
            <p className="text-xs text-[#806B72]">تم استلام رسالتك وسنقوم بالرد عليك في أقرب وقت.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-right">
            <div>
              <label className="text-xs font-semibold text-[#35101F] block mb-1">الاسم</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اسمك الكريم"
                className="w-full px-4 py-2.5 rounded-xl border border-[#F1DDE0] bg-[#FFF9F5]/40 text-xs text-[#2B101A] focus:outline-none focus:border-[#D96A78]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#35101F] block mb-1">رقم الهاتف أو البريد الإلكتروني</label>
              <input
                type="text"
                required
                value={contactVal}
                onChange={(e) => setContactVal(e.target.value)}
                placeholder="010XXXXXXXX أو yourname@email.com"
                className="w-full px-4 py-2.5 rounded-xl border border-[#F1DDE0] bg-[#FFF9F5]/40 text-xs text-[#2B101A] focus:outline-none focus:border-[#D96A78]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#35101F] block mb-1">الرسالة أو الاستفسار</label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="كيف يمكننا مساعدتك بخصوص الهدية؟"
                className="w-full px-4 py-2.5 rounded-xl border border-[#F1DDE0] bg-[#FFF9F5]/40 text-xs text-[#2B101A] focus:outline-none focus:border-[#D96A78] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#35101F] hover:bg-[#2B101A] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>إرسال الرسالة</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
