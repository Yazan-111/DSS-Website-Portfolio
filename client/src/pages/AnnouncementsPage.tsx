import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const thmanyahMedium = "'thmanyah serif display-Medium', 'Tajawal', 'Noto Naskh Arabic', 'Amiri', serif";
const thmanyahBold = "'thmanyah serif display-Bold', 'Tajawal', 'Noto Naskh Arabic', 'Amiri', serif";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwhuiFyQlCBIAJYQjmWIypMxGTExw2l49xf_K-VX9M5dGP7EjPJerC-MiYW3JIWVDXMIA/exec";
type Priority = "أولوية قصوى" | "أولوية متوسطة" | "تحديثات";

interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  priority: Priority;
}

const SkeletonCard = () => (
  <div className="bg-[#C4A584] rounded-[32px] p-6 animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div className="h-6 bg-[#A08060] rounded w-24"></div>
      <div className="h-8 bg-[#A08060] rounded-full w-32"></div>
    </div>
    <div className="h-8 bg-[#A08060] rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-[#A08060] rounded w-full mb-2"></div>
    <div className="h-4 bg-[#A08060] rounded w-5/6"></div>
  </div>
);

const AnnouncementCard = ({
  announcement,
  onClick,
}: {
  announcement: Announcement;
  onClick: () => void;
}) => {
  const priorityStyles: Record<Priority, { bg: string; text: string; border: string }> = {
    "أولوية قصوى": {
      bg: "bg-red-100",
      text: "text-red-600",
      border: "border-red-300",
    },
    "أولوية متوسطة": {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      border: "border-yellow-300",
    },
    "تحديثات": {
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-300",
    },
  };

  const style = priorityStyles[announcement.priority] || priorityStyles["تحديثات"];

  return (
    <div
      className="bg-[#C4A584] rounded-[32px] p-6 cursor-pointer hover:scale-[1.02] transition-transform"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-sm text-[#5a3e28]" style={{ fontFamily: thmanyahMedium }}>
          {announcement.date}
        </span>
        <span
          className={`text-xs px-3 py-1 rounded-full border ${style.bg} ${style.text} ${style.border}`}
          style={{ fontFamily: thmanyahMedium }}
        >
          {announcement.priority}
        </span>
      </div>
      <h2
        className="text-xl font-bold text-[#1e1e1e] mb-2"
        style={{ fontFamily: thmanyahBold }}
      >
        {announcement.title}
      </h2>
      <p className="text-[#3a2a1a] text-sm line-clamp-3" style={{ fontFamily: thmanyahMedium }}>
        {announcement.body}
      </p>
    </div>
  );
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Announcement | null>(null);
    const { t } = useLanguage();

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(`${SCRIPT_URL}?action=getAnnouncements`), {
        redirect: "follow"
      })
      const result = await response.json();
      if (result.success) {
        setAnnouncements(result.data);
      } else {
        setError("تعذر تحميل الإعلانات");
      }
    } catch {
      setError("تعذر الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <main dir="rtl" className="min-h-screen" style={{ backgroundColor: "#efefef" }}>
      {/* Hero */}
      <div
        className="flex min-h-[180px] w-full items-center justify-center rounded-2xl px-6 py-10 text-center sm:min-h-[220px] sm:rounded-[22px] sm:px-10"
        style={{ backgroundColor: "#6e533a" }}
      >
        <h1
          className="text-4xl text-white sm:text-5xl lg:text-6xl"
          style={{ fontFamily: thmanyahBold }}
        >
          الإعلانات
        </h1>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-10">
        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-500 text-lg" style={{ fontFamily: thmanyahMedium }}>
              {error}
            </p>
            <button
              onClick={fetchAnnouncements}
              className="mt-4 px-6 py-2 rounded-full text-white"
              style={{ backgroundColor: "#6e533a", fontFamily: thmanyahMedium }}
            >
              إعادة المحاولة
            </button>
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg" style={{ fontFamily: thmanyahMedium }}>
              لا توجد إعلانات حالياً
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {announcements.map((a) => (
              <AnnouncementCard key={a.id} announcement={a} onClick={() => setSelected(a)} />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-[#C4A584] rounded-[32px] p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-[#5a3e28]" style={{ fontFamily: thmanyahMedium }}>
                {selected.date}
              </span>
              <button
                onClick={() => setSelected(null)}
                className="text-[#5a3e28] hover:text-[#1e1e1e] text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <h2
              className="text-2xl font-bold text-[#1e1e1e] mb-4"
              style={{ fontFamily: thmanyahBold }}
            >
              {selected.title}
            </h2>
            <p className="text-[#3a2a1a] leading-relaxed" style={{ fontFamily: thmanyahMedium }}>
              {selected.body}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
