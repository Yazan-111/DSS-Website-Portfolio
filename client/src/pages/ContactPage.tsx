const thmanyahMedium =
  "'thmanyah serif display-Medium', 'Noto Naskh Arabic', 'Amiri', serif";
const thmanyahBold =
  "'thmanyah serif display-Bold', 'Noto Naskh Arabic', 'Amiri', serif";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfSfqcehEgwgyfegruOFs2jVGFRYX5nIywuToSFSRxIBKcfBA/viewform?embedded=true";

export default function ContactPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen w-full"
      style={{ backgroundColor: "#efefef" }}
    >
      {/* Heading */}
      <div
        className="flex min-h-[180px] w-full items-center justify-center rounded-2xl px-6 py-10 text-center sm:min-h-[220px] sm:rounded-[22px] sm:px-10"
        style={{ backgroundColor: "#6e533a" }}
      >
        <h1
          className="text-4xl text-white sm:text-5xl lg:text-6xl"
          style={{ fontFamily: thmanyahBold }}
        >
          تواصل معنا
        </h1>
      </div>

      {/* Google Form iframe */}
      <div className="mx-auto max-w-3xl px-4 py-10">
        <p
          className="mb-6 text-center text-lg text-gray-600"
          style={{ fontFamily: thmanyahMedium }}
        >
          لديك مشكلة أو اقتراح؟ نسعد بتواصلك معنا
        </p>
        <div
          className="overflow-hidden rounded-2xl shadow-lg"
          style={{ backgroundColor: "#fff" }}
        >
          <iframe
            src={GOOGLE_FORM_URL}
            width="100%"
            height="700"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="نموذج التواصل"
            className="w-full"
            style={{ minHeight: "700px" }}
          >
            جاري تحميل النموذج...
          </iframe>
        </div>
      </div>
    </main>
  );
}
