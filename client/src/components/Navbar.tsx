import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const thmanyahMedium = "'thmanyah serif display-Medium', 'Noto Naskh Arabic', 'Amiri', serif";
const thmanyahBold = "'thmanyah serif display-Bold', 'Noto Naskh Arabic', 'Amiri', serif";

export function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/contact", label: "تواصل معنا" },
    { href: "/guide", label: "دليل البوت" },
    { href: "/", label: "الرئيسية" },
  ];

  return (
    <header dir="rtl" className="sticky top-0 z-50 w-full" style={{ backgroundColor: "#efefef" }}>
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
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" style={{ fontFamily: thmanyahMedium }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={
                  location === link.href
                    ? "cursor-pointer text-[#6e533a] font-semibold"
                    : "cursor-pointer text-gray-700 hover:text-[#6e533a] transition-colors"
                }
                style={{ fontSize: "1.1rem" }}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Navigation */}
      {open && (
        <div className="md:hidden bg-[#efefef] border-t border-gray-300" style={{ fontFamily: thmanyahMedium }}>
          <div className="flex flex-col px-4 py-3 space-y-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  onClick={() => setOpen(false)}
                  className={
                    location === link.href
                      ? "block py-2 text-[#6e533a] font-semibold"
                      : "block py-2 text-gray-700 hover:text-[#6e533a] transition-colors"
                  }
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
