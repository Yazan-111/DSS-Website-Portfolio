import { Analytics } from "@vercel/analytics/react";

const personalWebsite = "https://my-personal-website-neon-five.vercel.app/";

export default function App() {
  return (
    <>
      <main className="relocation-page" lang="ar" dir="rtl">
        <section className="relocation-card" aria-labelledby="relocation-title">
          <span className="relocation-badge">عنوان جديد، أهلًا بك</span>
          <h1 id="relocation-title">انتقل موقعي إلى عنوان جديد</h1>
          <p className="relocation-description">
            يسعدني استقبال زيارتك في موقعي الشخصي الجديد، حيث تجد نبذة عني وأعمالي وطرق التواصل معي.
          </p>
          <a className="relocation-button" href={personalWebsite}>
            زيارة موقعي الشخصي
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 17 7 7M7 17V7h10" />
            </svg>
          </a>
          <p className="relocation-note">يمكنك حفظ الرابط الجديد للرجوع إليه لاحقًا</p>
          <a className="relocation-url" href={personalWebsite} dir="ltr">
            my-personal-website-neon-five.vercel.app
          </a>
        </section>
      </main>
      <Analytics />
    </>
  );
}
