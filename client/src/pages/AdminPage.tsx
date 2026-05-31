import { useState } from "react";

const thmanyahMedium = "'thmanyah serif display-Medium', 'Noto Naskh Arabic', 'Amiri', serif";
const thmanyahBold = "'thmanyah serif display-Bold', 'Noto Naskh Arabic', 'Amiri', serif";

// ✅ ضع هنا رابط Google Apps Script بعد النشر
const SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

type Priority = "أولوية قصوى" | "أولوية متوسطة" | "تحديثات";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState<Priority>("تحديثات");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setMessage("⚠️ الرجاء ملء جميع الحقول");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const now = new Date().toLocaleString("ar-SA", {
        dateStyle: "short",
        timeStyle: "short",
      });

      const res = await fetch(`${SCRIPT_URL}?action=add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, priority, date: now }),
      });

      if (res.ok) {
        setMessage("✅ تم نشر الإعلان بنجاح");
        setTitle("");
        setBody("");
        setPriority("تحديثات");
      } else {
        setMessage("❌ حدث خطأ في النشر");
      }
    } catch (err) {
      setMessage("❌ حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main dir="rtl" className="min-h-screen" style={{ backgroundColor: "#1e1e1e" }}>
      {/* Hero */}
      <div
        className="flex min-h-[160px] w-full items-center justify-center px-6 py-10 text-center"
        style={{ backgroundColor: "#6e533a" }}
      >
        <div>
          <h1
            className="text-4xl text-white sm:text-5xl"
            style={{ fontFamily: thmanyahBold }}
          >
            لوحة الإدارة
          </h1>
          <p className="mt-2 text-sm text-[#d4b896]">
            إضافة إعلان جديد إلى الصفحة الرئيسية
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="mx-auto max-w-2xl px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#5a4535] bg-[#2c2116] p-8"
        >
          {/* Title */}
          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-semibold text-[#f0e6d8]"
              style={{ fontFamily: thmanyahMedium }}
            >
              عنوان الإعلان
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#1e1e1e] border border-[#5a4535] text-[#f0e6d8] focus:outline-none focus:border-[#c8a97e] transition-colors"
              style={{ fontFamily: thmanyahMedium }}
              placeholder="مثال: عطلة يوم الأحد"
            />
          </div>

          {/* Body */}
          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-semibold text-[#f0e6d8]"
              style={{ fontFamily: thmanyahMedium }}
            >
              نص الإعلان
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-[#1e1e1e] border border-[#5a4535] text-[#f0e6d8] focus:outline-none focus:border-[#c8a97e] transition-colors resize-none"
              style={{ fontFamily: thmanyahMedium }}
              placeholder="اكتب تفاصيل الإعلان هنا..."
            />
          </div>

          {/* Priority */}
          <div className="mb-6">
            <label
              className="block mb-3 text-sm font-semibold text-[#f0e6d8]"
              style={{ fontFamily: thmanyahMedium }}
            >
              الأولوية
            </label>
            <div className="flex flex-wrap gap-3">
              {(["أولوية قصوى", "أولوية متوسطة", "تحديثات"] as Priority[]).map(
                (p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                      priority === p
                        ? "bg-[#c8a97e] border-[#c8a97e] text-[#1e1e1e]"
                        : "bg-transparent border-[#5a4535] text-[#9a8878] hover:border-[#c8a97e] hover:text-[#c8a97e]"
                    }`}
                    style={{ fontFamily: thmanyahMedium }}
                  >
                    {p}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-[#1e1e1e] font-bold transition-all disabled:opacity-50"
            style={{
              fontFamily: thmanyahBold,
              background: loading ? "#9a8878" : "#c8a97e",
            }}
          >
            {loading ? "جاري النشر..." : "نشر الإعلان"}
          </button>

          {/* Message */}
          {message && (
            <div
              className={`mt-4 p-3 rounded-lg text-sm font-semibold text-center ${
                message.startsWith("✅")
                  ? "bg-green-900/30 text-green-400"
                  : "bg-red-900/30 text-red-400"
              }`}
              style={{ fontFamily: thmanyahMedium }}
            >
              {message}
            </div>
          )}
        </form>

        {/* Instructions */}
        <div className="mt-8 rounded-2xl border border-[#5a4535] bg-[#2c2116] p-6">
          <h3
            className="text-lg font-bold text-[#c8a97e] mb-3"
            style={{ fontFamily: thmanyahBold }}
          >
            💡 تعليمات
          </h3>
          <ul
            className="text-sm text-[#9a8878] space-y-2 leading-relaxed"
            style={{ fontFamily: thmanyahMedium }}
          >
            <li>• تأكد من ملء جميع الحقول قبل النشر</li>
            <li>• سيتم إضافة التاريخ والوقت تلقائياً</li>
            <li>• يمكنك مشاهدة الإعلان في <a href="/DSS-Website-Portfolio/announcements" className="text-[#c8a97e] underline">صفحة الإعلانات</a></li>
            <li>• لتفعيل النظام، اتبع التعليمات في <code className="px-2 py-1 bg-[#1e1e1e] rounded text-[#c8a97e]">scripts/apps-script.js</code></li>
          </ul>
        </div>
      </div>
    </main>
  );
}
