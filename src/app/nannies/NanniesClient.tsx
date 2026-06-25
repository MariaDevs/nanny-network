"use client";
import { useState } from "react";
import { Search, Phone, MapPin, Clock, Star } from "lucide-react";

type Nanny = {
  id: string;
  fullName: string;
  province: string;
  city: string;
  age: number;
  yearsExperience: number;
  languages: string;
  skills: string;
  availability: string;
  bio: string;
  photoUrl: string | null;
};

const PROVINCES = ["All Provinces", "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "Northern Cape", "North West", "Western Cape"];
const AVAILABILITY_OPTIONS = ["All", "Full-Time", "Part-Time", "Live-In", "Live-Out", "Weekends"];

function NannyCard({ nanny }: { nanny: Nanny }) {
  const skills = nanny.skills.split(",").map(s => s.trim()).filter(Boolean);
  const langs = nanny.languages.split(",").map(l => l.trim()).filter(Boolean);
  const avail = nanny.availability.split(",").map(a => a.trim()).filter(Boolean);

  return (
    <div className="card overflow-hidden">
      <div className="h-48 flex items-center justify-center text-7xl"
        style={{ background: "linear-gradient(135deg, #e8f4fd, #fef0f5)" }}>
        {nanny.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={nanny.photoUrl} alt={nanny.fullName} className="w-full h-full object-cover" />
        ) : "👩"}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg mb-1">{nanny.fullName}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin size={14} /> {nanny.city}, {nanny.province}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 rounded-full text-xs font-medium"
            style={{ background: "#e8f4fd", color: "#4a90d9" }}>
            {nanny.yearsExperience} yrs experience
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-medium"
            style={{ background: "#f0faf0", color: "#2d6a2f" }}>
            Age: {nanny.age}
          </span>
        </div>

        <div className="mb-3">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Languages</div>
          <div className="flex flex-wrap gap-1">
            {langs.slice(0, 3).map(l => (
              <span key={l} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{l}</span>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Skills</div>
          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 3).map(s => (
              <span key={s} className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "#fef0f5", color: "#c2185b" }}>{s}</span>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Availability</div>
          <div className="flex flex-wrap gap-1">
            {avail.map(a => (
              <span key={a} className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "#f0faf0", color: "#388e3c" }}>
                <Clock size={10} className="inline mr-1" />{a}
              </span>
            ))}
          </div>
        </div>

        <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">{nanny.bio}</p>

        <a href="tel:0810259931"
          className="btn-primary w-full text-center flex items-center justify-center gap-2 text-sm">
          <Phone size={16} /> Contact Nanny Network: 0810259931
        </a>
      </div>
    </div>
  );
}

export default function NanniesClient({ nannies }: { nannies: Nanny[] }) {
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState("All Provinces");
  const [availability, setAvailability] = useState("All");

  const filtered = nannies.filter(n => {
    const matchSearch = !search ||
      n.fullName.toLowerCase().includes(search.toLowerCase()) ||
      n.city.toLowerCase().includes(search.toLowerCase()) ||
      n.skills.toLowerCase().includes(search.toLowerCase());
    const matchProvince = province === "All Provinces" || n.province === province;
    const matchAvail = availability === "All" || n.availability.toLowerCase().includes(availability.toLowerCase());
    return matchSearch && matchProvince && matchAvail;
  });

  return (
    <div>
      {/* Hero */}
      <section className="py-16 text-center" style={{ background: "linear-gradient(135deg, #e8f4fd, #fef0f5)" }}>
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="section-title text-4xl mb-4">Find Your Perfect Nanny</h1>
          <p className="text-gray-600 text-lg mb-8">Browse verified nanny profiles across South Africa. All nannies are admin-approved.</p>

          {/* Search bar */}
          <div className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-md max-w-2xl mx-auto">
            <Search size={20} style={{ color: "#9ca3af" }} className="ml-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by name, city or skill..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 border-none outline-none text-sm bg-transparent p-0"
              style={{ width: "auto" }}
            />
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <select value={province} onChange={e => setProvince(e.target.value)}
              className="w-auto px-4 py-2 text-sm">
              {PROVINCES.map(p => <option key={p}>{p}</option>)}
            </select>
            <select value={availability} onChange={e => setAvailability(e.target.value)}
              className="w-auto px-4 py-2 text-sm">
              {AVAILABILITY_OPTIONS.map(a => <option key={a}>{a}</option>)}
            </select>
            <span className="flex items-center text-sm text-gray-500 ml-auto">
              {filtered.length} nann{filtered.length === 1 ? "y" : "ies"} found
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">No nannies found</h3>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(n => <NannyCard key={n.id} nanny={n} />)}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center" style={{ background: "#fdf6ec" }}>
        <p className="text-gray-600 mb-4">Don&apos;t see the right nanny? Call us directly and we&apos;ll help you find the perfect match.</p>
        <a href="tel:0810259931" className="btn-primary inline-flex items-center gap-2">
          <Phone size={18} /> Call: 081 025 9931
        </a>
      </section>
    </div>
  );
}
