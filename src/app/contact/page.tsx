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
      <section className="py-20 text-center" style={{ background: "linear-gradient(135deg, #e8f4fd, #fef0f5)" }}>
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="section-title text-4xl mb-4">Contact Nanny Network</h1>
          <p className="text-gray-600 text-lg">We are here to help. Reach out to us and we will connect you with the right nanny for your family.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#1a1a2e" }}>Get In Touch</h2>
            <div className="flex flex-col gap-6 mb-8">
              <a href="tel:0810259931" className="flex items-center gap-4 card p-5 hover:no-underline">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#e8f4fd" }}>
                  <Phone size={22} style={{ color: "#4a90d9" }} />
                </div>
                <div>
                  <div className="font-bold">Call Us</div>
                  <div className="text-gray-500 text-sm">081 025 9931</div>
                </div>
              </a>
              <a href="https://wa.me/270810259931" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 card p-5 hover:no-underline">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#e8fdf0" }}>
                  <MessageCircle size={22} style={{ color: "#25d366" }} />
                </div>
                <div>
                  <div className="font-bold">WhatsApp Us</div>
                  <div className="text-gray-500 text-sm">Click to start a chat on WhatsApp</div>
                </div>
              </a>
              <div className="flex items-center gap-4 card p-5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#fef0f5" }}>
                  <Mail size={22} style={{ color: "#f8b4c8" }} />
                </div>
                <div>
                  <div className="font-bold">Email Us</div>
                  <div className="text-gray-500 text-sm">info@nannynetwork.co.za</div>
                </div>
              </div>
              <div className="flex items-center gap-4 card p-5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#f0faf0" }}>
                  <MapPin size={22} style={{ color: "#7bc67e" }} />
                </div>
                <div>
                  <div className="font-bold">Location</div>
                  <div className="text-gray-500 text-sm">Serving all 9 provinces of South Africa</div>
                </div>
              </div>
            </div>

            <div className="card p-6" style={{ background: "#e8f4fd" }}>
              <h3 className="font-bold mb-2">Quick WhatsApp Chat</h3>
              <p className="text-gray-600 text-sm mb-4">Need a nanny urgently? Message us on WhatsApp for a quick response.</p>
              <a href="https://wa.me/270810259931?text=Hi%20Nanny%20Network%2C%20I%20am%20looking%20for%20a%20nanny."
                target="_blank" rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 w-full justify-center"
                style={{ background: "#25d366" }}>
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div className="card p-8">
            {sent ? (
              <div className="text-center py-10">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-500">Thank you for contacting Nanny Network. We will get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 className="text-xl font-bold">Send Us a Message</h2>
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
                <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center gap-2">
                  <Send size={18} /> {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
