import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const thmanyahMedium =
  "'thmanyah serif display-Medium', 'Noto Naskh Arabic', 'Amiri', serif";
const thmanyahBold =
  "'thmanyah serif display-Bold', 'Noto Naskh Arabic', 'Amiri', serif";

const navLinks = [
  { href: "/contact", label: "تواصل معنا" },
  { href: "/guide", label: "دليل استخدام البوت" },
  { href: "/", label: "الرئيسية" },
];

export function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 w-full"
      style={{ backgroundColor: "#efefef" }}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-5 lg:px-6">

        {/* Logo */}
        <Link href="/" data-testid="link-logo">
          <span
            className="cursor-pointer select-none text-[1.75rem] leading-none transition-opacity hover:opacity-80"
            style={{ fontFamily: thmanyahBold, color: "#6e533a", fontWeight: 700 }}
          >
            DSS
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ href, label }) => {
            const active = location === href;
            return (
              <Link key={href} href={href} data-testid={`nav-${href.replace("/", "") || "home"}`}>
                <span
                  className="cursor-pointer rounded-full px-4 py-2 text-[0.95rem] transition-all hover:opacity-80"
                  style={{
                    fontFamily: thmanyahMedium,
                    fontWeight: 500,
                    backgroundColor: active ? "#6e533a" : "transparent",
                    color: active ? "#ffffff" : "#3a2e24",
                    border: active ? "none" : "1px solid transparent",
                  }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-black/10 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="toggle menu"
          data-testid="button-mobile-menu"
        >
          {open ? (
            <X size={22} color="#3a2e24" />
          ) : (
            <Menu size={22} color="#3a2e24" />
          )}
        </button>
      </div>

      {/* Hairline */}
      <div className="h-px w-full" style={{ backgroundColor: "rgba(110,83,58,0.15)" }} />

      {/* Mobile drawer */}
      {open && (
        <div
          className="flex flex-col gap-1 px-4 py-3 md:hidden"
          style={{ backgroundColor: "#efefef" }}
        >
          {navLinks.map(({ href, label }) => {
            const active = location === href;
            return (
              <Link key={href} href={href}>
                <span
                  className="block cursor-pointer rounded-xl px-4 py-3 text-[1rem] transition-colors"
                  style={{
                    fontFamily: thmanyahMedium,
                    fontWeight: 500,
                    backgroundColor: active ? "#6e533a" : "transparent",
                    color: active ? "#ffffff" : "#3a2e24",
                  }}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
