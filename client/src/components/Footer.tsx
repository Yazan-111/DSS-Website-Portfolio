import { Link } from "wouter";

const thmanyahMedium =
  "'thmanyah serif display-Medium', 'Noto Naskh Arabic', 'Amiri', serif";
const thmanyahBold =
  "'thmanyah serif display-Bold', 'Noto Naskh Arabic', 'Amiri', serif";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/guide", label: "دليل استخدام البوت" },
  { href: "/contact", label: "تواصل معنا" },
];

export function Footer() {
  return (
    <footer
      dir="rtl"
      className="mt-0 w-full"
      style={{ backgroundColor: "#6e533a" }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-8">

        {/* Logo */}
        <Link href="/" data-testid="footer-link-logo">
          <span
            className="cursor-pointer select-none text-[1.6rem] leading-none transition-opacity hover:opacity-80"
            style={{ fontFamily: thmanyahBold, color: "#ffffff", fontWeight: 700 }}
          >
            DSS
          </span>
        </Link>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} data-testid={`footer-nav-${href.replace("/", "") || "home"}`}>
              <span
                className="cursor-pointer text-sm transition-opacity hover:opacity-70"
                style={{ fontFamily: thmanyahMedium, color: "rgba(255,255,255,0.8)" }}
              >
                {label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p
          className="text-sm"
          style={{ fontFamily: thmanyahMedium, color: "rgba(255,255,255,0.55)" }}
        >
          © {new Date().getFullYear()} DSS — جميع الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}
