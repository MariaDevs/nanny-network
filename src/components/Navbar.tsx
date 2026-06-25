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
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #4a90d9, #7bc67e)" }}>
              <Heart size={20} fill="white" color="white" />
            </div>
            <div>
              <span className="font-bold text-xl" style={{ color: "#1a1a2e" }}>Nanny</span>
              <span className="font-bold text-xl" style={{ color: "#4a90d9" }}> Network</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className="text-gray-600 hover:text-blue-500 font-medium transition-colors text-sm">
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/nanny-login" className="text-blue-500 font-semibold text-sm hover:text-blue-700">
              Nanny Login
            </Link>
            <Link href="/register" className="btn-primary text-sm py-2 px-5">
              Register as Nanny
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-gray-700 font-medium py-2 border-b border-gray-100">
              {l.label}
            </Link>
          ))}
          <Link href="/nanny-login" onClick={() => setOpen(false)}
            className="text-blue-500 font-semibold py-2">
            Nanny Login
          </Link>
          <Link href="/register" onClick={() => setOpen(false)}
            className="btn-primary text-center">
            Register as Nanny
          </Link>
        </div>
      )}
    </nav>
  );
}
