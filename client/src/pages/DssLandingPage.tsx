const TELEGRAM_BOT_URL = "https://t.me/DailySchoolScheduleA42ndTerm_bot";

const thmanyahMedium =
  "'thmanyah serif display-Medium', 'Noto Naskh Arabic', 'Amiri', serif";
const thmanyahBold =
  "'thmanyah serif display-Bold', 'Noto Naskh Arabic', 'Amiri', serif";

export const DssLandingPage = (): JSX.Element => {
  return (
    <main
      dir="rtl"
      className="min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: "#efefef", fontFamily: thmanyahMedium }}
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-3 py-3 sm:px-4 sm:py-4 lg:gap-4 lg:px-5 lg:py-5">

        {/* ─── Hero ─── */}
        <HeroCard />

        {/* ─── Feature Cards ─── */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
          <FeatureCard
            gradient="linear-gradient(143deg, rgba(251,206,163,1) 19%, rgba(148,129,111,1) 57%, rgba(97,74,53,1) 94%)"
            text={"وسيرسل لك البوت\nالجدول يوميًا (السبت\nحتى الأربعاء) الساعة\n4 و6 مساءً"}
          />
          <FeatureCard
            gradient="linear-gradient(143deg, rgba(177,197,255,1) 19%, rgba(236,158,171,1) 57%, rgba(53,137,255,1) 94%)"
            text={"فقط أرسل جدولك\nوسيحلله الذكاء\nالاصطناعي لك!"}
          />
        </div>

        {/* ─── CTA ─── */}
        <CtaCard />
      </div>
    </main>
  );
};

function HeroCard() {
  return (
    <div
      className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-2xl px-6 py-14 text-center sm:min-h-[380px] sm:rounded-[22px] sm:px-10 md:min-h-[440px] lg:min-h-[500px]"
      style={{ backgroundColor: "#6e533a" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />
      <h1
        className="relative z-10 whitespace-pre-line text-white"
        style={{
          fontFamily: thmanyahMedium,
          fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
          fontWeight: 500,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          maxWidth: "760px",
        }}
      >
        {"بوت يرسل لك الجدول\nالخاص بك يوميًا!"}
      </h1>
    </div>
  );
}

function FeatureCard({ gradient, text }: { gradient: string; text: string }) {
  return (
    <div
      className="relative flex min-h-[260px] w-full items-center justify-center overflow-hidden rounded-2xl px-6 py-10 text-center sm:min-h-[300px] sm:rounded-[22px] sm:px-8 md:min-h-[340px] lg:min-h-[380px]"
      style={{ background: gradient }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />
      <h2
        className="relative z-10 whitespace-pre-line text-white"
        style={{
          fontFamily: thmanyahMedium,
          fontSize: "clamp(1.9rem, 3.8vw, 3.6rem)",
          fontWeight: 500,
          lineHeight: 1.18,
          letterSpacing: "-0.03em",
          maxWidth: "520px",
        }}
      >
        {text}
      </h2>
    </div>
  );
}

function CtaCard() {
  return (
    <div
      className="flex min-h-[260px] w-full flex-col items-center justify-center gap-4 rounded-2xl px-6 py-12 text-center sm:min-h-[300px] sm:rounded-[22px] sm:px-10 sm:gap-5 md:min-h-[340px] lg:min-h-[360px]"
      style={{ backgroundColor: "#c7b7a9" }}
    >
      <h2
        className="whitespace-pre-line text-black"
        style={{
          fontFamily: thmanyahMedium,
          fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
          fontWeight: 500,
          lineHeight: 1.12,
          letterSpacing: "-0.03em",
        }}
      >
        {"وش تنتظر؟\nابدأ تجربتك مع البوت"}
      </h2>
      <a
        href={TELEGRAM_BOT_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="link-telegram-start"
        className="transition-opacity hover:opacity-80 active:opacity-60"
        style={{
          fontFamily: thmanyahBold,
          fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: "#0094ff",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        }}
      >
        /start
      </a>
    </div>
  );
}
