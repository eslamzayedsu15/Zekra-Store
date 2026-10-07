<div align="center">

# ZEKRA | ذِكرى

### متجر الهدايا المخصصة والذكريات الرقمية

**هديتك مش مجرد حاجة... دي ذكرى بتفضل.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

<br />

[معاينة مباشرة](#-معاينة-مباشرة) · [التشغيل محلي](#-التشغيل-محلي) · [بنية المشروع](#-بنية-المشروع) · [المميزات](#-المميزات) · [الخصوصية](#-الأمان-والخصوصية) · [English](#-english-summary)

<br />

---

## 📖 نبذة عن المشروع

**ذِكرى (ZEKRA)** متجر إلكتروني عربي متخصص في الهدايا المخصصة عالية القيمة، وأبرز منتجاته **برواز الذكريات الذكي**: برواز أكريليك مزوّد بشريحة **NFC** وكود **QR** يفتحان صفحة ذكريات رقمية خاصة (صور، فيديو، رسائل، تسجيلات صوتية، ولحظات مرتبة على خط زمني).

الواجهة بالكامل **عربية RTL** ومتجاوبة مع الموبايل والديسكتوب، مع تجربة شراء متكاملة: صفحة منتج، شراء فوري، سلة دفع بخطوة واحدة، تأكيد الطلب، تتبّع الطلبات، وصفحة ذكريات تفاعلية.

<br />

## ✨ المميزات

### تجربة المتسوّق

| الميزة | الوصف |
| :--- | :--- |
| **صفحة منتج احترافية** | معرض صور، فيديو، آراء العملاء، مواصفات، ومقاسان ولونان |
| **شراء فوري** | من اختيار المقاس واللون إلى صفحة الدفع بخطوة واحدة |
| **سلة دفع بخطوة واحدة** | اسم العميل، رقم الموبايل، المحافظة، العنوان، وطريقة الدفع |
| **طرق دفع محلية** | فودافون كاش وإنستا باي مع تعليمات واضحة لكل طريقة |
| **تأكيد الطلب** | رقم طلب + ملخص الطلب + تعليمات دفع العربون |
| **تتبّع الطلبات** | الطلبات محفوظة محليًا مع حالتها: عربون / مؤكد / قيد التنفيذ / تم الشحن / تم التسليم |
| **صفحة ذكريات رقمية** | غلاف، رسالة حب، تسجيل صوتي، معرض صور، فيديو، خط زمني، مع قفل اختياري بالرمز السري |
| **أنيميشن أول زيارة** | يظهر مرة واحدة فقط لكل زائر |

### تجربة الواجهة

- **RTL كامل** بخطوط عربية احترافية: `IBM Plex Sans Arabic` + `Plus Jakarta Sans`
- **اللوجو الرسمي** بصيغة PNG شفافة بنسختين: نسخة داكنة للخلفيات الفاتحة، ونسخة فاتحة للتذييل الداكن
- **أنيميشن تحميل أول زيارة** بسيط واحترافي: ظهور تدريجي + خط تقدم + تلاشي
- **أنيميشن انتقال بين الصفحات** بشعار ذِكرى
- **شريط تنقل سفلي** للموبايل مع قائمة جانبية
- **زر واتساب عائم** للتواصل الفوري
- **مودال قانوني** (الشروط والخصوصية) + صفحة أسئلة شائعة
- **احترام `prefers-reduced-motion`** لمستخدمي تقليل الحركة

### الصفحات

- **الرئيسية** — Hero slider، شفافية ومزايا، كاتيجوريات، تخصيص الهدية، آراء العملاء، CTA نهائي
- **كيف يعمل** — رحلة الطلب من الفكرة حتى التسليم
- **من نحن** · **الأسئلة الشائعة** · **اتصل بنا**

<br />

## 🛠️ التقنيات المستخدمة

| التقنية | الاستخدام |
| :--- | :--- |
| **React 19** | واجهة المستخدم مع Hooks |
| **Vite 8** | Bundler و Dev Server مع HMR |
| **TypeScript** | تعريفات الأنواع (منتج، طلب، ذكريات) |
| **Tailwind CSS 4** | التنسيق عبر `@tailwindcss/vite` |
| **lucide-react** | مكتبة الأيقونات |
| **ESM** | `type: module` مع هدف ES2022 |

<br />

## 🚀 التشغيل محلي

### المتطلبات

- **Node.js** 20.19 أو أحدث (موصى به 22)
- **npm** 10 أو أحدث

### الخطوات

```bash
# 1) استنساخ المشروع
git clone https://github.com/YOUR_USERNAME/Zekra-Store.git
cd Zekra-Store

# 2) تثبيت الحزم
npm install

# 3) (اختياري) إعداد متغيرات البيئة
cp .env.example .env

# 4) تشغيل السيرفر المحلي
npm run dev
```

ثم افتح المتصفح على:

```
http://localhost:3000
```

> **ملاحظة:** لو ظهر تحذير `ERESOLVE` أثناء التثبيت بسبب تعارض `peer dependencies` بين `esbuild` و `vite@8`، استخدم:
>
> ```bash
> npm install --legacy-peer-deps
> ```

### أوامر المشروع

| الأمر | الوظيفة |
| :--- | :--- |
| `npm run dev` | تشغيل سيرفر التطوير على المنفذ 3000 |
| `npm run build` | بناء نسخة الإنتاج داخل مجلد `dist` |
| `npm run preview` | معاينة نسخة الإنتاج محليًا |
| `npm run lint` | فحص الأنواع بـ TypeScript |
| `npm run clean` | تنظيف ملفات البناء |

<br />

## 📁 بنية المشروع

```
Zekra-Store/
├── index.html                  # نقطة الدخول وتحميل الخطوط
├── vite.config.ts              # إعدادات Vite (alias @ و HMR)
├── tsconfig.json               # إعدادات TypeScript
├── metadata.json               # بيانات المشروع
├── .env.example                # متغيرات البيئة النموذجية
└── src/
    ├── main.tsx                # نقطة انطلاق React
    ├── App.tsx                 # التوجيه (Routing) وتركيب الصفحة
    ├── types.ts                # أنواع TypeScript
    ├── index.css               # Tailwind و keyframes و متغيرات التصميم
    ├── assets/images/          # صور المنتجات واللوجو
    ├── data/mockData.ts        # بيانات المنتج والدفع والتواصل
    └── components/
        ├── Navbar.tsx              # شريط التنقل العلوي
        ├── MobileBottomBar.tsx     # شريط التنقل السفلي للموبايل
        ├── HeroSlider.tsx         # Hero slider الرئيسية
        ├── TrustBenefitsSection.tsx # شفافية ومزايا المتجر
        ├── ProductDetailPage.tsx   # صفحة المنتج
        ├── ProductGalleryModal.tsx # معرض الصور
        ├── ProductVideoSection.tsx # قسم الفيديو
        ├── ProductReviewsSection.tsx # آراء العملاء
        ├── CheckoutPage.tsx        # صفحة الدفع
        ├── OrderConfirmationModal.tsx # تأكيد الطلب
        ├── TrackOrderModal.tsx     # تتبّع الطلبات
        ├── DigitalMemoryView.tsx   # صفحة الذكريات الرقمية
        ├── AboutView.tsx           # من نحن
        ├── HowItWorksView.tsx      # كيف يعمل
        ├── FaqView.tsx             # الأسئلة الشائعة
        ├── ContactView.tsx         # اتصل بنا
        ├── Footer.tsx              # التذييل
        ├── LegalModal.tsx          # الشروط والخصوصية
        ├── ZekraLogo.tsx           # مكوّن اللوجو
        ├── PageTransitionLoader.tsx # أنيميشن الانتقال بين الصفحات
        └── FirstVisitLoader.tsx    # أنيميشن أول زيارة (مرة واحدة)
```

<br />

## 🗺️ المسارات

التطبيق يستخدم توجيه من côté العميل عبر `window.history` بدون مكتبات إضافية:

| المسار | الصفحة |
| :--- | :--- |
| `/` | الصفحة الرئيسية |
| `/products/smart-memory-frame` | صفحة برواز الذكريات |
| `/checkout` | صفحة الدفع |
| `/how-it-works` | كيف يعمل |
| `/about` | من نحن |
| `/faq` | الأسئلة الشائعة |
| `/contact` | اتصل بنا |
| `/memory` | صفحة الذكريات الرقمية |

<br />

## ⚙️ الإعداد والتخصيص

### بيانات المنتج والدفع

كل بيانات المنتجات ووسائل الدفع والتواصل مجمّعة في ملف واحد: `src/data/mockData.ts`

يمكنك تعديل الأسعار، وأرقام طرق الدفع، ورقم واتساب، ورسائل التواصل من هناك.

### اللوجو

اللوجو الرسمي موجود في `src/assets/images` ويُستخدم عن طريق المكوّن `ZekraLogo`:

```tsx
<ZekraLogo size="sm" />               // النسخة الداكنة (افتراضي)
<ZekraLogo size="lg" theme="light" /> // النسخة الفاتحة للتذييل الداكن
```

### ألوان الهوية والخطوط

كل ألوان البراند والخطوط معرّفة كمتغيرات CSS في `src/index.css`:

| المتغير | القيمة |
| :--- | :--- |
| `--color-primary` | `#35101F` |
| `--color-secondary` | `#D96A78` |
| `--color-accent` | `#EFA0A8` |
| `--color-bg-main` | `#FFF9F5` |

### متغيرات البيئة (اختيارية)

```env
GEMINI_API_KEY="MY_GEMINI_API_KEY"   # مطلوب لاستدعاءات Gemini API
APP_URL="MY_APP_URL"                 # رابط التطبيق
```

> التطبيق يعمل بدون هذه المتغيرات لأن نسخة المتجر الحالية ثابتة. تُحتاج فقط عند إضافة مزايا ذكاء اصطناعي.

<br />

## 🔒 الأمان والخصوصية

- **بيانات العميل:** تُحفظ الطلبات في `localStorage` على جهاز الزائر فقط، ولا يوجد خادم أو قاعدة بيانات حتى الآن.
- **الدفع:** يدوي عبر فودافون كاش أو إنستا باي، والتأكيد يتم عبر واتساب.
- **الخصوصية:** صفحة الذكريات تدعم قفلًا اختياريًا بالرمز السري.

> **ملاحظة:** قبل النشر العام يُنصح بنقل البيانات إلى خادم مع قاعدة بيانات وتشفير للمعلومات الحساسة، وعدم الاعتماد على التخزين المحلي.

<br />

## 🤝 المساهمة

المساهمات مرحب بها. لإضافة ميزة:

1. Fork المشروع
2. أنشئ فرعًا جديدًا: `git checkout -b feature/your-feature`
3. عدّل الملفات والتزم بنمط الكود الحالي
4. اختبر باستخدام `npm run lint` و `npm run build`
5. افتح Pull Request مع وصف واضح للتغيير

<br />

## 📄 الرخصة

هذا المشروع مخصص للاستخدام التعليمي والتجريبي. جميع الحقوق محفوظة لمتجر ذِكرى.

---

---

# 🌐 English Summary

**ZEKRA (ذِكرى)** is a modern Arabic-first (RTL) e-commerce storefront for personalized gifts, built around the **Smart Memory Frame**: an acrylic keepsake embedded with an **NFC chip** and a **QR code** that open a private digital memory page with photos, videos, voice notes, messages, and a memory timeline.

### Highlights

- **Frontend stack:** React 19, TypeScript, Vite 8, Tailwind CSS 4
- **Complete shopping flow:** product page, instant buy, one-step checkout, order confirmation, and order tracking
- **Local payments:** Vodafone Cash and InstaPay, confirmed manually over WhatsApp
- **Digital memory page:** cover, love message, voice note, gallery, video, timeline, optional PIN lock
- **First-visit intro animation:** shown once per browser using `localStorage`
- **Arabic-first UI:** IBM Plex Sans Arabic and Plus Jakarta Sans, RTL layout, mobile bottom navigation

### Quick start

```bash
git clone https://github.com/YOUR_USERNAME/Zekra-Store.git
cd Zekra-Store
npm install --legacy-peer-deps
cp .env.example .env
npm run dev
```

Open `http://localhost:3000`.

> The `--legacy-peer-deps` flag avoids a known peer dependency conflict between `esbuild` and `vite@8`.

### Data and privacy

This version is fully client-side. Orders and preferences are stored in the visitor's `localStorage`; there is no backend or database. Before a production deployment, move sensitive data to a backend with a database and encryption.

### Customization

- **Products, payments, and contact info** — `src/data/mockData.ts`
- **Logo** — `src/components/ZekraLogo.tsx` (dark and light artwork variants)
- **Brand colors and fonts** — CSS variables in `src/index.css`

---

<div align="center">
  <sub>ZEKRA | ذِكرى — صُنع بحب 🤍</sub>
</div>