import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const thmanyahMedium = "'thmanyah serif display-Medium', 'Tajawal', 'Noto Naskh Arabic', 'Amiri', serif";
const thmanyahBold = "'thmanyah serif display-Bold', 'Tajawal', 'Noto Naskh Arabic', 'Amiri', serif";
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyfyI7wfy9sVrjQA-kEgH9GAaq7kAtorEmRa-TRLkvL8KOoC1h1p-dDDF-RPrl3zQi/exec";
const ADMIN_PASSWORD = "DSS2026";
const VERIFICATION_CODE = "42"; // رمز التحقق الثنائي

type Priority = "أولوية قصوى" | "أولوية متوسطة" | "تحديثات";

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

export default function AdminPage() {
    const { t } = useLanguage();
  const [authenticated, setAuthenticated] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"announcements" | "contacts">("announcements");

  // Announcements state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState<Priority>("تحديثات");
  const [announcementMsg, setAnnouncementMsg] = useState("");
  const [announcementLoading, setAnnouncementLoading] = useState(false);

  // Contacts state
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [contactsError, setContactsError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD && verificationCode === VERIFICATION_CODE) {      setAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
    } else {
      alert("❌ كلمة مرور خاطئة");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("adminAuth");
  };

  const fetchContacts = async () => {
    setContactsLoading(true);
    setContactsError("");
    try {
      const res = await fetch(`${SCRIPT_URL}?action=getContacts`);
      const result = await res.json();
      if (result.success) {
        setContacts(result.data);
      } else {
        setContactsError("تعذر تحميل الرسائل");
      }
    } catch {
      setContactsError("تعذر الاتصال بالخادم");
    } finally {
      setContactsLoading(false);
    }
  };

  const handleAnnouncementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setAnnouncementMsg("❌ الرجاء ملء جميع الحقول");
      return;
    }
    setAnnouncementLoading(true);
    setAnnouncementMsg("");
    try {
      const now = new Date().toLocaleString("ar-SA", { dateStyle: "short", timeStyle: "short" });
      const res = await fetch(`${SCRIPT_URL}?action=add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, priority, date: now }),
      });
      if (res.ok) {
        setAnnouncementMsg("✅ تم نشر الإعلان بنجاح");
        setTitle("");
        setBody("");
        setPriority("تحديثات");
      } else {
        setAnnouncementMsg("❌ حدث خطأ في النشر");
      }
    } catch {
      setAnnouncementMsg("❌ حدث خطأ في الاتصال");
    } finally {
      setAnnouncementLoading(false);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") setAuthenticated(true);
  }, []);

  useEffect(() => {
    if (authenticated && activeTab === "contacts") {
      fetchContacts();
    }
  }, [authenticated, activeTab]);

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
  };

  if (!authenticated) {
    return (
      <main dir="rtl" className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#efefef" }}>
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-[32px] shadow-lg max-w-sm w-full">
          <h1 className="text-3xl text-center mb-6" style={{ fontFamily: thmanyahBold, color: "#6e533a" }}>
            🔒 تسجيل دخول المشرف
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="أدخل كلمة المرور"
            style={inputStyle}
            required
          />
          <button
            type="submit"
            className="w-full mt-5 py-3 rounded-2xl text-white text-lg"
            style={{ backgroundColor: "#6e533a", fontFamily: thmanyahBold }}
          >
            دخول
          </button>
        </form>
      </main>
    );
  }

  return (
    <main dir="rtl" className="min-h-screen" style={{ backgroundColor: "#efefef" }}>
      {/* Header */}
      <div className="bg-[#6e533a] px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl text-white" style={{ fontFamily: thmanyahBold }}>🛠️ لوحة التحكم</h1>
        <button
          onClick={handleLogout}
          className="text-white px-4 py-2 rounded-lg"
          style={{ backgroundColor: "#5a3e28", fontFamily: thmanyahMedium }}
        >
          🚪 تسجيل خروج
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-4">
        <button
          onClick={() => setActiveTab("announcements")}
          className={`px-6 py-2 rounded-xl transition-colors ${
            activeTab === "announcements" ? "bg-[#6e533a] text-white" : "bg-white text-[#6e533a]"
          }`}
          style={{ fontFamily: thmanyahMedium }}
        >
          📢 نشر إعلان
        </button>
        <button
          onClick={() => setActiveTab("contacts")}
          className={`px-6 py-2 rounded-xl transition-colors ${
            activeTab === "contacts" ? "bg-[#6e533a] text-white" : "bg-white text-[#6e533a]"
          }`}
          style={{ fontFamily: thmanyahMedium }}
        >
          📬 الرسائل الواردة ({contacts.length})
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-10">
        {activeTab === "announcements" ? (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-[32px] shadow">
            <h2 className="text-2xl mb-6" style={{ fontFamily: thmanyahBold, color: "#6e533a" }}>
              ✨ نشر إعلان جديد
            </h2>
            <form onSubmit={handleAnnouncementSubmit} className="grid gap-5">
              <div>
                <label className="block mb-1 text-sm text-[#5a3e28]" style={{ fontFamily: thmanyahMedium }}>
                  عنوان الإعلان
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: اختبار اليوم في الرياضيات"
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-[#5a3e28]" style={{ fontFamily: thmanyahMedium }}>
                  محتوى الإعلان
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="اكتب تفاصيل الإعلان هنا..."
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm text-[#5a3e28]" style={{ fontFamily: thmanyahMedium }}>
                  الأولوية
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  style={inputStyle}
                >
                  <option value="تحديثات">تحديثات</option>
                  <option value="أولوية متوسطة">أولوية متوسطة</option>
                  <option value="أولوية قصوى">أولوية قصوى</option>
                </select>
              </div>
              {announcementMsg && (
                <div
                  className="text-center p-3 rounded-xl"
                  style={{
                    backgroundColor: announcementMsg.includes("✅") ? "#d4edda" : "#f8d7da",
                    color: announcementMsg.includes("✅") ? "#155724" : "#721c24",
                    fontFamily: thmanyahMedium,
                  }}
                >
                  {announcementMsg}
                </div>
              )}
              <button
                type="submit"
                disabled={announcementLoading}
                className="py-3 rounded-xl text-white text-lg disabled:opacity-50"
                style={{ backgroundColor: "#6e533a", fontFamily: thmanyahBold }}
              >
                {announcementLoading ? "جاري النشر..." : "🚀 نشر الإعلان"}
              </button>
            </form>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl mb-6" style={{ fontFamily: thmanyahBold, color: "#6e533a" }}>
              📬 الرسائل الواردة
            </h2>
            {contactsLoading ? (
              <div className="text-center py-10" style={{ fontFamily: thmanyahMedium }}>
                ⏳ جاري التحميل...
              </div>
            ) : contactsError ? (
              <div className="text-center py-10 text-red-500" style={{ fontFamily: thmanyahMedium }}>
                {contactsError}
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-10 text-gray-500" style={{ fontFamily: thmanyahMedium }}>
                🛑 لا توجد رسائل حالياً
              </div>
            ) : (
              <div className="grid gap-4">
                {contacts.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white p-6 rounded-[24px] shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-lg font-bold text-[#1e1e1e]" style={{ fontFamily: thmanyahBold }}>
                          {c.name}
                        </p>
                        {c.email && (
                          <p className="text-sm text-gray-600" style={{ fontFamily: thmanyahMedium, direction: "ltr" }}>
                            {c.email}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-gray-500" style={{ fontFamily: thmanyahMedium }}>
                        {c.date}
                      </span>
                    </div>
                    <p className="text-[#3a2a1a] leading-relaxed" style={{ fontFamily: thmanyahMedium }}>
                      {c.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
