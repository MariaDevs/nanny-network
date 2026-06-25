"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", background: "linear-gradient(135deg, #e8f4fd, #fef0f5)" }}>
      <div style={{ width: "100%", maxWidth: "28rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: "4rem", height: "4rem", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", background: "linear-gradient(135deg, #4a90d9, #7bc67e)" }}>
            <Heart size={28} fill="white" color="white" />
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1a1a2e" }}>Nanny Login</h1>
          <p style={{ color: "#6b7280", fontSize: "0.875rem", marginTop: "0.25rem" }}>Sign in to your Nanny Network account</p>
        </div>

        <div className="card" style={{ padding: "2rem" }}>
          {error && (
            <div style={{ marginBottom: "1.25rem", padding: "1rem", borderRadius: "0.75rem", fontSize: "0.875rem", background: "#fef2f2", color: "#dc2626" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label>Email Address</label>
              <input required type="email" value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="your@email.com" />
            </div>
            <div>
              <label>Password</label>
              <input required type="password" value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="Your password" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <LogIn size={18} /> {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "#6b7280" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ fontWeight: 600, color: "#4a90d9" }}>
              Register as a Nanny
            </Link>
          </div>
        </div>

        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <Link href="/" style={{ fontSize: "0.875rem", color: "#9ca3af" }}>← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
