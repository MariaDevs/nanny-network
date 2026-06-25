"use client";
import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Send } from "lucide-react";

const services = [
  "Full-Time Nanny", "Part-Time Nanny", "Live-In Nanny", "Live-Out Nanny",
  "Weekend Nanny", "Babysitting", "Au Pair", "Newborn Care",
  "Domestic Helper with Childcare", "Emergency Childcare",
];

export default function ContactPage() {
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", city: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setLoading(false);
    if (res.ok) setSent(true);
  }

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "5rem 0", textAlign: "center", background: "linear-gradient(135deg, #e8f4fd, #fef0f5)" }}>
        <div className="wrap">
          <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Contact Nanny Network</h1>
          <p style={{ color: "#4b5563", fontSize: "1.1rem" }}>We are here to help. Reach out to us and we will connect you with the right nanny for your family.</p>
        </div>
      </section>

      <section style={{ padding: "4rem 0" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(380px, 100%), 1fr))", gap: "3rem" }}>
            {/* Contact info */}
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem", color: "#1a1a2e" }}>Get In Touch</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2rem" }}>
                <a href="tel:0810259931" className="card" style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem", textDecoration: "none", color: "inherit" }}>
                  <div style={{ width: "3rem", height: "3rem", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "#e8f4fd" }}>
                    <Phone size={22} style={{ color: "#4a90d9" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700 }}>Call Us</div>
                    <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>081 025 9931</div>
                  </div>
                </a>
                <a href="https://wa.me/270810259931" target="_blank" rel="noopener noreferrer"
                  className="card" style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem", textDecoration: "none", color: "inherit" }}>
                  <div style={{ width: "3rem", height: "3rem", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "#e8fdf0" }}>
                    <MessageCircle size={22} style={{ color: "#25d366" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700 }}>WhatsApp Us</div>
                    <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>Click to start a chat on WhatsApp</div>
                  </div>
                </a>
                <div className="card" style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem" }}>
                  <div style={{ width: "3rem", height: "3rem", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "#fef0f5" }}>
                    <Mail size={22} style={{ color: "#f8b4c8" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700 }}>Email Us</div>
                    <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>info@nannynetwork.co.za</div>
                  </div>
                </div>
                <div className="card" style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem" }}>
                  <div style={{ width: "3rem", height: "3rem", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "#f0faf0" }}>
                    <MapPin size={22} style={{ color: "#7bc67e" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700 }}>Location</div>
                    <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>Serving all 9 provinces of South Africa</div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: "1.5rem", background: "#e8f4fd" }}>
                <h3 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Quick WhatsApp Chat</h3>
                <p style={{ color: "#4b5563", fontSize: "0.875rem", marginBottom: "1rem" }}>Need a nanny urgently? Message us on WhatsApp for a quick response.</p>
                <a href="https://wa.me/270810259931?text=Hi%20Nanny%20Network%2C%20I%20am%20looking%20for%20a%20nanny."
                  target="_blank" rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <MessageCircle size={18} /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div className="card" style={{ padding: "2rem" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "2.5rem 0" }}>
                  <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>✅</div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Message Sent!</h3>
                  <p style={{ color: "#6b7280" }}>Thank you for contacting Nanny Network. We will get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Send Us a Message</h2>
                  <div>
                    <label>Full Name *</label>
                    <input required value={form.fullName} onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))} placeholder="Your full name" />
                  </div>
                  <div>
                    <label>Phone Number *</label>
                    <input required value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="Your phone number" />
                  </div>
                  <div>
                    <label>Email Address *</label>
                    <input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="Your email address" />
                  </div>
                  <div>
                    <label>City *</label>
                    <input required value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} placeholder="Your city" />
                  </div>
                  <div>
                    <label>Service Needed *</label>
                    <select required value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))}>
                      <option value="">Select a service...</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label>Message *</label>
                    <textarea required rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Tell us about your childcare needs..." />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                    <Send size={18} /> {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
