import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const thmanyahMedium = "'thmanyah serif display-Medium', 'Tajawal', 'Noto Naskh Arabic', 'Amiri', serif";
const thmanyahBold = "'thmanyah serif display-Bold', 'Tajawal', 'Noto Naskh Arabic', 'Amiri', serif";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyfyI7wfy9sVrjQA-kEgH9GAaq7kAtorEmRa-TRLkvL8KOoC1h1p-dDDF-RPrl3zQi/exec";

export default function ContactPage() {
  const [name, setName] = useState("");
    const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"" | "success" | "error">("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setStatus("error");
      return;
    }
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch(`${SCRIPT_URL}?action=addContact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    fontFamily: thmanyahMedium,
    backgroundColor: "#fff",
    border: "1.5px solid #C4A584",
    borderRadius: "12px",
    padding: "12px 16px",
    width: "100%",
    outline: "none",
    fontSize: "1rem",
    color: "#1e1e1e",
    transition: "border-color 0.2s",
  };

  return (
    <main dir="rtl" className="min-h-screen" style={{ backgroundColor: "#efefef" }}>
      {/* Hero */}
      <div
        className="flex min-h-[180px] w-full items-center justify-center rounded-2xl px-6 py-10 text-center sm:min-h-[220px] sm:rounded-[22px] sm:px-10"
        style={{ backgroundColor: "#6e533a" }}
      >
        <h1 className="text-4xl text-white sm:text-5xl lg:text-6xl" style={{ fontFamily: thmanyahBold }}>
          تواصل معنا
        </h1>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-xl px-4 py-10">
        <p className="mb-8 text-center text-lg text-gray-600" style={{ fontFamily: thmanyahMedium }}>
          لديك مشكلة أو اقتراح؟ تواصل معنا وسنرد عليك فور ممكن
        </p>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div>
            <label className="block mb-1 text-sm text-[#5a3e28]" style={{ fontFamily: thmanyahMedium }}>
              الاسم *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اكتب اسمك هنا"
              style={inputStyle}
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-[#5a3e28]" style={{ fontFamily: thmanyahMedium }}>
              البريد الإلكتروني (اختياري)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              style={{ ...inputStyle, direction: "ltr" }}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-[#5a3e28]" style={{ fontFamily: thmanyahMedium }}>
              الرسالة *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              rows={5}
              style={{ ...inputStyle, resize: "vertical" }}
              required
            />
          </div>

          {status === "success" && (
            <div
              className="text-center p-4 rounded-2xl"
              style={{ backgroundColor: "#d4edda", color: "#155724", fontFamily: thmanyahMedium }}
            >
            ✅ {t('contact.success')}            </div>
          )}

          {status === "error" && (
            <div
              className="text-center p-4 rounded-2xl"
              style={{ backgroundColor: "#f8d7da", color: "#721c24", fontFamily: thmanyahMedium }}
            >
            ❌ {t('contact.error')}            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl text-white text-lg transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#6e533a", fontFamily: thmanyahBold }}
          >
          {loading ? t('contact.sending') : t('contact.submit')}          </button>
        </form>
      </div>
    </main>
  );
}
