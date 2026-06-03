const thmanyahMedium =
  "'thmanyah serif display-Medium', 'Tajawal', 'Noto Naskh Arabic', 'Amiri', serif";

export default function ContactPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen w-full"
      style={{ backgroundColor: "#efefef" }}
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-3 py-3 sm:px-4 sm:py-4">
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
              تواصل معنا
            </h1>
            <p
              style={{
                fontFamily: thmanyahMedium,
                fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
                color: "#7a6a5a",
                marginTop: "0.5rem",
              }}
            >
              للاقتراحات، الأخطاء التقنية، أو أي استفسار
            </p>
          </div>

          {/* Google Form */}
          <div className="px-4 pb-6 sm:px-8 sm:pb-10">
            <div
              className="overflow-hidden rounded-xl sm:rounded-2xl"
              style={{ backgroundColor: "#f5f0ea" }}
            >
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfSfqcehEgwgyfegruOFs2jVGFRYX5nIywuToSFSRxIBKcfBA/viewform?embedded=true"
                width="100%"
                height="820"
                style={{ border: "none", display: "block" }}
                title="تواصل معنا"
              >
                جاري التحميل...
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
