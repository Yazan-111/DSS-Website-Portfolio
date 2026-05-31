import { useState, useEffect } from "react";

const thmanyahMedium = "'thmanyah serif display-Medium', 'Noto Naskh Arabic', 'Amiri', serif";
const thmanyahBold = "'thmanyah serif display-Bold', 'Noto Naskh Arabic', 'Amiri', serif";

// ✅ ضع هنا رابط Google Apps Script بعد النشر
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyfyI7wfy9sVrjQA-kEgH9GAaq7kAtorEmRa-TRLkvL8KOoC1h1p-dDDF-RPrl3zQi/exec";

type Priority = "أولوية قصوى" | "أولوية متوسطة" | "تحديثات";

interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  priority: Priority;
}

const priorityStyle: Record<Priority, { badge: string; border: string; bg: string }> = {
  "أولوية قصوى": {
    badge: "bg-red-900/40 text-red-400",
    border: "border-r-red-500",
    bg: "bg-[#2c1a1a]",
  },
  "أولوية متوسطة": {
    badge: "bg-yellow-900/40 text-yellow-400",
    border: "border-r-yellow-500",
    bg: "bg-[#2c2116]",
  },
  تحديثات: {
    badge: "bg-blue-900/40 text-blue-400",
    border: "border-r-blue-500",
    bg: "bg-[#1a2030]",
  },
};

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-[#5a4535] bg-[#2c2116] p-6 mb-4 animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="h-5 w-28 rounded-full bg-[#3b2a1a]" />
        <div className="h-4 w-20 rounded bg-[#3b2a1a]" />
      </div>
      <div className="h-6 w-2/3 rounded bg-[#3b2a1a] mb-3" />
      <div className="h-4 w-full rounded bg-[#3b2a1a] mb-2" />
      <div className="h-4 w-4/5 rounded bg-[#3b2a1a]" />
    </div>
  );
}

function AnnouncementCard({
  ann,
  onClick,
}: {
  ann: Announcement;
  onClick: () => void;
}) {
  const style = priorityStyle[ann.priority] ?? priorityStyle["تحديثات"];
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-[#5a4535] border-r-4 ${style.border} ${style.bg} p-6 mb-4 cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-xl`}
    >
      <div className="flex justify-between items-center mb-3">
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${style.badge}`}
        >
          {ann.priority}
        </span>
        <span className="text-xs text-[#9a8878]">{ann.date}</span>
      </div>
      <h2
        className="text-xl font-extrabold text-[#f0e6d8] mb-2"
        style={{ fontFamily: thmanyahBold }}
      >
        {ann.title}
      </h2>
      <p className="text-sm text-[#9a8878] leading-relaxed line-clamp-2">
        {ann.body}
      </p>
      <span className="inline-block mt-3 text-sm font-semibold text-[#c8a97e]">
        اقرأ المزيد &larr;
      </span>
    </div>
  );
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | Priority>("all");
  const [selected, setSelected] = useState<Announcement | null>(null);

  useEffect(() => {
    fetch(`${SCRIPT_URL}?action=get`)
      .then((r) => r.json())
      .then((data: Announcement[]) => {
        setAnnouncements(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filters: ("all" | Priority)[] = [
    "all",
    "أولوية قصوى",
    "أولوية متوسطة",
    "تحديثات",
  ];

  const filterLabel: Record<string, string> = {
    all: "الكل",
    "أولوية قصوى": "أولوية قصوى",
    "أولوية متوسطة": "أولوية متوسطة",
    تحديثات: "تحديثات",
  };

  const filtered =
    filter === "all"
      ? announcements
      : announcements.filter((a) => a.priority === filter);

  const today = filtered.filter((a) =>
    a.date.startsWith(new Date().toISOString().slice(0, 10))
  );
  const older = filtered.filter(
    (a) => !a.date.startsWith(new Date().toISOString().slice(0, 10))
  );

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
            الإعلانات
          </h1>
          <p className="mt-2 text-sm text-[#d4b896]">
            تابع آخر الأخبار والتحديثات الخاصة بنظام DSS
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 py-6 px-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
              filter === f
                ? "bg-[#c8a97e] border-[#c8a97e] text-[#1e1e1e]"
                : "bg-[#2c2116] border-[#5a4535] text-[#9a8878] hover:border-[#c8a97e] hover:text-[#c8a97e]"
            }`}
            style={{ fontFamily: thmanyahMedium }}
          >
            {filterLabel[f]}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mx-auto max-w-2xl px-4 pb-16">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📭</div>
            <h3
              className="text-xl font-bold text-[#f0e6d8] mb-2"
              style={{ fontFamily: thmanyahBold }}
            >
              لا توجد إعلانات حالياً
            </h3>
            <p className="text-sm text-[#9a8878]">
              أنت على علم بكل شيء! تحقق لاحقاً للاطلاع على أي تحديثات.
            </p>
          </div>
        ) : (
          <>
            {today.length > 0 && (
              <>
                <div
                  className="text-xs font-bold text-[#9a8878] uppercase tracking-widest mb-3 mt-2 pb-2 border-b border-[#5a4535]"
                >
                  اليوم
                </div>
                {today.map((a) => (
                  <AnnouncementCard
                    key={a.id}
                    ann={a}
                    onClick={() => setSelected(a)}
                  />
                ))}
              </>
            )}
            {older.length > 0 && (
              <>
                <div className="text-xs font-bold text-[#9a8878] uppercase tracking-widest mb-3 mt-6 pb-2 border-b border-[#5a4535]">
                  سابقاً
                </div>
                {older.map((a) => (
                  <AnnouncementCard
                    key={a.id}
                    ann={a}
                    onClick={() => setSelected(a)}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-[#5a4535] bg-[#2c2116] p-8 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#3b2a1a] text-[#f0e6d8] flex items-center justify-center text-lg"
            >
              ✕
            </button>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                priorityStyle[selected.priority]?.badge
              }`}
            >
              {selected.priority}
            </span>
            <h2
              className="text-2xl font-extrabold text-[#f0e6d8] mt-3 mb-1"
              style={{ fontFamily: thmanyahBold }}
            >
              {selected.title}
            </h2>
            <p className="text-xs text-[#9a8878] mb-5">{selected.date}</p>
            <div
              className="text-sm text-[#f0e6d8] leading-loose whitespace-pre-line"
              style={{ fontFamily: thmanyahMedium }}
            >
              {selected.body}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
