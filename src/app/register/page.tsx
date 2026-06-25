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
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#fdf6ec" }}>
        <div className="card p-12 text-center max-w-md">
          <CheckCircle size={64} className="mx-auto mb-4" style={{ color: "#7bc67e" }} />
          <h2 className="text-2xl font-bold mb-3">Registration Submitted!</h2>
          <p className="text-gray-500 mb-6">Thank you for registering with Nanny Network. Your profile is under review. We will notify you once approved.</p>
          <button onClick={() => router.push("/")} className="btn-primary">Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#f5f5f0" }}>
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="section-title text-4xl mb-3">Register as a Nanny</h1>
          <p className="text-gray-500">Create your profile and get discovered by families across South Africa.</p>
          {/* Steps */}
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: step >= s ? "#4a90d9" : "#e5e7eb", color: step >= s ? "white" : "#9ca3af" }}>
                  {s}
                </div>
                {s < 3 && <div className="w-12 h-1 rounded" style={{ background: step > s ? "#4a90d9" : "#e5e7eb" }} />}
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            Step {step} of 3: {step === 1 ? "Personal Info" : step === 2 ? "Experience & Skills" : "Documents & Submit"}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="card p-8">
            {error && (
              <div className="mb-6 p-4 rounded-xl text-sm" style={{ background: "#fef2f2", color: "#dc2626" }}>
                {error}
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-5">
                <h2 className="font-bold text-lg">Personal Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
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
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label>Password *</label>
                    <input required type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="Create password" />
                  </div>
                  <div>
                    <label>Confirm Password *</label>
                    <input required type="password" value={form.confirmPassword} onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))} placeholder="Confirm password" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
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
                <button type="button" onClick={() => setStep(2)} className="btn-primary mt-2">Next: Experience & Skills →</button>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-5">
                <h2 className="font-bold text-lg">Experience & Skills</h2>
                <div>
                  <label>Years of Experience *</label>
                  <input required type="number" min="0" max="40" value={form.yearsExperience} onChange={e => setForm(p => ({ ...p, yearsExperience: e.target.value }))} placeholder="Years of childcare experience" />
                </div>
                <div>
                  <label>Languages Spoken * (select all that apply)</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {LANGUAGES.map(l => (
                      <button key={l} type="button" onClick={() => toggle("languages", l)}
                        className="px-3 py-1.5 rounded-full text-sm font-medium transition"
                        style={{ background: form.languages.includes(l) ? "#4a90d9" : "#e5e7eb", color: form.languages.includes(l) ? "white" : "#374151" }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label>Childcare Skills (select all that apply)</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {SKILLS.map(s => (
                      <button key={s} type="button" onClick={() => toggle("skills", s)}
                        className="px-3 py-1.5 rounded-full text-sm font-medium transition"
                        style={{ background: form.skills.includes(s) ? "#7bc67e" : "#e5e7eb", color: form.skills.includes(s) ? "white" : "#374151" }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label>Availability * (select all that apply)</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {AVAILABILITY_OPTIONS.map(a => (
                      <button key={a} type="button" onClick={() => toggle("availability", a)}
                        className="px-3 py-1.5 rounded-full text-sm font-medium transition"
                        style={{ background: form.availability.includes(a) ? "#f8b4c8" : "#e5e7eb", color: form.availability.includes(a) ? "#831843" : "#374151" }}>
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
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1">← Back</button>
                  <button type="button" onClick={() => setStep(3)} className="btn-primary flex-1">Next: Documents →</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-5">
                <h2 className="font-bold text-lg">Documents & Submit</h2>
                <div className="p-4 rounded-xl text-sm" style={{ background: "#e8f4fd", color: "#1e40af" }}>
                  🔒 All uploaded documents are private and visible only to the Nanny Network admin team.
                </div>
                <div>
                  <label>Profile Photo</label>
                  <input type="file" accept="image/*" onChange={e => setForm(p => ({ ...p, photoFile: e.target.files?.[0] || null }))} />
                  <p className="text-xs text-gray-400 mt-1">Shown on your public profile</p>
                </div>
                <div>
                  <label>ID / Passport Copy * (admin only)</label>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setForm(p => ({ ...p, idFile: e.target.files?.[0] || null }))} />
                </div>
                <div>
                  <label>Certificates / References (optional, admin only)</label>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={e => setForm(p => ({ ...p, certsFile: e.target.files?.[0] || null }))} />
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "#f5f5f0" }}>
                  <input type="checkbox" id="terms" required checked={form.terms}
                    onChange={e => setForm(p => ({ ...p, terms: e.target.checked }))}
                    className="mt-1 w-4 h-4 flex-shrink-0" style={{ width: "1rem" }} />
                  <label htmlFor="terms" className="text-sm text-gray-600 font-normal cursor-pointer">
                    I agree to Nanny Network&apos;s terms and conditions. I confirm that all information provided is accurate and that I consent to my profile being displayed on the Nanny Network website once approved.
                  </label>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(2)} className="btn-outline flex-1">← Back</button>
                  <button type="submit" disabled={loading || !form.terms} className="btn-primary flex-1">
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
