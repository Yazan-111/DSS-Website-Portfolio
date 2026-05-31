const GUIDE_EMBED_URL =
  "https://drive.google.com/file/d/1GcNJPIOVER-Fsxak0QUGy9XdC1gujWlz/preview";

const thmanyahMedium =
  "'thmanyah serif display-Medium', 'Noto Naskh Arabic', 'Amiri', serif";

export default function GuidePage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen w-full"
      style={{ backgroundColor: "#efefef" }}
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-3 py-3 sm:px-4 sm:py-4 lg:gap-4 lg:px-5 lg:py-5">

        <div
          className="w-full overflow-hidden rounded-2xl sm:rounded-[22px]"
          style={{ backgroundColor: "#e2d9d1" }}
        >
          {/* Header */}
          <div className="px-6 pb-4 pt-8 text-center sm:px-10 sm:pt-10">
            <h1
              style={{
                fontFamily: thmanyahMedium,
                fontSize: "clamp(1.9rem, 3.8vw, 3.4rem)",
                fontWeight: 500,
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                color: "#3a2e24",
              }}
            >
              دليل استخدام البوت
            </h1>
            <p
              className="mt-3"
              style={{
                fontFamily: thmanyahMedium,
                fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)",
                color: "rgba(58,46,36,0.65)",
                lineHeight: 1.6,
              }}
            >
              تعرّف على طريقة استخدام البوت خطوة بخطوة
            </p>
          </div>

          {/* Embed */}
          <div className="px-4 pb-6 sm:px-6 sm:pb-8 lg:px-8 lg:pb-10">

            {/* Mobile */}
            <div
              className="relative w-full overflow-hidden rounded-xl md:hidden"
              style={{ paddingTop: "133%" }}
            >
              <iframe
                src={GUIDE_EMBED_URL}
                allow="autoplay"
                className="absolute inset-0 h-full w-full rounded-xl border-0"
              />
            </div>

            {/* Desktop */}
            <div className="hidden md:block">
              <iframe
                src={GUIDE_EMBED_URL}
                allow="autoplay"
                className="w-full rounded-2xl border-0"
                style={{ height: "80vh", minHeight: "600px" }}
              />
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
