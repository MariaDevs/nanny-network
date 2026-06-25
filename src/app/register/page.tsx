"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

const PROVINCES = ["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "Northern Cape", "North West", "Western Cape"];
const LANGUAGES = ["English", "Zulu", "Xhosa", "Afrikaans", "Sotho", "Tswana", "Venda", "Tsonga", "Ndebele", "Swati"];
const SKILLS = ["Infant Care", "Toddler Care", "School-Age Care", "Homework Help", "Cooking & Meal Prep", "First Aid Certified", "Swimming Supervision", "Special Needs Care", "Tutoring", "Driving"];
const AVAILABILITY_OPTIONS = ["Full-Time", "Part-Time", "Live-In", "Live-Out", "Weekends"];
const SALARY_RANGES = ["R3,000 – R5,000/month", "R5,000 – R8,000/month", "R8,000 – R12,000/month", "R12,000 – R15,000/month", "R15,000+/month", "Negotiable"];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", password: "", confirmPassword: "",
    province: "", city: "", age: "", yearsExperience: "",
    languages: [] as string[], skills: [] as string[], availability: [] as string[],
    salaryRange: "", bio: "", photoFile: null as File | null,
    idFile: null as File | null, certsFile: null as File | null, terms: false,
  });

  function toggle(field: "languages" | "skills" | "availability", value: string) {
    setForm(p => ({
      ...p,
      [field]: p[field].includes(value) ? p[field].filter(v => v !== value) : [...p[field], value],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }
    if (form.languages.length === 0) { setError("Select at least one language"); return; }
    if (form.availability.length === 0) { setError("Select at least one availability option"); return; }

    setLoading(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (v instanceof File) fd.append(k, v);
      else if (Array.isArray(v)) fd.append(k, v.join(","));
      else if (v !== null) fd.append(k, String(v));
    });

    const res = await fetch("/api/register", { method: "POST", body: fd });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "Registration failed"); return; }
    setSuccess(true);
  }

  if (success) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", background: "#fdf6ec" }}>
        <div className="card" style={{ padding: "3rem", textAlign: "center", maxWidth: "28rem" }}>
          <CheckCircle size={64} style={{ color: "#7bc67e", margin: "0 auto 1rem" }} />
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>Registration Submitted!</h2>
          <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>Thank you for registering with Nanny Network. Your profile is under review. We will notify you once approved.</p>
          <button onClick={() => router.push("/")} className="btn-primary">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#f5f5f0", minHeight: "100vh" }}>
      <div className="wrap" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>Register as a Nanny</h1>
          <p style={{ color: "#6b7280" }}>Create your profile and get discovered by families across South Africa.</p>
          {/* Steps */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: "2rem", height: "2rem", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", fontWeight: 700, background: step >= s ? "#4a90d9" : "#e5e7eb", color: step >= s ? "white" : "#9ca3af" }}>
                  {s}
                </div>
                {s < 3 && <div style={{ width: "3rem", height: "0.25rem", borderRadius: "9999px", background: step > s ? "#4a90d9" : "#e5e7eb" }} />}
              </div>
            ))}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem" }}>
            Step {step} of 3: {step === 1 ? "Personal Info" : step === 2 ? "Experience & Skills" : "Documents & Submit"}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <div className="card" style={{ padding: "2rem" }}>
            {error && (
              <div style={{ marginBottom: "1.5rem", padding: "1rem", borderRadius: "0.75rem", fontSize: "0.875rem", background: "#fef2f2", color: "#dc2626" }}>
                {error}
              </div>
            )}

            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <h2 style={{ fontWeight: 700, fontSize: "1.1rem" }}>Personal Information</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: "1rem" }}>
                  <div>
                    <label>Full Name *</label>
                    <input required value={form.fullName} onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))} placeholder="Your full name" />
                  </div>
                  <div>
                    <label>Age *</label>
                    <input required type="number" min="18" max="65" value={form.age} onChange={e => setForm(p => ({ ...p, age: e.target.value }))} placeholder="Your age" />
                  </div>
                </div>
                <div>
                  <label>Email Address *</label>
                  <input required type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="Your email address" />
                </div>
                <div>
                  <label>Phone Number * (private — admin only)</label>
                  <input required value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="Your phone number" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: "1rem" }}>
                  <div>
                    <label>Password *</label>
                    <input required type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="Create password" />
                  </div>
                  <div>
                    <label>Confirm Password *</label>
                    <input required type="password" value={form.confirmPassword} onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))} placeholder="Confirm password" />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: "1rem" }}>
                  <div>
                    <label>Province *</label>
                    <select required value={form.province} onChange={e => setForm(p => ({ ...p, province: e.target.value }))}>
                      <option value="">Select province...</option>
                      {PROVINCES.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label>City *</label>
                    <input required value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} placeholder="Your city" />
                  </div>
                </div>
                <button type="button" onClick={() => setStep(2)} className="btn-primary" style={{ marginTop: "0.5rem" }}>Next: Experience & Skills →</button>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <h2 style={{ fontWeight: 700, fontSize: "1.1rem" }}>Experience & Skills</h2>
                <div>
                  <label>Years of Experience *</label>
                  <input required type="number" min="0" max="40" value={form.yearsExperience} onChange={e => setForm(p => ({ ...p, yearsExperience: e.target.value }))} placeholder="Years of childcare experience" />
                </div>
                <div>
                  <label>Languages Spoken * (select all that apply)</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                    {LANGUAGES.map(l => (
                      <button key={l} type="button" onClick={() => toggle("languages", l)}
                        style={{ padding: "0.375rem 0.75rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: "pointer", transition: "all 0.2s", background: form.languages.includes(l) ? "#4a90d9" : "#e5e7eb", color: form.languages.includes(l) ? "white" : "#374151" }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label>Childcare Skills (select all that apply)</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                    {SKILLS.map(s => (
                      <button key={s} type="button" onClick={() => toggle("skills", s)}
                        style={{ padding: "0.375rem 0.75rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: "pointer", transition: "all 0.2s", background: form.skills.includes(s) ? "#7bc67e" : "#e5e7eb", color: form.skills.includes(s) ? "white" : "#374151" }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label>Availability * (select all that apply)</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                    {AVAILABILITY_OPTIONS.map(a => (
                      <button key={a} type="button" onClick={() => toggle("availability", a)}
                        style={{ padding: "0.375rem 0.75rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: 600, border: "none", cursor: "pointer", transition: "all 0.2s", background: form.availability.includes(a) ? "#f8b4c8" : "#e5e7eb", color: form.availability.includes(a) ? "#831843" : "#374151" }}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label>Expected Salary Range</label>
                  <select value={form.salaryRange} onChange={e => setForm(p => ({ ...p, salaryRange: e.target.value }))}>
                    <option value="">Select salary range...</option>
                    {SALARY_RANGES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label>Short Bio *</label>
                  <textarea required rows={4} value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} placeholder="Tell families about yourself, your experience and why you love working with children..." />
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button type="button" onClick={() => setStep(1)} className="btn-outline" style={{ flex: 1 }}>← Back</button>
                  <button type="button" onClick={() => setStep(3)} className="btn-primary" style={{ flex: 1 }}>Next: Documents →</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <h2 style={{ fontWeight: 700, fontSize: "1.1rem" }}>Documents & Submit</h2>
                <div style={{ padding: "1rem", borderRadius: "0.75rem", fontSize: "0.875rem", background: "#e8f4fd", color: "#1e40af" }}>
                  🔒 All uploaded documents are private and visible only to the Nanny Network admin team.
                </div>
                <div>
                  <label>Profile Photo</label>
                  <input type="file" accept="image/*" onChange={e => setForm(p => ({ ...p, photoFile: e.target.files?.[0] || null }))} />
                  <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.25rem" }}>Shown on your public profile</p>
                </div>
                <div>
                  <label>ID / Passport Copy * (admin only)</label>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setForm(p => ({ ...p, idFile: e.target.files?.[0] || null }))} />
                </div>
                <div>
                  <label>Certificates / References (optional, admin only)</label>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={e => setForm(p => ({ ...p, certsFile: e.target.files?.[0] || null }))} />
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "1rem", borderRadius: "0.75rem", background: "#f5f5f0" }}>
                  <input type="checkbox" id="terms" required checked={form.terms}
                    onChange={e => setForm(p => ({ ...p, terms: e.target.checked }))}
                    style={{ marginTop: "0.25rem", width: "1rem", height: "1rem", flexShrink: 0 }} />
                  <label htmlFor="terms" style={{ fontSize: "0.875rem", color: "#4b5563", fontWeight: "normal", cursor: "pointer" }}>
                    I agree to Nanny Network&apos;s terms and conditions. I confirm that all information provided is accurate and that I consent to my profile being displayed on the Nanny Network website once approved.
                  </label>
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button type="button" onClick={() => setStep(2)} className="btn-outline" style={{ flex: 1 }}>← Back</button>
                  <button type="submit" disabled={loading || !form.terms} className="btn-primary" style={{ flex: 1 }}>
                    {loading ? "Submitting..." : "Submit Registration"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
