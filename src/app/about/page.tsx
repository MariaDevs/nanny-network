import { Shield, Heart, Users, Award, CheckCircle } from "lucide-react";

export const metadata = {
  title: "About Us | Nanny Network South Africa",
  description: "Learn about Nanny Network — South Africa's trusted platform connecting families with professional nannies.",
};

const values = [
  { icon: <Shield size={28} style={{ color: "#4a90d9" }} />, title: "Safety First", desc: "We screen and verify every nanny before their profile goes live. ID documents and references are reviewed by our admin team." },
  { icon: <Heart size={28} style={{ color: "#f8b4c8" }} />, title: "Care & Compassion", desc: "We believe great childcare comes from nannies who genuinely love what they do. We connect families with nannies who share your values." },
  { icon: <Users size={28} style={{ color: "#7bc67e" }} />, title: "Community", desc: "We support both families and nannies across South Africa, building a community of trust, respect and professional excellence." },
  { icon: <Award size={28} style={{ color: "#fbbf24" }} />, title: "Professionalism", desc: "Our nannies are experienced professionals committed to providing consistent, high-quality childcare for your family." },
];

const team = [
  { name: "Nomvula Khumalo", role: "Founder & CEO", emoji: "👩🏾‍💼" },
  { name: "Liezel van Niekerk", role: "Operations Manager", emoji: "👩🏼‍💼" },
  { name: "Sipho Dlamini", role: "Nanny Relations", emoji: "👨🏾‍💼" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "5rem 0", textAlign: "center", background: "linear-gradient(135deg, #e8f4fd, #fef0f5)" }}>
        <div className="wrap">
          <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>About Nanny Network</h1>
          <p style={{ color: "#4b5563", fontSize: "1.1rem", lineHeight: 1.7 }}>
            We are South Africa&apos;s trusted online platform that helps families find experienced, caring and
            professional nannies — while empowering nannies to build their careers online.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section style={{ padding: "5rem 0" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(400px, 100%), 1fr))", gap: "3rem", alignItems: "center" }}>
            <div>
              <div style={{ width: "100%", height: "20rem", borderRadius: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "5rem", background: "linear-gradient(135deg, #e8f4fd, #f0faf0)" }}>
                🏡
              </div>
            </div>
            <div>
              <h2 className="section-title">Our Story</h2>
              <p style={{ color: "#4b5563", marginBottom: "1rem", lineHeight: 1.7 }}>
                Nanny Network was founded with a simple but powerful mission: to make quality childcare accessible
                to every South African family while creating meaningful employment opportunities for skilled nannies
                across our beautiful country.
              </p>
              <p style={{ color: "#4b5563", marginBottom: "1rem", lineHeight: 1.7 }}>
                We understand that entrusting someone with your children is one of the most important decisions
                you will ever make. That is why we have built a platform that prioritises safety, transparency
                and trust above all else.
              </p>
              <p style={{ color: "#4b5563", lineHeight: 1.7 }}>
                Every nanny on our platform is personally reviewed and approved by our admin team. We verify
                identity documents, check references and ensure that only qualified, caring professionals
                are listed on our website.
              </p>
              <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {["Admin-approved nanny profiles only", "ID and reference verification", "Privacy protected — no personal contact details shown", "Operating across all 9 South African provinces"].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <CheckCircle size={18} style={{ color: "#7bc67e", flexShrink: 0 }} />
                    <span style={{ color: "#374151", fontSize: "0.875rem" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "5rem 0", background: "#fdf6ec" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="section-title">Our Values</h2>
          <p className="section-subtitle">The principles that guide everything we do at Nanny Network.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: "1.5rem" }}>
            {values.map(v => (
              <div key={v.title} className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem" }}>{v.icon}</div>
                <h3 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>{v.title}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy section */}
      <section style={{ padding: "5rem 0" }}>
        <div className="wrap">
          <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
            <div className="card" style={{ padding: "2.5rem", textAlign: "center" }}>
              <Shield size={48} style={{ color: "#4a90d9", margin: "0 auto 1rem" }} />
              <h2 className="section-title">Privacy Protection</h2>
              <p style={{ color: "#4b5563", lineHeight: 1.7, marginBottom: "1rem" }}>
                At Nanny Network, we take the privacy and safety of our nannies seriously. No nanny&apos;s personal
                contact details — phone numbers, email addresses or home addresses — are displayed on our platform.
              </p>
              <p style={{ color: "#4b5563", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                All family enquiries are directed through Nanny Network. Families contact us at{" "}
                <strong>0810259931</strong> and we arrange introductions on behalf of our nannies.
              </p>
              <a href="tel:0810259931" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                📞 Call Us: 081 025 9931
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "5rem 0", background: "#f5f5f0" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">Dedicated professionals committed to connecting families with great nannies.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: "2rem", maxWidth: "42rem", margin: "0 auto" }}>
            {team.map(m => (
              <div key={m.name} className="card" style={{ padding: "2rem", textAlign: "center" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>{m.emoji}</div>
                <h3 style={{ fontWeight: 700 }}>{m.name}</h3>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", marginTop: "0.25rem" }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
