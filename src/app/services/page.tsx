import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Our Services | Nanny Network South Africa",
  description: "Full-time, part-time, live-in, au pair, newborn care and emergency childcare services across South Africa.",
};

const services = [
  {
    emoji: "👶",
    title: "Full-Time Nannies",
    desc: "Our full-time nannies are available Monday to Friday, typically from 7am to 5pm. They provide consistent, reliable daily childcare so you can focus on work with complete peace of mind. Full-time nannies build strong bonds with your children through daily routine, play, learning and emotional support.",
    features: ["Monday to Friday availability", "Daily routine and structure", "Meal preparation", "School pick-up and drop-off", "Homework assistance"],
  },
  {
    emoji: "⏰",
    title: "Part-Time Nannies",
    desc: "Part-time nannies offer the flexibility your family needs. Whether you need childcare for mornings, afternoons or a few days per week, our part-time nannies are adaptable and professional. Perfect for parents who work reduced hours or need support during specific times of the day.",
    features: ["Flexible scheduling", "Morning or afternoon shifts", "2–4 days per week options", "Afterschool care", "Holiday cover"],
  },
  {
    emoji: "🏠",
    title: "Live-In Nannies",
    desc: "A live-in nanny becomes part of your household, providing around-the-clock childcare support. This option is ideal for families with demanding schedules, frequent travel or multiple young children. Our live-in nannies are experienced, trustworthy professionals who respect your home and your family's way of life.",
    features: ["24/7 childcare availability", "Ideal for frequent travellers", "Household routine support", "Multiple children experience", "Long-term placement"],
  },
  {
    emoji: "🚗",
    title: "Live-Out Nannies",
    desc: "Live-out nannies arrive at your home each day and return to their own residence in the evening. This arrangement offers professional childcare without the live-in commitment. Our live-out nannies are punctual, experienced and committed to providing excellent care for your children.",
    features: ["Daily travel to your home", "Professional boundaries", "No accommodation required", "Flexible hours", "All age groups"],
  },
  {
    emoji: "📅",
    title: "Weekend Nannies",
    desc: "Need childcare on Saturdays, Sundays or public holidays? Our weekend nannies are available for single days or full weekends. Perfect for parents who work weekend shifts or need a break. Our weekend nannies are energetic, fun and experienced with keeping children engaged and happy.",
    features: ["Saturday and Sunday availability", "Public holiday cover", "Single or full weekend", "Activity-based care", "Flexible booking"],
  },
  {
    emoji: "🌙",
    title: "Babysitting Services",
    desc: "Our babysitters are available for evenings, date nights, family events and last-minute childcare needs. All babysitters on our platform are vetted, trustworthy adults with childcare experience. Book with confidence knowing your children are safe and happy.",
    features: ["Evening availability", "Short-notice bookings", "Vetted and verified", "All ages welcome", "Fun and engaging"],
  },
  {
    emoji: "🌍",
    title: "Au Pair Services",
    desc: "An au pair brings cultural richness and language skills to your family while providing quality childcare. Nanny Network connects families with au pairs who are experienced, educated and passionate about early childhood development. Many of our au pairs offer dual language capabilities.",
    features: ["Cultural exchange experience", "Language skills", "University educated", "Child development knowledge", "Flexible arrangements"],
  },
  {
    emoji: "👼",
    title: "Newborn Care",
    desc: "Welcoming a new baby is a joyful but demanding time. Our newborn care specialists are experienced in infant care, feeding schedules, sleep routines and postpartum support. They work closely with new parents to establish healthy routines and give families the support they need in those precious first months.",
    features: ["Infant feeding support", "Sleep routine establishment", "Postpartum support", "Night nurse option", "Breastfeeding support"],
  },
  {
    emoji: "🧹",
    title: "Domestic Helper with Childcare",
    desc: "Some families need a combination of household support and childcare. Our domestic helpers with childcare experience can assist with light household duties such as cooking, cleaning and laundry while also caring for your children — a practical and cost-effective solution for busy families.",
    features: ["Dual role capability", "Household and childcare", "Meal preparation", "Light cleaning duties", "Cost-effective option"],
  },
  {
    emoji: "🚨",
    title: "Emergency Childcare Assistance",
    desc: "Life is unpredictable. When your regular nanny is unavailable, a family emergency arises or you have an urgent work commitment, Nanny Network provides emergency childcare assistance. Contact us at 0810259931 and we will do our best to connect you with an available nanny as quickly as possible.",
    features: ["Short-notice availability", "Quick placement", "Trusted vetted nannies", "All emergency situations", "Call us anytime"],
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "5rem 0", textAlign: "center", background: "linear-gradient(135deg, #e8f4fd, #fef0f5)" }}>
        <div className="wrap">
          <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Our Childcare Services</h1>
          <p style={{ color: "#4b5563", fontSize: "1.1rem", lineHeight: 1.7 }}>
            From full-time nannies to emergency childcare — Nanny Network has a solution for every family across South Africa.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section style={{ padding: "5rem 0" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))", gap: "2rem" }}>
            {services.map(s => (
              <div key={s.title} className="card" style={{ padding: "2rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{s.emoji}</div>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem", color: "#1a1a2e" }}>{s.title}</h2>
                <p style={{ color: "#6b7280", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1rem" }}>{s.desc}</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {s.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "#4b5563" }}>
                      <span style={{ color: "#7bc67e" }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "4rem 0", textAlign: "center", background: "linear-gradient(135deg, #4a90d9, #2c6fad)" }}>
        <div className="wrap">
          <h2 style={{ fontSize: "1.875rem", fontWeight: 700, color: "white", marginBottom: "1rem" }}>Need Childcare Assistance?</h2>
          <p style={{ color: "#bfdbfe", marginBottom: "2rem", fontSize: "1.1rem" }}>Contact Nanny Network today. We are here to help your family find the right support.</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
            <a href="tel:0810259931"
              style={{ background: "white", color: "#4a90d9", fontWeight: 600, padding: "0.75rem 2rem", borderRadius: "9999px", display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
              <Phone size={18} /> 081 025 9931
            </a>
            <a href="https://wa.me/270810259931" target="_blank" rel="noopener noreferrer"
              style={{ border: "2px solid white", color: "white", fontWeight: 600, padding: "0.75rem 2rem", borderRadius: "9999px", display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <Link href="/nannies" style={{ color: "#bfdbfe", fontSize: "0.875rem", textDecoration: "underline" }}>Browse Available Nannies →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
