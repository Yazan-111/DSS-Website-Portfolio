import { useState, useEffect } from "react";

const thmanyahMedium = "'thmanyah serif display-Medium', 'Noto Naskh Arabic', 'Amiri', serif";
const thmanyahBold = "'thmanyah serif display-Bold', 'Noto Naskh Arabic', 'Amiri', serif";

// رابط Google Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyfyI7wfy9sVrjQA-kEgH9GAaq7kAtorEmRa-TRLkvL8KOoC1h1p-dDDF-RPrl3zQi/exec";

type Priority = "أولوية قصوى" | "أولوية متوسطة" | "التحديثات";

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
    التحديثات: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-300",
    },
  };

  const style = priorityStyles[announcement.priority] || priorityStyles["التحديثات"];

  return (
    <div
      onClick={onClick}
      className="bg-[#C4A584] rounded-[32px] p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
      dir="rtl"
    >
      <div className="flex justify-between items-start mb-3">
        <span
          className="text-sm"
          style={{ fontFamily: thmanyahMedium }}
        >
          {announcement.date}
        </span>
        <span
          className={`px-4 py-1.5 rounded-full text-sm font-medium ${style.bg} ${style.text} border ${style.border}`}
          style={{ fontFamily: thmanyahMedium }}
        >
          {announcement.priority}
        </span>
      </div>

      <h3
        className="text-2xl font-bold mb-3 text-gray-900"
        style={{ fontFamily: thmanyahBold }}
      >
        {announcement.title}
      </h3>

      <p
        className="text-gray-700 line-clamp-2 leading-relaxed"
        style={{ fontFamily: thmanyahMedium }}
      >
        {announcement.body}
      </p>

      <div className="mt-4 flex justify-center">
        <button
          className="text-sm underline hover:no-underline"
          style={{ fontFamily: thmanyahMedium }}
        >
          إقرأ المزيد
        </button>
      </div>
    </div>
  );
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Priority | "الكل">("الكل");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(SCRIPT_URL);
      const result = await response.json();
      if (result.success) {
        setAnnouncements(result.data);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAnnouncements = filter === "الكل"
    ? announcements
    : announcements.filter((a) => a.priority === filter);

  const today = new Date().toISOString().split("T")[0];
  const todayAnnouncements = filteredAnnouncements.filter((a) => a.date === today);
  const olderAnnouncements = filteredAnnouncements.filter((a) => a.date !== today);

  return (
    <div className="min-h-screen bg-[#FFFDF9] py-8" dir="rtl">
      {/* العنوان الرئيسي */}
      <div className="bg-[#6B5344] rounded-[32px] py-8 mb-8 max-w-4xl mx-auto">
        <h1
          className="text-5xl font-bold text-center text-white"
          style={{ fontFamily: thmanyahBold }}
        >
          الإعلانات
        </h1>
      </div>

      {/* أزرار الفلترة */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap max-w-4xl mx-auto px-4">
        {(["الكل", "أولوية قصوى", "أولوية متوسطة", "التحديثات"] as const).map(
          (priority) => (
            <button
              key={priority}
              onClick={() => setFilter(priority)}
              className={`px-6 py-2.5 rounded-full transition-all duration-300 ${
                filter === priority
                  ? "bg-[#6B5344] text-white shadow-lg scale-105"
                  : "bg-[#C4A584] text-gray-800 hover:bg-[#B39474]"
              }`}
              style={{ fontFamily: thmanyahMedium }}
            >
              {priority === "الكل" ? "الفلترة" : priority}
            </button>
          )
        )}
      </div>

      {/* الإعلانات */}
      <div className="max-w-4xl mx-auto px-4">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredAnnouncements.length === 0 ? (
          <div className="text-center py-12">
            <p
              className="text-xl text-gray-600"
              style={{ fontFamily: thmanyahMedium }}
            >
              لا توجد إعلانات في الوقت الحالي
            </p>
          </div>
        ) : (
          <>
            {todayAnnouncements.length > 0 && (
              <div className="mb-8">
                <h2
                  className="text-2xl font-bold mb-4 text-gray-800"
                  style={{ fontFamily: thmanyahBold }}
                >
                  اليوم
                </h2>
                <div className="space-y-6">
                  {todayAnnouncements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.id}
                      announcement={announcement}
                      onClick={() => setSelectedAnnouncement(announcement)}
                    />
                  ))}
                </div>
              </div>
            )}

            {olderAnnouncements.length > 0 && (
              <div>
                <h2
                  className="text-2xl font-bold mb-4 text-gray-800"
                  style={{ fontFamily: thmanyahBold }}
                >
                  سابقاً
                </h2>
                <div className="space-y-6">
                  {olderAnnouncements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.id}
                      announcement={announcement}
                      onClick={() => setSelectedAnnouncement(announcement)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal للإعلان التفصيلي */}
      {selectedAnnouncement && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedAnnouncement(null)}
        >
          <div
            className="bg-[#C4A584] rounded-[32px] p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <div className="flex justify-between items-start mb-4">
              <span
                className="text-sm text-gray-700"
                style={{ fontFamily: thmanyahMedium }}
              >
                {selectedAnnouncement.date}
              </span>
              <span
                className="px-4 py-1.5 rounded-full text-sm font-medium"
                style={{ fontFamily: thmanyahMedium }}
              >
                {selectedAnnouncement.priority}
              </span>
            </div>

            <h2
              className="text-3xl font-bold mb-6 text-gray-900"
              style={{ fontFamily: thmanyahBold }}
            >
              {selectedAnnouncement.title}
            </h2>

            <div
              className="text-gray-800 leading-relaxed whitespace-pre-wrap mb-6"
              style={{ fontFamily: thmanyahMedium }}
            >
              {selectedAnnouncement.body}
            </div>

            <button
              onClick={() => setSelectedAnnouncement(null)}
              className="w-full bg-[#6B5344] text-white py-3 rounded-full hover:bg-[#5A4436] transition-colors"
              style={{ fontFamily: thmanyahBold }}
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
