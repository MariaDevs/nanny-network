import Link from "next/link";
import { Star, Shield, Heart, Users, CheckCircle, Phone, MessageCircle, ChevronRight } from "lucide-react";

const services = [
  { icon: "👶", title: "Full-Time Nannies", desc: "Dedicated nannies available Monday to Friday for full-day childcare." },
  { icon: "⏰", title: "Part-Time Nannies", desc: "Flexible nannies for morning, afternoon or evening childcare needs." },
  { icon: "🏠", title: "Live-In Nannies", desc: "Nannies who reside with your family for round-the-clock care." },
  { icon: "🚗", title: "Live-Out Nannies", desc: "Professional nannies who travel daily to your home." },
  { icon: "📅", title: "Weekend Nannies", desc: "Reliable childcare support for weekends and public holidays." },
  { icon: "🌙", title: "Babysitting Services", desc: "On-demand babysitters for evenings, date nights and special occasions." },
];

const testimonials = [
  { name: "Sarah van der Berg", city: "Cape Town", text: "Finding a trusted nanny through Nanny Network was so easy. Our nanny has been with us for 2 years and our children adore her!", rating: 5 },
  { name: "Thandi Dlamini", city: "Johannesburg", text: "As a nanny, registering on Nanny Network opened so many doors for me. I found a wonderful family to work with.", rating: 5 },
  { name: "Melissa Botha", city: "Pretoria", text: "The admin approval process gave me peace of mind. I knew the nanny we hired had been vetted and verified.", rating: 5 },
];

