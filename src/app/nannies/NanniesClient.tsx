"use client";
import { useState } from "react";
import { Search, Phone, MapPin, Clock } from "lucide-react";

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
    <div className="card" style={{ overflow: "hidden" }}>
      <div style={{ height: "12rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4.5rem", background: "linear-gradient(135deg, #e8f4fd, #fef0f5)" }}>
        {nanny.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={nanny.photoUrl} alt={nanny.fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : "👩"}
      </div>
      <div style={{ padding: "1.5rem" }}>
        <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.25rem" }}>{nanny.fullName}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", color: "#6b7280", fontSize: "0.875rem", marginBottom: "0.75rem" }}>
          <MapPin size={14} /> {nanny.city}, {nanny.province}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
          <span style={{ padding: "0.25rem 0.5rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 600, background: "#e8f4fd", color: "#4a90d9" }}>
            {nanny.yearsExperience} yrs experience
          </span>
          <span style={{ padding: "0.25rem 0.5rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 600, background: "#f0faf0", color: "#2d6a2f" }}>
            Age: {nanny.age}
          </span>
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", marginBottom: "0.25rem" }}>Languages</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
            {langs.slice(0, 3).map(l => (
              <span key={l} style={{ fontSize: "0.75rem", padding: "0.125rem 0.5rem", borderRadius: "9999px", background: "#f3f4f6", color: "#4b5563" }}>{l}</span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", marginBottom: "0.25rem" }}>Skills</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
            {skills.slice(0, 3).map(s => (
              <span key={s} style={{ fontSize: "0.75rem", padding: "0.125rem 0.5rem", borderRadius: "9999px", background: "#fef0f5", color: "#c2185b" }}>{s}</span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", marginBottom: "0.25rem" }}>Availability</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
            {avail.map(a => (
              <span key={a} style={{ fontSize: "0.75rem", padding: "0.125rem 0.5rem", borderRadius: "9999px", background: "#f0faf0", color: "#388e3c", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Clock size={10} />{a}
              </span>
            ))}
          </div>
        </div>

        <p style={{ color: "#6b7280", fontSize: "0.75rem", lineHeight: 1.6, marginBottom: "1rem", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{nanny.bio}</p>

        <a href="tel:0810259931" className="btn-primary" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", fontSize: "0.875rem", width: "100%", textAlign: "center" }}>
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
      <section style={{ padding: "4rem 0", textAlign: "center", background: "linear-gradient(135deg, #e8f4fd, #fef0f5)" }}>
        <div className="wrap">
          <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Find Your Perfect Nanny</h1>
          <p style={{ color: "#4b5563", fontSize: "1.1rem", marginBottom: "2rem" }}>Browse verified nanny profiles across South Africa. All nannies are admin-approved.</p>

          {/* Search bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "white", borderRadius: "1rem", padding: "0.75rem", boxShadow: "0 4px 15px rgba(0,0,0,0.08)", maxWidth: "32rem", margin: "0 auto" }}>
            <Search size={20} style={{ color: "#9ca3af", flexShrink: 0, marginLeft: "0.5rem" }} />
            <input
              type="text"
              placeholder="Search by name, city or skill..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, border: "none", outline: "none", fontSize: "0.875rem", background: "transparent", padding: 0, width: "auto" }}
            />
          </div>
        </div>
      </section>

      <section style={{ padding: "2.5rem 0" }}>
        <div className="wrap">
          {/* Filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem", alignItems: "center" }}>
            <select value={province} onChange={e => setProvince(e.target.value)} style={{ width: "auto" }}>
              {PROVINCES.map(p => <option key={p}>{p}</option>)}
            </select>
            <select value={availability} onChange={e => setAvailability(e.target.value)} style={{ width: "auto" }}>
              {AVAILABILITY_OPTIONS.map(a => <option key={a}>{a}</option>)}
            </select>
            <span style={{ fontSize: "0.875rem", color: "#6b7280", marginLeft: "auto" }}>
              {filtered.length} nann{filtered.length === 1 ? "y" : "ies"} found
            </span>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem 0" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🔍</div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>No nannies found</h3>
              <p style={{ color: "#6b7280" }}>Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: "1.5rem" }}>
              {filtered.map(n => <NannyCard key={n.id} nanny={n} />)}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "3rem 0", textAlign: "center", background: "#fdf6ec" }}>
        <div className="wrap">
          <p style={{ color: "#4b5563", marginBottom: "1rem" }}>Don&apos;t see the right nanny? Call us directly and we&apos;ll help you find the perfect match.</p>
          <a href="tel:0810259931" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <Phone size={18} /> Call: 081 025 9931
          </a>
        </div>
      </section>
    </div>
  );
}
