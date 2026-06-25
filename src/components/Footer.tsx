import Link from "next/link";
import { Heart, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#1a1a2e", color: "#e5e7eb" }}>
      <div className="wrap" style={{ paddingTop: "3.5rem", paddingBottom: "3.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))", gap: "2rem" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#4a90d9,#7bc67e)" }}>
                <Heart size={16} fill="white" color="white" />
              </div>
              <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "white" }}>Nanny Network</span>
            </div>
            <p style={{ color: "#9ca3af", fontSize: "0.875rem", lineHeight: 1.6 }}>
              South Africa&apos;s trusted platform connecting families with experienced, caring nannies.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 style={{ fontWeight: 700, color: "white", marginBottom: "1rem" }}>Quick Links</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem" }}>
              {[
                ["Home", "/"], ["About Us", "/about"], ["Find a Nanny", "/nannies"],
                ["Services", "/services"], ["Contact", "/contact"],
              ].map(([label, href]) => (
                <Link key={href} href={href} style={{ color: "#9ca3af", textDecoration: "none" }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ fontWeight: 700, color: "white", marginBottom: "1rem" }}>Our Services</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem", color: "#9ca3af" }}>
              <span>Full-Time Nannies</span>
              <span>Part-Time Nannies</span>
              <span>Live-In Nannies</span>
              <span>Au Pair Services</span>
              <span>Newborn Care</span>
              <span>Emergency Childcare</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontWeight: 700, color: "white", marginBottom: "1rem" }}>Contact Us</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.875rem" }}>
              <a href="tel:0810259931" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#9ca3af", textDecoration: "none" }}>
                <Phone size={16} /> 081 025 9931
              </a>
              <a href="https://wa.me/270810259931" target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#9ca3af", textDecoration: "none" }}>
                <MessageCircle size={16} /> WhatsApp Us
              </a>
              <a href="mailto:info@nannynetwork.co.za"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#9ca3af", textDecoration: "none" }}>
                <Mail size={16} /> info@nannynetwork.co.za
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#9ca3af" }}>
                <MapPin size={16} /> South Africa
              </div>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <Link href="/register"
                style={{ display: "inline-block", fontSize: "0.875rem", fontWeight: 600, padding: "0.5rem 1rem", borderRadius: "9999px", background: "#4a90d9", color: "white", textDecoration: "none" }}>
                Register as Nanny
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #374151", padding: "1.25rem 0", textAlign: "center", fontSize: "0.875rem", color: "#6b7280" }}>
        © {new Date().getFullYear()} Nanny Network. All rights reserved. | South Africa
      </div>
    </footer>
  );
}
