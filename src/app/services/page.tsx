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
      <section className="py-20 text-center" style={{ background: "linear-gradient(135deg, #e8f4fd, #fef0f5)" }}>
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="section-title text-4xl mb-4">Our Childcare Services</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            From full-time nannies to emergency childcare — Nanny Network has a solution for every family across South Africa.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map(s => (
              <div key={s.title} className="card p-8">
                <div className="text-5xl mb-4">{s.emoji}</div>
                <h2 className="text-xl font-bold mb-3" style={{ color: "#1a1a2e" }}>{s.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <ul className="flex flex-col gap-2">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
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
      <section className="py-16 text-center" style={{ background: "linear-gradient(135deg, #4a90d9, #2c6fad)" }}>
        <div className="max-w-2xl mx-auto px-4 text-white">
          <h2 className="text-3xl font-bold mb-4">Need Childcare Assistance?</h2>
          <p className="text-blue-100 mb-8">Contact Nanny Network today. We are here to help your family find the right support.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:0810259931"
              className="bg-white font-semibold py-3 px-8 rounded-full flex items-center gap-2"
              style={{ color: "#4a90d9" }}>
              <Phone size={18} /> 081 025 9931
            </a>
            <a href="https://wa.me/270810259931" target="_blank" rel="noopener noreferrer"
              className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full flex items-center gap-2">
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
          <div className="mt-6">
            <Link href="/nannies" className="text-blue-200 underline text-sm">Browse Available Nannies →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
