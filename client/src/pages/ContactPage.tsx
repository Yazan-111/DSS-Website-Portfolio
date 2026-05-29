import { useState } from "react";

const thmanyahMedium =
  "'thmanyah serif display-Medium', 'Noto Naskh Arabic', 'Amiri', serif";
const thmanyahBold =
  "'thmanyah serif display-Bold', 'Noto Naskh Arabic', 'Amiri', serif";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzVlpVZGv_YhlFGRIkGL7w7p0MUup7LRkzJP-gLO7rC0bNJjDwEKgeb7xCgHzGUSleuTA/exec";

type FormState = { name: string; subject: string; details: string };

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", subject: "", details: "" });
  const [sent, setSent] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.subject.trim() || !form.details.trim()) return;
    setIsPending(true);
    setIsError(false);
    try {
const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          subject: form.subject,
          details: form.details,
        }),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error || "Unknown error");
      setSent(true);
      setForm({ name: "", subject: "", details: "" });
    } catch {
      setIsError(true);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen w-full"
      style={{ backgroundColor: "#efefef" }}
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-3 px-3 py-3 sm:px-4 sm:py-4 lg:gap-4 lg:px-5 lg:py-5">
        {/* ─── Heading ─── */}
        <div
          className="flex min-h-[180px] w-full items-center justify-center rounded-2xl px-6 py-10 text-center sm:min-h-[220px] sm:rounded-[22px] sm:px-10"
          style={{ backgroundColor: "#6e533a" }}
        >
          <h1
            className="text-white"
            style={{
              fontFamily: thmanyahMedium,
              fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            تواصل معنا
          </h1>
        </div>

        {/* ─── Form card ─── */}
        <div
          className="mx-auto w-full max-w-[720px] rounded-2xl px-6 py-8 sm:rounded-[22px] sm:px-10 sm:py-10"
          style={{ backgroundColor: "rgba(110,83,58,0.07)" }}
        >
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <p
                style={{
                  fontFamily: thmanyahBold,
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  color: "#3a2e24",
                }}
              >
                شكراً لتواصلك معنا 🎉
              </p>
              <p style={{ fontFamily: thmanyahMedium, color: "#6e533a" }}>
                تم حفظ رسالتك بنجاح، سنرد عليك في أقرب وقت.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-2 rounded-full px-6 py-2 transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: "#6e533a",
                  color: "#fff",
                  fontFamily: thmanyahMedium,
                  fontSize: "1rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-[680px] flex-col gap-5">
              <p
                style={{
                  fontFamily: thmanyahMedium,
                  fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
                  color: "#6e533a",
                  textAlign: "center",
                  marginBottom: "0.5rem",
                }}
              >
                لديك مشكلة أو اقتراح؟ نسعد بتواصلك معنا
              </p>

              <Field label="الاسم الكريم">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="أدخل اسمك"
                  data-testid="input-name"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#6e533a")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(110,83,58,0.25)")}
                />
              </Field>

              <Field label="عنوان المشكلة / الاقتراح">
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="اكتب عنواناً مختصراً"
                  data-testid="input-subject"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#6e533a")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(110,83,58,0.25)")}
                />
              </Field>

              <Field label="التفاصيل">
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  required
                  placeholder="اشرح مشكلتك أو اقتراحك بالتفصيل..."
                  rows={5}
                  data-testid="input-details"
                  style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                  onFocus={(e) => (e.target.style.borderColor = "#6e533a")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(110,83,58,0.25)")}
                />
              </Field>

              {isError && (
                <p
                  style={{
                    fontFamily: thmanyahMedium,
                    fontSize: "0.95rem",
                    color: "#c0392b",
                  }}
                >
                  حدث خطأ أثناء الإرسال، حاول مجدداً.
                </p>
              )}

              <button
                type="submit"
                disabled={isPending}
                data-testid="button-submit"
                className="mt-1 w-full rounded-2xl py-4 text-center transition-opacity hover:opacity-85 active:opacity-70 disabled:opacity-60"
                style={{
                  backgroundColor: "#6e533a",
                  color: "#ffffff",
                  fontFamily: thmanyahBold,
                  fontSize: "clamp(1.2rem, 2.4vw, 1.6rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  border: "none",
                  cursor: isPending ? "wait" : "pointer",
                }}
              >
                {isPending ? "جارنِ الإرسال..." : "إرسال"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        style={{
          fontFamily: thmanyahMedium,
          fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
          fontWeight: 500,
          color: "#3a2e24",
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#faf7f4",
  border: "1.5px solid rgba(110,83,58,0.25)",
  borderRadius: "14px",
  padding: "14px 16px",
  fontFamily: thmanyahMedium,
  fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
  color: "#3a2e24",
  outline: "none",
  transition: "border-color 0.18s ease",
  direction: "rtl",
};
