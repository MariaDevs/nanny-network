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
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
      style={{ background: config.bg, color: config.color }}>
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
      <div className="max-w-5xl mx-auto px-4 py-12">
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
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
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
            <div className="mt-4 p-3 rounded-xl text-sm flex items-center gap-2"
              style={{ background: "#e8fdf0", color: "#166534" }}>
              <CheckCircle size={16} /> Changes submitted for admin review.
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="card p-8 mb-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="font-bold text-lg">My Profile</h2>
            {!editing ? (
              <button onClick={() => { setForm(data); setEditing(true); }}
                className="flex items-center gap-2 btn-outline text-sm py-2 px-4">
                <Edit3 size={16} /> Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setEditing(false)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 py-2 px-4 rounded-full">
                  <X size={14} /> Cancel
                </button>
                <button onClick={handleSave} disabled={saving} className="flex items-center gap-1 btn-primary text-sm py-2 px-4">
                  <Save size={14} /> {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>

          {error && <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: "#fef2f2", color: "#dc2626" }}>{error}</div>}

          {/* Photo */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl flex-shrink-0 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #e8f4fd, #fef0f5)" }}>
              {data.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={data.photoUrl} alt={data.fullName} className="w-full h-full object-cover" />
              ) : "👩"}
            </div>
            <div>
              <h3 className="font-bold text-xl">{data.fullName}</h3>
              <p className="text-gray-500">{data.city}, {data.province}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
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
                <div className="md:col-span-2">
                  <label>Bio</label>
                  <textarea rows={4} value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} />
                </div>
                <div className="md:col-span-2">
                  <label>Availability</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {AVAILABILITY_OPTIONS.map(a => (
                      <button key={a} type="button" onClick={() => toggleAvail(a)}
                        className="px-3 py-1.5 rounded-full text-sm font-medium transition"
                        style={{ background: formAvailArr.includes(a) ? "#f8b4c8" : "#e5e7eb", color: formAvailArr.includes(a) ? "#831843" : "#374151" }}>
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
                    <div className="text-xs font-semibold text-gray-400 uppercase mb-1">{label}</div>
                    <div className="font-medium text-sm">{value}</div>
                  </div>
                ))}
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Availability</div>
                  <div className="flex flex-wrap gap-1">
                    {availArr.map(a => (
                      <span key={a} className="text-xs px-2 py-1 rounded-full"
                        style={{ background: "#fef0f5", color: "#c2185b" }}>{a}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Skills</div>
                  <div className="flex flex-wrap gap-1">
                    {data.skills.split(",").map(s => s.trim()).filter(Boolean).map(s => (
                      <span key={s} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Bio</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{data.bio}</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="card p-6 text-center">
          <p className="text-gray-500 text-sm mb-3">Need help with your profile? Contact us.</p>
          <a href="tel:0810259931" className="btn-primary text-sm py-2 px-6">📞 081 025 9931</a>
        </div>
      </div>
    </div>
  );
}
