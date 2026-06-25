"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { CheckCircle, Clock, XCircle, LogOut, Edit3, Save, X } from "lucide-react";

type Nanny = {
  id: string; fullName: string; province: string; city: string; age: number;
  yearsExperience: number; languages: string; skills: string; availability: string;
  salaryRange: string; bio: string; photoUrl: string | null; status: string;
};

const PROVINCES = ["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "Northern Cape", "North West", "Western Cape"];
const AVAILABILITY_OPTIONS = ["Full-Time", "Part-Time", "Live-In", "Live-Out", "Weekends"];

function StatusBadge({ status }: { status: string }) {
  const config = {
    approved: { icon: <CheckCircle size={16} />, label: "Approved", bg: "#e8fdf0", color: "#166534" },
    pending: { icon: <Clock size={16} />, label: "Pending Review", bg: "#fef9e8", color: "#92400e" },
    rejected: { icon: <XCircle size={16} />, label: "Rejected", bg: "#fef2f2", color: "#dc2626" },
    inactive: { icon: <XCircle size={16} />, label: "Inactive", bg: "#f5f5f5", color: "#6b7280" },
  }[status] || { icon: <Clock size={16} />, label: status, bg: "#f5f5f5", color: "#6b7280" };

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", padding: "0.375rem 0.75rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 600, background: config.bg, color: config.color }}>
      {config.icon} {config.label}
    </span>
  );
}

export default function DashboardClient({ nanny, userEmail }: { nanny: Nanny; userEmail: string }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(nanny);
  const [form, setForm] = useState(nanny);

  function toggleAvail(val: string) {
    const arr = form.availability.split(",").map(s => s.trim()).filter(Boolean);
    const next = arr.includes(val) ? arr.filter(a => a !== val) : [...arr, val];
    setForm(p => ({ ...p, availability: next.join(",") }));
  }

  async function handleSave() {
    setSaving(true); setError("");
    const res = await fetch("/api/nanny/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        city: form.city, province: form.province, bio: form.bio,
        availability: form.availability, salaryRange: form.salaryRange,
        skills: form.skills, languages: form.languages, yearsExperience: form.yearsExperience,
      }),
    });
    setSaving(false);
    if (!res.ok) { setError("Failed to save changes"); return; }
    setData(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const availArr = data.availability.split(",").map(s => s.trim()).filter(Boolean);
  const formAvailArr = form.availability.split(",").map(s => s.trim()).filter(Boolean);

  return (
    <div style={{ background: "#f5f5f0", minHeight: "100vh" }}>
      <div className="wrap" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#1a1a2e" }}>My Dashboard</h1>
            <p className="text-gray-500 text-sm">{userEmail}</p>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition">
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Status card */}
        <div className="card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h2 className="font-bold text-lg mb-1">Profile Status</h2>
              <p className="text-gray-500 text-sm">
                {data.status === "approved" && "Your profile is live and visible to families."}
                {data.status === "pending" && "Your profile is under review. We will notify you once approved."}
                {data.status === "rejected" && "Your profile was not approved. Contact us for more information."}
                {data.status === "inactive" && "Your profile is currently inactive."}
              </p>
            </div>
            <StatusBadge status={data.status} />
          </div>
          {saved && (
            <div style={{ marginTop: "1rem", padding: "0.75rem", borderRadius: "0.75rem", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem", background: "#e8fdf0", color: "#166534" }}>
              <CheckCircle size={16} /> Changes submitted for admin review.
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="card" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="font-bold text-lg">My Profile</h2>
            {!editing ? (
              <button onClick={() => { setForm(data); setEditing(true); }}
                className="btn-outline" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", padding: "0.5rem 1rem" }}>
                <Edit3 size={16} /> Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setEditing(false)} style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.875rem", color: "#6b7280", border: "1px solid #d1d5db", padding: "0.5rem 1rem", borderRadius: "9999px", background: "none", cursor: "pointer" }}>
                  <X size={14} /> Cancel
                </button>
                <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.875rem", padding: "0.5rem 1rem" }}>
                  <Save size={14} /> {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>

          {error && <div style={{ marginBottom: "1rem", padding: "0.75rem", borderRadius: "0.75rem", fontSize: "0.875rem", background: "#fef2f2", color: "#dc2626" }}>{error}</div>}

          {/* Photo */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
            <div style={{ width: "6rem", height: "6rem", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", flexShrink: 0, overflow: "hidden", background: "linear-gradient(135deg, #e8f4fd, #fef0f5)" }}>
              {data.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={data.photoUrl} alt={data.fullName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : "👩"}
            </div>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: "1.25rem" }}>{data.fullName}</h3>
              <p style={{ color: "#6b7280" }}>{data.city}, {data.province}</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: "1.5rem" }}>
            {editing ? (
              <>
                <div>
                  <label>City</label>
                  <input value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} />
                </div>
                <div>
                  <label>Province</label>
                  <select value={form.province} onChange={e => setForm(p => ({ ...p, province: e.target.value }))}>
                    {PROVINCES.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label>Years of Experience</label>
                  <input type="number" min="0" value={form.yearsExperience} onChange={e => setForm(p => ({ ...p, yearsExperience: parseInt(e.target.value) }))} />
                </div>
                <div>
                  <label>Salary Range</label>
                  <input value={form.salaryRange} onChange={e => setForm(p => ({ ...p, salaryRange: e.target.value }))} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label>Bio</label>
                  <textarea rows={4} value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label>Availability</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                    {AVAILABILITY_OPTIONS.map(a => (
                      <button key={a} type="button" onClick={() => toggleAvail(a)}
                        style={{ padding: "0.375rem 0.75rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: "pointer", background: formAvailArr.includes(a) ? "#f8b4c8" : "#e5e7eb", color: formAvailArr.includes(a) ? "#831843" : "#374151" }}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {[
                  ["Years of Experience", `${data.yearsExperience} years`],
                  ["Age", `${data.age} years old`],
                  ["Salary Range", data.salaryRange || "Not specified"],
                  ["Languages", data.languages],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", marginBottom: "0.25rem" }}>{label}</div>
                    <div style={{ fontWeight: 500, fontSize: "0.875rem" }}>{value}</div>
                  </div>
                ))}
                <div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", marginBottom: "0.25rem" }}>Availability</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                    {availArr.map(a => (
                      <span key={a} style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", borderRadius: "9999px", background: "#fef0f5", color: "#c2185b" }}>{a}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", marginBottom: "0.25rem" }}>Skills</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
                    {data.skills.split(",").map(s => s.trim()).filter(Boolean).map(s => (
                      <span key={s} style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem", borderRadius: "9999px", background: "#f3f4f6", color: "#4b5563" }}>{s}</span>
                    ))}
                  </div>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", marginBottom: "0.25rem" }}>Bio</div>
                  <p style={{ fontSize: "0.875rem", color: "#4b5563", lineHeight: 1.6 }}>{data.bio}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="card" style={{ padding: "1.5rem", textAlign: "center" }}>
          <p className="text-gray-500 text-sm mb-3">Need help with your profile? Contact us.</p>
          <a href="tel:0810259931" className="btn-primary text-sm py-2 px-6">📞 081 025 9931</a>
        </div>
      </div>
    </div>
  );
}
