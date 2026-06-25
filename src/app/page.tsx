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
      <section className="relative overflow-hidden min-h-[88vh] flex items-center"
        style={{ background: "linear-gradient(135deg, #e8f4fd 0%, #fef0f5 50%, #f0faf0 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{ background: "#e8f4fd", color: "#4a90d9" }}>
              <Shield size={16} /> Trusted Childcare Across South Africa
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "#1a1a2e" }}>
              Find Trusted Nannies<br />
              <span style={{ color: "#4a90d9" }}>Across South Africa</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Nanny Network connects families with experienced, caring and professional nannies.
              Safe, verified and ready to support your family&apos;s childcare needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/nannies" className="btn-primary text-base">Find a Nanny</Link>
              <Link href="/register" className="btn-outline text-base">Register as a Nanny</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              {[["500+", "Registered Nannies"], ["9", "Provinces Covered"], ["1000+", "Happy Families"]].map(([num, label]) => (
                <div key={label}>
                  <div className="text-2xl font-bold" style={{ color: "#4a90d9" }}>{num}</div>
                  <div className="text-sm text-gray-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="w-80 h-80 md:w-96 md:h-96 rounded-3xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #4a90d9 0%, #7bc67e 100%)" }}>
              <div className="text-center text-white px-8">
                <div className="text-8xl mb-4">👩‍👧‍👦</div>
                <div className="text-xl font-bold">Caring Nannies</div>
                <div className="text-sm opacity-80 mt-2">Professional · Verified · Trusted</div>
              </div>
            </div>
            <div className="absolute top-4 left-0 bg-white rounded-2xl p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} style={{ color: "#7bc67e" }} />
                <span className="text-sm font-semibold">Admin Verified</span>
              </div>
            </div>
            <div className="absolute bottom-8 right-0 bg-white rounded-2xl p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <Star size={18} fill="#fbbf24" style={{ color: "#fbbf24" }} />
                <span className="text-sm font-semibold">5-Star Nannies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="section-title">Why Choose Nanny Network?</h2>
          <p className="section-subtitle">Safety, trust and professional care at the heart of everything we do.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Shield size={32} style={{ color: "#4a90d9" }} />, title: "Verified Profiles", desc: "Every nanny is reviewed and approved by our admin team before going live on our platform." },
              { icon: <Heart size={32} style={{ color: "#f8b4c8" }} />, title: "Caring Professionals", desc: "Our nannies are passionate, experienced and dedicated to providing the best childcare." },
              { icon: <Users size={32} style={{ color: "#7bc67e" }} />, title: "Perfect Match", desc: "We help you find the right nanny based on location, experience, skills and availability." },
            ].map(item => (
              <div key={item.title} className="card p-8 text-center">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20" style={{ background: "#fdf6ec" }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Flexible childcare solutions tailored to your family&apos;s needs.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {services.map(s => (
              <div key={s.title} className="card p-6 text-left">
                <div className="text-4xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-base mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/services" className="btn-primary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-white text-center"
        style={{ background: "linear-gradient(135deg, #4a90d9, #2c6fad)" }}>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Nanny?</h2>
          <p className="text-blue-100 mb-8 text-lg">Browse our verified nanny profiles or call us directly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/nannies" className="bg-white font-semibold py-3 px-8 rounded-full hover:bg-blue-50 transition"
              style={{ color: "#4a90d9" }}>Browse Nannies</Link>
            <a href="tel:0810259931" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-blue-500 transition flex items-center gap-2">
              <Phone size={18} /> 081 025 9931
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="section-title">What Families & Nannies Say</h2>
          <p className="section-subtitle">Real stories from real people who trust Nanny Network.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map(t => (
              <div key={t.name} className="card p-8 text-left">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" style={{ color: "#fbbf24" }} />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">&quot;{t.text}&quot;</p>
                <div>
                  <div className="font-bold text-sm">{t.name}</div>
                  <div className="text-gray-400 text-xs">{t.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ background: "#f5f5f0" }}>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="section-title text-center">Frequently Asked Questions</h2>
          <p className="section-subtitle text-center">Everything you need to know about Nanny Network.</p>
          <div className="flex flex-col gap-4">
            {faqs.map(faq => (
              <div key={faq.q} className="card p-6">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <ChevronRight size={18} style={{ color: "#4a90d9" }} />
                  {faq.q}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp float */}
      <a href="https://wa.me/270810259931" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        style={{ background: "#25d366" }} aria-label="WhatsApp">
        <MessageCircle size={26} fill="white" color="white" />
      </a>
    </div>
  );
}