const faqs = [
  { q: "How does Nanny Network work?", a: "Nannies register online, complete their profile, and await admin approval. Once approved, their profile is listed publicly. Families browse profiles and contact us at 0810259931 to arrange an introduction." },
  { q: "Are nannies background checked?", a: "We require nannies to upload ID/passport copies and reference documents during registration. Our admin team reviews all documents before approving any profile." },
  { q: "How do I contact a nanny?", a: "All enquiries go through Nanny Network. Call or WhatsApp us on 0810259931 and we will connect you with the right nanny for your family." },
  { q: "Is there a fee to register as a nanny?", a: "Registration is free for nannies. Our goal is to help as many qualified nannies as possible find families across South Africa." },
  { q: "What areas do you cover?", a: "We operate across all 9 provinces of South Africa, from Cape Town to Johannesburg, Durban, Pretoria, Port Elizabeth and beyond." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #e8f4fd 0%, #fef0f5 50%, #f0faf0 100%)", overflow: "hidden", minHeight: "88vh", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 2.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "center", width: "100%", boxSizing: "border-box" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 600, background: "#e8f4fd", color: "#4a90d9", marginBottom: "1.5rem" }}>
              <Shield size={16} /> Trusted Childcare Across South Africa
            </div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "1.5rem", color: "#1a1a2e" }}>
              Find Trusted Nannies<br />
              <span style={{ color: "#4a90d9" }}>Across South Africa</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#4b5563", marginBottom: "2rem", lineHeight: 1.7 }}>
              Nanny Network connects families with experienced, caring and professional nannies.
              Safe, verified and ready to support your family&apos;s childcare needs.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Link href="/nannies" className="btn-primary">Find a Nanny</Link>
              <Link href="/register" className="btn-outline">Register as a Nanny</Link>
            </div>
            <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
              {[["500+", "Registered Nannies"], ["9", "Provinces Covered"], ["1000+", "Happy Families"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#4a90d9" }}>{num}</div>
                  <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: "relative", display: "flex", justifyContent: "center", padding: "2rem" }}>
            <div style={{ width: "100%", maxWidth: "22rem", aspectRatio: "1", borderRadius: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #4a90d9 0%, #7bc67e 100%)" }}>
              <div style={{ textAlign: "center", color: "white", padding: "2rem" }}>
                <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>👩‍👧‍👦</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 700 }}>Caring Nannies</div>
                <div style={{ fontSize: "0.875rem", opacity: 0.8, marginTop: "0.5rem" }}>Professional · Verified · Trusted</div>
              </div>
            </div>
            <div style={{ position: "absolute", top: "1rem", left: "1rem", background: "white", borderRadius: "1rem", padding: "0.75rem", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CheckCircle size={18} style={{ color: "#7bc67e" }} />
                <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>Admin Verified</span>
              </div>
            </div>
            <div style={{ position: "absolute", bottom: "2rem", right: "1rem", background: "white", borderRadius: "1rem", padding: "0.75rem", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Star size={18} fill="#fbbf24" style={{ color: "#fbbf24" }} />
                <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>5-Star Nannies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section style={{ padding: "5rem 0" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="section-title">Why Choose Nanny Network?</h2>
          <p className="section-subtitle">Safety, trust and professional care at the heart of everything we do.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
            {[
              { icon: <Shield size={32} style={{ color: "#4a90d9" }} />, title: "Verified Profiles", desc: "Every nanny is reviewed and approved by our admin team before going live on our platform." },
              { icon: <Heart size={32} style={{ color: "#f8b4c8" }} />, title: "Caring Professionals", desc: "Our nannies are passionate, experienced and dedicated to providing the best childcare." },
              { icon: <Users size={32} style={{ color: "#7bc67e" }} />, title: "Perfect Match", desc: "We help you find the right nanny based on location, experience, skills and availability." },
            ].map(item => (
              <div key={item.title} className="card p-8" style={{ textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>{item.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.75rem" }}>{item.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: "5rem 0", background: "#fdf6ec" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Flexible childcare solutions tailored to your family&apos;s needs.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {services.map(s => (
              <div key={s.title} className="card p-6" style={{ textAlign: "left" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                <h3 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>{s.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "2.5rem" }}>
            <Link href="/services" className="btn-primary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "4rem 0", background: "linear-gradient(135deg, #4a90d9, #2c6fad)", textAlign: "center" }}>
        <div className="wrap">
          <h2 style={{ fontSize: "1.875rem", fontWeight: 700, color: "white", marginBottom: "1rem" }}>Ready to Find Your Perfect Nanny?</h2>
          <p style={{ color: "#bfdbfe", marginBottom: "2rem", fontSize: "1.1rem" }}>Browse our verified nanny profiles or call us directly.</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
            <Link href="/nannies" style={{ background: "white", color: "#4a90d9", fontWeight: 600, padding: "0.75rem 2rem", borderRadius: "9999px" }}>Browse Nannies</Link>
            <a href="tel:0810259931" style={{ border: "2px solid white", color: "white", fontWeight: 600, padding: "0.75rem 2rem", borderRadius: "9999px", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Phone size={18} /> 081 025 9931
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "5rem 0" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="section-title">What Families &amp; Nannies Say</h2>
          <p className="section-subtitle">Real stories from real people who trust Nanny Network.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
            {testimonials.map(t => (
              <div key={t.name} className="card p-8" style={{ textAlign: "left" }}>
                <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" style={{ color: "#fbbf24" }} />
                  ))}
                </div>
                <p style={{ color: "#4b5563", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>&quot;{t.text}&quot;</p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.875rem" }}>{t.name}</div>
                  <div style={{ color: "#9ca3af", fontSize: "0.75rem" }}>{t.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "5rem 0", background: "#f5f5f0" }}>
        <div className="wrap">
          <h2 className="section-title" style={{ textAlign: "center" }}>Frequently Asked Questions</h2>
          <p className="section-subtitle" style={{ textAlign: "center" }}>Everything you need to know about Nanny Network.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "48rem", margin: "0 auto" }}>
            {faqs.map(faq => (
              <div key={faq.q} className="card p-6">
                <h3 style={{ fontWeight: 700, marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <ChevronRight size={18} style={{ color: "#4a90d9" }} />
                  {faq.q}
                </h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.7, paddingLeft: "1.5rem" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp float */}
      <a href="https://wa.me/270810259931" target="_blank" rel="noopener noreferrer"
        style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 50, width: "3.5rem", height: "3.5rem", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", background: "#25d366", boxShadow: "0 4px 15px rgba(0,0,0,0.2)" }}
        aria-label="WhatsApp">
        <MessageCircle size={26} fill="white" color="white" />
      </a>
    </div>
  );
}
