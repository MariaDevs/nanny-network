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
      <section className="py-20 text-center" style={{ background: "linear-gradient(135deg, #e8f4fd, #fef0f5)" }}>
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="section-title text-4xl mb-4">About Nanny Network</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            We are South Africa&apos;s trusted online platform that helps families find experienced, caring and
            professional nannies — while empowering nannies to build their careers online.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-full h-80 rounded-3xl flex items-center justify-center text-8xl"
              style={{ background: "linear-gradient(135deg, #e8f4fd, #f0faf0)" }}>
              🏡
            </div>
          </div>
          <div>
            <h2 className="section-title">Our Story</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Nanny Network was founded with a simple but powerful mission: to make quality childcare accessible
              to every South African family while creating meaningful employment opportunities for skilled nannies
              across our beautiful country.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We understand that entrusting someone with your children is one of the most important decisions
              you will ever make. That is why we have built a platform that prioritises safety, transparency
              and trust above all else.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every nanny on our platform is personally reviewed and approved by our admin team. We verify
              identity documents, check references and ensure that only qualified, caring professionals
              are listed on our website.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {["Admin-approved nanny profiles only", "ID and reference verification", "Privacy protected — no personal contact details shown", "Operating across all 9 South African provinces"].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={18} style={{ color: "#7bc67e" }} />
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: "#fdf6ec" }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="section-title">Our Values</h2>
          <p className="section-subtitle">The principles that guide everything we do at Nanny Network.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="card p-6 text-center">
                <div className="flex justify-center mb-3">{v.icon}</div>
                <h3 className="font-bold mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="card p-10">
            <Shield size={48} className="mx-auto mb-4" style={{ color: "#4a90d9" }} />
            <h2 className="section-title">Privacy Protection</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              At Nanny Network, we take the privacy and safety of our nannies seriously. No nanny&apos;s personal
              contact details — phone numbers, email addresses or home addresses — are displayed on our platform.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              All family enquiries are directed through Nanny Network. Families contact us at{" "}
              <strong>0810259931</strong> and we arrange introductions on behalf of our nannies.
            </p>
            <a href="tel:0810259931"
              className="btn-primary inline-flex items-center gap-2">
              📞 Call Us: 081 025 9931
            </a>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20" style={{ background: "#f5f5f0" }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">Dedicated professionals committed to connecting families with great nannies.</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {team.map(m => (
              <div key={m.name} className="card p-8 text-center">
                <div className="text-6xl mb-4">{m.emoji}</div>
                <h3 className="font-bold">{m.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
