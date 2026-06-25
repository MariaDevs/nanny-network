"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/nannies", label: "Nannies" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav style={{ background: "white", boxShadow: "0 1px 8px rgba(0,0,0,0.06)", position: "sticky", top: 0, zIndex: 50 }}>
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "4.5rem" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #4a90d9, #7bc67e)" }}>
              <Heart size={20} fill="white" color="white" />
            </div>
            <div>
              <span style={{ fontWeight: 700, fontSize: "1.25rem", color: "#1a1a2e" }}>Nanny</span>
              <span style={{ fontWeight: 700, fontSize: "1.25rem", color: "#4a90d9" }}> Network</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop-links" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {links.map(l => (
              <Link key={l.href} href={l.href}
                style={{ color: "#4b5563", fontWeight: 500, fontSize: "0.875rem", textDecoration: "none" }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="nav-desktop-links" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link href="/nanny-login" style={{ color: "#4a90d9", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none" }}>
              Nanny Login
            </Link>
            <Link href="/register" className="btn-primary" style={{ fontSize: "0.875rem", padding: "0.5rem 1.25rem" }}>
              Register as Nanny
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="nav-mobile-toggle" style={{ padding: "0.5rem", background: "none", border: "none", cursor: "pointer" }}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "white", borderTop: "1px solid #f3f4f6", padding: "1rem 0" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                style={{ color: "#374151", fontWeight: 500, padding: "0.5rem 0", borderBottom: "1px solid #f3f4f6", textDecoration: "none" }}>
                {l.label}
              </Link>
            ))}
            <Link href="/nanny-login" onClick={() => setOpen(false)}
              style={{ color: "#4a90d9", fontWeight: 600, padding: "0.5rem 0", textDecoration: "none" }}>
              Nanny Login
            </Link>
            <Link href="/register" onClick={() => setOpen(false)} className="btn-primary" style={{ textAlign: "center" }}>
              Register as Nanny
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
